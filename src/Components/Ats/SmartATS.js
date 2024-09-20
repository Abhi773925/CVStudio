import React, { useState } from "react";
import Footer from "../MainBar/Footer";
import axios from "axios";
import {
  Button,
  TextField,
  CircularProgress,
  Typography,
  Box,
  Paper,
  Grid,
} from "@mui/material";
import Navbar from "../MainBar/Navbar";

function SmartATS(props) {
  const [resume, setResume] = useState(null); // Stores the uploaded resume file
  const [jobDescription, setJobDescription] = useState(""); // Stores the job description input
  const [loading, setLoading] = useState(false); // Tracks if the request is in progress
  const [response, setResponse] = useState(null); // Stores the response from the backend API

  // Handle resume file upload
  const handleFileUpload = (e) => {
    setResume(e.target.files[0]);
  };

  // Handle submission of resume and job description
  const handleSubmit = async () => {
    if (!resume || !jobDescription) {
      alert("Please upload a resume and provide a job description.");
      return;
    }

    setLoading(true);

    // Prepare the form data for API submission
    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("jobDescription", jobDescription);

    try {
      // Send the form data to your Flask backend running on localhost:5000
      const result = await axios.post("http://localhost:5000/analyze-resume", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Handle the API response
      setResponse(result.data); // Assuming API returns { JDMatch, MissingKeywords, ProfileSummary }
    } catch (error) {
      console.error("Error:", error);
      alert("There was an error processing the resume. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className=" w-full dark:bg-primary dark:text-secondary">
      <Navbar />

      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        {/* Content Section */}
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexGrow: 1, padding: 4 }}>
          <Paper
            elevation={6}
            sx={{
              width: 1200, // Adjust width for two columns
              padding: 4,
              borderRadius: 3,
              boxShadow: "0px 12px 32px rgba(0,0,0,0.1)",
              backgroundColor: "rgb(17, 24, 39)", // Set background color
              color: "#fff", // Set text color for visibility
            }}
          >
            {/* Grid Layout for Two Columns */}
            <Grid container spacing={4}>
              {/* Left Side: Resume Upload and Job Description */}
              <Grid item xs={12} md={6}>
                <Typography 
                  variant="h4"
                  sx={{
                    marginBottom: 2,
                    fontWeight: "bold",
                    fontSize: "32px",
                  }}
                >
                  Upload Your Resume
                </Typography>

                <Typography variant="body1" sx={{ marginBottom: 4 }}>
                  Start by uploading your resume and matching it with the job description.
                </Typography>

                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  style={{ display: "none" }}
                  id="resume-upload"
                />
                <label htmlFor="resume-upload">
                  <Button 
                    variant="contained"
                    component="span"
                    sx={{
                      backgroundColor: "secondary.main",
                      color: "#fff",
                      fontWeight: "bold",
                      marginBottom: 2,
                      ":hover": { backgroundColor: "secondary.dark" },
                      padding: "12px 24px",
                      fontSize: "18px",
                    }}
                  >
                    {resume ? resume.name : "Upload Resume"}
                  </Button>
                </label>

                <Typography variant="caption" display="block" sx={{ marginBottom: 4 }}>
                  {resume ? resume.name : "No PDF file specified."}
                </Typography>

                <TextField
                  label="Job Description"
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  sx={{ marginBottom: 3, backgroundColor: "rgba(255, 255, 255, 0.1)" }} // Lighter background for input
                />

                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleSubmit}
                  disabled={loading}
                  sx={{
                    marginBottom: 4,
                    backgroundColor: "primary.main",
                    ":hover": { backgroundColor: "primary.dark" },
                    padding: "10px",
                    fontSize: "18px",
                  }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : "Analyze Resume"}
                </Button>
              </Grid>

              {/* Right Side: Analysis Result */}
              <Grid item xs={12} md={6}>
                {response ? (
                  <Paper
                    sx={{
                      padding: 3,
                      borderRadius: 2,
                      textAlign: "left",
                      boxShadow: "0px 8px 24px rgba(0,0,0,0.05)",
                      backgroundColor: "rgb(34, 34, 34)", // Optionally set a background color for the results
                      color: "#fff", // Set text color for visibility
                    }}
                    elevation={2}
                  >
                    <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "22px" }}>
                      ATS Evaluation Result
                    </Typography>
                    <Typography variant="subtitle1" sx={{ marginTop: 1, fontSize: "16px" }}>
                      Match Score: <strong>{response.JDMatch}%</strong>
                    </Typography>

                    <Typography variant="subtitle1" sx={{ marginTop: 1, fontSize: "16px" }}>
                      Missing Keywords:
                    </Typography>
                    <ul style={{ paddingLeft: "20px", fontSize: "14px" }}>
                      {response.MissingKeywords.map((keyword, index) => (
                        <li key={index} style={{ marginBottom: "8px" }}>{keyword}</li>
                      ))}
                    </ul>

                    <Typography variant="subtitle1" sx={{ marginTop: 1, fontSize: "16px" }}>
                      Profile Summary:
                    </Typography>
                    <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
                      {response.ProfileSummary}
                    </Typography>
                  </Paper>
                ) : (
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      textAlign: "center",
                      marginTop: "50%",
                      transform: "translateY(-50%)",
                      color: "#fff", // Set text color for visibility
                    }}
                  >
                    Analysis will be displayed here.
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Box>
      <Footer/>
    </div>
  );
}

export default SmartATS;
