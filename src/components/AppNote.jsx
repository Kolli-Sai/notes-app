import React from "react";
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import NoteList from "./NoteList";

function AppNote() {
  const [items, setItems] = useState([]);

  // let data = localStorage.setItem("data", JSON.stringify(items));
  // console.log(data);
  // console.log(typeof data);

  const initialValues = {
    item: "",
  };

  function getDate() {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
    return `${dd}/${mm}/${yyyy}`;
  }

  let onSubmit = (values) => {
    let li = [values.item, getDate()];

    const newitem = [...items, li];
    setItems(newitem);
    localStorage.setItem("data", JSON.stringify(newitem));
    values.item = "";
  };

  const validationSchema = yup.object({
    item: yup.string().required("cannot be empty"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  const handleDelete = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
    let arrayOfArrays = JSON.parse(localStorage.getItem("data"));
    arrayOfArrays.splice(index, 1);
    localStorage.setItem("data", JSON.stringify(arrayOfArrays));
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-control">
          <textarea
            type="text"
            name="item"
            placeholder="type your text here."
            value={formik.values.item}
            onChange={formik.handleChange}
          />
          <br />

          <button type="submit">save</button>
        </div>
      </form>
      <div className="container">
        <NoteList
          items={JSON.parse(localStorage.getItem("data"))}
          handleDelete={handleDelete}
        />
      </div>
    </>
  );
}

export default AppNote;
