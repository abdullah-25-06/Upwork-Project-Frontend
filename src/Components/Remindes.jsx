import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DataContext from "../store/store";
import axios from "axios";
import Navbar from "./Navbar";

function Remindes() {
  const [title, setTitle] = useState("Batttery");
  const [date, setStartDate] = useState(new Date());
  const [a, setA] = useState(true);
  const [kilometer, setKilometer] = useState();
  const [days, setDays] = useState();
  const [amount, setAmount] = useState();
  const [odometer, setOdometer] = useState();
  const [selectedValue, setSelectedValue] = useState("");
  const ctx = useContext(DataContext);
  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const [dataSource, setDataSource] = useState();
  useEffect(() => {
    async function Call() {
      try {
        const { data } = await axios.get(
          `http://localhost:8000/getmaintance?id=${ctx.selectedCar._id}`,
          {
            headers: {
              "Content-Type": "application/json",
              auth_token: localStorage.getItem("access")
                ? `Bearer ${localStorage.getItem("access")}`
                : null,
            },
          }
        );
        setStartDate(data.vehicle.date);
        setKilometer(data.vehicle.kilometer);
        setDays(data.vehicle.days);
        setAmount(data.vehicle.amount);
        setOdometer(data.vehicle.odometer);
        setSelectedValue(data.vehicle.reminder);
        setA((prev) => !prev);
      } catch (err) {
        alert("Please Submit the data");
        setStartDate(new Date());
        setKilometer();
        setDays();
        setAmount();
        setOdometer();
        setSelectedValue();
        setA((prev) => !prev);
      }
    }
    ctx.selectedCar && Call();
    setDataSource(ctx.carData);
  }, [ctx]);

  const changeHandler = (ind) => {
    return ctx.setCar(ind);
  };
  const data = dataSource?.length > 0 ? (
    <div className="side mt-1">
      <img src={ctx?.selectedCar?.images[0]?.data_url} alt="" />
      <NavDropdown
        title={`${ctx.selectedCar?.make} ${ctx.selectedCar?.model}`}
        id="collapsible-nav-dropdown"
      >
        {dataSource.map((elem, ind) => {
          return (
            elem._id !== ctx.selectedCar?._id && (
              <NavDropdown.Item
                onClick={() => {
                  changeHandler(elem._id);
                }}
                key={ind}
              >
                <img
                  src={elem.images[0].data_url}
                  alt="React Bootstrap logo"
                  style={{ width: "45px", height: "45px", marginRight: "5px" }}
                />
                {elem.make} {elem.model}
              </NavDropdown.Item>
            )
          );
        })}
        ;
      </NavDropdown>
    </div>
  ) : <h6> NO Cars</h6>;

  const getval = (event) => {
    setTitle(event.target.innerHTML);
  };
  const logoutH = () => {
    ctx.logout()
  }
  const sendApi = async () => {
    if (
      !date ||
      !kilometer ||
      !days ||
      !amount ||
      !odometer ||
      !selectedValue
    ) {
      return alert("Fillout all the fields");
    }
    try {
      const { data } = await axios.post(
        `http://localhost:8000/maintance?id=${ctx.selectedCar._id}`,
        {
          kilometer,
          days,
          amount,
          odometer,
          date,
          reminder: selectedValue,
        },
        {
          headers: {
            "Content-Type": "application/json",
            auth_token: localStorage.getItem("access")
              ? `Bearer ${localStorage.getItem("access")}`
              : null,
          },
        }
      );
      alert("data Submitted");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="dashboard">
        <div className="nav">
          <img
            src="https://s3-alpha-sig.figma.com/img/faba/2752/6538bec34335abcad69571793b99bc1f?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=GMEBYavZ26OzLiBgiZb-Z-qsIFQ6MyNbCqqTlQphlc4ih796FWdO6rGmCgZ~FNNfOB6BpRvhpmAMrOWOdKDYf8GeRqhNH8OwhYyyCnWVxobaFs4I3G2jjwDMa6IUV6OltQhDBfDkdzSgifAX2H458m1miUCWm~xEWyLzE4T95I2c2tMCwV0jBe~QgqBko6V~RtFftiUXHrjUHO2zsHhcdfF3KH4AkIVs~BB-3cIVGVcANyzSQB0tX25kLPXmZw~1oMzAK9Ec7yAmwIlpMPE94MlCByod2DkG24xq96GMPA2tG4vkGuPJqeYdJ6jiYaEq-4gxzVf0Z7SRqGcEuvpoWQ__"
            id="carimg"
            alt=""
          />
          <h4 id="color">VEHICLE MAINTAINENCE TRACkER</h4>
          <div className="navchild" onClick={logoutH}>
            <h4>LOGOUT</h4>
            <img src="sign.png" alt="" />
          </div>
        </div>
        <div className="col-xl-9 mx-auto mt-3 title ">
          <Navbar />        </div>
        <div className="col-xl-9 mx-auto btnholder">
          <NavLink to="/Reminders">
            <button
              id="subbtn3"
              style={{ width: "220px", fontSize: "18px", color: "#CFCD95" }}
            >
              M A I N T E N A C E
            </button>
          </NavLink>
          <NavLink to="/Documentation">
            <button id="subbtn3" style={{ width: "220px", fontSize: "18px" }}>
              D O C U M E N T A T I O N
            </button>
          </NavLink>
        </div>
        <div className="col-xl-10 mx-auto mt-2 remainder py-2" key={a}>
          {dataSource && data}
          <div className="maincols">
            <div className="sidecol">
              <NavLink to="/Reminders" onClick={getval}>
                <h5 className="mt-2">battery</h5>
              </NavLink>
              <NavLink to="/Engine_oil" onClick={getval}>
                <h5>Engine oil</h5>
              </NavLink>

              <NavLink to="/Spark_plugs" onClick={getval}>
                <h5 id="sp">Spark plugs</h5>
              </NavLink>
              <NavLink to="/Timing_belt" onClick={getval}>
                <h5>timing belt</h5>
              </NavLink>
              <NavLink to="/Tire_rotation" onClick={getval}>
                <h5>tire rotation</h5>
              </NavLink>
              <NavLink to="/Wheel_alignment" onClick={getval}>
                <h5>wheel alignment</h5>
              </NavLink>
              <NavLink to="/Fuel_filter" onClick={getval}>
                <h5>Fuel filter</h5>
              </NavLink>
              <NavLink to="/Air_filter" onClick={getval}>
                <h5>air filter</h5>
              </NavLink>
              <NavLink to="/Cabin_filter" onClick={getval}>
                <h5>cabin filter</h5>
              </NavLink>
            </div>
            <div className="sidecol2">
              <div className="bform">
                <div className="formname">
                  <div className="z1 col-md-4"></div>
                  <div className="z2 col-md-8">
                    <h5 className="mt-2" id="stitle">
                      {title}
                    </h5>
                    <img src="fd.png" alt="" />
                  </div>
                </div>
                <div className="ffields">
                  <Box
                    component="form"
                    sx={{
                      "& > :not(style)": { m: 1, width: "95%" },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <div style={{ display: "flex", gap: "5px" }}>
                      <TextField
                        value={kilometer}
                        onChange={(e) => {
                          setKilometer(e.target.value);
                        }}
                        id="standard-basic"
                        label="Kilometers"
                        variant="standard"
                        style={{ width: "250px" }}
                      />{" "}
                      <p className="pt-3">KM</p>
                    </div>
                    <div style={{ display: "flex", gap: "5px" }}>
                      <TextField
                        value={days}
                        onChange={(e) => {
                          setDays(e.target.value);
                        }}
                        id="standard-basic"
                        label="Days"
                        variant="standard"
                        style={{ width: "250px" }}
                      />
                      <p className="pt-3">days</p>
                    </div>
                    <div style={{ display: "flex", gap: "5px" }}>
                      <TextField
                        value={amount}
                        onChange={(e) => {
                          setAmount(e.target.value);
                        }}
                        id="standard-basic"
                        style={{ color: "#1C85D0", width: "250px" }}
                        label="Amount"
                        variant="standard"
                      />
                      <p className="pt-3">amount</p>
                    </div>
                  </Box>
                  <FormControl className="rgs" onChange={handleRadioChange}>
                    {/* <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel> */}
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      //   value={value}
                      //   onChange={handleChange}
                      id="rg"
                      value={selectedValue}
                    >
                      <FormControlLabel
                        id="rad"
                        value="whichever comes first"
                        control={<Radio />}
                        label="whichever comes first"
                      />
                      <FormControlLabel
                        value="no reminders"
                        control={<Radio />}
                        label="no reminders"
                      />
                    </RadioGroup>
                  </FormControl>
                  <h5>Last service</h5>
                  <div style={{ display: "flex", gap: "73px" }}>
                    <div style={{ display: "flex", gap: "5px" }}>
                      <TextField
                        value={odometer}
                        onChange={(e) => {
                          setOdometer(e.target.value);
                        }}
                        id="standard-basic"
                        style={{ color: "#1C85D0", width: "100px" }}
                        label="odometer"
                        variant="standard"
                      />
                      <p className="pt-3">KM</p>
                    </div>
                    <DatePicker
                      className="mt-3"
                      selected={date}
                      onChange={(date) => setStartDate(date)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="btnparent">
            <button onClick={sendApi} id="subbtn">
              submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Remindes;
