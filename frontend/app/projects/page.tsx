"use client";
import React, { FC, useEffect, useState } from "react";


interface ProjectsProps {}

const Projects: FC<ProjectsProps> = () => {
  const [likes, setLikes] = useState<number>(0);
  const [dislikes, setDislikes] = useState<number>(0);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleDislike = () => {
    setDislikes(dislikes + 1);
  };

  return (
    <div className="flex flex-col w-full justify-between bg-gradient-to-r from-sky-500 to-indigo-500">
      <div className="mx-auto max-w-lg">
        <h1 className="text-center w-full mt-8 text-3xl">All Projects</h1>
        
        {/* Project Box */}
        <div className="max-w-sm mx-auto bg-cyan-100 rounded-lg overflow-hidden shadow-lg mt-8">
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Project Title</div>
            <div className="mb-4">
              <img src="itublock.png" alt="Project Image" className="w-full h-auto" style={{ maxWidth: '150px' }} />
            </div>
            <p className="text-gray-700 text-base">Concordia, a simple project about blockchain.</p>
            <p className="text-gray-700 text-base">And, just might win a prize on ETHScaling.</p>
          </div>
          <div className="px-6 py-4 flex justify-between items-center">
            <div>
              <button className="text-green-500 hover:text-green-700 focus:outline-none" onClick={handleLike}>
                👍 {likes}
              </button>
              <button className="text-red-500 hover:text-red-700 focus:outline-none" onClick={handleDislike}>
                👎 {dislikes}
              </button>
            </div>
          </div>
        </div>
       
      </div>
   
    </div>
  );
}




export default Projects;