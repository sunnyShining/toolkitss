import { invariant, toRawType } from '@toolkitss/helper'
import { runCmd } from '../../scripts/utils/helper'
const pkg = require('../package.json')

async function main() {
  const syncremote = (pkg && pkg.syncremote) || []

  invariant(toRawType(syncremote) === 'Array', 'syncremote配置应当是个数组')
  const needUpdatePkgs = syncremote.map(p => {
    return p + '@latest'
  })
  if (needUpdatePkgs.length > 0) {
    await runCmd('yarn', ['upgrade'].concat(needUpdatePkgs))
    console.log(`${syncremote.join(' ')} has been updated`)
  }
}

main()
