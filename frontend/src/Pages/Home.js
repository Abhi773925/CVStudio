import "./Styles/Home.css";
import { Box, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { connect } from "react-redux";
import { Navbar, BlackScreen } from "./";
import { templates } from "../Utils/Data/templates";
import { selectTemplate } from "../Redux/Actions/actions";
import Footer from "../Components/MainBar/Footer";
const mapStateToProps = (state) => ({
  selectedTemplateId: state.selectedTemplateReducer.selectedTemplateId,
});

const mapDispatchToProps = (dispatch) => ({
  setSelectedTemplateId: (id) => dispatch(selectTemplate(id)),
});

const Home = (props) => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  const navigateToFillDetails = (id) => {
    props.setSelectedTemplateId(id);
    navigate("/template/fill-details");
  };

  return (
    <div className="h-screen  mt-[50px]">
      <Navbar />


      <div className="w-full dark:bg-primary dark:text-secondary">
        <div className="w-full py-8 px-16 sm:py-6 sm:px-8 dark:bg-primary dark:text-secondary">
          <h2 className="text-2xl font-semibold tracking-wide mb-1 dark:text-secondary">
            Templates
          </h2>
          <p className="text-sm mb-6 dark:text-gray-300">Select a template to get started</p>

          <Stack
            sx={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: {
                sm: "1fr 1fr",
                md: "1fr 1fr",
                lg: "1fr 1fr 1fr",
                xl: "1fr 1fr 1fr 1fr",
              },
              gridGap: "30px",
            }}
          >
            {templates.map((template) => {
              return (
                <Box
                  key={template.id}
                  className="relative group w-full dark:bg-gray-700"
                >
                  <img
                    className="template-img w-3/4 border border-black dark:border-gray-400"
                    src={template.template_img}
                    alt={template.template_name}
                  />
                  <BlackScreen />
                  <Button
                    className="mybtn absolute top-[-20%] left-1/4.5 bg-black-800 z-10  overflow-hidden w-auto"
                    onClick={() => navigateToFillDetails(template.id)}
                    size="medium"
                    variant="contained"
                    color="secondary"
                  >
                    Use Template
                  </Button>
                </Box>
              );
            })}
          </Stack>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
