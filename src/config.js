import path from 'path'
import { fileURLToPath } from 'url'
import pkg from 'fastify'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const rootFolder = (location) => path.join(__dirname, '..', location)

const viewsPath = rootFolder('views')
const publicPath = rootFolder('public')
const databasePath = rootFolder('database.sqlite')

const { FastifyRegister } = pkg

export {
  viewsPath, publicPath, databasePath, FastifyRegister
}
