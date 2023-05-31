import { PetsRepository } from '@/repositories/pets-repository'

interface CityData {
  name: string
}

interface PetData {
  city: CityData
}

export class GetPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ city: { name } }: PetData) {
    const data = await this.petsRepository.findAllByCity(name)

    return data
  }
}
