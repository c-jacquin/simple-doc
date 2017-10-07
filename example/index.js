const { generateDoc } = require('../dist');
const pkg = require('../package.json');
const fs = require('fs-extra');
const menu = [
    {
        label: 'a link',
        url: ''  
    },
    {
        label: 'another link',
        url: ''
    }
];
(async () => {
    try {
        const markdown = await fs.readFile('./CHANGELOG.md', { encoding: 'utf8' })
        await generateDoc({
            pkg,
            markdown,
            menu
        })
    } catch (err) {
        console.log(err)
    }
})()