import * as React from 'react'

export interface NavItemProps {
    url: string
    label?: string
    icon?: string
}

export const NavItem: React.StatelessComponent<NavItemProps> = ({
    url,
    label,
    icon,
}) => (
    <li className="nav-item">
        <a className="nav-link" href={url}>
            {!!icon && <i className={`fa fa-${icon}`} aria-hidden="true" />}
            {label}
        </a>
    </li>
)
