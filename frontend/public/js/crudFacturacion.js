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
                        const respuesta = await traerUnPaquete(item.id_paquete);
                        // const paquetesJson = JSON.stringify(respuesta);
                        // console.log(paquetesJson);
                        // Asumiendo que respuesta.paquete es un array
                        const paquete = respuesta.paquete[0];

                        // const usuJson = JSON.stringify(dataUsuario);

                        table.row.add([
                            paquete.titulo_paquete,
                            paquete.titulo_destino,
                            paquete.descripcion_paquete,
                            '$ ' + paquete.precio_paquete,
                            paquete.dias_paquete,
                            `<button class="btn" onclick='downloadTicket(${JSON.stringify(dataUsuario)},${JSON.stringify(paquete)})' style="text-align: center;"><i class="fa-regular fa-circle-down"></i></button>`
                        ]).draw(false);
                    }
                } catch (error) {
                console.error("Error al obtener los paquetes", error)
                }
            }
            fetchPaquetes()
        },
            error: function (xhr, textStatus, errorThrown) {
                console.error("Error en la solicitud:", xhr);
            }
    });
}


async function postFacturacion(usuario,paquete) {
                const formData = {
                idUsuario: usuario,
                idPaquete: paquete,
                };
            // Realiza la petición POST al servidor
            $.ajax({
                type: "POST",
                url: "/facturacion/",
                contentType: "application/json",
                data: JSON.stringify(formData),
                success: function(data) {
                    // Maneja la respuesta del servidor
                    // console.log("Respuesta del servidor:", data);
                    // location.reload(); // Recargar la página actual
                    return true
                },
              error: function (xhr, textStatus, errorThrown) {
                  console.error("Error en la solicitud:", xhr);
                  if (xhr.status === 404) {
                      console.log(textStatus);
                      alert(textStatus);
                      // alert("El correo electrónico ingresado ya existe. Por favor, ingrese otro correo.");
                        console.log("Error en el registro. Por favor, inténtelo de nuevo.");
                    } else {
                        // Maneja otros errores posibles
                        console.log("Error en el registro.");
                  }
                    return false
                }
            });
}
