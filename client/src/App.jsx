import { Route, Routes } from "react-router-dom";
import "./App.css";
import Aurora from "./components/homePageComponents/Aurora";
import HomePage from "./pages/HomePage";
import EditorPage from "./pages/EditorPage";
import { MessagesProvider } from "./context/Messages.context";
import { UserDeatilProvider } from "./context/Userdetail.context";
import { DialogOpenProvider } from "./context/DialogContext";
import SinginDailog from "./components/homePageComponents/SinginDailog";
import { PromptProvider } from "./context/PromptContext";
import { SandPackProvider } from "./context/SandPackContext";
function App() {
  return (
    <PromptProvider>
      <DialogOpenProvider>
        <UserDeatilProvider>
          <MessagesProvider>
            <div className=" w-full h-screen  justify-center items-center">
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <HomePage>
                        <SinginDailog />
                        <Aurora></Aurora>
                      </HomePage>
                    </>
                  }
                />
                <Route
                  path="/editor"
                  element={
                    <SandPackProvider>
                      <EditorPage />
                    </SandPackProvider>
                  }
                />
              </Routes>
            </div>
          </MessagesProvider>
        </UserDeatilProvider>
      </DialogOpenProvider>
    </PromptProvider>
  );
}

export default App;
