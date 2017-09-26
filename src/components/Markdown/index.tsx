import React, { StatelessComponent } from 'react'
import marked from 'marked'

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

export const Markdown: StatelessComponent<MarkdownProps> = ({
    githubStyle = true,
    markdown,
}) => (
    <div
        className={githubStyle ? 'markdown-github' : ''}
        dangerouslySetInnerHTML={{ __html: marked(markdown) }}
    />
)
