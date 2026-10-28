/* Ghép css + js vào một tệp HTML duy nhất để xem thử và đăng nhanh */
const fs = require('fs');
const p = __dirname;

const css  = fs.readFileSync(p + '/css/style.css', 'utf8');
const data = fs.readFileSync(p + '/js/data.js', 'utf8');
const app  = fs.readFileSync(p + '/js/app.js', 'utf8');

const html = fs.readFileSync(p + '/index.html', 'utf8')
  .replace('<link rel="stylesheet" href="css/style.css">', '<style>\n' + css + '\n</style>')
  .replace('<script src="js/data.js"></script>\n<script src="js/app.js"></script>',
           '<script>\n' + data + '\n' + app + '\n</script>');

fs.mkdirSync(p + '/dist', { recursive: true });
fs.writeFileSync(p + '/dist/index.html', html);
console.log('dist/index.html — ' + (html.length / 1024).toFixed(1) + ' KB');
