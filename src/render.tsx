import React, { StatelessComponent } from 'react'
import ReactDomServer from 'react-dom/server'
import { Helmet } from 'react-helmet'

/**
 * render an html page from a react component for the last version of the app
 */
export default (Component: StatelessComponent<any>, props: any): string => {
    const reactApp = ReactDomServer.renderToString(<Component {...props} />)
    const helmet = Helmet.renderStatic()

    return `
        <!doctype html>
        <html>
            <head>
                ${helmet.title.toString()}
                ${helmet.meta.toString()}
                ${helmet.link.toString()}
                ${helmet.script.toString()}
            </head>
            <body>
                ${reactApp}
            </body>
        </html>
    `
}
