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
import React from "react";
import Axios from "axios";
import Filters from "../charts/Filters";
import Row from "react-bootstrap/Row";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";
import Modal from "@mui/material/Modal";
import Col from "react-bootstrap/Col";
import ExportExcel from "../ExportExcel";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const AverageScrap = () => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open, setOpen] = React.useState(false);
  const [product, setProduct] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };
  const [graphState, setGraphState] = useState("Tabular");

  const handleGraphToggle = (newValue) => {
    if (graphState === "Tabular") {
      setGraphState("Graphical");
    } else if (graphState === "Graphical") {
      setGraphState("Tabular");
    }
  };
  const handleSelect = (date) => {
    let filtered = allTrackingList.filter((tracking) => {
      let trackingDate = new Date(tracking["date_tracked"]);

      return (
        trackingDate.toLocaleDateString() >=
          date.selection.startDate.toLocaleDateString() &&
        trackingDate.toLocaleDateString() <=
          date.selection.endDate.toLocaleDateString()
      );
    });
    setStartDate(date.selection.startDate);
    setEndDate(date.selection.endDate);
    setTrackingList(filtered);
  };

  const [trackingList, setTrackingList] = useState([]);
  const [allTrackingList, setAllTrackingList] = useState([]);
  const [products, setProducts] = useState([]);

  const area1 = (value) =>
    (product === "All" && value.area === 1) ||
    (value.part_num === product && value.area === 1);
  const c1 = trackingList
    .filter(area1)
    .map((x) => x.downTime)
    .reduce((a, b) => a + b, 0);

  const area2 = (value) =>
    (product === "All" && value.area === 2) ||
    (value.part_num === product && value.area === 2);
  const c2 = trackingList
    .filter(area2)
    .map((x) => x.downTime)
    .reduce((a, b) => a + b, 0);

  const area3 = (value) =>
    (product === "All" && value.area === 3) ||
    (value.part_num === product && value.area === 3);
  const c3 = trackingList
    .filter(area3)
    .map((x) => x.downTime)
    .reduce((a, b) => a + b, 0);

  const area4 = (value) =>
    (product === "All" && value.area === 4) ||
    (value.part_num === product && value.area === 4);
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
      setAllTrackingList(result.data);
      const result2 = await Axios("http://localhost:4000/product");
      setProducts(result2.data);
    };

    fetchData();
  }, []);

  var options = {
    plugins: {
      title: {
        display: true,
        text: `Minutes of Downtime from ${startDate.toDateString()} to ${endDate.toDateString()} `,
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
        label: "Downtime",
        data: [c1, c2, c3, c4, (c1 + c2 + c3 + c4) / 4],
        backgroundColor: "rgb(79,247, 138,0.5)",
      },
    ],
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "Downtime",
      headerName: "Downtime",
      width: 120,
      editable: true,
    },
    {
      field: "Code",
      headerName: "DowntimeCode",
      width: 120,
      editable: true,
    },
    {
      field: "Date",
      headerName: "Date",
      width: 110,
      editable: true,
    },
  ];

  const rows = trackingList.map((track) => ({
    id: `${track.tracking_id}`,
    Downtime: `${track.downTime}`,
    Code: `${track.dTimeCode}`,
    Date: `${track.date_tracked}`,
  }));
  return (
    <div>
      {graphState === "Graphical" ? (
        <Box sx={{ height: 230, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{}}
            hideFooter
            pageSizeOptions={[5]}
          />
        </Box>
      ) : (
        <Bar data={data} options={options} />
      )}
      <Row id="filterRow">
        <Col className="filterCols" xs={3}>
          <FormControl sx={{ m: 1, minWidth: 100 }}>
            <InputLabel id="demo-simple-select-label">Product</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              className="product"
              id="dropdown"
              value={product}
              label="Product"
              autoWidth
              defaultValue={"All"}
              onChange={(event) => {
                setProduct(event.target.value);
              }}
            >
              <MenuItem value="All">All</MenuItem>
              {products.map((product) => (
                <MenuItem value={product.code}>{product.code}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Col>

        <Col xs={2}>
          <button
            type="button"
            id="toggleBtn"
            class="btn btn-secondary"
            data-toggle="button"
            aria-pressed="false"
            autocomplete="off"
            onClick={handleOpen}
          >
            Date Range
          </button>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <DateRange
                editableDateInputs={true}
                onChange={handleSelect}
                moveRangeOnFirstSelection={false}
                ranges={[selectionRange]}
              />
            </Box>
          </Modal>
        </Col>
        <Col sm={3}>
          <button
            type="button"
            id="toggleBtn"
            class="btn btn-secondary"
            value={graphState}
            data-toggle="button"
            aria-pressed="false"
            autocomplete="off"
            onClick={handleGraphToggle}
          >
            {graphState}
          </button>
        </Col>
        <Col xs={3}>
          <ExportExcel
            excelData={[data.labels, data.datasets[0].data]}
            fileName={`Average Downtime by Cell from ${startDate.toDateString()} to ${endDate.toDateString()}`}
          />
        </Col>
      </Row>
    </div>
  );
};

export default AverageScrap;
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Bar } from "react-chartjs-2";
// import Filters from "../charts/Filters";
// import Axios from "axios";
// import { useState, useEffect } from "react";
// import Box from "@mui/material/Box";
// import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const AverageDowtime = () => {
//   const [trackingList, setTrackingList] = useState([]);
//   const downTime = trackingList.map((x) => x.downTime);
//   const [tableList, setTableList] = useState([]);
//   const area = trackingList.map((x) => x.area);
//   const shift = trackingList.map((x) => x.shift);
//   const target = trackingList.map((x) => x.target);

//   const area1 = (value) => value.area === 1;
//   const c1 = trackingList
//     .filter(area1)
//     .map((x) => x.downTime)
//     .reduce((a, b) => a + b, 0);

//   const area2 = (value) => value.area === 2;
//   const c2 = trackingList
//     .filter(area2)
//     .map((x) => x.downTime)
//     .reduce((a, b) => a + b, 0);

//   const area3 = (value) => value.area === 3;
//   const c3 = trackingList
//     .filter(area3)
//     .map((x) => x.downTime)
//     .reduce((a, b) => a + b, 0);

//   const area4 = (value) => value.area === 4;
//   const c4 = trackingList
//     .filter(area4)
//     .map((x) => x.downTime)
//     .reduce((a, b) => a + b, 0);

//   const [graphToggle, setGraphToggle] = useState("");

//   const handleToggleClick = (value) => {
//     setGraphToggle(value);
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       const result = await Axios("http://localhost:4000/tracking");
//       setTrackingList(result.data);
//     };

//     fetchData();
//   }, []);
//   var options = {
//     plugins: {
//       title: {
//         display: true,
//         text: "C-Ring Forming - Average Cumulative Production By Shift",
//       },
//     },
//     responsive: true,
//     interaction: {
//       intersect: false,
//     },
//     scales: {
//       x: {
//         stacked: true,
//       },
//       y: {
//         stacked: true,
//       },
//     },
//   };
//   var data = {
//     labels: ["C1", "C2", "C3", "C4", "Mean"],
//     datasets: [
//       {
//         label: "Minutes of Downtime",
//         data: [
//           c1,
//           c2,
//           c3,
//           c4,
//           downTime.reduce((a, b) => a + b, 0) / downTime.length,
//         ],

//         backgroundColor: "rgb(79,247, 138,0.5)",

//       },
//     ],
//   };
//   const columns: GridColDef[] = [
//     { field: "id", headerName: "ID", width: 90 },
//     {
//       field: "firstName",
//       headerName: "First name",
//       width: 150,
//       editable: true,
//     },
//     {
//       field: "lastName",
//       headerName: "Last name",
//       width: 150,
//       editable: true,
//     },
//     {
//       field: "age",
//       headerName: "Age",
//       type: "number",
//       width: 110,
//       editable: true,
//     },
//     {
//       field: "fullName",
//       headerName: "Full name",
//       description: "This column has a value getter and is not sortable.",
//       sortable: false,
//       width: 160,
//       valueGetter: (params: GridValueGetterParams) =>
//         `${params.row.firstName || ""} ${params.row.lastName || ""}`,
//     },
//   ];
//   const rows = [
//     { id: area[0], lastName: target[0], firstName: shift[0], age: downTime[0] },
//     { id: area[1], lastName: target[1], firstName: shift[1], age: downTime[1] },
//   ];
//   return (
//     <div>
//       {graphToggle === "Graphical" ? (
//         <Box sx={{ height: 230, width: "100%" }}>
//           <DataGrid
//             rows={rows}
//             columns={columns}
//             initialState={{
//               pagination: {
//                 paginationModel: {
//                   pageSize: 2,
//                 },
//               },
//             }}
//             pageSizeOptions={[5]}
//             checkboxSelection
//             disableRowSelectionOnClick
//           />
//         </Box>
//       ) : (
//         <Bar data={data} options={options} />
//       )}

//       <Filters onButtonClick={handleToggleClick} />
//     </div>
//   );
// };

// export default AverageDowtime;
