import { FastifyInstance } from 'fastify'
import { registerPets } from './controllers/registerPet'
import { registerOrgs } from './controllers/registerOrg'
import { getAllPets } from './controllers/getAllPets'
import { getPets } from './controllers/getPet'

export async function appRoutes(app: FastifyInstance) {
  app.post('/pets', registerPets)
  app.post('/orgs', registerOrgs)

  app.get(
    '/pets',
    {
      schema: {
        querystring: {
          city: { type: 'string' }
        }
      }
    },
    getAllPets
  )

  app.get('/pets/:id', getPets)
}
