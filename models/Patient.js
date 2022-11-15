import { Schema, model, models } from "mongoose";

const PatientSchema = new Schema({
  idNumber: { type: Number, required: true },
  appointments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Appointment",
    },
  ],
});

export default models.Patient || model("Patient", PatientSchema);
