import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { RegisterPetUseCase } from "@/use-cases/registerPet"
import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository"

export async function registerPets (request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    type: z.string(),
    breed: z.string(),
    name: z.string(),
    age : z.string(),
    size: z.string(),
    color: z.string()
  })
  try {
    const { type, breed, name, age, size, color } = registerBodySchema.parse(request.body)

    const petsRepository = new PrismaPetsRepository
    const registerPetUseCase = new RegisterPetUseCase(petsRepository)


    await registerPetUseCase.execute({
      type,
      breed, 
      name, 
      age, 
      size, 
      color
    })
  } catch (err) {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}