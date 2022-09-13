import { createSlice } from "@reduxjs/toolkit";

export const expenseSlice = createSlice({
  name: "expenseIncome",
  initialState: {
    userExpense: [],
    totalExpense: 0,
    totalIncome: 0,
  },
  reducers: {
    addEx: (state, action) => {
      state.userExpense;
    },
    addIn: (state, action) => {
      state.userExpense;
    },
    getExIn: (state) => {
      state.userExpense;
    },
    saveExIn: (state, action) => {
      state.userExpense = action.payload;
    },
    totEx: (state, action) => {
      state.totalExpense = action.payload;
    },
    totIn: (state, action) => {
      state.totalIncome = action.payload;
    },
  },
});

export const { addEx, addIn, getExIn, saveExIn, totEx, totIn } =
  expenseSlice.actions;

//selectors
export const selectExpense = (state: any) => state.expenseReducer.userExpense;
export const selectTotalExpense = (state: any) =>
  state.expenseReducer.totalExpense;
export const selectTotalIncome = (state: any) =>
  state.expenseReducer.totalIncome;

//reducers
const expenseReducer = expenseSlice.reducer;
export default expenseReducer;
