// Handle logout button click
const logout = async () => {

  // Attempt to log out
  
  const response = await fetch('/api/users/logout', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  // If successful, redirect the browser to the public homepage
  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
};

// Set up event handler
document.querySelector('#logout').addEventListener('click', logout);
