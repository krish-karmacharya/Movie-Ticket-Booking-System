import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Box, Container, Paper, Typography, CircularProgress, Alert } from "@mui/material";
import { lookupKhaltiPayment } from "../../api-helpers/api-helpers";

const PaymentReturn = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("verifying");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const pidx = searchParams.get("pidx");
    const urlStatus = searchParams.get("status");
    const txnId = searchParams.get("transaction_id");

    if (!pidx) {
      setStatus("error");
      setMessage("Invalid payment response. No transaction ID received.");
      return;
    }

    const verifyAndRedirect = async () => {
      try {
        const result = await lookupKhaltiPayment(pidx);

        if (result.status === "Completed") {
          setStatus("success");
          setMessage("Payment successful! Redirecting to your bookings...");
          setTimeout(() => navigate("/user", { replace: true }), 2000);
        } else if (result.status === "User canceled") {
          setStatus("cancelled");
          setMessage("Payment was cancelled. Redirecting...");
          setTimeout(() => navigate("/payment", { replace: true }), 2500);
        } else if (result.status === "Expired") {
          setStatus("error");
          setMessage("Payment link expired. Please try again.");
          setTimeout(() => navigate("/payment", { replace: true }), 3000);
        } else {
          setStatus("pending");
          setMessage(
            "Payment is being processed. If you completed the payment, it will reflect shortly."
          );
          setTimeout(() => navigate("/user", { replace: true }), 3000);
        }
      } catch (err) {
        if (urlStatus === "Completed" && txnId) {
          setStatus("success");
          setMessage("Payment successful! Redirecting...");
          setTimeout(() => navigate("/user", { replace: true }), 2000);
        } else if (urlStatus === "User canceled") {
          setStatus("cancelled");
          setMessage("Payment was cancelled. Redirecting...");
          setTimeout(() => navigate("/payment", { replace: true }), 2500);
        } else {
          setStatus("error");
          setMessage(err.response?.data?.message || "Failed to verify payment. Please check your bookings.");
          setTimeout(() => navigate("/user", { replace: true }), 4000);
        }
      }
    };

    verifyAndRedirect();
  }, [searchParams, navigate]);

  const getAlertSeverity = () => {
    switch (status) {
      case "success":
        return "success";
      case "cancelled":
      case "error":
        return "error";
      case "pending":
        return "warning";
      default:
        return "info";
    }
  };

  return (
    <Box sx={{ p: 2, minHeight: "50vh", display: "flex", alignItems: "center" }}>
      <Container maxWidth="sm">
        <Paper sx={{ p: 4, textAlign: "center" }}>
          {status === "verifying" && (
            <>
              <CircularProgress sx={{ mb: 2 }} />
              <Typography variant="h6">Verifying your payment...</Typography>
            </>
          )}
          {(status === "success" || status === "cancelled" || status === "error" || status === "pending") && (
            <Alert severity={getAlertSeverity()} sx={{ mb: 2 }}>
              {message}
            </Alert>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default PaymentReturn;
