import { GraphBuilder } from "./GraphBuilder/GraphBuilder.tsx";
import store from "@/redux/store.ts";
import { Provider } from "react-redux";
import { ThemeProvider } from "@/components/shadcnUI/ThemeProvider.tsx";
import {ModeToggle} from "@/components/shadcnUI/ModeToggle.tsx";
import {Select} from "@/components/ui/select.tsx";
import LanguageSelect from "@/components/LanguageSelect.tsx";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Provider store={store}>
        <div
          className={
            "flex bg-background text-foreground h-full w-full"
          }
        >
          <GraphBuilder style={{ height: "100%", width: "100%" }} />
        </div>
        <ModeToggle/>
        <LanguageSelect/>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
