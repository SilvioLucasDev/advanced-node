import { type UploadFile, type UUIDGenerator } from '@/domain/contracts/gateways'
import { type SaveUserPicture, type LoadUserProfile } from '@/domain/contracts/repos'
import { UserProfile } from '@/domain/entities'

type Setup = (fileStorage: UploadFile, crypto: UUIDGenerator, userProfileRepo: SaveUserPicture & LoadUserProfile) => ChangeProfilePicture

type Input = { id: string, file?: Buffer }
type Output = { pictureUrl?: string, initials?: string }
export type ChangeProfilePicture = (input: Input) => Promise<Output>

export const setupChangeProfilePicture: Setup = (fileStorage, crypto, userProfileRepo) =>
  async ({ id, file }) => {
    const data: { pictureUrl?: string, name?: string } = {}

    if (file !== undefined) {
      const key = crypto.uuid({ key: id })
      data.pictureUrl = await fileStorage.upload({ file, key })
    } else {
      data.name = (await userProfileRepo.load({ id })).name
    }

    const userProfile = new UserProfile(id)

    userProfile.setPicture(data)
    await userProfileRepo.savePicture(userProfile)
    return userProfile
  }
