import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import {
  getDay,
  lastDayOfMonth,
  getMonth,
  getYear,
  setHours,
  setMinutes,
} from "date-fns";
import styles from "../../styles/ConfirmRequest.module.css";

export default function ConfirmRequest({ idNumber, type }) {
  const [medics, setMedics] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    setHours(setMinutes(new Date(), 0), 7)
  );

  useEffect(() => {
    selectedDate.setSeconds(0);
    fetch(
      "/api/appointments/request?" +
        new URLSearchParams({
          type,
          selectedDate,
        })
    )
      .then((res) => res.json())
      .then((data) => setMedics(data.medics));
  }, [type, selectedDate]);

  const isWeekday = (date) => {
    const day = getDay(date);
    return day !== 0 && day !== 6;
  };

  return (
    <>
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
        className="react-datepicker"
      />
      <div className={styles.medicsContainer}>
        <h2 className={styles.medicsContainerTitle}>Select a medic</h2>
        {medics.map((medic) => (
          <button key={medic._id} className={styles.medicFullName}>
            {medic.fullName}
          </button>
        ))}
      </div>
    </>
  );
}
