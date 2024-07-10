$(document).ready(function () {
       $('#usuariosTable').DataTable({
        columnDefs: [
            { orderable: false, targets: -1 } // Deshabilitar el sorting en la última columna (Acciones)
        ]
    });
    // Evento para cambiar de pestañas
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        var target = $(e.target).attr("href"); // Obtener el id del tab activo
        $(target).siblings('.tab-pane').hide(); // Ocultar todas las tab panes
        $(target).show(); // Mostrar solo el tab pane activo
        
        // Cargar la vista parcial si no está cargada
            var partialPath = '';
            switch (target) {
                case '#usuarios':
                    view='usuariosView'
                    partialPath = '../views/partial/usuariosTable.html';
                    break;
                case '#comentarios':
                    view:'comentView'
                    partialPath = '../views/partial/comentariosTable.html';
                    break;
                case '#paquetes':
                    view='paquetesView'
                    partialPath = '../views/partial/paquetesTable.html';
                    break;
                case '#destinos':
                    view='destinosView'
                    partialPath = '../views/partial/destinosTable.html';
                    break;
            }
            if (partialPath !== '') {
                $(view).load(partialPath, function (response, status, xhr) {
                    if (status == "error") {
                        var msg = "Sorry but there was an error: ";
                        alert(msg + xhr.status + " " + xhr.statusText);
                    }
                });
            }
    });

    // Llama a la función datosUsuario cuando la página esté completamente cargada
    datosUsuario();
});


async function downloadTicket(usuJson,paquetesjson) {
    const requestData = {
        paquetesjson,
        usuJson
    };
    console.log(requestData.paquetesjson);
    const requ = JSON.stringify(requestData)
    
    console.log('recu');
        console.log(requ);
    
    try {

        const response = await fetch('/pdf/generate-ticket', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: requ
        });

        if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'ticket.pdf';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        } else {
            console.error('Failed to generate ticket:', response.statusText);
        }
    } catch (error) {
        console.error('Error generating ticket:', error);
    }
}

   function closePopup() {
        const popup = document.querySelector('#popup');
    if (popup) {
        popup.remove();
    }
}

function saveUserData() {
    // Aquí puedes manejar la lógica para guardar los datos del usuario
    closePopup();
}

// Función para decodificar el JWT
function decodeJWT(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

function traerFacturacion(dataUsuario) {
    $.ajax({
        type: "GET",
        url: `/facturacion/${dataUsuario.idusuario}`,
        contentType: "application/json",
        success: function (dataf) {
            const fetchPaquetes = async ()=>{
                try {
                    const table = $('#boletosTable').DataTable();
                    table.clear();
                    for (const item of dataf) {
                        const respuesta = await axios.get(`http://localhost:3001/paquetes/${item.id_paquete}`);
                        const datosRespuesta = respuesta.data;
                        console.log(datosRespuesta.paquetes.titulo_paquete);
                        console.log(datosRespuesta.destinos);
                        const paquetesJson = JSON.stringify(datosRespuesta);
                        const usuJson = JSON.stringify(dataUsuario);

                        table.row.add([
                            datosRespuesta.paquetes.titulo_paquete,
                            datosRespuesta.destinos.titulo_destino,
                            datosRespuesta.paquetes.descripcion_paquete,
                            '$ ' + datosRespuesta.paquetes.precio_paquete,
                            '20/10/2024',
                            `<button class="btn" onclick='downloadTicket(${JSON.stringify(usuJson)},${JSON.stringify(paquetesJson)})' style="text-align: center;"><i class="fa-regular fa-circle-down"></i></button>`
                        ]).draw(false);
                    }
                } catch (error) {
                console.error("Error al obtener los posteos", error)
                }
            }
            fetchPaquetes()
        },
            error: function (xhr, textStatus, errorThrown) {
                console.error("Error en la solicitud:", xhr);
            }
    });
}

// Función para borrar un usuario
function PopUpDelete(nombre,apellido,id) {

   fetch('../views/popUp.html')
            .then(response => response.text())
            .then(html => {
                // Insertar el contenido del popup en el DOM
                document.body.insertAdjacentHTML('beforeend', html);
                 const nom = document.getElementById('nombreDelete');
                nom.textContent = nombre + ' ' + apellido;
                // document.querySelector('#nombreDelete').value = nombre;
                // document.querySelector('#apellidoDelete').value = apellido;
                document.querySelector('#idUsuarioDelete').value = id;
                // Mostrar el popup
                const popup = document.querySelector('#popup');
                popup.style.display = 'block';
            })
        .catch(error => console.error('Error al cargar popup.html', error));
  
}

// Función para borrar un Paquete
function PopUpDeletePaquete(titulo,id) {
   fetch('../views/popUp.html')
            .then(response => response.text())
            .then(html => {
                // Insertar el contenido del popup en el DOM
                document.body.insertAdjacentHTML('beforeend', html);
                const tituloAction = document.getElementById('accionPopUp');
                tituloAction.textContent = 'Esta seguro de Borrar Paquete';
                 const nom = document.getElementById('nombreDelete');
                nom.textContent = titulo + ' ' + descripcion;
                document.querySelector('#idUsuarioDelete').value = id;
                // Mostrar el popup
                const accionBtn = document.getElementById('accionBtn');
                accionBtn.textContent = 'Si';
                accionBtn.setAttribute('onclick', 'DeletePaquete()');
                const popup = document.querySelector('#popup');
                popup.style.display = 'block';
            })
        .catch(error => console.error('Error al cargar popup.html', error));
  
}

// Función para borrar un destino
function PopUpDeleteDestino(titulo,ciudad,provincia,pais,id) {
   fetch('../views/popUp.html')
            .then(response => response.text())
            .then(html => {
                // Insertar el contenido del popup en el DOM
                document.body.insertAdjacentHTML('beforeend', html);
                const tituloAction = document.getElementById('accionPopUp');
                tituloAction.textContent = 'Esta seguro de Borrar el destino?';
                 const nom = document.getElementById('nombreDelete');
                nom.textContent = titulo + ' - ' + ciudad + ' , ' + provincia + ' , ' + pais;
                document.querySelector('#idUsuarioDelete').value = id;
                // Mostrar el popup
                const accionBtn = document.getElementById('accionBtn');
                accionBtn.textContent = 'Si';
                accionBtn.setAttribute('onclick', 'DeleteDestino()');
                const popup = document.querySelector('#popup');
                popup.style.display = 'block';
            })
        .catch(error => console.error('Error al cargar popup.html', error));
  
}

// Evento que se dispara al cargar la página
window.addEventListener("load", function() {
            // icono para mostrar contraseña
            showPassword = document.querySelector('.show-password');
            showPassword.addEventListener('click', () => {

                // elementos input de tipo clave
                password1 = document.querySelector('.password1');

                if ( password1.type === "text" ) {
                    password1.type = "password"
                    showPassword.classList.remove('fa-eye-slash');
                } else {
                    password1.type = "text"
                    showPassword.classList.toggle("fa-eye-slash");
                }

                passwordPopUp = document.getElementById('showPasswordPopUp');
                console.log(passwordPopUp)
                if ( passwordPopUp.type === "text" ) {
                    passwordPopUp.type = "password"
                    showPassword.classList.remove('fa-eye-slash');
                } else {
                    passwordPopUp.type = "text"
                    showPassword.classList.toggle("fa-eye-slash");
                }

            })

    // if ($.fn.DataTable.isDataTable('#usuariosTable')) {
    //     // DataTable ya está inicializado, destruir la instancia existente
    //     $('#usuariosTable').DataTable().destroy();
    // }
    
});