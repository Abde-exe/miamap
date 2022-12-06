import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SocketAuth from "./pages/SocketAuth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SocketAuth />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
