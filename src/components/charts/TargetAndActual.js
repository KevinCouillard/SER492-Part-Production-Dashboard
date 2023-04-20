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
import Axios from "axios";
import Filters from "../charts/Filters";
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
const TargetAndActual = () => {
  const [trackingList, setTrackingList] = useState([]);
  const [tableList, setTableList] = useState([]);
  const area = trackingList.map((x) => x.area);
  const shift = trackingList.map((x) => x.shift);
  const target = trackingList.map((x) => x.target);
  const downTime = trackingList.map((x) => x.downTime);
  const cTarget = trackingList.map((x) => x.cTarget);
  const cActual = trackingList.map((x) => x.cActual);
  const area1 = (value) => value.area === 1;
  const c1 = trackingList
    .filter(area1)
    .map((x) => x.cTarget)
    .reduce((a, b) => a + b, 0);
  const c1Actual = trackingList
    .filter(area1)
    .map((x) => x.cActual)
    .reduce((a, b) => a + b, 0);

  const area2 = (value) => value.area === 2;
  const c2 = trackingList
    .filter(area2)
    .map((x) => x.cTarget)
    .reduce((a, b) => a + b, 0);
  const c2Actual = trackingList
    .filter(area2)
    .map((x) => x.cActual)
    .reduce((a, b) => a + b, 0);
  const area3 = (value) => value.area === 3;
  const c3 = trackingList
    .filter(area3)
    .map((x) => x.cTarget)
    .reduce((a, b) => a + b, 0);
  const c3Actual = trackingList
    .filter(area3)
    .map((x) => x.cActual)
    .reduce((a, b) => a + b, 0);

  const area4 = (value) => value.area === 4;
  const c4 = trackingList
    .filter(area4)
    .map((x) => x.cTarget)
    .reduce((a, b) => a + b, 0);
  const c4Actual = trackingList
    .filter(area4)
    .map((x) => x.cActual)
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
        text: "C-Ring Forming - Average Scrap Rate By Shift",
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
        label: "Target",
        data: [
          c1,
          c2,
          c3,
          c4,
          cTarget.reduce((a, b) => a + b, 0) / cTarget.length,
        ],
        backgroundColor: "rgb(247,208,79,0.5)",
      },
      {
        label: "Actual",
        data: [
          c1Actual,
          c2Actual,
          c3Actual,
          c4Actual,
          cActual.reduce((a, b) => a + b, 0) / cTarget.length,
        ],
        backgroundColor: "rgb(158, 79, 247,0.5)",
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

export default TargetAndActual;
