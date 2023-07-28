import { type HttpGetClient } from '@/infra/gateways'

import axios, { type AxiosResponse } from 'axios'

export class AxiosHttpClient implements HttpGetClient {
  async get <T = AxiosResponse> ({ params, url }: HttpGetClient.Input): Promise<T> {
    return await axios.get(url, { params })
  }
}
