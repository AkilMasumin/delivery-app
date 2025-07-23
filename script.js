const scriptURL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL';

document.getElementById('deliveryForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;
  const photoFile = document.getElementById('photo').files[0];

  let photoData = '';
  if (photoFile) {
    const reader = new FileReader();
    reader.onload = async () => {
      photoData = reader.result; // base64
      submitForm(photoData);
    };
    reader.readAsDataURL(photoFile);
  } else {
    submitForm('');
  }

  function submitForm(photo) {
    const formData = {
      driver: form.driver.value,
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
    .then(msg => alert("Submitted!"))
    .catch(err => alert("Error: " + err.message));
  }
});
