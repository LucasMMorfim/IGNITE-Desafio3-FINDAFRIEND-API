import { PetsRepository } from '@/repositories/pets-repository'

interface PetData {
  id: string
}

export class GetPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ id }: PetData) {
    const data = await this.petsRepository.findById(id)

    return data
  }
}
