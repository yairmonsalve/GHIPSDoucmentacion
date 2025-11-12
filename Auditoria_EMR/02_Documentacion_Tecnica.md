# Documentación Técnica de la Solución EMR GHIPS

Fecha: 12/11/2025

## Estilo y patrones
- Arquitectura N‑tier + SOA. Inyección de dependencias con Unity 5.x.
- Patrones: Repository, Service Layer, DTO, Factory, Dependency Injection.
- Configuración multi‑ambiente y multi‑tenant (SaaS y on‑premise) vía Web.config y parámetros por institución.
- Logging y caching con Enterprise Library 5.x.

## Back-end
- .NET Framework 4.5.2–4.6.1; ASP.NET WebForms, Web API, WCF/ASMX.
- Acceso a datos: ADO.NET + Enterprise Library Data; transacciones distribuidas.
- Señalización: SignalR 2.x (chat/notificaciones en tiempo real).
- Servicios Windows: automatización (RIPS, medicamentos, órdenes, historia clínica, gerencial, mail, trazabilidad).

## Front-end
- WebForms + jQuery/Knockout; componentes Kendo UI; Bootstrap 3.
- ReportViewer (RDLC) para reportes locales; exportación PDF/Excel.

## Integraciones
- `Ips.Gestion.Ghips.Connect`: conectores hacia Azure AD, Azure Storage, Power BI, MIPRES, telemedicina (ITMS), HL7/FHIR.
- OData para exposiciones de lectura controlada.

## Seguridad
- Autenticación: Windows Auth y Azure AD (OAuth 2.0); MFA opcional.
- Autorización granular con `Ips.Gestion.Ghips.Security` (roles/permisos). Auditoría exhaustiva.

Referencias: `Asistencial/*` y `Activos/tecnica.md`.