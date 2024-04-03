import { Type } from '../database.js'

/**
 * @type FastifyRegister
 */
const TypesRouter = (app, opts, done) => {
  app.get('/', async (req, rep) => {
    const types = (await Type.findAll()).map(e => e.dataValues)

    return rep.view('/types/index.hbs', { types })
  })

  app.get('/edit/:id', async (req, rep) => {
    const id = req.params.id
    const isEdit = id != 0
    if (!isEdit) {
      return rep.view('/types/edit.hbs', { isEdit })
    }
    const edit = (await Type.findByPk(req.params.id)).dataValues

    return rep.view('/types/edit.hbs', { edit, isEdit })
  })

  app.post('/', async (req, rep) => {
    await Type.create(req.body)

    return rep.view('/partials/reload.hbs', { to: 'types' })
  })

  app.put('/:id', async (req, rep) => {
    const old = await Type.findByPk(req.params.id)

    old.set(req.body)
    await old.save()

    return rep.view('/partials/reload.hbs', { to: 'types' })
  })

  app.delete('/:id', async (req, rep) => {
    await (await Type.findByPk(req.params.id)).destroy()

    return rep.view('/partials/reload.hbs', { to: 'types' })
  })

  done()
}

export default TypesRouter
