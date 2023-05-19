import { PetsRepository } from "@/repositories/pets-repository"

interface registerPetUseCaseRequest {
  type: string
  breed: string
  name: string
  age: string
  size: string
  color: string
}

export class RegisterPetUseCase {
  constructor(private petsRepository: PetsRepository) {}


  async execute({ type, breed, name, age, size, color }: registerPetUseCaseRequest) {
  
    await this.petsRepository.create({
      type,
      breed, 
      name, 
      age, 
      size, 
      color
    })
  }
}