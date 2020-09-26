import { ethers } from 'ethers'
import { controllerAbi, registrarAbi, registryAbi, resolverAbi } from '../abi'
import { readCache, writeCache } from '../utils/config'
import { Cache } from './config'

export const getcache = (cacheDir: string): Promise<Cache> => {
    return new Promise(async (resolve, reject) => {
        try {
            const cache = await readCache(cacheDir)
            resolve(cache)
        } catch {
            resolve({})
        }
    })
}

export const ensRegistrar = (endpoint: string, cacheDir: string): Promise<ethers.Contract> => {
    return new Promise(async (resolve, reject) => {
        try {
            const cache = await getcache(cacheDir)
            const provider = new ethers.providers.JsonRpcProvider(endpoint)
            const registrarAddress = cache.registrar || await provider.resolveName('.eth')
            if (cacheDir && !cache.registrar) writeCache(cacheDir, { ...cache, registrar: registrarAddress })
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
            const cache = await getcache(cacheDir)
            let registryAddress
            if (cache.registry) registryAddress = cache.registry
            else {
                const registrarContract = await ensRegistrar(endpoint, cacheDir)
                registryAddress = await registrarContract.ens()
            }
            if (cacheDir && !cache.registry) writeCache(cacheDir, { ...cache, registry: registryAddress })
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
            const cache = await getcache(cacheDir)
            let resolverAddress
            if (cache.resolver) resolverAddress = cache.resolver
            else {
                resolverAddress = await provider.resolveName('resolver.eth')
            }
            if (cacheDir && !cache.resolver)
                writeCache(cacheDir, { ...cache, resolver: resolverAddress })
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
            const cache = await getcache(cacheDir)
            console.log(cache)
            let controllerAddress
            if (cache.controller) controllerAddress = cache.controller
            else {
                const resolverContract = await ensResolver(endpoint, cacheDir)
                const ethNodehash = ethers.utils.namehash('eth')
                const controllerInterfaceId = '0x018fac06'
                controllerAddress = await resolverContract.interfaceImplementer(ethNodehash, controllerInterfaceId)
            }
            if (cacheDir && !cache.controller) writeCache(cacheDir, { ...cache, controller: controllerAddress })
            resolve(new ethers.Contract(controllerAddress, controllerAbi, provider))
        } catch {
            reject()
        }
    })
}
