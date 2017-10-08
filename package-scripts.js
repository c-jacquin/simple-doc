const {
    concurrent,
    series,
    copy,
} = require('nps-utils')
const gitBranch = require('git-branch')

module.exports = {
  scripts: {
    default: {
        description: 'transpile typescript and watch for change',
        script: series.nps(
            'build.prepare',
            'build.watch'
        ),
    },
    commit: {
        description: 'commit using conventionnal changelog',
        script: 'git-cz',
    },
    clean: {
        description: 'clean useless temporary directories',
        script: concurrent({
            cleanTemp: 'rimraf .temp -r',
            cleanTestReport: 'rimraf docs/test-report -r',
            cleanCoverge: 'rimraf docs/lcov-report -r',
            clenBuild: 'rimraf build -r',
        }),
    },
    lint: {
        default: {
            description: 'lint the code with tslint',
            script: 'tslint -c tslint.json "src/**/*.ts"',
        },
        style: {
            description: 'lint css files',
            script: 'stylelint src/**/*.css',
        },
    },
    prettier: {
        description: 'format the code using prettier',
        script: 'prettier --write --config _config_/prettier.config.js \"src/**/*(*.ts|*.tsx)\"',
    },
    validate: {
        description: 'lint the code, run the test and build',
        script: concurrent.nps('lint', 'lint.style', 'test', 'build'),
    },
    publish: {
        description: 'publish on npm',
        script: 'npm publish . --access public'
    },
    release: {
        default: {
            description: 'create a new tag depending on the last commits and update changelog accordingly, create a tag, generate documentation, commit and push',
            script: 'standard-version --no-verify',
        },
        first: {
            description: 'first release usualy 0.0.0',
            script: 'standard-version --no-verify --first-release',
        }
    },
    build: {
        default: {
            description: 'transpile typescript src to es5',
            script: series.nps(
                'build.prepare',
                'build.production'
            ),
        },
        prepare: {
            description: 'clean dist dir',
            script: series(
                'rimraf dist -r',
                'mkdir dist',
                copy('src/style/*.css dist/style -r')
            ),
        },
        watch: {
            description: 'build and watch for changes',
            script: 'NODE_ENV=development tsc --watch',
        },
        production: {
            description: 'build for production',
            script: 'NODE_ENV=production tsc',
        },
    },
    test: {
        default: {
            description: 'run all the test once',
            script: 'NODE_ENV=test jest',
        },
        watch: {
            description: 'run in the amazingly intelligent Jest watch mode',
            script: 'NODE_ENV=test jest --watch',            
        },
        cover: {
            description: 'run test with istanbul test coverage',
            script: series(
                'NODE_ENV=test jest --coverage',
                'ts-node --project _scripts_/ _scripts_/testHook/remap-coverage',
                'rimraf .temp -r'
            ),
        },
    },
  },
}
