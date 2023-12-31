import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendar } from 'react-icons/fa';
import { postReservation } from '../redux/reservations/reservationsSlice';
import NavigationPanel from './NavigationPanel';

const ReservationForm = () => {
  const navigate = useNavigate();
  const { tableId } = useParams();
  const { tablesData } = useSelector((state) => state.restaurantTables);
  const [table, setTable] = useState(null);

  const dispatch = useDispatch();

  const [tableName, setTableName] = useState('');
  const [city, setCity] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    if (tableId) {
      const storedTable = JSON.parse(localStorage.getItem(`table-${tableId}`));

      if (storedTable) {
        setTable(storedTable);
      } else {
        const newTable = tablesData.find((table) => table._id === tableId);

        setTable(newTable);
        localStorage.setItem(`table-${tableId}`, JSON.stringify(newTable));
      }
    }
  }, [tableId, tablesData]);

  const user = JSON.parse(localStorage.getItem('user'));
  const userName = user.name;

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedTable = tablesData.find((table) => table.name === tableName);

    const newReservation = {
      userName,
      tableName: table ? table.name : selectedTable.name,
      city,
      startDate,
      endDate,
      restaurantTable: table ? table._id : selectedTable._id,
    };

    dispatch(postReservation(newReservation));

    const redirectTableId = table ? table._id : selectedTable._id;
    navigate(
      `/reserved-table/${redirectTableId}/${encodeURIComponent(
        city,
      )}/${encodeURIComponent(startDate)}/${encodeURIComponent(endDate)}`,
      { replace: true },
    );

    setCity('');
    setStartDate('');
    setEndDate('');
  };

  if (!table) {
    return (
      <>
        <div className="navigation-panel">
          <NavigationPanel />
        </div>
        <form onSubmit={handleSubmit} className="reservation-form">
          <div className="form-input">
            <label htmlFor="user">Username : </label>
            <input
              type="text"
              id="user"
              name="userName"
              defaultValue={
                userName.charAt(0).toUpperCase() + userName.slice(1)
              }
              readOnly
            />
          </div>
          <div className="form-input">
            <label htmlFor="table-name">Table Name : </label>
            <select
              type="text"
              id="table-name"
              name="tableName"
              value={tableName}
              onChange={(e) => setTableName(e.target.value)}
              required
            >
              <option value="">Select a table</option>
              {tablesData.map((table) => (
                <option key={table._id} value={table.name}>
                  {table.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-input">
            <label htmlFor="city">City : </label>
            <input
              type="text"
              id="city"
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
          <div className="form-input date-picker-wrapper">
            <label htmlFor="start-date">Start Date : </label>
            <ReactDatePicker
              className="date-picker"
              id="start-date"
              name="startDate"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              required
            />
            <FaCalendar
              className="calendar-icon"
              onClick={() => document.getElementById('start-date').focus()}
            />
          </div>
          <div className="form-input date-picker-wrapper">
            <label htmlFor="end-date">End Date : </label>
            <ReactDatePicker
              className="date-picker"
              id="end-date"
              name="endDate"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              required
            />
            <FaCalendar
              className="calendar-icon"
              onClick={() => document.getElementById('end-date').focus()}
            />
          </div>
          <button type="submit" className="reservation-btn">
            Make Reservation
          </button>
        </form>
      </>
    );
  }
  return (
    <form onSubmit={handleSubmit} className="reservation-form">
      <div className="form-input">
        <label htmlFor="user">Username : </label>
        <input
          type="text"
          id="user"
          name="userName"
          defaultValue={userName.charAt(0).toUpperCase() + userName.slice(1)}
          readOnly
        />
      </div>
      <div className="form-input">
        <label htmlFor="table-name">Table Name : </label>
        <input
          type="text"
          id="table-name"
          name="tableName"
          defaultValue={table.name}
          readOnly
        />
      </div>
      <div className="form-input">
        <label htmlFor="city">City : </label>
        <input
          type="text"
          id="city"
          name="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </div>
      <div className="form-input date-picker-wrapper">
        <label htmlFor="start-date">Start Date : </label>
        <ReactDatePicker
          className="date-picker"
          id="start-date"
          name="startDate"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          required
        />
        <FaCalendar
          className="calendar-icon"
          onClick={() => document.getElementById('start-date').focus()}
        />
      </div>
      <div className="form-input date-picker-wrapper">
        <label htmlFor="end-date">End Date : </label>
        <ReactDatePicker
          className="date-picker"
          id="end-date"
          name="endDate"
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          required
        />
        <FaCalendar
          className="calendar-icon"
          onClick={() => document.getElementById('end-date').focus()}
        />
      </div>
      <button type="submit" className="reservation-btn">
        Make Reservation
      </button>
    </form>
  );
};

export default ReservationForm;
