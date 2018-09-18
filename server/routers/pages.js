const router = require('express-router-async')();
const nextjs = require('../lib/next');

router.getAsync('/', async (req, res) => {
  const html = await nextjs.render(req, res, 'index', req.url);
  nextjs.sendHTML(res, html, req.method);
});

const staticPages = ['about', 'privacy'];

staticPages.forEach(page =>
  router.getAsync(`/${page}`, async (req, res) => {
    const html = await nextjs.render(req, res, page, req.url);
    nextjs.sendHTML(res, html, req.method);
  }),
);

router.getAsync(['/signup', '/login'], async (req, res) => {
  const html = await nextjs.render(req, res, 'auth', req.url);
  nextjs.sendHTML(res, html, req.method);
});

module.exports = router;
