import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Top from "./pages/Top";
import Login from "./pages/Login";
import AuthUserContextProvider, {
  useAuthUser,
} from "../ContextProvider/AuthUserContextProvider";

function PrivateRoute() {
  const authUser = useAuthUser();
  if (authUser.user !== null) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
}

function Containers() {
  return (
    <AuthUserContextProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Top />} />
        </Route>
      </Routes>
    </AuthUserContextProvider>
  );
}

export default Containers;
