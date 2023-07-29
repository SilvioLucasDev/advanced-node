import { PgRepository } from '@/infra/repos/postgres'
import { PgUser } from '@/infra/repos/postgres/entities'
import { type SaveFacebookAccount, type LoadUserAccount } from '@/domain/contracts/repos'

export class PgUserAccountRepository extends PgRepository implements LoadUserAccount, SaveFacebookAccount {
  async load ({ email }: LoadUserAccount.Input): Promise<LoadUserAccount.Output> {
    const pgUserRepo = this.getRepository(PgUser)
    const pgUser = await pgUserRepo.findOne({ email })

    if (pgUser !== undefined) {
      return {
        id: pgUser.id.toString(),
        name: pgUser.name ?? undefined
      }
    }
  }

  async saveWithFacebook ({ id, name, email, facebookId }: SaveFacebookAccount.Input): Promise<SaveFacebookAccount.Output> {
    const pgUserRepo = this.getRepository(PgUser)
    if (id === undefined) {
      const pgUser = await pgUserRepo.save({ name, email, facebookId })
      return { id: pgUser.id.toString() }
    } else {
      await pgUserRepo.update({ id: parseInt(id) }, { name, facebookId })
      return { id }
    }
  }
}
