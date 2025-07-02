import type { AccessArgs } from 'payload/config'

import { checkRole } from '../collections/Users/checkRole'
import type { User } from '../payload-types'
import { admins } from './admins';

type isAdmin = (args: AccessArgs<unknown, User>) => boolean
type isEditor = (args: AccessArgs<unknown, User>) => boolean

// @ts-ignore
export const editors: isAdmin = ({ req: { user } }) => {
  return admins || checkRole(['editor'], user)
}
