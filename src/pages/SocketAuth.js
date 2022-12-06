import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import SocketProvider from "../services/socket";

const SocketAuth = () => {
  const { state } = useLocation();

  if (!state) {
    return <Navigate to={"/login"} replace />;
  }

  return (
    <SocketProvider room={state.code} pseudo={state.pseudo}>
      <Outlet />
    </SocketProvider>
  );
};

export default SocketAuth;
