import "../Preview/PreviewComponent.css";
import React, { useState } from "react";
import { Button, CircularProgress, Container, TextField, Grid } from "@mui/material";
import JsPDF from "jspdf";
import uniqid from "uniqid";
import { connect } from "react-redux";
import { templates } from "../../Utils/Data/templates";

const mapStateToProps = (state) => ({
  selectedTemplateId: state.selectedTemplateReducer.selectedTemplateId,
  selectedResumeId: state.selectedTemplateReducer.selectedResumeId,
  personalInfo: state.personalInfoReducer.personalInfo,
  experiences: state.workExperienceReducer.experiences,
  educationInfo: state.educationDetailsReducer.educationInfo,
  skills: state.keySkillsReducer.skills,
});

const mapDispatchToProps = (dispatch) => ({});

const PreviewComponent = (props) => {
  const [loading, setLoading] = useState(false);
  const [resumeName, setResumeName] = useState("");
  const [error, setError] = useState("");

  const getTemplate = (template, index) => {
    if (template.id === props.selectedTemplateId) {
      return React.cloneElement(template.template, {
        personalinfo: props.personalInfo,
        workexperience: props.experiences,
        educationinfo: props.educationInfo,
        skills: props.skills,
        index: index,
      });
    }
  };

  const handleSave = () => {
    if (resumeName.length === 0) {
      setError("*Please fill this field");
    } else {
      setError("");
      setLoading(true);
      const report = new JsPDF("portrait", "pt", "a4");
      report
        .html(document.getElementById(`${props.selectedTemplateId - 1}report`))
        .then(() => {
          report.save(`${resumeName}.pdf`);
          setLoading(false);

          // Saving the user data in localStorage
          let resumes = window.localStorage.getItem("resumes");
          if (resumes) {
            let newResumes = JSON.parse(resumes);
            let resumeFound = newResumes.find(resume => resume.id === props.selectedResumeId);

            if (resumeFound) {
              const allNewResumes = newResumes.map(resume => {
                if (resume.id === props.selectedResumeId) {
                  return {
                    template_id: props.selectedTemplateId,
                    id: props.selectedResumeId,
                    personalInfo: props.personalInfo,
                    experiences: props.experiences,
                    educationInfo: props.educationInfo,
                    skills: props.skills,
                  };
                } else return resume;
              });

              window.localStorage.setItem("resumes", JSON.stringify(allNewResumes));
              window.location.reload();
              return;
            }

            newResumes.push({
              template_id: props.selectedTemplateId,
              id: uniqid(),
              personalInfo: props.personalInfo,
              experiences: props.experiences,
              educationInfo: props.educationInfo,
              skills: props.skills,
            });

            window.localStorage.setItem("resumes", JSON.stringify(newResumes));
          } else {
            window.localStorage.setItem("resumes", JSON.stringify([{
              template_id: props.selectedTemplateId,
              id: uniqid(),
              personalInfo: props.personalInfo,
              experiences: props.experiences,
              educationInfo: props.educationInfo,
              skills: props.skills,
            }]));
          }

          // Redirect user to the myResumes page
          window.location.reload();
        })
        .catch((error) => console.log(error.message));
    }
  };

  const handleBack = () => {
    props.setTab(props.tab - 1);
  };

  return (
    <Container
      sx={{
        padding: {
          xs: "20px",
          md: "60px 80px",
        },
      }}
      className="preview-container mt-[50px]"
    >
      <h2 className="preview-header-title">Resume Preview</h2>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8} className="resume-preview-grid-item">
          <div id="previewresume">
            {templates.map((template, index) => getTemplate(template, index))}
          </div>
        </Grid>
        <Grid item xs={12} md={4} className="resume-preview-grid-item">
          <div className="resume-save-container">
            <h3 className="resume-save-title">Create File Name</h3>
            <TextField
              value={resumeName}
              onChange={(e) => setResumeName(e.target.value)}
              className="resume-name-field"
              sx={{ width: "100%" }}
              variant="outlined"
              error={error.length > 0}
              helperText={error}
            />
            <div className="resume-back-next-container">
              <Button
                onClick={handleBack}
                className="outlined-btn"
                sx={{ marginRight: "20px" }}
                variant="outlined"
              >
                Back
              </Button>
              {loading ? (
                <CircularProgress size={25} />
              ) : (
                <Button
                  onClick={handleSave}
                  className="contained-btn"
                  variant="contained"
                >
                  Save
                </Button>
              )}
            </div>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(PreviewComponent);
