/**
 * 冒烟测试
 */
const path = require('path')
const webpack = require('webpack')
const Mocha = require('mocha')
const rimraf = require('rimraf')
process.chdir(path.join(__dirname, 'template'))

const mocha = new Mocha({
    timeout: 100
})

rimraf('./dist', () => {
    const prodConfig = require('../../lib/webpack.prod')
    webpack(prodConfig, (err, stats) => {
        if (err) {
            console.log(err)
            process.exit(2)
        }
        console.log(stats.toString({
            colors: true,
            modules: false,
            children: false
        }))

        console.log('webpack build sucess, begin run ceshiyongli')

        mocha.addFile(path.join(__dirname, 'html-test.js'))
        mocha.addFile(path.join(__dirname, 'css-js-test.js'))
    })
})