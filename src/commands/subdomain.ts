import { Command, flags } from '@oclif/command'
import { ethers } from 'ethers'
import { ensRegistry } from "../utils/contract";
import { readConfig } from '../utils/config'
import cli from 'cli-ux'
import chalk from 'chalk'
import { BrainWallet } from "@ethersproject/experimental"

export default class Subdomain extends Command {
    static description = 'Register a feed with an ENS address'

    static examples = [
        '$ ens-link register',
    ]

    static flags = {
        help: flags.help({ char: 'h' }),
        subdomain: flags.string({ char: 's', description: 'name to print' }),
        domain: flags.string({ char: 'd' }),
    }


    async run() {
        const { flags } = this.parse(Subdomain)

        let config;
        try {
            config = await readConfig(this.config.configDir, "config.json")
        } catch {
            this.error('Could not read config')
        }

        const subdomain: string = flags.subdomain || await cli.prompt('What subdomain name would you like to register?')
        const domain: string = flags.domain || await cli.prompt('What domain name would you like to register?')

        const wallet = await BrainWallet.generate(config.email, config.password)
        const provider = new ethers.providers.JsonRpcProvider(config.endpoint)
        const signer = wallet.connect(provider)

        let registry = await ensRegistry(config?.endpoint, this.config.cacheDir)
        registry = await registry.connect(signer)

        const gas = await registry.estimateGas.setSubnodeOwner(ethers.utils.namehash(domain), ethers.utils.id(subdomain), wallet.address)
        const confirm = await cli.confirm(chalk.yellow(`It will cost ${ethers.utils.formatEther(gas)} ETH to set the content, is this okay?`))
        if (!confirm) this.exit()

        await registry.setSubnodeOwner(ethers.utils.namehash(domain), ethers.utils.id(subdomain), wallet.address)

        this.log(chalk.green(`Created ${subdomain}.${domain}`))
    }
}

