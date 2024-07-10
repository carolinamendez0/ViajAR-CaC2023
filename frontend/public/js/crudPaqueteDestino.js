// VER TODOS LOS PAQUETES SIENDO ADMIN o SUPER ADMIN
async function verPaqueteDestino(id) {
    try {
        $.ajax({
            type: "GET",
            url: `/paquetesDestinos/paquete/${id}`,
            contentType: "application/json",
            success: function (data) {
                const destinosStr = destinos.map(destino => destino.nombre).join(', ');

            },
            error: function (xhr, textStatus, errorThrown) {
                console.error("Error en la solicitud:", xhr);
            }
        });
        
    } catch (error) {
    console.error('Error al obtener los datos del usuario:');
  }
}