export class OrgAlreadyExistsError extends Error {
  public name = 'OrgAlreadyExistsError'

  constructor() {
    super('E-mail or name already exists.')
  }
}
