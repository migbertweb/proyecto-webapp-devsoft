# Plan de Mejoras — DevSoft Turismo

## Estrategia

Se implementarán los fixes en 6 fases, cada fase en su propia rama con un PR
que cierra los issues correspondientes. El orden minimiza conflictos de merge
porque los archivos compartidos se modifican una sola vez.

## Fases

### Fase 1 — Fundación (toasts + utilidad)
- `#16` — Gradiente repetido extraído a clase utilitaria
- `#5` — Sistema de notificaciones Toast
Rama: `fix/toast-utility`
Archivos: `app/globals.css`, `components/ui/Toast.tsx`, parches en consumidores

### Fase 2 — Bugfixes formularios admin
- `#1` — Errores de validación visibles en modales
- `#6` — Modales cierran con Escape y click fuera
Rama: `fix/admin-form-ux`
Archivos: `app/admin/items/ItemsClient.tsx`, `app/admin/cities/CitiesClient.tsx`

### Fase 3 — Pulido visual
- `#14` — Botón WhatsApp con color de la paleta
- `#15` — Pills de categoría con íconos
- `#10` — Favorito con animación
- `#12` — Placeholder blur en imágenes
Rama: `feat/visual-polish`
Archivos: `ItemDetailClient.tsx`, `HomeClient.tsx`, `ItemCard.tsx`, `FavoriteButton.tsx`

### Fase 4 — Layout responsive
- `#3` — Navbar con menú hamburger en mobile
- `#4` — Footer en páginas públicas
- `#2` — Sidebar admin colapsable en mobile
Rama: `feat/responsive-layout`
Archivos: `Navbar.tsx`, `admin/layout.tsx`, `Footer.tsx`

### Fase 5 — Features
- `#7` — Skeleton loading
- `#9` — Galería con navegación por teclado
- `#11` — Metadata SEO dinámica en item detail
Rama: `feat/skeleton-keyboard-seo`
Archivos: `loading.tsx`, `ItemDetailClient.tsx`, `item/[id]/page.tsx`

### Fase 6 — Accesibilidad + Performance
- `#13` — ARIA attributes, focus trap, roles
- `#8` — Filtro server-side con paginación (postergable si es muy grande)
Rama: `feat/a11y-performance`
Archivos: Múltiples

## Reglas de implementación
1. Cada commit referencia issues: `fix(#N): mensaje` o `feat(#N): mensaje`
2. Cada PR cierra issues: `Closes #N` en el body
3. `npm run build` antes de cada commit
4. Se mergea a `main` secuencialmente para evitar conflictos