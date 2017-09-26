import * as React from 'react'
const marked = require('marked')

marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
})

interface MarkdownProps {
    githubStyle?: boolean
    markdown: string
}

export const Markdown: React.StatelessComponent<MarkdownProps> = ({
    githubStyle = true,
    markdown,
}) => {
    return (
        <div
            className={githubStyle ? 'markdown-github' : ''}
            dangerouslySetInnerHTML={{ __html: marked(markdown) }}
        />
    )
}
