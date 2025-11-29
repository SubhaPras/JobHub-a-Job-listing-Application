import { GoogleGenerativeAI } from "@google/generative-ai";

export const chatBotController = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.json({ success: false, answer: "Please ask something." });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt =
      "You are a job and career mentor. Answer short and helpful.\n\nUser: " +
      question;

    const result = await model.generateContent(prompt);
    const aiText = result.response.text();

    return res.json({
      success: true,
      answer: aiText
    });
  } catch (error) {
    console.log("Chatbot error:", error.message);
    return res.json({
      success: false,
      answer: "Something went wrong. Try again."
    });
  }
};
