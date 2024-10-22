// Función para obtener todos los registros
function getAllRecords() {
    axios.get('https://66db4160f47a05d55be785c5.mockapi.io/api/v1/estudiante')
        .then(function (response) {
            const records = response.data;
            const recordsTable = document.getElementById("records");
            recordsTable.innerHTML = ""; // Limpiar la tabla
            records.forEach(function (record) {
                const row = `<tr>
                                <td>${record.id}</td>
                                <td>${record.nombre}</td>
                                <td>${record.apellido}</td>
                                <td>${record.ciudad}</td>
                                <td>${record.calle}</td>
                                <td>
                                    <button class="btn btn-primary btn-sm" onclick="editRecord(${record.id})">Editar</button>
                                    <button class="btn btn-danger btn-sm" onclick="deleteRecord(${record.id})">Eliminar</button>
                                </td>
                            </tr>`;
                recordsTable.insertAdjacentHTML('beforeend', row);
            });
        })
        .catch(function (error) {
            console.error("Error al obtener los registros:", error);
        });
}

// Función para agregar o actualizar un registro
document.getElementById("studentForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const ciudad = document.getElementById("ciudad").value;
    const calle = document.getElementById("calle").value;
    const updateId = document.getElementById("updateId").value;

    const nuevoRegistro = {
        nombre: nombre,
        apellido: apellido,
        ciudad: ciudad,
        calle: calle
    };

    if (updateId) {
        // Actualizar registro
        axios.put(`https://66db4160f47a05d55be785c5.mockapi.io/api/v1/estudiante/${updateId}`, nuevoRegistro)
            .then(function () {
                alert("Registro actualizado exitosamente");
                getAllRecords();
                document.getElementById("studentForm").reset();
                document.getElementById("updateId").value = "";
            })
            .catch(function (error) {
                console.error("Error al actualizar el registro:", error);
            });
    } else {
        // Crear nuevo registro
        axios.post('https://66db4160f47a05d55be785c5.mockapi.io/api/v1/estudiante', nuevoRegistro)
            .then(function () {
                alert("Registro agregado exitosamente");
                getAllRecords();
                document.getElementById("studentForm").reset();
            })
            .catch(function (error) {
                console.error("Error al agregar el registro:", error);
            });
    }
});

// Función para eliminar un registro
function deleteRecord(id) {
    axios.delete(`https://66db4160f47a05d55be785c5.mockapi.io/api/v1/estudiante/${id}`)
        .then(function () {
            alert("Registro eliminado exitosamente");
            getAllRecords();
        })
        .catch(function (error) {
            console.error("Error al eliminar el registro:", error);
        });
}

// Función para consultar un registro por ID
document.getElementById("fetchRecordByIdQuery").addEventListener("click", function () {
    const id = document.getElementById("recordIdQuery").value;
    if (id) {
        axios.get(`https://66db4160f47a05d55be785c5.mockapi.io/api/v1/estudiante/${id}`)
            .then(function (response) {
                const record = response.data;
                alert(`Nombre: ${record.nombre}, Apellido: ${record.apellido}`);
            })
            .catch(function (error) {
                console.error("Error al consultar el registro:", error);
            });
    } else {
        alert("Por favor, ingrese un ID válido.");
    }
});

// Función para editar un registro
function editRecord(id) {
    axios.get(`https://66db4160f47a05d55be785c5.mockapi.io/api/v1/estudiante/${id}`)
        .then(function (response) {
            const record = response.data;
            document.getElementById("nombre").value = record.nombre;
            document.getElementById("apellido").value = record.apellido;
            document.getElementById("ciudad").value = record.ciudad;
            document.getElementById("calle").value = record.calle;
            document.getElementById("updateId").value = record.id;
        })
        .catch(function (error) {
            console.error("Error al obtener el registro para editar:", error);
        });
}

// Obtener todos los registros cuando se carga la página
document.getElementById("fetchRecordsAll").addEventListener("click", getAllRecords);
getAllRecords();
