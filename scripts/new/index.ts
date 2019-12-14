import inquirer from 'inquirer'
import { getAllPkgNames } from '../utils/helper'
import fs from 'fs-extra'
import glob from 'glob'
import path from 'path'

async function getAnswer(pkgs) {
  const info = await inquirer.prompt({
    type: 'input',
    name: 'moduleName',
    message: '请输入模块名称',
    validate(val) {
      val = val.trim()
      if (!val) return '包名不能为空'
      if (
        /^[a-z][a-z-\d]+$/.test(val) &&
        !/-{2,}/.test(val) &&
        !/-$/.test(val)
      ) {
        const has = pkgs.find(p => p.name === `@toolkitss/${val}`)
        return has ? `${val}模块已经存在` : true
      }
      return ` 模块名不正确
              1.必须小写字母开头
              2.没有连续的连字符(-)
              3.不以(-)结尾
              4.仅包含 小写字母/数字/连字符(-)`
    }
  })
  return info.moduleName.trim()
}

async function createPkgs(moduleInfo) {
  const templatePath = path.join(__dirname, 'template')
  const destination = path.join(
    __dirname,
    `../../packages/${moduleInfo.moduleName}`
  )
  const files = glob.sync('./**/*.{scss,css,json,ts,tsx,js,md}', {
    cwd: templatePath
  })
  /** 复制文件到目的地 */
  fs.copySync(templatePath, destination)
  files.forEach(async f => {
    const filePath = path.join(destination, f)
    let content = fs.readFileSync(filePath, 'utf8')
    content = Object.keys(moduleInfo).reduce((prev, curr) => {
      const reg = RegExp(`\\%${curr}\\%`, 'g')
      if (typeof moduleInfo[curr] === 'object') {
        moduleInfo[curr] = JSON.stringify(moduleInfo[curr])
      }
      return prev.replace(reg, moduleInfo[curr])
    }, content)
    fs.writeFile(filePath, content, 'utf8')
  })
}

async function main() {
  const pkgs = await getAllPkgNames()
  const moduleName = await getAnswer(pkgs)
  await createPkgs({
    moduleName
  })
  console.log(`${moduleName}模块已经创建成功`)
}

// 单独执行
if (!module.parent) {
  main()
}
