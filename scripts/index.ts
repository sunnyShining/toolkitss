// 废弃
import minimist from 'minimist' // 轻量级命令行参数解析
import path from 'path'
import jest from 'jest'

const rawArgs = process.argv.slice(2)
const args = minimist(rawArgs)

let rootDir = path.resolve(__dirname, '../../')
// 指定包测试
if (args.p) {
  rootDir = rootDir + '/packages/' + args.p
}
const jestArgs = ['--runInBand', '--rootDir', rootDir]

console.log(`\n===> running: jest ${jestArgs.join(' ')}`)

jest.run(jestArgs)
