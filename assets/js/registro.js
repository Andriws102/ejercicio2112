let editRowIndex = -1; // Variable para almacenar el índice de la fila que se está editando

const obtenerPersonas = () => {
    const url = "http://localhost:3001/personas"
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
    .then(data => {
        const table = document.getElementById('personTable').getElementsByTagName('tbody')[0];
        table.innerHTML = "";
        data.forEach(persona => {
            const newRow = table.insertRow();
            newRow.innerHTML = `
                <td>${persona.id}</td>
                <td>${persona.nombre}</td>
                <td>${persona.apellido}</td>
                <td>${persona.telefono}</td>
                <td>${persona.correo}</td>
                <td>
                    <button class="edit-btn">Editar</button>
                    <button class="delete-btn">Eliminar</button>
                </td>
            `;
        });
    })
}

document.getElementById('personForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    const table = document.getElementById('personTable').getElementsByTagName('tbody')[0];

    if (editRowIndex === -1) {
        // Agregar nueva fila
        const urlInsert = "http://localhost:3001/personas"
        fetch(urlInsert, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: firstName,
                apellido: lastName,
                correo: email,
                telefono: phone
            })
        }).then(response => response.json())
        .then(data => {
            if(data.message){
                alert(data.message);
            }
            //window.location.reload();
            obtenerPersonas();
        });
    } else {
        // Actualizar fila existente
        const row = table.rows[editRowIndex-1];
        row.cells[0].innerText = editRowIndex;
        row.cells[1].innerText = firstName;
        row.cells[2].innerText = lastName;
        row.cells[3].innerText = email;
        row.cells[4].innerText = phone;
        editRowIndex = -1; // Resetear el índice de edición
    }

    document.getElementById('personForm').reset();
});

// Función para manejar el clic en el botón "Editar"
document.getElementById('personTable').addEventListener('click', function(e) {
    if (e.target.classList.contains('edit-btn')) {
        const row = e.target.parentElement.parentElement;
        document.getElementById('firstName').value = row.cells[1].innerText;
        document.getElementById('lastName').value = row.cells[2].innerText;
        document.getElementById('email').value = row.cells[4].innerText;
        document.getElementById('phone').value = row.cells[3].innerText;

        editRowIndex = row.rowIndex; // Guardar el índice de la fila que se está editando
    }

    // Función para manejar el clic en el botón "Eliminar"
    if (e.target.classList.contains('delete-btn')) {
        const row = e.target.parentElement.parentElement;
        row.remove(); // Eliminar la fila
    }
});

obtenerPersonas();