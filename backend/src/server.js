require("dotenv").config();
const express = require("express");
const cors = require("cors"); 
const cookieParser = require("cookie-parser");
const { getSystemPrompt, BASE_PROMPT_REACT } = require("./system-file/prompt");
const Anthropic = require("@anthropic-ai/sdk");
const { reactTemplate } = require("./templates/react.template");
const authRoutes = require("./routes/auth.route");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Whitelist allowed frontend origins
const allowedOrigins = [
  "https://bolt-clone-inky.vercel.app/",
  "http://localhost:3000"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Explicitly handle preflight requests
app.options("*", cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use(cookieParser());
const anthropic = new Anthropic();

app.use("/api/auth", authRoutes);

app.post("/chat", async function (req, res) {
  const prompt = req.body.prompt;

  if (!prompt || typeof prompt !== "string" || prompt.trim() === "") {
    return res.status(400).json({ message: "Prompt can't be empty" });
  }

  try {
    const stream = await anthropic.messages.stream({
      model: "claude-3-5-haiku-20241022",
      max_tokens: 100,
      temperature: 0,
      system:
        "Look at the user request and respond back to the user only in 30 words. You are an ek AI that creates beautiful websites. Respond everytime in different answer.",
      messages: [{ role: "user", content: prompt }],
    });

    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Transfer-Encoding", "chunked");

    stream.on("text", (text) => {
      res.write(text);
    });

    stream.on("end", () => {
      res.end();
    });

    stream.on("error", (err) => {
      console.error("Stream error:", err);
      res.status(500).end("Stream error");
    });
  } catch (error) {
    console.error("Catch error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.post("/template", async (req, res) => {
  const prompt = req.body.prompt;

  if (!prompt || typeof prompt !== "string" || prompt.trim() === "") {
    return res.status(400).json({ message: "Prompt can't be empty" });
  }

  try {
    let fullResponse = "";
    let responseSent = false;

    const stream = await anthropic.messages.stream({
      model: "claude-3-5-haiku-20241022",
      max_tokens: 7000,
      temperature: 0.09,
      system: getSystemPrompt(),
      messages: [
        { role: "user", content: prompt },
        { role: "user", content: BASE_PROMPT_REACT },
      ],
    });

    stream.on("text", (text) => {
      fullResponse += text;
    });

    stream.on("end", () => {
      if (responseSent) return;
      console.log("Stream complete");

      try {
        const parsed = JSON.parse(fullResponse);
        res.json(parsed);
      } catch (e) {
        console.log(
          "Could not parse JSON (maybe token limit hit). Sending raw response."
        );
        res.json({ response: fullResponse });
      }

      responseSent = true;
    });

    stream.on("error", (err) => {
      if (responseSent) return;
      console.error("Stream error:", err?.error?.message || err.message);
      res.status(503).json({
        message: "Claude API overloaded. Please try again.",
        error: err?.error?.message || "Unknown error",
      });
      responseSent = true;
    });
  } catch (error) {
    console.error("Template endpoint error:", error);
    if (!res.headersSent) {
      res.status(500).json({
        message: "Server error",
        error: error.message,
      });
    }
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("app is listen on 3000");
});
