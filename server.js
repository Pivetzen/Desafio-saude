const express = require('express');
const webpush = require('web-push');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const VAPID_PUBLIC_KEY = 'BHdR6O65zgqB5hRb8gX3ZQIK6j6srej3lL9uLN1FJOhSoxOlyeEyC597NReR_bBJHgb9O-u6hBnzL6YXUu_neDg';
const VAPID_PRIVATE_KEY = 'iwQHOM7r0R9le5Y5OWEcDKUZSvHGGl2CgjRElMb1BN4';

webpush.setVapidDetails(
  'mailto:matheusmaia.pmf@gmail.com',
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
