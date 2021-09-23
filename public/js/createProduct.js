// Handle creating a new project
const createProductHandler = async (event) => {
    event.preventDefault();
    
    let product_name = document.getElementById('product-name').value;
    let description = document.getElementById('product-description').value;
    let location_zipcode = document.getElementById('product-zipcode').value;
    let category_name = document.getElementById('categories').value;

    const input = document.getElementById('fileUpload')

    input.addEventListener('change', () => {
        uploadFile(input.files[0]);
    });

    // Dummy project data for testing/development
    let product = {
        "product_name": product_name,
        "description": description,
        "img_url": "url",
        "location_zipcode": location_zipcode,
        "category_name": category_name,
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


const input = document.getElementById('fileUpload')

input.addEventListener('change', () => {
    uploadFile(input.files[0]);
});

const uploadFile = (file) => {
    console.log(file);

    const fd = new FormData();
    fd.append('fileupload', file);

    fetch('api/products/upload-fileUpload', {
        method: 'POST',
        body: fd
    })
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error(err));
    console.log(fd);
}


// Add click handler to the create button
document.querySelector('.create-product').addEventListener('submit', createProductHandler);