import React, { Fragment } from "react";
import DashboardTable from "./DashboardTable";
import Direct from "../routing/Redirect";
const Dashboard = () => {
  return (
    <div className="p-0 m-0 ">
      {<Direct />}
      <DashboardTable />
    </div>
  );
};

export default Dashboard;
