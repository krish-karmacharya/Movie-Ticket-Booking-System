const KHALTI_SANDBOX_URL = "https://dev.khalti.com/api/v2";
const KHALTI_PRODUCTION_URL = "https://khalti.com/api/v2";

export const initiateKhaltiPayment = async (req, res) => {
  const { amount, purchase_order_id, purchase_order_name, return_url, website_url, customer_info } = req.body;
  const secretKey = process.env.KHALTI_SECRET_KEY;

  if (!secretKey) {
    return res.status(500).json({
      message: "Khalti is not configured. Please add KHALTI_SECRET_KEY to .env",
    });
  }

  if (!amount || !purchase_order_id || !purchase_order_name || !return_url || !website_url) {
    return res.status(400).json({
      message: "Missing required fields: amount, purchase_order_id, purchase_order_name, return_url, website_url",
    });
  }

  const amountInPaisa = Math.round(Number(amount) * 100);
  if (amountInPaisa < 1000) {
    return res.status(400).json({
      message: "Amount must be at least Rs. 10",
    });
  }

  const baseUrl = process.env.NODE_ENV === "production" ? KHALTI_PRODUCTION_URL : KHALTI_SANDBOX_URL;

  const payload = {
    return_url,
    website_url,
    amount: amountInPaisa,
    purchase_order_id: String(purchase_order_id),
    purchase_order_name: String(purchase_order_name).slice(0, 127),
    ...(customer_info && { customer_info }),
  };

  try {
    const response = await fetch(`${baseUrl}/epayment/initiate/`, {
      method: "POST",
      headers: {
        Authorization: `Key ${secretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        message: data.detail || data.return_url?.[0] || "Khalti payment initiation failed",
        error: data,
      });
    }

    return res.status(200).json({
      payment_url: data.payment_url,
      pidx: data.pidx,
      expires_in: data.expires_in,
    });
  } catch (err) {
    console.error("Khalti initiate error:", err);
    return res.status(500).json({
      message: "Failed to initiate Khalti payment",
      error: err.message,
    });
  }
};

export const lookupKhaltiPayment = async (req, res) => {
  const { pidx } = req.body;
  const secretKey = process.env.KHALTI_SECRET_KEY;

  if (!secretKey) {
    return res.status(500).json({
      message: "Khalti is not configured",
    });
  }

  if (!pidx) {
    return res.status(400).json({ message: "pidx is required" });
  }

  const baseUrl = process.env.NODE_ENV === "production" ? KHALTI_PRODUCTION_URL : KHALTI_SANDBOX_URL;

  try {
    const response = await fetch(`${baseUrl}/epayment/lookup/`, {
      method: "POST",
      headers: {
        Authorization: `Key ${secretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pidx }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        message: data.detail || "Payment lookup failed",
        error: data,
      });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error("Khalti lookup error:", err);
    return res.status(500).json({
      message: "Failed to verify Khalti payment",
      error: err.message,
    });
  }
};
