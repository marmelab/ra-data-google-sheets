const { jest: jestConfig } = require('kcd-scripts/config');

module.exports = Object.assign(jestConfig, {
    testMatch: ['/**/*.test.(js|jsx|ts|tsx)'],
    moduleNameMapper: {
        '\\.(css|less|scss)$': 'identity-obj-proxy',
    },
});
