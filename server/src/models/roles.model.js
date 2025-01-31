const mongoose = require("mongoose");
const Schema = mongoose.Schema;

  const ROLES = ["superdistributer", "distributer", "retailer", "superadmin","admin", "user"];

  const roleSchema = new Schema(
  {
    name: { type: String, unique: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Role = mongoose.model("Role", roleSchema);

module.exports = {
  Role,
  ROLES,
};
