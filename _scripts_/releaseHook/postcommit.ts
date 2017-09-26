(async () => {
    const { exec } = require('child-process-promise')
    const fs = require('fs-extra')
    const { updateChangeLog, generateDocs, versionDoc } = require('./lib')
    const pkg = require(`${process.cwd()}/package.json`)
    const changelogPath = `${process.cwd()}/CHANGELOG.md`
    const simpleDoc = require('../../dist')

    try {
        let changelog = await fs.readFile(changelogPath, { encoding: 'utf-8' })
        await exec('npm start test.cover')
        await exec('npm start build')

        await versionDoc(pkg.version)

        changelog = await updateChangeLog(pkg.version, changelog, changelogPath)

        await simpleDoc({
            pkg,
            changelog,
        })
        await exec('git add -A')
        await exec('git commit --amend --no-edit')
    } catch (err) {
        console.error(err)
        process.exit(1)
    } finally {
        process.exit(0)
    }
})()