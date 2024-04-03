import { Application, Entity } from '../database.js'

/**
 * @type FastifyRegister
 */
const EntitiesRouter = (app, opts, done) => {
  app.get('/', async (req, rep) => {
    const entities = (await Entity.findAll()).map(e => e.dataValues)
    return rep.view('/entities/index.hbs', { entities })
  })

  app.get('/edit/:id', async (req, rep) => {
    const id = req.params.id
    const applications = (await Application.findAll()).map(e => e.dataValues)

    const isEdit = id != 0

    if (!isEdit) {
      return rep.view('/entities/edit.hbs', { isEdit, applications })
    }
    const edit = (await Entity.findByPk(req.params.id)).dataValues

    return rep.view('/entities/edit.hbs', { edit, isEdit })
  })

  app.post('/', async (req, rep) => {
    console.log(req.body)

    // await Entity.create(req.body)

    return rep.view('/partials/reload.hbs', { to: 'entities' })
  })

  app.put('/:id', async (req, rep) => {
    const old = await Entity.findByPk(req.params.id)

    old.set(req.body)
    await old.save()

    return rep.view('/partials/reload.hbs', { to: 'entities' })
  })

  app.delete('/:id', async (req, rep) => {
    await (await Entity.findByPk(req.params.id)).destroy()

    return rep.view('/partials/reload.hbs', { to: 'entities' })
  })

  done()
}

export default EntitiesRouter
