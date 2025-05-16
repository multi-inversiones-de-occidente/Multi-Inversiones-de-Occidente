// js/login.js

const form   = document.getElementById('login-form');
const btn    = document.getElementById('btn-login');
const errMsg = document.getElementById('error-message');

form.addEventListener('submit', async e => {
  e.preventDefault();
  errMsg.textContent = '';
  btn.disabled   = true;
  btn.textContent = 'Cargando…';

  const email    = form.email.value.trim();
  const password = form.password.value.trim();

  try {
    const { user } = await auth.signInWithEmailAndPassword(email, password);
    const uid = user.uid;

    const userDoc = await db.collection('users').doc(uid).get();
    if (!userDoc.exists) throw new Error('No se encontró información del usuario.');

    const { rol } = userDoc.data();

    try {
      const token = await messaging.getToken();
      if (token) {
        await db.collection('users').doc(uid).update({ notificationToken: token });
      }
    } catch (_) {}

    const rutas = {
      user:             'usuario.html',
      analista_credito: 'analista_credito_panel.html',
      caja:             'caja.html',
      asesorCobros:     'asesor_cobros.html',
      admin:            'admin_panel.html',
      ejecutivo:        'ejecutivo_panel.html',
      gerente:          'gerente_panel.html'
    };
    window.location.href = rutas[rol] || 'login.html';

  } catch (err) {
    errMsg.textContent = err.message || 'Error al iniciar sesión.';
  } finally {
    btn.disabled   = false;
    btn.textContent = 'Iniciar Sesión';
  }
});
