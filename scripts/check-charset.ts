import os from 'node:os'
import { execa } from 'execa'

if (os.platform() === 'win32') {
  await execa(`chcp`, ['65001'], { stdio: 'inherit' })
  console.log('switch chcp code tp 65001')
}
