   $(document).ready(function() {
    $('#usuariosTable').DataTable({
        columnDefs: [
            { orderable: false, targets: -1 } // Deshabilitar el sorting en la última columna (Acciones)
        ]
    });
        datosUsuario(); // Cargar datos del usuario al iniciar
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


});

 