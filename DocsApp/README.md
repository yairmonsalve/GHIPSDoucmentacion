# GHIPS Docs Admin App

Aplicación local para visualizar, organizar y editar la documentación (Markdown) del repositorio GHIPS.

- Backend: Node.js + Express (API REST)
- Render Markdown: marked (server-side)
- Frontend: HTML/JS estático servido por Express

## Requisitos

- Node.js LTS (18+)

## Uso (PowerShell en Windows)

```powershell
# 1) Ir a la carpeta del app
cd c:\WorkAreaGhips\GHIPSDoucmentacion\DocsApp

# 2) Instalar dependencias
npm install

# 3) Ejecutar el servidor
npm start
# Abre el navegador en http://localhost:5080
```

## Características

- **Árbol de directorios** (limitado a: Activos, Asistencial, FevRips, Financiero, PQRS, Auditoria)
- **Visualización Markdown** con resaltado de sintaxis (highlight.js)
- **Edición** con toolbar (Negrita, Itálica, Enlace, Código, H3)
- **Búsqueda global** de texto en todos los documentos
- **Exportar PDF** del archivo actual (botón en tabs)
- **Exportar diagramas Mermaid** a PNG (botón en cada bloque ```mermaid)
- **Guardar cambios** con validación de modificaciones

## Seguridad y límites

- Se valida el acceso para que sólo se puedan leer/escribir archivos dentro de las carpetas permitidas
- No se exponen archivos fuera del repositorio
- Límite de tamaño de body a 5MB por defecto (ajustable)

## Estructura

```
DocsApp/
  package.json
  server/
    index.js
  public/
    index.html
```

## Personalización

- Para añadir más carpetas al árbol, edite la constante ALLOW_DIRS en `server/index.js`.
- Para servir el frontend desde otra ubicación o framework, substituya el contenido de `/public`.

## Notas

- Esta app está pensada para uso local por el equipo (TEAM GHIPS) en actividades de auditoría y documentación.
- No requiere base de datos; opera sobre los archivos Markdown del repositorio.
