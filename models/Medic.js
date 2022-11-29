import { Schema, model, models } from "mongoose";

const MedicSchema = new Schema({
  fullName: { type: String, required: true },
  specialization: { type: String, required: true },
  appointments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Appointment",
    },
  ],
});

export default models.Medic || model("Medic", MedicSchema);
