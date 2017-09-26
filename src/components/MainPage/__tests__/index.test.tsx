import * as React from 'react'
import * as renderer from 'react-test-renderer'

import { MainPage } from '../index'

describe('FormattedDate', () => {
    const pkg = {
        repository: {
            url: '',
        },
    }

    it('should renders correctly', () => {
        const tree = renderer.create(
            <MainPage pkg={pkg} title="test" markdown="" />
        )
        expect(tree).toBeDefined()
    })
})
