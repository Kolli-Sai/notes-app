import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

function NoteList(props) {
  console.log(props.items);

  return (
    <>
      {props.items.map((item, index) => (
        <div className="tasks" key={index}>
          <h4>{item[0]}</h4>
          <h6>{item[1]}</h6>
          <DeleteIcon id="delete" onClick={() => props.handleDelete(index)} />
        </div>
      ))}
    </>
  );
}
export default NoteList;
