import { TextField } from "@mui/material";
import React from "react";
import "./InputComponent.css";
import { inputChecks } from "../../Utils/inputChecks";

const InputComponent = (props) => {
  return (
    <div className="input-component w-full dark:bg-primary dark:text-secondary">
      <p className="input-title">{props.title}</p>
      <TextField
        variant="outlined"
        type={props.type}
        name={props.name}
        {...props.register(props.name, inputChecks(props.type, props.name))}
        multiline={props.multiline}
        rows={5}
        value={props.value}
        onChange={(e) => props.setValue(e.target.value.toString())}
        error={props.error}
        helperText={props.errorMessage ? props.errorMessage : null}
        sx={{
          bgcolor: 'background.default', // Default background color
          color: 'text.primary', // Default text color
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'grey.500', // Border color
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'grey.700', // Border color on hover
          },
          '&.Mui-error .MuiOutlinedInput-notchedOutline': {
            borderColor: 'error.main', // Border color when there's an error
          },
          // Dark mode styles
          '&.dark': {
            bgcolor: 'rgba(17, 24, 39, 1)', // Dark background
            color: 'white', // Dark text color
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white', // Dark border color
            },
          },
        }}
      />
    </div>
  );
};

export default InputComponent;
