import { type DeleteFile, type UploadFile, type UUIDGenerator } from '@/domain/contracts/gateways'
import { type SaveUserPicture, type LoadUserProfile } from '@/domain/contracts/repos'
import { UserProfile } from '@/domain/entities'

type Setup = (fileStorage: UploadFile & DeleteFile, crypto: UUIDGenerator, userProfileRepo: SaveUserPicture & LoadUserProfile) => ChangeProfilePicture

type Output = { pictureUrl?: string, initials?: string }
type Input = { id: string, file?: { buffer: Buffer, mimeType: string } }
export type ChangeProfilePicture = (input: Input) => Promise<Output>

export const setupChangeProfilePicture: Setup = (fileStorage, crypto, userProfileRepo) =>
  async ({ id, file }) => {
    const data: { pictureUrl?: string, name?: string } = {}
    const key = crypto.uuid({ key: id })

    if (file !== undefined) {
      data.pictureUrl = await fileStorage.upload({ file: file.buffer, fileName: `${key}.${file.mimeType.split('/')[1]}` })
    } else {
      data.name = (await userProfileRepo.load({ id }))?.name
    }

    const userProfile = new UserProfile(id)
    userProfile.setPicture(data)
    try {
      await userProfileRepo.savePicture(userProfile)
    } catch (error) {
      if (file !== undefined) await fileStorage.delete({ fileName: key })
      throw error
    }
    return userProfile
  }
