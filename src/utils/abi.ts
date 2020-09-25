import * as fs from 'fs-extra'

export const saveAbi = async (fileName: string, abi: [JSON]) => {
    try {
        await fs.outputFile(`lib/abi/${fileName}`,
            `export default ${abi}`)

    } catch (err) {
        console.error(err)
    }
}