"use client";

import React, { useState } from "react";

type Project = {
  id: string;
  imageUrl: string;
  name: string;
  description: string;
  fields: string[];
  jobs: string[];
  members: string[];
};

const Settings: React.FC = () => {
  const [profile, setProfile] = useState({
    username: "",
    description: "",
    bio: "",
    profileImage: "",
  });
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      imageUrl: "default_project_image.png",
      name: "Project One",
      description: "Description for Project One",
      fields: ["DeFi", "Wallet"],
      jobs: ["Frontend Developer", "Backend Developer"],
      members: ["Ataberk", "Baris"],
    },
  ]);
  const [editValues, setEditValues] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<"myProjects" | "joinedProjects">(
    "myProjects",
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditClick = (project: Project) => {
    setEditValues({ ...project });
  };

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof Project,
  ) => {
    if (editValues) {
      setEditValues({ ...editValues, [field]: e.target.value });
    }
  };

  const handleSaveProject = () => {
    if (editValues) {
      setProjects(
        projects.map((project) =>
          project.id === editValues.id ? { ...editValues } : project,
        ),
      );
      setEditValues(null);
    }
  };

  const renderProjects = () =>
    projects.map((project) => (
      <div key={project.id} className="border p-4 my-4">
        {editValues && editValues.id === project.id ? (
          <div className="space-y-2">
            <input
              type="text"
              name="name"
              placeholder="Project Name"
              value={editValues.name}
              onChange={(e) => handleEditChange(e, "name")}
              className="border p-2 w-full"
            />
            <input
              type="text"
              name="description"
              placeholder="Project Description"
              value={editValues.description}
              onChange={(e) => handleEditChange(e, "description")}
              className="border p-2 w-full"
            />
            <input
              type="file"
              name="imageUrl"
              placeholder="Image URL"
              value={editValues.imageUrl}
              onChange={(e) => handleEditChange(e, "imageUrl")}
              className="border p-2 w-full"
            />
            <button
              onClick={handleSaveProject}
              className="py-2 px-4 border rounded-md bg-blue-500 text-white"
            >
              Save
            </button>
          </div>
        ) : (
          <div className="flex space-x-4 items-center">
            <div className="w-24 h-24 bg-gray-200 flex justify-center items-center">
              <img
                src={project.imageUrl}
                alt={project.name}
                className="max-w-full max-h-full"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold">{project.name}</h3>
              <p>{project.description}</p>
            </div>
            <button
              onClick={() => handleEditClick(project)}
              className="py-2 px-4 border rounded-md bg-gray-300"
            >
              Edit
            </button>
          </div>
        )}
        <div className="my-4">
          <h4 className="font-bold">Fields</h4>
          <div>
            {project.fields.map((field) => (
              <label key={field}>
                <input type="checkbox" className="mr-2" />
                {field}
              </label>
            ))}
          </div>
        </div>
        <div className="my-4">
          <h4 className="font-bold">Jobs</h4>
          <div>
            {project.jobs.map((job) => (
              <label key={job}>
                <input type="checkbox" className="mr-2" />
                {job}
              </label>
            ))}
          </div>
        </div>
        <div className="my-4">
          <h4 className="font-bold">Members</h4>
          <div className="flex">
            {project.members.map((member) => (
              <div key={member} className="border p-2 m-2">
                {member}
              </div>
            ))}
          </div>
        </div>
      </div>
    ));

  return (
    <div className="max-w-4xl mx-auto p-8">
      <form className="space-y-6">
        <div className="flex justify-between space-x-4">
          <div className="w-full">
            <label
              htmlFor="profileImage"
              className="block text-sm font-medium text-gray-700"
            >
              Profile Image URL
            </label>
            <input
              type="text"
              name="profileImage"
              id="profileImage"
              value={profile.profileImage}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex flex-col space-y-4 w-full">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                value={profile.username}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <input
                type="text"
                name="description"
                id="description"
                value={profile.description}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
        <div>
          <label
            htmlFor="bio"
            className="block text-sm font-medium text-gray-700"
          >
            Bio
          </label>
          <textarea
            name="bio"
            id="bio"
            value={profile.bio}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          ></textarea>
        </div>
        <button
          type="button"
          className="self-end bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Save Profile
        </button>
      </form>

      <div className="flex justify-center my-4">
        <button
          onClick={() => setActiveTab("myProjects")}
          className={`px-4 py-2 mr-2 ${activeTab === "myProjects" ? "bg-green-500 text-white" : "bg-gray-200"}`}
        >
          My Projects
        </button>
        <button
          onClick={() => setActiveTab("joinedProjects")}
          className={`px-4 py-2 ${activeTab === "joinedProjects" ? "bg-green-500 text-white" : "bg-gray-200"}`}
        >
          Joined Projects
        </button>
      </div>

      {activeTab === "myProjects" ? (
        renderProjects()
      ) : (
        <div>Joined Projects content will go here.</div>
      )}
    </div>
  );
};

export default Settings;
