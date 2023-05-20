import { OrgRepository } from "@/repositories/org-repository"
import { hash } from "bcryptjs"
import { OrgAlreadyExistsError } from "./errors/org-already-exists-error"
import { PetsRepository } from "@/repositories/pets-repository"


interface RegisterOrgUseCaseRequest {
  name: string
  description: string
  address: string
  whatsapp: string
  email: string
  password: string
}

export class RegisterOrgUseCase {

  constructor(private orgsRepository: OrgRepository, petsRepository: PetsRepository) {}

  async execute({ name, description, address, whatsapp, email, password }: RegisterOrgUseCaseRequest) {
    const password_hash = await hash(password, 6)

    const orgWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError()
    }


    await this.orgsRepository.create({
      name,
      description,
      address,
      whatsapp,
      email,
      password_hash,
      pet,
      city: {
        create:{
          name: 'city-01',
          description: 'description-01'
        }
      },
    })
  }
}