"use client";
import React, { createContext, useContext, useState, FC, ReactNode } from "react";

interface Project {
    projectName: string;
    description: string;
    projectImage: string;
    projectDetailImages: string[];
}

interface ProjectsContextType {
    projects: Project[];
    addProject: (newProject: Project) => void;
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

export const ProjectsProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [projects, setProjects] = useState<Project[]>([]);

    const addProject = (newProject: Project) => {
        setProjects((prevProjects) => [...prevProjects, newProject]);
    };

    return (
        <ProjectsContext.Provider value={{ projects, addProject }}>
            {children}
        </ProjectsContext.Provider>
    );
};

export const useProjects = () => {
    const context = useContext(ProjectsContext);
    if (!context) {
        throw new Error("useProjects must be used within a ProjectsProvider");
    }
    return context;
};
