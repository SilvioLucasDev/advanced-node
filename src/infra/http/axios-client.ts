import { type HttpGetClient } from './client'

import axios, { type AxiosResponse } from 'axios'

export class AxiosHttpClient implements HttpGetClient {
  async get <T = AxiosResponse> (params: HttpGetClient.Params): Promise<T> {
    const { params: queryParams, url } = params

    return await axios.get(url, { params: queryParams })
  }
}
