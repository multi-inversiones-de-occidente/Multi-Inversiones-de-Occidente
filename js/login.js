// js/login.js

const form   = document.getElementById('login-form');
const btn    = document.getElementById('btn-login');
const errMsg = document.getElementById('error-message');

form.addEventListener('submit', async e => {
  e.preventDefault();
  errMsg.textContent = '';
  btn.disabled   = true;
  btn.textContent = 'Cargando…';

  const email    = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  try {
    // 1) Autenticar usuario
    const { user } = await auth.signInWithEmailAndPassword(email, password);
    const uid = user.uid;

    // 2) Traer datos de Firestore
    const userDoc = await db.collection('users').doc(uid).get();
    if (!userDoc.exists) {
      throw new Error('No se encontró información del usuario.');
    }
    const { rol } = userDoc.data();

    // 3) (Opcional) Actualizar token FCM
    try {
      const token = await messaging.getToken();
      if (token) {
        await db.collection('users').doc(uid).update({ notificationToken: token });
      }
    } catch (_) {}

    // 4) Redirigir según rol
    const rutas = {
      user:             'usuario.html',
      analista_credito: 'analista_credito_panel.html',
      caja:             'caja.html',
      asesorCobros:     'asesor_cobros.html',
      admin:            'admin_panel.html',
      ejecutivo:        'ejecutivo_panel.html',
      gerente:          'gerente_panel.html'
    };
    window.location.href = rutas[rol] || 'usuario.html';

  } catch (err) {
    errMsg.textContent = err.message || 'Error al iniciar sesión.';
  } finally {
    btn.disabled   = false;
    btn.textContent = 'Iniciar Sesión';
  }
});
