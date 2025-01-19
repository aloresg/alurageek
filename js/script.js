

async function getProducts(userId) {
    console.log('getProducts()');
    const userData = await fetch(`http://localhost:3000/productos`)
        .then(response => response.json())
        .then(data => showProducts(data))
}

async function createProduct(form) {

    const formData = new FormData(form);
    const productData = {
        nombre: formData.get('nombre'),
        precio: formData.get('precio'),
        imagen: formData.get('imagen')
    };

    await fetch(`http://localhost:3000/productos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
    })
        .then(response => response.json())
        .then(data => getProducts())
}

async function deleteProduct(itemId) {
    try {
        const response = await fetch(`http://localhost:3000/productos/${itemId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            getProducts()
        } else {
            console.error(`Error al eliminar el item con ID ${itemId}:`, response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error al realizar la solicitud DELETE:', error);
    }
}

function showProducts(products) {

    const productContainer = document.querySelector('.cards');
    productContainer.innerHTML = '';

    products.forEach(product => {

        const productHTML = `
            <div class="card">
                <img class="product-img" src="${product.imagen}" />
                <div class="card-container--info">
                    <p>${product.nombre}</p>
                    <div class="card-container--value">
                        <p>${product.precio}</p>
                        <img width="24px" src="images/delete.png" onclick="deleteProduct('${product.id}')" />
                    </div>
                </div>
            </div>
        `;

        productContainer.innerHTML += productHTML;
    })
}