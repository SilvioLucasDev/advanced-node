import { type DeleteFile, type UploadFile } from '@/domain/contracts/gateways'

import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'

export class AwsS3FileStorage implements UploadFile, DeleteFile {
  private readonly s3Client: S3Client

  constructor (accessKey: string, secret: string, region: string, private readonly bucket: string) {
    const awsConfig = {
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secret
      },
      region
    }

    this.s3Client = new S3Client(awsConfig)
  }

  async upload ({ key, file }: UploadFile.Input): Promise<UploadFile.Output> {
    const putObjectCommand = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      Body: file
    })
    await this.s3Client.send(putObjectCommand)

    return `https://${this.bucket}.s3.amazonaws.com/${encodeURIComponent(key)}`
  }

  async delete ({ key }: DeleteFile.Input): Promise<void> {
    const deleteObjectCommand = new DeleteObjectCommand({
      Bucket: this.bucket,
      Key: key
    })

    await this.s3Client.send(deleteObjectCommand)
  }
}
