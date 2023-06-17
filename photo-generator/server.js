import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";
import express from "express";
import cors from "cors";

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI,
});

const openai = new OpenAIApi();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/dream", async (req, res) => {
  const prompt = req.body.prompt;

  const aiResponse = await openai.createImage({
    prompt,
    n: 4,
    size: "1024x1024",
  });

  console.log("AiResponse " + aiResponse.data);
  const image = aiResponse.data.data[0].url;

  // send to the client
  res.send({ image });
});

app.listen(8080, () => console.log("Running"));
