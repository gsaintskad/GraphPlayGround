import Image from "next/image";
import React from "react";
// import { useTheme } from "@/components/shadcnUI/ThemeProvider.tsx";

const HomePage = () => {
  // const { theme } = useTheme();
  const theme ="dark"
  return (
    <div
      className={`min-h-screen ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-gray-900"
      } flex flex-col`}
    >
      {/* Hero Section */}
      <header
        className={`flex flex-col items-center justify-center text-center py-20 ${
          theme === "dark"
            ? "bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-800"
            : "bg-gradient-to-r from-blue-300 via-indigo-400 to-purple-500"
        }`}
      >
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
          Welcome to <span className="text-yellow-300">Algorithmer</span>
        </h1>
        <p className="text-xl md:text-2xl font-light">
          Model, simulate, and animate graphs and algorithms effortlessly.
        </p>
        <button
          className={`mt-6 px-6 py-3 rounded-lg text-lg font-semibold shadow-lg ${
            theme === "dark"
              ? "bg-yellow-300 text-gray-900"
              : "bg-blue-600 text-white"
          }`}
        >
          Get Started
        </button>
      </header>

      {/* Features Section */}
      <section
        className={`py-16 px-6 md:px-20 ${
          theme === "dark" ? "bg-gray-800" : "bg-gray-200"
        }`}
      >
        <h2 className="text-3xl font-bold text-center mb-10">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div
            className={`p-6 rounded-lg shadow-md ${
              theme === "dark" ? "bg-gray-700" : "bg-white"
            }`}
          >
            <h3 className="text-xl font-semibold mb-4">
              Interactive Graph Editor
            </h3>
            <p>
              Build and visualize graphs intuitively using drag-and-drop or REST
              API integration.
            </p>
          </div>
          <div
            className={`p-6 rounded-lg shadow-md ${
              theme === "dark" ? "bg-gray-700" : "bg-white"
            }`}
          >
            <h3 className="text-xl font-semibold mb-4">Algorithm Animations</h3>
            <p>
              Step-by-step visualization of BFS, DFS, Dijkstra’s, A*, and more.
            </p>
          </div>
          <div
            className={`p-6 rounded-lg shadow-md ${
              theme === "dark" ? "bg-gray-700" : "bg-white"
            }`}
          >
            <h3 className="text-xl font-semibold mb-4">Seamless UI</h3>
            <p>
              Navigate a single-page interface designed for clarity and
              efficiency.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        className={`py-16 px-6 md:px-20 ${
          theme === "dark" ? "bg-gray-900" : "bg-gray-100"
        }`}
      >
        <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
        <ol className="list-decimal list-inside text-lg space-y-4">
          <li>Choose the type of graph or algorithm to model.</li>
          <li>Input data manually or use API for dynamic updates.</li>
          <li>Watch real-time animations of algorithm operations.</li>
        </ol>
      </section>

      {/* Call to Action */}
      <footer
        className={`py-10 ${
          theme === "dark"
            ? "bg-gradient-to-r from-purple-800 to-blue-600"
            : "bg-gradient-to-r from-purple-500 to-blue-300"
        }`}
      >
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Start Exploring?</h3>
          <button
            className={`px-8 py-4 rounded-lg text-lg font-semibold shadow-lg ${
              theme === "dark"
                ? "bg-yellow-300 text-gray-900"
                : "bg-blue-600 text-white"
            }`}
          >
            Visit GitHub Repository
          </button>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
