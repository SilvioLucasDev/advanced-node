import { badRequest, unauthorized, type HttpResponse, serverError, ok } from '@/application/helpers'
import { RequiredFieldError } from '@/application/errors'
import { type FacebookAuthentication } from '@/domain/features'
import { AccessToken } from '@/domain/models'

type httpRequest = {
  token: string | undefined | null
}
type Model = Error | {
  accessToken: string
}

export class FacebookLoginController {
  constructor (private readonly facebookAuthentication: FacebookAuthentication) {}

  async handle (httpRequest: httpRequest): Promise<HttpResponse<Model>> {
    try {
      if (httpRequest.token === '' || httpRequest.token === null || httpRequest.token === undefined) {
        return badRequest(new RequiredFieldError('token'))
      }

      const accessToken = await this.facebookAuthentication.perform({ token: httpRequest.token })

      if (accessToken instanceof AccessToken) {
        return ok({ accessToken: accessToken.value })
      }
      return unauthorized()
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
