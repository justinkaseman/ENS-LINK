import * as fs from 'fs-extra'
import * as path from 'path'

export interface Config {
    email: string;
    password: string;
    endpoint: string;
}
export const readConfig = async (dir: string, fileName: string): Promise<Config> => fs.readJSON(path.join(dir, fileName))

export const writeConfig = async (dir: string, fileName: string, json: JSON): Promise<void> => fs.outputJson(path.join(dir, fileName), json)
