'use client';
import Footer from "../components/Footer";
import Header from "../components/Header";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";




import { RotateLoader, ClipLoader } from "react-spinners";




import "react-datepicker/dist/react-datepicker.css";

import Layout from "./layout";




const Launch = () => {


  




  
  return (
    <>
      <section className="bg-gradient-to-r from-sky-500 to-indigo-500">
        <div className="w-full flex my-5 text-base px-3  md:text-xl flex-col items-center ">
          <h1 className="text-center">
            Make it easy for people to learn about your project
          </h1>
        </div>
        <div className="flex flex-col md:flex-row border-t my-11 border-gray-300 py-4 md:px-16 px-5 ">
          <div className="md:w-5/12 ">
            <h1>Project Title</h1>
            <p className="md:text-sm text-xs text-gray-600">
               <br />
              <br />
            
            </p>
          </div>
          <div className="w-12/12 md:w-7/12 md:px-11 mt-5 md:mt-0">
            <div className="items-start">
              <h1>Title</h1>

              <input
             
                type="text"
                maxLength="80"
                name="text"
                id="title"
                placeholder="Write a short Title"
                className="md:w-96 w-full block p-2 md:text-sm text-xs mt-1 border border-gray-300 focus:outline-none rounded-md"
              />
            </div>

            <div className="mt-7">
              <h1>Subtitle</h1>

              <input
            
                type="text"
                name="text"
                id="subtitle"
                maxLength="100"
                placeholder="A short subtitle is going to help"
                className="md:w-96 w-full block p-2 md:text-sm text-xs mt-1 border border-gray-300 focus:outline-none rounded-md"
              />
            </div>
          </div>
        </div>

        <div className="flex md:flex-row flex-col border-t my-11 border-gray-300 py-4 md:px-16 px-5 ">
          <div className="md:w-5/12 ">
            <h1 className="">Project Description</h1>
            <p className="md:text-sm text-xs text-gray-600">
             Description
            </p>
          </div>
          <div className="md:w-7/12 md:px-11 mt-4 md:mt-0">
            <div>
              <h1>Note</h1>
              <textarea
     
                cols="50"
                wrap="soft"
                placeholder="Write a short note"
                id="note"
                className="w-full h-40 md:h-60 text-clip block p-2 md:text-sm text-xs mt-1 border border-gray-300 focus:outline-none rounded-md"
              ></textarea>
            </div>
          </div>
        </div>

        <div className="flex md:flex-row flex-col border-t my-11 border-gray-300 py-4 md:px-16 px-5">
          <div className="md:w-5/12 ">
            <h1>Project Image</h1>
            <p className="md:text-sm text-xs text-gray-600">
              Project Image
              <br />
              <br />
            </p>
          </div>
          <div className="md:w-7/12 md:px-11 ">
            <div className="">
              <div className="border border-gray-300 h-40 md:h-80 w-full hover:bg-gray-200">
                <button
                  className="w-full h-full"
                  id="image"
          
                >
                  {true ? (
                    <div className="w-full h-full">
                      <img
                        alt="..."
                    
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm">Select a File</p>
                      <p className="text-sm text-gray-500 px-2">
                        <small>It must be a JPG, PNG, GIF, TIFF, or BMP.</small>
                      </p>
                    </div>
                  )}
                </button>
                <input
                  type="file"
                  id="imageSrc"
                
                  style={{ display: "none" }}
             
                  className="w-80 block p-2 text-sm mt-1 border border-gray-300 focus:outline-none rounded-md"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex md:flex-row flex-col border-t my-11 border-gray-300 py-4 md:px-16 px-5 ">
          <div className="md:w-5/12 ">
            <h1>Launch Date</h1>
            <p className="md:text-sm text-xs text-gray-600">
              When do you want your project to be launched?
              <br />
              <br />
            </p>
          </div>
          <div className="md:w-7/12 md:px-11 ">
            <div className="flex items-center">
              <div className="flex flex-col">
                <div className="flex flex-col md:ml-4 my-2">
                  <p className="text-sm">Use Calendar</p>
                  <div>
                    <div className="flex bg-gray-50 border px-2 border-gray-300 items-center p-2">
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clipRule="evenodd"
                        ></path>
                      </svg>

                      {/* <DatePicker /> */}

                      <DatePicker
                        id="launchDate"
                        className=" text-gray-900 md:w-60 w-40 bg-gray-50 p-2 sm:text-sm outline-none "
                 
                    

                       
                          // setLaunchDate(date);
                     
                      />
                    </div>
                    {/* {!isValidLaunchDate && (
                      <p className="text-red-700 text-sm">
                        <small>
                          The Launch date should be greater than the current
                          date
                        </small>
                      </p>
                    )} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex md:flex-row flex-col border-t mt-11 border-gray-300 py-4 md:px-16 px-5 ">
          <div className="md:w-5/12 ">
            <h1>Project Duration</h1>
            <p className="md:text-sm text-xs text-gray-600">
              You won't be able to change this later.
              <br />
              <br />
            </p>
          </div>
          <div className="md:w-7/12 md:px-11 ">
            <div>
              <h1 className="md:text-auto text-sm">
                Duration){" "}
              </h1>

              <input
              
                type="text"
                name="text"
                id="duration"
                placeholder="1"
                className="md:w-80 w-full block p-2 md:text-sm text-xs mt-1 border border-gray-300 focus:outline-none rounded-md"
              />
              {true && (
                <p className="text-red-700 md:text-sm text-xs">
                  <small>Duration should be within 1 and 1000</small>
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex md:flex-row flex-col border-t mt-11 border-gray-300 py-4 md:px-16 px-5 ">
          <div className="md:w-5/12 ">
            <h1>Goal (Amount to raise)</h1>
            <p className="md:text-sm text-xs text-gray-600">
              Set the amount to be funded. Note that if the goal is not reached
              after the specified campaign duration, money will be refunded to
              the backers.
              <br />
              <br />
            </p>
          </div>
          <div className="md:w-7/12 md:px-11 ">
            <div>
              <h1>Enter amount to raise in dollars </h1>
              <div className="flex border border-gray-300 rounded-md items-center p-2">
                <p>$</p>
                <input
                  
                  type="text"
                  value={true || ""}
                  name="text"
                  id="goal"
                  // placeholder="$50,000"
                  className="md:w-80 w-full block md:text-sm text-xs ml-1  focus:outline-none rounded-md"
                />
              </div>

            </div>
          </div>
        </div>

        <button
          className="flex flex-col w-full items-center my-5 mb-14 disabled:cursor-not-allowed disabled:opacity-50"
      
        
          // disabled={false}
        >
          {true ? (
            <div className="flex bg-green-300 text-green-800 rounded-md items-center px-3 py-3">
              <ClipLoader color="#004d00" loading="true" size={30} />
              <p className="ml-2"></p>
            </div>
          ) : (
            <div className="flex bg-green-300 text-green-800 rounded-md items-center px-3 py-3">
              <p className="">{launchText}</p>
            </div>
          )}
        </button>
      </section>

      <div className="flex justify-center text-center sm:block sm:p-0 mt-2">

      
        
      </div>
    </>
  );
};

Launch.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Launch;
