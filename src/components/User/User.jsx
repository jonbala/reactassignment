import React, { useState } from "react";
import './User.css';

export const User = ({ name, email, id, street, company, onDelete }) => {


  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <div className="userContainer">
        <div className="user">
          <span className="user-name">{name}</span>
          <span className="user-email">{email}</span>
          <div className="delete-button">
            <button onClick={handleDelete}>Delete</button>
          </div>
        </div>
    </div>
  );
};
