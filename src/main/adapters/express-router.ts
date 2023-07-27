import { type Controller } from '@/application/controllers'

import { type RequestHandler } from 'express'

type Adapter = (controller: Controller) => RequestHandler

export const adaptExpressRoute: Adapter = (controller) => {
  return async (req, res) => {
    const { statusCode, data } = await controller.handle({ ...req.body, ...req.locals })
    const json = [200, 204].includes(statusCode) ? data : { error: data.message }
    res.status(statusCode).json(json)
  }
}

// export const adaptExpressRoute = (controller: Controller): RequestHandler => {
//   return async (req, res) => {
//     const httpResponse = await controller.handle({ ...req.body })
//     if (httpResponse.statusCode === 200) {
//       res.status(httpResponse.statusCode).json(httpResponse.data)
//     } else {
//       res.status(httpResponse.statusCode).json({ error: httpResponse.data.message })
//     }
//   }
// }
