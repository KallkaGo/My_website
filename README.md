# My_website
Personal homepage built with React, Three.js, and Vite.

Use pnpm 9.15.9 (recorded in `package.json`) with Node.js 18 or newer:

```sh
pnpm install --frozen-lockfile
pnpm dev
```

For a production build and local preview:

```sh
pnpm build
pnpm preview
```

`pnpm-lock.yaml` is the dependency lockfile. Project and article thumbnails use WebP;
WebGL textures retain their original format. Background music loads after playback
is requested.
