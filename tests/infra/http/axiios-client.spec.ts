import { type HttpGetClient } from '@/infra/http'
import axios from 'axios'

jest.mock('axios')

class AxiosHttpClient {
  async get (params: HttpGetClient.Params): Promise<void> {
    const { params: queryParams, url } = params

    await axios.get(url, { params: queryParams })
  }
}

describe('AxiosHttpClient', () => {
  describe('get', () => {
    it('should call get with correct params', async () => {
      const fakeAxios = axios as jest.Mocked<typeof axios>
      const sut = new AxiosHttpClient()

      await sut.get({
        url: 'any_url',
        params: {
          any: 'any'
        }
      })

      expect(fakeAxios.get).toHaveBeenCalledWith('any_url', {
        params: {
          any: 'any'
        }
      })
      expect(fakeAxios.get).toHaveBeenCalledTimes(1)
    })
  })
})
