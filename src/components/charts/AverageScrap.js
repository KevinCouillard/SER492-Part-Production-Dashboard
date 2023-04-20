import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import React from "react";
import { Bar } from "react-chartjs-2";
import Filters from "../charts/Filters";
import Axios from "axios";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AverageScrap = () => {
  const [trackingList, setTrackingList] = useState([]);
  const bad = trackingList.map((x) => x.bad);
  const target = trackingList.map((x) => x.target);
  const [tableList, setTableList] = useState([]);
  const area = trackingList.map((x) => x.area);
  const shift = trackingList.map((x) => x.shift);

  const downTime = trackingList.map((x) => x.downTime);
  const [graphToggle, setGraphToggle] = useState("");

  const handleToggleClick = (value) => {
    setGraphToggle(value);
  };
  useEffect(() => {
    const fetchData = async () => {
      const result = await Axios("http://localhost:4000/tracking");
      setTrackingList(result.data);
    };

    fetchData();
  }, []);

  var options = {
    plugins: {
      title: {
        display: true,
        text: "C-Ring Forming - Average Downtime By Shift",
      },
    },
    responsive: true,
    interaction: {
      intersect: false,
    },
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
    labels: ["C1", "C2", "C3", "C4", "Mean"],
    datasets: [
      {
        label: "Percent of scrap",
        data: [
          bad[0] / target[0],
          bad[1] / target[1],
          bad[2] / target[2],
          bad[3] / target[3],
          bad[4] / target[4],
        ],
        backgroundColor: "rgb(247, 79, 79,0.5)",
      },
    ],
  };
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "firstName",
      headerName: "First name",
      width: 150,
      editable: true,
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 150,
      editable: true,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 110,
      editable: true,
    },
  ];
  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
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
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
      ) : (
        <Bar data={data} options={options} />
      )}

      <Filters onButtonClick={handleToggleClick} />
    </div>
  );
};

export default AverageScrap;
