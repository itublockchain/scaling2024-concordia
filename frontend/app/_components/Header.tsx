import Link from "next/link";
import { useEffect, useState, useCallback } from "react";

const useMediaQuery = (width) => {
  const [targetReached, setTargetReached] = useState(false);

  const updateTarget = useCallback((e) => {
    setTargetReached(e.matches);
  }, []);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${width}px)`);
    media.addEventListener("change", updateTarget);

    // Check on mount (callback is not called until a change occurs)
    if (media.matches) {
      setTargetReached(true);
    }

    return () => {
      media.removeEventListener("change", updateTarget);
    };
  }, [width, updateTarget]);

  return targetReached;
};

export default function Header() {
  const [searchInput, setSearchInput] = useState("");
  const isMobile = useMediaQuery(768); // Use the custom media query hook

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-teal-500 shadow-md">
      <nav className="flex items-center justify-between px-5 py-4 text-white">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <img
              src="/concordia.png"
              alt="Concordia Logo"
              className="w-12 md:w-20"
            />
          </Link>
          <div className="hidden md:flex space-x-4">
            <Link
              href="/"
              className="hover:text-gray-200 transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              href="/projects"
              className="hover:text-gray-200 transition-colors duration-200"
            >
              Projects
            </Link>
            <Link
              href="/create_project"
              className="hover:text-gray-200 transition-colors duration-200"
            >
              Create Project
            </Link>
          </div>
        </div>

        <div className="flex-1 max-w-lg relative">
          <input
            type="search"
            id="default-search"
            className="block w-full p-2 pl-10 text-sm text-gray-900 rounded-full focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search projects, logos..."
            value={searchInput}
            onChange={handleSearchInputChange}
            required
          />
          <svg
            className="w-5 h-5 text-gray-500 absolute top-3 left-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <div className="flex items-center space-x-3">
          <button className="px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition duration-200">
            <a href="signup">Sign In</a>
          </button>
          <button className="px-6 py-2 text-white bg-green-600 rounded hover:bg-green-700 transition duration-200">
            Login
          </button>
          {isMobile && (
            <button
              onClick={() => {}}
              className="block md:hidden w-8 h-8 bg-gray-700 rounded-full hover:bg-gray-600 text-center"
            >
              <svg
                className="text-white mx-auto"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.5 7.5H17.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2.5 12.5H17.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>
      </nav>
    </div>
  );
}
