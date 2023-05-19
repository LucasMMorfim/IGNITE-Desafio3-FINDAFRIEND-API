import { FastifyInstance } from "fastify";
import { registerPets } from "./controllers/registerPet";
import { registerOrgs } from "./controllers/registerOrg";

export async function appRoutes(app: FastifyInstance) {
  app.post('/pets', registerPets)

  app.post('/orgs', registerOrgs)
}