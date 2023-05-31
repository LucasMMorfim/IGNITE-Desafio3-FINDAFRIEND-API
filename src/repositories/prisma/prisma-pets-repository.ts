import { prisma } from '@/lib/prisma'
import { Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  async findAllByCity(city: string): Promise<Pet[] | null> {
    const pets = await prisma.pet.findMany({
      where: {
        ORGs: {
          some: {
            city: {
              name: city
            }
          }
        }
      },
      include: {
        ORGs: true
      }
    })

    return pets
  }

  async findById(id: string) {
    const pet = await prisma.pet.findFirst({
      where: {
        id
      }
    })
    return pet
  }

  async create(data: Prisma.PetCreateInput) {
    const pet = await prisma.pet.create({
      data
    })

    return pet
  }
}
