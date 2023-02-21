const socket = io();

const addProductForm = document.getElementById('addProduct');
const deleteProductForm = document.getElementById('deleteProduct');

// ------- Socket
socket.on("connected", (data) => {
    console.log('connected with server')
})

socket.on("products", data => {
    let lista = document.getElementById("listaProductos");
    let productos = ''

    console.log(data)

    data.forEach((producto) => {
        productos = productos + `<tr>
        <td> ${producto.id}            </td>
        <td> ${producto.title}         </td>
        <td> ${producto.description}   </td>
        <td> ${producto.code}          </td>
        <td> ${producto.price} ARS     </td>
        <td> ${producto.stock}         </td>
        <td> ${producto.category}      </td>
    </tr>`
    })

    lista.innerHTML = productos;
});


addProductForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const code = document.getElementById('code').value;
    const price = document.getElementById('price').value;
    const stock = document.getElementById('stock').value;
    const category = document.getElementById('category').value;
    const thumbnails = document.getElementById('thumbnails').value;

    socket.emit('new_prod', {title, description, code, price, stock, category, thumbnails})

    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('code').value = '';
    document.getElementById('price').value = '';
    document.getElementById('stock').value = '';
    document.getElementById('category').value = '';
    document.getElementById('thumbnails').value = '';

    return false;
})

deleteProductForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const pid = document.getElementById('pid').value;

    socket.emit('delete_prod', {pid})

    document.getElementById('pid').value = '';
    return false;
});