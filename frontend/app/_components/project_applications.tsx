"use client";

import {
  accept_application,
  reject_application,
  show_account_info,
} from "@/utils/binding";
import { ethers } from "ethers";
import { useContext, useEffect, useState } from "react";
import { LoadingContext } from "../_Providers";
import { toast } from "./ui/use-toast";
import Link from "next/link";

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

export function ProjectApplications(props: {
  project_name: string;
  project_appliers: any[];
}) {
  let context = useContext(LoadingContext);
  const [requests, setRequests] = useState<any[]>(props.project_appliers);

  async function handleAccept(userId: string) {
    context.setLoading(true);
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    let result = await accept_application(signer, props.project_name, userId);
    context.setLoading(false);
    if (result?.reason) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: result.reason,
      });
      return;
    }

    setRequests((reqs) => reqs.filter((req) => req[0] !== userId));
  }

  async function handleReject(userId: string) {
    context.setLoading(true);

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    let result = await reject_application(signer, props.project_name, userId);
    context.setLoading(false);
    if (result?.reason) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: result.reason,
      });
      return;
    }
    setRequests((reqs) => reqs.filter((req) => req[0] !== userId));
  }

  return (
    <>
      <h2 className="text-xl font-semibold mt-6 mb-4">Requests:</h2>
      {requests.map((request) => (
        <div
          key={request[0]}
          className="p-4 border rounded shadow-sm mb-4 flex justify-between items-center"
        >
          <div className="flex items-center">
            <img
              src={request[2]}
              alt={request[1]}
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <Link
                href={`/account/${request[0]}`}
                className="text-lg font-semibold hover:text-red-600"
              >
                {request[1]}
              </Link>
              <p className="text-sm text-gray-600">
                Job:
                {jobs.find((val) => val.id == request[7]).label}
              </p>
            </div>
          </div>
          <div>
            <button
              onClick={() => handleAccept(request[0])}
              className="text-white bg-green-500 hover:bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Accept
            </button>
            <button
              onClick={() => handleReject(request[0])}
              className="text-white bg-red-500 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
