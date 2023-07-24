import { forbiddenError, type HttpResponse } from '@/application/helpers'
import { ForbiddenError } from '@/application/errors'

type HttpRequest = { authorization: string }

class AuthenticationMiddleware {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse<Error>> {
    return forbiddenError()
  }
}

describe('AuthenticationMiddleware', () => {
  it('should return 403 authorizations is empty', async () => {
    const sut = new AuthenticationMiddleware()

    const httpResponse = await sut.handle({ authorization: '' })

    expect(httpResponse).toEqual({
      statusCode: 403,
      data: new ForbiddenError()
    })
  })

  it('should return 403 authorizations is null', async () => {
    const sut = new AuthenticationMiddleware()

    const httpResponse = await sut.handle({ authorization: null as any })

    expect(httpResponse).toEqual({
      statusCode: 403,
      data: new ForbiddenError()
    })
  })

  it('should return 403 authorizations is undefined', async () => {
    const sut = new AuthenticationMiddleware()

    const httpResponse = await sut.handle({ authorization: undefined as any })

    expect(httpResponse).toEqual({
      statusCode: 403,
      data: new ForbiddenError()
    })
  })
})
