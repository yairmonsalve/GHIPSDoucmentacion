# Respuesta Técnica Auditoría: Base Tecnológica .NET 4.5.2 en EMR GHIPS

**Fecha:** 12 de Diciembre de 2025  
**Sistema:** GHIPS EMR / HIS  
**Tema:** Mantenibilidad, seguridad y continuidad evolutiva sobre .NET Framework 4.5.2

---

## 1. Razones técnicas para mantener .NET 4.5.2 como base del EMR

- **Compatibilidad regulatoria y clínica:** GHIPS integra 40+ proyectos y 42+ esquemas con dependencias funcionales en WebForms, WCF/SOAP y Enterprise Library. Una migración disruptiva podría afectar módulos críticos (RIPS, Anexos 9/10, telemedicina ITMS, trazabilidad de medicamentos, facturación) y comprometer continuidad asistencial.
- **Arquitectura por contratos estables:** El sistema utiliza Service Layer + DTOs (`Ips.Gestion.Ghips.Domain.To`) que desacoplan la lógica de negocio del transporte/hosting. Esto permite evolucionar endpoints (REST, WCF) sin romper consumidores y facilita migración por dominios.
- **Convivencia tecnológica progresiva:** La capa `Ips.Gestion.Ghips.ServiciosApis` (REST) coexiste con `Services.Wcf` y `Services.Ws`. SignalR/OWIN habilitan capacidades modernas (tiempo real, middleware), minimizando riesgo operativo mientras se evoluciona.
- **Estabilidad operacional probada:** El stack actual está endurecido (IIS hardening, TLS 1.2+, DMZ, SQL AlwaysOn), con KPIs de desempeño y disponibilidad que cumplen los SLA establecidos.

---

## 2. Mecanismos de mitigación de riesgos (seguridad, dependencias y compatibilidad)

### 2.1 Seguridad y hardening
- **Transporte cifrado:** TLS 1.2+ en HTTPs, HSTS, cabeceras de seguridad (CSP, X-Frame-Options, X-Content-Type-Options), cookies `Secure`/`HttpOnly`.
- **Autenticación/Autorización:** Azure AD (SSO + MFA), Windows/Forms Authentication, roles granulares en `Ips.Gestion.Ghips.Security` con principio de menor privilegio.
- **Cifrado en reposo:** TDE/AES para datos sensibles; gestión de secretos fuera de código; hash seguro de credenciales.
- **Segmentación de red:** DMZ para web, red interna para aplicación, red protegida para BD; firewall y reglas de acceso mínimo.

### 2.2 Dependencias y compatibilidad
- **Inventario y gobierno de librerías:** Catálogo NuGet y binarios controlados; bloqueo de versiones vulnerables; reemplazo por librerías soportadas (EPPlus/ClosedXML para Excel, Select.Pdf/PDFsharp para PDF).
- **Anillos de compatibilidad:** Contratos estáticos (DTOs/Interfaces) y endpoints versionados (REST/WCF/SOAP) que permiten wrappers/microservicios sin romper clientes.
- **Encapsulamiento de legacy:** Módulos legacy (`libGHIPS.Logica`) detrás de interfaces de `Core`/`Domain`; nuevas capacidades se implementan en `ServiciosApis` para reducir superficie legacy.

### 2.3 Operación y observabilidad
- **Logging y auditoría:** Enterprise Library Logging (DB trace), `ServicioWinTrazabilidad` para trazabilidad de acciones críticas.
- **Monitoreo de desempeño:** PerfMon, IIS Logs, SQL DMVs, dashboards Power BI (latencia, errores, uptime, capacidad).
- **Pruebas continuas:** Carga/estrés en ambientes `Integracion/Release`, escaneo de vulnerabilidades, parches mensuales de configuración y seguridad.
- **Resiliencia:** SQL AlwaysOn, balanceo de carga IIS, reinicio automático y watchdogs en servicios Windows; backups y DR en Azure Storage.

---

## 3. Proyección de vida útil y continuidad evolutiva

### 3.1 Ventana operativa
- La base .NET 4.5.2 se mantendrá como **capa estable** para módulos críticos mientras se migra por dominios funcionales; la seguridad y operación se garantizan mediante hardening, monitoreo y aislamiento.

### 3.2 Estrategia de modernización (12–24 meses)
- **Fase 1 (6–12 meses):**
  - Ampliar cobertura de APIs REST (ASP.NET Web API) para dominios de alto uso.
  - Extraer conectores (MIPRES, telemedicina) a servicios independientes.
  - Incorporar Application Insights/Azure Monitor para telemetría avanzada.
  - Incorporar reportería regulatoria desacoplada mediante FevRips (ver [FevRips/README.md](FevRips/README.md)).
- **Fase 2 (12–18 meses):**
  - Migrar frontends seleccionados a ASP.NET Core (.NET 6+).
  - Introducir API Gateway (OIDC/OAuth2), contenerizar nuevos servicios.
  - Refactor en bounded contexts (Core/Domain) para microservicios.
- **Fase 3 (18–24 meses):**
  - Sustituir WCF/ASMX remanentes por microservicios.
  - Migrar automatizaciones Windows a workers/job services en .NET moderno.
  - Habilitar CI/CD con pruebas de resiliencia (chaos testing).

### 3.3 Garantías de actualizabilidad y sostenibilidad
- **Contratos inmutables:** Service Layer y DTOs como fuente de verdad; clientes externos no se rompen durante transiciones.
- **Migración por capas:** Nueva funcionalidad en tecnología soportada; legacy se mantiene operativa y monitoreada hasta deprecación planificada.
- **KPIs de transición:** P95 latencia, disponibilidad, tasa de errores, cobertura de endpoints modernos, reducción de superficie legacy.

---

## 4. Evidencias de controles y SLA actuales

- **Disponibilidad:** Web 99.5%, BD 99.9% (AlwaysOn), servicios Windows 99.5%.
- **Desempeño:** Latencia API P95 < 500 ms; SignalR < 300 ms; batch RIPS < 120 min.
  - FevRips: tiempos de generación/validación y reintentos controlados en `FevRips.ServiceWorker`.
- **Capacidad:** Usuarios concurrentes 1,000–2,500; pool SQL máx. 200; caché hit > 80%.
- **Seguridad:** TLS 1.2+, Azure AD con MFA, cifrado en reposo, DMZ + segmentación, auditoría y trazabilidad.

---

## 5. Compromisos y Hitos (resumen)

| Hito | Plazo | Responsable | Resultado |
|------|------:|-------------|-----------|
| Ampliar cobertura REST por dominios | 6–9 meses | Arquitectura/Backend | Endpoints REST para módulos de alto uso |
| Telemetría avanzada (App Insights) | 6 meses | DevOps | Dashboards de desempeño y errores correlacionados |
| Migración selectiva a ASP.NET Core | 12–18 meses | Arquitectura/Frontend | Frontends críticos en .NET moderno |
| Sustitución WCF/ASMX por microservicios | 18–24 meses | Backend | Servicios modernos, contratos estables |
| Automatizaciones a job services | 18–24 meses | Operaciones | Jobs modernos, reducción de servicios Windows |
| Operacionalización FevRips para reportería | 6–12 meses | Backend/Operaciones | Reporterías RIPS desacopladas, KPIs y trazabilidad |

---

## 6. Conclusión

Mientras .NET 4.5.2 es una base tecnológica legacy, **GHIPS** garantiza mantenibilidad, seguridad y continuidad evolutiva mediante: hardening y controles de seguridad; arquitectura por contratos; coexistencia de servicios modernos; monitoreo profundo; y un **roadmap de modernización por dominios** con KPIs y hitos verificables. Esto asegura que el producto se mantenga **actualizable, seguro y sostenible** en el tiempo, sin comprometer la operación clínica.

---

**Contacto:**  
Arquitectura de Solución GHIPS — arquitectura@ghips.com  
Operaciones/Seguridad — soporte@ghips.com
