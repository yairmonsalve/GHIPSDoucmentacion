# GHIPS ERP — Documento General de Auditoría

Fecha: 10/11/2025
Marca: GHIPS
Desarrollador: TEAM GHIPS
Versión: 1.0

Este documento consolida la información de las 5 aplicaciones que componen GHIPS ERP, con base en la documentación existente en este repositorio:
- EMR (Historia Clínica / Asistencial)
- FevRips (RIPS y Facturación electrónica)
- Financiero (ERP Financiero/Contable/Presupuestal)
- PQRS (Gestión de Peticiones, Quejas, Reclamos y Sugerencias)
- Activos (Compras, Inventarios, Medicamentos Intra y Gestión de Activos)

Referencias internas (detalles ampliados) con enlaces relativos:
- Asistencial: [`Documentacion_Arquitectura_General_GHIPS_EMR.md`](../Asistencial/Documentacion_Arquitectura_General_GHIPS_EMR.md), [`Documentacion_Escalabilidad_Desempeno_GHIPS_EMR.md`](../Asistencial/Documentacion_Escalabilidad_Desempeno_GHIPS_EMR.md), [`Documentacion_Interoperabilidad_GHIPS_EMR.md`](../Asistencial/Documentacion_Interoperabilidad_GHIPS_EMR.md), [`Documentacion_Seguridad_Privacidad_GHIPS_EMR.md`](../Asistencial/Documentacion_Seguridad_Privacidad_GHIPS_EMR.md)
- FevRips: [`arquitectura.md`](../FevRips/docs/arquitectura.md), [`modelo_datos.md`](../FevRips/docs/modelo_datos.md), [`seguridad_privacidad.md`](../FevRips/docs/seguridad_privacidad.md)
- Financiero: [`01_Arquitectura_y_Componentes.md`](../Financiero/01_Arquitectura_y_Componentes.md), [`03_Reportes_y_Analitica.md`](../Financiero/03_Reportes_y_Analitica.md), [`07_Recomendaciones_Modernizacion.md`](../Financiero/07_Recomendaciones_Modernizacion.md)
- PQRS: [`Diagrama_Arquitectura.md`](../PQRS/docs/Diagrama_Arquitectura.md), [`Auditoria_EMR_PQRS.md`](../PQRS/docs/Auditoria_EMR_PQRS.md)
- Activos: [`arquitectura.md`](../Activos/arquitectura.md), [`datos.md`](../Activos/datos.md)

---

## Tabla de Contenido
1. [Arquitectura (visión corporativa)](#1-arquitectura-visión-corporativa)
2. [Arquitectura y componentes EMR](#2-arquitectura-y-componentes-de-aplicación-del-emr)
3. [Documentación técnica por módulo](#3-documentación-técnica-de-la-solución-resumen-por-módulo)
4. [Frameworks y lenguajes](#4-especificación-de-frameworks-lenguajes-y-librerías-utilizadas)
5. [Arquitectura y modelo de datos](#5-arquitectura-y-modelo-de-datos)
6. [Analítica y reportes](#6-herramientas-o-módulos-de-analítica-incluidos-reportes-bi-dashboards)
7. [Indicadores y métricas generales](#7-indicadores-y-métricas-de-monitoreo-capacidad-desempeño-calidad-y-utilización)
8. [Ambientes técnicos](#8-arquitectura-técnica-y-ambientes-requeridos)
9. [Indicadores disponibilidad/uso](#9-indicadores-y-métricas-disponibilidad-y-utilización)
10. [Capacidades en desarrollo / IA / IoT](#10-capacidades-en-desarrollo-automatización-analítica-avanzada-ia-e-iot-disponibles)
11. [Casos de uso emergentes](#11-casos-de-uso-implementados-o-planificados-con-tecnologías-emergentes)
12. [Interoperabilidad](#12-interoperabilidad-clínica-y-administrativa)
13. [Flujos de información](#13-arquitectura-y-flujos-de-información)
14. [Servicios de integración](#14-servicios-o-capacidades-de-integración-disponibles)
15. [Protocolos](#15-especificación-de-protocolos-utilizados-hl7-fhir-etc)
16. [Métricas de interoperabilidad](#16-indicadores-y-métricas-interoperabilidad)
17. [Extensibilidad](#17-extensibilidad-y-personalización)
18. [Seguridad y privacidad](#18-seguridad-y-privacidad)
19. [Roles y perfiles](#19-definición-de-roles-y-perfiles-de-acceso-clínico-administrativo-técnico)
20. [Clasificación de información clínica](#20-capacidades-para-clasificación-de-información-clínica)
21. [Escalabilidad y desempeño](#21-escalabilidad-y-desempeño)
22. [Pruebas de carga / rendimiento](#22-resultados-de-pruebas-de-carga-estrés-o-rendimiento)
23. [Indicadores capacidad/desempeño](#23-indicadores-y-métricas-disponibilidad-desempeño-y-capacidad)
24. [Estrategias de escalamiento](#24-estrategias-de-escalamiento-horizontal-y-vertical)
25. [Balanceo y redundancia](#25-configuraciones-de-balanceo-de-carga-y-redundancia)
26. [Failover y disponibilidad](#26-mecanismos-de-failover-y-disponibilidad)
27. [Procedimientos de monitoreo y alertas](#27-procedimiento-de-monitoreo-capacidad-y-alertamiento-de-disponibilidad-del-sistema)
28. [Brechas y Próximas Acciones](#28-brechas-y-próximas-acciones)
29. [Notas legales](#notas-legales)

## 1. Arquitectura (visión corporativa)

- Estilo: Arquitectura multicapa (Presentación, Servicios/APIs, Dominio, Infraestructura, Datos) con orientación a servicios e integración híbrida (REST/SOAP/ETL).
- Tecnologías base: .NET Framework 4.5–4.8 (EMR/Financiero/Activos), ASP.NET Core/.NET 8 (FevRips), Angular/Ionic (PQRS), SQL Server (2012–2022), SSRS.
- Despliegue: IIS en web/app, SQL Server AlwaysOn (objetivo), servicios Windows (EMR), contenedores Docker en FevRips; uso de Azure AD/Storage/Power BI en escenarios específicos.
- Objetivos de calidad: Disponibilidad ≥ 99.5% apps, ≥ 99.9% base de datos; latencias p95: API < 500 ms; integridad transaccional en dominios críticos.

## 2. Arquitectura y componentes de aplicación del EMR

- Capas: WebForms, Servicios REST/WCF/SOAP, Core de negocio, infraestructura (Security/Connect/LibBD), 8+ servicios Windows.
- Integraciones: Azure AD, Telemedicina (ITMS), MIPRES, Power BI, conectores HL7/FHIR.
- Datos: 42+ esquemas clínicos/administrativos; trazabilidad; caché y logging corporativos.
  Ver: [`Documentacion_Arquitectura_General_GHIPS_EMR.md`](../Asistencial/Documentacion_Arquitectura_General_GHIPS_EMR.md).

## 3. Documentación técnica de la solución (resumen por módulo)

- EMR: N‑Tier + SOA; DI (Unity), Enterprise Library, SignalR, OWIN. Servicios Windows para trazabilidad/integ. batch.
- FevRips: ASP.NET Core (Web/API/Worker), EF Core, Identity, multitenancy por TenantId, Swagger.
- Financiero: ASP.NET MVC 5.3 + Web API, EF 6, NLog/Enterprise Library, +150 reportes SSRS.
- PQRS: Angular 16 + Ionic 7 (SPA/PWA), consumo de APIs documentales/GHIPS, despliegue en IIS.
- Activos: ASP.NET MVC/WebForms + API REST, EF y SP, ETL/CLR, SSRS, NLog, Unity.

## 4. Especificación de frameworks, lenguajes y librerías utilizadas

- Lenguajes: C# (.NET), TypeScript/JavaScript, T‑SQL, HTML/CSS.
- Backend: ASP.NET Framework (WebForms, Web API, WCF); ASP.NET Core/.NET 8 (FevRips).
- ORM: EF 6 (Financiero), EF/Core (FevRips/Activos); ADO.NET en EMR/Activos para escenarios de alto desempeño.
- Frontend: Angular 16/Ionic 7 (PQRS), jQuery/Knockout/Kendo (EMR/Financiero legado), Bootstrap.
- Observabilidad: NLog, Enterprise Library Logging; propuesto App Insights/OpenTelemetry.
- Docs API: Swagger/OpenAPI (FevRips, Financiero), HelpPage/XML (Activos/EMR).

## 5. Arquitectura y Modelo de datos

- Motor: SQL Server (2012–2022). Esquemas clínicos/administrativos en EMR; dominios financieros/presupuestales en ERP; multitenancy en FevRips; auditoría temporal (SYSTEM_VERSIONED) y logs.
- Dominios clave:
  - EMR: esquemas clínicos (ConsultaExterna, Cirugía, Laboratorios, Medicamentos, etc.) y administrativos (Facturación, Autorizaciones).
  - FevRips: Empresas, Usuarios/Permisos, Transacciones, Repositorio de artefactos electrónicos, Logs, ConfigKeys.
  - Financiero: Contabilidad, Presupuesto, Tesorería, Cartera, Terceros, Auditoría.
  - Activos: Compras, Inventario, Medicamentos intra, Catálogos, Seguridad.
  Ver: [`datos.md`](../Activos/datos.md), [`modelo_datos.md`](../FevRips/docs/modelo_datos.md).

## 6. Herramientas o módulos de analítica incluidos (Reportes, BI, Dashboards)

- SSRS/RDLC: 150+ reportes en Financiero; 1300+ en EMR; reportes RIPS/Anexos en FevRips/EMR.
- Dashboards: Power BI Embedded (EMR) y potencial integración en Financiero.
- Visualizaciones UI: Kendo/Chart.js (EMR), gráficos de cartera (Financiero).

## 7. Indicadores y métricas de monitoreo, capacidad, desempeño, calidad y utilización

- Disponibilidad: Web ≥ 99.5%, BD ≥ 99.9%.
- Desempeño: API p95 < 500 ms; SignalR < 300 ms; batch RIPS < 120 min.
- Capacidad: CPU App < 70%, pool SQL < 75% uso; caché hit > 80%.
- Calidad clínica: tiempos de atención, ocupación, eventos adversos; uso: usuarios activos, órdenes/día, reportes/día.
  Ver: [`Documentacion_Arquitectura_General_GHIPS_EMR.md`](../Asistencial/Documentacion_Arquitectura_General_GHIPS_EMR.md) §6 y §8; [`03_Reportes_y_Analitica.md`](../Financiero/03_Reportes_y_Analitica.md) §3.7.

## 8. Arquitectura técnica y ambientes requeridos

- Ambientes: Desarrollo/Testing/Integración/Producción; variantes SaaS/on‑prem.
- Despliegue:
  - EMR: IIS web farm + App servers + SQL AlwaysOn + File Server; Azure AD/Storage/Power BI.
  - FevRips: API/Worker dockerizados + SQL 2022.
  - Financiero: IIS + SSRS; agentes de background.
  - PQRS: Hosting estático IIS; APIs documentales/GHIPS.

## 9. Indicadores y métricas (disponibilidad y utilización)

- Uptime servicios Windows, latencias API/WCF/SignalR, throughput HL7/FHIR/RIPS, crecimiento de BD/archivos, usuarios concurrentes por módulo.

## 10. Capacidades en desarrollo, automatización, analítica avanzada, IA e IoT disponibles

- Automatización: 8+ servicios Windows (EMR), ServiceWorker (FevRips), WorkProcess (Financiero).
- Analítica avanzada: Integración Power BI; roadmap ML para compras (Activos) y clasificación PQRS; potencial Cognitive Services/ML.NET.
- IoT: potencial con SignalR y Azure IoT/Events para telemetría médica.

## 11. Casos de uso implementados o planificados con tecnologías emergentes

- Implementados: Power BI embebido, SignalR, Telemedicina ITMS, Azure Storage/AD, facturación electrónica DIAN, temporal tables.
- Planificados: Modelos predictivos (ML.NET), NLP para PQRS, IoT médico con IoT Hub, Application Insights/OTel, microservicios selectivos.

## 12. Interoperabilidad clínica y administrativa

- Modos: REST/JSON, SOAP/XML, OData; conectores a EPS/MIPRES, Telemedicina.
- Clínico: HL7 v2.x (Lab/ADT), CDA, FHIR R4 (Patient, Encounter, Observation; ampliar MedicationRequest/CarePlan).
  Ver: [`Documentacion_Interoperabilidad_GHIPS_EMR.md`](../Asistencial/Documentacion_Interoperabilidad_GHIPS_EMR.md).

## 13. Arquitectura y flujos de información

- Flujos: atención clínica en línea (EMR) → servicios internos → persistencia; procesos administrativos (autorizaciones/facturación) → servicios externos; reportes regulatorios batch; eventos a BI/Storage.
- PQRS: SPA → ApiDocumental → repo documental; consulta de estado; encuesta con hash.

## 14. Servicios o capacidades de integración disponibles

- Internos: REST APIs (EMR/FevRips/Activos/Financiero), WCF/SOAP legacy, servicios Windows batch.
- Externos: DIAN, EPS/Minsalud (RIPS), Azure AD/Storage, Telemedicina.

## 15. Especificación de protocolos utilizados (HL7, FHIR, etc.)

- HL7 v2.x (MLLP/REST) para Lab/ADT; HL7 CDA para documentos; FHIR R4 para recursos clínicos; OAuth 2.0/Azure AD; RIPS/Anexos regulatorios; OData; REST/SOAP.

## 16. Indicadores y métricas (interoperabilidad)

- Tasa de éxito por conector, latencias por endpoint, backlog y reintentos, errores por tipo, cumplimiento RIPS/Anexos.

## 17. Extensibilidad y personalización

- Modulación por capas/proyectos; configuración por ambiente/tenant; theming UI (Ionic); políticas y catálogos parametrizables; DI para sustituibilidad de componentes.

## 18. Seguridad y privacidad

- Autenticación: Windows/Azure AD (EMR), Identity/JWT (FevRips), cookies/forms (Financiero), público controlado (PQRS).
- Controles: cifrado en tránsito (TLS), cifrado/retención de datos sensibles, auditoría detallada, CSP/HSTS recomendados, vault para secretos.
  Ver: [`Documentacion_Seguridad_Privacidad_GHIPS_EMR.md`](../Asistencial/Documentacion_Seguridad_Privacidad_GHIPS_EMR.md), [`seguridad_privacidad.md`](../FevRips/docs/seguridad_privacidad.md).

## 19. Definición de roles y perfiles de acceso (clínico, administrativo, técnico)

- EMR: roles clínicos (médico, enfermería, apoyo), administrativos (facturación/autorizaciones), técnicos (TI/seguridad) con controles adicionales (MFA, firma digital, segregación de funciones).
- FevRips: Identity + Roles; `EmpresaUsuarioPermiso` para permisos finos por tenant.
- Financiero: Usuarios/Roles; auditoría de transacciones; filtros por sede/empresa en reportes.
- PQRS: frontend público; backoffice (externo) gestiona perfiles.

## 20. Capacidades para clasificación de información clínica

- Niveles: Pública/Interna/Confidencial/Restringida. Etiquetado a nivel de esquema/tabla/documentos; enmascaramiento dinámico; trazabilidad reforzada.

## 21. Escalabilidad y desempeño

- Resultados (EMR): p95 API 320 ms a 1,000 usuarios; batch 95 min; HL7/FHIR 10k msg/h; SignalR 5k conexiones (200 ms).
- FevRips: dockerizado con límites de CPU/memoria; índices y temporales; workers asíncronos.
- Financiero: reportes precalculados, índices y vistas; tiempos objetivo por tipo de reporte.

## 22. Resultados de pruebas de carga, estrés o rendimiento

- EMR: ver tabla en [`Documentacion_Escalabilidad_Desempeno_GHIPS_EMR.md`](../Asistencial/Documentacion_Escalabilidad_Desempeno_GHIPS_EMR.md) §1.
- Financiero: tiempos objetivo y métricas de reportería en [`03_Reportes_y_Analitica.md`](../Financiero/03_Reportes_y_Analitica.md) §3.7.

## 23. Indicadores y métricas (disponibilidad, desempeño y capacidad)

- Uptime por capa, latencias p95/p99, throughput por dominio, errores 5xx/4xx, tamaño de colas, crecimiento de BD/archivos, uso de CPU/RAM/IOPS.

## 24. Estrategias de escalamiento horizontal y vertical

- Horizontal: web farm con balanceo (sticky opcional), backplane SignalR, distribución de servicios Windows/Workers, particionado de cargas.
- Vertical: aumento vCPU/RAM; SQL con más RAM/SSD; partición de tablas y optimización de índices.

## 25. Configuraciones de balanceo de carga y redundancia

- Balanceador (ARR/App Gateway/NGINX) con health checks; rolling updates; API rate limiting; CDN para assets; replicación de blobs.

## 26. Mecanismos de Failover y disponibilidad

- SQL AlwaysOn; health checks y eliminación del pool; reinicio automático de servicios; backups incrementales y restauración; redundancia nativa cloud (Azure AD/Power BI).

## 27. Procedimiento de monitoreo, capacidad y alertamiento de disponibilidad del sistema

- Herramientas: PerfMon, DMVs de SQL, IIS Logs, NLog/Enterprise Library, dashboards Power BI; propuesto App Insights/OpenTelemetry.
- Frecuencia: continuo con revisiones diarias/semanales/mensuales; umbrales típicos: CPU>80% 5 min, latencia API>800 ms, fallos de integración>5.
- Respuesta: detección → clasificación → escalamiento → failover/rollback → post‑mortem/runbooks.

---

## 28. Brechas y Próximas Acciones

| Área | Brecha / Falta de evidencia | Acción propuesta | Prioridad |
|------|-----------------------------|------------------|-----------|
| Métricas FevRips | No se documentan latencias p95 reales ni throughput por tipo de transacción | Ejecutar pruebas sintéticas y carga controlada; registrar en CHANGELOG próxima versión | Alta |
| PQRS rendimiento | Sin resultados Lighthouse / tiempos p95 endpoints | Correr auditoría de performance y anexar reporte (v1.1) | Media |
| Seguridad secreta | Estado de externalización de secretos (vault) parcial en módulos legacy | Inventario secretos en Web.config y migración a Key Vault / Vault | Alta |
| Pruebas penetración | No se adjuntan resultados de pentest recientes | Programar pentest anual y anexar resumen ejecutivo | Media |
| FHIR cobertura | Recursos limitados (Patient, Encounter, Observation) | Ampliar a MedicationRequest, CarePlan, Practitioner, DocumentReference | Media |
| Observabilidad | APM / OpenTelemetry aún propuesta | Implementar trazas distribuidas y métricas técnicas + negocio (v1.2) | Alta |
| ML/IA | Roadmap sin PoC documentada | Definir caso piloto (predicción demanda inventarios) y medir ROI | Baja |
| Clasificación datos | Política aplicada pero sin matriz actualizada por esquema | Matriz de clasificación y controles por esquema/tabla | Alta |
| Consistencia marca | Algunos docs fuente usan "GRUPO DESARROLLO GHIPS" | Unificar a "TEAM GHIPS" en próxima revisión | Baja |

Checklist para versión 1.1:
- [ ] Añadir métricas FevRips (latencia, error rate) reales.
- [ ] Lighthouse + Web Vitals PQRS.
- [ ] Matriz de clasificación de datos por esquema.
- [ ] Evidencias de externalización de secretos.
- [ ] Pentest resumen ejecutivo.

## Notas legales

Este material hace parte de la propiedad intelectual de TEAM GHIPS. GHIPS es una marca registrada. © 2025 TEAM GHIPS. Todos los derechos reservados.
