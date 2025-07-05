require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const {
  getSystemPrompt,
  BASE_PROMPT_NODE,
  BASE_PROMPT_REACT,
} = require("./system-file/prompt");
const Anthropic = require("@anthropic-ai/sdk");
const { reactTemplate } = require("./templates/react.template");
const { nodejsTemplate } = require("./templates/node.template");
const authRoutes = require('./routes/auth.route');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors( {
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(cookieParser());
const anthropic = new Anthropic();


app.use('/api/auth', authRoutes);



app.post("/template", async (req, res) => {
  const prompt = req.body.prompt;

  if (!prompt || typeof prompt !== "string" || prompt.trim() === "") {
    return res.status(400).json({
      message: "Prompt can't be empty",
    });
  }

  try {
    let fullText = "";

    const stream = await anthropic.messages.stream({
      model: "claude-3-5-haiku-20241022",
      max_tokens: 100,
      temperature: 0,
      system: getSystemPrompt(),
      messages: [
        { role: "user", content: prompt },
        { role: "user", content: BASE_PROMPT_REACT },
      ],
    });

    stream.on("text", (text) => {
      fullText += text;
    });

    stream.on("end", () => {
      // Now return fullText in response
      res.json({ response: fullText });
      console.log(fullText)
    });

    stream.on("error", (err) => {
      console.error("Streaming error:", err);
      res.status(500).json({ message: "Stream error", error: err.message });
    });

  } catch (error) {
    console.error("Template endpoint error:", error);
    return res.status(500).json({
      message: "Error communicating with model",
      error: error.message,
    });
  }
});



async function talkToApi() {
  const msg = await anthropic.messages
    .stream({
      model: "claude-3-5-haiku-20241022",
      max_tokens: 1000,
      temperature: 0.01,
      system: getSystemPrompt(),
      messages: [
        {
          role: "user",
          content: BASE_PROMPT_REACT,
        },
        {
          role: "user",
          content: `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactTemplate}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`,
        },
        {
          role: "user",
          content: "create a todo app",
        },
      ],
    })
    .on("text", (text) => {
      console.log(text);
    });
}

app.listen(process.env.PORT || 3000, () => {
  console.log("app is listen on 3000");
});
