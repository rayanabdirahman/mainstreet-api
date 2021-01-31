import { injectable } from 'inversify'
import { CreateOrganisationModel } from '../../domain/interfaces/organisation.interface'
import Organisation, { OrganisationDocument } from '../model/organisation.model'

export interface OrganisationRepository {
  createOne(model: CreateOrganisationModel): Promise<OrganisationDocument>
  findById(_id: string): Promise<OrganisationDocument | null>
  findByUsername(username: string): Promise<OrganisationDocument | null>
  findAll(): Promise<OrganisationDocument[] | null>
}

@injectable()
export class OrganisationRepositoryImpl implements OrganisationRepository {
  async createOne(model: CreateOrganisationModel): Promise<OrganisationDocument> {
    const organisation = new Organisation(model)
    return await organisation.save()
  }

  async findById(_id: string): Promise<OrganisationDocument | null> {
    return await Organisation.findOne({ _id }).select('-__v')
  }

  async findByUsername(username: string): Promise<OrganisationDocument | null> {
    return await Organisation.findOne({ username }).select('-__v')
  }

  async findAll(): Promise<OrganisationDocument[] | null> {
    return await Organisation.find({ }).select('-__v')
  }
}
