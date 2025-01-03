import { GraphBuilder } from "./components/GraphBuilder/GraphBuilder.tsx";
import store from "@/redux/store.ts";
import { Provider } from "react-redux";
import { ThemeProvider } from "@/components/shadcnUI/ThemeProvider.tsx";
import { ModeToggle } from "@/components/shadcnUI/ModeToggle.tsx";
import { Select } from "@/components/shadcnUI/select.tsx";
import LanguageSelect from "@/components/NavigationBar/LanguageSelect.tsx";
import HomePage from "@/components/HomePage/HomePage.tsx";
import NavigationBar from "@/components/NavigationBar/NavigationBar.tsx";
import {Route, Routes} from "react-router-dom";

function App() {
  console.log(location);
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Provider store={store}>
        <div
          className={
            "flex flex-col bg-background text-foreground h-full w-full"
          }
        >

          <NavigationBar/>
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/GraphBuilder" element={<GraphBuilder style={{height: "100%", width: "100%"}}/>}/>
            <Route path="/BTreeBuilder" element={<h1>b3builder</h1>}/>
          </Routes>

          {/*<GraphBuilder style={{height: "100%", width: "100%"}}/>*/}
        </div>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
