import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { GetPetUseCase } from '@/use-cases/getAllPets'

export async function getAllPets(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { city } = request.query as { city: string }

    const petsRepository = new PrismaPetsRepository()
    const getPetUseCase = new GetPetUseCase(petsRepository)

    const data = await getPetUseCase.execute({
      city: {
        name: city
      }
    })

    reply.status(200).send({
      ok: true,
      data
    })
  } catch (err) {
    console.log(err)
    return reply.status(400).send('informações incorretas')
  }
}
