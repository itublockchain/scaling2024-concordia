"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[url('/background.png')] bg-cover bg-center">
      <section className="flex flex-1 items-center justify-end px-4 sm:px-6 lg:px-20">
        <div className="w-full lg:max-w-lg xl:max-w-xl">
          <h1 className="text-5xl font-bold text-white text-right mr-10">
            Welcome to Concordia.
          </h1>
          <div className="text-right">
            <p className="mt-4 text-2xl text-white">
              Your decentralized fu(i)nding platform
            </p>
            <p className="mt-2 text-xl text-white">Combining developers,</p>
            <p className="mt-2 text-xl text-white">
              researchers, designers, and investors.
            </p>
            <p className="mt-4 text-white italic">
              All you need is, simply, an idea!
            </p>
          </div>
          <div className="mt-6 flex justify-end space-x-reverse space-x-4 pr-4">
            <Link
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 px-6 rounded-full transition duration-300"
              href="/create_project"
            >
              <Link href="/create_project">Create your Project</Link>
            </Link>
            <Link
              className="bg-white hover:bg-gray-100 text-blue-800 py-4 px-6 rounded-full transition duration-300"
              href="/projects"
            >
              Browse Projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
