import mongoose from "mongoose"
import { config } from "dotenv";

const sessionsURL = process.env.SESSIONS_URL

const mongoConnect = () => {
    // try {
    //     mongoose.connect(
    //         sessionsURL
    //     )
    //     console.log('db is connected')
    // } catch (error) {
    //     console.log(error)
    // }
}

export default mongoConnect