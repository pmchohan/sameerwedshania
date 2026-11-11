// GitHub Pages has no rewrites: a copy named 404.html makes /<code> paths load the app.
import { copyFileSync } from 'node:fs';

copyFileSync('dist-next/index.html', 'dist-next/404.html');
