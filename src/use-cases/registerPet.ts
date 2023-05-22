import { OrgRepository } from "@/repositories/org-repository"
import { PetsRepository } from "@/repositories/pets-repository"

interface OrgData {
  name: string
}

interface registerPetUseCaseRequest {
  type: string
  breed: string
  name: string
  age: string
  size: string
  color: string
  ORGs: OrgData
}

export class RegisterPetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgRepository
    ) {}

    
    async execute({ type, breed, name, age, size, color, ORGs }: registerPetUseCaseRequest) {
      
    const data = await this.orgsRepository.findByName(ORGs.name)
  
    await this.petsRepository.create({
      type,
      breed, 
      name, 
      age, 
      size, 
      color,
      ORGs: ORGs.name
    })
  }
}