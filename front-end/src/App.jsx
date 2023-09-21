import "./App.css";
import Navbar from "./components/Navbar";
import PageNotFound from "./404/PageNotFound";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import Profile from "./components/client//routes/Profile";
import Settings from "./components/client//routes/Settings";
import { useDispatch, useSelector } from "react-redux";
import { updateIndex } from "./slices/NavIndex";
import { useState } from "react";
function App() {
  const index = useSelector((state) => state.navindex.value);
  const dispatch = useDispatch();
  const [num,setNum] = useState(0);
  return (
    <div className="h-screen bg-grey-900">
      {/* <h1>{index}</h1>
      <button onClick={()=> setNum(num+1)}>incr</button>
      <button onClick={()=>dispatch(updateIndex(num))}>hello</button> */}
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Navbar />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
