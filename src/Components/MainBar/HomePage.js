import React from 'react';
import { Link } from 'react-router-dom'; 
import './HomePage.css';
import Navbar from "./Navbar";
import Footer from"./Footer";
const HomePage = () => {
  return (
    <div className='h-screen  mt-[50px]'>
      <Navbar/>
      <section className="bg-white dark:bg-gray-900 h-full">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 h-full">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="lighting max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
              Resume Builder for Your Dream Job
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              Our resume builder helps you create ATS-friendly resumes and improve your chances of landing your dream job with professional templates.
            </p>
            <Link to="/ats"
              className="button-glow mr-4 inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              ATS Scan
            </Link>
    
            <Link
              to="/build-resume"  
              className="button-glow inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              Build My Resume
            </Link>
          </div>
          <div className="pt-10 lg:mt-0 lg:col-span-5 lg:flex">
            <img className="glow" src="https://enhancv.com/_next/static/images/resume4-eb8e2bacc73eb143b714ffec42b44926.webp" alt="hero image" loading='lazy' />
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default HomePage;
