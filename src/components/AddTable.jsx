import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationPanel from './NavigationPanel';

const AddTable = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [tableSize, setTableSize] = useState('');
  const [price, setPrice] = useState('');
  const [desc, setDesc] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  let token;
  let isAdmin;
  const userData = localStorage.getItem('user');
  if (userData) {
    const userObj = JSON.parse(userData);
    token = userObj.token;
    isAdmin = userObj.isAdmin;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isAdmin) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
      return;
    }
    if (image && name && tableSize && price && desc) {
      fetch('https://reserveatable.chickenkiller.com/api/v1/tables', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          image,
          name,
          desc,
          price,
          tableSize,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `Failed to create table. Status ${response.status}`,
            );
          }
          return response.json();
        })
        .then(() => {
          navigate('/homepage');
        })
        .catch((error) => {
          throw new Error(`Failed to create table. Error ${error.message}`);
        });
    }
  };
  return (
    <>
      <div className="navigation-panel">
        <NavigationPanel />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center">Create a Table</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <form onSubmit={handleSubmit} className="">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="image"
                  placeholder="Image URL"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Table Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="tableSize"
                  placeholder="Enter table capacity"
                  value={tableSize}
                  onChange={(e) => setTableSize(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="price"
                  placeholder="Enter price of the table"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="desc"
                  placeholder="Enter Table description"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </div>

              <div className="btn-add-c">
                <button type="submit" className="session-btn btn-add-table">
                  Add Table
                </button>
              </div>
            </form>
            {showAlert && (
              <div className="alert alert-danger mt-2" role="alert">
                You are not authorized to perform this action
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTable;
