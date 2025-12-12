# Respuesta Técnica a Preguntas de Auditoría – EMR GHIPS

**Fecha:** 12 de Diciembre de 2025  
**Sistema:** GHIPS EMR / HIS  
**Referencia:** Documentación arquitectónica y técnica del repositorio

---

## 1) Base tecnológica .NET 4.5.2 (mantenibilidad, seguridad, continuidad evolutiva)

- **Razones técnicas:**
  - Compatibilidad clínica/regulatoria en 40+ proyectos y 42+ esquemas con dependencias WebForms, WCF/SOAP y Enterprise Library. Migraciones disruptivas impactarían módulos críticos (RIPS, Anexos 9/10, telemedicina, trazabilidad).
  - Arquitectura por contratos: Service Layer + DTOs (`Ips.Gestion.Ghips.Domain.To`) desacoplan negocio de transporte/hosting, facilitando evolución por dominios.
  - Convivencia progresiva: `ServiciosApis` (REST) coexiste con `Services.Wcf` y `Services.Ws` + SignalR/OWIN.
- **Mitigaciones:**
  - Seguridad: TLS 1.2+, HSTS, CSP, cookies seguras, Azure AD SSO+MFA, roles granulares (`Ips.Gestion.Ghips.Security`), cifrado en reposo (TDE/AES), DMZ.
  - Dependencias: inventario y bloqueo de versiones vulnerables; uso de librerías soportadas (EPPlus/ClosedXML, Select.Pdf/PDFsharp); encapsulamiento de legacy tras interfaces.
  - Observabilidad: Enterprise Library Logging, `ServicioWinTrazabilidad`, PerfMon/IIS Logs/SQL DMVs, dashboards Power BI; pruebas de carga y parches periódicos.
  - Resiliencia: SQL AlwaysOn, balanceo IIS, reinicio/ watchdogs en servicios Windows, backups en Azure Storage.
- **Proyección de vida útil:**
  - Mantener .NET 4.5.2 como capa estable para módulos críticos mientras se migra por dominios (12–24 meses).  
  - Roadmap: ampliar REST, extraer conectores, App Insights (6–12m); migrar frontends a ASP.NET Core y contenerización (12–18m); sustituir WCF/ASMX y jobs modernos (18–24m).  
  - KPIs transición: latencia P95, disponibilidad, errores, cobertura endpoints modernos, reducción superficie legacy.

---

## 2) Controles nativos de WebForms

- **Sí, se utilizan controles nativos y compatibles:**
  - ASP.NET WebForms con AJAX Control Toolkit y Kendo UI en UI.
  - Validaciones del lado cliente (jQuery Validation) y servidor (Page Validators) donde aplica.
  - Manejo de ViewState, eventos y ciclo de vida clásico de WebForms; hardening de IIS/headers de seguridad.
  - Referencias: `Ips.Gestion.Ghips.Web` y `Ips.Gestion.Ghips.WebLocal`.

---

## 3) Consumo de la capa de presentación: REST vs llamadas directas

- **Modelo híbrido según módulo:**
  - La capa de presentación consume **REST APIs internas** expuestas por `Ips.Gestion.Ghips.ServiciosApis` para nuevas funcionalidades y módulos modernizados.
  - En módulos legacy, existen **llamadas directas** a servicios WCF/SOAP y, en casos específicos, a métodos de backend a través de capas compartidas (Service Layer) dentro de la misma solución para eficiencia y compatibilidad.
  - Tendencia: incremento de consumo 100% REST en módulos nuevos y migrados.

---

## 4) Microservicios independientes

- **Actualmente, el EMR opera mayormente como solución N-Tier.**
  - Algunos conectores y servicios específicos se **desacoplan** (ej. ServiciosApis, integraciones externas) y pueden desplegarse de forma **independiente**, pero no todos cumplen aún con los cuatro criterios (despliegue autónomo, BD propia, versionamiento independiente, escalabilidad individual).
  - Roadmap: evolución de conectores críticos a microservicios con su propio ciclo de vida y capacidad de escalado.

---

## 5) Modelo físico completo de base de datos

- **Modelo por esquemas funcionales (42+):** dbo (core), clínicos (ConsultaExterna, Cirugia, Laboratorios, AyudasDiagnosticas, AIEPI, Odontologia, Vacunacion, Triaje, Farmacovigilancia, ControlInfecciones), administrativos (Facturacion, Autorizaciones, GRDs, Turnos, AdministrarPiso), soporte (Medicamentos, Ordenes, Parametrizacion, Security/Seguridad, Mensajes, Noticias, Storage), especializados (Interconsultas, Avales, PyP, Epide, DietasEspeciales, SolicitudHospitalizacion, SoportesPDF, Rotulaciones, Anexo9, Anexo10).
  - **Diagrama lógico** incluido en `Documentacion_Arquitectura_General_GHIPS_EMR.md` (Mermaid).  
  - Para el **modelo físico detallado (tablas/relaciones)**, se comparte mediante el proyecto `Ips.Gestion.Ghips.BaseDatos` (SSDT) y exportables en formato `dacpac`/diagramas externos. Si requieren un **PDF con relaciones de principales dominios**, podemos generar una exportación desde SSDT/SSMS.

---

## 6) Calidad de datos, duplicados, catálogos, integridad

- **Calidad y validación:**
  - Validaciones en UI y backend (Service Layer) por dominios; restricciones y claves en SQL.
  - **Catálogos controlados** en esquemas de `Parametrizacion`/`Security` y reglas de negocio en `Core`.
  - **Detección de duplicados:** controles por identificadores (documento, HC, órdenes) y reconciliación en procesos batch/servicios.  
  - **Integridad:** constraints referenciales, transacciones distribuidas, auditoría de cambios (`ServicioWinTrazabilidad`).

---

## 7) Responsabilidades On-Premise vs SaaS (Alma Mater vs HSI)

- **On-Premise (Alma Mater):**
  - Infraestructura (servidores web/app/BD), sistema operativo e IIS.
  - Administración de SQL Server (instalación, parches, actualización del motor), backups locales y DR.
  - Monitoreo de infraestructura (CPU, memoria, disco, red), seguridad perimetral y firewall.
  - HSI: entrega de binarios/configs, guía de hardening, soporte de aplicación, actualizaciones funcionales, asistencia en pruebas.
- **SaaS (HSI):**
  - Infraestructura cloud, despliegue, monitoreo integral (app/infra), backups/DR en Azure.
  - Actualización del motor de BD gestionada por HSI (según plataforma y acuerdos).
  - Alma Mater: consumo del servicio, administración de usuarios/roles, coordinación de ventanas de mantenimiento.

---

## 8) Recursos FHIR soportados

- **Confirmados:** Patient, Encounter, Observation (REST autenticado).
- **Evaluación/Plan:** ampliar a MedicationRequest, CarePlan, Practitioner, Organization, DiagnosticReport según requerimientos de interoperabilidad y roadmap.

---

## 9) Procesos batch (afectación, falla y operación)

- **Servicios Windows (8+):** EnvioMedicamentos, EnvioOrdenes, SendMail, EnvioHistoriaClinica, EnvioInfoFinanciero, EnviarInfoGerencial, ServiceGhips, ServicioWinTrazabilidad.
- **Módulos afectados:** farmacia, órdenes, reportes regulatorios, gerencial/financiero, trazabilidad.
- **Si fallan:** reintentos automáticos, logging detallado (Enterprise Library), alertas vía correo/SignalR; posibilidad de re-procesar colas; registro en Event Viewer.
- **Operación:** ventanas programadas, monitoreo en dashboards y revisiones operativas; manuales de procedimiento para reprocesos.

---

## 10) Evidencia de mensajes HL7 v2

- Conectores en `Ips.Gestion.Ghips.Connect` y referencias a integraciones HL7/FHIR.
- Se puede compartir **muestras anonimizadas** de mensajes ADT/ORU (HL7 v2.x) exportadas desde ambiente de pruebas; por política, se evitan adjuntar datos reales en repositorio.

---

## 11) Anonimización irreversible de datos

- **Estado actual:** no se aplica anonimización irreversible en datos productivos por requerimientos clínicos/legales de trazabilidad.
- **Controles alternativos:**
  - Enmascaramiento/seudonimización en ambientes de prueba y para reportes de soporte.
  - Acceso por roles (principio de menor privilegio), auditoría de accesos y exportaciones.
  - Cifrado en reposo y tránsito, segmentación de datos sensibles (dominios críticos: psicología, VIH, menores).
- **Plan:** evaluar anonimización irreversible para datasets de analítica avanzada usando hash salado/irreversible y tokenización en entornos segregados.

---

## 12) Evidencias de observabilidad y monitoreo

- **Desempeño operativo:** latencia API (P95), concurrencia SignalR, disponibilidad web, métricas de carga; respaldado por Enterprise Logging + Power BI dashboards (ver `Documentacion_Escalabilidad_Desempeno_GHIPS_EMR.md`).
- **Infraestructura:** métricas históricas y tiempo real de CPU/memoria, IIS y SQL Server (PerfMon, DMVs); alertas SQL Agent y acciones registradas.
- **Seguridad:** auditoría de accesos, intentos fallidos, cambios de roles críticos (`ServicioWinTrazabilidad`, categorías de log Error/Fatal/Warning/Info).

---

### 12.2) Ecosistema ERP/GHIPS: clientes modernos que consumen APIs

- **FevRips** (módulo ERP externo/relacionado):
  - Consume endpoints REST de `Ips.Gestion.Ghips.ServiciosApis` para extracción de datos clínico-administrativos (RIPS, facturación, autorizaciones) y validación previa.
  - Beneficios: desacopla reportería/validación reglamentaria del EMR core, habilitando pipelines modernos y despliegue independiente.
  - Evidencia sugerida: lista de endpoints consumidos (contratos REST) y credenciales de cliente/tenant; logs de consumo y rendimiento.
  - Referencia del proyecto y guía rápida: ver [FevRips/README.md](FevRips/README.md).

- **GHIPS Lite** (front/cliente moderno):
  - Interfaz ligera basada en web moderna que **consume 100% APIs REST** del EMR (`ServiciosApis`) para casos de uso selectos (consulta rápida, agenda, indicadores) y para **ciclo cerrado** de medicamentos/órdenes (prescripción → dispensación → administración → trazabilidad).
  - Beneficios: reduce dependencia de WebForms, acelera UX, facilita movilidad y escalado; el **ciclo cerrado** mejora seguridad del paciente y control de desvíos.
  - Evidencia sugerida: configuración de cliente, mapping de recursos REST, dashboards de latencia/errores por cliente; trazas del ciclo cerrado (eventos de prescripción/dispensación/administración) en `ServicioWinTrazabilidad` y endpoints de órdenes/medicación en `Ips.Gestion.Ghips.ServiciosApis`.

 - **Proyecto MiPres** (integración con prescripción electrónica):
  - Consumo de APIs REST del EMR para extracción de datos clínicos y generación de mensajes/contratos hacia **MiPres** (plataforma regulatoria de prescripciones), con autenticación y cumplimiento de esquemas requeridos.
  - Beneficios: automatiza la interoperabilidad regulatoria, reduce reprocesos manuales y asegura consistencia entre historia clínica y reporte MiPres.
  - Evidencia sugerida: contratos de integración y endpoints utilizados (paciente, orden, medicamento), logs de envío/estado, credenciales de app/tenant; revisar conectores en `Ips.Gestion.Ghips.Connect` y servicios relacionados en `Ips.Gestion.Ghips.ServiciosApis`.

- **Portal de Pacientes** (front externo/omnicanal):
  - Consumo de APIs REST para agendamiento, consulta de resultados, descarga de documentos clínicos y visualización de órdenes.
  - Beneficios: mejora experiencia del paciente, reduce carga operativa y habilita autogestión segura con autenticación federada.
  - Evidencia sugerida: endpoints utilizados (Patient, Encounter, documentos), políticas de autenticación (Azure AD B2C/AD), métricas de uso.

- **Nómina Electrónica** (integración administrativa):
  - Consumo de APIs y/o servicios para conciliación de horas, turnos y registros que impactan liquidación; exportación conforme a normativas DIAN.
  - Beneficios: automatiza flujos administrativos, reduce errores de carga manual y asegura trazabilidad.
  - Evidencia sugerida: contratos de integración, logs de procesos, reportes de conciliación y validación.

- **Activos** (gestión de activos/equipamiento):
  - Consumo de APIs REST para inventarios, trazabilidad de equipos médicos, mantenimiento preventivo/correctivo y asignación por servicio.
  - Beneficios: integra gestión patrimonial con operación clínica, mejora control y disponibilidad de recursos.
  - Evidencia sugerida: endpoints de inventario/ubicación/asignación, logs de sincronización y reportes de movimiento.

- **Comunicación con APIs**:
  - Autenticación: OAuth2/Azure AD según tenant; autorización por roles/permisos de `Ips.Gestion.Ghips.Security`.
  - Estándares de contrato: DTOs estables (`Ips.Gestion.Ghips.Domain.To`) y versionamiento de endpoints.
  - Observabilidad: métricas por consumidor (FevRips/GHIPS Lite) en Power BI y Enterprise Logging.

- **APIs REST ampliadas:** nuevos endpoints en `Ips.Gestion.Ghips.ServiciosApis` (ruta: `c:\WorkAreaGhips\Asistencial\Src\GhipsDev\Ips.Gestion.Ghips.ServiciosApis\`) para dominios de alto uso (órdenes, autorizaciones, indicadores) que conviven con WCF/SOAP.

#### 12.2.1) Endpoints y contratos FevRips

- `FevRips.Api` expone controladores: `AuthController`, `ReportesRipsController`, `TransationController`.
- Configuración de autenticación y consumo en `FevRips.Api/appsettings.json` y `FevRips.Web/appsettings.json`.
- Para detalles operativos y de despliegue, consultar [FevRips/README.md](FevRips/README.md).
- **Integración Azure AD (SSO/MFA):** configuración y uso en `Ips.Gestion.Ghips.Security` (ruta: `c:\WorkAreaGhips\Asistencial\Src\GhipsDev\Ips.Gestion.Ghips.Security\`) y referencias en `Web.config`/`App.config` de `Ips.Gestion.Ghips.Web` (ruta: `c:\WorkAreaGhips\Asistencial\Src\GhipsDev\Ips.Gestion.Ghips.Web\`).
- **Power BI Embedded:** integración cliente con `powerbi.js` en `Ips.Gestion.Ghips.Web` (ruta: `c:\WorkAreaGhips\Asistencial\Src\GhipsDev\Ips.Gestion.Ghips.Web\`) y configuración de reportes en secciones de presentación.
- **SignalR 2.4.x:** hubs y clientes presentes en `Ips.Gestion.Ghips.Web` y `Ips.Gestion.Ghips.ServiciosApis` (rutas: `c:\WorkAreaGhips\Asistencial\Src\GhipsDev\Ips.Gestion.Ghips.Web\` y `c:\WorkAreaGhips\Asistencial\Src\GhipsDev\Ips.Gestion.Ghips.ServiciosApis\`).
- **Exportación moderna de documentos:** uso de EPPlus/ClosedXML/Select.Pdf/PDFsharp en proyectos de presentación y servicios (rutas: `Ips.Gestion.Ghips.Web`, `Ips.Gestion.Ghips.WebLocal`, `Ips.Gestion.Ghips.ServiciosApis`).
- **Hardening y headers de seguridad:** ajustes de IIS y headers en `Web.config` de `Ips.Gestion.Ghips.Web`/`WebLocal` (rutas: `c:\WorkAreaGhips\Asistencial\Src\GhipsDev\Ips.Gestion.Ghips.Web\` y `c:\WorkAreaGhips\Asistencial\Src\GhipsDev\Ips.Gestion.Ghips.WebLocal\`).
- **Roadmap activo:** ver `Documentacion_Escalabilidad_Desempeno_GHIPS_EMR.md` (ruta: `c:\WorkAreaGhips\Asistencial\Src\GhipsDev\Documentacion_Escalabilidad_Desempeno_GHIPS_EMR.md`) y `Documentacion_Interoperabilidad_GHIPS_EMR.md` (ruta: `c:\WorkAreaGhips\Asistencial\Src\GhipsDev\Documentacion_Interoperabilidad_GHIPS_EMR.md`).

## 13) Anexos y referencias

- `Documentacion_Arquitectura_General_GHIPS_EMR.md` – Arquitectura, datos y ambientes. Ruta: `c:\WorkAreaGhips\Asistencial\Src\GhipsDev\Documentacion_Arquitectura_General_GHIPS_EMR.md`
- `Documentacion_Arquitectura_GHIPS_EMR.md` – Detalle técnico por capas y módulos. Ruta: `c:\WorkAreaGhips\Asistencial\Src\GhipsDev\Documentacion_Arquitectura_GHIPS_EMR.md`
- `Documentacion_Interoperabilidad_GHIPS_EMR.md` – Flujos, protocolos HL7/FHIR, RIPS. Ruta: `c:\WorkAreaGhips\Asistencial\Src\GhipsDev\Documentacion_Interoperabilidad_GHIPS_EMR.md`
- `Documentacion_Seguridad_Privacidad_GHIPS_EMR.md` – Roles, clasificación, controles. Ruta: `c:\WorkAreaGhips\Asistencial\Src\GhipsDev\Documentacion_Seguridad_Privacidad_GHIPS_EMR.md`
- `Documentacion_Escalabilidad_Desempeno_GHIPS_EMR.md` – Pruebas y KPIs. Ruta: `c:\WorkAreaGhips\Asistencial\Src\GhipsDev\Documentacion_Escalabilidad_Desempeno_GHIPS_EMR.md`

---

**Contacto:**  
Arquitectura de Solución GHIPS — arquitectura@ghips.com  
Operaciones/Seguridad — soporte@ghips.com
