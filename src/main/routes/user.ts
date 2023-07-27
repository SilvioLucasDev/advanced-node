import { auth } from '@/main/middlewares'

import { type Router } from 'express'

export default (router: Router): void => {
  router.delete('/users/picture', auth)
}
