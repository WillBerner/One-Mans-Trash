function changeZip() {
    let newZip = document.getElementById("myInput").value;
    let oldZipCode = document.getElementById("zipCode");

    // Only update if a new zipcode was actually given
    if (newZip) {
        oldZipCode.textContent = newZip
    }

};
