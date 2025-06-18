const aiService = require('../ai.service');

module.exports.getReview = async (req, res) => {
  const code = req.body.code || "Explain how AI works in a few words";

  if (!code) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const response = await aiService.generateResponse(code); // ✅ No more error
    res.send(response);
  } catch (err) {
    console.error("Error generating AI response:", err);
    res.status(500).json({ error: "Failed to generate response from AI" });
  }
};
