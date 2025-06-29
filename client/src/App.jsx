import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Aurora from "./components/homePageComponents/Aurora";
import HomePage from "./pages/HomePage";
import EditorPage from "./pages/EditorPage";
import { MessagesProvider } from "./context/Messages.context";
import { DialogOpenProvider } from "./context/DialogContext";
import SinginDailog from "./components/homePageComponents/SinginDailog";
import LoginDialog from "./components/homePageComponents/LoginDailog";
import { PromptProvider } from "./context/PromptContext";
import { SandPackProvider } from "./context/SandPackContext";
import EmailVerficationPage from "./pages/EmailVerficationPage";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authstore";
import { useEffect } from "react";

const RedirectedUser = ({ children }) => {
  const { isAuth, user } = useAuthStore();
  if (isAuth && user?.isVerified) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const ProectedRoute = ({ children }) => {
  const { isAuth } = useAuthStore();

  if (!isAuth) {
    return <Navigate to="/" replace />;
  }

  if (!isAuth) return null;
  return children;
};

function App() {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <PromptProvider>
      <DialogOpenProvider>
        <MessagesProvider>
          <div className="w-full h-screen justify-center items-center">
            <Routes>
              <Route
                path="/"
                element={
                  <HomePage>
                    <SinginDailog />
                    <LoginDialog />
                    <Aurora />
                  </HomePage>
                }
              />
              <Route
                path="/editor"
                element={
                  <ProectedRoute>
                    <SandPackProvider>
                      <EditorPage />
                    </SandPackProvider>
                  </ProectedRoute>
                }
              />
              <Route
                path="/verifaction"
                element={
                  <RedirectedUser>
                    <EmailVerficationPage />
                  </RedirectedUser>
                }
              />
            </Routes>
            <Toaster />
          </div>
        </MessagesProvider>
      </DialogOpenProvider>
    </PromptProvider>
  );
}

export default App;
