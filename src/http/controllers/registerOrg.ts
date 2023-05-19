import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { RegisterOrgUseCase } from "@/use-cases/registerOrg"
import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository"
import { OrgAlreadyExistsError } from "@/use-cases/errors/org-already-exists-error"

export async function registerOrgs(request: FastifyRequest, reply: FastifyReply) {
  const registerOrgSchema = z.object({
    name: z.string(),
    description: z.string(),
    address: z.string(),
    whatsapp: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
  })

  const { name, description, address, whatsapp, email, password } = registerOrgSchema.parse(request.body)

  try {
    const orgsRepository = new PrismaOrgsRepository()
    const registerOrgsUseCase = new RegisterOrgUseCase(orgsRepository)


    await registerOrgsUseCase.execute({
      name,
      description,
      address,
      whatsapp,
      email,
      password,
    })

  } catch (err) {

    if (err instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }
     
    throw err 
  }

  return reply.status(201).send
}