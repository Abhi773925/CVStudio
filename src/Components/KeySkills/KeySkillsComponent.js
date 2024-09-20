import "./KeySkillsComponent.css";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Paper, Divider, Button } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { connect } from "react-redux";
import { BackNextBtnComponent, InputComponent } from "../../Pages/index";
import { addNewSkills, deleteSkill, editSkill } from "../../Redux/Actions/actions";

const mapStateToProps = (state) => ({
  skills: state.keySkillsReducer.skills,
});

const mapDispatchToProps = (dispatch) => ({
  onAddNewSkill: () => dispatch(addNewSkills()),
  onEditSkill: (skills) => dispatch(editSkill(skills)),
  onDeleteSkill: (index) => dispatch(deleteSkill(index)),
});

function KeySkillsComponent(props) {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handlePreview = (data) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      props.setTab(props.tab + 1);
    }, 1000);
  };

  const handleBack = () => {
    props.setTab(props.tab - 1);
  };

  const onEditSkill = (value, id) => {
    const newSkills = props.skills.map((skill, index) => {
      if (index === id) {
        return value;
      } else return skill;
    });
    props.onEditSkill(newSkills);
  };

  return (
    <Paper elevation={3} className="key-skills-paper h-screen w-screen dark:bg-primary dark:text-secondary  mt-[50px]">
      <h2 className="key-skills-heading">Key Skills</h2>
      <Divider />
      <form onSubmit={handleSubmit(handlePreview)} className="h-full">
        <div className="key-skills-form-fields h-full flex flex-col justify-between">
          {props.skills.map((skill, index) => (
            <div key={index} className="key-input-with-delete flex items-center mb-2">
              <InputComponent
                type="text"
                name={`skill${index + 1}`}
                register={register}
                multiline={false}
                value={skill}
                setValue={(skill) => onEditSkill(skill, index)}
                error={errors[`skill${index + 1}`] ? true : false}
                errorMessage={errors[`skill${index + 1}`] ? errors[`skill${index + 1}`].message : null}
              />
              {props.skills.length > 1 && (
                <DeleteOutlineOutlinedIcon
                  sx={{ marginLeft: "10px", cursor: "pointer" }}
                  onClick={() => props.onDeleteSkill(index)}
                />
              )}
            </div>
          ))}
        </div>
        {props.skills.length < 6 && (
          <Button className="add-new-btn" variant="text" onClick={props.onAddNewSkill}>
            Add new
          </Button>
        )}
        <Divider className="key-skills-divider" />
        <BackNextBtnComponent
          onNext={handlePreview}
          loading={loading}
          tab={props.tab}
          onBack={handleBack}
          nextTitle={"Preview"}
          backTitle={"Back"}
        />
      </form>
    </Paper>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(KeySkillsComponent);
