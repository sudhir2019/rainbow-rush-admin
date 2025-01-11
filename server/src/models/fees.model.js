const mongoose = require("mongoose");
const { encrypt, decrypt } = require("../utils/encryptionAndDecryption");

const defaultFees = [
  {
    name: "gst",
    percentage: encrypt("18"),
    flatAmount: encrypt("0"),
    applicableTo: "all",
    description: "Goods and Services Tax applied to all transactions.",
    priority: 1,
    active: true,
  },
  {
    name: "service_fee",
    percentage: encrypt("5"),
    flatAmount: encrypt("0"),
    applicableTo: "prediction",
    description: "Service fee for predictions.",
    priority: 2,
    active: true,
  },
  {
    name: "transaction_fee",
    percentage: encrypt("0"),
    flatAmount: encrypt("50"),
    applicableTo: "withdrawal",
    description: "Flat transaction fee for withdrawals.",
    priority: 3,
    active: true,
  },
  {
    name: "penalty",
    percentage: encrypt("0"),
    flatAmount: encrypt("100"),
    applicableTo: "all",
    description: "Penalty for violating terms.",
    priority: 4,
    active: true,
  },
  {
    name: "bonus",
    percentage: encrypt("0"),
    flatAmount: encrypt("10"),
    applicableTo: "deposit",
    description: "Bonus fee on deposits.",
    priority: 5,
    active: true,
  },
];

const feeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      enum: [
        "gst",
        "bonus",
        "service_fee",
        "transaction_fee",
        "penalty",
        "other",
      ],
    },
    percentage: {
      type: String, // Encrypted as a string
      required: true,
      default: encrypt("0"),
    },
    flatAmount: {
      type: String, // Encrypted as a string
      default: encrypt("0"),
    },
    applicableTo: {
      type: String,
      enum: ["deposit", "withdrawal", "prediction", "transfer", "all"],
      required: true,
    },
    minAmount: {
      type: String, // Encrypted as a string
      default: encrypt("0"),
    },
    maxAmount: {
      type: String, // Encrypted as a string
      default: encrypt("0"),
    },
    roleSpecific: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      default: "",
    },
    startDate: {
      type: Date,
      default: null,
    },
    endDate: {
      type: Date,
      default: null,
    },
    priority: {
      type: Number,
      default: 1,
    },
    active: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    lastModifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  { timestamps: true, versionKey: false }
);

// Middleware to decrypt amounts and percentage on retrieval
feeSchema.post("find", (docs) => {
  docs.forEach((doc) => {
    doc.flatAmount = decrypt(doc.flatAmount);
    doc.minAmount = decrypt(doc.minAmount);
    doc.maxAmount = decrypt(doc.maxAmount);
    doc.percentage = decrypt(doc.percentage);
  });
});

feeSchema.post("findOne", (doc) => {
  if (doc) {
    doc.flatAmount = decrypt(doc.flatAmount);
    doc.minAmount = decrypt(doc.minAmount);
    doc.maxAmount = decrypt(doc.maxAmount);
    doc.percentage = decrypt(doc.percentage);
  }
});

feeSchema.post("findById", (doc) => {
  if (doc) {
    doc.flatAmount = decrypt(doc.flatAmount);
    doc.minAmount = decrypt(doc.minAmount);
    doc.maxAmount = decrypt(doc.maxAmount);
    doc.percentage = decrypt(doc.percentage);
  }
});

// Middleware to encrypt amounts and percentage before saving
feeSchema.pre("save", function (next) {
  this.flatAmount = encrypt(this.flatAmount.toString());
  this.minAmount = encrypt(this.minAmount.toString());
  this.maxAmount = encrypt(this.maxAmount.toString());
  this.percentage = encrypt(this.percentage.toString());
  next();
});

// Middleware to encrypt amounts and percentage on update
feeSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();

  if (update.flatAmount) {
    update.flatAmount = encrypt(update.flatAmount.toString());
  }
  if (update.minAmount) {
    update.minAmount = encrypt(update.minAmount.toString());
  }
  if (update.maxAmount) {
    update.maxAmount = encrypt(update.maxAmount.toString());
  }
  if (update.percentage) {
    update.percentage = encrypt(update.percentage.toString());
  }

  this.setUpdate(update);
  next();
});

const Fee = mongoose.model("Fee", feeSchema);

module.exports = { Fee, defaultFees };
