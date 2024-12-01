const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { authenticateToken } = require('../middleware/auth');
const dotenv = require('dotenv');

dotenv.config();

const router = express.Router();

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Analyze mood and provide feedback
router.post('/analyze', authenticateToken, async (req, res) => {
  try {
    const { journal, mood, stressLevel } = req.body;

    const prompt = `
      Analyze the following mental health check-in and provide supportive feedback:
      
      Mood Rating: ${mood}/5
      Stress Level: ${stressLevel}/5
      Journal Entry: "${journal}"
      
      Please provide:
      1. A brief analysis of the person's emotional state
      2. Supportive and encouraging feedback
      3. One or two practical suggestions for improvement
      4. A positive affirmation
      
      Format the response in a conversational, empathetic tone.
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const feedback = response.text();

    res.json({ feedback });
  } catch (error) {
    console.error('Error analyzing mood:', error);
    res.status(500).json({ 
      message: 'Error analyzing mood', 
      error: error.message 
    });
  }
});

module.exports = router;










