import { Command, flags } from '@oclif/command'
import cli from 'cli-ux'
import { readConfig } from '../utils/config'
import { ethers } from 'ethers'
import { get } from '../utils/http-get'
import { sleep } from '../utils/sleep'
import { saveAbi } from '../utils/abi'
import chalk from 'chalk'

export default class Abi extends Command {
    static description = 'Pulls the latest ABIs using the configured network'

    static examples = [
      '$ ens-link abi --apiKey=22e1e1d2d222',
    ]

    static flags = {
      help: flags.help({ char: 'h' }),
      apiKey: flags.string({ char: 'k', default: 'YourApiKeyToken', description: 'Optional Etherscan API key to avoid rate limits' }),
    }

    async run() {
      const { flags } = this.parse(Abi)

      try {
        const { endpoint } = await readConfig(this.config.configDir)
        const provider = await new ethers.providers.JsonRpcProvider(endpoint)
        const network = await provider.getNetwork()

        // Etherscan API has a 5 second rate limit. See https://info.etherscan.com/api-return-errors/
        this.log(`Getting ABIs for ${network.name[0].toUpperCase() + network.name.slice(1)} - this may take a minute or two\n`)

        cli.action.start('Registrar')
        const registrarAddress = await provider.resolveName('.eth')
        let registrarAbi = await get(`https://api.etherscan.io/api?module=contract&action=getabi&address=${registrarAddress}&apikey=${flags.apiKey}`)
        if (registrarAbi.status === '1') {
          registrarAbi = registrarAbi.result
          await saveAbi('registrar.js', registrarAbi)
        } else this.error('Could not get ABI, check your internet connection or try again a few minutes.')
        cli.action.stop()

        cli.action.start('Registry')
        await sleep(10 * 1000)
        const registrarContract = new ethers.Contract(registrarAddress, registrarAbi, provider)
        const registryAddress = await registrarContract.ens()
        let registryAbi = await get(`https://api.etherscan.io/api?module=contract&action=getabi&address=${registryAddress}&apikey=${flags.apiKey}`)
        if (registryAbi.status === '1') {
          registryAbi = registryAbi.result
          await saveAbi('registry.js', registryAbi)
        } else this.error('Could not get ABI, check your internet connection or try again a few minutes.')
        cli.action.stop()

        cli.action.start('Resolver')
        await sleep(10 * 1000)
        const resolverAddress = await provider.resolveName('resolver.eth')
        let resolverAbi = await get(`https://api.etherscan.io/api?module=contract&action=getabi&address=${resolverAddress}&apikey=${flags.apiKey}`)
        if (resolverAbi.status === '1') {
          resolverAbi = resolverAbi.result
          await saveAbi('resolver.js', resolverAbi)
        } else this.error('Could not get ABI, check your internet connection or try again a few minutes.')
        cli.action.stop()

        cli.action.start('Controller')
        await sleep(10 * 1000)
        const resolverContract = new ethers.Contract(resolverAddress, resolverAbi, provider)
        const controllerInterfaceId = '0x018fac06'
        const ethNodehash = ethers.utils.namehash('eth')
        const controllerAddress = await resolverContract.interfaceImplementer(ethNodehash, controllerInterfaceId)
        let controllerAbi = await get(`https://api.etherscan.io/api?module=contract&action=getabi&address=${controllerAddress}&apikey=${flags.apiKey}`)
        if (controllerAbi.status === '1') {
          controllerAbi = controllerAbi.result
          await saveAbi('controller.js', controllerAbi)
        } else this.error('Could not get ABI, check your internet connection or try again a few minutes.')
        cli.action.stop()

        this.log(chalk.green('Successfully pulled ABIs'))
      } catch (error) {
        this.error(error)
      }
    }
}
