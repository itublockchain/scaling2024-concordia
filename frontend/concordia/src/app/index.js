'use client';
import Head from "next/head";
import Image from "next/image";
import Footer from "./Footer";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import "react-pro-sidebar/dist/css/styles.css";
import Link from "next/link";

import "animate.css";
import Layout from "./layout";

const Home = () => {
  




  return (
<div className="a">
  <section className="ft:flex ft:flex-col bg-cover bg-center bg-scroll bg-[url('/background.png')] h-[972px]">
    <div className="w-full flex-1 ml-96">
      <div className="w-full h-full flex flex-col justify-center items-center ft:gap-1 ft:grid ft:grid-cols-12 px-5 sm:px-20 mr-56 ml-32">
        <div className="ft:col-span-7 flex flex-col justify-center ft:justify-start ft:items-right">

          <div className="font-medium text-right ft:text-right ft:mt-0 ml-10 ">
            <p className="text-3xl ft:text-5xl   ml-64 text-white">
              Welcome to Concordia.
            </p>
            <br></br>
            <p className="w-full py-2 text-3xl ft:text-3xl text-white">
              your decentralized 
            </p>
            <p className="w-full py-2 text-3xl ft:text-3xl text-white">
               f(i)unding platform
            </p>
          

          <p className="my-4 animate__animated animate__backInDown text-sm leading-6 ft:w-8/12 text-center ft:text-left ml-96 text-white">
           To combine developers, researchers, designers, investors
          </p>

          <p className="my-4 animate__animated animate__backInDown text-sm leading-6 ft:w-8/12 text-center ft:text-left ml-96 text-white">
            All you need is, simply, an idea!
          </p>
          </div>
          <div className="flex justify-center ft:justify-start text-base ss:text-xl mt-6 ml-96">
            <button
              className="bg-blue-700 w-40 rounded-full text-white p-2 py-4 hover:bg-indigo-800 ml-7"
              onClick={() => {
                window.open("/launch", "_self");
              }}
            >
              <div className="flex items-center justify-center">
                <p className="text-[12px] font-bold px-2">Create your Project</p>
                
              </div>
            </button>

            <button
              className="bg-blue-100 w-40 text-blue-800 rounded-full ml-4 p-2 py-4 hover:bg-blue-200 ml-9 "
              onClick={() => {
                if (true) {
                  window.open("/projects", "_self");
                }
              }}
            >
              <p className="text-[12px]">
                Browse Project
              </p>
            </button>
          </div>

        </div>
      </div>
    </div>
  </section>
  <section className="flex justify-end mt-4 ft:mt-10 px-5">
    <h1 className="text-3xl">Explore Projectss</h1>
  </section>
</div>
)}


Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};


export default Home;