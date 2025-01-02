import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import { DataGrid } from "@mui/x-data-grid";
import AddEmployeeViewDisplay from "../Modals/AddEmployeeViewDisplay";
import UpdateEmployeeViewDisplay from "../Modals/UpdateEmployeeViewDisplay";
import EmployeeService from "../../services/EmployeeService";

export default function AddEmployee() {
  const [addClickInfo, setAddClickInfo] = React.useState(false);
  const [selectedEmployee, setSelectedEmployee] = React.useState("");
  const [updateClickInfo, setUpdateClickInfo] = React.useState(false);
  const [employees, setEmployees] = React.useState([]);
  const [requeryEmployees, setRequeryEmployees] = React.useState(0);
  const columns = [
    { field: "first_name", headerName: "First Name", width: 140 },
    { field: "last_name", headerName: "Last Name", width: 140 },
    { field: "username", headerName: "Username", width: 140 },
    { field: "email", headerName: "E-Mail", width: 195 },
    { field: "rights", headerName: "Access Rights", width: 140 },
    { field: "createdAt", headerName: "Creation Date", width: 140 },
  ];

  useEffect(() => {
    EmployeeService.get_company_employees().then((employees) => {
      employees.forEach((employee, idx) => (employee.id = idx + 1));
      employees.map(
        (employee) =>
          (employee = employee.createdAt
            ? (employee.createdAt = new Date(employee.createdAt).toDateString())
            : (employee.createdAt = ""))
      );
      setEmployees(employees);
    });
    console.log("Employees are", employees);
  }, [requeryEmployees]);

  return (
    <main className="">
      <div className="flex items-center justify-center px-8 py-8">
        <div className="flex">
          <span className="w-full">
            <Stack direction="center" spacing={5}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  setAddClickInfo(true);
                }}
              >
                Add a New Employee
              </Button>
            </Stack>
          </span>

          {addClickInfo && (
            <AddEmployeeViewDisplay handleClose={setAddClickInfo} />
          )}
        </div>
      </div>

      <div className="flex items-center justify-center px-8 py-8">
        <Typography variant="h6" gutterBottom component="div">
          To edit an employee's information click on that employee's cell on the
          below employee table.
        </Typography>
      </div>

      <div className="mb-10 flex items-center justify-center px-8 py-6">
        <div style={{ height: 400, width: "66%" }}>
          <DataGrid
            rows={employees}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            /* checkboxSelection   can be added if needed?*/
            onCellClick={(e) => {
              setUpdateClickInfo(true);
              setSelectedEmployee(e.row);
            }}
          />
          {updateClickInfo && (
            <UpdateEmployeeViewDisplay
              handleClose={setUpdateClickInfo}
              employeeData={selectedEmployee}
              setRequeryEmployees={setRequeryEmployees}
              requeryEmployees={requeryEmployees}
            />
          )}
        </div>
      </div>
    </main>
  );
}
