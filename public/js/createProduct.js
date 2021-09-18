// Handle creating a new project
const createProductHandler = async (event) => {
    event.preventDefault();

    // Dummy project data for testing/development
    let product = {
        "product_name": "Some Product",
        "description": "Some Description",
        "img_url": "url",
        "location_zipcode": "27510",
        "category_name": "Electronics",
    }

    // Attempt to create the new product
    const response = await fetch('/api/products/', {
        method: 'POST',
        body: JSON.stringify(product),
        headers: { 'Content-Type': 'application/json' },
    });

    // Alert if product was added sucessfully. Should use something other than alerts eventually
    if (response.ok) {
        alert('Product created successfully');
    } else {
        alert(response.statusText);
    }

}

// Add click handler to the create button
document.querySelector('.create-product').addEventListener('submit', createProductHandler);