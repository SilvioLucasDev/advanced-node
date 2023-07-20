import { type SaveFacebookAccountRepository, type LoadUserAccountRepository } from '@/data/contracts/repos'
import { PgUser } from '@/infra/postgres/entities'

import { getRepository } from 'typeorm'

export class PgUserAccountRepository implements LoadUserAccountRepository {
  async load (params: LoadUserAccountRepository.Params): Promise<LoadUserAccountRepository.Result> {
    const pgUserRepo = getRepository(PgUser)
    const pgUser = await pgUserRepo.findOne({ email: params.email })

    if (pgUser !== undefined) {
      return {
        id: pgUser.id.toString(),
        name: pgUser.name ?? undefined
      }
    }
  }

  async saveWithFacebook (params: SaveFacebookAccountRepository.Params): Promise<void> {
    const { id, name, email, facebookId } = params
    const pgUserRepo = getRepository(PgUser)

    if (id === undefined) {
      await pgUserRepo.save({ name, email, facebookId })
    } else {
      await pgUserRepo.update({ id: parseInt(id) }, { name, facebookId })
    }
  }
}
