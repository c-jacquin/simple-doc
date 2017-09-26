const {
    concurrent,
    series
} = require('nps-utils')

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
    release: {
        default: {
            description: 'create a new tag depending on the last commits and update changelog accordingly, create a tag, generate documentation, commit and push',
            script: 'standard-version --no-verify',
        },
        firstRelease: {
            description: 'first release usualy 0.0.0',
            script: 'standard-version --no-verify --first-release',
        },
        postcommit: {
            description: 'generate documentation and amend standard version commit',
            script: 'ts-node --project _scripts_/ _scripts_/releaseHook/postcommit'
        },
        posttag: {
            description: 'push the new release on the remote',
            script: 'ts-node --project _scripts_/ _scripts_/releaseHook/posttag'
        },
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
                'mkdir dist'
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
