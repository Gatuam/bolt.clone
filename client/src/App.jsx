import { Route, Routes } from "react-router-dom";
import "./App.css";
import Aurora from "./components/homePageComponents/Aurora";
import HomePage from "./pages/HomePage";
import EditorPage from "./pages/EditorPage";
import { MessagesProvider } from "./context/Messages.context";
import { UserDeatilProvider } from "./context/Userdetail.context";
import { DialogOpenProvider } from "./context/DialogContext";
import SinginDailog from "./components/homePageComponents/SinginDailog";
function App() {
  return (
    <DialogOpenProvider>
      <UserDeatilProvider>
        <MessagesProvider>
          <div className=" w-full h-screen  justify-center items-center">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <SinginDailog />
                    <HomePage>
                      <Aurora></Aurora>
                    </HomePage>
                  </>
                }
              />
              <Route path="/editor" element={
                <EditorPage/>} />
            </Routes>
          </div>
        </MessagesProvider>
      </UserDeatilProvider>
    </DialogOpenProvider>
  );
}

export default App;
