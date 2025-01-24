import { GoogleGenerativeAI } from "@google/generative-ai";
import { type NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!);

export async function POST(req: NextRequest) {
  const { messages, id, url } = await req.json();

  // Here you would typically fetch the file content based on the id
  // and provide it as context to the AI model
  const fileContent = `This is a placeholder for the content of file ${id}`;

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const chat = model.startChat({
    history: messages,
  });

  const result =
    await chat.sendMessage(`Given the following presentation content: ${fileContent}
    Please answer the following question or respond to the following statement: ${
      messages[messages.length - 1].content
    }`);

  const response = await result.response;
  const text = response.text();

  return NextResponse.json({ message: text });
}
