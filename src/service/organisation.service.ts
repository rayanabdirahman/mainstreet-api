import { injectable, inject } from 'inversify'
import { OrganisationDocument } from '../database/model/organisation.model'
import { OrganisationRepository } from '../database/repository/organisation.repository'
import { CreateOrganisationModel } from '../domain/interfaces/organisation.interface'
import TYPES from '../types'
import logger from '../utilities/logger'

export interface OrganisationService {
  createOne(model: CreateOrganisationModel): Promise<OrganisationDocument>
  findOneById(_id: string): Promise<OrganisationDocument | null>
  findAll(): Promise<OrganisationDocument[] | null>
}

@injectable()
export class OrganisationServiceImpl implements OrganisationService {
  private organisationRepository: OrganisationRepository
  
  constructor(@inject(TYPES.OrganisationRepository) organisationRepository: OrganisationRepository) {
    this.organisationRepository = organisationRepository
  }

  private async isUsernameTaken(username: string): Promise<boolean> {
    return await this.organisationRepository.findByUsername(username) ? Promise.resolve(true) : Promise.resolve(false)
  }

  async createOne(model: CreateOrganisationModel): Promise<OrganisationDocument> {
    try {
      if (await this.isUsernameTaken(model.username)) {
        throw new Error('Username already in use')
      }

      return await this.organisationRepository.createOne(model)

    } catch(error) {
      logger.error(`[OrganisationService: createOne]: Unabled to create new organisation: ${error}`)
      throw error
    }
  }

  async findOneById(_id: string): Promise<OrganisationDocument | null> {
    try {
      return await this.organisationRepository.findById(_id)
    } catch(error) {
      logger.error(`[OrganisationService: findOneById]: Unable to find organisation: ${error}`)
      throw error
    }
  }

  async findAll(): Promise<OrganisationDocument[] | null> {
    try {
      return await this.organisationRepository.findAll()
    } catch(error) {
      logger.error(`[OrganisationService: findAll]: Unable to find organisations: ${error}`)
      throw error
    }
  }
}
