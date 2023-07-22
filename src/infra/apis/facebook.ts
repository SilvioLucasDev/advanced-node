import { type HttpGetClient } from '@/infra/http'
import { type LoadFacebookUserApi } from '@/data/contracts/apis'

type AppToken = {
  access_token: string
}

type DebugToken = {
  data: {
    user_id: string
  }
}

type UserInfo = {
  id: string
  name: string
  email: string
}

export class FacebookApi implements LoadFacebookUserApi {
  private readonly baseUrl = 'https://graph.facebook.com'

  constructor (
    private readonly httpClient: HttpGetClient,
    private readonly clientId: string,
    private readonly clientSecret: string
  ) {}

  async loadUser ({ token }: LoadFacebookUserApi.Params): Promise<LoadFacebookUserApi.Result> {
    return this.getUserInfo(token)
      .then(({ id, name, email }) => ({ facebookId: id, name, email }))
      .catch(() => undefined)
  }

  private async getAppToken (): Promise<AppToken> {
    const token = await this.httpClient.get({
      url: `${this.baseUrl}/oauth/access_token`,
      params: {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        grant_type: 'client_credentials'
      }
    })

    return token.data
  }

  private async getDebugToken (clientToken: string): Promise<DebugToken> {
    const appToken = await this.getAppToken()

    const userId = await this.httpClient.get({
      url: `${this.baseUrl}/debug_token`,
      params: {
        access_token: appToken.access_token,
        input_token: clientToken
      }
    })

    return userId.data
  }

  private async getUserInfo (clientToken: string): Promise<UserInfo> {
    const debugToken = await this.getDebugToken(clientToken)

    const userInfo = await this.httpClient.get({
      url: `${this.baseUrl}/${debugToken.data.user_id}`,
      params: {
        fields: ['id', 'name', 'email'].join(','),
        access_token: clientToken
      }
    })

    return userInfo.data
  }
}
