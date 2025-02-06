const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// Define the Game schema
const companieSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    uniqueId: {
      type: String,
      unique: true,
    },
    note: {
      type: String,
      default: "Initial State",
    },
    games: [
      {
        type: Schema.Types.ObjectId,
        ref: "Game",
      },
    ],
    superAdmin: [
      {
        type: Schema.Types.ObjectId,
        ref: "SuperAdmin",
      },
    ],
    admin: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    superdistributer: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    distributer: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    retailer: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    user: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
    versionKey: false, // Disable versioning (__v field)
  }
);

// Pre-save middleware to generate uniqueId
companieSchema.pre("save", async function (next) {
  try {
    if (!this.uniqueId) {
      const generateUniqueId = (name) => {
        // Take first 3 letters of name, convert to uppercase
        const namePrefix = name.substring(0, 3).toUpperCase();
        // Generate random string
        const randomString = Math.random()
          .toString(36)
          .substring(2, 5)
          .toUpperCase();
        return `${namePrefix}-${randomString}`;
      };

      let newUniqueId = generateUniqueId(this.name);
      while (await Companie.exists({ uniqueId: newUniqueId })) {
        newUniqueId = generateUniqueId(this.name);
      }
      this.uniqueId = newUniqueId;
    }
    next();
  } catch (error) {
    next(error);
  }
});

// Method to perform soft delete
companieSchema.methods.softDelete = async function () {
  this.isDeleted = true;
  this.deletedAt = new Date();
  await this.save();
};

// Static method to find non-deleted companies
companieSchema.statics.findNonDeleted = function () {
  return this.find({ isDeleted: { $ne: true } });
};

// Create the Game model
const Companie = mongoose.model("Companie", companieSchema);

module.exports = Companie;
