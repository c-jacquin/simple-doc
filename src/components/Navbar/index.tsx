import * as React from 'react'
import * as PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

import { NavItem, NavItemProps } from '../NavItem'

interface NavbarProps {
    title: string
    repo?: string
    menu?: NavItemProps[]
}

export const Navbar: React.StatelessComponent<NavbarProps> = ({
    repo,
    title,
    menu,
}) => (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Helmet>
            <link
                rel="stylesheet"
                href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css"
            />
            <script src="https://use.fontawesome.com/3d13965eab.js" />
        </Helmet>
        <a className="navbar-brand" href="#">
            {title}
        </a>
        <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span className="navbar-toggler-icon" />
        </button>
        <div
            className="collapse navbar-collapse justify-content-between"
            id="navbarNavDropdown"
        >
            {!!menu && (
                <ul className="navbar-nav">
                    {menu.map(navItemProps => <NavItem {...navItemProps} />)}
                </ul>
            )}
            {!!repo && (
                <ul className="navbar-nav">
                    <NavItem url={repo} icon="github" />
                    <NavItem url={`${repo}/issues`} icon="exclamation-circle" />
                    <NavItem url={`${repo}/projects`} icon="trello" />
                </ul>
            )}
        </div>
    </nav>
)
