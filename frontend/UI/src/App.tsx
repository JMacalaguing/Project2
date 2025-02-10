import { Routes, Route} from "react-router-dom";
import Dashboard from "./Pages/dashboard";
import Sidebar from "./Components/sidebar";



function App() {
 
  return (
    <div className="flex h-screen bg-white">
    <Sidebar/>
    <Routes>
      <Route path="/" element={<Dashboard />} />
    </Routes>
   
    </div>
  );
}

export default App;
