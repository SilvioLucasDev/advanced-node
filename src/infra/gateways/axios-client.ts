import { type HttpGetClient } from '@/infra/gateways'

import axios, { type AxiosResponse } from 'axios'

export class AxiosHttpClient implements HttpGetClient {
  async get <T = AxiosResponse> ({ params, url }: HttpGetClient.Input): Promise<T> {
    const result = await axios.get(url, { params })
    return result.data
  }
}
