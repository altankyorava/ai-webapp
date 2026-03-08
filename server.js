let messages = [
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
    content: "Si užitočný AI asistent."
  }
];

app.post("/chat", async (req, res) => {
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
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server beží na porte", PORT);
});
  { role: "system", content: "Si užitočný AI asistent." }
];

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  messages.push({ role: "user", content: userMessage });

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: messages
  });

  const reply = completion.choices[0].message.content;

  messages.push({ role: "assistant", content: reply });

  res.json({ reply });
});
import express from "express";
import express from "express";
import OpenAI from "openai";

const app = express();
const port = 3000;

app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

let messages = [
  { role: "system", content: "Si užitočný AI asistent." }
];

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  messages.push({ role: "user", content: userMessage });

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: messages
  });

  const reply = completion.choices[0].message.content;

  messages.push({ role: "assistant", content: reply });

  res.json({ reply });
});

app.listen(port, () => {
  console.log("Server running on port 3000");
});
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
