import React from "react";
import { useProjects } from "../contexts/ProjectsContext"

const Projects = () => {
    const { projects } = useProjects();

    return (
        <div className="flex flex-col w-full justify-between bg-gradient-to-r from-sky-500 to-indigo-500">
            <div className="mx-auto max-w-lg">
                <h1 className="text-center w-full mt-8 text-3xl">All Projects</h1>
                {projects.map((project, index) => (
                    <div key={index} className="max-w-sm mx-auto bg-cyan-100 rounded-lg overflow-hidden shadow-lg mt-8">
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{project.projectName}</div>
                            <div className="mb-4">
                                <img src={project.projectImage} alt="Project Image" className="w-full h-auto" style={{ maxWidth: '150px' }} />
                            </div>
                            <p className="text-gray-700 text-base">{project.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Projects;