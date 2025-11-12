# Indicadores y métricas: monitoreo, capacidad, desempeño, calidad y utilización

## Objetivos (EMR)
- Disponibilidad: Web 99.5%, BD 99.9%.
- Desempeño: API p95 < 500 ms; SignalR < 300 ms; batch RIPS < 120 min.
- Capacidad: CPU App < 70%; Pool SQL < 75%; caché hit > 80%.
- Calidad clínica: tiempos atención, ocupación, productividad, eventos adversos.
- Utilización: usuarios activos por módulo, órdenes/día, reportes/día.

## Evidencias/prácticas
- Enterprise Library Logging (categorías, DB listener); métricas de pool/caché.
- Dashboards Power BI; PerfMon/DMVs; IIS Logs.

## Referencias
- Asistencial/Documentacion_Arquitectura_General_GHIPS_EMR.md §6
- Asistencial/Documentacion_Escalabilidad_Desempeno_GHIPS_EMR.md §2
- Activos/monitoreo.md
- PQRS/docs/Auditoria_EMR_PQRS.md (propuestas frontend)
