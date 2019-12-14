import { spawn, SpawnOptions } from 'child_process'

export function runCmd(
  cmd: string,
  args?: string[],
  options?: SpawnOptions
): Promise<string>
export function runCmd(cmd, args, options) {
  if (!Array.isArray(args)) {
    options = args
    args = []
  }
  const task = spawn(
    cmd,
    args,
    Object.assign(
      {
        cwd: process.cwd(),
        shell: true
      },
      options
    )
  )
  return new Promise((resolve, reject) => {
    // record response content
    const stdout: any[] = []
    const stderr: any[] = []
    task.stdout.on('data', data => {
      stdout.push(data)
    })
    task.stderr.on('data', data => {
      stderr.push(data)
    })
    // listen on error, to aviod command crash
    task.on('error', () => {
      reject(stderr.join('').toString())
    })
    task.on('exit', code => {
      if (code) {
        stderr.unshift(`error code: ${code}\n`)
        reject(stderr.join('').toString())
      } else {
        resolve(stdout.join('').toString())
      }
    })
  })
}

export async function getAllPkgNames() {
  const isWin = /^win/.test(process.platform)
  const pkgsString = await runCmd(isWin ? 'npx.cmd' : 'npx', [
    'lerna',
    'list',
    '--all',
    '--json'
  ])
  const pkgsJSON = JSON.parse(
    pkgsString
      .split('\n')
      .filter(l => /^[\s\[\]]/.test(l))
      .join('\n')
  )
  return pkgsJSON
}
// npx ts-node --project scripts/tsconfig.json scripts/utils/helper.ts
