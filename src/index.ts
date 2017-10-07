import { StatelessComponent } from 'react'
import * as path from 'path'
import * as fs from 'fs-extra'
import { prettyPrint } from 'html'
import { MainPage } from './components/MainPage'
import { NavItemProps } from './components/NavItem'
import renderPage from './render'

export interface SimpleDocParams {
    pkg: any
    markdown: string
    outDir?: string
    Page?: StatelessComponent<any>
    title?: string
    menu?: NavItemProps[]
}

export const generateDoc = async ({
    pkg,
    markdown,
    outDir = process.cwd() + '/docs',
    Page = MainPage,
    title,
    menu,
}: SimpleDocParams) => {
    const html = renderPage(Page, {
        title: title || `${pkg.name} ${pkg.version} Documentation`,
        pkg,
        markdown,
        menu,
    })
    const styleDir = path.resolve(__dirname, 'style')

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
