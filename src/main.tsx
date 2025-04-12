import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Table } from "./components/Table";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Table
      data={[]}
      columns={[]}
      storageKey=""
      renderController={() => <></>}
      renderContent={() => <></>}
    />
  </React.StrictMode>
);
