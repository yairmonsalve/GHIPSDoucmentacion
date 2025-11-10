# Monitoreo, Capacidad y Alertamiento

## Indicadores clave
- Disponibilidad (uptime API/Web/Worker).
- Latencia endpoints críticos (login, generación factura, carga RIPS).
- Tasa de errores (4xx/5xx) y excepciones no controladas.
- Uso de recursos (CPU, RAM, disco, conexiones DB, pool threads).
- Reintentos DB (count por período) y fallos WCF.
- Tamaño y crecimiento de tablas (Transacciones, Logs, Repositorio).
- Cola de tareas: longitud y edad promedio.

## Recolección de métricas (propuesta)
- OpenTelemetry para trazas y métricas custom.
- Prometheus para scraping (endpoint /metrics).
- Exportación a Grafana para dashboards.
- Logs estructurados (JSON) con NLog -> Elastic/Seq.

## Umbrales sugeridos
- Latencia p95 generación factura < 2s.
- Errores 5xx < 1% de peticiones totales diarias.
- Reintentos DB max < 50/hora.
- Uso CPU promedio < 70% sostenido; memoria < 80%.
- Edad tareas en cola p95 < 30s.

## Alertas
- Disponibilidad servicio < 99% mensual.
- Aumento súbito de errores > 5% en 15 min.
- Latencia p95 API > 3s durante 5 ventanas consecutivas.
- Crecimiento tabla Logs > 5% diario (activar política de purga).
- Reintentos DB superan umbral.

## Procedimiento de monitoreo
1. Revisión diaria de dashboard de salud.
2. Reporte semanal de capacidad (crecimiento datos, uso recursos).
3. Auditoría mensual de seguridad y cambios de permisos.
4. Purga automática de logs históricos > 180 días (definir job Worker).

## Escalamiento proactivo
- Si tendencia de crecimiento de Transacciones > 10% semanal, evaluar aumento CPU DB.
- Si latencia en cola supera umbral p95 repetidamente, añadir instancia Worker.

## Herramientas recomendadas
- Prometheus + Grafana.
- Elastic Stack / Seq para logs.
- Azure Monitor / Application Insights (alternativa cloud).

## Registro de incidentes
Mantener playbooks para: caída DB, saturación CPU, errores DIAN masivos, degradación RIPS.
