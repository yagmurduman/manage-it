import React from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import styled from "@emotion/styled";
import { useState, useEffect, useRef } from "react";
import EmployeeService from "../../services/EmployeeService";
import { useSelector } from "react-redux";
import ProjectService from "../../services/ProjectService";

const StyledNode = styled.div`
  padding: 5px;
  border-radius: 16px;
  display: inline-block;
  border: 1px solid;
  border-color: #8884d8;
`;

export default function OrganizationalChart() {
  // filter administrator on employee subtree
  const project = useSelector((state) => state.project);
  const [employees, setEmployees] = useState([]);
  const [pms, setPMs] = useState([]);
  const [admin, setAdmin] = useState({});
  useEffect(() => {
    ProjectService.read_a_project(project.selected_project).then(
      (project_info) => {
        setEmployees(project_info.assigned_employees);
        setPMs(
          project_info.project_managers
            .map((pm) => `${pm.first_name} ${pm.last_name}`)
            .join(", ")
        );
        setAdmin(
          project_info.assigned_employees.filter(
            (employee) => employee.rights === "Administrator"
          )[0]
        );
      }
    );
  }, [project.selected_project]);
  console.log("admin", admin);
  return (
    <Tree
      lineWidth={"1px"}
      lineColor={"purple"}
      lineBorderRadius={"10px"}
      label={
        <StyledNode>
          {admin
            ? `${admin.first_name} ${admin.last_name} (Administrator)`
            : "No administrator found"}
        </StyledNode>
      }
    >
      {pms ? (
        <>
          <TreeNode
            label={<StyledNode>{`${pms} (Project Manager)`}</StyledNode>}
          >
            {employees
              ? employees.map((employee) => (
                  <TreeNode
                    label={
                      <StyledNode>{`${employee.first_name} ${employee.last_name} (Employee)`}</StyledNode>
                    }
                  ></TreeNode>
                ))
              : ""}
          </TreeNode>
        </>
      ) : (
        ""
      )}
    </Tree>
  );
}
