import type { Access } from 'payload/config'

import { checkRole } from '../collections/Users/checkRole'

export const adminsOrPublished: Access = ({ req: { user } }) => {
  if (user && (checkRole(['admin'], user) || checkRole(['editor'], user))) {
    return true
  }

  return {
    _status: {
      equals: 'published',
    },
  }
}
