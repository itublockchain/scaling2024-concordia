"use client";

import React, { useState } from "react";

type Project = {
  id: string;
  imageUrl: string;
  name: string;
  description: string;
  fields: string[];
};

type Request = {
  userId: string;
  userName: string;
  userProfile: string;
  userSkills: string[];
};

const projectData: Project = {
  id: "1",
  imageUrl: "background.jpeg",
  name: "Project Alpha",
  description:
    "This is a detailed description of Project Alpha, focusing on development.",
  fields: ["Development", "UI/UX", "Marketing"],
};

const requestData: Request[] = [
  {
    userId: "1001",
    userName: "Barış",
    userProfile: "https://via.placeholder.com/50",
    userSkills: ["React", "Node.js"],
  },
  {
    userId: "1002",
    userName: "Göktuğ",
    userProfile: "https://via.placeholder.com/50",
    userSkills: ["Marketing", "SEO"],
  },
];

const ProjectRequestsPage: React.FC = () => {
  const [requests, setRequests] = useState<Request[]>(requestData);

  const handleAccept = (userId: string) => {
    console.log("Accepted: ", userId);
  };

  const handleReject = (userId: string) => {
    console.log("Rejected: ", userId);

    setRequests((reqs) => reqs.filter((req) => req.userId !== userId));
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-gray-900">{projectData.name}</h1>
      <img
        src={projectData.imageUrl}
        alt="Project"
        className="w-full rounded-lg mt-4"
      />
      <p className="text-gray-700 mt-4">{projectData.description}</p>
      <h2 className="text-xl font-semibold mt-6">Fields:</h2>
      <ul className="list-disc list-inside">
        {projectData.fields.map((field) => (
          <li key={field}>{field}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectRequestsPage;
