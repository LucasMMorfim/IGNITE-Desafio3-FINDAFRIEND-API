import { City } from "@prisma/client";

export interface CityRepository {
  findByName(name: string): Promise<City | null>
}