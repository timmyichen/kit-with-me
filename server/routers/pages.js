const router = require('express-router-async')();
const nextjs = require('../lib/next');

router.getAsync('/', async (req, res) => {
  const html = await nextjs.render(req, res, 'index', req.url);
  nextjs.sendHTML(res, html, req.method);
});

module.exports = router;
