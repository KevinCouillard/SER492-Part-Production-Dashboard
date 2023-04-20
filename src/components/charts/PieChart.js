import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import Axios from "axios";
import Filters from "../charts/Filters";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  var targetSum = 0;
  const [trackingList, setTrackingList] = useState([]);
  const [tableList, setTableList] = useState([]);
  const area = trackingList.map((x) => x.area);
  const shift = trackingList.map((x) => x.shift);
  const target = trackingList.map((x) => x.target);
  const downTime = trackingList.map((x) => x.downTime);

  target.forEach((value) => {
    targetSum += value;
  });

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
    responsive: true,
  };
  var data = {
    labels: ["Finished Parts", "Reworked Parts", "Scrap"],
    datasets: [
      {
        label: "# of Parts",
        data: [12, 19, 3],
        backgroundColor: [
          "rgba(54, 235, 102, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "#36eb39",
          "rgba(255, 206, 86, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
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
        <Pie data={data} options={options} />
      )}

      <Filters onButtonClick={handleToggleClick} />
    </div>
  );
};

export default PieChart;
