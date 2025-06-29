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
      messages: "prompt can't be empty",
    });
  }
  try {
    const response = await anthropic.messages.create({
      model: "claude-3-5-haiku-20241022",
      max_tokens: 100,
      temperature: 0,
      system:
        "Return either node or react based on what do you think this project should be. Only return a single word either 'node' or 'react'. Do not return anything extra",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const rawAnswer = response?.content?.[0]?.text || "";
    const answer = rawAnswer.trim().toLowerCase();

    if (answer === "react") {
      return res.json({
        prompts: [
          BASE_PROMPT_REACT,
          `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactTemplate}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`,
        ],
        uiPrompts: [reactTemplate],
      });
    } else if (answer === "node") {
      return res.json({
        prompts: [
          BASE_PROMPT_NODE,
          `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${nodejsTemplate}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`,
        ],
        uiPrompts: [nodejsTemplate],
      });
    } else {
      return res.status(400).json({
        message: "Invalid model response.",
      });
    }
  } catch (error) {
    console.log("template endpoint error", error);
    return res.status(500).json({
      message: "Error communicating with model",
      error: error.message,
    });
  }
});

app.post("/chat", async (req, res) => {
  const message = req.body.message;
  const msg = await anthropic.messages
    .stream({
      model: "claude-3-5-haiku-20241022",
      max_tokens: 1000,
      temperature: 0.01,
      system: getSystemPrompt(),
      messages: message,
    })
    .on("text", (text) => {
      console.log(text);
    });
  res.json({
    code: "this is you code",
  });
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
          content: BASE_PROMPT,
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
