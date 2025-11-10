# DOCUMENTACIÓN TÉCNICA COMPLETA
# GHIPS ERP FINANCIERO

---

## INFORMACIÓN GENERAL DEL SISTEMA

- **Nombre del Sistema**: GHIPS-ERP (Sistema ERP Financiero)
- **Fabricante**: IPS Universitaria
- **NIT Fabricante**: 811016192-8
- **Versión del Software**: 29.6.20220701
- **Plataforma**: ASP.NET MVC 5.3
- **Framework**: .NET Framework 4.8
- **Fecha de Documentación**: Noviembre 2025
- **Versión de Documentación**: 1.0

---

## ÍNDICE GENERAL

### 1. [Arquitectura y Componentes de la Aplicación](01_Arquitectura_y_Componentes.md)

Esta sección documenta la arquitectura completa del sistema, incluyendo:

- **1.1 Arquitectura de la Solución**
  - Patrón arquitectónico MVC
  - Capas de presentación, lógica de negocio y datos
  - Arquitectura de componentes
  
- **1.2 Frameworks y Tecnologías**
  - .NET Framework 4.8, ASP.NET MVC 5.3
  - Entity Framework 6.4.4
  - Librerías de terceros (JSON, PDF, Excel)
  - Frontend (jQuery, Knockout.js, DataTables)
  
- **1.3 Módulos Funcionales**
  - Módulo Financiero
  - Módulo Contable
  - Módulo Presupuestal
  - Módulo de Tesorería
  - Módulo de Terceros
  - Módulo de Cartera
  - Módulo de Reportería
  - Módulo de Administración
  
- **1.4 Especificaciones Técnicas**
  - +280 controladores MVC
  - +300 modelos de datos
  - +150 reportes SSRS
  - Integración con servicios externos

---

### 2. [Arquitectura y Modelo de Datos](02_Modelo_de_Datos.md)

Documentación completa de la estructura de base de datos:

- **2.1 Bases de Datos**
  - **Financiero**: Datos operacionales
  - **FinancieroSeguridad**: Usuarios y permisos
  
- **2.2 Esquema de Datos**
  - Módulo de Empresa y Organización
  - Módulo de Terceros
  - Módulo Contable (PCGA y NIIF)
  - Módulo Financiero
  - Módulo Presupuestal
  - Módulo de Tesorería
  - Módulo de Cartera y Glosas
  - Módulo de Reportería
  - Módulo de Indicadores
  - Módulo de Integración
  - Módulo de Importación Masiva
  - Módulo de Auditoría
  
- **2.3 Características Técnicas**
  - Doble contabilidad (PCGA/NIIF)
  - Trazabilidad completa
  - Saldos precalculados
  - Stored procedures y funciones
  - Índices y optimización

---

### 3. [Herramientas de Analítica, Reportes y Business Intelligence](03_Reportes_y_Analitica.md)

Documentación de capacidades de reportería y analítica:

- **3.1 Arquitectura de Reportería**
  - SQL Server Reporting Services (SSRS)
  - +150 reportes disponibles
  - Formatos: PDF, Excel, Web
  
- **3.2 Módulos de Reportes**
  - Reportes Financieros
  - Reportes Contables
  - Reportes Presupuestales
  - Reportes de Tesorería
  - Reportes de Cartera
  - Reportes de Auditoría
  
- **3.3 Indicadores y Dashboards**
  - Balanced Scorecard (BSC)
  - Indicadores de Gestión
  - Gráficos de Cartera
  - Cuadro de Mando Integral
  
- **3.4 Analítica Avanzada**
  - Medios Magnéticos DIAN
  - Taxonomía XBRL
  - Modelos de Informes Personalizados
  
- **3.5 Métricas de Monitoreo**
  - Uso de reportes
  - Desempeño de generación
  - Optimización

---

### 4. [Seguridad y Privacidad](04_Seguridad_y_Privacidad.md)

Documentación completa del modelo de seguridad:

- **4.1 Autenticación**
  - Forms Authentication / Windows Authentication
  - Gestión de contraseñas (PBKDF2)
  - Políticas de seguridad
  
- **4.2 Autorización**
  - RBAC (Role-Based Access Control)
  - Permisos granulares por acción
  - Restricción por sede y período
  
- **4.3 Definición de Roles**
  - **Roles Administrativos**: Administrador del Sistema, DBA
  - **Roles Contables**: Contador General, Auxiliar Contable
  - **Roles Financieros**: Gestor Financiero, Tesorero
  - **Roles Presupuestales**: Gestor Presupuestal
  - **Roles de Cartera**: Gestor de Cartera, Facturador
  - **Roles Técnicos**: Desarrollador, Soporte
  
- **4.4 Clasificación de Información**
  - Información Pública
  - Información Interna
  - Información Confidencial
  - Información Restringida
  
- **4.5 Auditoría y Trazabilidad**
  - Auditoría de todas las transacciones
  - Logs especializados por módulo
  - Trazabilidad de documentos
  - Retención de logs (1-7 años)
  
- **4.6 Cifrado y Protección**
  - HTTPS/TLS 1.2+
  - Cifrado de contraseñas
  - Protección de datos sensibles
  - TDE (opcional)
  
- **4.7 Cumplimiento Normativo**
  - Ley 1581 de 2012 (Habeas Data)
  - Decreto 1074 de 2015 (Facturación Electrónica)
  - ISO 27001
  - OWASP Top 10

---

### 5. [Escalabilidad y Desempeño](05_Escalabilidad_y_Desempeno.md)

Documentación de arquitectura técnica y estrategias de escalamiento:

- **5.1 Ambientes Requeridos**
  - Desarrollo
  - Testing/QA
  - Integración
  - Pre-Producción
  - Producción
  
- **5.2 Especificaciones de Infraestructura**
  - Servidor de Aplicación (IIS)
  - Servidor de Base de Datos (SQL Server)
  - Servidor de Reportes (SSRS)
  
- **5.3 Estrategias de Escalamiento**
  - **Escalamiento Vertical**: CPU, RAM, Disco
  - **Escalamiento Horizontal**: Load Balancing, Réplicas
  - **Particionamiento**: Por empresa, por año
  
- **5.4 Pruebas de Rendimiento**
  - Pruebas de Carga (hasta 1000 usuarios concurrentes)
  - Pruebas de Estrés
  - Pruebas de Resistencia (24-72 horas)
  
- **5.5 Indicadores y Métricas**
  - **Disponibilidad**: 99.5% objetivo
  - **Tiempo de respuesta**: < 3 segundos
  - **Throughput**: > 100 req/seg
  
- **5.6 Balanceo y Redundancia**
  - Load Balancer (IIS ARR, F5, Azure LB)
  - SQL Always On Availability Groups
  - Failover automático < 30 segundos
  
- **5.7 Monitoreo y Alertamiento**
  - Application Insights
  - SQL Server Monitoring
  - IIS Monitoring
  - Alertas críticas, advertencias, informativas

---

### 6. [Interoperabilidad e Integración](06_Interoperabilidad_e_Integracion.md)

Documentación de capacidades de integración:

- **6.1 Flujos de Información**
  - Flujo de Facturación y Recaudo
  - Flujo de Compras y Cuentas por Pagar
  - Flujo de Facturación Electrónica DIAN
  
- **6.2 Servicios de Integración**
  - **Web Services SOAP**: SevenERP (Recaudo)
  - **API REST**: API interna y externa
  - **Integración por Archivos**: Excel, CSV, XML
  
- **6.3 Protocolos Utilizados**
  - **HTTP/HTTPS**: APIs REST
  - **SOAP**: Web Services
  - **SMTP**: Email
  - **FTP/FTPS**: Archivos
  - **SQL**: Base de datos
  
- **6.4 Especificación de Protocolos**
  - **HL7**: No aplica (sistema financiero, no clínico)
  - **FHIR**: No aplica (sistema financiero, no clínico)
  - **UBL 2.1**: Facturación electrónica DIAN
  - **XBRL**: Reportes a Superintendencias
  
- **6.5 Indicadores de Integración**
  - Disponibilidad de servicios
  - Tiempo de respuesta
  - Tasa de éxito/error
  - Capacidad de procesamiento
  
- **6.6 Tecnologías Emergentes**
  - **IA**: Clasificación de documentos (planificado)
  - **Blockchain**: Trazabilidad (planificado)
  - **IoT**: Sensores de inventario (potencial)

---

## ACLARACIONES IMPORTANTES

### Sobre Interoperabilidad Clínica

**NOTA IMPORTANTE**: GHIPS-ERP Financiero es un **sistema ERP de gestión financiera, contable y presupuestal**, NO es un sistema clínico (EMR/EHR/HIS).

Por lo tanto, los siguientes protocolos y estándares de interoperabilidad clínica **NO APLICAN** a este sistema:

- ❌ **HL7 (Health Level Seven)**: Protocolo de intercambio de datos clínicos
- ❌ **FHIR (Fast Healthcare Interoperability Resources)**: Estándar de interoperabilidad clínica
- ❌ **DICOM**: Imágenes médicas
- ❌ **CDA (Clinical Document Architecture)**: Documentos clínicos estructurados
- ❌ **IHE (Integrating the Healthcare Enterprise)**: Perfiles de integración clínica

### Interoperabilidad Administrativa y Financiera Implementada

El sistema SÍ implementa los siguientes estándares de interoperabilidad administrativa y financiera:

- ✅ **UBL 2.1**: Facturación electrónica (estándar DIAN Colombia)
- ✅ **XBRL**: Reportes financieros a Superintendencias
- ✅ **Formatos DIAN**: Medios magnéticos tributarios
- ✅ **SOAP**: Integración con sistemas de recaudo
- ✅ **REST/JSON**: APIs de integración
- ✅ **XML**: Documentos electrónicos

### Relación con Sistemas Clínicos

Si bien este sistema NO es clínico, puede integrarse con sistemas hospitalarios (HIS) como GHIPS para:
- Recibir información de facturación de servicios médicos
- Gestionar cuentas por cobrar de servicios de salud
- Procesar pagos de entidades de salud (EPS, ARL, etc.)
- Generar reportes financieros del área de salud

Esta integración se realiza mediante:
- Importación de archivos Excel/CSV
- Servicios web específicos (no HL7/FHIR)
- Integración de bases de datos (lectura de vistas)

---

## RESUMEN EJECUTIVO DE CAPACIDADES

### Capacidades Implementadas ✅

| Categoría | Capacidad | Estado |
|-----------|-----------|--------|
| **Arquitectura** | MVC con separación de capas | ✅ |
| **Base de Datos** | SQL Server con doble contabilidad | ✅ |
| **Reportería** | 150+ reportes SSRS | ✅ |
| **BI** | Indicadores de gestión BSC | ✅ |
| **Seguridad** | RBAC, auditoría completa | ✅ |
| **Escalabilidad** | Escalamiento vertical y horizontal | ✅ |
| **Alta Disponibilidad** | Load balancing, failover | ✅ |
| **Integración** | SOAP, REST, archivos | ✅ |
| **Facturación E.** | UBL 2.1, DIAN | ✅ |
| **Medios Magnéticos** | Formatos DIAN | ✅ |
| **Taxonomía XBRL** | Superintendencias | ✅ |
| **Monitoreo** | Métricas en tiempo real | ✅ |

### Capacidades Parciales ⚠️

| Categoría | Capacidad | Estado | Observaciones |
|-----------|-----------|--------|---------------|
| **Dashboards** | Tiempo real | ⚠️ | Mediante reportes web |
| **TDE** | Cifrado BD | ⚠️ | Opcional, no obligatorio |
| **Réplicas BD** | Solo lectura | ⚠️ | Requiere Enterprise |
| **Webhooks** | Notificaciones | ⚠️ | Configurable |

### Capacidades No Implementadas ❌

| Categoría | Capacidad | Estado | Planificación |
|-----------|-----------|--------|---------------|
| **MFA** | Multi-Factor Auth | ❌ | Futuro |
| **Machine Learning** | IA predictiva | ❌ | Requiere análisis |
| **Blockchain** | Trazabilidad | ❌ | Requiere casos de uso |
| **IoT** | Sensores | ❌ | No aplicable actualmente |
| **GraphQL** | API avanzada | ❌ | Evaluación |
| **HL7/FHIR** | Interop. clínica | ❌ | No aplica (no es EMR) |

---

## MÉTRICAS CLAVE DEL SISTEMA

### Estadísticas de Código
- **Controladores MVC**: 280+
- **Modelos de Datos**: 300+
- **Reportes SSRS**: 150+
- **Scripts JavaScript**: 100+
- **Views Razor**: 400+
- **APIs REST**: 50+

### Capacidad de Procesamiento
- **Usuarios Concurrentes**: 500-1000
- **Transacciones/segundo**: 100-300
- **Reportes/día**: 500-2000
- **Registros/importación**: 50,000/hora

### Disponibilidad y Desempeño
- **Uptime Objetivo**: 99.5%
- **Tiempo de Respuesta**: < 3 segundos
- **RTO**: < 4 horas
- **RPO**: < 1 hora

---

## TECNOLOGÍAS UTILIZADAS

### Backend
- .NET Framework 4.8
- ASP.NET MVC 5.3
- Entity Framework 6.4.4
- SQL Server 2014+
- SSRS 2012+

### Frontend
- jQuery 1.7.1
- Knockout.js 2.0
- jQuery UI 1.8.16
- Bootstrap

### Integración
- Newtonsoft.Json 13.0.1
- EPPlus 4.5.3.3
- iTextSharp 5.5.13.4
- BouncyCastle 2.4.0
- Swashbuckle 5.6.0

---

## CONTACTO Y SOPORTE

Para más información sobre este sistema:

- **Fabricante**: IPS Universitaria
- **NIT**: 811016192-8
- **Nombre Software**: GHIPS-ERP

---

## CONTROL DE VERSIONES DEL DOCUMENTO

| Versión | Fecha | Autor | Cambios |
|---------|-------|-------|---------|
| 1.0 | Noviembre 2025 | Equipo de Desarrollo | Versión inicial completa |

---

## ÍNDICE DE ARCHIVOS DE DOCUMENTACIÓN

1. `00_Indice_General.md` - Este archivo (Índice maestro)
2. `01_Arquitectura_y_Componentes.md` - Arquitectura del sistema
3. `02_Modelo_de_Datos.md` - Estructura de base de datos
4. `03_Reportes_y_Analitica.md` - Reportería y BI
5. `04_Seguridad_y_Privacidad.md` - Seguridad y roles
6. `05_Escalabilidad_y_Desempeno.md` - Infraestructura y desempeño
7. `06_Interoperabilidad_e_Integracion.md` - Integraciones y protocolos

---

**Fecha de Elaboración**: Noviembre 2025  
**Versión del Documento**: 1.0  
**Estado**: Vigente  
**Próxima Revisión**: Noviembre 2026
