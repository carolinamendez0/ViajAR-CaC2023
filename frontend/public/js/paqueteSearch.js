
const fetchPaquetes = async (region) => {
  try {
    const respuesta = await axios.get(`http://localhost:3001/paquetes/region/${region}`);
    const paquetes = respuesta.data;

    paquetes.forEach(paquete => {
      // Aquí va tu lógica para crear y añadir los elementos de las cards
      // creando elementos
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
      const stars = "⭐⭐⭐⭐⭐";
      rating.textContent = stars;
      viajAR.textContent = paquete.titulo_paquete;
      cost.textContent = paquete.precio_paquete;
      time.textContent = "🕓" + paquete.dias_paquete;
      location.textContent = "✈" + paquete.destino_paquete;

      // clases
      card.classList.add("card");
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

      paquetesContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Error al obtener los paquetes", error);
  }
};

// Llamar fetchPaquetes cuando la página paqueteSearch se carga
document.addEventListener("DOMContentLoaded", () => {
  const region = window.location.pathname.split('/paqueteSearch').pop(); // Asume que la ruta es /paquetes/region/:region
  fetchPaquetes(region);
});
