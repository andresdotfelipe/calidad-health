import { Schema, model, models } from "mongoose";

const AppointmentSchema = new Schema(
  {
    type: { type: String, required: true },
    date: { type: Date, required: true },
    status: { type: String, required: true },
    patient: { type: Schema.Types.ObjectId, ref: "Patient" },
    medic: { type: Schema.Types.ObjectId, ref: "Medic" },
  },
  {
    timestamps: true,
  }
);

export default models.Appointment || model("Appointment", AppointmentSchema);
