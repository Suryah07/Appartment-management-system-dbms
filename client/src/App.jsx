/* eslint-disable no-multi-str */
import React, { useState, useEffect, useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Aside from "./components/Aside";
import Auth from "./components/Auth";
import OwnerDetails from "./components/OwnerDetails";
import TenantDetails from "./components/TenantDetails";
import CreatingOwner from "./components/CreatingOwner";
import CreatingParkingSlot from "./components/CreatingParkingSlot";
import ComplaintsViewer from "./components/CompaintsViewer";
import RaisingComplaints from "./components/RaisingComplaints";
import ParkingSlot from "./components/ParkingSlot";
import PayMaintenance from "./components/PayMaintenance";
import RentDetails from "./components/RentDetails";
import SalaryStatus from "./components/SalaryStatus";
import CreatingTenant from "./components/CreatingTenant";
import RoomDetails from "./components/RoomDetails";
// import Maintenance from "./components/Maintenance";

function App() {
  const forAdminBox = useMemo(
    () => [
      { "Total Owner": 59 },
      { "Total Tenant": 39 },
      { "Total Employee": 20 },
    ],
    []
  );

  // const forAdminBox = [
  //   { "Total Owner": 59 },
  //   { "Total Tenant": 39 },
  //   { "Total Employee": 20 },
  // ];

  const forEmployeeBox = [{ "Total complaints": 3 }, { Salary: "Rs. 20,0000" }];
  const forOwnerBox = [
    { "No of Emloyees": 5 },
    { "Total Tenant": 4 },
    { "Total complaints": 2 },
  ];
  const forTenantBox = [
    { "tenant id": 12132 },
    { "Tenant Name": "Tharun" },
    { "Tenant age": 20 },
    { dob: "12-1-2002" },
    { "Room no": 123456 },
  ];

  // const isAuthh = window.localStorage.getItem("whom").
  // const [isAuth, setIsAuth] = useState(true);
  const [userid, setUserid] = useState("");
  const [whom, setWhom] = useState("");

  const [adminBox, setAdminBox] = useState(forAdminBox);
  const [employeeBox, setEmployeeBox] = useState(forEmployeeBox);
  const [ownerBox, setOwnerBox] = useState(forOwnerBox);
  const [tenantBox, setTenantBox] = useState(forTenantBox);

  useEffect(() => {
    console.log(whom);
    // setUserid(JSON.parse(window.localStorage.getItem("whom")).username);
    // setWhom(JSON.parse(window.localStorage.getItem("whom")));
    // setIsAuth(JSON.parse(window.localStorage.getItem("isAuth").isAuth));
    if (
      userid.toUpperCase().charAt(0) === "A" ||
      userid.toUpperCase().charAt(0) === "T" ||
      userid.toUpperCase().charAt(0) === "E" ||
      userid.toUpperCase().charAt(0) === "O"
    ) {
      if (
        whom === "admin" ||
        whom === "employee" ||
        whom === "tenant" ||
        whom === "owner"
      ) {
        axios
          .post(`http://10.1.204.172:5000/dashboard/${whom}`, {
            userid: userid,
          })
          .then((res) => {
            console.log(whom, res);
            if (whom === "admin") {
              forAdminBox[0]["Total Owner"] = res.data.totalowner;
              forAdminBox[2]["Total Employee"] = res.data.totalemployee;
              forAdminBox[1]["Total Tenant"] = res.data.totaltenant;
              setAdminBox(forAdminBox);
            }
            if (whom === "owner") {
              forOwnerBox[0]["No of Emloyees"] = res.data.totalemployee;
              forOwnerBox[1]["Total Tenant"] = res.data.totaltenant;
              forOwnerBox[2]["Total complaints"] = res.data.totalcomplaint;
              setOwnerBox(forOwnerBox);
            }
            if (whom === "employee") {
              forEmployeeBox[0]["Total complaints"] = res.data.totalcomplaint;
              setEmployeeBox(forEmployeeBox);
            }
            if (whom === "tenant") {
              console.log(res.data.body[0]);

              forTenantBox[0]["tenant id"] = res.data.body[0].tenant_id;
              forTenantBox[1]["Tenant Name"] = res.data.body[0].name;
              forTenantBox[2]["Tenant age"] = res.data.body[0].age;
              forTenantBox[3].dob = res.data.body[0].dob;
              forTenantBox[4]["Room no"] = res.data.body[0].room_no;
              setTenantBox(forTenantBox);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, [whom]);

  // Sidebar
  const forAdmin = [
    "Tenant Details",
    "Owner Details",
    "Create owner",
    "Alloting Parking slot",
    "Complaints",
    // "Maintenance Fee",
  ];
  const forEmployee = ["Salary Status", "Complaints"];
  const forTenant = [
    "Raising Complaints",
    "Alloted Parking slot",
    "Pay maintenance",
  ];
  const forOwner = [
    "Rent details",
    "Tenant details",
    "Complaint",
    "Create Tenant",
    "Room Details",
  ];

  const header = ["Tenet no", "Roomno", "Name", "Age", "dob"];
  const tenantData = [
    { tno: 1, name: "Tharun", age: 20, roomno: 123456, dob: "21-May-2002" },
    { tno: 2, name: "D K suryah", age: 20, roomno: 123456, dob: "21-May-2002" },
    { tno: 3, name: "Yuvarraj", age: 20, roomno: 123456, dob: "21-May-2002" },
    { tno: 4, name: "Shivanesh", age: 20, roomno: 123456, dob: "21-May-2002" },
  ];

  const compSubj = [
    {
      complaints1:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat\
  harum soluta? Placeat odio magnam dignissimos repellendus quisquam et\
  quod officiis!",
    },
    {
      compalints2:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat,\
  harum soluta? Placeat odio magnam dignissimos repellendus quisquam et\
  quod officiis!",
    },
    {
      complaints3:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat,\
  harum soluta? Placeat odio magnam dignissimos repellendus quisquam et\
  quod officiis!",
    },
  ];

  const allotedSlots = ["A-123", "B-2131", "C-12312"];

  // const monthlyDetails = [
  //   { "Total Owners": 59 },
  //   { "Total Paid": 39 },
  //   { "Total not paid": 20 },
  //   { "Total Payment": "Rs. 20,000" },
  // ];

  const maintenanceHeader = ["Name", "Flat no", "Mobile number", "Status"];
  const maintenanceRows = {
    Name: "Tharunprasath A S",
    flatNo: 123,
    mobileNumber: 987654321,
  };

  const oTenetData = [
    {
      tno: 1,
      name: "Tharun",
      age: 20,
      adhaar: 123456,
      dob: "21-May-2002",
      status: "paid",
    },
    {
      tno: 2,
      name: "D K suryah",
      age: 20,
      adhaar: 123456,
      dob: "21-May-2002",
      status: "pending",
    },
    {
      tno: 3,
      name: "Yuvarraj",
      age: 20,
      adhaar: 123456,
      dob: "21-May-2002",
      status: "pending",
    },
    {
      tno: 4,
      name: "Shivanesh",
      age: 20,
      adhaar: 123456,
      dob: "21-May-2002",
      status: "paid",
    },
  ];

  const salaryStatusHeader = [
    "Eid",
    "Name",
    "age",
    "adhaar",
    "Month",
    "status",
  ];

  const salaryStatusRows = [
    {
      eid: 1,
      name: "Tharun",
      age: 20,
      adhaar: 123456,
      month: "January",
      status: "Received",
    },
    {
      eid: 2,
      name: "D K suryah",
      age: 20,
      adhaar: 123456,
      month: "Feburary",
      status: "Received",
    },
    {
      eid: 3,
      name: "Yuvarraj",
      age: 20,
      adhaar: 123456,
      month: "March",
      status: "Received",
    },
    {
      eid: 4,
      name: "Shivanesh",
      age: 20,
      adhaar: 123456,
      month: "April",
      status: "Pending",
    },
  ];

  return (
    <div className="App font-mons">
      <Routes>
        <Route
          path="/"
          element={
            <Auth
              userid={userid}
              setUserid={setUserid}
              whom={whom}
              setWhom={setWhom}
            />
          }
        />
        <Route
          path="/admin"
          element={
            <main>
              <Header forHam={forAdmin} />
              <section className="flex">
                <Aside forHam={forAdmin} />
                <Dashboard forBox={adminBox} />
              </section>
            </main>
          }
        />
        <Route
          path="/employee"
          element={
            <main>
              <Header forHam={forEmployee} />
              <section className="flex">
                <Aside forHam={forEmployee} />
                <Dashboard forBox={employeeBox} />
              </section>
            </main>
          }
        />
        <Route
          path="/tenant"
          element={
            <main>
              <Header forHam={forTenant} />
              <section className="flex">
                <Aside forHam={forTenant} />
                <Dashboard forBox={tenantBox} />
              </section>
            </main>
          }
        />
        <Route
          path="/owner"
          element={
            <main>
              <Header forHam={forOwner} />
              <section className="flex">
                <Aside forHam={forOwner} />
                <Dashboard forBox={ownerBox} />
              </section>
            </main>
          }
        />
        <Route
          path="/admin/ownerdetails"
          element={
            <main>
              <Header forHam={forAdmin} />
              <section className="p-5">
                <OwnerDetails />
              </section>
            </main>
          }
        />
        <Route
          path="/admin/tenantdetails"
          element={
            <main>
              <Header forHam={forAdmin} />
              <section className="p-5">
                <TenantDetails />
              </section>
            </main>
          }
        />
        <Route
          path="/admin/createowner"
          element={
            <main>
              <Header forHam={forAdmin} />
              <section className="p-5">
                <CreatingOwner />
              </section>
            </main>
          }
        />

        <Route
          path="/admin/allotingparkingslot"
          element={
            <main>
              <Header forHam={forAdmin} />
              <section className="p-5">
                <CreatingParkingSlot />
              </section>
            </main>
          }
        />
        <Route
          path="/admin/complaints"
          element={
            <main>
              <Header forHam={forAdmin} />
              <section className="p-5">
                <ComplaintsViewer />
              </section>
            </main>
          }
        />
        {/* <Route
          path="/admin/maintenancefee"Maintenance Fee
          element={
            <main>
              <Header  forHam={forAdmin} />
              <section className="p-5">
                <Maintenance
                  monthlyDetails={monthlyDetails}
                  maintenanceHeader={maintenanceHeader}
                  maintenanceRows={maintenanceRows}
                />
              </section>
            </main>
          }
        /> */}
        <Route
          path="/tenant/raisingcomplaints"
          element={
            <main>
              <Header forHam={forTenant} />
              <section className="p-5">
                <RaisingComplaints />
              </section>
            </main>
          }
        />
        <Route
          path="/tenant/allotedparkingslot"
          element={
            <main>
              <Header forHam={forTenant} />
              <section className="p-5">
                <ParkingSlot allotedSlots={allotedSlots} />
              </section>
            </main>
          }
        />
        <Route
          path="/tenant/paymaintenance"
          element={
            <main>
              <Header forHam={forTenant} />
              <section className="p-5">
                <PayMaintenance
                  maintenanceHeader={maintenanceHeader}
                  maintenanceRows={maintenanceRows}
                />
              </section>
            </main>
          }
        />
        <Route
          path="/owner/tenantdetails"
          element={
            <main>
              <Header forHam={forOwner} />
              <section className="p-5">
                <TenantDetails header={header} tenantData={tenantData} />
              </section>
            </main>
          }
        />
        <Route
          path="/owner/tenantdetails"
          element={
            <main>
              <Header forHam={forOwner} />
              <section className="p-5">
                <TenantDetails header={header} tenantData={tenantData} />
              </section>
            </main>
          }
        />
        <Route
          path="/owner/complaint"
          element={
            <main>
              <Header forHam={forOwner} />
              <section className="p-5">
                <ComplaintsViewer complaints={compSubj} />
              </section>
            </main>
          }
        />
        <Route
          path="/owner/createtenant"
          element={
            <main>
              <Header forHam={forOwner} />
              <section className="p-5">
                <CreatingTenant />
              </section>
            </main>
          }
        />
        <Route
          path="/owner/roomdetails"
          element={
            <main>
              <Header forHam={forOwner} />
              <section className="p-5">
                <RoomDetails userid={userid} />
              </section>
            </main>
          }
        />
        <Route
          path="/owner/rentdetails"
          element={
            <main>
              <Header forHam={forOwner} />
              <section className="p-5">
                <RentDetails
                  header={[...header, "status"]}
                  tenetData={oTenetData}
                />
              </section>
            </main>
          }
        />
        <Route
          path="/employee/complaints"
          element={
            <main>
              <Header forHam={forEmployee} />
              <section className="p-5">
                <ComplaintsViewer complaints={compSubj} />
              </section>
            </main>
          }
        />
        <Route
          path="/employee/salarystatus"
          element={
            <main>
              <Header forHam={forEmployee} />
              <section className="p-5">
                <SalaryStatus
                  salaryStatusHeader={salaryStatusHeader}
                  salaryStatusRows={salaryStatusRows}
                />
              </section>
            </main>
          }
        />
        <Route />
      </Routes>
    </div>
  );
}

export default App;
