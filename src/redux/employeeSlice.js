import { createSlice } from "@reduxjs/toolkit";

const employeeSlice = createSlice({
  name: "employee",

  initialState: {
    employees: [],
  },

  reducers: {
    addEmployee: (state, action) => {
      state.employees.push(action.payload);
    },

    deleteEmployee: (state, action) => {
      state.employees = state.employees.filter(
        (emp) => emp.id !== action.payload
      );
    },

    updateEmployee: (state, action) => {
      const index = state.employees.findIndex(
        (emp) => emp.id === action.payload.id
      );

      if (index !== -1) {
        state.employees[index] = action.payload;
      }
    },
  },
});

export const {
  addEmployee,
  deleteEmployee,
  updateEmployee,
} = employeeSlice.actions;

export default employeeSlice.reducer;