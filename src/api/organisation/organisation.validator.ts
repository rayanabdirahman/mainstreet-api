import * as Joi from 'joi'
import { CreateOrganisationModel } from '../../domain/interfaces/organisation.interface'

export default class OrganisationValidator {  
  static createOneSchema: Joi.ObjectSchema = Joi.object({
    name: Joi.string().required(),
    username: Joi.string().required(),
    avatar: Joi.string().required(),
  })

  static createOne(model: CreateOrganisationModel): Joi.ValidationResult {
    return this.createOneSchema.validate(model)
  }
}
