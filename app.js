const relojes = [
    { id: 1, nombre: 'Reloj de pulsera', precio: 50 },
    { id: 2, nombre: 'Reloj de pared', precio: 80 },
    { id: 3, nombre: 'Reloj digital', precio: 100 },
    { id: 4, nombre: 'Reloj de bolsillo', precio: 70 },
    { id: 5, nombre: 'Reloj inteligente', precio: 150 }
];

function crearFilaReloj(reloj) {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${reloj.nombre}</td>
      <td>$${reloj.precio}</td>
      <td>
        <button onclick="agregarAlCarrito(${reloj.id})">Agregar</button>
        <button onclick="quitarDelCarrito(${reloj.id})">Quitar</button>
      </td>
    `;
    return fila;
}

function mostrarRelojes() {
    const relojesTable = document.getElementById('relojes-table');
    relojes.forEach(reloj => {
        const fila = crearFilaReloj(reloj);
        relojesTable.appendChild(fila);
    });
}

function agregarAlCarrito(relojId) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || {};
    carrito[relojId] = (carrito[relojId] || 0) + 1;
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
    actualizarTotal();
}

function quitarDelCarrito(relojId) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || {};
    if (carrito[relojId]) {
        carrito[relojId] -= 1;
        if (carrito[relojId] === 0) {
            delete carrito[relojId];
        }
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarCarrito();
        actualizarTotal();
    }
}

function actualizarTotal() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || {};
    let total = 0;
    for (const relojId in carrito) {
        const cantidad = carrito[relojId];
        const reloj = relojes.find(r => r.id === parseInt(relojId));
        total += reloj.precio * cantidad;
    }
    const totalSpan = document.getElementById('total');
    totalSpan.textContent = `$${total}`;
}

function actualizarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || {};
    const carritoList = document.getElementById('carrito-list');
    carritoList.innerHTML = '';
    for (const relojId in carrito) {
        const cantidad = carrito[relojId];
        const reloj = relojes.find(r => r.id === parseInt(relojId));
        const li = document.createElement('li');
        li.textContent = `${reloj.nombre} x${cantidad}`;
        carritoList.appendChild(li);
    }
    function comprar() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || {};
        if (Object.keys(carrito).length > 0) {
            alert('Compra realizada con éxito. ¡Gracias por su compra!');
            localStorage.removeItem('carrito');
            actualizarCarrito();
            actualizarTotal();
        } else {
            alert('Agregue al menos un artículo al carrito antes de realizar la compra.');
        }
    }
}

mostrarRelojes();
actualizarCarrito();
actualizarTotal();
