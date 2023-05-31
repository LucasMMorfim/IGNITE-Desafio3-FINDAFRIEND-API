import { Org, Prisma } from "@prisma/client";

export interface OrgRepository {
  findByEmail(email: String): Promise<Org | null>
  findByName(name: string): Promise<Org | null>
  create(data: Prisma.OrgCreateInput): Promise<Org>
}