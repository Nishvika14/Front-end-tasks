function registerStudent(){

    let student = {

        name: document.getElementById("fname").value,

        roll: document.getElementById("rno").value,

        email: document.getElementById("email").value,

        password: document.getElementById("password").value,

        mobile: document.getElementById("mobilenum").value,

        branch: document.getElementById("branch").value
    };

    let students =
    JSON.parse(localStorage.getItem("students"))
    || [];

    students.push(student);

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

    alert("Registration Successful");

    window.location.href = "login.html";
}
function login(){

    let email =
    document.getElementById("loginEmail").value;

    let password =
    document.getElementById("loginPassword").value;

    let students =
    JSON.parse(localStorage.getItem("students"))
    || [];

    let user = students.find(

        s =>
        s.email === email &&
        s.password === password

    );

    if(user){

        localStorage.setItem(
            "loggedInUser",
            JSON.stringify(user)
        );

        alert("Login Successful");

        window.location.href =
        "dashboard.html";

    }else{

        alert(
            "Invalid Email or Password"
        );
    }
}
function displayStudents() {
    updateDashboard();
    let students =
    JSON.parse(
        localStorage.getItem("students")
    ) || [];

    let table =
    document.getElementById(
        "studentTableBody"
    );

    if(!table) return;

    table.innerHTML = "";

    students.forEach((student,index)=>{

        table.innerHTML += `

        <tr>

        <td>${student.roll}</td>

        <td>${student.name}</td>

        <td>${student.branch}</td>

        <td>
            <span class="badge bg-success">
            85%
            </span>
        </td>

        <td>

        <button
        class="btn btn-danger btn-sm"
        onclick="deleteStudent(${index})">

        Delete

        </button>

        </td>

        </tr>

        `;
    });

    updateDashboard();
}

function deleteStudent(index){

    let students =
    JSON.parse(
        localStorage.getItem("students")
    ) || [];

    students.splice(index,1);

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

    displayStudents();
}

function searchStudent(){

    let search =
    document.getElementById("searchBox")
    .value
    .toLowerCase();

    let rows =
    document.querySelectorAll(
        "#studentTableBody tr"
    );

    rows.forEach(row=>{

        row.style.display =
        row.innerText
        .toLowerCase()
        .includes(search)

        ? ""

        : "none";
    });
}

function updateDashboard() {

    let students =
        JSON.parse(localStorage.getItem("students"))
        || [];

    let totalStudentsElement =
        document.getElementById("totalStudents");

    if (totalStudentsElement) {

        totalStudentsElement.textContent =
            students.length;

        console.log(
            "Total Students Updated:",
            students.length
        );
    }
}

function markAttendance(){

    let students =
    JSON.parse(
        localStorage.getItem("students")
    ) || [];

    let present =
    Math.floor(
        students.length * 0.9
    );

    let absent =
    students.length - present;

    document.getElementById(
        "presentStudents"
    ).innerText = present;

    document.getElementById(
        "absentStudents"
    ).innerText = absent;
}