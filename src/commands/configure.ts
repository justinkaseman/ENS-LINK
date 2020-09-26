import { Command, flags } from '@oclif/command'
import { writeConfig } from '../utils/config'
import cli from 'cli-ux'
import chalk from 'chalk'

export default class Configure extends Command {
    static description = 'Configures network endpoint and account settings'

    static examples = [
      '$ ens-link configure --email=justinkaseman@live.com --password=mypassword --endpoint=https://infura.something.com',
    ]

    static flags = {
      help: flags.help({ char: 'h' }),
      email: flags.string({ char: 'e', description: 'endpoint to connect to' }),
      password: flags.string({ char: 'p', description: 'endpoint to connect to' }),
      endpoint: flags.string({ char: 'n', description: 'endpoint to connect to' }),
    }

    async run() {
      const { flags } = this.parse(Configure)

      const email: string = flags.email || await cli.prompt('What is your email?')
      // TODO: encrypt password with Node.Crypto
      const password: string = flags.password || await cli.prompt('What is your password?', { type: 'hide' })
      const endpoint: string = flags.endpoint || await cli.prompt('How are you connecting to ethereum?')

      try {
        await writeConfig(this.config.configDir, JSON.parse(JSON.stringify({ email, password, endpoint })))
      } catch {
        this.log(chalk.red('Error setting configuration.'))
        this.exit()
      }
    }
}
