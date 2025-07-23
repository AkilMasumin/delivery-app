// Login Handling
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const username = this.username.value.trim();
  const role = this.role.value;

  if (!username || !role) return alert("All fields required");

  localStorage.setItem("user", username);
  localStorage.setItem("role", role);

  if (role === "driver") {
    window.location.href = "driver.html";
  } else if (role === "sales") {
    window.location.href = "index.html";
  }
});

// Delivery Form Handling
const scriptURL = 'AKfycbyWfNMACEMCJsXjKaPgX30LVe2GY0JAVwlMcjpEDX8';

document.getElementById('deliveryForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;
  const photoFile = document.getElementById('photo').files[0];

  let photoData = '';
  if (photoFile) {
    const reader = new FileReader();
    reader.onload = () => submitForm(reader.result);
    reader.readAsDataURL(photoFile);
  } else {
    submitForm('');
  }

  function submitForm(photo) {
    const formData = {
      driver: localStorage.getItem("user") || form.driver.value,
      customer: form.customer.value,
      document: form.document.value,
      status: form.status.value,
      payment: form.payment.value,
      returns: form.returns.value,
      photo: photo
    };

    fetch(scriptURL, {
      method: 'POST',
      body: JSON.stringify(formData)
    })
    .then(res => res.text())
    .then(() => alert("Delivery submitted!"))
    .catch(err => alert("Error: " + err.message));
  }
});
