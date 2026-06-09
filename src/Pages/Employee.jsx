import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    addEmployee,
    deleteEmployee,
    updateEmployee,
} from "../redux/employeeSlice";

import "./Employee.css";

function Employee() {
    const dispatch = useDispatch();

    const employees = useSelector(
        (state) => state.employee.employees
    );

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [empId, setEmpId] = useState("");
    const [currentPage, setCurrentPage] =
        useState(1);

    const itemsPerPage = 3;

    const [editId, setEditId] = useState(null);
    const [search, setSearch] = useState("");

    const handleSubmit = () => {
        if (!name || !address || !empId) {
            alert("Please fill all fields");
            return;
        }

        if (editId) {
            dispatch(
                updateEmployee({
                    id: editId,
                    name,
                    address,
                    empId,
                })
            );

            setEditId(null);
        } else {
            dispatch(
                addEmployee({
                    id: Date.now(),
                    name,
                    address,
                    empId,
                })
            );
        }

        setName("");
        setAddress("");
        setEmpId("");
    };

    const handleEdit = (emp) => {
        setName(emp.name);
        setAddress(emp.address);
        setEmpId(emp.empId);

        setEditId(emp.id);
    };

    const handleDelete = (id) => {
        dispatch(deleteEmployee(id));
    };

    const filteredEmployees =
        employees.filter(
            (emp) =>
                emp.name
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                emp.address
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                emp.empId
                    .toLowerCase()
                    .includes(search.toLowerCase())
        );
    const lastIndex =
        currentPage * itemsPerPage;

    const firstIndex =
        lastIndex - itemsPerPage;

    const currentEmployees =
        filteredEmployees.slice(
            firstIndex,
            lastIndex
        );

    const totalPages = Math.ceil(
        filteredEmployees.length / itemsPerPage
    );

    return (
        <div className="employee-container">
            <div className="employee-card">
                <h1 className="employee-title">
                    Employee Dashboard
                </h1>

                <div className="form-container">
                    <input
                        type="text"
                        placeholder="Employee ID"
                        value={empId}
                        onChange={(e) =>
                            setEmpId(e.target.value)
                        }
                    />

                    <input
                        type="text"
                        placeholder="Employee Name"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                    />

                    <input
                        type="text"
                        placeholder="Address"
                        value={address}
                        onChange={(e) =>
                            setAddress(e.target.value)
                        }
                    />


                </div>

                <button
                    className="submit-btn"
                    onClick={handleSubmit}
                >
                    {editId
                        ? "Update Employee"
                        : "Add Employee"}
                </button>
                <input
                    type="text"
                    placeholder="Search Name, Address, ID..."
                    className="search-input"
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />

                <br />
                <br />



                <hr />

                <table className="employee-table">
                    <thead>
                        <tr>
                            <th>Employee ID</th>
                            <th>Name</th>
                            <th>Address</th>

                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredEmployees.length ===
                            0 ? (
                            <tr>
                                <td colSpan="4">
                                    No Employee Found
                                </td>
                            </tr>
                        ) : (
                            currentEmployees.map(
                                (emp) => (
                                    <tr key={emp.id}>
                                        <td>{emp.empId}</td>
                                        <td>{emp.name}</td>
                                        <td>{emp.address}</td>


                                        <td>
                                            <button
                                                className="edit-btn"
                                                onClick={() =>
                                                    handleEdit(emp)
                                                }
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="delete-btn"
                                                onClick={() =>
                                                    handleDelete(
                                                        emp.id
                                                    )
                                                }
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                )
                            )
                        )}
                        <div className="pagination">

                            <button
                                disabled={currentPage === 1}
                                onClick={() =>
                                    setCurrentPage(currentPage - 1)
                                }
                            >
                                Prev
                            </button>

                            <span>
                                Page {currentPage}
                            </span>

                            <button
                                disabled={
                                    currentPage === totalPages ||
                                    totalPages === 0
                                }
                                onClick={() =>
                                    setCurrentPage(currentPage + 1)
                                }
                            >
                                Next
                            </button>

                        </div>
                    </tbody>
                </table>



            </div>
        </div>
    );
}

export default Employee;