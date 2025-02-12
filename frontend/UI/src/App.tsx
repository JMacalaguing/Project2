import { Routes, Route} from "react-router-dom";
import Dashboard from "./Pages/dashboard";
import Sidebar from "./Components/sidebar";
import { TableProvider } from "./Context/TableContext";



function App() {
 
  return (
    <TableProvider>
    <div className="flex h-screen bg-white">
    <Sidebar/>
    <Routes>
      <Route path="/" element={<Dashboard />} />
    </Routes>
   
    </div>
    </TableProvider>
  );
}

export default App;
