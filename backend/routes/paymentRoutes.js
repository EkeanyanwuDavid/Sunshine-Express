const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/verify/:reference", async (req, res) => {
  try {
    const { reference } = req.params;

    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      },
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Verification failed",
    });
  }
});

router.post("/initialize", async (req, res) => {
  try {
    const { email, amount } = req.body;
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount,
        currency: "NGN",
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Initialization failed",
    });
  }
});

module.exports = router;
