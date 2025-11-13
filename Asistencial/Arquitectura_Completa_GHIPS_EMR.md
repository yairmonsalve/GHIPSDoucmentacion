# ARQUITECTURA COMPLETA GHIPS EMR
[[ _TOC_ ]]

**Fecha:** 10 de noviembre de 2025  
**Sistema:** GHIPS - Gestión Hospitalaria Integral de Procesos de Salud  
**Tipo:** Electronic Medical Record (EMR) / Sistema de Información Hospitalaria

---

> Desarrollado por TEAM GHIPS. GHIPS © es una marca registrada. © 2025 TEAM GHIPS. Todos los derechos reservados.

## 1. Resumen Ejecutivo Integrado

GHIPS es un EMR/HIS modular basado en arquitectura N‑tier con integración a Azure y capacidades de tiempo real (SignalR), analítica embebida (Power BI) e interoperabilidad (REST/WCF/SOAP, HL7/FHIR). La solución opera on‑premise y en modalidad SaaS multi‑tenant, con 40+ proyectos aplicacionales, 42+ esquemas de datos y 1354+ reportes RDLC.

Más detalle en: `Arquitectura_General_GHIPS_EMR.md`, `Arquitectura_GHIPS_EMR.md`.

## 2. Mapa de Componentes Unificado

- Presentación: `Ips.Gestion.Ghips.Web`.
- Servicios: `Ips.Gestion.Ghips.ServiciosApis` (REST), `Ips.Gestion.Ghips.Services.Wcf` (WCF), `Ips.Gestion.Ghips.Services.Ws` (SOAP/ASMX).
- Negocio: `Ips.Gestion.Ghips.Core`, `libGHIPS.Logica`, `Ips.Gestion.Ghips.Domain` y `Domain.To`.
- Infraestructura: `Ips.Gestion.Ghips.Infrastructure`, `Ips.Gestion.Ghips.Security`, `Ips.Gestion.Ghips.Connect`, `LibBD`.
- Datos: `Ips.Gestion.Ghips.BaseDatos` (SQL Server, 42+ esquemas).
- Automatización: 8+ Servicios Windows (ServiceGhips, EnvioMedicamentos, EnvioOrdenes, SendMail, etc.).

Diagrama completo: ver `Arquitectura_General_GHIPS_EMR.md` (sección 1.1).

## 3. Topología de Despliegue Híbrida

- Capa presentación (IIS en DMZ) con balanceador.
- Capa de aplicación para APIs y servicios Windows en red interna.
- Capa de datos con SQL Server (AlwaysOn opcional) y file server.
- Servicios cloud: Azure AD, Azure Storage, Power BI Embedded.

Diagrama de despliegue: ver `Arquitectura_General_GHIPS_EMR.md` (sección 7.1).

## 4. Modelo de Datos Resumido

Esquemas clínicos: `ConsultaExterna`, `Cirugia`, `Laboratorios`, `AyudasDiagnosticas`, `Transfusiones`, `Trasplantes`, `Vacunacion`, `Triaje`, `Odontologia`, `AIEPI`, `Farmacovigilancia`, `ControlInfecciones`.

Esquemas administrativos: `Facturacion`, `Autorizaciones`, `AutorizacionesExternas`, `GRDs`, `Turnos`, `AdministrarPiso`.

Esquemas de soporte y especializados: `Medicamentos`, `Ordenes`, `Parametrizacion`, `Security`, `Seguridad`, `Mensajes`, `Noticias`, `Soporte`, `Storage`, `Interconsultas`, `Avales`, `PyP`, `Epide`, `DietasEspeciales`, `SolicitudHospitalizacion`, `Rotulaciones`, `Anexo9`, `Anexo10`.

Detalle y diagramas: ver `Arquitectura_GHIPS_EMR.md` (sección 4) y `Arquitectura_General_GHIPS_EMR.md` (sección 4).

## 5. Seguridad y Privacidad (matriz resumida)

- Identidad y acceso: Windows/Auth Forms  con roles y permisos granulares.
- Clasificación de información: Pública, Interna, Confidencial, Restringida; cifrado en tránsito (TLS 1.2+) y en reposo (AES/TDE).
- Auditoría y trazabilidad: Enterprise Library Logging + `ServicioWinTrazabilidad`.
- Cumplimiento: Ley 1581/2012, Resolución 2003/2014; referencia HIPAA/HITECH, ISO 27001 en proceso.

Detalle: `Seguridad_Privacidad_GHIPS_EMR.md`.

## 6. Interoperabilidad (flujos clave)

- Protocolos: REST/JSON, SOAP/XML, OData; HL7 v2.x, CDA, FHIR R4.
- Conectores: MIPRES/EPS, Telemedicina (ITMS), Azure (AD), Power BI, Facturación Electrónica, FevRIPS.
- Mecanismos: `Ips.Gestion.Ghips.Connect` (adapters, transformación y reintentos), servicios Windows batch.

Detalle: `Interoperabilidad_GHIPS_EMR.md`.

## 7. Escalabilidad y Desempeño (KPIs consolidados)

- Desempeño: API P95 < 500 ms; SignalR < 300 ms; batch RIPS < 120 min.
- Capacidad: 1,000–2,500 usuarios concurrentes; pool SQL máx. 200 conexiones; caché hit > 80%.
- Disponibilidad: Web 99.5%; BD 99.9% (AlwaysOn); servicios 99.5%.
- Estrategias: web farm con balanceo, scale‑out de servicios, backplane para SignalR, particionamiento/índices en SQL.

Detalle: `Escalabilidad_Desempeno_GHIPS_EMR.md`.

## 8. Roadmap Tecnologías Emergentes

- Corto plazo (6–12 m): .NET moderno, microservicios selectivos, API Gateway, contenedores.
- Mediano (12–18 m): IA/ML (predicción reingresos/sepsis), NLP en notas, visión por computadora básica.
- Largo (18–30 m): IoT médico (monitoreo remoto), blockchain (consent y auditoría).

Referencias: secciones de Roadmap en los documentos de Arquitectura e Interoperabilidad.

## 9. Glosario (selección)

- EMR/HIS: Historia clínica electrónica / Sistema de información hospitalaria.
- HL7/FHIR/CDA: Estándares de intercambio clínico.
- RDLC: Reportes locales de Microsoft ReportViewer.
- AlwaysOn: Alta disponibilidad de SQL Server.
- SignalR: Mensajería tiempo real sobre WebSockets.

---

## Aviso Legal y Propiedad Intelectual

Este documento y el software descrito forman parte de la propiedad intelectual del **GRUPO DESARROLLO GHIPS**. GHIPS es una **marca registrada**. Queda prohibida su reproducción total o parcial, distribución, ingeniería inversa o divulgación sin autorización escrita. El acceso está restringido a instituciones y usuarios autorizados conforme contratos vigentes.

**Documento generado:** 10/11/2025  
**Versión:** 1.0  
**Responsable:** Oficina de Arquitectura y Operaciones GHIPS  
© 2025 GHIPS. Todos los derechos reservados.
