let students = [];
let editIndex = null;

const form = document.getElementById("studentForm");
const table = document.getElementById("studentTable");

form.addEventListener("submit", function (event) {
  event.preventDefault(); /*prevents deault form submission behavior*/

  /* key : value*/
  const name = document.getElementById("name").value.trim();
  const rollNo = document.getElementById("rollNo").value.trim();
  const className = document.getElementById("class").value.trim();
  const email = document.getElementById("email").value.trim();

  /*All imputs are requirer*/
  if (!name || !rollNo || !className || !email) {
    alert("Please fill in all fields.");
    return;
  }

  //Prevent duplicates roll number
  const isDuplicate = students.some(
    (student, index) => student.rollNo === rollNo && index !== editIndex
  ); //index !== editIndex → ignores the student you are currently editing

  if (isDuplicate) {
    alert("A student with this roll number already exists.");
    return;
  }

  const student = {
    name,
    rollNo,
    className,
    email,
  };

  if (editIndex === null) {
    students.push(student);
  } else {
    students[editIndex] = student;
    editIndex = null; /*reset edit index after updating*/
  }

  displayStudents();
  form.reset(); /*resets the form fields*/
});

function displayStudents() {
  table.innerHTML = ""; /*clears existing table data*/

  students.forEach((student, index) => {
    table.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${students.name}</td>
        <td>${students.rollNo}</td>
        <td>${students.className}</td>
        <td>${students.email}</td>
         <td>
             <button onclick="editStudent(${index})">Edit</button>
          <button onclick="deleteStudent(${index})">Delete</button>
        </td>
      </tr>
    `;
  });
}

function editStudent(index) {
  const student = students[index];

  document.getElementById("name").value = student.name;
  document.getElementById("rollNo").value = student.rollNo;
  document.getElementById("class").value = student.className;
  document.getElementById("email").value = student.email;

  editIndex = index;
}

function deleteStudent(index) {
  if (confirm("Are you sure you want to delete this student?")) {
    students.splice(index, 1);
    displayStudents();
  }
}
