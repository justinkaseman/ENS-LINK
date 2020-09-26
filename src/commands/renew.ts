import { Command, flags } from '@oclif/command'
import { ethers } from 'ethers'
import { ensController } from '../utils/contract'
import { calculateCost } from '../utils/cost'
import { readConfig } from '../utils/config'
import cli from 'cli-ux'
import chalk from 'chalk'
import { BrainWallet } from '@ethersproject/experimental'

export default class Renew extends Command {
    static description = 'Starts ENS-LINK\'s graphical interface'

    static examples = [
      '$ ens-link renew --name=flavortown --duration=30',
    ]

    static flags = {
      help: flags.help({ char: 'h' }),
      name: flags.string({ char: 'n', description: 'Domain name to renew' }),
      duration: flags.integer({ char: 'd', description: 'Amount of time (days) to extend ownership for' }),
    }

    async run() {
      const { flags } = this.parse(Renew)

      let config
      try {
        config = await readConfig(this.config.configDir)
      } catch {
        this.error('Could not read config')
      }

      const wallet = await BrainWallet.generate(config.email, config.password)
      const provider = new ethers.providers.JsonRpcProvider(config.endpoint)
      const signer = wallet.connect(provider)

      let controller = await ensController(config?.endpoint, this.config.cacheDir)
      controller = controller.connect(signer)

      const name: string = flags.name || await cli.prompt('What domain name would you like to renew?')
      const isValid: boolean = await controller.valid(name)
      if (!isValid)
        this.error('Domain name is invalid.')

      const cost = calculateCost(name)
      this.log(`\nShorter domain names cost less. The cost is $${cost}/year for your name\n`)

      const minDuration = await controller.MIN_REGISTRATION_DURATION()
      let duration = flags.duration || await cli.prompt(`How many days would you like to extend ownership of this domain for? (minimum: ${minDuration / 60 / 60 / 24}days)\n`)
      duration = duration * 60 * 60 * 24
      if (duration < minDuration)
        this.error(`Duration must be at least ${minDuration / 60 / 60 / 24} days`)

      // Add 10% to account for price fluctuation; the difference is refunded.
      const price = await controller.rentPrice(name, duration)

      const confirm = await cli.confirm(chalk.yellow(`To extend this domain will cost ${ethers.utils.formatEther(price)} ETH, is this okay? (yes/no)`))
      if (!confirm) this.exit()

      await controller.renew(name, duration, { value: price.mul(11).div(10) })

      this.log(chalk.green(`Extended ${name}.eth for ${duration / 60 / 60 / 24} days`))
    }
}
