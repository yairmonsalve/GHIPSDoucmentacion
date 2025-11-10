# Gestión PQR – Frontend (Ionic/Angular)

Aplicación SPA/PWA para registro de PQRS, consulta de estado y encuesta de satisfacción. Construida con Angular 16 + Ionic 7. Este repositorio contiene únicamente el frontend; las APIs de negocio/documental se configuran vía `src/environments/*`.

## Documentación de Auditoría

Consulte el documento completo con arquitectura, seguridad, métricas, interoperabilidad y procedimientos operativos:

- docs/Auditoria_EMR_PQRS.md
- docs/Diagrama_Arquitectura.md (Diagramas Mermaid de componentes y flujos)
- docs/Pruebas_Carga_Template.md (Plantilla para documentar pruebas de carga y estrés)
- docs/SECURITY.md (Guía de seguridad y backlog de controles)

## Requisitos previos

- Node.js 18
- npm 9+

## Instalación

```powershell
npm install
```

## Ejecución en desarrollo

```powershell
npm start
```

La app se servirá en `http://localhost:4200/`.

## Build de producción

```powershell
npm run build
```

La salida se genera en `www/` (configurado en `angular.json`). Para IIS, se incluye `src/web.config` con rewrite para rutas Angular y redirección a HTTPS.

## Configuración de ambientes

- `src/environments/environment.ts` (desarrollo)
- `src/environments/environment.test.ts` (testing)
- `src/environments/environment.prod.ts` (producción)

Endpoints principales:
- `environment.apiDocumentalUrl`
- `environment.apiGhips`

## Stack principal

- Angular 16, Ionic 7, TypeScript 5, RxJS 7, SweetAlert2, @ng-select/ng-select, Capacitor 5.

## CI/CD

Pipeline de Azure DevOps (`azure-pipelines.yml`): Node 18, `npm install` y `npm run build`.

## Licencia

© GHIPS. Uso interno. 

