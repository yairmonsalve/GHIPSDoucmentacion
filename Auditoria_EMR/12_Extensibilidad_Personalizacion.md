# Extensibilidad y Personalización
[[ _TOC_ ]]

Fecha: 12/11/2025

## Política de versiones y ciclo de liberación
- Esquema de ramas: Git Flow (feature/, hotfix/, release/). PR y revisión obligatoria.
- Versionado semántico recomendado para entregables (Mayor.Menor.Patch).
- Ciclo: Integración continua (Integracion), QA (Testing), UAT (Release), Producción.
- Notas de versión y checklist de despliegue por componente (Web, APIs, Servicios Windows, BD).

## Procedimientos para migraciones de versión
- Pre‑requisitos: respaldo completo de BD y storage; verificación de compatibilidad de esquemas.
- Orden sugerido: Base de datos → Servicios Windows → APIs → Web.
- Scripts de base de datos: controlados por DBA; planeación de ventanas y rollback.
- Validación post‑despliegue: health checks, smoke tests, revisión de logs, métricas clave.

## Lineamientos para desarrollo de extensiones/personalizaciones
- Principios: no modificar núcleo; usar interfaces/contratos e inyección de dependencias (Unity).
- Extensiones: empaquetar en proyectos separados (plugins) con configuración por tenant.
- UI: componentes en `libGHIPS.Presentacion` reutilizables; evitar duplicación.
- Reportes: agregar nuevos RDLC sin alterar existentes; parametrización.
- Integraciones: usar `Ips.Gestion.Ghips.Connect` (adapters) para desacoplar proveedores.

## Estrategia para no afectar transaccionalidad y funcionalidad estándar
- Aislamiento por configuración (multi‑tenant) y flags de características.
- Versionado de contratos (APIs/WCF) y DTOs para compatibilidad hacia atrás.
- Pruebas automatizadas de regresión en módulos críticos; validación de performance.
- Auditoría y feature toggles para despliegues controlados.

Fuentes: `Asistencial/README.md`, `Activos/extensibilidad.md`.