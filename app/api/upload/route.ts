import { type NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { uploadFileToS3 } from "../../../utils/s3";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const id = uuidv4();
  const fileExtension = file.name.split(".").pop();
  const fileName = `${id}.${fileExtension}`;

  try {
    const fileBuffer = await file.arrayBuffer();
    const url = await uploadFileToS3(Buffer.from(fileBuffer), fileName);

    return NextResponse.json({ id, url });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ error: "File upload failed" }, { status: 500 });
  }
}
