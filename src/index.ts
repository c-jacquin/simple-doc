import { StatelessComponent } from 'react'
import fs from 'fs-extra'
import { prettyPrint } from 'html'
import { MainPage } from './components/MainPage'
import renderPage from './render'

export interface SimpleDocParams {
    pkg: any
    changelog: string
    outDir?: string
    Page?: StatelessComponent<any>
    title?: string
}

export default async ({
    pkg,
    changelog,
    outDir = process.cwd() + '/docs',
    Page = MainPage,
    title,
}: SimpleDocParams) => {
    const html = renderPage(Page, {
        title: title || `${pkg.name} Documentation`,
        pkg,
        changelog,
    })
    const styleDir = `${process.cwd()}/src/style`

    await fs.writeFile(`${outDir}/index.html`, prettyPrint(html))
    await fs.copy(`${styleDir}/github.css`, `${outDir}/github.css`)
    await fs.copy(`${styleDir}/main.css`, `${outDir}/main.css`)
}
