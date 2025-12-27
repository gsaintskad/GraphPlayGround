import { GraphBuilder } from "./components/GraphBuilder/GraphBuilder.tsx";

import HomePage from "@/components/Pages/HomePage.tsx";
import NavigationBar from "@/components/NavigationBar/NavigationBar.tsx";
import { Route, Routes } from "react-router-dom";
import AboutPage from "@/components/Pages/AboutPage.tsx";
import BTreeBuilder from "@/components/BTreeBuilder/BTreeBuilder.tsx";
import { LoginPage } from "./components/Pages/Auth/LoginPage.tsx";
import { RegisterPage } from "./components/Pages/Auth/RegisterPage.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";

function App() {
  return (
    <div
      className={
        "flex flex-col bg-background text-foreground h-[100vh]  self-center "
      }
    >
      <NavigationBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route element={<ProtectedRoute />}>
          <Route
            path="/GraphBuilder"
            element={<GraphBuilder style={{ height: "100%", width: "100%" }} />}
          />
          <Route path="/BTreeBuilder" element={<BTreeBuilder />} />
        </Route>
        <Route path="/About" element={<AboutPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
