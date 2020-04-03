# listlab-build
Common build tools for public ListLab projects. This package must be locally installed to build any other ListLab packages.

Standard build commands:
```
npm run start        # starts webpack-dev-server of app hitting prod endpoints
npm run start-local  # starts webpack-dev-server of app hitting local endpoints
npm run lint         # lints project
npm run test         # runs unit tests
npm run sample       # if available, runs webpack-dev-server of sample UI component harnesses at localhost:3001

npm run build-prod   # builds and bundles app for deployment
npm run build-local  # builds and bundles app hitting local endpoints
```

### Notable files
- .eslintrc - TypeScript linting base configuration
- ui.eslintrc - TypeScript linting additional UI configuration
- .stylelintrc - SASS linting base configuration
- config.*.js - Defines configs as a global js object `window.listlabConfig` for all frontend js apps
