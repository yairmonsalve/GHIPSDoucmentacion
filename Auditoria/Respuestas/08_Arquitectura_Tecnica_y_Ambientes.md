# Arquitectura técnica y ambientes requeridos

## Despliegue EMR (on‑prem / híbrido)
- Capa de usuarios → LB → IIS Web Farm → API/App servers → SQL Server (Primary/Secondary AlwaysOn) → File Server.
- Integraciones: Azure Storage/AD/Power BI; MIPRES; Telemedicina.

## Especificaciones
- Web/App: Windows Server 2012 R2+ / IIS 8.5+, .NET 4.5.2–4.6.1, WebSockets, compresión dinámica.
- BD: SQL Server 2012+; Agent/FTS/SSRS; RAM 16–32+ GB; SSD logs/tempdb.
- Servicios Windows: reinicio automático; scheduler.

## Ambientes
- Desarrollo/Review/Testing/Integración/Release + Producción por institución (on‑prem) y SaaS por tenant.
- FevRips: contenedores Docker (API/DB); TLS en Kestrel.

## Referencias
- Asistencial/Documentacion_Arquitectura_General_GHIPS_EMR.md §7
- FevRips/docs/arquitectura_tecnica_ambientes.md
- Activos/ambientes.md
- Financiero/05_Escalabilidad_y_Desempeno.md §5.1–5.2
