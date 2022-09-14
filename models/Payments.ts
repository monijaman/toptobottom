import mongoose from "mongoose";
// import { MongooseQueryLogger } from 'mongoose-query-logger';

// export const queryLogger = new MongooseQueryLogger();

const paymentSchema = new mongoose.Schema(
    {
        customerid: { type: String, required: true },
        status: { type: String, required: true, unique: true },
        gateway: { type: String, required: true },
        type: { type: String, required: true },
        amount: { type: Number, required: true },
        card: { type: String, required: true },
        //bran, panLastFor, ExMOnth, ExYear, CVV
        token: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

// productSchema.plugin(queryLogger.getPlugin());

const Payment =
    mongoose.models.Payment || mongoose.model("Product", paymentSchema);
export default Payment;

