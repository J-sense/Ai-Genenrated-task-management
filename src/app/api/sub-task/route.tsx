import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { taskTitle } = await req.json();

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Break down the task "${taskTitle}" into 3-5 smaller actionable subtasks. Return them as a list.`,
                },
              ],
            },
          ],
        }),
      }
    );
    const data = await response.json();
    console.log("Gemini API raw response:", JSON.stringify(data, null, 2));
    const content = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
    console.log(content);
    const subtasks = content
      .split("\n")
      .map((line: string) => line.replace(/^\d+\. /, "").trim())
      .filter(Boolean);

    return NextResponse.json({ subtasks });
  } catch (err) {
    console.error("Gemini API error:", err);
    return NextResponse.json(
      { error: "Failed to generate subtasks" },
      { status: 500 }
    );
  }
}
