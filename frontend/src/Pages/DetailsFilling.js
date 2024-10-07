import React, { useState } from "react";
import {
  Navbar,
  DetailFillingSidebar,
  EducationComponent,
  KeySkillsComponent,
  PersonalInfoComponent,
  PreviewComponent,
  WorkExperienceComponent,
} from "./";
import "./Styles/DetailsFilling.css";
import Footer from "../Components/MainBar/Footer";

const DetailsFilling = (props) => {
  const [tab, setTab] = useState(0);

  return (
    <div className="details-filling h-full w-full bg-white text-black dark:bg-primary dark:text-secondary">
      <Navbar active={""} />
      {tab === 4 ? null : (
        <div className="details-filling-cont">
          <DetailFillingSidebar tab={tab} setTab={setTab} />
          {tab === 0 ? (
            <PersonalInfoComponent setTab={setTab} tab={tab} />
          ) : null}
          {tab === 3 ? <KeySkillsComponent setTab={setTab} tab={tab} /> : null}
          {tab === 1 ? (
            <WorkExperienceComponent setTab={setTab} tab={tab} />
          ) : null}
          {tab === 2 ? <EducationComponent setTab={setTab} tab={tab} /> : null}
        </div>
      )}
      {tab === 4 ? <PreviewComponent setTab={setTab} tab={tab} /> : null}
      <Footer/>
    </div>
  );
};

export default DetailsFilling;
