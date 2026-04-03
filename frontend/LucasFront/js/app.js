const API = "http://localhost:3000/api/postres";

async function obtenerPostres() {
  const res = await fetch(API);
  const data = await res.json();

  const tabla = document.getElementById("tabla-postres");
  tabla.innerHTML = "";

  data.forEach(p => {
    tabla.innerHTML += `
      <tr>
        <td>${p.nombre}</td>
        <td>${p.tiempo}</td>
        <td>${Math.round(p.tiempo / 20)}</td>
      </tr>
    `;
  });
}

async function crearPostre() {
  const nombre = document.getElementById("nombre").value;
  const tiempo = document.getElementById("tiempo").value;

  const res = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ nombre, tiempo })
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.error);
    return;
  }

  obtenerPostres();
}

obtenerPostres();