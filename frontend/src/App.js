import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import DetailsFilling from "./Pages/DetailsFilling";
import CheckSelectedId from "./Components/CheckSelectedId";
import AboutUs from "./Pages/AboutUs";
import MyResumes from "./Pages/MyResumes";
import { Navbar } from "./Pages";
import HomePage from "../src/Components/MainBar/HomePage";
import DarkModeProvider from "./Components/MainBar/DarkModeContext";
import SmartATS from "./Components/Ats/SmartATS";
const App = () => {
  return (
   <DarkModeProvider>
     <Router>
      {/* <Navbar/> */}
      <Routes>
        {/* Home Page Route */}
        <Route exact path="/ats" element={<SmartATS/>}/>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/build-resume" element={<Home/>} />
        <Route exact path="/builder" element={<Home/>}/>
        {/* Details Filling Page */}
        <Route
          exact
          path="/template/fill-details"
          element={
            <CheckSelectedId>
              <DetailsFilling />
            </CheckSelectedId>
          }
        />

        {/* My Resumes Page */}
        <Route exact path="/myresume" element={<MyResumes />} />

        {/* About Us Page */}
        <Route exact path="/about-us" element={<AboutUs />} />
      </Routes>
    </Router>
   </DarkModeProvider>
  );
};

export default App;
