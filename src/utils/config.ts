import * as fs from 'fs-extra'
import * as path from 'path'

export interface Config {
    email: string;
    password: string;
    endpoint: string;
}

export interface Cache {
    registrar?: string;
    controller?: string;
    registry?: string;
    resolver?: string;
}

export const readConfig = async (dir: string): Promise<Config> => fs.readJSON(path.join(dir, 'config.json'))
export const writeConfig = async (dir: string, json: Config): Promise<void> => fs.outputJson(path.join(dir, 'config.json'), json)

export const readCache = async (dir: string): Promise<Cache> => fs.readJSON(path.join(dir, 'cache.json'))
export const writeCache = async (dir: string, json: Cache): Promise<void> => fs.outputJson(path.join(dir, 'cache.json'), json)
