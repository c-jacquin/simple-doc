import React, { StatelessComponent } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

import { Navbar } from '../Navbar'
import { NavItemProps } from '../NavItem'
import { Markdown } from '../Markdown'

interface MainPageProps {
    title: string
    markdown: string
    pkg: any
    menu?: NavItemProps[]
}

export const MainPage: StatelessComponent<MainPageProps> = ({
    markdown,
    pkg,
    title,
    menu,
}) => (
    <div>
        <Helmet>
            <meta charSet="utf-8" />
            <title>{title}</title>
            <link rel="stylesheet" href="./github.css" />
            <link rel="stylesheet" href="./main.css" />
        </Helmet>
        <Navbar
            repo={pkg.repository.url.replace('.git', '')}
            menu={menu}
            title={title}
        />
        <div className="wrap">
            <Markdown markdown={markdown} />
        </div>
    </div>
)
