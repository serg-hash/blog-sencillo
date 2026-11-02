---
title: "Cómo publicar el blog"
description: "Node.js local, Hostinger con un clic y Docker Compose en un VPS. Sin secretos ni servicios de pago."
date: 2026-11-01
tags: ["despliegue", "hostinger", "docker"]
cover: "/covers/publicar.png"
draft: false
---

El sitio es estático: `npm run build` deja HTML, CSS y el RSS en `dist/`. Eso es lo que publicas. No hay servidor Node en tiempo de ejecución ni variables secretas.

Antes de desplegar, pon tu URL pública en `src/config.ts` (`site.url`). Canonical, Open Graph, RSS y sitemap la usan.

## En local (Node.js)

Hace falta [Node.js 22.12+](https://nodejs.org/).

```bash
npm install
npm run build
npm run preview
```

La vista previa sirve `dist/` en [http://localhost:4321](http://localhost:4321). Cualquier host estático (Nginx, Netlify, Cloudflare Pages, GitHub Pages) puede publicar esa carpeta.

## Hostinger (Node.js / un clic)

1. Pulsa **Deploy on Hostinger** en el README del repositorio, o crea un sitio Node.js en hPanel y apunta a este repo.
2. Confirma estos valores si te los pide:

   | Campo | Valor |
   | --- | --- |
   | Tipo de aplicación | `astro` |
   | Script de build | `build` |
   | Directorio de salida | `dist` |
   | Entry file | *(vacío — es un sitio estático)* |
   | Node.js | 22 |

3. No hace falta ninguna variable de entorno.

Documentación: [Astro en Hostinger](https://docs.hostinger.com/node.js/overview-1/astro).

## Docker / VPS

```bash
docker compose up --build -d
```

El blog queda en [http://localhost:8080](http://localhost:8080). En un VPS de Hostinger, Docker Manager puede usar el `docker-compose.yml` de este repo. Para el puerto 80, cambia el mapeo a `"80:80"`.

La imagen construye el sitio con Node 22 y lo sirve con Nginx: no queda Node corriendo en producción.

## Después de cada artículo

Añade el `.md` en `content/posts/`, haz commit y vuelve a construir (o deja que Hostinger / tu CI lo hagan al empujar a `main`). GitHub Actions en este repo ya ejecuta `npm run check` y `npm run build`.
