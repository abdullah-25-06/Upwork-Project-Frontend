import Dashboard from "./Components/Dashboard";
import Vehicile from "./Components/Vehicile";
import Remindes from "./Components/Remindes";
import Setup from "./Components/Setup";
import Login from "./Components/Login";
import Addcar from "./Components/Addcar";
import Signup from "./Components/Signup";
import Documentation from "./Components/Documentation";
import { Routes, Route, useRoutes, } from "react-router-dom";
function App() {
  return (
    <>
    <Routes>
    
      {["/Reminders", "/Engine_oil", "/Fuel_filter", "/Spark_plugs", "/Battery", "/Timing_belt", "/Tire_rotation", "/Wheel_alignment", "/Fuel_filter", "/Air_filter", "/Cabin_filter"].map((path, index) =>
        <Route path={path} element={<Remindes />} key={index} />
      )}
    
      {["/Documentation", "/VEHICLE_INSURANCE", "/ECO_TEST", "/VEHICLE_BOOK", "/DRIVEN_LISCENE"].map((path, index) =>
        <Route path={path} element={<Documentation />}></Route>
      )}
      <Route path="/" element={<Login />}></Route>
      <Route path="/Dashboard" element={<Dashboard />}></Route>
      <Route path="/Signup" element={<Signup />}></Route>
      <Route path="/Login" element={<Login/>}></Route>
      <Route path="/Vehiclepage" element={<Vehicile />}></Route>
      <Route path="/User_Info" element={<Setup />}></Route>
      <Route path="/Add" element={<Addcar />}></Route>
    </Routes>

    </>
  );
}

export default App;