# Indicadores y Métricas de Monitoreo, Capacidad, Desempeño, Disponibilidad y Utilización

Aviso: métricas y umbrales pueden variar por ambiente.

## 1. Disponibilidad
- Uptime IIS (API y Web): meta ≥ 99.5% inicial / ≥ 99.9% futuro
- Éxito de health checks (/health o ping): ≥ 99.9%
- Errores 5xx por hora: p95 = 0, p99 < 5

## 2. Desempeño
- Latencia API p95: < 500 ms (GET), < 1.5 s (POST procesos)
- Throughput: req/s por endpoint clave (Compras, Despacho)
- Tiempo generación reportes SSRS: p95 < 10 s

## 3. Capacidad y Utilización
- Uso CPU IIS worker: p95 < 70%
- Memoria worker: < 75% del límite app pool
- Conexiones SQL activas: < 70% del max pool
- Tamaño base (OLTP): crecimiento mensual < 10% (sin archivos)
- Jobs ETL: ventana < 30 min, fallo = 0 por semana

## 4. Calidad
- Tasa de devoluciones: < 3%
- Exactitud costo promedio: variación < 2%
- Integridad movimientos: 0 registros huérfanos (auditoría FK)

## 5. Seguridad Operativa
- Intentos de login fallidos: alertar p95 > umbral
- Tokens expirados vs válidos: ratio esperado
- Eventos NLog por severidad (Error/Fatal): 0 críticos sin ticket

## 6. Recolección e Instrumentación
- Logs: NLog a archivos + rotación diaria; envío a SIEM (opcional)
- Performance counters IIS/SQL Server
- APM recomendado: Application Insights / Elastic APM
- Exporter: Prometheus-net (custom) para métricas app

## 7. Alertamiento (ejemplos)
- HTTP 5xx > 5/min por 3 min → Critical
- Latencia p95 endpoint /api/Compras > 2 s por 5 min → Warning
- CPU > 85% por 10 min → Warning
- Conexiones SQL > 85% del pool por 5 min → Critical
- Job ETL fallido → Critical

## 8. Tablero de Control (Sugerido)
- Disponibilidad por servicio (Web/API/DB/SSRS)
- Rendimiento por endpoint top 10
- Estado de ETL y reportes
- KPIs de inventario y compras (ver analitica.md)

## 9. Procedimiento Operativo (resumen)
1) Monitoreo continuo 24x7 con alertas
2) Runbook de respuesta por tipo de alerta
3) Postmortem para incidentes severos
4) Revisión semanal de tendencias y capacidad

## 10. Métricas por Entorno
- Dev: sólo latencia funcional y errores
- Test: stress/load con metas de preproducción
- Prod: metas completas arriba definidas
