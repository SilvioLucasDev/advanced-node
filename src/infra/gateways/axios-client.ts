import { type HttpGetClient } from './client'

import axios, { type AxiosResponse } from 'axios'

export class AxiosHttpClient implements HttpGetClient {
  async get <T = AxiosResponse> ({ params, url }: HttpGetClient.Params): Promise<T> {
    return await axios.get(url, { params })
  }
}
