import { GraphBuilder } from "./GraphBuilder/GraphBuilder.tsx";
import store from "@/redux/store.ts";
import { Provider } from "react-redux";
import { ThemeProvider } from "@/components/shadcnUI/ThemeProvider.tsx";
import { ModeToggle } from "@/components/shadcnUI/ModeToggle.tsx";
import { Select } from "@/components/ui/select.tsx";
import LanguageSelect from "@/components/LanguageSelect.tsx";
import HomePage from "@/HomePage/HomePage.tsx";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Provider store={store}>
        <div
          className={
            "flex flex-col bg-background text-foreground h-full w-full"
          }
        >
          <div className={"flex justify-end bg-background text-foreground "}>
            <ModeToggle />
            <LanguageSelect />
          </div>
          <HomePage />
          {/*<GraphBuilder style={{height: "100%", width: "100%"}}/>*/}
        </div>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
