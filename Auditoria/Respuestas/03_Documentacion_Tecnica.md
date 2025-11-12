# Documentación técnica de la solución (consolidado)

## Patrones y estilo
- N‑Tier + SOA; DI con Unity; Repository/Service Layer/DTO/Factory.
- Caching y Logging corporativos (Enterprise Library).

## Configuración por ambientes
- EMR: Debug/Release/Review/Testing/Integracion + tenants SaaS/on‑prem (14+ variantes).
- Financiero: Dev/QA/Integración/Release/Prod; configuraciones de reportes SSRS.
- FevRips: appsettings por ambiente; docker compose productivo local; TLS en Kestrel.

## Observabilidad
- Logs: Enterprise Library (EMR), NLog (Financiero/FevRips/Activos).
- Recomendado: Application Insights / OpenTelemetry.

## Referencias
- Asistencial/Documentacion_Arquitectura_GHIPS_EMR.md §2
- Asistencial/Documentacion_Arquitectura_General_GHIPS_EMR.md §2
- Activos/tecnica.md
- Financiero/01_Arquitectura_y_Componentes.md
- FevRips/docs/arquitectura.md
