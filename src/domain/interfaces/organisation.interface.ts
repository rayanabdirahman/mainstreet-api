export interface CreateOrganisationModel {
  name: string
  username: string
  // default avatar is set in controller
  avatar: string
}

export interface OrganisationModel {
  _id: string | object
  name: string
  avatar: string
  members: string[]
}
