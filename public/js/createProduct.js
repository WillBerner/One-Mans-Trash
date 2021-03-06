// Handle creating a new project
const createProductHandler = async (event) => {
    event.preventDefault();
    
    let product_name = document.getElementById('product-name').value;
    let description = document.getElementById('product-description').value;
    let location_zipcode = document.getElementById('product-zipcode').value;
    let category_name = document.getElementById('categories').value;

    let fileStr = await uploadFile(input.files[0]);
    
    // Create request body using input fields and url string
    let product = {
        "product_name": product_name,
        "description": description,
        "img_url": fileStr,
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

// Listen for changes to the "Choose a file" button
const input = document.querySelector("input[type='file']")

// Update the "Choose a file" selection witht he currently selected file's title
input.addEventListener('change', (e) => {
    var file_name = e.target.files[0].name;
    document.getElementById('file-name').textContent = file_name;
});

// Attempt to upload a file to Cloudinary
const uploadFile = async (file) => {

    // Format user's posted image file
    const fd = new FormData();
    fd.append('fileupload', file);

    // Attempt to post the image via the server
    let imageUpload = await fetch('api/products/upload-fileUpload', {
        method: 'POST',
        body: fd
    })
    .then(res => res.json())
    .then(json => json)
    .catch(err => console.error(err));

    // return the uploaded image's info (ie accessable url)
    return imageUpload;
    
}

// Add click handler to the create button
document.querySelector('.create-product').addEventListener('submit', createProductHandler);