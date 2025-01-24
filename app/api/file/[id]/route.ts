import "regenerator-runtime/runtime"; // Top of your server component
import { type NextRequest, NextResponse } from "next/server";
import { getSignedFileUrl } from "../../../../utils/s3";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Await the params promise
    const { id } = await params;

    // Generate signed URL
    const url = await getSignedFileUrl(`${id}.pdf`);

    return NextResponse.json({ url });
  } catch (error) {
    console.error("Error in file retrieval:", error);
    return NextResponse.json(
      { error: "File retrieval failed" },
      { status: 500 }
    );
  }
}
