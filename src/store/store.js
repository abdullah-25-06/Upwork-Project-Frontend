import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DataContext = React.createContext({
  userData: {},
  carData: [],
  selectedCar: {},
  setCar() {},
  apiCall() {},
  logout() {},
});

export const DataContextProvider = (props) => {
  const [userData, setUserData] = useState();
  const [carData, setCarData] = useState([]);
  const [selectedCar, setselectedCar] = useState();
  const [callCall, setCall] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    async function Call() {
      try {
        const { data } = await axios.get(`https://vehicle-backend-final2.vercel.app/detail`, {
          headers: {
            "Content-Type": "application/json",
            // auth_token:
            // "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MGYwYTFmZWQyZmZmYTMxZDgxNTNhOCIsImVtYWlsIjoidXNlcjJAZ21haWwuY29tIiwiaWF0IjoxNzEyMjY4Mjg1LCJleHAiOjE3MTI4NzMwODUsImp0aSI6IjI0ZTRkOTBmMTdjMjUzYmRlOWY2ZDk5MTM4ZmE4NzI4ZmE2MDJmNTA0NzcwZTFjNTFlYWQ2ZGNkZTU3MmYxYTgifQ.MQLhpRsSnjf2HIGCpmNcM5BRGI3zktoxfNF2eViI4JY",
            auth_token: localStorage.getItem("access")
              ? `Bearer ${localStorage.getItem("access")}`
              : null,
          },
        });
        setUserData(data.user);
        setCarData(data.vehicle);
        setselectedCar(data.vehicle[0]);
      } catch (err) {
        alert(err);
      }
    }
    localStorage.getItem("isLoggedIn") &&
      localStorage.getItem("access") &&
      Call();

    return () => {};
  }, [callCall]);
  const setApiCall = () => {
    setCall((prev) => !prev);
  };
  const setCar = (ind) => {
    setselectedCar(carData.filter((car) => car._id === ind)[0]);
  };
  const Setlogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("access");
    setUserData();
    setCarData();
    setselectedCar();
    navigate("/login");
  };
  const updatedData = (arr) => {
    setCarData(arr);
  };
  return (
    <DataContext.Provider
      value={{
        carData: carData?.length > 0 && [...carData],
        userData: userData,
        selectedCar: selectedCar,
        setCar: setCar,
        apiCall: setApiCall,
        logout: Setlogout,
        data: updatedData,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};
export default DataContext;
