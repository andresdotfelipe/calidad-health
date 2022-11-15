import connectDB from "../../../../utils/connectDB";
import Patient from "../../../../models/Patient";
import Appointment from "../../../../models/Appointment";

export default async function handler(req, res) {
  const { method } = req;
  await connectDB();

  switch (method) {
    case "GET":
      try {
        const { idNumber } = req.query;
        const patient = await Patient.findOne({ idNumber }).select("-_id -__v");
        if (patient.length === 0)
          return res
            .status(404)
            .json({ success: false, error: "Patient not found" });
        res.status(200).json({ success: true, patient });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case "PUT":
      try {
        const { _id, status } = req.query;
        await Appointment.findByIdAndUpdate(_id, status);
        res
          .status(200)
          .json({ success: true, message: "User's appointments updated" });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
