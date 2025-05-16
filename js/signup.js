// js/signup.js
const form     = document.getElementById('register-form');
const btn      = document.getElementById('btn-register');
const errorDiv = document.getElementById('error-message');

form.addEventListener('submit', async e => {
  e.preventDefault();
  errorDiv.textContent = '';
  btn.disabled   = true;
  btn.textContent = 'Registrando…';

  const nombre       = form.nombre.value.trim();
  const email        = form.email.value.trim();
  const pass         = form.password.value;
  const pass2        = form['confirm-password'].value;
  const genero       = form.genero.value;
  const departamento = form.departamento.value;

  if (pass !== pass2) {
    errorDiv.textContent = 'Las contraseñas no coinciden.';
    btn.disabled   = false;
    btn.textContent = 'Registrarse';
    return;
  }

  try {
    const { user } = await auth.createUserWithEmailAndPassword(email, pass);
    const uid = user.uid;
    let token = null;
    try { token = await messaging.getToken(); } catch {}
    await db.collection('users').doc(uid).set({
      nombre,
      email,
      rol: 'user',
      departamento,
      genero,
      estrellas: 5,
      fecha_registro: firebase.firestore.FieldValue.serverTimestamp(),
      notificationToken: token
    });
    window.location.href = 'login.html';
  } catch (err) {
    errorDiv.textContent = err.message || 'Error al registrar.';
  } finally {
    btn.disabled   = false;
    btn.textContent = 'Registrarse';
  }
});
