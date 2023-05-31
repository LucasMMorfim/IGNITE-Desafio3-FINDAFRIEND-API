import { prisma } from '@/lib/prisma'
import { Org, Prisma } from '@prisma/client'
import { OrgRepository } from '../orgs-repository'

export class PrismaOrgsRepository implements OrgRepository {
  async findByEmail(email: string): Promise<Org | null> {
    const org = await prisma.org.findFirst({
      where: {
        email
      }
    })

    return org
  }
  async findByName(name: string): Promise<Org | null> {
    const nameOrg = await prisma.org.findFirst({
      where: {
        name
      }
    })
    return nameOrg
  }

  async create(data: Prisma.OrgCreateInput) {
    const org = await prisma.org.create({
      data
    })

    return org
  }
}
