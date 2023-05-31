export class PetDontExistsError extends Error {
  public name = 'PetDontExistsError'

  constructor() {
    super('Esse pet não existe')
  }
}
