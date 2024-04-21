"use client";

// pages/signup.tsx
import React, { useContext, useState } from "react";
import { SingleImageUpload } from "../_components/SingleImageUpload";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../_components/ui/select";
import { create_account } from "@/utils/binding";
import { ethers } from "ethers";
import { toast } from "../_components/ui/use-toast";
import { LoadingContext } from "../_Providers";

type SignUpData = {
  nickname: string;
  profileImage: string;
  socialAccounts: {
    telegram: string;
    twitter: string;
    discord: string;
  };
  bio: string;
  job: number;
};

const initialSignUpData = {
  nickname: "",
  profileImage: "",
  socialAccounts: {
    telegram: "",
    twitter: "",
    discord: "",
  },
  bio: "",
  job: 4,
};

const jobOptions = {
  Researcher: 0,
  Designer: 1,
  Developer: 2,
  Investor: 3,
};

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

export default function SignUpPage() {
  let context = useContext(LoadingContext);
  const [signUpData, setSignUpData] = useState<SignUpData>(null);
  const [showJobsDropdown, setShowJobsDropdown] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    if (name.startsWith("social-")) {
      const socialKey = name.split(
        "-",
      )[1] as keyof SignUpData["socialAccounts"];
      setSignUpData((prev) => ({
        ...prev,
        socialAccounts: {
          ...prev.socialAccounts,
          [socialKey]: value,
        },
      }));
    } else {
      setSignUpData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCheckboxChange = (position: number) => {
    setSignUpData({ ...signUpData, job: position });
  };

  async function createAccount() {
    context.setLoading(true);
    const provider = new ethers.BrowserProvider(window.ethereum);
    // It will prompt user for account connections if it isnt connected
    const signer = await provider.getSigner();

    const result = await create_account(signer, {
      nickname: signUpData.nickname,
      image_url: signUpData.profileImage,
      links: [],
      bio: signUpData.bio,
      job: signUpData.job,
    });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    (async () => await createAccount())();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 to-blue-500">
      <div className="w-full max-w-lg p-8 space-y-8 bg-white rounded-xl shadow-lg z-10">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Create Your Account
          </h2>
          <p className="mt-2 text-sm text-gray-600">On Concordia</p>
        </div>
        <div className="mt-8 space-y-6">
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="nickname" className="sr-only">
                Nickname
              </label>
              <input
                id="nickname"
                name="nickname"
                type="text"
                required
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 placeholder-gray-500 text-gray-900 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Nickname"
                onChange={handleChange}
              />
            </div>
            <div>
              <SingleImageUpload
                returnImage={(data) => {
                  setSignUpData({ ...signUpData, profileImage: data });
                }}
              />
            </div>
            {["telegram", "twitter", "discord"].map((platform, idx) => (
              <div key={platform}>
                <label htmlFor={`social-${platform}`} className="sr-only">
                  {platform}
                </label>
                <input
                  id={`social-${platform}`}
                  name={`social-${platform}`}
                  type="text"
                  className={`relative block w-full appearance-none rounded-none ${idx === 2 ? "rounded-b-md" : ""} border border-gray-300 px-3 py-2 placeholder-gray-500 text-gray-900 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
                  placeholder={`${platform.charAt(0).toUpperCase() + platform.slice(1)} (optional)`}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>
          <div>
            <label htmlFor="bio" className="sr-only">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              rows={3}
              className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-500 text-gray-900 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Bio"
              required
              onChange={handleChange}
            />
          </div>
          <div className="relative">
            <Select
              onValueChange={(data) => handleCheckboxChange(parseInt(data))}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Job" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  {jobs.map((data, index) => (
                    <SelectItem key={index} value={`${data.id}`}>
                      {data.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <button
            onClick={handleSubmit}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
