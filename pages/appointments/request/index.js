import { useState, useEffect } from "react";
import Layout from "../../../components/Layout";
import { validateInput } from "../../../utils/validateForm";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  getDay,
  lastDayOfMonth,
  getMonth,
  getYear,
  setHours,
  setMinutes,
} from "date-fns";

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
        <section className={"container"}>
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
        </section>
      )}
    </Layout>
  );
}

const ConfirmRequest = ({ idNumber, type }) => {
  const [medics, setMedics] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    setHours(setMinutes(new Date(), 0), 7)
  );

  useEffect(() => {
    fetch(
      "/api/appointments/request?" +
        new URLSearchParams({
          type,
        })
    )
      .then((res) => res.json())
      .then((data) => setMedics(data.medics));
  }, [type]);

  const isWeekday = (date) => {
    const day = getDay(date);
    return day !== 0 && day !== 6;
  };

  return (
    <>
      {medics.map((medic) => (
        <div key={medic._id}>
          <p>{medic.fullName}</p>
        </div>
      ))}
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        inline={true}
        filterDate={isWeekday}
        minDate={new Date()}
        maxDate={lastDayOfMonth(
          new Date(getYear(new Date()), getMonth(new Date()) + 1)
        )}
        showTimeSelect={true}
        minTime={setHours(setMinutes(new Date(), 0), 7)}
        maxTime={setHours(setMinutes(new Date(), 0), 19)}
        excludeTimes={[setHours(setMinutes(new Date(), 0), 17)]}
      />
    </>
  );
};
