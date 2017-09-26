import { SimpleDocParams } from '../src/index'

interface SimpleDoc {
    (params: SimpleDocParams): Promise<void>
}

declare var simpleDoc: SimpleDoc

export default simpleDoc