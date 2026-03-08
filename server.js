import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

let messages = [
  {
    role: "system",
    content: "Voláš sa Alina."
  }
];

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    messages.push({
      role: "user",
      content: userMessage
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: messages
    });

    const reply = completion.choices[0].message.content;

    messages.push({
      role: "assistant",
      content: reply
    });

    res.json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Chyba servera" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server beží na porte", PORT);
});

