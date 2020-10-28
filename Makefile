export DEPLOY_ENV ?= dev

.PHONY: build help

help:
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'


#### Install ####

install: package.json ## Install dependencies
	@yarn

copy-config-demo: ## Copy config of the demo. Usage DEPLOY_ENV=[dev|integration|staging] make copy-config-demo.
	cp packages/demo/config/config-${DEPLOY_ENV}.js packages/demo/public/config.js


#### Build ####

build: ## Build the library
	@yarn build

build-demo: ## Build the demo
	@yarn build-demo


#### Run ####

start: copy-config-demo build ## Starts the application in development mode
	@yarn start


#### Code Formatting ####

lint: ## Runs linting tools
	@yarn lint
