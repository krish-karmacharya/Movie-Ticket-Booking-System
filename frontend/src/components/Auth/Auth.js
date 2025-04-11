import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendUserAuthRequest } from "../../api-helpers/api-helpers";
import { userActions } from "../../store";
import AuthForm from "./AuthForm";
import { Snackbar, Alert } from "@mui/material";

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onResReceived = (data) => {
    dispatch(userActions.login());
    localStorage.setItem("userId", data.id);
    setLoading(false);
    navigate("/");
  };

  const handleClose = () => {
    setOpen(false);
    setError("");
  };

  const getData = async (data) => {
    try {
      setLoading(true);
      const response = await sendUserAuthRequest(data.inputs, data.signup);
      onResReceived(response);
    } catch (err) {
      setLoading(false);
      setError(
        err.response?.data?.message || "Failed to sign up. Please try again."
      );
      setOpen(true);
    }
  };

  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={false} loading={loading} />
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Auth;
