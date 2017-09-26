import { StatelessComponent } from 'react'
import * as fs from 'fs-extra'
import { prettyPrint } from 'html'
import { MainPage } from './components/MainPage'
import renderPage from './render'

export interface SimpleDocParams {
    pkg: any
    markdown: string
    outDir?: string
    Page?: StatelessComponent<any>
    title?: string
}

export const generateDoc = async ({
    pkg,
    markdown,
    outDir = process.cwd() + '/docs',
    Page = MainPage,
    title,
}: SimpleDocParams) => {
    const html = renderPage(Page, {
        title: title || `${pkg.name} Documentation`,
        pkg,
        markdown,
    })
    const styleDir = `${process.cwd()}/src/style`

    try {
        await fs.writeFile(`${outDir}/index.html`, prettyPrint(html))
    } catch (err) {
        if (err.code === 'ENOENT') {
            await fs.mkdir(outDir)
            await fs.writeFile(`${outDir}/index.html`, prettyPrint(html))
        }
    } finally {
        await fs.copy(`${styleDir}/github.css`, `${outDir}/github.css`)
        await fs.copy(`${styleDir}/main.css`, `${outDir}/main.css`)
    }
}
