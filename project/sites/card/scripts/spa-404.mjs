// GitHub Pages has no rewrites: a copy named 404.html makes /<code> paths load the app.
import { copyFileSync } from 'node:fs';

copyFileSync('dist/index.html', 'dist/404.html');
