import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

let token;
const userData = localStorage.getItem("user");
if (userData) {
  const userObj = JSON.parse(userData);
  token = userObj.token;
}

// async thunk for fetching from API
export const fetchReservations = createAsyncThunk(
  "reservations/fetchReservations",
  async () => {
    const response = await fetch(
      "https://reserveatable.chickenkiller.com/api/v1/reservations",
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data.reservations;
  }
);

// async thunk for making post request
export const postReservation = createAsyncThunk(
  "reservations/postReservation",
  async (reservationsData) => {
    const response = await fetch(
      "https://reserveatable.chickenkiller.com/api/v1/reservations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reservationsData),
      }
    );
    const data = await response.json();
    return data;
  }
);

// async thunk for deleting a reservation
export const cancelReservation = createAsyncThunk(
  "reservations/cancelReservation",
  async (reservationId) => {
    await fetch(
      `https://reserveatable.chickenkiller.com/api/v1/reservations/${reservationId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return reservationId;
  }
);

const initialState = {
  reservationsData: [],
};

export const reservationsSlice = createSlice({
  name: "reservations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchReservations.fulfilled, (state, action) => {
      state.reservationsData = action.payload;
    });
    builder.addCase(postReservation.fulfilled, (state, action) => {
      state.reservationsData = [...state.reservationsData, action.payload];
    });
    builder.addCase(cancelReservation.fulfilled, (state, action) => {
      state.reservationsData = state.reservationsData.filter(
        (reservation) => reservation._id !== action.payload
      );
    });
  },
});

export const reservationsReducer = reservationsSlice.reducer;

export default reservationsSlice.reducer;
