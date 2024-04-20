"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/_components/ui/accordion";
import {
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
import { useEffect, useState } from "react";
import { Checkbox } from "../_components/ui/checkbox";

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
  useEffect(() => {
    get_projects([], 4);
  }, []);
  let [projects, setProjects] = useState([]);

  async function get_projects(fields: number[], job: number) {
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
    setProjects(parsedData);
  }

  console.log(projects);
  return (
    <>
      <div>filter</div>
      <div className="w-8/12 mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {projects.map((data, index) => (
            <AccordionItem value={`${index}`} key={index}>
              <AccordionTrigger>
                <div className="flex justify-between w-full">
                  <div className="flex basis-1/4">
                    <img
                      src={data[3]}
                      width={400}
                      height={400}
                      alt="Picture of the author"
                    />
                  </div>
                  <div className="flex flex-col basis-1/4 gap-14 mt-6">
                    <div className="">{data[0]}</div>
                    <span className="font-semibold line-clamp-4">
                      {data[4]}
                    </span>
                  </div>
                  <div className="flex flex-col justify-center">
                    <Button>apply the project</Button>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col mx-auto">
                  Fields
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
                  Jobs
                  <div className="flex gap-10 justify-start items-start">
                    {data[1].map((item, index) => (
                      <div
                        key={index}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <Checkbox checked={item} />
                        <label className="text-sm font-normal">
                          {jobs[index].label}
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
