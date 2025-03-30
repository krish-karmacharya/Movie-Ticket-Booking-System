import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendAdminAuthRequest } from "../../api-helpers/api-helpers";
import { adminActions } from "../../store";
import AuthForm from "./AuthForm";
import { Box, Button, Typography } from "@mui/material";

const Admin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onResReceived = (data) => {
    console.log(data);
    dispatch(adminActions.login());
    localStorage.setItem("adminId", data.id);
    localStorage.setItem("token", data.token);
    navigate("/");
  };
  const getData = (data) => {
    console.log("Admin", data);
    sendAdminAuthRequest(data.inputs)
      .then(onResReceived)
      .catch((err) => console.log(err));
  };
  return (
    <Box sx={{ p: 3 }}>
      <AuthForm onSubmit={getData} isAdmin={true} />
      <Box sx={{ mt: 2, textAlign: "center" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/admin/bookings")}
        >
          View All Bookings
        </Button>
      </Box>
    </Box>
  );
};

export default Admin;
