import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { updateIndex } from "../src/store/NavIndex";
import { useState } from "react";
import Router from "../src/Routers/Router";
function App() {
  const index = useSelector((state) => state.navindex.value);
  const dispatch = useDispatch();
  const [num,setNum] = useState(0);
  return (
    <Router />
  );
}
export default App;
