import { Command, flags } from '@oclif/command'
import { ethers } from 'ethers'
import { ensController } from "../utils/contract";
import { calculateCost } from "../utils/cost";
import { readConfig } from '../utils/config'
import cli from 'cli-ux'
import chalk from 'chalk'
import * as crypto from 'crypto'
import { BrainWallet } from "@ethersproject/experimental"

export default class Register extends Command {
    static description = 'Register a feed with an ENS address'

    static examples = [
        '$ ens-link register',
    ]

    static flags = {
        help: flags.help({ char: 'h' }),
        name: flags.string({ char: 'n', description: 'name to register' }),
        duration: flags.boolean({ char: 'd', description: 'name to print' }),
    }

    async run() {
        const { flags } = this.parse(Register)

        let config;
        try {
            config = await readConfig(this.config.configDir, "config.json")
        } catch {
            this.error('Could not read config')
        }

        const wallet = await BrainWallet.generate(config.email, config.password)
        const provider = new ethers.providers.JsonRpcProvider(config.endpoint)
        const signer = wallet.connect(provider)

        let controller = await ensController(config?.endpoint, this.config.cacheDir)
        controller = controller.connect(signer)

        const name: string = flags.name || await cli.prompt('What domain name would you like to register?')
        const isValid = await controller.valid(name)
        if (!isValid)
            this.error('Domain name is invalid.')
        const isAvailable = await controller.available(name)
        if (!isAvailable)
            this.error('Domain name is already taken.')

        let cost = calculateCost(name);
        this.log(`\nShorter domain names cost less. The cost is $${cost}/year for your name\n`)

        const minDuration = await controller.MIN_REGISTRATION_DURATION()
        let duration = flags.duration || await cli.prompt(`How many days would you like to register this domain for? (minimum: ${minDuration / 60 / 60 / 24}days)\n`)
        duration = duration * 60 * 60 * 24
        if (duration < minDuration)
            this.error(`Duration must be at least ${minDuration / 60 / 60 / 24} days`)

        // Add 10% to account for price fluctuation; the difference is refunded.
        const price = await controller.rentPrice(name, duration)

        const confirm = await cli.confirm(`To register this domain will cost ${ethers.utils.formatEther(price)} ETH, is this okay? (yes/no)`)
        if (!confirm) this.exit()

        // // Generate a random value to mask our commitment
        const random = crypto.randomBytes(32).toJSON().data
        const salt = "0x" + Array.from(random).map(b => b.toString(16).padStart(2, "0")).join("");

        // // Submit our commitment to the smart contract
        const commitment = await controller.makeCommitment(name, wallet.address, salt);
        await controller.commit(commitment);

        cli.action.start(`Registering ${name} - this will take aboout a minute`)

        // Wait 70 seconds before registering
        setTimeout(async () => {
            // Submit our registration request
            await controller.register(name, wallet.address, duration, salt, { value: price.mul(11).div(10) });
            cli.action.stop()
            this.log(chalk.green(`Registered ${name}.eth for ${duration / 60 / 60 / 24} days`))
        }, 70000);
    }
}
