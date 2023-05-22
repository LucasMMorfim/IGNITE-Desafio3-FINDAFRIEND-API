import { OrgRepository } from "@/repositories/org-repository"
import { hash } from "bcryptjs"
import { OrgAlreadyExistsError } from "./errors/org-already-exists-error"
import { CityRepository } from "@/repositories/city-repository"


interface CityData {
  name: string
}

interface RegisterOrgUseCaseRequest {
  name: string
  description: string
  address: string
  whatsapp: string
  email: string
  password: string
  city: CityData
}

export class RegisterOrgUseCase {

  constructor(
    private orgsRepository: OrgRepository, 
    private cityRepositories: CityRepository
  ) {}

  async execute({ name, description, address, whatsapp, email, password, city }: RegisterOrgUseCaseRequest) {
    const password_hash = await hash(password, 6)

    const orgWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError()
    }

    const data = await this.cityRepositories.findByName(city.name)

    await this.orgsRepository.create({
        name,
        description,
        address,
        whatsapp,
        email,
        password_hash,
        pet: {},
        city: {
          ...data ? {
            connect: {
              id: data.id,
            }
          } : { create: { name: city.name }}
        },
      },
    )
  }
}