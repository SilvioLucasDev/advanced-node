import { FacebookApi } from '@/infra/apis'
import { AxiosHttpClient } from '@/infra/http'
import { env } from '@/main/config/env'

describe('Facebook Api integration tests', () => {
  it('should return a Facebook User if token is valid', async () => {
    const axiosClient = new AxiosHttpClient()
    const sut = new FacebookApi(axiosClient, env.facebookApi.clientId, env.facebookApi.clientSecret)

    const fbUser = await sut.loadUser({ token: 'EAANZBZAWujfKYBAE3yYKHXN8St6P5jgZBSQYZALFlwjOxCrZBcFzfyqJvU9sWmG6M8OZBnqq4liQVTuDtFfeK5lDZBYU1V7HlzZCMSDEiZB3maW9Wcdmlz9LEI8Qyi292OMZCZB84FwmLknEOyAGbuTBwMNBf50O5hivkrYQZBa5dzW6RutMXkbEJ1uj47BbzOFNYTjjVRXidNtZCtZAkOrWHVMTklgZA4RUNMhlZCaD5OB4GKgaPLZCM89WNfKYZB2IMFQXT6er8ZD' })

    expect(fbUser).toEqual({
      name: 'EO Trem',
      email: 'silviolucas_santos@hotmail.com',
      facebookId: '2510341602452318'
    })
  })

  it('should return undefined if token is invalid', async () => {
    const axiosClient = new AxiosHttpClient()
    const sut = new FacebookApi(axiosClient, env.facebookApi.clientId, env.facebookApi.clientSecret)

    const fbUser = await sut.loadUser({ token: 'invalid' })

    expect(fbUser).toBeUndefined()
  })
})
