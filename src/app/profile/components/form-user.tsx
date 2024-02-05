"use client";

import axios from "axios";
import InputText from "./input-text";
import { FC, FormEvent, useState } from "react";
import { setToastState } from "@/globalRedux/features/toast/toastSlice";
import { useDispatch, useSelector } from "react-redux";

interface Parameter {
  user: any;
}

const FormUser: FC<Parameter> = ({ user }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: user.name,
    username: user.username,
    noTelp: user.noTelp,
    email: user.email,
  });
  const [errors, setErrors] = useState<any>(null);
  const [disabled, setDisabled] = useState(false);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const toast = useSelector((state: any) => state.toast);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisabled(true);
    try {
      const response = await axios.patch("/api/user", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setDisabled(false);

      if (response.status == 200) {
        dispatch(
          setToastState({
            isShown: true,
            message: response.data.message,
            type: "success",
          })
        );
      }
    } catch (error: any) {
      if (error.response.status === 403) setErrors(error.response.data);
      if (error.response.status === 409)
        setErrors([{ message: error.response.data.message }]);
      setDisabled(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {toast.isShown !== false ? (
        <div className="toast toast-top toast-end">
          <div
            className={`alert ${
              toast.type == "error" ? "alert-error" : "alert-success"
            } `}
          >
            <span>{toast.message}</span>
            <span
              className="text-lg hover:opacity-75 cursor-pointer"
              onClick={() =>
                dispatch(
                  setToastState({ isShown: false, message: "", type: "" })
                )
              }
            >
              x
            </span>
          </div>
        </div>
      ) : (
        ""
      )}
      {errors ? (
        <div className={`bg-red-200 p-5 text-red-600 space-y-2 rounded-lg`}>
          {errors.map((error: Error, i: number) => (
            <p key={i}>{error.message}</p>
          ))}
        </div>
      ) : (
        ""
      )}
      <InputText
        label="Name"
        name="name"
        onChange={handleInputChange}
        value={formData.name || ""}
      />
      <InputText
        label="No Telephone"
        name="noTelp"
        onChange={handleInputChange}
        value={formData.noTelp}
      />
      <InputText
        label="Username"
        name="username"
        onChange={handleInputChange}
        value={formData.username || ""}
      />
      <button disabled={disabled} className="btn btn-primary text-white mt-5">
        Save
      </button>
    </form>
  );
};

export default FormUser;
