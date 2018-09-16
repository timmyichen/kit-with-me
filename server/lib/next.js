const next = require('next');

const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });
const ready = app.prepare();

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
  app,
  render,
  sendHTML,
};
