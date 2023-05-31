export class OrgDontExistsError extends Error {
  public name = 'OrgDontExistsError'

  constructor() {
    super('Essa organização não existe')
  }
}