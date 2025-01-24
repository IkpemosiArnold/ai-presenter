import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

export async function uploadFileToS3(file: Buffer, fileName: string) {
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME!,
    Key: fileName,
    Body: file,
  })

  try {
    await s3Client.send(command)
    return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${fileName}`
  } catch (error) {
    console.error("Error uploading file to S3:", error)
    throw error
  }
}

export async function getSignedFileUrl(fileName: string) {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME!,
    Key: fileName,
  })

  try {
    const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 })
    return url
  } catch (error) {
    console.error("Error generating signed URL:", error)
    throw error
  }
}

