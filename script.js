document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); 
    // Mencegah halaman refresh

    // Tampilkan pesan sedang mengirim
    document.getElementById('form-status').innerText = 'Sending...';
    document.getElementById('form-status').style.color = 'blue';

    // Ambil data dari form
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Reset error messages
    document.getElementById('name-error').style.display = 'none';
    document.getElementById('email-error').style.display = 'none';
    document.getElementById('phone-error').style.display = 'none';
    document.getElementById('subject-error').style.display = 'none';
    document.getElementById('message-error').style.display = 'none';

    // Validasi input
    let isValid = true;
    if (!name) {
        document.getElementById('name-error').style.display = 'block';
        isValid = false;
    }
    if (!email) {
        document.getElementById('email-error').style.display = 'block';
        isValid = false;
    }
    if (!phone) {
        document.getElementById('phone-error').style.display = 'block';
        isValid = false;
    }
    if (!subject) {
        document.getElementById('subject-error').style.display = 'block';
        isValid = false;
    }

    // Jika form valid, kirim data ke server
    if (isValid) {
        const formData = {
            name: name,
            email: email,
            phone: phone,
            subject: subject,
            message: message
        };

        // Kirim data menggunakan fetch()
        fetch('https://debug.nafkhanzam.com/web-programming-e03', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementById('form-status').innerText = 'Message sent successfully!';
                document.getElementById('form-status').style.color = 'green';
                // Reset form jika berhasil
                document.getElementById('contact-form').reset();
            } else {
                document.getElementById('form-status').innerText = 'Failed to send message. Please try again.';
                document.getElementById('form-status').style.color = 'red';
            }
        })
        .catch(error => {
            document.getElementById('form-status').innerText = 'An error occurred. Please try again later.';
            document.getElementById('form-status').style.color = 'red';
        });
    }
});
