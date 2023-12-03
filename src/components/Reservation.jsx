import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { cancelReservation } from "../redux/reservations/reservationsSlice";

const Reservation = ({ reservation }) => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="my-reservation single-reservation mt-3 justify-content-between">
        <div className="reservation-image">
          <img
            src={reservation.restaurantTable.image}
            alt={reservation.tableName}
            className="my-reservation-img"
          />
        </div>
        <div className="ms-3 mt-3 reserve-list">
          <ul className="reserved-items">
            <li>
              <strong>City:</strong>
              <span>{reservation.city}</span>
            </li>

            <li>
              <strong>Start Date:</strong>
              <span>{reservation.startDate}</span>
            </li>

            <li>
              <strong> End Date:</strong>
              <span>{reservation.endDate}</span>
            </li>

            <li>
              <strong>Table Name:</strong>
              <span>{reservation.tableName}</span>
            </li>
            <li>
              <strong>Table size:</strong>
              <span>{reservation.restaurantTable.tableSize}</span>
            </li>
          </ul>

          <div className="">
            <button
              type="button"
              className="btn btn-danger mt-3"
              onClick={() => dispatch(cancelReservation(reservation._id))}
            >
              Cancel reservation
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

Reservation.propTypes = {
  reservation: PropTypes.shape({
    city: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    tableName: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    restaurantTable: PropTypes.shape({
      image: PropTypes.string.isRequired,
      tableSize: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Reservation;
