import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import Axios from "axios";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Filters from "../charts/Filters";
import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const GoodVsScrap = () => {
  const [trackingList, setTrackingList] = useState([]);
  const good = trackingList.map((x) => x.good);
  const bad = trackingList.map((x) => x.bad);
  const [tableList, setTableList] = useState([]);
  const area = trackingList.map((x) => x.area);
  const shift = trackingList.map((x) => x.shift);
  const target = trackingList.map((x) => x.target);
  const downTime = trackingList.map((x) => x.downTime);
  const [graphToggle, setGraphToggle] = useState("");

  const handleToggleClick = (value) => {
    setGraphToggle(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await Axios("http://localhost:4000/tracking");
      setTrackingList(result.data);
      setTableList(result.data);
    };

    fetchData();
  }, []);
  var options = {
    plugins: {
      title: {
        display: true,
        text: "Good and Scrap Product",
        
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };
  var data = {
    labels: ["9/1", "9/2", "9/3", "9/4", "9/5"],
    datasets: [
      {
        label: "Good",
        data: [good[0], good[1], good[2], good[3], good[4]],
        backgroundColor: "rgb(247,130,79,0.5)",
        stack: "Stack 0",
      },
      {
        label: "Scrap",
        data: [bad[0], bad[1], bad[2], bad[3], bad[4]],
        backgroundColor: "rgb(79, 138, 247,0.5)",
        stack: "Stack 1",
      },
    ],
  };
  const columns: GridColDef[] = [
    { field: "id", headerName: "Area", width: 90 },
    {
      field: "firstName",
      headerName: "Shift",
      width: 150,
      editable: true,
    },
    {
      field: "lastName",
      headerName: "Target",
      width: 150,
      editable: true,
    },
    {
      field: "age",
      headerName: "DownTime",
      type: "number",
      width: 110,
      editable: true,
    },
  ];
  const rows = [
    { id: area[0], lastName: target[0], firstName: shift[0], age: downTime[0] },
    { id: area[1], lastName: target[1], firstName: shift[1], age: downTime[1] },
  ];
  return (
    <div>
      {graphToggle === "Graphical" ? (
        <Box sx={{ height: 230, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 2,
                },
              },
            }}
            pageSizeOptions={[5]}
            // checkboxSelection
            // disableRowSelectionOnClick
          />
        </Box>
      ) : (
        <Bar data={data} options={options} />
      )}

      <Filters onButtonClick={handleToggleClick} />
    </div>
  );
};

export default GoodVsScrap;
