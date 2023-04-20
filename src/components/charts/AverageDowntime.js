import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
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

const AverageDowtime = () => {
  const [trackingList, setTrackingList] = useState([]);
  const downTime = trackingList.map((x) => x.downTime);
  const [tableList, setTableList] = useState([]);
  const area = trackingList.map((x) => x.area);
  const shift = trackingList.map((x) => x.shift);
  const target = trackingList.map((x) => x.target);

  const area1 = (value) => value.area === 1;
  const c1 = trackingList
    .filter(area1)
    .map((x) => x.downTime)
    .reduce((a, b) => a + b, 0);

  const area2 = (value) => value.area === 2;
  const c2 = trackingList
    .filter(area2)
    .map((x) => x.downTime)
    .reduce((a, b) => a + b, 0);

  const area3 = (value) => value.area === 3;
  const c3 = trackingList
    .filter(area3)
    .map((x) => x.downTime)
    .reduce((a, b) => a + b, 0);

  const area4 = (value) => value.area === 4;
  const c4 = trackingList
    .filter(area4)
    .map((x) => x.downTime)
    .reduce((a, b) => a + b, 0);

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
        text: "C-Ring Forming - Average Cumulative Production By Shift",
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
        label: "Minutes of Downtime",
        data: [
          c1,
          c2,
          c3,
          c4,
          downTime.reduce((a, b) => a + b, 0) / downTime.length,
        ],
        backgroundColor: "rgb(255, 99, 132)",
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
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
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

export default AverageDowtime;
