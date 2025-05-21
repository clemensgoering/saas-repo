import OpenAI from "openai"

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function analyzeResume(text: string) {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "Du bist ein Karriereberater, der Lebensläufe analysiert und Verbesserungsvorschläge macht.",
      },
      {
        role: "user",
        content: `Hier ist ein Lebenslauf:\n\n${text}\n\nBitte analysiere ihn und gib Verbesserungsvorschläge.`,
      },
    ],
  })

  //return response.choices[0].message.content
}
