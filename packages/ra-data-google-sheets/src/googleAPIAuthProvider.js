import { login, logout } from './googleAPI';

export const googleAPIAuthProvider = () => ({
    login: ({ username, password }) => {
        if (username === 'login' && password === 'secret') {
            return login().then(() => {
                localStorage.removeItem('not_authenticated');
                localStorage.removeItem('role');
            });
        }

        if (username === 'user' && password === 'secret') {
            return login().then(() => {
                localStorage.setItem('role', 'user');
                localStorage.removeItem('not_authenticated');
            });
        }

        if (username === 'admin' && password === 'secret') {
            return login().then(() => {
                localStorage.setItem('role', 'admin');
                localStorage.removeItem('not_authenticated');
            });
        }

        localStorage.setItem('not_authenticated', true);
        return Promise.reject();
    },
    logout: () => {
        return logout().then(() => {
            localStorage.setItem('not_authenticated', true);
            localStorage.removeItem('role');
        });
    },
    checkError: ({ status }) => {
        return status === 401 || status === 403
            ? Promise.reject()
            : Promise.resolve();
    },
    checkAuth: () => {
        return localStorage.getItem('not_authenticated')
            ? Promise.reject()
            : Promise.resolve();
    },
    getPermissions: () => {
        const role = localStorage.getItem('role');
        return Promise.resolve(role);
    },
});
