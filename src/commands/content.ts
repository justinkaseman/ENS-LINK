import { Command, flags } from '@oclif/command'
import { ethers } from 'ethers'
import { ensRegistry, ensResolver } from "../utils/contract";
import { readConfig } from '../utils/config'
import cli from 'cli-ux'
import chalk from 'chalk'
import { BrainWallet } from "@ethersproject/experimental"

export default class Content extends Command {
    static description = 'Adds content to a domain or subdomain'

    static examples = [
        '$ ens-link content',
    ]

    static flags = {
        help: flags.help({ char: 'h' }),
        domain: flags.string({ char: 's', description: 'The name of the domain to add content to' }),
        content: flags.string({ char: 'd' }),
    }


    async run() {
        const { flags } = this.parse(Content)

        let config;
        try {
            config = await readConfig(this.config.configDir, "config.json")
        } catch {
            this.error('Could not read config')
        }

        const wallet = await BrainWallet.generate(config.email, config.password)
        const provider = new ethers.providers.JsonRpcProvider(config.endpoint)
        const signer = wallet.connect(provider)

        const domain: string = flags.domain || await cli.prompt('What domain would you like to add content to?')
        const node = ethers.utils.namehash(domain)

        let registry = await ensRegistry(config?.endpoint, this.config.cacheDir)
        registry = await registry.connect(signer)

        const owner = await registry.owner(ethers.utils.namehash(domain))
        if (wallet.address !== owner) this.error('This domain isn\'t owned by the currently configured account')

        // Ensure a resolver is set, if not defaults to the public resolver
        const currentResolver = await registry.resolver(node)
        if (ethers.constants.AddressZero === currentResolver) {
            const publicResolver = await provider.resolveName('resolver.eth')
            await registry.setResolver(node, publicResolver)
        }

        const content: string = flags.content || await cli.prompt(`What address would you like ${domain} to resolve to?`)
        if (!ethers.utils.isAddress(content)) this.error('Content for the domain to resolve to is not a valid address')

        let resolver = await ensResolver(config?.endpoint, this.config.cacheDir)
        resolver = await resolver.connect(signer)
        const setAddrGas = await resolver.estimateGas['setAddr(bytes32,address)'](node, content)
        const confirm = await cli.confirm(chalk.yellow(`It will cost ${ethers.utils.formatEther(setAddrGas)} ETH to set the content, is this okay?`))
        if (!confirm) this.exit()
        await resolver['setAddr(bytes32,address)'](node, content)

        this.log(chalk.green(`Set ${domain} to resolve to ${content}`))
    }
}
