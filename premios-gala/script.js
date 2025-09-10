
function mostrarSeccion(seccion) {
    document.querySelectorAll('.seccion').forEach(sec => sec.style.display = 'none');
    document.getElementById(seccion).style.display = 'block';
  }
  
  // Guardar la selección de cada categoría
  const votosSeleccionados = {};
  
  document.querySelectorAll('.voto').forEach(btn => {
    btn.addEventListener('click', () => {
      const categoria = btn.dataset.categoria;
      const nominado = btn.dataset.nominado;
  
      // Guardar voto
      votosSeleccionados[categoria] = nominado;
  
      // Quitar clase selected de todos en la categoría
      document.querySelectorAll(`.voto[data-categoria="${categoria}"]`).forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
    });
  });
  
  document.getElementById('enviarVoto').addEventListener('click', () => {
    const categorias = ["Mejor amigo", "Más divertido", "Más creativo"];
    for (let cat of categorias) {
      if (!votosSeleccionados[cat]) {
        alert(`Debes seleccionar un participante para "${cat}"`);
        return;
      }
    }
  
    // Guardar en Firebase
    Object.keys(votosSeleccionados).forEach(cat => {
      db.collection("votos").add({
        categoria: cat,
        nominado: votosSeleccionados[cat],
        fecha: firebase.firestore.FieldValue.serverTimestamp()
      });
    });
  
    alert("¡Tus votos han sido registrados!");
    votosSeleccionados = {};
    document.querySelectorAll('.voto').forEach(b => b.classList.remove('selected'));
  });
  