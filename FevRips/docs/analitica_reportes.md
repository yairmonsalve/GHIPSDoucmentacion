# Herramientas o módulos de analítica

## Reportes RIPS y Facturación
- Controladores API: `ReportesRipsController`, `TransationController`, `Reportes` vía Web.
- Exportaciones: Excel (ClosedXML, EPPlus) y PDF (QuestPDF, iText7).
- Logs: `TransaccionesFevRipsLogs`, `FacturaElectronicaLogs` para KPIs operativos.

## KPIs sugeridos
- Tiempo promedio de validación RIPS (ms).
- Latencia envío DIAN vs respuesta.
- Nº facturas emitidas por tenant / día.
- Nº transacciones con error vs exitosas.
- Tiempo promedio de generación PDF/UBL.
- Reintentos BD (contados por lógica `SaveChangesAsync`).

## Dashboards (propuesta)
Integrar capa de métricas en Prometheus/Grafana o Azure Application Insights:
- Panel de performance DB (DTU/CPU, retries).
- Panel de colas de trabajo (tareas pendientes, edad promedio en cola).
- Panel de facturación (facturas por estado: generada, enviada, validada, rechazada).

## Estrategia de instrumentación
1. Agregar eventos `ILogger` estructurados para hitos (inicio/fin proceso RIPS, generacion UBL, envío DIAN).
2. Exponer endpoint `/metrics` (Prometheus) vía paquete `prometheus-net.AspNetCore` (pendiente de instalación).
3. Trazas distribuidas (OpenTelemetry) para flujos críticos: Solicitud -> Servicio -> DB -> DIAN.
4. Métricas personalizadas (counter/gauge) para tiempos y conteos; usar `Meter` .NET.

## BI futuro
- Cubo de facturación (dimensiones: Tenant, Fecha, TipoDocumento, Estado).
- Segmentación de errores y causas raíz (correlando logs y excepciones).
