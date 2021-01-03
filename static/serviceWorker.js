// ----- NOTE
// ----- MAKE SURE TO CHANGE THIS VERSION WHEN EXPECTATIONS ABOUT
// ----- CACHED BEHAVIOR (i.e. what assets we're caching) CHANGES
const version = "v1";
// ----- WHILE THE NEW SERVICE WORKER WILL LOAD ALONG SIDE THE NEW ONE
// ----- AND ACTIVATE WHEN NO OTHER PAGES ARE USING THE OLD ONE
// ----- CACHE CONTENT IS NOT MANAGED IN A SIMILAR WAY
// ----- THUS WE NEED TO EXPLICITLY VERSION THE WORKER'S CACHES SO THAT
// ----- WE AREN'T STUCK SERVING CONTENT FROM AN OBSLETE CACHE

const staticContentCacheName = `static-${version}`;
const fontString = "https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;700&family=Poppins:wght@600;900&display=swap";

async function primeCache () {
  const cache = await caches.open(staticContentCacheName);

  const fontRequest = new Request(fontString);
  cache.add(fontRequest);
  const css = await (await fetch(fontRequest)).text();

  const fontDataUrls = css.matchAll(/url\((.*)\) format\(.*\);/g);
  for (let match of fontDataUrls) {
    if (match[1]) {
      cache.add(match[1]);
    }
  }
}

async function clearOldCaches () {
  const expectedCaches = [staticContentCacheName];
  const existingCaches = await caches.keys();
  return await Promise.all(existingCaches.map(cache => {
    if (!expectedCaches.includes(cache)) {
      return caches.delete(cache);
    }
  }));
}

async function cacheContentOrFetch (request) {
  const cacheValue = await caches.match(request);
  if (cacheValue) {
    return cacheValue;
  } else {
    return fetch(request);
  }
}

self.addEventListener("install", (event) => {
  return event.waitUntil(primeCache());
});

self.addEventListener("activate", (event) => {
  return event.waitUntil(clearOldCaches());
});

self.addEventListener("fetch", (event) => {
  return event.respondWith(cacheContentOrFetch(event.request));
});