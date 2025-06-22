import { Route, Routes } from "react-router-dom";
import "./App.css";
import Aurora from "./components/homePageComponents/Aurora";
import Nav from "./components/homePageComponents/Nav";
import HomePage from "./pages/HomePage";
import EditorPage from "./pages/EditorPage";
import { MessagesProvider } from "./context/Messages.context";

function App() {
  return (
    <MessagesProvider>
      <div className=" w-full h-screen  justify-center items-center">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage>
                <Aurora> 
                </Aurora>
              </HomePage>
            }
          />
          <Route path="/editor" element={<EditorPage/>} />
        </Routes>
      </div>
    </MessagesProvider>
   
  );
}

export default App;
