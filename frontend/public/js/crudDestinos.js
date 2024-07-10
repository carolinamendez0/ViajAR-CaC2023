// VER TODOS LOS DESTINOS SIENDO ADMIN o SUPER ADMIN
async function verTodosLosDestinos() {
    try {
        $.ajax({
            type: "GET",
            url: `/destinos/`,
            contentType: "application/json",
            success: function (data) {
                // Inicializar DataTable
                const table = $('#destinosTable').DataTable();
                // Limpiar cualquier dato previo en la tabla
                table.clear();
                // Rellenar la tabla con los datos obtenidos
               
                data.forEach(data => {
                    table.row.add([
                        data.titulo_destino,
                        data.ciudad,
                        data.provincia,
                        data.pais,
                        data.region_destino,
                        `<button class="btn btn-danger" style="text-align: center;" onclick="PopUpDeleteDestino('${data.titulo_destino}','${data.ciudad}','${data.provincia}', '${data.pais}', ${data.iddestino})"><i class="fa-solid fa-trash"></i></button>
                        <button class="btn btn-sucess" style="text-align: center;" onclick="editarDestino('${data.titulo_destino}','${data.ciudad}','${data.provincia}', '${data.pais}', '${data.region_destino}', ${data.iddestino})"><i class="fa-solid fa-pen"></i></button>`
                    ]).draw(false);
                });
            },
            error: function (xhr, textStatus, errorThrown) {
                console.error("Error en la solicitud:", xhr);
            }
        });
        
    } catch (error) {
    console.error('Error al obtener los datos del destino:' , error);
  }
}


// funcion para editar datos de un destino
function editarDestino(titulo, ciudad, provincia, pais, region, id) {
    fetch('../views/popUpUsuario.html')
        .then(response => response.text())
        .then(html => {
            // Insert the content of the popup into the DOM
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

            
            // Agregar un nuevo campo de "Provincia Destino"
            const ProvinciaDestinoInput = document.createElement('div');
            ProvinciaDestinoInput.classList.add('form-group');
            ProvinciaDestinoInput.innerHTML = `
                <label id="labelProvinciaDestino" for="provinciaDestino">Provincia Destino</label>
                <input type="text" id="provinciaDestino" name="provinciaDestino" class="form-control">
            `;
            form.insertBefore(ProvinciaDestinoInput, accionBtn);

                
            // Agregar un nuevo campo de "Pais Destino"
            const paisDestinoInput = document.createElement('div');
            paisDestinoInput.classList.add('form-group');
            paisDestinoInput.innerHTML = `
                <label id="labelPaisDestino" for="paisDestino">Pais Destino</label>
                <input type="text" id="paisDestino" name="paisDestino" class="form-control">
            `;
                form.insertBefore(paisDestinoInput, accionBtn);

            // Agregar un nuevo textarea de "region Destino"
            const regionDestino = document.createElement('div');
            regionDestino.classList.add('form-group');
            regionDestino.innerHTML = `
                <label id="labelregionDestino" for="regionDestino">Region Destino</label>
                <input type="text" id="regionDestino" name="regionDestino" class="form-control">
            `;
            form.insertBefore(regionDestino, accionBtn);
            
            // Update label texts
            document.getElementById('labelNombre').textContent = 'Titulo Destino';
            document.getElementById('labelApellido').textContent = 'Ciudad Destino';

            // Update input values
            document.querySelector('#nombrePopUp').value = titulo;
            document.querySelector('#provinciaDestino').value = provincia;
            document.querySelector('#apellidoPopUp').value = ciudad;
            document.querySelector('#paisDestino').value = pais;
            document.querySelector('#regionDestino').value = region;
            document.querySelector('#idUsuarioPopUp').value = id;
            // Update popup title and button text
            const tituloAction = document.getElementById('accionForm');
            tituloAction.textContent = 'Editar Destino';
            const accionBotn = document.getElementById('accionBtn');
            accionBotn.textContent = 'Guardar';
            accionBotn.setAttribute('onclick', 'updateDestinoFromPopup()');

            // Show the popup
            const popup = document.querySelector('#popup');
            popup.style.display = 'block';
        })
        .catch(error => console.error('Error al cargar popup.html', error));
}



async function updateDestinoFromPopup() {
    const id = document.querySelector('#idUsuarioPopUp').value;
    const titulo = document.getElementById('nombrePopUp').value;
    const region = document.getElementById('regionDestino').value;
    const ciudad = document.getElementById('apellidoPopUp').value;
    const provincia = document.getElementById('provinciaDestino').value;
    const pais = document.querySelector('#paisDestino').value;
    const formData = {
        titulo_destino: titulo,
        region_destino:region,
        ciudad: ciudad,
        provincia: provincia,
        pais: pais,
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

        const response = await fetch(`/destinos/${formData.id}`, requestOptions);
        const dataResponse = await response.json();

        alert('Los datos fueron actualizados exitosamente.');
        location.reload(); // Recargar la página actual 
        // return { response, dataResponse }; // Devolver la respuesta y los datos de la respuesta
    } catch (error) {
        console.error('Error al enviar datos al servidor:', error);
    }
}

async function postDestinos() {
            const titulo = document.getElementById('nombrePopUp').value;
            const region = document.getElementById('regionDestino').value;
            const ciudad = document.getElementById('apellidoPopUp').value;
            const provincia = document.getElementById('provinciaDestino').value;
            const pais = document.querySelector('#paisDestino').value;
            const formData = {
                titulo_destino: titulo,
                region_destino:region,
                ciudad: ciudad,
                provincia: provincia,
                pais: pais
            };
                console.log(formData);
        // Realiza la petición POST al servidor
            $.ajax({
                type: "POST",
                url: "/destinos/",
                contentType: "application/json",
                data: JSON.stringify(formData),
                success: function(data) {
                    // Maneja la respuesta del servidor
                    console.log("Respuesta del servidor:", data);
                    alert('Destino Creado');
                    location.reload(); // Recargar la página actual
                },
              error: function (xhr, textStatus, errorThrown) {
                  console.error("Error en la solicitud:", xhr);
                        alert("Error en el registro. Por favor, inténtelo de nuevo.");
                }
            });
}

function crearDestino(){
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

            
            // Agregar un nuevo campo de "Provincia Destino"
            const ProvinciaDestinoInput = document.createElement('div');
            ProvinciaDestinoInput.classList.add('form-group');
            ProvinciaDestinoInput.innerHTML = `
                <label id="labelProvinciaDestino" for="provinciaDestino">Provincia Destino</label>
                <input type="text" id="provinciaDestino" name="provinciaDestino" class="form-control">
            `;
            form.insertBefore(ProvinciaDestinoInput, accionBtn);

                
            // Agregar un nuevo campo de "Pais Destino"
            const paisDestinoInput = document.createElement('div');
            paisDestinoInput.classList.add('form-group');
            paisDestinoInput.innerHTML = `
                <label id="labelPaisDestino" for="paisDestino">Pais Destino</label>
                <input type="text" id="paisDestino" name="paisDestino" class="form-control">
            `;
                form.insertBefore(paisDestinoInput, accionBtn);

            // Agregar un nuevo textarea de "region Destino"
            const regionDestino = document.createElement('div');
            regionDestino.classList.add('form-group');
            regionDestino.innerHTML = `
                <label id="labelregionDestino" for="regionDestino">Region Destino</label>
                <input type="text" id="regionDestino" name="regionDestino" class="form-control">
            `;
            form.insertBefore(regionDestino, accionBtn);
            
            // Update label texts
            document.getElementById('labelNombre').textContent = 'Titulo Destino';
            document.getElementById('labelApellido').textContent = 'Ciudad Destino';

            
            // Create popup title and button text
            const tituloAction = document.getElementById('accionForm');
            tituloAction.textContent = 'Crear Destino';
            const accionBotn = document.getElementById('accionBtn');
            accionBotn.textContent = 'Crear';
            accionBotn.setAttribute('onclick', 'postDestinos()');

            // Show the popup
            const popup = document.querySelector('#popup');
            popup.style.display = 'block';

            })
        .catch(error => console.error('Error al cargar popup.html', error));
}

// Función para borrar un Destino
function DeleteDestino() {
    const idDestino = document.querySelector('#idUsuarioDelete').value;
    $.ajax({
        type: "DELETE",
        url: `/destinos/${idDestino}`,
        success: function () {
            alert('Destino borrado exitosamente');
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
