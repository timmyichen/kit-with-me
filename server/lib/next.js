const router = require('express-router-async')();
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';

let app;
let nextAppHandle;
let ready;

function start() {
  app = next({ dev });
  nextAppHandle = app.getRequestHandler();
  ready = app.prepare();

  ready
    .then(() => {
      const handle = (req, res) => nextAppHandle(req, res);

      router.get('/_next*', handle);
      router.get('/_webpack*', handle);
      router.get('/__webpack_hmr*', handle);
      router.get('/', handle);
    })
    .catch(err => {
      console.error(err.stack);
      process.exit(1);
    });
}

async function render(req, res, page, path, query = req.query) {
  await ready;

  const html = await app.renderToHTML(req, res, `/${page}`, {
    ...query,
    path,
  });

  return html;
}

function sendHTML(res, html, method) {
  if (res.finished) return;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Content-Length', Buffer.byteLength(html));
  res.end(method === 'HEAD' ? null : html);
}

module.exports = {
  router,
  start,
  render,
  sendHTML,
};
