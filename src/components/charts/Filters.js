import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { useState, useEffect } from "react";
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import ExportExcel from "../ExportExcel";

const Filters = (props) => {
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
  const [product, setProduct] = useState("");
  const [graphState, setGraphState] = useState("Tabular");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleGraphToggle = (newValue) => {
    if (graphState === "Tabular") {
      setGraphState("Graphical");
      props.onButtonClick("Graphical");
    } else if (graphState === "Graphical") {
      setGraphState("Tabular");
      props.onButtonClick("Tabular");
    }
  };

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  return (
    <div>
      <Container fluid>
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
                placeholder="Product 1"
                onChange={(event) => {
                  setProduct(event.target.value);
                }}
              >
                <MenuItem value="Product 1">Product 1</MenuItem>
                <MenuItem value="Product 2">Product 2</MenuItem>
                <MenuItem value="Product 3">Product 3</MenuItem>
              </Select>
            </FormControl>
          </Col>
          <Col xs={2}>
            {/* <Button onClick={handleOpen}>Date Range </Button> */}
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
                  onChange={(item) => setDate([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={date}
                />
              </Box>
            </Modal>
          </Col>
          <Col xs={3}>
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
              excelData={[{ "Frist Name": "bob" }]}
              fileName={"Bruh"}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Filters;
