import React, { useState } from "react";
import { STUDENTS } from "../studentsList";
import Error from "./Error";
// `joiningDate` && `validityDate` format "yyyy-mm-dd"

function checkValidity(joiningDate, validityDate) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const [year, month, day] = joiningDate.split("-");
  const [yyyy, mm, dd] = validityDate.split("-");
  const maxValid = new Date(yyyy, mm - 1, dd);
  const selected = new Date(year, month - 1, day);
  return maxValid >= selected && maxValid >= today;
}


function Search(props) {

  const [student, setStudent] = useState({
    name: '',
    joiningDate: ''
  });

  const nameHandler = (event) => {
    event.persist();
    setStudent((prevState) => {
      return { ...prevState, name:event.target.value }
    });
  }

  const dateHandler = (event) => {
    event.persist();
    setStudent((prevState) => {
      return { ...prevState, joiningDate:event.target.value }
    });
  }

  const formSubmitHandler = (event) => {
    event.preventDefault();


    const studentExist = STUDENTS.filter((st) => {
      return st.name.toLowerCase() === student['name'].toLowerCase();
    }).length;

   const joiningValidity = STUDENTS.filter((st) => {
    return st.name.toLowerCase() === student['name'].toLowerCase() && checkValidity(student['joiningDate'], st.validityDate);
   }).length;

  if(studentExist && joiningValidity) {
    // add student to resident list 
    props.onSubmitBack({ 
      type:'success',
      data: student
     });

  } else if (!studentExist) {
     props.onSubmitBack({  
      type:'error', 
      data:`Sorry, ${student['name']} is not a verified student!`
     });
  } else {
    props.onSubmitBack({ 
      type:'error', 
      data:`Sorry, ${student['name']}'s validity has Expired!`
     });
  }


    setStudent({
      name: '',
      joiningDate: ''
    })
  }



  return (
        <div className="my-50 layout-row align-items-end justify-content-end">
          <label htmlFor="studentName">
            Student Name:
            <div>
              <input
                id="studentName"
                data-testid="studentName"
                type="text"
                onChange={nameHandler}
                value={student['name']}
                className="mr-30 mt-10"
              />
            </div>
          </label>
          <label htmlFor="joiningDate">
            Joining Date:
            <div>
              <input
                id="joiningDate"
                data-testid="joiningDate"
                type="date"
                onChange={dateHandler}
                value={student['joiningDate']}
                className="mr-30 mt-10"
              />
            </div>
          </label>
          <button
            type="button"
            data-testid="addBtn"
            className="small mb-0"
            onClick={formSubmitHandler}
          >
            Add
          </button>
        </div>
  );
}

export default Search;
