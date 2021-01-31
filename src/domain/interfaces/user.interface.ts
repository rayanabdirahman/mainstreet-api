import { RoleEnum } from '../enums/role.enum';

export interface UserModel {
  _id: string | object
  name: string
  username: string
  avatar: string
  email: string
  role: RoleEnum
}
