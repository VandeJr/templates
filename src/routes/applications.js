import { Application } from '../database.js'

/**
 * @type FastifyRegister
 */
const ApplicationsRouter = (app, opts, done) => {
  app.get('/', async (req, rep) => {
    const applications = (await Application.findAll()).map(e => e.dataValues)

    return rep.view('/applications/index.hbs', { applications })
  })

  app.get('/edit/:id', async (req, rep) => {
    const id = req.params.id
    const isEdit = id != 0
    if (!isEdit) {
      return rep.view('/applications/edit.hbs', { isEdit })
    }
    const edit = (await Application.findByPk(req.params.id)).dataValues

    return rep.view('/applications/edit.hbs', { edit, isEdit })
  })

  app.post('/', async (req, rep) => {
    await Application.create(req.body)

    return rep.view('/partials/reload.hbs', { to: 'applications' })
  })

  app.put('/:id', async (req, rep) => {
    const old = await Application.findByPk(req.params.id)

    old.set(req.body)
    await old.save()

    return rep.view('/partials/reload.hbs', { to: 'applications' })
  })

  app.delete('/:id', async (req, rep) => {
    await (await Application.findByPk(req.params.id)).destroy()

    return rep.view('/partials/reload.hbs', { to: 'applications' })
  })

  done()
}

export default ApplicationsRouter
