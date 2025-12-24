self.addEventListener('fetch', (event) => {
  if (event.request.method === 'POST' && event.request.url.includes('/upload')) {
    event.respondWith((async () => {
      const formData = await event.request.formData();
      const file = formData.get('photos');
      
      // Store file in Cache API temporarily to pass it to the page
      const cache = await caches.open('shared-photos');
      await cache.put('/shared-file', new Response(file));
      
      // Redirect to the channel's index page
      return Response.redirect('./?shared=true', 303);
    })());
  }
});