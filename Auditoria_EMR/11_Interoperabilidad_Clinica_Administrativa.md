# Interoperabilidad Clínica y Administrativa
[[ _TOC_ ]]

Fecha: 12/11/2025

## Arquitectura y flujos de información
- Fuentes internas: `Ips.Gestion.Ghips.Web`, `WebLocal`, servicios Windows, apps cliente (REST/SignalR).
- Orquestación: `ServiciosApis` (REST), `Services.Wcf` (WCF), `Services.Ws` (SOAP), `Connect` (adapters), `Core` (reglas), `Domain` (DTO/entities).
- Datos y mensajería: `LibBD` (acceso a datos), SQL Server (42+ esquemas), Enterprise Library (Caching/Logging).
- Destinos externos: Azure AD/Storage, Power BI, MIPRES/EPS, Telemedicina (ITMS), gateways HL7/FHIR, entes reguladores (RIPS/Anexos).

Diagrama de referencia y detalle: ver `Asistencial/Documentacion_Interoperabilidad_GHIPS_EMR.md` (sección 1.1).

## Servicios o capacidades de integración disponibles
- REST APIs (`Ips.Gestion.Ghips.ServiciosApis`): JSON, CORS controlado, tokens.
- WCF / ASMX: compatibilidad con soluciones legacy.
- Conectores `Ips.Gestion.Ghips.Connect`: adapters para MIPRES, HL7/FHIR, telemedicina, Azure, Power BI; transformación de mensajes, reintentos y monitoreo.
- OData: exposición de datasets de solo lectura para análisis controlado.
- Servicios Windows batch: exportaciones regulatorias (RIPS, anexos), envío de documentos, trazabilidad.

## Especificación de protocolos utilizados
- Clínico: HL7 v2.x (ADT/ORU), HL7 CDA, FHIR R4 (Patient, Encounter, Observation, MedicationRequest, CarePlan).
- Mensajería: REST/JSON, SOAP/XML; OData v3.
- Seguridad: OAuth 2.0/OpenID Connect (Azure AD), TLS 1.2+.

## Indicadores y métricas (interoperabilidad)
- Throughput: mensajes HL7/FHIR/hora; tasa de éxito; reprocesos.
- Latencia: tiempo de ida y vuelta por conector; P95.
- Calidad: validaciones pre‑envío; tasa de rechazo externo; consistencia.
- Disponibilidad: uptime por canal; fallas por proveedor; reintentos.

Observabilidad: dashboards Power BI para integraciones, Enterprise Library Logging, SQL Agent Alerts.

Fuentes: `Asistencial/Documentacion_Interoperabilidad_GHIPS_EMR.md`, `Activos/interoperabilidad.md`.