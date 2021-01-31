import express from 'express'
import { injectable, inject } from 'inversify'
import { RegistrableController } from '../registrable.controller'
import TYPES from '../../types'
import { CreateOrganisationModel } from '../../domain/interfaces/organisation.interface'
import OrganisationValidator from './organisation.validator'
import ApiResponse from '../../utilities/api-response'
import { OrganisationService } from '../../service/organisation.service'
import logger from '../../utilities/logger'

@injectable()
export default class OrganisationController implements RegistrableController {
  private organisationService: OrganisationService

  constructor(@inject(TYPES.OrganisationService) organisationService: OrganisationService) {
    this.organisationService = organisationService
  }

  registerRoutes(app: express.Application): void {
    app.post('/api/organisation/', this.createOne)
    app.get('/api/organisation/:_id', this.findOneById)
    app.get('/api/organisation/', this.findAll)
  }

  createOne = async (req: express.Request, res: express.Response): Promise<express.Response> => {
    logger.info('[OrganisationController: createOne]: [START] ');
    try {
      const model: CreateOrganisationModel = {
        ...req.body,
        // default avatar
        avatar: `https://eu.ui-avatars.com/api/?name=${req.body.name.replace(/\s/g, '')}&background=random&bold=true&rounded=true`
      }

      // validate request body
      const validity = OrganisationValidator.createOne(model)
      if (validity.error) {
        const { message } = validity.error
        return ApiResponse.error(res, message)
      }

      const organisation = await this.organisationService.createOne(model)

      logger.info('[OrganisationController: createOne]: [END] ');
      return ApiResponse.success(res,  { organisation })

    } catch (error) {
      const { message } = error
      logger.error(`[OrganisationController: createOne] - Unable to create organisation: ${message}`)
      return ApiResponse.error(res, message)
    }
  }

  findOneById = async (req: express.Request, res: express.Response): Promise<express.Response> => {
    logger.info('[OrganisationController: findOneById]: [START] ');
    try {
      const { _id } = req.params
      const organisation = await this.organisationService.findOneById(_id)

      logger.info('[OrganisationController: findOneById]: [END] ');
      return ApiResponse.success(res, { organisation })

    } catch (error) {
      const { message } = error
      logger.error(`[OrganisationController: findOneById] - Unable to find organisation: ${message}`)
      return ApiResponse.error(res, error)
    }
  }

  findAll = async (req: express.Request, res: express.Response): Promise<express.Response> => {
    logger.info('[OrganisationController: findAll]: [START] ');
    try {
      const organisations = await this.organisationService.findAll()

      logger.info('[OrganisationController: findAll]: [END] ');
      return ApiResponse.success(res, { organisations })

    } catch (error) {
      const { message } = error
      logger.error(`[OrganisationController: findAll] - Unable to find organisation: ${message}`)
      return ApiResponse.error(res, error)
    }
  }
}
