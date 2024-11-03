import { FormData, initialValue } from "../types.ts/formData";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { submitForm } from "../store/formSlice";
import { useNavigate } from "react-router-dom";

import { FormErrors } from "../types.ts/formErrors";

interface ErrorObjectDefinition {
  [key: string]: string;
}

const MyForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialValue);
  const [errors, setErrors] = useState<ErrorObjectDefinition>({});

  // const [errors, setErrors] = useState<FormErrors>(initialErrors);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === "extraCode" && value && formData.zip.length < 5) {
      setErrors((prev) => ({
        ...prev,
        extraCode: "ZIP coode needs to be provided if extra code is typed",
      }));
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    let newErrors = { ...errors };

    if (name === "extraCode" && value && value.length !== 4) {
      newErrors[name] = "Extra code should be 4 digits if provided.";
      setErrors(newErrors);
      return;
    } else {
      newErrors[name] = "";
    }

    if (name === "zip") {
      if (!value) {
        newErrors.zip = "ZIP code is required.";
      } else if (value.length !== 5) {
        newErrors.zip = "Invalid ZIP code. It should be 5 digits.";
      } else {
        newErrors.zip = "";
      }
    }

    if (name === "phone" && !isValidPhoneNumber(value)) {
      newErrors.phone =
        "Invalid phone number format. Use (123) 456-7890 / 123-456-7890";
    } else if (name === "phone") {
      newErrors.phone = "";
    }

    if (name === "email" && !value.includes("@")) {
      newErrors.email = "Invalid email format.";
    } else if (name === "email") {
      newErrors.email = "";
    }

    setErrors(newErrors);
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name } = event.target;
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (isFormValid()) {
      dispatch(submitForm(formData));
      navigate("/userdetail");
    } else {
      console.log(" er in form comp", errors);
    }
  };

  const isValidPhoneNumber = (phone: string) => {
    const phoneRegex = /^(?:\(\d{3}\)\s?|\d{3}[-\s]?)(\d{3})[-\s]?(\d{4})$/;
    return phoneRegex.test(phone);
  };

  const isFormValid = () => {
    const hasErrors = Object.keys(errors).some((key) => errors[key]);
    return (
      !hasErrors &&
      formData.name.length > 0 &&
      formData.zip.length > 0 &&
      formData.phone.length > 0 &&
      formData.email.length > 0 &&
      formData.password.length > 0
    );
  };

  return (
    <div>
      <form onSubmit={onSubmit} className={"form"}>
        <h2>Sign up to CTS Hotels</h2>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
          />
          {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}
        </div>

        <div>
          <label>ZIP Code:</label>
          <input
            type="number"
            maxLength={5}
            name="zip"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.zip && <span style={{ color: "red" }}>{errors.zip}</span>}
        </div>

        <div>
          <label>Extra Code:</label>
          <input
            type="number"
            name="extraCode"
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
          />
          {errors.extraCode && (
            <span style={{ color: "red" }}>{errors.extraCode}</span>
          )}
        </div>

        <div>
          <label>Phone Number:</label>
          <input
            type="tel"
            name="phone"
            placeholder="123-456-7890"
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
          />
          {errors.phone && <span style={{ color: "red" }}>{errors.phone}</span>}
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
          />
          {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
          />
          {errors.password && (
            <span style={{ color: "red" }}>{errors.password}</span>
          )}
        </div>

        <div>
          <button
            type="submit"
            disabled={!isFormValid()}
            className={!isFormValid() ? "disabled" : ""}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default MyForm;
