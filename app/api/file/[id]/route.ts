import { type NextRequest, NextResponse } from "next/server";
import { getSignedFileUrl } from "../../../../utils/s3";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string | string[] } }
) {
  const id = params.id;

  // Check if id is an array (invalid case for this route)
  if (Array.isArray(id)) {
    return NextResponse.json(
      { error: "Invalid file ID format" },
      { status: 400 }
    );
  }

  try {
    const url = await getSignedFileUrl(`${id}.pdf`);
    return NextResponse.json({ url });
  } catch (error) {
    console.error("Error retrieving file URL:", error);
    return NextResponse.json(
      { error: "File retrieval failed" },
      { status: 500 }
    );
  }
}
