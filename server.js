const express = require('express');
const webpush = require('web-push');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const VAPID_PUBLIC_KEY = 'SUA_VAPID_PUBLIC_KEY_AQUI';
const VAPID_PRIVATE_KEY = 'SUA_VAPID_PRIVATE_KEY_AQUI';

webpush.setVapidDetails(
  'mailto:seuemail@exemplo.com',
  VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY
);

app.post('/send-missao', async (req, res) => {
  const { subscription, message } = req.body;

  if (!subscription || !subscription.endpoint) {
    return res.status(400).json({ error: 'Subscription inválida.' });
  }

  const payload = JSON.stringify({
    title: '🎯 MISSÃO DIÁRIA',
    body: message
  });

  try {
    await webpush.sendNotification(subscription, payload);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Erro no envio:', err);
    return res.status(err.statusCode || 500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
