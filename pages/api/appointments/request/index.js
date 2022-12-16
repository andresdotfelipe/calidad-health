import connectDB from "../../../../utils/connectDB";
import Patient from "../../../../models/Patient";
import Medic from "../../../../models/Medic";

export default async function handler(req, res) {
  const { method } = req;
  await connectDB();

  switch (method) {
    case "GET":
      try {
        const { idNumber, type, selectedDate } = req.query;
        console.log(idNumber, type, selectedDate);
        const result = await Medic.find({ specialization: type });
        const medics = result.filter((result) => {
          return result.appointments.date !== selectedDate;
        });
        res.status(200).json({ success: true, medics });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case "POST":
      try {
        const patient = await Patient.create(req.body.patient);
        res.status(200).json({ success: true, data: patient });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
