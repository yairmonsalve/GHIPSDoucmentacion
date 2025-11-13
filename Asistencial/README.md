# GHIPS - Gestión Hospitalaria Integral de Procesos de Salud

[[_TOC_]]

<div align="center">

![.NET Framework](https://img.shields.io/badge/.NET%20Framework-4.5.2--4.6.1-512BD4?logo=.net)
![SQL Server](https://img.shields.io/badge/SQL%20Server-2012+-CC2927?logo=microsoft-sql-server)
![Azure](https://img.shields.io/badge/Azure-Integrated-0078D4?logo=microsoft-azure)
![License](https://img.shields.io/badge/License-Proprietary-red)

**Sistema EMR/EHR Integral para Instituciones de Salud**

[Documentación](#-documentación) • [Arquitectura](#-arquitectura) • [Instalación](#-instalación) • [Contribuir](#-contribuir)

</div>

---

> Desarrollado por TEAM GHIPS. GHIPS es una marca registrada. © 2025 TEAM GHIPS. Todos los derechos reservados.

## 📋 Tabla de Contenidos

- [Descripción](#-descripción)
- [Características Principales](#-características-principales)
- [Arquitectura](#-arquitectura)
- [Tecnologías](#️-tecnologías)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Requisitos](#-requisitos)
- [Instalación](#-instalación)
- [Configuración](#️-configuración)
- [Módulos Funcionales](#-módulos-funcionales)
- [Documentación](#-documentación)
- [Roadmap](#-roadmap)
- [Licencia](#-licencia)

---

## 🏥 Descripción

**GHIPS** es un sistema integral de gestión hospitalaria tipo **EMR (Electronic Medical Record)** / **HIS (Hospital Information System)** desarrollado en .NET Framework, diseñado para instituciones de salud de mediana y alta complejidad en Colombia.

### Alcance del Sistema

- **Historia Clínica Electrónica** completa y normativa
- **Gestión administrativa** y financiera hospitalaria
- **Interoperabilidad** con sistemas externos (MIPRES, EPS, ministerio)
- **Business Intelligence** con Power BI embebido
- **Telemedicina** integrada
- **Trazabilidad** farmacéutica y clínica
- **Modelo SaaS** y on-premise

---

## ✨ Características Principales

### Funcionalidades Clínicas

- 📝 Historia clínica electrónica integral (consulta externa, urgencias, hospitalización, cirugía)
- 🏥 Gestión de admisiones, camas y turnos médicos
- 💊 Farmacia y trazabilidad de medicamentos con QR
- 🔬 Laboratorios e imagenología con PACS
- 🩺 AIEPI, odontología, vacunación, triaje
- 🚑 Banco de sangre y trasplantes
- 📊 Control de infecciones (IAAS) y farmacovigilancia

### Funcionalidades Administrativas

- 💰 Facturación electrónica y GRDs
- 🔐 Autorizaciones internas y externas
- 📈 Indicadores de gestión y Power BI
- 📄 1354+ reportes RDLC automatizados
- 🔄 Integración con MIPRES y RIPS
- 📋 Anexos regulatorios (9, 10) automáticos

### Tecnología Avanzada

- ⚡ Notificaciones en tiempo real (SignalR)
- ☁️ Integración Azure ( AD, Power BI)
- 🔗 APIs REST/SOAP/WCF para interoperabilidad
- 📊 Dashboards ejecutivos con Power BI Embedded
- 🌐 Arquitectura multi-tenant SaaS

---

## 🏗️ Arquitectura

### Diagrama General

```
┌─────────────────────────────────────────────────────────────┐
│                 CAPA DE PRESENTACIÓN                        │
│                   ┌──────────────┐                          │
│                   │ Ghips.Web    │                          │
│                   │ (ASP.NET)    │                          │
│                   └──────────────┘                          │
└─────────────────────────────────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                     CAPA DE SERVICIOS                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │ REST APIs    │  │ WCF Services │  │ SOAP WebSvc  │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
└─────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                  CAPA LÓGICA DE NEGOCIO                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │ Core         │  │ Domain       │  │ Logica       │       │
│  │ (Business)   │  │ (Entities)   │  │ (Legacy)     │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
└─────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                  CAPA DE INFRAESTRUCTURA                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │ Security     │  │ Connect      │  │ LibBD        │       │
│  │ (Auth)       │  │ (Interop)    │  │ (Data)       │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
└─────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      CAPA DE DATOS                          │
│              SQL Server - 42+ Esquemas                      │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐        │
│  │ Clínicos │ │ Administ │ │ Soporte  │ │ Especial │        │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘        │
└─────────────────────────────────────────────────────────────┘
```

**Patrón:** N-Tier + SOA + Microservicios (en evolución)

Ver [Arquitectura_General_GHIPS_EMR.md](Arquitectura_General_GHIPS_EMR.md) para detalles completos.

---

## 🛠️ Tecnologías

### Stack Principal

| Categoría | Tecnología | Versión |
|-----------|-----------|---------|
| **Backend** | .NET Framework | 4.5.2 - 4.6.1 |
| **Lenguaje** | C# | 6.0 |
| **Web Framework** | ASP.NET WebForms, Web API | - |
| **Servicios** | WCF, SOAP/ASMX | - |
| **ORM** | Entity Framework, ADO.NET | - |
| **DI Container** | Microsoft Unity | 5.11.7 |
| **Base de Datos** | SQL Server | 2012+ |
| **Caching** | Enterprise Library Caching | 5.0.414 |
| **Logging** | Enterprise Library Logging | 5.0.414 |

### Frontend

| Tecnología | Versión |
|-----------|---------|
| jQuery | 1.10.2 |
| Knockout.js | 3.2.0 |
| Bootstrap | 3.2.0.1 |
| Kendo UI | 2014.1.318 |
| Chart.js | 3.7.1 |
| SignalR | 2.4.3 |

### Cloud & Integración

| Servicio | Uso |
|----------|-----|
| Azure AD | SSO, autenticación federada |
| Power BI Embedded | Dashboards ejecutivos |
| MIPRES | Integración ministerio |
| HL7/FHIR | Interoperabilidad clínica |

### Librerías Destacadas

- **Documentos:** EPPlus (7.0.10), ClosedXML (0.95.4), iTextSharp (4.1.2), Select.Pdf (18.3.0)
- **APIs:** RestSharp (106.11.7), Newtonsoft.Json (10.0.2), OData (5.2.0)
- **Utilidades:** AutoMapper (4.1.1), QRCoder (1.4.1), HtmlAgilityPack (1.4.9.5)

---

## 📁 Estructura del Proyecto

```
GhipsDev/
│
├── 📄 Ghips.sln                              # Solución principal (40+ proyectos)
│
├── 📚 Documentación/
│   ├── Arquitectura_GHIPS_EMR.md
│   ├── Arquitectura_General_GHIPS_EMR.md
│   ├── Interoperabilidad_GHIPS_EMR.md
│   ├── Seguridad_Privacidad_GHIPS_EMR.md
│   └── Escalabilidad_Desempeno_GHIPS_EMR.md
│
├── 🌐 Presentación/
│   ├── Ips.Gestion.Ghips.Web/               # Aplicación web principal
│
├── 🔌 Servicios/
│   ├── Ips.Gestion.Ghips.ServiciosApis/     # REST APIs
│   ├── Ips.Gestion.Ghips.Services.Wcf/      # WCF Services
│   └── Ips.Gestion.Ghips.Services.Ws/       # SOAP Web Services
│
├── 💼 Lógica de Negocio/
│   ├── Ips.Gestion.Ghips.Core/              # Núcleo del negocio
│   ├── Ips.Gestion.Ghips.Domain/            # Modelos de dominio
│   ├── Ips.Gestion.Ghips.Domain.To/         # DTOs
│   ├── libGHIPS.Logica/                     # Lógica legacy
│   └── libGHIPS.Logica.Config/              # Configuraciones
│
├── 🔧 Infraestructura/
│   ├── Ips.Gestion.Ghips.Infrastructure/    # Servicios técnicos
│   ├── Ips.Gestion.Ghips.Security/          # Seguridad
│   ├── Ips.Gestion.Ghips.Connect/           # Conectores
│   ├── Ips.Gestion.Ghips.Interfaces/        # Contratos
│   └── LibBD/                               # Acceso a datos
│
├── 🗄️ Base de Datos/
│   └── Ips.Gestion.Ghips.BaseDatos/         # SQL Server Database Project
│       ├── dbo/                              # Esquema principal
│       ├── ConsultaExterna/                  # Esquema consulta
│       ├── Cirugia/                          # Esquema cirugía
│       ├── Facturacion/                      # Esquema facturación
│       └── [38+ esquemas más...]
│
├── 🖥️ Servicios Windows/
│   ├── Ips.Gestion.Ghips.Win.ServiceGhips/
│   ├── Ips.Gestion.ServicioWinTrazabilidad/
│   ├── Ips.Gestion.Ghips.Win.SendMail/
│   ├── Ips.Gestion.Ghips.Win.EnvioMedicamentos/
│   ├── Ips.Gestion.Ghips.Win.EnvioOrdenes/
│   ├── Ips.Gestion.Ghips.Win.EnvioHistoriaClinica/
│   ├── Ips.Gestion.Ghips.Win.EnvioInfoFinanciero/
│   └── Ips.Gestion.Ghips.Win.EnviarInfoGerencial/
│
├── 🧪 Pruebas/
    ├── Ips.Gestion.Ghips.Test/
    ├── Ips.Gestion.Ghips.Vias.Test/
    └── Ips.Gestion.Ghips.Vias.Test2/

```

---

## 💻 Requisitos

### Servidor de Aplicaciones Web

- **SO:** Windows Server 2019 o superior
- **IIS:** 8.5+ con ASP.NET 4.x
- **Framework:** .NET Framework 4.5.2 - 4.6.1
- **RAM:** 8-16 GB (16+ GB recomendado)
- **CPU:** 4+ vCPU
- **Características IIS:**
  - WebSocket Protocol (SignalR)
  - Dynamic Content Compression
  - Application Initialization

### Servidor de Base de Datos

- **Motor:** Microsoft SQL Server 2019+
- **Edición:** Standard o Enterprise
- **RAM:** 16-32+ GB
- **Almacenamiento:** SSD recomendado
- **Características:**
  - Full-Text Search
  - SQL Server Agent

### Servidor de Servicios Windows

- **SO:** Windows Server 2019+
- **Framework:** .NET Framework 4.5.2+
- **RAM:** 8+ GB
- **CPU:** 4+ vCPU

### Componentes Cloud (Opcional)

- Cuenta Azure (AD, Power BI)
- Conectividad a servicios externos (MIPRES, telemedicina, FEVRIPS; FACTURACIÓN)

### Herramientas de Desarrollo

- Visual Studio 2019/2022
- SQL Server Management Studio (SSMS)
- SQL Server Data Tools (SSDT)
- Git (control de versiones) TFVC (Team Foundation Version Control)

---

## 🚀 Instalación

### 1. Clonar el Repositorio

```powershell
git clone <repository-url>
cd GhipsDev
```
### 2. Restaurar Paquetes NuGet

```powershell
# En Visual Studio: Tools > NuGet Package Manager > Restore NuGet Packages
# O desde línea de comandos:
nuget restore Ghips.sln
```

### 3. Configurar Base de Datos

```powershell
# Abrir SQL Server Management Studio
# Ejecutar scripts de creación desde Ips.Gestion.Ghips.BaseDatos/
# O publicar proyecto de base de datos desde Visual Studio
```

### 4. Configurar Conexiones

Editar archivos `Web.config` / `App.config`:

```xml
<connectionStrings>
  <add name="DefaultConnection" 
       connectionString="Server=YOUR_SERVER;Database=GhipsDB;Integrated Security=true;Max Pool Size=200" 
       providerName="System.Data.SqlClient" />
</connectionStrings>
```

### 5. Compilar Solución

```powershell
# En Visual Studio: Build > Build Solution (Ctrl+Shift+B)
# O desde línea de comandos con MSBuild:
msbuild Ghips.sln /p:Configuration=Release
```

### 6. Desplegar Aplicación Web

```powershell
# Publicar desde Visual Studio o copiar binarios a IIS
# Configurar Application Pool (.NET Framework 4.x, Integrated Pipeline)
```

### 7. Instalar Servicios Windows

```powershell
# Usar instaladores MSI en carpeta Ips.Gestion.InstaladoresServicios/
# O instalar manualmente con InstallUtil.exe
```

---

## ⚙️ Configuración

### Ambientes Disponibles

El sistema soporta **14 configuraciones de ambiente**:

**Desarrollo:**
- Debug
- Review
- Testing
- Integracion

**Producción On-Premise:**
- Abaton, AlmaMater, ClinicaNorte, SantaAna, Tesoro, Urogine

**Producción SaaS:**
- GenezenSaaS, ImecoSaaS, UroclinSaaS, PromedanSaaS, AsuncionSaaS

### Configuración Multi-Tenant

Cada tenant tiene configuración independiente en:
- Connection strings
- Azure Storage keys
- Power BI workspace IDs
- Endpoints de servicios externos

### Configuración de Seguridad

```xml
<!-- Azure AD -->
<add key="ida:ClientId" value="YOUR_CLIENT_ID" />
<add key="ida:AADInstance" value="https://login.microsoftonline.com/" />
<add key="ida:TenantId" value="YOUR_TENANT_ID" />

<!-- Azure Storage -->
<add key="StorageConnectionString" value="DefaultEndpointsProtocol=https;AccountName=..." />
```

---

## 🧩 Módulos Funcionales

### Módulos Clínicos (16+)

| Módulo | Descripción |
|--------|-------------|
| **Consulta Externa** | Atención ambulatoria, historias clínicas |
| **Urgencias** | Triaje, atención de urgencias |
| **Hospitalización** | Gestión de camas, evoluciones |
| **Cirugía** | Programación quirúrgica, registros anestésicos |
| **AIEPI** | Atención pediátrica integral |
| **Odontología** | Odontograma, tratamientos dentales |
| **Laboratorios** | Órdenes, resultados, interfaz con equipos |
| **Ayudas Diagnósticas** | Imagenología, electrocardiogramas |
| **Transfusiones** | Banco de sangre, hemoderivados |
| **Trasplantes** | Gestión de trasplantes |
| **Vacunación** | Esquemas de vacunación, carnés |
| **Triaje** | Clasificación de urgencias (Manchester) |
| **Farmacovigilancia** | Reacciones adversas, tecnovigilancia |
| **Control Infecciones** | IAAS, aislamiento, cultivos |
| **PyP** | Promoción y prevención |
| **Interconsultas** | Solicitud y seguimiento |

### Módulos Administrativos (8+)

| Módulo | Descripción |
|--------|-------------|
| **Admisiones** | Gestión de ingresos, censos |
| **Facturación** | Facturación electrónica, RIPS |
| **Autorizaciones** | Gestión interna y externa (EPS) |
| **GRDs** | Grupos relacionados de diagnóstico |
| **Turnos** | Programación de turnos médicos |
| **Administrar Piso** | Gestión de camas, traslados |
| **Avales** | Avales médicos |
| **Medicamentos** | Farmacia, dispensación |

### Módulos de Soporte (10+)

| Módulo | Descripción |
|--------|-------------|
| **Órdenes** | Órdenes médicas centralizadas |
| **Parametrización** | Configuración del sistema |
| **Seguridad** | Usuarios, roles, permisos |
| **Mensajes** | Mensajería interna |
| **Noticias** | Comunicados institucionales |
| **Soporte** | Tickets de soporte técnico |
| **Storage** | Gestión documental |
| **Rotulaciones** | Rotulado de muestras |
| **Anexo 9 / Anexo 10** | Formatos regulatorios |

---

## 📚 Documentación

### Documentos Generados

- **[Arquitectura Completa (Consolidado)](Arquitectura_Completa_GHIPS_EMR.md)** - Resumen integrado con enlaces a todos los temas
- **[Arquitectura General](Arquitectura_General_GHIPS_EMR.md)** - Visión completa de componentes, datos y tecnologías
- **[Arquitectura Detallada](Arquitectura_GHIPS_EMR.md)** - Descripción profunda de la arquitectura técnica
- **[Interoperabilidad](Interoperabilidad_GHIPS_EMR.md)** - Flujos de integración, protocolos HL7/FHIR, servicios
- **[Seguridad y Privacidad](Seguridad_Privacidad_GHIPS_EMR.md)** - Roles, clasificación de información, controles
- **[Escalabilidad y Desempeño](Escalabilidad_Desempeno_GHIPS_EMR.md)** - Pruebas de carga, métricas, estrategias de escalamiento
 - **[Paquete de Auditoría EMR (Evidencias)](../Auditoria_EMR/README.md)** - Respuestas por tema para auditoría (con TOC)

### Diagramas

Todos los documentos incluyen diagramas Mermaid que pueden visualizarse:

1. **En VS Code:** Instalar extensión "Markdown Preview Mermaid Support"
2. **En Navegador:** https://mermaid.live (copiar y pegar código)
3. **En GitHub:** Los archivos .md renderizan Mermaid automáticamente

---

## 🗺️ Roadmap

### Corto Plazo (6-12 meses)

- ✅ Migración progresiva a .NET Core / .NET 6+
- ✅ Refactorización a microservicios (servicios críticos)
- ✅ Implementación de API Gateway
- ✅ Containers Docker + Kubernetes

### Mediano Plazo (12-18 meses)

#### IA y Machine Learning
- 🤖 Predicción de reingresos hospitalarios
- 🤖 Detección temprana de sepsis
- 🤖 Optimización de asignación de quirófanos
- 🤖 NLP para análisis de notas médicas
- 🤖 Chatbot de triaje virtual

#### Computer Vision
- 👁️ Detección de anomalías en rayos X
- 👁️ Clasificación de imágenes dermatológicas
- 👁️ Identificación de nódulos pulmonares

### Largo Plazo (18-30 meses)

#### IoT Médico
- 📡 Monitoreo remoto de pacientes
- 📡 Integración con wearables
- 📡 Telemetría de signos vitales en tiempo real
- 📡 Alertas proactivas de deterioro clínico

#### Blockchain
- 🔗 Historia clínica distribuida
- 🔗 Consent management
- 🔗 Smart contracts para autorizaciones
- 🔗 Interoperabilidad inter-institucional segura

---

## 📊 Métricas y KPIs

### Disponibilidad
- Web App: **99.5%** (objetivo)
- Base de Datos: **99.9%** (con AlwaysOn)
- Servicios Windows: **99.5%**

### Desempeño
- Latencia API (P95): **< 500 ms**
- Latencia SignalR: **< 300 ms**
- Batch RIPS: **< 120 min**

### Capacidad
- Usuarios concurrentes: **1,000-2,500** (actual)
- Pool de conexiones SQL: **200 max**
- Hit ratio de caché: **> 80%**

### Calidad
- **1354+ reportes** RDLC disponibles
- **42+ esquemas** de base de datos
- **40+ proyectos** en la solución
- **8+ servicios** Windows automatizados

---

## 🔒 Seguridad

### Cumplimiento Normativo
- ✅ Ley 1581/2012 (Protección de datos - Colombia)
- ✅ Resolución 2003/2014 (Historia clínica electrónica)
- ✅ HIPAA/HITECH (referencia internacional)
- ✅ ISO 27001 (en proceso de certificación)

### Controles Implementados
- Azure AD con SSO 
- Cifrado TLS 1.2+ en tránsito
- Cifrado AES/TDE en reposo
- Auditoría completa con trazabilidad
- Segregación de funciones por rol
- Enmascaramiento de datos sensibles

---

## 🤝 Contribuir

### Proceso de Desarrollo

1. **Branching:** Usar Git Flow (feature/, hotfix/, release/)
2. **Code Review:** Pull requests obligatorios
3. **Testing:** Pruebas unitarias + integración
4. **Documentación:** Actualizar docs con cada feature

### Estándares de Código

- Seguir convenciones de C# (PascalCase, camelCase)
- XML Documentation en clases públicas
- Inyección de dependencias con Unity
- Logging con Enterprise Library

### Ambientes de Prueba

- **Debug:** Desarrollo local
- **Review:** Revisión de código
- **Testing:** QA automatizado
- **Integracion:** CI/CD pipeline


## 📜 Licencia

**Propietario:** TEAM GHIPS  
**Derechos Reservados:** Todos los derechos reservados © 2025  
**Marca:** GHIPS © es una marca registrada del TEAM GHIPS

Este software es de uso exclusivo para instituciones de salud autorizadas bajo contrato de licencia.

---

## 🙏 Agradecimientos

Desarrollado con ❤️ por TEAM GHIPS para transformar la atención en salud.

**Tecnologías core:** Microsoft .NET, SQL Server, Azure  
**Frameworks:** ASP.NET, SignalR, Unity, Enterprise Library  
**BI:** Power BI, Kendo UI, Chart.js

---

<div align="center">

**[⬆ Volver arriba](#ghips---gestion-hospitalaria-integral-de-procesos-de-salud)**

</div>
