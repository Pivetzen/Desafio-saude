self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : {};
  
  const title = data.title || '🎯 Missão Diária';
  const options = {
    body: data.body || 'Você tem uma nova missão agendada!',
    icon: 'https://cdn-icons-png.flaticon.com/512/3119/3119338.png',
    badge: 'https://cdn-icons-png.flaticon.com/512/3119/3119338.png',
    vibrate: [100, 50, 100]
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});
