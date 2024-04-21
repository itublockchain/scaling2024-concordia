import { show_account_info, show_project_info } from "@/utils/binding";
import Error from "next/error";
import { useParams } from "next/navigation";
import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ProjectApplications } from "@/app/_components/project_applications";

type ProjectDetailProps = {
  imageUrl: string;
  name: string;
  description: string;
  appliers: string[];
  fields: number[];
  jobs: boolean[];
  members: any[];
};

const fields = [
  {
    id: 0,
    label: "Defi",
  },
  {
    id: 1,
    label: "Wallet",
  },
  {
    id: 2,
    label: "Dao",
  },
  {
    id: 3,
    label: "DApp",
  },
] as const;

const jobs = [
  {
    id: 0,
    label: "Reseacher",
  },
  {
    id: 1,
    label: "Designer",
  },
  {
    id: 2,
    label: "Developer",
  },
  {
    id: 3,
    label: "Investor",
  },
] as const;

export default async function ProjectDetail({
  params,
}: {
  params: { slug: string };
}) {
  let projectData: ProjectDetailProps;
  let rawProjectData = await show_project_info(`${params.slug}`);
  if (rawProjectData?.reason) {
    notFound();
  }
  let membersAddress = rawProjectData[4];

  let appliersAddress = rawProjectData[5];
  projectData = {
    name: rawProjectData[0],
    imageUrl: rawProjectData[2],
    description: rawProjectData[7],
    fields: rawProjectData[9].map((val: any) => parseInt(val)),
    jobs: rawProjectData[6],
    appliers: [],
    members: [],
  };

  for (const member of membersAddress) {
    projectData.members.push(await show_account_info(member));
  }

  for (const applier of appliersAddress) {
    projectData.appliers.push(await show_account_info(applier));
    console.log(applier);
  }

  return (
    <div className="max-w-6xl mx-auto p-8 w-2/3">
      <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6">
        <div className="w-full md:w-1/2 aspect-square">
          <img
            src={projectData.imageUrl}
            alt={projectData.name}
            className="w-full h-full object-cover overflow-hidden object-center rounded-xl"
          />
        </div>
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold">{projectData.name}</h1>
          <div className="flex flex-wrap my-2">
            <h2 className="text-xl w-full font-semibold mb-2">Fields</h2>
            {projectData.fields.map((field, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-200 rounded-full mr-2"
              >
                {fields.find((val) => val.id == field).label}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap my-2">
            <h2 className="text-xl w-full font-semibold mb-2">Jobs</h2>
            {projectData.jobs.map(
              (job, index) =>
                job && (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-200 rounded-full mr-2"
                  >
                    {jobs[index].label}
                  </span>
                ),
            )}
          </div>
          <div className="flex flex-wrap my-2">
            <h2 className="text-xl w-full font-semibold mb-2">Members</h2>
            <div className="flex flex-wrap">
              {projectData.members.map((member, index) => (
                <div key={index} className="p-2 border rounded shadow-sm m-2">
                  <Link
                    className="hover:text-red-700"
                    href={`/account/${member[0]}`}
                  >
                    {member[1]}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="my-8">
        <h2 className="text-2xl font-semibold mb-4">Description</h2>
        <div className="w-3/5">
          <p className="line-clamp-3">{projectData.description}</p>
        </div>
      </div>
      <ProjectApplications
        project_name={projectData.name}
        project_appliers={projectData.appliers}
      />
    </div>
  );
}

// const ProjectDetailPage: React.FC = () => {
//   return <ProjectDetail project={project} />;
// };
