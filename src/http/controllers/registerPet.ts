import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { RegisterPetUseCase } from '@/use-cases/registerPet'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'

export async function registerPets(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const registerBodySchema = z.object({
    type: z.string(),
    breed: z.string(),
    name: z.string(),
    age: z.string(),
    size: z.string(),
    color: z.string(),
    org: z.object({
      name: z.string()
    })
  })
  try {
    const { type, breed, name, age, size, color, org } =
      registerBodySchema.parse(request.body)

    const petsRepository = new PrismaPetsRepository()
    const orgsRepository = new PrismaOrgsRepository()
    const registerPetUseCase = new RegisterPetUseCase(
      petsRepository,
      orgsRepository
    )

    await registerPetUseCase.execute({
      type,
      breed,
      name,
      age,
      size,
      color,
      org
    })

    reply.status(201).send({
      ok: true
    })
  } catch (err) {
    return reply.status(400).send('informações incorretas')
  }

  return reply.status(201).send()
}
