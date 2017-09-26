const { generateDoc } = require('../dist');
const pkg = require('../package.json');
const fs = require('fs-extra');

(async () => {
    try {
        const markdown = await fs.readFile('./CHANGELOG.md', { encoding: 'utf8' })
        await generateDoc({
            pkg,
            markdown
        })
    } catch (err) {
        console.log(err)
    }
})()