import { makeFacebookApi } from '@/main/factories/apis'
import { makePgUserAccountRepo } from '@/main/factories/repos'
import { FacebookAuthenticationService } from '@/data/services'

import { makeJwtTokenGenerator } from '../crypto'

export const makeFacebookAuthenticationService = (): FacebookAuthenticationService => {
  return new FacebookAuthenticationService(
    makeFacebookApi(),
    makePgUserAccountRepo(),
    makeJwtTokenGenerator()
  )
}
