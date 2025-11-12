# Arquitectura General (Visión corporativa GHIPS)

Este documento resume la arquitectura a nivel corporativo de GHIPS (EMR + módulos aledaños), consolidando las fuentes del repositorio.

## Resumen
- Estilo: arquitectura multicapa (Presentación, Servicios/APIs, Dominio, Infraestructura, Datos) con orientación a servicios.
- Tecnologías: .NET Framework 4.5–4.8 (EMR/Financiero/Activos), ASP.NET Core/.NET 8 (FevRips), Angular/Ionic (PQRS), SQL Server, SSRS.
- Despliegue: IIS web farm + App Servers + SQL Server (AlwaysOn objetivo), servicios Windows (EMR), contenedores (FevRips), integración con Azure AD/Storage/Power BI.

## Componentes principales
- EMR (Asistencial): WebForms + Web API + WCF/SOAP; Core de negocio; 8+ servicios Windows; Security/Connect/LibBD; BD con 42+ esquemas clínicos/administrativos.
- FevRips: ASP.NET Core (Web/API/Worker); EF Core; multitenancy; firma y facturación electrónica; Docker.
- Financiero: ASP.NET MVC 5 + Web API; EF6; +150 reportes SSRS; módulos Contable/Presupuesto/Tesorería/Cartera.
- Activos: ASP.NET MVC/WebForms + API REST; EF/SP; ETL/CLR; SSRS; NLog/Unity.
- PQRS: SPA Angular/Ionic; consumo de APIs documentales/GHIPS.

## Referencias
- EMR: Asistencial/Documentacion_Arquitectura_General_GHIPS_EMR.md
- Interoperabilidad: Asistencial/Documentacion_Interoperabilidad_GHIPS_EMR.md
- FevRips: FevRips/docs/arquitectura.md
- Financiero: Financiero/01_Arquitectura_y_Componentes.md
- Activos: Activos/arquitectura.md
- PQRS: PQRS/docs/Diagrama_Arquitectura.md
