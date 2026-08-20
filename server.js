const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({
    status: "online",
    service: "ChatPesa"
  });
});

app.post("/api/stk-push", async (req, res) => {
  try {
    const { phone, amount, reference, description } = req.body;

    if (!phone || !amount) {
      return res.status(400).json({
        success: false,
        message: "Phone number and amount are required"
      });
    }

    const response = await fetch(
      "https://api.paylorke.com/api/v1/global/collections",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.PAYLOR_API_KEY}`
        },
        body: JSON.stringify({
          phone,
          amount,
          reference: reference || `CHATPESA-${Date.now()}`,
          channelId: process.env.PAYLOR_CHANNEL_ID,
          description: description || "ChatPesa payment",
          callbackUrl: process.env.PAYLOR_CALLBACK_URL
        })
      }
    );

    const data = await response.json();

    return res.status(response.status).json(data);

  } catch (error) {
    console.error("Paylor error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to initiate payment"
    });
  }
});

app.listen(PORT, () => {
  console.log(`ChatPesa server running on port ${PORT}`);
});
