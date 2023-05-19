import { ORG, Prisma } from "@prisma/client";

export interface OrgRepository {
  findByEmail(email: String): Promise<ORG | null>
  create(data: Prisma.ORGCreateInput): Promise<ORG>
}