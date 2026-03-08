import express from "express";
import OpenAI from "openai";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static("public"));

const client = new OpenAI({
  apiKey:process.env.OPENAI_API_KEY});

app.post("/api/chat", async (req, res) => {
  const message = req.body.message;

  const completion = await client.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [{ role: "user", content: message }]
  });

  res.json({
    reply: completion.choices[0].message.content
  });
});

app.listen(port, () => {
  console.log(`Server beží na http://localhost:${port}`);
});
