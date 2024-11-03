import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/store";

const UserDetail: React.FC = () => {
  const formData = useSelector((state: RootState) => state.form.formData);
  const navigate = useNavigate();

  console.log(formData);

  return (
    <div className="display-form-data">
      <h3>Current Input Values:</h3>
      <ul>
        <li>
          <strong>Name:</strong> {formData.name}
        </li>
        <li>
          <strong>Email:</strong> {formData.email}
        </li>
        <li>
          <strong>Password:</strong> {formData.password}
        </li>
        <li>
          <strong>ZIP Code:</strong> {formData.zip}
        </li>
        {formData.extraCode && (
          <li>
            <strong>Extra Code:</strong> {formData.extraCode}
          </li>
        )}
        <li>
          <strong>Phone:</strong> {formData.phone}
        </li>
      </ul>
      <div style={{ textAlign: "center" }}>
        <button
          onClick={() => {
            navigate("/");
          }}
          className="button"
        >
          Go to new Form
        </button>
      </div>
    </div>
  );
};

export default UserDetail;
