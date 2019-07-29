const glob = require('glob-all')

describe('Checking generated html files', () => {
    it('should generate html files', (done) => {
        const files = glob.sync([
            './dist/index_*.js',
            './dist/index.js',
            './dist/search.js',
            './dist/search_*.js'
        ])

        if (files.length) {
            done()
        } else {
            throw new Error('no js files generater')
        }
    })
})