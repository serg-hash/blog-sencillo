---
title: "Cómo escribir un artículo"
description: "Frontmatter, etiquetas, portada, borradores y dónde colocar el archivo Markdown para que aparezca en el blog."
date: 2026-10-30
tags: ["markdown", "guia"]
cover: "/covers/escribir.png"
draft: false
---

Cada artículo es un archivo Markdown en la carpeta `content/posts`. El nombre del archivo, sin extensión, es la URL: `hola-mundo.md` se publica en `/articulo/hola-mundo`.

## Cabecera (frontmatter)

Al inicio del archivo, entre tres guiones, van los metadatos:

```yaml
---
title: "Título que se ve en la portada"
description: "Resumen corto para listados, RSS y redes."
date: 2026-11-02
tags: ["markdown", "guia"]
cover: "/covers/escribir.png"
draft: false
---
```

| Campo | Obligatorio | Qué hace |
| --- | --- | --- |
| `title` | sí | Título del artículo |
| `description` | sí | Resumen en tarjetas, RSS y SEO |
| `date` | sí | Orden (los más nuevos primero) |
| `tags` | no | Páginas de etiqueta y nubes de temas |
| `cover` | no | Imagen de portada |
| `draft` | no | Oculto en producción si es `true` |

Si `draft: true`, el artículo **no** se incluye en el `npm run build` de producción. En `npm run dev` sí lo verás, con una etiqueta de borrador.

## Cuerpo

Debajo del frontmatter escribes Markdown normal: títulos, listas, enlaces, código, citas e imágenes.

```markdown
![Un esquema del escritorio](/covers/escribir.png)

El tiempo de lectura se calcula solo a partir del texto.
```

Las imágenes que enlaces desde el artículo deben vivir en `public/` (por ejemplo `public/covers/mi-foto.jpg` → `/covers/mi-foto.jpg`).

## Después de guardar

```bash
npm run dev
```

Abre [http://localhost:4321](http://localhost:4321): el artículo nuevo aparece en la portada, en sus etiquetas, en el RSS y en el sitemap. No hace falta registrar nada más.

Cuando quieras publicarlo de verdad, sigue [Cómo publicar el blog](/articulo/publicar-el-blog).
