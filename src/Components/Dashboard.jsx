import React, { useContext, useEffect, useState } from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import DataContext from "../store/store";
import Navbar from "./Navbar";

function Dashboard() {
  const ctx = useContext(DataContext);
  const [dataSource, setDataSource] = useState();
  useEffect(() => {
    setDataSource(ctx.carData);
  }, [ctx]);

  // const data =dataSource&& dataSource.map((elem) => {
  const changeHandler = (ind) => {
    return ctx.setCar(ind);
  };
  const data = dataSource?.length > 0 ? (
    <div className="side mt-1">
      <img src={ctx?.selectedCar?.images[0]?.data_url} alt="" />
      {/* <NavDropdown title="Toyota Axio" id="collapsible-nav-dropdown"> */}
      <NavDropdown
        title={`${ctx.selectedCar?.make} ${ctx.selectedCar?.model}`}
        id="collapsible-nav-dropdown"
      >
        {dataSource?.length > 1 && dataSource.map((elem, ind) => {
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
        
      </NavDropdown>
    </div>
  ) : <h6> NO Cars</h6>;
  const logoutH = () => {
    ctx.logout()
  }
  return (
    <>
      <div className="dashboard">
        <div className="nav">
          <img
            src="https://s3-alpha-sig.figma.com/img/faba/2752/6538bec34335abcad69571793b99bc1f?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=GMEBYavZ26OzLiBgiZb-Z-qsIFQ6MyNbCqqTlQphlc4ih796FWdO6rGmCgZ~FNNfOB6BpRvhpmAMrOWOdKDYf8GeRqhNH8OwhYyyCnWVxobaFs4I3G2jjwDMa6IUV6OltQhDBfDkdzSgifAX2H458m1miUCWm~xEWyLzE4T95I2c2tMCwV0jBe~QgqBko6V~RtFftiUXHrjUHO2zsHhcdfF3KH4AkIVs~BB-3cIVGVcANyzSQB0tX25kLPXmZw~1oMzAK9Ec7yAmwIlpMPE94MlCByod2DkG24xq96GMPA2tG4vkGuPJqeYdJ6jiYaEq-4gxzVf0Z7SRqGcEuvpoWQ__"
            id="carimg"
            alt=""
          />
          <h4 id="color">VEHICLE MAINTAINENCE TRAckER</h4>
          <div className="navchild" onClick={logoutH}>
            <h4>LOGOUT</h4>
            <img src="sign.png" alt="" />
          </div>
        </div>
        <div className="col-xl-9 mx-auto mt-3 title ">
          <Navbar />        </div>
        {dataSource && data}
        <div className="col-xl-8 mx-auto spinners">
          <div className="sppinerz">
            <div className="sppiner">
              <div className="spin">{/* Is div m spinner dalna */}</div>
              <p>reminder setup</p>
            </div>
            <div className="sppiner">
              <div className="spin">{/* Is div m spinner dalna */}</div>
              <p>vehicle setup</p>
            </div>
            <div className="sppiner">
              <div className="spin">{/* Is div m spinner dalna */}</div>
              <p>upcoming reminders</p>
            </div>
          </div>
        </div>
        <div className="col-xl-9 mx-auto mt-3 details">
          <h5 className="text-center pt-2" id="color">
            recent month logs
          </h5>
          <div className="dhead">
            <div className="dhead2">
              <h5>total distance</h5>
              <h6 id="color2">lkr 15,000</h6>
            </div>
            <div className="dhead2">
              <h5>service cost</h5>
              <h6 id="color2">100,005km</h6>
            </div>
            <div className="dhead2">
              <h5>documentation reminder</h5>
              <h6 id="color2">vehicle insurance expire</h6>
            </div>
            <div className="dhead2">
              <h5>date</h5>
              <h6 id="color2">nov 05,2024</h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
