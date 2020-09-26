import { expect, test } from '@oclif/test'
import { readConfig } from '../../src/utils/config'

describe('configure command', () => {
    test
        // .stdout()
        .command(['configure', '--email=testemail', '--password=testpassword', '--endpoint=https://test.com'])
        .it('successfully runs configure command', async ctx => {
            let initialConfig
            try {
                initialConfig = await readConfig(ctx.config.configDir)
            } catch {
                initialConfig = null
            }
            expect(initialConfig).to.eql({ email: 'testemail', endpoint: 'https://test.com', password: 'testpassword' })
        })
})
