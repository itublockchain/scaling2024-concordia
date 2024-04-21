"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { SingleImageUpload } from "../_components/SingleImageUpload";
import {
  MemoMultipleImageUpload,
  MultipleImageUpload,
} from "../_components/MultipleImageUpload";

import {
  AbstractProvider,
  Contract,
  JsonRpcSigner,
  ethers,
  isError,
} from "ethers";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/app/_components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { toast } from "@/app/_components/ui/use-toast";
import { Label } from "../_components/ui/label";
import { Textarea } from "../_components/ui/textarea";

import { Checkbox } from "@/app/_components/ui/checkbox";
import { create_account, create_project } from "@/utils/binding";
import { LoadingContext } from "../_Providers";
import { redirect, useRouter } from "next/navigation";

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

const FormSchema = z.object({
  projectName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  jobs: z.array(z.number()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
  fields: z.array(z.number()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
  projectImage: z
    .string()
    .min(30, { message: "You Must Select Project Image" }),
  projectDetailImages: z.array(
    z.string().min(30, {
      message:
        "You can not send empty image please delete imagebox or select image",
    }),
  ),
});

export default function CreateProject() {
  let context = useContext(LoadingContext);
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      projectName: "",
      description: "",
      jobs: [],
      fields: [],
      projectImage: "",
      projectDetailImages: [""],
    },
  });

  async function submit(data: z.infer<typeof FormSchema>) {
    context.setLoading(true);
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const result = await create_project(signer, {
      project_name: data.projectName,
      project_detail_images: data.projectDetailImages,
      project_image: data.projectImage,
      wanted_jobs: {
        reseacher: data.jobs.some((value) => value == 0),
        designer: data.jobs.some((value) => value == 1),
        developer: data.jobs.some((value) => value == 2),
        investor: data.jobs.some((value) => value == 3),
      },
      description: data.description,
      fields: data.fields,
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
    form.reset();
    router.push(`/project/${data.projectName}`);
  }

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("submitted", data);

    (async () => await submit(data))();
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <>
      <section className="bg-gradient-to-r from-sky-500 to-indigo-500">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 mx-auto  divide-y-2 divide-gray-500 space-y-12"
          >
            <div className="w-full mx-auto">
              <div className="flex flex-col lg:flex-row">
                <FormField
                  control={form.control}
                  name="projectImage"
                  render={({ field }) => (
                    <FormItem>
                      <div className="w-96 items-start lg:ml-4">
                        <FormLabel>Project Detail Images Upload</FormLabel>
                        <FormControl>
                          <SingleImageUpload
                            returnImage={(data) => {
                              form.setValue("projectImage", data);
                              form.clearErrors("projectImage");
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <div className="flex flex-col gap-8 lg:w-2/5 w-full mx-auto mt-8">
                  <FormField
                    control={form.control}
                    name="projectName"
                    render={({ field }) => (
                      <FormItem>
                        <div className="items-end">
                          <div className="grid w-full max-w-sm items-center gap-1.5">
                            <FormLabel>Project Name</FormLabel>
                            <FormControl>
                              <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormDescription>
                              This is your project name.
                            </FormDescription>
                            <FormMessage />
                          </div>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <div className="grid w-full gap-1.5">
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Type your message here."
                              id="message-2"
                              className="h-40"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Its your public project description. Do not give
                            much detail.
                          </FormDescription>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <FormField
              control={form.control}
              name="projectDetailImages"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Detail Images Upload</FormLabel>
                  <FormControl>
                    <MemoMultipleImageUpload
                      returnImages={useCallback((data) => {
                        form.setValue("projectDetailImages", data);
                        console.log(data);
                        form.clearErrors("projectDetailImages");
                      }, [])}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fields"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Fields</FormLabel>
                    <FormDescription>
                      Select the items with your projects associeted with.
                    </FormDescription>
                  </div>
                  <div className="grid lg:grid-cols-4 xl:grid-cols-5 grid-cols-3 gap-4">
                    {fields.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="fields"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          item.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.id,
                                          ),
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                {item.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="jobs"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Jobs</FormLabel>
                    <FormDescription>
                      Select the items your projects need.
                    </FormDescription>
                  </div>
                  <div className="grid lg:grid-cols-4 xl:grid-cols-5 grid-cols-3 gap-4">
                    {jobs.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="jobs"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          item.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.id,
                                          ),
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                {item.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="w-full flex">
              <Button type="submit" className="mx-auto my-4">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </section>
    </>
  );
}
