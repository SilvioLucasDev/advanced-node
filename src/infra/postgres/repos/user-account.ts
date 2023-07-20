import { type SaveFacebookAccountRepository, type LoadUserAccountRepository } from '@/data/contracts/repos'
import { PgUser } from '@/infra/postgres/entities'

import { getRepository } from 'typeorm'

export class PgUserAccountRepository implements LoadUserAccountRepository {
  private readonly pgUserRepo = getRepository(PgUser)

  async load (params: LoadUserAccountRepository.Params): Promise<LoadUserAccountRepository.Result> {
    const pgUser = await this.pgUserRepo.findOne({ email: params.email })

    if (pgUser !== undefined) {
      return {
        id: pgUser.id.toString(),
        name: pgUser.name ?? undefined
      }
    }
  }

  async saveWithFacebook (params: SaveFacebookAccountRepository.Params): Promise<void> {
    const { id, name, email, facebookId } = params

    if (id === undefined) {
      await this.pgUserRepo.save({ name, email, facebookId })
    } else {
      await this.pgUserRepo.update({ id: parseInt(id) }, { name, facebookId })
    }
  }
}
