# Plantilla de Pruebas de Carga / Estrés / Rendimiento

Esta plantilla sirve para documentar resultados de performance solicitados en auditorías.

## 1. Objetivos
- Validar tiempos de respuesta (p50/p95/p99) de endpoints críticos.
- Determinar throughput sostenible y punto de saturación.
- Medir consumo de recursos en backend e infraestructura durante picos.

## 2. Alcance
- Frontend (Angular/Ionic): métricas de LCP/TTI/TBT (Lighthouse) – opcional.
- Backend (APIs externas):
  - POST SaveSolicitud
  - POST SaveFile (multipart; probar tamaños: 1MB, 5MB, 10MB)
  - GET GetEstadoRadicado
  - GET GetEnrutamiento
  - GET/POST SetRespuestasEncuesta (sugerencia: migrar a POST)

## 3. Herramientas sugeridas
- k6 / JMeter / Locust para APIs.
- Lighthouse / WebPageTest para frontend.
- App Insights / Datadog / New Relic para APM/monitoreo.

## 4. Escenarios
- Escenario 1: Carga base (N usuarios concurrentes, RPS objetivo)
- Escenario 2: Pico corto (picos 2x-3x)
- Escenario 3: Estrés (incremental hasta error rate > 5%)
- Escenario 4: Sube y adjunta archivo grande

## 5. Métricas a recolectar
- Latencia: p50, p95, p99 por endpoint
- Error rate: 4xx/5xx
- Throughput: req/s
- Tamaño de payloads: request/response/archivo
- Recursos infra: CPU/RAM/IO/Network en APIs

## 6. Criterios de aceptación (ejemplo)
- p95 SaveSolicitud < 800 ms
- p95 SaveFile (5MB) < 2.5 s
- Error rate < 1%
- Uptime 99.9% mensual

## 7. Resultados (llenar)
- Fecha:
- Versión:
- Ambiente:
- Config:
- Resumen ejecutivo:
- Detalle por endpoint (tablas/gráficas):

## 8. Hallazgos y mejoras
- Cuellos de botella:
- Optimización recomendada:
- Plan de acción:

## 9. Evidencias
- Gráficas de k6/JMeter
- Reportes Lighthouse
- Capturas de dashboards APM

---
Fin de la plantilla.
