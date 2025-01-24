import { type NextRequest, NextResponse } from "next/server";
import { getSignedFileUrl } from "../../../../utils/s3";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  try {
    const url = await getSignedFileUrl(`${id}.pdf`); // Assuming PDF for now, you might need to store file extensions
    return NextResponse.json({ url });
  } catch (error) {
    console.error("Error retrieving file URL:", error);
    return NextResponse.json(
      { error: "File retrieval failed" },
      { status: 500 }
    );
  }
}
