const ganache = require('ganache-cli')
const server = ganache.server()

export const mochaHooks = {
    beforeAll(done) {
        server.listen()
        done()
    },
    afterAll(done) {
        server.stop()
        done()
    }

};