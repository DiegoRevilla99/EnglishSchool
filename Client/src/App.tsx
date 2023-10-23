import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { useAppSelector } from "./hooks/useRedux";
import { useFindProfileMutation } from "./slices/AuthSlice";

import LoadingScreen from "./pages/LoadingScreen";
import SecureLS from "secure-ls";
import routes from "./routes";

function App() {
  const ls = new SecureLS({ encodingType: "aes" });
  const currentUser = useAppSelector((state) => state.auth.user);

  const [findProfile] = useFindProfileMutation();

  async function getUser() {
    const rawUser = ls.get("_user");
    const rawToken = ls.get("_accessToken");

    if (rawUser !== "" && rawToken !== "") {
      await findProfile(JSON.parse(rawUser).id);
    }
  }

  function getRoutes() {
    return createBrowserRouter(routes(currentUser));
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <RouterProvider
        router={getRoutes()}
        fallbackElement={<LoadingScreen />}
      />
      <ToastContainer />
    </>
  );
}

export default App;
