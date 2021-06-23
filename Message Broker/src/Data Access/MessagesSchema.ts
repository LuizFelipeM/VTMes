import { Schema, model } from "mongoose";

const MessagesSchema = new Schema({
    headers: [String],
    payload: String,
    status: String,
    creationDate: Date,
    updateDate: Date
})

export default model('Messages', MessagesSchema);