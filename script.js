document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('student-form');
    const studentTableBody = document.getElementById('student-table-body');

    let students = JSON.parse(localStorage.getItem('students')) || [];

    // Function to render students
    function renderStudents() {
        studentTableBody.innerHTML = '';
        students.forEach((student, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.id}</td>
                <td>${student.email}</td>
                <td>${student.contact}</td>
                <td>
                    <button onclick="editStudent(${index})">Edit</button>
                    <button onclick="deleteStudent(${index})">Delete</button>
                </td>
            `;
            studentTableBody.appendChild(row);
        });
    }

    // Add student
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const studentName = document.getElementById('studentName').value;
        const studentId = document.getElementById('studentId').value;
        const email = document.getElementById('email').value;
        const contact = document.getElementById('contact').value;

        if (studentName && studentId && email && contact) {
            const student = {
                name: studentName,
                id: studentId,
                email: email,
                contact: contact
            };
            students.push(student);
            localStorage.setItem('students', JSON.stringify(students));
            renderStudents();
            form.reset();
        }
    });

    // Edit student
    window.editStudent = function (index) {
        const student = students[index];
        document.getElementById('studentName').value = student.name;
        document.getElementById('studentId').value = student.id;
        document.getElementById('email').value = student.email;
        document.getElementById('contact').value = student.contact;

        students.splice(index, 1);
        localStorage.setItem('students', JSON.stringify(students));
        renderStudents();
    }

    // Delete student
    window.deleteStudent = function (index) {
        students.splice(index, 1);
        localStorage.setItem('students', JSON.stringify(students));
        renderStudents();
    }

    // Initial render
    renderStudents();
});
