---
title: "Bienvenida a blog-sencillo"
description: "Qué es este blog, para quién es y cómo funciona: un archivo Markdown por artículo y un sitio estático listo para publicar."
date: 2026-10-28
tags: ["inicio", "markdown"]
cover: "/covers/bienvenida.png"
draft: false
---

**blog-sencillo** es una plantilla de blog estática. No hay panel de administración ni base de datos: cada artículo es un archivo `.md` en `content/posts/`. Añades el archivo, construyes el sitio y ya está publicado.

Está pensada para quien quiere escribir sin montar un CMS, autoalojar en Hostinger (Node.js o un VPS con Docker) y mantener el control del código.

## Lo que hace el sitio

- Lista los artículos de más nuevo a más antiguo.
- Genera una página por artículo, páginas por etiqueta y paginación.
- Incluye RSS, sitemap, metadatos Open Graph y tiempo de lectura.
- La interfaz está en español (por defecto) e inglés. Los textos de botones y menús viven en `src/i18n.ts`.
- Nombre, autor, redes y URL pública se editan en un solo archivo: `src/config.ts`.

## Cómo está organizado

```text
content/posts/     ← tus artículos
src/config.ts      ← nombre, autor, redes, paginación
src/i18n.ts        ← cadenas de la interfaz
public/            ← imágenes, favicon, portadas
```

El resto (`src/pages`, Docker, CI) solo te importa si quieres cambiar el diseño o el despliegue.

## El siguiente paso

Si acabas de clonar el repositorio, lee [Cómo escribir un artículo](/articulo/escribir-un-articulo) y luego [Cómo publicar el blog](/articulo/publicar-el-blog). Cambia `src/config.ts` por tus datos antes de subirlo a producción.
