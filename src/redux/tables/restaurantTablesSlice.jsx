import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

let token;
const userData = localStorage.getItem("user");
if (userData) {
  const userObj = JSON.parse(userData);
  token = userObj.token;
}

export const fetchRestaurantTablesData = createAsyncThunk(
  "restaurantTables/fetchRestaurantTablesData",
  async () => {
    const response = await fetch(
      "https://reserveatable.chickenkiller.com/api/v1/tables",
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data.restaurantTables;
  }
);

export const deleteRestaurantTable = createAsyncThunk(
  "restaurantTables/deleteRestaurantTable",
  async (id) => {
    const response = await fetch(
      `https://reserveatable.chickenkiller.com/api/v1/tables/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data;
  }
);

const initialState = {
  loading: false,
  tablesData: [],
  error: "",
};

export const restaurantTablesSlice = createSlice({
  name: "restaurantTables",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRestaurantTablesData.pending, (state) => {
      const newState = { ...state, loading: true };
      return newState;
    });
    builder.addCase(fetchRestaurantTablesData.fulfilled, (state, action) => {
      const newState = {
        ...state,
        loading: false,
        tablesData: action.payload,
      };
      return newState;
    });
    builder.addCase(fetchRestaurantTablesData.rejected, (state) => {
      const newState = { ...state, loading: false, error: "404 Not Found" };
      return newState;
    });
    builder.addCase(deleteRestaurantTable.fulfilled, (state, action) => {
      const newState = {
        ...state,
        loading: false,
        tablesData: state.tablesData.filter(
          (table) => table.id !== action.payload.id
        ),
      };
      return newState;
    });
  },
});

export const restaurantTablesReducer = restaurantTablesSlice.reducer;

export default restaurantTablesSlice.reducer;
