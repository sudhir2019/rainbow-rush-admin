const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const temporalUserSchema = new Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    roles: [
        {
            type: Schema.Types.ObjectId,
            ref: "Role",
        },
    ],
    referredBy: {
        type: String,
    },
    emailToken: {
        type: String,
        required: true
    },
    referralTransactionId: {
        type: Schema.Types.ObjectId,
        ref: "ReferTransaction"
    },
    createdAt: { type: Date, default: Date.now },
    expireAt: {
        type: Date,
        default: Date.now() + 24 * 60 * 60 * 1000
    }
});

// Create index for username and expiration
temporalUserSchema.index({ username: 1 }, { unique: true });
temporalUserSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

const TemporalUser = mongoose.model('TemporalUser', temporalUserSchema)
module.exports = TemporalUser;