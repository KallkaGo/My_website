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

In the project archive, entries in `src/constants/index.js` with `active: false`
display an `ENDED` stamp and an end-of-experience note without a demo/code link.
Their cover images and technology tags remain visible; other entries keep their links.
Archive cards use 18px titles, 14px descriptions, 12px tags and status stamps,
and 13px end notes. Tags and ended title rows wrap on narrow screens.
