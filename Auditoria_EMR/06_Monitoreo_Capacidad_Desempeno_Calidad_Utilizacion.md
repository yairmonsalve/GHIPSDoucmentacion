# Indicadores y Métricas: Monitoreo, Capacidad, Desempeño, Calidad y Utilización
[[ _TOC_ ]]

Fecha: 12/11/2025

## Objetivos y SLAs
- Disponibilidad: Web 99.5% / BD 99.9% / Servicios críticos 99.5%.
- Latencia: API P95 < 500 ms; WCF P95 < 700 ms; SignalR < 300 ms.
- Batch regulatorios (RIPS): < 120 min por ciclo.
- Capacidad: CPU App < 70%; uso de pool SQL < 75%; caché hit > 80%.

## Métricas técnicas
- Disponibilidad: uptime por componente (web, API, servicios, DB).
- Desempeño: p50/p95 por endpoint; throughput; tiempos de consultas críticas.
- Capacidad: CPU/RAM/disk/IOPS; conexiones activas; sesiones SignalR.
- Calidad: eventos adversos, consistencia de datos, tasa de rechazo externo.
- Utilización: usuarios activos por módulo; reportes/día; PDFs generados/día.

## Observabilidad y alertas
- Enterprise Library Logging para eventos y correlación.
- Dashboards Power BI con KPIs de operación y capacidad.
- Alertas: health checks, reintentos, latencia fuera de umbrales, deadlocks DB, jobs fallidos.

## Pruebas representativas (resumen)
- 1.000 usuarios concurrentes: latencia API ≈320 ms (cumple SLA).
- 2.500 usuarios (estrés): pico 780 ms; se recomienda escalar App Servers.
- SignalR: 5.000 conexiones con notificación ≈200 ms.

Fuentes: `Asistencial/Documentacion_Escalabilidad_Desempeno_GHIPS_EMR.md`, `Activos/monitoreo.md`.