import { connect } from "mongoose";

function startup(): void {
    connect(String(process.env.MONGODB_URL), {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}

export default startup;