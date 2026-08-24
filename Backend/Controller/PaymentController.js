const Payment = require("../Model/PaymentScheme");

// CREATE PAYMENT
const create = async (req, res) => {
  try {
    const payment = await Payment.create({
      project: req.body.project,
      client: req.body.client,
      freelancer: req.body.freelancer,
      amount: req.body.amount,
      currency: req.body.currency,
      paymentMethod: req.body.paymentMethod,
      transactionId: req.body.transactionId,
      status: req.body.status || "pending",
      note: req.body.note,
    });

    res.status(201).json({
      message: "Payment created successfully",
      payment,
    });
  } catch (error) {
    console.log("CREATE PAYMENT ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL PAYMENTS
const read = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("project")
      .populate("client", "name email")
      .populate("freelancer", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Payments fetched successfully",
      payments,
    });
  } catch (error) {
    console.log("GET PAYMENTS ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// GET SINGLE PAYMENT
const getsingle = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate("project")
      .populate("client", "name email")
      .populate("freelancer", "name email");

    if (!payment) {
      return res.status(404).json({
        message: "Payment not found",
      });
    }

    res.status(200).json({
      message: "Payment fetched successfully",
      payment,
    });
  } catch (error) {
    console.log("GET SINGLE PAYMENT ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE PAYMENT
const update = async (req, res) => {
  try {
    const updateData = {
      ...req.body,
    };

    // Haddii payment la xaqiijiyo
    if (req.body.status === "paid") {
      updateData.paidAt = new Date();
    }

    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!payment) {
      return res.status(404).json({
        message: "Payment not found",
      });
    }

    res.status(200).json({
      message: "Payment updated successfully",
      payment,
    });
  } catch (error) {
    console.log("UPDATE PAYMENT ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE PAYMENT
const deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.id);

    if (!payment) {
      return res.status(404).json({
        message: "Payment not found",
      });
    }

    res.status(200).json({
      message: "Payment deleted successfully",
      payment,
    });
  } catch (error) {
    console.log("DELETE PAYMENT ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  create,
  read,
  getsingle,
  update,
  deletePayment,
};