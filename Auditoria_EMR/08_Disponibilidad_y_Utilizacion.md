# Indicadores y Métricas: Disponibilidad y Utilización
[[ _TOC_ ]]

Fecha: 12/11/2025

## Disponibilidad
- Uptime mensual objetivo: Web 99.5%, Servicios Windows 99.5%, SQL Server 99.9% con AlwaysOn.
- Health checks cada 60 s; LB retira nodos no saludables.
- Backups a Azure Storage (full/diff/log) y restauraciones validadas.

## Utilización
- Usuarios concurrentes por módulo; sesiones SignalR; carga por horario.
- Reportes ejecutados/día; volumen de órdenes y resultados.
- Crecimiento de base (archivos y tablas críticas); IOPS.

## Alertamiento
- SQL Agent Alerts por deadlocks y tiempos de consulta.
- Señales push (SignalR) y correo (SendMail) ante fallos de servicios.

Fuentes: `Asistencial/Documentacion_Arquitectura_General_GHIPS_EMR.md`, `Asistencial/Documentacion_Escalabilidad_Desempeno_GHIPS_EMR.md`, `Activos/monitoreo.md`.