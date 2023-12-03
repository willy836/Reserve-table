import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaCaretLeft } from 'react-icons/fa';
import NavigationPanel from './NavigationPanel';

const TableDetails = () => {
  const { tableId } = useParams();
  const { tablesData } = useSelector((state) => state.restaurantTables);
  const table = tablesData.find((table) => table._id === tableId);
  const {
    tableSize, price, name, desc, image, _id: id,
  } = table;

  return (
    <>
      <div className="naviagtion-panel">
        <NavigationPanel />
      </div>
      <div className="container details-container">
        <div className="row">
          <div className="col-md-6">
            <img src={image} alt={name} className="img-fluid" />
          </div>
          <div className="col-md-6 d-flex flex-column justify-content-end mb-auto">
            <p className="details-title">
              <strong>{name}</strong>
            </p>
            <ul className="detail-list">
              <li>
                Table size:
                {' '}
                <span>
                  {' '}
                  {tableSize}
                </span>
              </li>
              <li>
                Price:
                {' '}
                <span>
                  {' '}
                  {price}
                </span>
              </li>
              <li>
                Table id:
                {' '}
                <span>
                  {' '}
                  {id}
                </span>
              </li>
            </ul>

            <p>{desc}</p>
            <div className="d-flex justify-content-end">
              <Link
                to={{
                  pathname: `/single-table/${table._id}/reservation-form/${table._id}`,
                }}
                className="reserve"
              >
                <button type="button" className="session-btn reserve">
                  Reserve
                </button>
              </Link>
            </div>
          </div>
        </div>
        <Link to="/homepage" className="back-link mt-4">
          <FaCaretLeft />
        </Link>
      </div>
    </>
  );
};

export default TableDetails;
