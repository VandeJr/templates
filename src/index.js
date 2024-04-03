import Fastify from 'fastify'
import * as fastifyFormBody from '@fastify/formbody'
import * as fastifyView from '@fastify/view'
import * as fastifyStatic from '@fastify/static'
import { publicPath, viewsPath } from './config.js'
import { sequelize } from './database.js'
import handlebars from './handlebars.js'

const app = Fastify({ logger: true })

app.register(fastifyFormBody)
app.register(fastifyView, { engine: { handlebars: handlebars }, root: viewsPath, options: { compileOptions: {} } })
app.register(fastifyStatic, { root: publicPath, prefix: '/public/' })

app.register(import('./routes/applications.js'), { prefix: 'applications' })
app.register(import('./routes/entities.js'), { prefix: 'entities' })
app.register(import('./routes/types.js'), { prefix: 'types' })

app.get('/', async (req, rep) => {
  const navBar = ['applications', 'entities', 'types']

  return rep.view('/index.hbs', { navBar })
})

try {
  await sequelize.authenticate()
  await sequelize.sync()
  await app.listen({ port: 3000 })
} catch (e) {
  app.log.error(e)
  process.exit(1)
}
