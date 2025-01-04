import React from "react";
import { useTheme } from "@/components/shadcnUI/ThemeProvider.tsx";

const AboutPage = () => {
  const { theme } = useTheme();

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
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">About Algorithmer</h1>
        <p className="text-xl md:text-2xl font-light">
          Your ultimate graph playground for modeling, simulating, and animating algorithms.
        </p>
      </header>

      {/* Mission Section */}
      <section
        className={`py-16 px-6 md:px-20 ${
          theme === "dark" ? "bg-gray-800" : "bg-gray-200"
        }`}
      >
        <h2 className="text-3xl font-bold text-center mb-10">Our Mission</h2>
        <p className="text-lg text-center max-w-4xl mx-auto">
          Algorithmer is designed to make graph theory and algorithmic modeling
          accessible to everyone, providing an intuitive platform for learning
          and exploration.
        </p>
      </section>

      {/* Features Section */}
      <section
        className={`py-16 px-6 md:px-20 ${
          theme === "dark" ? "bg-gray-900" : "bg-gray-100"
        }`}
      >
        <h2 className="text-3xl font-bold text-center mb-10">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div
            className={`p-6 rounded-lg shadow-md ${
              theme === "dark" ? "bg-gray-700" : "bg-white"
            }`}
          >
            <h3 className="text-xl font-semibold mb-4">Interactive Graph Editor</h3>
            <p>Build graphs intuitively using click-and-drag functionality or REST API input.</p>
          </div>
          <div
            className={`p-6 rounded-lg shadow-md ${
              theme === "dark" ? "bg-gray-700" : "bg-white"
            }`}
          >
            <h3 className="text-xl font-semibold mb-4">Algorithm Animations</h3>
            <p>Visualize algorithms step-by-step, including BFS, DFS, and Dijkstra’s Algorithm.</p>
          </div>
          <div
            className={`p-6 rounded-lg shadow-md ${
              theme === "dark" ? "bg-gray-700" : "bg-white"
            }`}
          >
            <h3 className="text-xl font-semibold mb-4">Customizable Settings</h3>
            <p>Adjust node sizes, colors, and more for a personalized experience.</p>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section
        className={`py-16 px-6 md:px-20 ${
          theme === "dark" ? "bg-gray-800" : "bg-gray-200"
        }`}
      >
        <h2 className="text-3xl font-bold text-center mb-10">Why Choose Algorithmer?</h2>
        <p className="text-lg text-center max-w-4xl mx-auto">
          Algorithmer stands out with its attractive interface, seamless workflow, and ability to bring
          complex algorithms to life through real-time animations and visualizations.
        </p>
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
          <h3 className="text-2xl font-bold mb-4">Ready to Explore?</h3>
          <button
            className={`px-8 py-4 rounded-lg text-lg font-semibold shadow-lg ${
              theme === "dark"
                ? "bg-yellow-300 text-gray-900"
                : "bg-blue-600 text-white"
            }`}
          >
            Get Started
          </button>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
