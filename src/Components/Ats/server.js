const express = require('express');
const multer = require('multer');
const axios = require('axios');
const cors = require('cors');
const pdf = require('pdf-parse'); // Use this for PDF parsing
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON requests

// Configure storage for uploaded files
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Configure your API key here
const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key

// Function to extract text from PDF resume
const extractTextFromPDF = async (fileBuffer) => {
    return new Promise((resolve, reject) => {
        pdf(fileBuffer).then(data => {
            if (data && data.text) {
                resolve(data.text);
            } else {
                reject(new Error('No text found in PDF'));
            }
        }).catch(error => {
            reject(new Error('Error reading PDF: ' + error.message));
        });
    });
};

// Define the prompt template
const inputPromptTemplate = `
Hey Act Like a skilled or very experienced ATS (Application Tracking System)
with a deep understanding of the tech field, software engineering, data science,
data analyst, and big data engineering. Your task is to evaluate the resume based
on the given job description. The job market is very competitive, so you should 
provide the best assistance for improving the resume. Assign a percentage match 
based on the job description and the missing keywords with high accuracy.

resume: {resume_text}
description: {job_description}

I want the response in one single string having the structure:
{"JDMatch":"%","MissingKeywords":[],"ProfileSummary":""}
`;

app.post('/analyze-resume', upload.single('resume'), async (req, res) => {
    // Check if file and job description are provided
    if (!req.file || !req.body.jobDescription) {
        return res.status(400).json({ error: "Missing resume or job description" });
    }

    try {
        // Extract resume text from PDF
        const resumeText = await extractTextFromPDF(req.file.buffer);
        const jobDescription = req.body.jobDescription;

        // Format the prompt
        const inputPrompt = inputPromptTemplate.replace('{resume_text}', resumeText).replace('{job_description}', jobDescription);

        // Prepare the request to the Gemini API
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;
        const response = await axios.post(url, {
            prompt: inputPrompt,
            maxTokens: 150, // Adjust as needed
        });

        // Log the response for debugging
        console.log('Gemini API Response:', response.data);

        // Check if response has the expected structure
        if (!response.data || !response.data.JDMatch) {
            return res.status(500).json({ error: 'Invalid response from Gemini API' });
        }

        // Return the response from Gemini API
        return res.json(response.data);
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        return res.status(500).json({ error: 'Error processing the resume.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
