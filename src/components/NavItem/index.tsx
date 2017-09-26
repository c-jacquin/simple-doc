import React, { StatelessComponent } from 'react'

export interface NavItemProps {
    url: string
    label?: string
    icon?: string
}

export const NavItem: StatelessComponent<NavItemProps> = ({
    url,
    label,
    icon,
}) => (
    <li className="nav-item">
        <a className="nav-link" href={url}>
            {!!icon && <i className={`fa fa-${icon}`} aria-hidden="true" />}
            {!!label && { label }}
        </a>
    </li>
)
