import { Route, Routes } from "react-router-dom";
import ShowImageList from "./Components/Images/ShowImageList";
import ShowVideoList from "./Components/Videos/ShowVideoList";

function App() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-violet-500 to-fuchsia-500">
      <Routes>
        <Route index element={<ShowImageList />}></Route>
        <Route path="/ShowVideoList" element={<ShowVideoList />}></Route>
        <Route path="/" element={<ShowVideoList />}></Route>
      </Routes>
    </div>
  );
}

export default App;
