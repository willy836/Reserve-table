import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Reservation from "./Reservation";
import NavigationPanel from "./NavigationPanel";
import { fetchReservations } from "../redux/reservations/reservationsSlice";

const MyReservations = () => {
  const dispatch = useDispatch();
  const shouldFetchData = useRef(true);
  useEffect(() => {
    if (shouldFetchData.current) {
      shouldFetchData.current = false;
      dispatch(fetchReservations());
    }
    // eslint-disable-next-line
  }, []);

  const { reservationsData } = useSelector((state) => state.reservations);

  if (!reservationsData) {
    return (
      <>
        <div className="navigation-panel">
          <NavigationPanel />
        </div>
        <div className="container d-flex flex-column my-reserve align-items-center justify-content-center">
          <div>
            <h1>My Reservations</h1>
            <p>Loading...</p>
          </div>
        </div>
      </>
    );
  }

  if (reservationsData.length === 0) {
    return (
      <>
        <div className="navigation-panel">
          <NavigationPanel />
        </div>
        <div className="container d-flex flex-column my-reserve align-items-center justify-content-center">
          <div>
            <h1>My Reservations</h1>
            <p>You have no reservations</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="navigation-panel">
        <NavigationPanel />
      </div>
      <div className="container reservations-container d-flex flex-column my-reserve align-items-center justify-content-center">
        <div>
          <h1>My Reservations</h1>
        </div>
        <div className="reservations mb-2 w-100 overflow-auto">
          {reservationsData.map((reservation) => (
            <Reservation key={reservation._id} reservation={reservation} />
          ))}
        </div>
      </div>
    </>
  );
};

export default MyReservations;
