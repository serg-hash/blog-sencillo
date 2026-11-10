# Contribuir a blog-sencillo

Gracias por querer mejorar esta plantilla. El objetivo es que cualquiera pueda autoalojar un blog en Markdown **sin secretos, sin rastreo y sin servicios de pago**.

## Cómo trabajar

1. Haz un fork y clona el repositorio.
2. Crea una rama descriptiva: `git checkout -b feat/mi-cambio`.
3. Instala y arranca el sitio:

   ```bash
   npm install
   npm run dev
   ```

4. Comprueba tipos y el build estático (incluye una pasada con la ruta base de GitHub Pages):

   ```bash
   npm run check
   npm run build
   SITE_URL=https://example.github.io/blog-sencillo BASE_PATH=/blog-sencillo npm run build
   ```

5. Abre un pull request hacia `main` explicando el cambio (en español o inglés).

La demo pública se genera con [`.github/workflows/pages.yml`](.github/workflows/pages.yml) al empujar a `main`. En un fork, GitHub Pages queda en `https://TU_USUARIO.github.io/TU_REPO/` después de **Settings → Pages → Source: GitHub Actions**.

## Qué encaja bien

- Mejoras de accesibilidad, rendimiento o SEO.
- Traducciones (la UI ya cubre ES/EN; las cadenas viven en `src/i18n.ts`).
- Estilos o componentes que no añadan dependencias de runtime.
- Documentación más clara y artículos de ejemplo en `content/posts/` (sin personajes con copyright ni personas reales distintas del autor).

## Qué no encaja

- Analítica, píxeles o fuentes cargadas desde CDN de terceros.
- Servicios de pago o claves de API.
- Dependencias de runtime innecesarias: el sitio debe seguir siendo estático (`npm run build` → carpeta `dist/`).
- Un CMS o base de datos. El contrato es: **un archivo Markdown = un artículo**.

## Estilo

- Un solo archivo de personalización: `src/config.ts`.
- Comentarios bilingües (ES/EN) cuando el cambio sea para quien customiza, no para quien mantiene el código.
- HTML semántico, contraste suficiente, `:focus-visible` visible.
- `prefers-reduced-motion` respetado.
- Enlaces internos y assets pasan por `withBase()` / `joinBase()` para que el sitio funcione también bajo `/nombre-del-repo/` en GitHub Pages.

## Código de socio de Hostinger (solo maintainers)

El botón **Deploy on Hostinger** del README apunta a:

`https://www.hostinger.com/deploy?template=serg-hash/blog-sencillo`

Si más adelante hay un código de referido o del programa de partners, **añádelo como** `&ref=CODIGO` **en esa URL**. No subas un placeholder (`TU_CODIGO_SOCIO` o similar): o va el código real, o no va el parámetro.

## Código de conducta

Sé respetuoso. No se aceptan contribuciones ofensivas ni spam. Los artículos de ejemplo deben seguir siendo guías de uso del blog, no contenido de terceros.

---

# Contributing (English)

Fork, branch, `npm install` / `npm run dev`, then `npm run check` and `npm run build`. Also run a Pages-style build (`SITE_URL` + `BASE_PATH=/blog-sencillo`) so subdirectory links stay intact. Open a PR against `main`.

Keep the project static, tracker-free, and secret-free. Example posts must stay original how-to guides. UI copy lives in `src/i18n.ts`; site name, author and socials live in `src/config.ts`; posts live in `content/posts/`. Prefix internal URLs with `withBase()` so GitHub Pages can serve the repo from `/blog-sencillo/`.

**Hostinger referral (maintainers):** the README deploy button has no `ref` query. When a real partner code exists, append `&ref=CODE` to `https://www.hostinger.com/deploy?template=serg-hash/blog-sencillo`. Never commit a placeholder.
