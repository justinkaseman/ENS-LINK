import { Command, flags } from '@oclif/command'

export default class Client extends Command {
    static description = 'Starts ENS-LINK\'s graphical interface'

    static examples = [
        '$ ens-link client',
    ]

    static flags = {
        help: flags.help({ char: 'h' }),
    }

    async run() {
        const { args, flags } = this.parse(Client)

        this.log('Client')
    }
}
