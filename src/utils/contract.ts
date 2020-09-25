import { ethers } from 'ethers'
import { controllerAbi, registrarAbi, registryAbi, resolverAbi } from '../abi'
import { readConfig, writeConfig } from "../utils/config"

export const readCache = async (cacheDir: string) => {
    try {
        return await readConfig(cacheDir, 'cache.json')
    } catch {
        return {}
    }
}

export const ensRegistrar = (endpoint: string, cacheDir: string): Promise<ethers.Contract> => {
    return new Promise(async (resolve, reject) => {
        try {
            const cache = await readCache(cacheDir)
            const provider = new ethers.providers.JsonRpcProvider(endpoint)
            const registrarAddress = cache['registrar'] || await provider.resolveName('.eth')
            if (cacheDir && !cache['registrar']) writeConfig(cacheDir, 'cache.json', { ...cache, registrar: registrarAddress })
            resolve(new ethers.Contract(registrarAddress, registrarAbi, provider))
        } catch {
            reject()
        }
    })
}


export const ensRegistry = (endpoint: string, cacheDir: string): Promise<ethers.Contract> => {
    return new Promise(async (resolve, reject) => {
        try {
            const provider = new ethers.providers.JsonRpcProvider(endpoint)
            const cache = await readCache(cacheDir)
            let registryAddress
            if (cache['registry']) registryAddress = cache['registry']
            else {
                const registrarContract = await ensRegistrar(endpoint, cacheDir)
                registryAddress = await registrarContract.ens()
            }
            if (cacheDir && !cache['registry']) writeConfig(cacheDir, 'cache.json', { ...cache, registry: registryAddress })
            resolve(new ethers.Contract(registryAddress, registryAbi, provider))
        } catch {
            reject()
        }
    })
}


export const ensResolver = (endpoint: string, cacheDir: string): Promise<ethers.Contract> => {
    return new Promise(async (resolve, reject) => {
        try {
            const provider = new ethers.providers.JsonRpcProvider(endpoint)
            const cache = await readCache(cacheDir)
            let resolverAddress
            if (cache['resolver']) resolverAddress = cache['resolver']
            else {
                resolverAddress = await provider.resolveName('resolver.eth')
            }
            if (cacheDir && !cache['resolver'])
                writeConfig(cacheDir, 'cache.json', { ...cache, resolver: resolverAddress })
            resolve(new ethers.Contract(resolverAddress, resolverAbi, provider))
        } catch {
            reject()
        }
    })
}

export const ensController = (endpoint: string, cacheDir: string): Promise<ethers.Contract> => {
    return new Promise(async (resolve, reject) => {
        try {
            const provider = new ethers.providers.JsonRpcProvider(endpoint)
            const cache = await readCache(cacheDir)
            console.log(cache)
            let controllerAddress
            if (cache['controller']) controllerAddress = cache['controller']
            else {
                const resolverContract = await ensResolver(endpoint, cacheDir)
                const ethNodehash = ethers.utils.namehash('eth')
                const controllerInterfaceId = '0x018fac06'
                controllerAddress = await resolverContract.interfaceImplementer(ethNodehash, controllerInterfaceId)
            }
            if (cacheDir && !cache['controller']) writeConfig(cacheDir, 'cache.json', { ...cache, controller: controllerAddress })
            resolve(new ethers.Contract(controllerAddress, controllerAbi, provider))
        } catch {
            reject()
        }
    })
}