import { prisma } from "@/lib/prisma";
import { City } from "@prisma/client";
import { CityRepository } from "../city-repository";

export class PrismaCityRepository implements CityRepository {
  async findByName(name: string): Promise<City | null> {
    const city = await prisma.city.findFirst({
      where: {
        name
      }
    })

    return city
  }
}