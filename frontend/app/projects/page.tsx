"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/_components/ui/accordion";
import {
  apply_for_project,
  get_projects,
  list_projects,
  show_account_info,
  show_project_info,
} from "@/utils/binding";
import { Button } from "../_components/ui/button";
import { ProjectDisplayCard } from "../_components/ProjectDisplayCard";
import {
  ProjectDetailDisplayCard,
  ProjectDetailDisplayCardProps,
} from "../_components/ProjectDetailDisplayCard";
import { useContext, useEffect, useState } from "react";
import { Checkbox } from "../_components/ui/checkbox";
import { LoadingContext } from "../_Providers";
import { ethers } from "ethers";
import { toast } from "../_components/ui/use-toast";
import Link from "next/link";

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

export default function AccordionDemo() {
  let context = useContext(LoadingContext);
  async function applyProject(project_name: string) {
    context.setLoading(true);
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    let result = await apply_for_project(signer, project_name);
    context.setLoading(false);

    if (result?.reason) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: result.reason,
      });
      return;
    }
  }

  useEffect(() => {
    get_projects([], 4);
  }, []);
  let [projects, setProjects] = useState([]);

  async function get_projects(fields: number[], job: number) {
    context.setLoading(true);
    let rawData = await list_projects(fields, job);
    let parsedData = [];
    rawData.forEach((item: any) => {
      if (item[0] != "") {
        console.log(
          item[2].map((val, index) => {
            console.log(val == 1);
            // if (val == 1) item[2][index] = true;
          }),
        );
        parsedData.push(item);
      }
    });
    context.setLoading(false);
    setProjects(parsedData);
  }

  console.log(projects);
  return (
    <>
      <div className="text-center text-3xl font-semibold my-8 text-gray-800">
        Projects Filter
      </div>
      <div className="w-11/12 mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {projects.map((data, index) => (
            <AccordionItem value={`${index}`} key={index}>
              <AccordionTrigger className="flex justify-between items-center bg-gradient-to-r from-indigo-500 to-purple-700 hover:from-indigo-600 hover:to-purple-800 rounded-lg px-6 py-4 text-white transition-colors duration-300 ease-in-out">
                <div className="flex items-center space-x-4 flex-grow">
                  <img
                    src={data[3]}
                    alt="Project Image"
                    className="w-48 h-32 object-cover rounded-lg shadow-sm"
                  />
                  <div className="flex flex-col flex-grow">
                    <span className="text-xl font-bold">{data[0]}</span>
                    <span className="text-sm opacity-90">{data[4]}</span>
                  </div>
                </div>
                <div className="flex flex-col justify-center gap-8">
                  <Button
                    onClick={() => applyProject(data[0])}
                    className="ml-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition-colors duration-300 ease-in-out shadow"
                  >
                    Apply to Project
                  </Button>
                  <Link
                    href={`/project/${data[0]}`}
                    className="ml-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition-colors duration-300 ease-in-out shadow"
                  >
                    Go to Project Detail
                  </Link>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 bg-white rounded-b-lg">
                <div className="flex flex-col space-y-3">
                  <h3 className="text-xl font-semibold">Fields</h3>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex gap-10 justify-start items-start">
                      {fields.map((item, index) => (
                        <div
                          key={index}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <Checkbox
                            checked={
                              data[2].find((i: number) => i == index) == index
                            }
                          />
                          <label className="text-sm font-normal">
                            {item.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold">Jobs</h3>
                  <div className="flex flex-wrap gap-3">
                    {data[1].map((item, idx) => (
                      <div key={idx} className="flex items-center">
                        <Checkbox
                          checked={item}
                          className="form-checkbox text-green-500 rounded"
                        />
                        <label className="ml-2 text-sm font-medium text-gray-700">
                          {jobs[idx].label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </>
  );
}
