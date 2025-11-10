# DOCUMENTACIÓN TÉCNICA - GHIPS ERP FINANCIERO
## 1. ARQUITECTURA Y COMPONENTES DE LA APLICACIÓN

### Información General del Sistema
- **Nombre del Sistema**: GHIPS-ERP (Sistema ERP Financiero)
- **Fabricante**: IPS Universitaria (NIT: 811016192-8)
- **Versión**: 29.6.20220701
- **Plataforma**: ASP.NET MVC 5.3
- **Framework**: .NET Framework 4.8

---

## 1.1 ARQUITECTURA DE LA SOLUCIÓN

### 1.1.1 Patrón Arquitectónico
El sistema GHIPS-ERP Financiero está construido utilizando el patrón **MVC (Model-View-Controller)** basado en ASP.NET, lo que proporciona:
- Separación de responsabilidades
- Facilidad de mantenimiento
- Testabilidad
- Escalabilidad

### 1.1.2 Componentes Principales

#### A. Capa de Presentación
- **Tecnología**: ASP.NET MVC 5.3 + Razor Views
- **Framework Frontend**: 
  - jQuery 1.7.1
  - jQuery UI 1.8.16
  - Knockout.js 2.0 (MVVM Pattern)
  - jQuery DataTables 1.8.2
  - Bootstrap/Modernizr 2.0.6
- **Ubicación**: `/Views`

#### B. Capa de Lógica de Negocio
- **Controllers**: +280 controladores especializados
- **Principales áreas funcionales**:
  - Gestión Financiera (Compromisos, Comprobantes, Pagos)
  - Contabilidad (Movimientos Contables, Notas Contables, Cierres)
  - Presupuesto (Certificados, Modificaciones, Ejecución)
  - Tesorería (Bancos, Recaudos, Conciliaciones)
  - Terceros (Proveedores, Clientes, Empleados)
  - Cartera (Glosas, Objeciones, Facturación)
  - Reportería y Análisis
- **Ubicación**: `/Controllers`

#### C. Capa de Acceso a Datos
- **ORM**: Entity Framework 6.4.4 (Code First)
- **Contexto de Base de Datos**: `DatabaseContext.cs`
- **Entidades**: +300 modelos de dominio
- **Estrategia de acceso**: Repository Pattern integrado
- **Ubicación**: `/Models`

#### D. Capa de Servicios
- **Web API**: ASP.NET Web API 5.3
- **APIs especializadas**: `/Controllers/Apis`
- **Servicios externos**: 
  - SevenERP (Integración recaudos)
  - Servicios DIAN (Facturación electrónica)
  - Contapyme (Contabilidad electrónica)

#### E. Módulo de Reportería
- **Tecnología**: SQL Server Reporting Services (SSRS)
- **Proyecto**: Financiero.Reports
- **Cantidad de Reportes**: +150 reportes RDL
- **Tipos de salida**: PDF, Excel (XLS), Web
- **Reportes destacados**:
  - Balance de Comprobación
  - Estados Financieros
  - Ejecución Presupuestal
  - Certificados de Retención
  - Informes de Auditoría
  - Glosas y Objeciones
  - Cartera por edades

#### F. Servicios de Fondo (Background Workers)
- **Ubicación**: `/WorkProcess`
- **Framework**: NLog 5.1.0 (Logging)
- **Funcionalidades**:
  - Procesamiento de transacciones masivas
  - Integración con sistemas externos
  - Generación automática de reportes
  - Notificaciones por correo electrónico
  - Sincronización de datos

---

## 1.2 ESTRUCTURA DE PROYECTOS

### Proyecto Principal: Paradigma.ERP
- **Tipo**: Aplicación Web ASP.NET MVC
- **Target Framework**: .NET Framework 4.8
- **GUID**: {3A2E6826-2891-471B-B0B0-12E20439DEF7}

### Proyecto de Reportes: Financiero.Reports
- **Tipo**: Report Server Project
- **GUID**: {44850A17-760A-4ECF-AA91-0F6BFA871D98}
- **Archivos**: +150 archivos .rdl

### Proyectos de Pruebas
- Paradigma.ERP.Test
- Paradigma.ERP.Test1
- Pruebas1

---

## 1.3 FRAMEWORKS Y TECNOLOGÍAS UTILIZADAS

### 1.3.1 Backend Technologies

#### Framework Principal
- **.NET Framework 4.8**
- **ASP.NET MVC 5.3.0**
- **ASP.NET Web API 5.3.0**
- **ASP.NET Razor 3.3.0**

#### ORM y Acceso a Datos
- **Entity Framework 6.4.4**
- **System.Data.SqlClient** (SQL Server Provider)

#### Librerías de Terceros
| Librería | Versión | Propósito |
|----------|---------|-----------|
| Newtonsoft.Json | 13.0.1 | Serialización JSON |
| EPPlus | 4.5.3.3 | Generación de archivos Excel |
| iTextSharp | 5.5.13.4 | Generación de PDFs |
| BouncyCastle | 1.8.6.1 / 2.4.0 | Criptografía |
| Microsoft.ReportViewer.WebForms | 12.0 | Reportes SSRS |
| NLog | 5.1.0 | Logging y trazabilidad |
| Swashbuckle.Core | 5.6.0 | Documentación API Swagger |
| Microsoft.OpenApi | 1.6.14 | Especificaciones OpenAPI |

#### Componentes Corporativos (Custom)
- **libGHIPS.Reportes.dll** - Librería de reportes corporativa
- **Ips.Infrastructure.Mail.dll** - Infraestructura de correo
- **Ionic.Zip.dll** - Compresión de archivos
- **DocumentFormat.OpenXml** - Manipulación Office

### 1.3.2 Frontend Technologies

#### JavaScript Libraries
| Librería | Versión | Propósito |
|----------|---------|-----------|
| jQuery | 1.7.1 | Manipulación DOM |
| jQuery UI | 1.8.16 | Componentes UI |
| jQuery DataTables | 1.8.2 | Grillas de datos |
| Knockout.js | 2.0 | MVVM Data Binding |
| LINQ.js | 2.2.0.2 | Consultas en JavaScript |
| jQuery Validation | 1.9.0 | Validación de formularios |
| Modernizr | 2.0.6 | Feature Detection |

### 1.3.3 Lenguajes Utilizados
- **C# 7.0+** (Backend)
- **JavaScript/ECMAScript 5** (Frontend)
- **T-SQL** (Stored Procedures y Consultas)
- **HTML5/CSS3** (UI)
- **XML** (Configuración y RDL)
- **JSON** (Intercambio de datos)

---

## 1.4 ARQUITECTURA DE COMPONENTES

```
┌─────────────────────────────────────────────────────────────┐
│                      CAPA DE PRESENTACIÓN                    │
│  ┌────────────┐  ┌────────────┐  ┌──────────────────┐      │
│  │   Views    │  │  Scripts   │  │  Content/Styles  │      │
│  │  (Razor)   │  │ (jQuery/KO)│  │    (CSS/LESS)    │      │
│  └────────────┘  └────────────┘  └──────────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                  CAPA DE CONTROLADORES                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  280+ Controllers (MVC + Web API)                     │  │
│  │  - Financiero  - Contabilidad  - Presupuesto        │  │
│  │  - Tesorería   - Terceros      - Reportes           │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│               CAPA DE LÓGICA DE NEGOCIO                      │
│  ┌────────────┐  ┌────────────┐  ┌──────────────────┐      │
│  │  Services  │  │   Utils    │  │  WorkProcess     │      │
│  │  (Business)│  │  (Helpers) │  │  (Background)    │      │
│  └────────────┘  └────────────┘  └──────────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                  CAPA DE ACCESO A DATOS                      │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Entity Framework 6.4.4 (DatabaseContext)            │  │
│  │  300+ Entidades de Dominio                            │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                  BASE DE DATOS SQL SERVER                    │
│  ┌────────────────┐  ┌──────────────────────────────┐      │
│  │   Financiero   │  │   FinancieroSeguridad       │      │
│  │   (Principal)  │  │   (Seguridad y Usuarios)    │      │
│  └────────────────┘  └──────────────────────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                  SERVICIOS EXTERNOS                          │
│  ┌────────────┐  ┌────────────┐  ┌──────────────────┐      │
│  │  SevenERP  │  │    DIAN    │  │   Contapyme      │      │
│  │  (Recaudo) │  │  (Fact.E)  │  │  (Cont.Elect.)   │      │
│  └────────────┘  └────────────┘  └──────────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

---

## 1.5 MÓDULOS FUNCIONALES PRINCIPALES

### 1.5.1 Módulo Financiero
- Compromisos Financieros
- Comprobantes de Pago
- Órdenes de Pago
- Gestión de Anticipos
- Acuerdos de Pago
- Certificados de Disponibilidad
- Programación de Pagos

### 1.5.2 Módulo Contable
- Movimientos Contables (PCGA y NIIF)
- Notas Contables
- Cierre de Períodos
- Cierre Anual
- Balance de Comprobación
- Libro Mayor y Balance
- Libro Auxiliar
- Estados Financieros

### 1.5.3 Módulo Presupuestal
- Presupuesto de Ingresos y Gastos
- Certificados de Disponibilidad Presupuestal (CDP)
- Compromisos Presupuestales
- Reconocimientos Presupuestales
- Obligaciones Presupuestales
- Modificaciones Presupuestales
- Ejecución Presupuestal

### 1.5.4 Módulo de Tesorería
- Gestión de Cuentas Bancarias
- Movimientos Bancarios
- Conciliación Bancaria
- Recaudos
- Traslados entre Bancos
- Flujo de Caja
- Saldos Bancarios

### 1.5.5 Módulo de Terceros
- Gestión de Proveedores
- Gestión de Clientes
- Información Bancaria
- Responsabilidades Fiscales
- Retenciones
- Certificaciones

### 1.5.6 Módulo de Cartera
- Glosas y Objeciones
- Cuentas de Cobro
- Facturación
- Corte de Cartera
- Gestión de Recobros
- Administración Documental de Glosas

### 1.5.7 Módulo de Reportería
- Reportes Financieros
- Reportes Contables
- Reportes Presupuestales
- Reportes de Tesorería
- Reportes Fiscales
- Medios Magnéticos
- Taxonomía XBRL

### 1.5.8 Módulo de Administración
- Usuarios y Roles
- Permisos por Módulo
- Auditoría de Transacciones
- Parámetros del Sistema
- Gestión de Empresas y Sedes
- Configuración Contable

---

## 1.6 CONFIGURACIONES Y AMBIENTES

### 1.6.1 Ambientes Soportados
El sistema está configurado para operar en múltiples ambientes:

1. **Desarrollo Local** (DebugLocal)
2. **Desarrollo** (Debug)
3. **Testing/QA**
4. **Integración**
5. **Producción** (Release)

### 1.6.2 Configuraciones de Build
- CD_ROM
- Debug
- DebugLocal
- DVD-5
- Release
- SingleImage

### 1.6.3 Servidores de Reportes
El sistema se integra con SSRS (SQL Server Reporting Services) con configuración flexible:
- Servidor configurable por ambiente
- Autenticación Windows/SQL
- Carpetas de reportes organizadas
- Exportación a múltiples formatos

---

## 1.7 INTEGRACIÓN CON SISTEMAS EXTERNOS

### 1.7.1 SevenERP
- **Propósito**: Integración de recaudos
- **Protocolo**: SOAP Web Services
- **Namespace**: http://seven/
- **Servicios**:
  - STSRECAJSoap (Recaudos de caja)
  - Consulta de recaudos
  - Actualización de estados

### 1.7.2 DIAN (Dirección de Impuestos y Aduanas Nacionales)
- **Propósito**: Facturación y documentos electrónicos
- **Funcionalidades**:
  - Emisión de facturas electrónicas
  - Notas crédito/débito electrónicas
  - Certificados de retención
- **Ambiente**: Configurable (Producción/Pruebas)

### 1.7.3 Contapyme
- **Propósito**: Contabilidad electrónica
- **Formato**: JSON
- **Funcionalidades**:
  - Transmisión de información contable
  - Reportes a entidades de control

---

## 1.8 GESTIÓN DE LOGGING Y AUDITORÍA

### 1.8.1 Enterprise Library Logging
- **Versión**: 5.0.414.0
- **Listeners**: 
  - Rolling Flat File Trace Listener
  - Event Log Trace Listener
- **Niveles de prioridad**: 2-99
- **Categorías**: Important, All Events, Unprocessed, Errors & Warnings

### 1.8.2 NLog
- **Versión**: 5.1.0
- **Uso**: WorkProcess y servicios de fondo
- **Configuración**: Basada en archivos

### 1.8.3 Auditoría de Transacciones
- **Filtro**: AuditFilter (IActionFilter)
- **Almacenamiento**: Base de datos (tabla Auditorias)
- **Información capturada**:
  - Usuario
  - Acción
  - Timestamp
  - Datos modificados
  - IP del cliente

---

## 1.9 GESTIÓN DE DOCUMENTOS

### 1.9.1 Documentos Escaneados
- **Soporte FTP** para almacenamiento
- **Tipos soportados**: PDF, imágenes
- **Módulos con documentos**:
  - Compromisos Financieros
  - Comprobantes de Pago
  - Glosas
  - Contratos

### 1.9.2 Generación de Documentos
- **PDF**: iTextSharp 5.5.13
- **Excel**: EPPlus 4.5.3
- **Reportes SSRS**: Múltiples formatos
- **Compresión**: Ionic.Zip

---

## 1.10 MODELO DE DEPLOYMENT

### 1.10.1 Servidor de Aplicación
- **Plataforma**: IIS (Internet Information Services)
- **Autenticación**: Windows Authentication / Forms Authentication
- **Application Pool**: .NET Framework v4.8
- **Session State**: In-Process / SQL Server

### 1.10.2 Servidor de Base de Datos
- **Motor**: SQL Server 2014+
- **Bases de datos**:
  - Financiero (principal)
  - FinancieroSeguridad (usuarios y permisos)
- **Características utilizadas**:
  - Stored Procedures
  - Views
  - Functions
  - Triggers
  - Full-Text Search (opcional)

### 1.10.3 Servidor de Reportes
- **Tecnología**: SQL Server Reporting Services (SSRS)
- **Versión**: 2012+
- **Modo**: Modo Nativo
- **Carpetas**: Organizadas por cliente/sede

---

## 1.11 DOCUMENTACIÓN SWAGGER/OPENAPI

El sistema incluye documentación automática de APIs mediante:
- **Swashbuckle.Core 5.6.0**
- **Microsoft.OpenApi 1.6.14**
- **Acceso**: /swagger
- **Especificación**: OpenAPI 3.0

---

## 1.12 RESUMEN DE COMPONENTES

| Componente | Cantidad | Tecnología Principal |
|------------|----------|----------------------|
| Controladores MVC | 280+ | ASP.NET MVC 5.3 |
| Modelos de Datos | 300+ | Entity Framework 6.4.4 |
| Reportes RDL | 150+ | SSRS |
| Scripts JavaScript | 100+ | jQuery/Knockout.js |
| Views Razor | 400+ | Razor Engine |
| APIs REST | 50+ | Web API 5.3 |
| Servicios de Fondo | 10+ | Windows Services/Tasks |
| Stored Procedures | 200+ | T-SQL |

---

**Fecha de Elaboración**: Noviembre 2025  
**Versión del Documento**: 1.0  
**Estado**: Vigente
