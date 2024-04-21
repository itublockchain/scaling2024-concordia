import { show_account_info, show_project_info } from "@/utils/binding";
import Link from "next/link";
import { notFound } from "next/navigation";

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

type AccountDetailProps = {
  accountId: number;
  name: string;
  imageUrl: string;
  bio: string;
  job: number;
  created_project_ids: string[];
  joined_projects_ids: string[];
};

type Project = {
  name: string;
  description: string;
  imageUrl: string;
};

export default async function Profil({ params }: { params: { slug: string } }) {
  let accountData: AccountDetailProps;
  let rawAccountData = await show_account_info(`${params.slug}`);
  if (rawAccountData?.reason) {
    notFound();
  }

  accountData = {
    accountId: rawAccountData[0],
    name: rawAccountData[1],
    imageUrl: rawAccountData[2],
    bio: rawAccountData[3],
    created_project_ids: rawAccountData[4] || [],
    joined_projects_ids: rawAccountData[5] || [],
    job: rawAccountData[7],
  };

  let projects: Project[] = [];
  for (const project of accountData?.joined_projects_ids) {
    let rawProjectData = await show_project_info(project);
    if (rawProjectData?.reason) {
      notFound();
    }
    projects.push({
      name: rawProjectData[0],
      description: rawProjectData[7],
      imageUrl: rawProjectData[2],
    });
  }

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center px-6 py-12">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="md:flex">
          <div className="w-full md:w-1/3 bg-blue-600">
            <div className="p-8">
              <img
                className="h-48 w-full object-cover md:h-full md:w-48 rounded-full mx-auto"
                src={`${accountData.imageUrl}`}
                alt="Profile avatar"
              />
            </div>
          </div>
          <div className="w-full md:w-2/3">
            <div className="p-8">
              <div className="text-center md:text-left">
                <p className="text-2xl text-blue-600 font-bold">
                  {accountData.name}
                </p>
                <p className="text-xl text-gray-500 italic">
                  {jobs.find((val) => val.id == accountData.job)?.label}
                </p>
                <div className="mt-4">
                  <h3 className="font-semibold text-gray-700 text-xl">
                    Biography
                  </h3>
                  <p className="text-gray-600">{accountData.bio}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-8 py-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Previous Projects
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {projects.map((project) => (
              <div
                key={project.name}
                className="bg-white rounded-lg shadow-lg p-4"
              >
                <img
                  src={project.imageUrl}
                  alt={project.name}
                  className="w-full h-32 rounded-lg object-cover"
                />
                <Link
                  href={`/project/${project.name}`}
                  className="font-bold text-lg mt-2 hover:text-red-700"
                >
                  {project.name}
                </Link>
                <p className="text-gray-600 text-sm">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
