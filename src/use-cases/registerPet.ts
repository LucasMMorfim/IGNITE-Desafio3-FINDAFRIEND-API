import { OrgRepository } from '@/repositories/orgs-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { OrgDontExistsError } from './errors/org-dont-exists-error'

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
  org: OrgData
}

export class RegisterPetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgRepository
  ) {}

  async execute({
    type,
    breed,
    name,
    age,
    size,
    color,
    org
  }: registerPetUseCaseRequest) {
    const data = await this.orgsRepository.findByName(org.name)

    if (!data) {
      throw new OrgDontExistsError()
    }

    await this.petsRepository.create({
      type,
      breed,
      name,
      age,
      size,
      color,
      ORGs: {
        connect: {
          id: data.id
        }
      }
    })
  }
}
