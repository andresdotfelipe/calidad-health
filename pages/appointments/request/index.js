import { useState } from "react";
import Layout from "../../../components/Layout";
import ConfirmRequest from "../../../components/ConfirmRequest";
import { validateInput } from "../../../utils/validateForm";

const requestFormInitialState = {
  idNumber: "",
  appointmentType: "Choose here...",
};

const errorMessagesInitialState = {
  idNumber: "",
  appointmentType: "",
};

export default function Request() {
  const [requestForm, setRequestForm] = useState(requestFormInitialState);
  const [errorMessages, setErrorMessages] = useState(errorMessagesInitialState);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmitRequest = (e) => {
    e.preventDefault();
    const errors = handleErrorMessages(Object.entries(requestForm));
    if (
      JSON.stringify(errors) === JSON.stringify(errorMessagesInitialState) &&
      JSON.stringify(requestForm) !== JSON.stringify(requestFormInitialState)
    )
      setFormSubmitted(true);
  };

  const onChange = (e) => {
    const { id, value } = e.target;
    handleErrorMessages([[id, value]], id);
    setRequestForm({ ...requestForm, [id]: value });
  };

  const handleErrorMessages = (entries, id) => {
    const errors = validateInput(entries);
    id
      ? setErrorMessages({ ...errorMessages, [id]: errors[id] })
      : setErrorMessages({ ...errorMessages, ...errors });
    return errors;
  };

  return (
    <Layout title="Request medical appointment | CALIDAD Health">
      {formSubmitted ? (
        <ConfirmRequest
          idNumber={requestForm.idNumber}
          type={requestForm.appointmentType}
        />
      ) : (
        <>
          <h1 className={"title"}>Request your medical appointment</h1>
          <form onSubmit={handleSubmitRequest} className={"form"}>
            <div className={"field"}>
              <label htmlFor="idNumber">ID number</label>
              <input
                type="text"
                id="idNumber"
                name="idNumber"
                value={requestForm.idNumber}
                className={
                  errorMessages.idNumber !== ""
                    ? `defaultInput inputError`
                    : `defaultInput`
                }
                onChange={onChange}
              />
              <span
                className={
                  errorMessages.idNumber !== ""
                    ? `errorMessage`
                    : `errorMessageNotVisible`
                }
              >
                {errorMessages.idNumber}
              </span>
            </div>
            <div className={"field"}>
              <label htmlFor="appointmentType">Appointment type</label>
              <select
                id="appointmentType"
                defaultValue={requestFormInitialState.appointmentType}
                className={
                  errorMessages.appointmentType !== ""
                    ? `defaultInput inputError`
                    : `defaultInput`
                }
                onChange={onChange}
              >
                <option
                  value={requestFormInitialState.appointmentType}
                  disabled
                  hidden
                >
                  {requestFormInitialState.appointmentType}
                </option>
                <option value="General Medicine">General Medicine</option>
                <option value="Odontology">Odontology</option>
                <option value="Dermatology">Dermatology</option>
                <option value="Nutrition">Nutrition</option>
              </select>
              <span
                className={
                  errorMessages.appointmentType !== ""
                    ? `errorMessage`
                    : `errorMessageNotVisible`
                }
              >
                {errorMessages.appointmentType}
              </span>
            </div>
            <button type="submit">Next</button>
          </form>
        </>
      )}
    </Layout>
  );
}
