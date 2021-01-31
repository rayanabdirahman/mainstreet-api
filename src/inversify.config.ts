import 'reflect-metadata'
import { Container } from 'inversify'
import TYPES from './types'
import { RegistrableController } from './api/registrable.controller'
import OrganisationController from './api/organisation/organisation.controller'
import { OrganisationService, OrganisationServiceImpl } from './service/organisation.service'
import { OrganisationRepository, OrganisationRepositoryImpl } from './database/repository/organisation.repository'

const container = new Container()

// controllers
container.bind<RegistrableController>(TYPES.Controller).to(OrganisationController)

// services
container.bind<OrganisationService>(TYPES.OrganisationService).to(OrganisationServiceImpl)

// repository
container.bind<OrganisationRepository>(TYPES.OrganisationRepository).to(OrganisationRepositoryImpl)

export default container
