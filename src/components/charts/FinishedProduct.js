import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Title,
  Legend,
} from "chart.js";
import Filters from "../charts/Filters";
import { Line } from "react-chartjs-2";
import Axios from "axios";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const FinishedProduct = () => {
  const [trackingList, setTrackingList] = useState([]);
  const [graphToggle, setGraphToggle] = useState("");
  const [tableList, setTableList] = useState([]);
  const area = trackingList.map((x) => x.area);
  const shift = trackingList.map((x) => x.shift);
  const target = trackingList.map((x) => x.target);
  const downTime = trackingList.map((x) => x.downTime);
  const handleToggleClick = (value) => {
    setGraphToggle(value);
  };
  const cActual = trackingList.map((x) => x.cActual);
  useEffect(() => {
    const fetchData = async () => {
      const result = await Axios("http://localhost:4000/tracking");
      setTrackingList(result.data);
    };

    fetchData();
  }, []);
  var options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Finished Products",
      },
    },
  };
  const labels = [
    "10:00AM-11:00AM",
    "11:00AM-12:00PM",
    "12:00PM-1:00PM",
    "1:00PM-2:00PM",
    "2:00PM-3:00PM",
    "3:00PM-4:00PM",
    "4:00PM-5:00PM",
  ];
  var data = {
    labels,
    datasets: [
      {
        label: "Finished Products",
        data: [cActual[0], cActual[1], cActual[2], cActual[3], cActual[4]],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
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
        <Line data={data} options={options} />
      )}

      <Filters onButtonClick={handleToggleClick} />
    </div>
  );
};

export default FinishedProduct;
