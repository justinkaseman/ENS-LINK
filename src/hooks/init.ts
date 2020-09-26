import { Hook } from '@oclif/config'
import { readConfig } from '../utils/config'
import Configure from '../commands/configure'

/*
Init hook:
Ensures that the user is configured correctly before running any command
*/

export const hook: Hook<'init'> = async function (options) {
  // This hook is redundant if the user is running the configure command
  if (options.id === 'configure') return

  try {
    await readConfig(options.config.configDir)
  } catch (error) {
    this.log('Welcome to ENS-LINK! Please configure')
    await Configure.run()
  }
}
