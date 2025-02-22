import { NextRequest, NextResponse } from "next/server";
import PDFUtil from "@/utils/pdf";

export async function POST(req: NextRequest) {
  try {

    const formData = await req.formData();
    
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({
        status: "error",
        error: {
          message: "No file uploaded",
        }
      }, { status: 400 });
    }

    // const content = await PDFUtil.parsePDF(file);

    return NextResponse.json({
      status: "success",
      data: {
        // content,
      }
    }, { status: 200 });

  } catch (error: any) {
    
    console.error("error", error);

    return NextResponse.json({
      status: "error",
      error: {
        message: "Internal server error",
      }
    }, { status: 500 });

  }
}
