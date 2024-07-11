const fetchPaquetes = async (region) => {
  try {
    $.ajax({
      type: "GET",
      url: `paquetes/region/${region}`,
      contentType: "application/json",
      success: function (paquetes) {
        console.log(paquetes)
         const paquetesContainer = document.getElementById('paquetesContainer');
        paquetesContainer.innerHTML = ''; // Limpiar contenedor antes de agregar nuevos elementos
        
        paquetes.paquetesConDescripcion.forEach(paquete => {
          // Aquí va tu lógica para crear y añadir los elementos de las cards
          const card = document.createElement("div");
          const zoomImg = document.createElement("div");
          const imgCard = document.createElement("div");
          const text = document.createElement("div");
          const rating = document.createElement("span");
          const viajAR = document.createElement("h2");
          const cost = document.createElement("p");
          const cardBox = document.createElement("div");
          const time = document.createElement("p");
          const location = document.createElement("p");
          // asignar el contenido a los elementos
          imgCard.innerHTML = `<img src="${paquete.img_paquete}">`;
          // const stars = "⭐⭐⭐⭐⭐";
          // rating.textContent = stars;
          viajAR.textContent = paquete.titulo_paquete;
          cost.textContent = paquete.precio_paquete;
          time.textContent = "🕓" + paquete.dias_paquete;
          location.textContent = "✈" + paquete.titulo_destino;

          // clases
          card.classList.add("card-body");
          zoomImg.classList.add("zoom-img");
          imgCard.classList.add("img-card");
          text.classList.add("text");
          rating.classList.add("rating");
          cost.classList.add("cost");
          cardBox.classList.add("card-box");
          time.classList.add("time");
          location.classList.add("location");

          // agregar los elementos en el html
          cardBox.appendChild(time);
          cardBox.appendChild(location);

          zoomImg.appendChild(imgCard);

          text.appendChild(rating);
          text.appendChild(viajAR);
          text.appendChild(cost);
          text.appendChild(cardBox);

          card.appendChild(zoomImg);
          card.appendChild(text);

          document.getElementById('paquetesContainer').appendChild(card);
        });
      },
      error: function (xhr) {
        //  

        if (xhr.status === 404) {
          
          // area
                    document.getElementById('area').style.display = 'block'; // Mostrar el área de mensaje de error
        } 
      }
    });
  } catch (error) {
    console.error("Error al obtener los paquetes", error);
  }
};

// Llamar fetchPaquetes cuando la página paqueteSearch se carga
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const region = params.get('region');
  if (region) {
    fetchPaquetes(region);
  }
});
