import { useState } from "react";
import Layout from "../../../components/Layout";
import { validateInput } from "../../../utils/validateForm";

const checkFormInitialState = {
  idNumber: "",
};

const errorMessagesInitialState = {
  idNumber: "",
};

export default function Check() {
  const [checkForm, setCheckForm] = useState(checkFormInitialState);
  const [errorMessages, setErrorMessages] = useState(errorMessagesInitialState);

  const handleSubmitCheck = (e) => {
    e.preventDefault();
    handleErrorMessages(Object.entries(checkForm));
  };

  const onChange = (e) => {
    const { id, value } = e.target;
    handleErrorMessages([[id, value]], id);
    setCheckForm({ ...checkForm, [id]: value });
  };

  const handleErrorMessages = (entries, id) => {
    const errors = validateInput(entries);
    id
      ? setErrorMessages({ ...errorMessages, [id]: errors[id] })
      : setErrorMessages({ ...errorMessages, ...errors });
  };

  return (
    <Layout title="Check medical appointments | CALIDAD Health">
      <section className={"container"}>
        <h1 className={"title"}>Check your medical appointments</h1>
        <form onSubmit={handleSubmitCheck} className={"form"}>
          <div className={"field"}>
            <label htmlFor="idNumber">ID number</label>
            <input
              type="text"
              id="idNumber"
              name="idNumber"
              value={checkForm.idNumber}
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
          <button type="submit">Next</button>
        </form>
      </section>
    </Layout>
  );
}
