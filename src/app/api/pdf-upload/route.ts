import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("pdf") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const backendResponse = await fetch("http://api.discorover.com/pdf-extract", {
    method: "POST",
    body: formData,
  });

  const data = await backendResponse.json();
  return NextResponse.json(data);
}
