const mongoose = require("mongoose")

const TokenSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        },
        date_created: {
            type: Date,
            required: true,
            default: Date.now()
        }
    }
)

const Token = mongoose.model("Token", TokenSchema)

module.exports = Token
