const router = require('express-router-async')();
const nextjs = require('../lib/next');
const { asUserOrRedirect } = require('../middleware/asUser');

router.getAsync('/', async (req, res) => {
  const html = await nextjs.render(req, res, 'index', req.url);
  nextjs.sendHTML(res, html, req.method);
});

const staticPages = ['about', 'privacy'];
const authedPages = ['dashboard', 'contacts', 'my-info'];

staticPages.forEach(page =>
  router.getAsync(`/${page}`, async (req, res) => {
    const html = await nextjs.render(req, res, page, req.url);
    nextjs.sendHTML(res, html, req.method);
  }),
);

authedPages.forEach(page =>
  router.getAsync(`/${page}`, asUserOrRedirect, async (req, res) => {
    const html = await nextjs.render(req, res, page, req.url);
    nextjs.sendHTML(res, html, req.method);
  }),
);

router.getAsync(['/signup', '/login'], async (req, res) => {
  const html = await nextjs.render(req, res, 'auth', req.url);
  nextjs.sendHTML(res, html, req.method);
});

router.getAsync('/profile/:profileName', async (req, res) => {
  const html = await nextjs.render(req, res, 'profile', req.url);
  nextjs.sendHTML(res, html, req.method);
});

module.exports = router;
