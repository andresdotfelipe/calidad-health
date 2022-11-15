export const validateInput = (entries) => {
  let errors = { idNumber: "", appointmentType: "" };
  entries.map(([id, value]) => {
    switch (id) {
      case "idNumber":
        errors.idNumber = validateIdNumber(value);
      case "appointmentType":
        errors.appointmentType = validateAppointmentType(value);
    }
  });
  return errors;
};

const validateIdNumber = (idNumber) => {
  if (isNaN(idNumber)) return "Type a numeric ID";
  if (idNumber === "") return "Fill the ID number field";
  return "";
};

const validateAppointmentType = (appointmentType) => {
  if (appointmentType === "Choose here...") return "Select an appointment type";
  return "";
};
