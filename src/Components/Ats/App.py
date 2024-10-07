from flask import Flask
from flask import request
from flask import jsonify
import google.generativeai as genai
import PyPDF2 as pdf
import os
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS

# Configure Gemini API with the API key directly
api_key = "AIzaSyCcQTanZJ57NK1JRo6h0ai4ABpNfspM7dw"  # Replace with your actual API key
genai.configure(api_key=api_key)

# Function to extract text from PDF resume
def input_pdf_text(uploaded_file):
    try:
        reader = pdf.PdfReader(uploaded_file)
        text = ""
        for page in range(len(reader.pages)):
            text += reader.pages[page].extract_text() or ""
        return text
    except Exception as e:
        return f"Error reading PDF: {str(e)}"

# Define the prompt template
input_prompt_template = """
Hey Act Like a skilled or very experienced ATS (Application Tracking System)
with a deep understanding of the tech field, software engineering, data science,
data analyst, and big data engineering. Your task is to evaluate the resume based
on the given job description. The job market is very competitive, so you should 
provide the best assistance for improving the resume. Assign a percentage match 
based on the job description and the missing keywords with high accuracy.

resume: {resume_text}
description: {job_description}

I want the response in one single string having the structure:
{{"JDMatch":"%","MissingKeywords:[]","ProfileSummary":""}}
"""

@app.route('/analyze-resume', methods=['POST'])
def analyze_resume():
    # Check if file and job description are provided
    if 'resume' not in request.files or 'jobDescription' not in request.form:
        return jsonify({"error": "Missing resume or job description"}), 400

    # Extract resume text from PDF
    resume_file = request.files['resume']
    resume_text = input_pdf_text(resume_file)

    # Get job description
    job_description = request.form['jobDescription']

    # Format the prompt
    input_prompt = input_prompt_template.format(resume_text=resume_text, job_description=job_description)

    # Get the Gemini response
    model = genai.GenerativeModel('gemini-pro')
    response = model.generate_content(input_prompt)

    # Parse and return the response in JSON format
    response_data = json.loads(response.text)
    return jsonify(response_data)

if __name__ == '__main__':
    app.run(debug=True)
        # app.run(host='0.0.0.0', port=os.environ.get('PORT', 5000), debug=True)
