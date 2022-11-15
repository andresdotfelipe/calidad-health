import { Schema, model, models } from "mongoose";

const MedicSchema = new Schema({
  fullName: { type: String, required: true },
  specialization: { type: String, required: true },
  workingHours: [
    {
      daytime: String,
      hours: [],
    },
  ],
  appointments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Appointment",
    },
  ],
});

export default models.Medic || model("Medic", MedicSchema);
