import { AwsS3FileStorage } from '@/infra/gateways'

import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'

jest.mock('@aws-sdk/client-s3')

describe('AwsS3FileStorage', () => {
  let accessKey: string
  let secret: string
  let bucket: string
  let region: string
  let key: string
  let sut: AwsS3FileStorage

  beforeAll(() => {
    accessKey = 'any_access_key'
    secret = 'any_secret'
    bucket = 'any_bucket'
    region = 'any_region'
    key = 'any_key'
  })

  beforeEach(() => {
    sut = new AwsS3FileStorage(accessKey, secret, region, bucket)
  })

  it('should config aws credentials on creation', () => {
    expect(sut).toBeDefined()
    expect(S3Client).toHaveBeenCalledWith({
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secret
      },
      region
    })
    expect(S3Client).toHaveBeenCalledTimes(1)
  })

  describe('upload', () => {
    let file: Buffer

    beforeAll(() => {
      file = Buffer.from('any_buffer')
    })

    it('should call PutObjectCommand with correct input', async () => {
      await sut.upload({ key, file })

      expect(PutObjectCommand).toHaveBeenCalledWith({
        Bucket: bucket,
        Key: key,
        Body: file
      })
      expect(PutObjectCommand).toHaveBeenCalledTimes(1)
    })

    it('should return imageUrl', async () => {
      const imageUrl = await sut.upload({ key, file })

      expect(imageUrl).toBe(`https://${bucket}.s3.amazonaws.com/${key}`)
    })

    it('should return encoded imageUrl', async () => {
      const imageUrl = await sut.upload({ key: 'any key', file })

      expect(imageUrl).toBe(`https://${bucket}.s3.amazonaws.com/any%20key`)
    })
  })

  describe('delete', () => {
    it('should call DeleteObjectCommand with correct input', async () => {
      await sut.delete({ key })

      expect(DeleteObjectCommand).toHaveBeenCalledWith({
        Bucket: bucket,
        Key: key
      })
      expect(DeleteObjectCommand).toHaveBeenCalledTimes(1)
    })
  })
})
