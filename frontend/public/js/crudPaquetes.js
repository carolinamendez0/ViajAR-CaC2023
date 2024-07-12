// VER TODOS LOS PAQUETES SIENDO ADMIN o SUPER ADMIN
async function verTodosLosPaquetes() {
    try {
        $.ajax({
            type: "GET",
            url: `/paquetes/`,
            contentType: "application/json",
            success: function (paquetes) {
                // Inicializar DataTable
                const table = $('#paquetesTable').DataTable();
                // Limpiar cualquier dato previo en la tabla
                table.clear();
                console.log(paquetes)
                  paquetes.forEach(paquete => {
                    // Realizar una solicitud adicional para obtener los destinos de cada paquete
                    $.ajax({
                        type: "GET",
                        url: `paquetesDestinos/paquete/${paquete.idpaquetes}`,
                        contentType: "application/json",
                        success: function (destinos) {
                            let destinoNombre = '-';
                            if (destinos && destinos.paqueteDestino && destinos.paqueteDestino.destino) {
                                destinoNombre = destinos.paqueteDestino.destino.titulo_destino;
                            }
                            console.log(destinoNombre)
                            // // Obtener los nombres de los destinos en un formato legible
                            // Rellenar la tabla con los datos obtenidos
                            table.row.add([
                                paquete.titulo_paquete,
                                paquete.descripcion_paquete,
                                paquete.img_paquete,
                                paquete.precio_paquete,
                                paquete.dias_paquete,
                                destinoNombre, // Mostrar los destinos aquí
                                `<button class="btn btn-danger" style="text-align: center;" onclick="PopUpDeletePaquete('${paquete.titulo_paquete}', '${paquete.descripcion_paquete}', ${paquete.idpaquetes})"><i class="fa-solid fa-trash"></i></button>
                                <button class="btn btn-sucess" style="text-align: center;" onclick="editarPaquete('${paquete.titulo_paquete}', '${paquete.descripcion_paquete}', '${paquete.img_paquete}', '${paquete.precio_paquete}','${paquete.dias_paquete}', ${paquete.idpaquetes})"><i class="fa-solid fa-pen"></i></button>`
                            ]).draw(false);
                        },
                        error: function (xhr, textStatus, errorThrown) {
                            console.error("Error al obtener los destinos:", xhr);
                        }
                    });
                });
            },
            error: function (xhr, textStatus, errorThrown) {
                console.error("Error en la solicitud:", xhr);
            }
        });
        
    } catch (error) {
    console.error('Error al obtener los datos del usuario:');
  }
}
// funcion para editar datos de un paquete
function editarPaquete(titulo, descripcion, imagen, precio,dias, id) {
    fetch('../views/popUpUsuario.html')
        .then(response => response.text())
        .then(html => {
            // Insert the content of the popup into the DOM
            document.body.insertAdjacentHTML('beforeend', html);
            // Remove the "Contraseña" field
            const passwordField = document.getElementById('labelContra').parentElement;
            if (passwordField) {
                passwordField.remove();
            }
            const emailField = document.getElementById('labelEmail').parentElement;
            if (emailField) {
                emailField.remove();
            }
            const labelDni = document.getElementById('labelDni').parentElement;
            if (labelDni) {
                labelDni.remove();
            }
            // Obtener el formulario y el botón "Guardar"
            const form = document.getElementById('editUserForm');
            const accionBtn = document.getElementById('accionBtn');

            // Agregar un nuevo textarea de "Descripción Paquete"
            const imagenPaquete = document.createElement('div');
            imagenPaquete.classList.add('form-group');
            imagenPaquete.innerHTML = `
                <label id="labelImgPaquete" for="descripcionPaquete">Imagen Paquete</label>
                <input type="text" id="imgPaquete" name="imgPaquete" class="form-control">
            `;
            form.insertBefore(imagenPaquete, accionBtn);

            // Agregar un nuevo campo de "Días Paquete"
            const diasPaqueteInput = document.createElement('div');
            diasPaqueteInput.classList.add('form-group');
            diasPaqueteInput.innerHTML = `
                <label id="labelDiasPaquete" for="diasPaquete">Días Paquete</label>
                <input type="text" id="diasPaquete" name="diasPaquete" class="form-control">
            `;
            form.insertBefore(diasPaqueteInput, accionBtn);

            // Agregar un nuevo textarea de "Descripción Paquete"
            const descripcionPaqueteTextarea = document.createElement('div');
            descripcionPaqueteTextarea.classList.add('form-group');
            descripcionPaqueteTextarea.innerHTML = `
                <label id="labelDescripcionPaquete" for="descripcionPaquete">Descripción Paquete</label>
                <textarea id="descripcionPaquete" name="descripcionPaquete" class="form-control" maxlength="150"></textarea>
            `;
            form.insertBefore(descripcionPaqueteTextarea, accionBtn);


            // Update label texts
            document.getElementById('labelNombre').textContent = 'Titulo Paquete';
            document.getElementById('labelApellido').textContent = 'Precio Paquete';
            // document.getElementById('labelEmail').textContent = 'Nuevo Correo Electrónico';
            // document.getElementById('labelDni').textContent = 'Imagen paquete';

            // Update input values
            document.querySelector('#nombrePopUp').value = titulo;
            document.querySelector('#descripcionPaquete').value = descripcion;
            document.querySelector('#apellidoPopUp').value = precio;
            document.querySelector('#imgPaquete').value = imagen;
            document.querySelector('#diasPaquete').value = dias;
            document.querySelector('#idUsuarioPopUp').value = id;
            // Update popup title and button text
            const tituloAction = document.getElementById('accionForm');
            tituloAction.textContent = 'Editar Paquete';
            const accionBotn = document.getElementById('accionBtn');
            accionBotn.textContent = 'Guardar';
            accionBotn.setAttribute('onclick', 'updatePaqueteFromPopup()');

            // Show the popup
            const popup = document.querySelector('#popup');
            popup.style.display = 'block';
        })
        .catch(error => console.error('Error al cargar popup.html', error));
}

// Función para editar datos de un paquete
function traerUnPaquete(id) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "GET",
            url: `paquetes/${id}`,
            contentType: "application/json",
            success: function (paquete) {
                resolve(paquete);
            },
            error: function (xhr, textStatus, errorThrown) {
                console.error("Error al obtener el paquete:", xhr);
                reject(errorThrown);
            }
        });
    });
}


async function updatePaqueteFromPopup() {
    const titulo = document.getElementById('nombrePopUp').value;
    const descripcion = document.getElementById('descripcionPaquete').value;
    const imagen = document.getElementById('imgPaquete').value;
    const precio = document.getElementById('apellidoPopUp').value;
    const dias = document.getElementById('diasPaquete').value;
    const id = document.querySelector('#idUsuarioPopUp').value;
    const formData = {
        titulo_paquete: titulo,
        descripcion_paquete: descripcion,
        img_paquete:imagen,
        precio_paquete: precio,
        dias_paquete: dias,
        id:id
    };
    try {
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        };

        const response = await fetch(`/paquetes/${formData.id}`, requestOptions);
        const dataResponse = await response.json();

        alert('Los datos fueron actualizados exitosamente.');
        location.reload(); // Recargar la página actual 
        // return { response, dataResponse }; // Devolver la respuesta y los datos de la respuesta
    } catch (error) {
        console.error('Error al enviar datos al servidor:', error);
    }
}

async function postPaquetes() {
            const titulo = document.getElementById('nombrePopUp').value;
            const descripcion = document.getElementById('descripcionPaquete').value;
            const imagen = document.getElementById('imgPaquete').value;
            const precio = document.getElementById('apellidoPopUp').value;
            const dias = document.getElementById('diasPaquete').value;
            const id = document.querySelector('#idUsuarioPopUp').value;
            const formData = {
                titulo_paquete: titulo,
                descripcion_paquete: descripcion,
                img_paquete:imagen,
                precio_paquete: precio,
                dias_paquete: dias,
                id:id
            };
                console.log(formData);
        // Realiza la petición POST al servidor
            $.ajax({
                type: "POST",
                url: "/paquetes/",
                contentType: "application/json",
                data: JSON.stringify(formData),
                success: function(data) {
                    // Maneja la respuesta del servidor
                    console.log("Respuesta del servidor:", data);
                    alert('Paquete Creado');
                    location.reload(); // Recargar la página actual
                },
              error: function (xhr, textStatus, errorThrown) {
                  console.error("Error en la solicitud:", xhr);
                //   if (xhr.status === 404) {
                //       console.log(textStatus);
                //     $("#dniPopUp-error").text("El usuario ya está registrado");
                //      $("#emailPopUp-error").text("El usuario ya está registrado");
                        
                //     } else {
                        // Maneja otros errores posibles
                        alert("Error en el registro. Por favor, inténtelo de nuevo.");
                    // }
                }
            });
}

function crearPaquete(){
     fetch('../views/popUpUsuario.html')
            .then(response => response.text())
            .then(html => {
                // Insertar el contenido del popup en el DOM
                document.body.insertAdjacentHTML('beforeend', html);
            const passwordField = document.getElementById('labelContra').parentElement;
            if (passwordField) {
                passwordField.remove();
            }
            const emailField = document.getElementById('labelEmail').parentElement;
            if (emailField) {
                emailField.remove();
            }
            const labelDni = document.getElementById('labelDni').parentElement;
            if (labelDni) {
                labelDni.remove();
            }
            // Obtener el formulario y el botón "Guardar"
            const form = document.getElementById('editUserForm');
            const accionBtn = document.getElementById('accionBtn');

            // Agregar un nuevo textarea de "Descripción Paquete"
            const imagenPaquete = document.createElement('div');
            imagenPaquete.classList.add('form-group');
            imagenPaquete.innerHTML = `
                <label id="labelImgPaquete" for="descripcionPaquete">Imagen Paquete</label>
                <input type="text" id="imgPaquete" name="imgPaquete" class="form-control">
            `;
            form.insertBefore(imagenPaquete, accionBtn);

            // Agregar un nuevo campo de "Días Paquete"
            const diasPaqueteInput = document.createElement('div');
            diasPaqueteInput.classList.add('form-group');
            diasPaqueteInput.innerHTML = `
                <label id="labelDiasPaquete" for="diasPaquete">Días Paquete</label>
                <input type="text" id="diasPaquete" name="diasPaquete" class="form-control">
            `;
            form.insertBefore(diasPaqueteInput, accionBtn);

            // Agregar un nuevo textarea de "Descripción Paquete"
            const descripcionPaqueteTextarea = document.createElement('div');
            descripcionPaqueteTextarea.classList.add('form-group');
            descripcionPaqueteTextarea.innerHTML = `
                <label id="labelDescripcionPaquete" for="descripcionPaquete">Descripción Paquete</label>
                <textarea id="descripcionPaquete" name="descripcionPaquete" class="form-control" maxlength="150"></textarea>
            `;
            form.insertBefore(descripcionPaqueteTextarea, accionBtn);


            // Update label texts
            document.getElementById('labelNombre').textContent = 'Titulo Paquete';
            document.getElementById('labelApellido').textContent = 'Precio Paquete';

            
            // Create popup title and button text
            const tituloAction = document.getElementById('accionForm');
            tituloAction.textContent = 'Crear Paquete';
            const accionBotn = document.getElementById('accionBtn');
            accionBotn.textContent = 'Crear';
            accionBotn.setAttribute('onclick', 'postPaquetes()');

            // Show the popup
            const popup = document.querySelector('#popup');
            popup.style.display = 'block';

            })
        .catch(error => console.error('Error al cargar popup.html', error));
}

// Función para borrar un Paquete
function DeletePaquete(userId) {
    const idPaquete = document.querySelector('#idUsuarioDelete').value;
    $.ajax({
        type: "DELETE",
        url: `/paquetes/${idPaquete}`,
        success: function () {
            alert('Paquete borrado exitosamente');
            location.reload(); // Recargar la página actual
        },
        error: function (xhr, textStatus, errorThrown) {
            console.error("Error al borrar el usuario:", xhr);
        }
    });
}

function closePopup() {
    const popup = document.querySelector('#popup');
    if (popup) {
        popup.remove();
    }
}
