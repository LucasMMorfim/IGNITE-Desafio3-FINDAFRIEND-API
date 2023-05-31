import { FastifyRequest, FastifyReply } from 'fastify'

import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { GetPetUseCase } from '@/use-cases/getPet'

export async function getPets(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = request.params as { id: string }

    const petsRepository = new PrismaPetsRepository()
    const getPetUseCase = new GetPetUseCase(petsRepository)

    const data = await getPetUseCase.execute({
      id
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
