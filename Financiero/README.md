# 📚 Documentación Técnica - GHIPS ERP Financiero

![Version](https://img.shields.io/badge/version-1.0-blue.svg)
![.NET](https://img.shields.io/badge/.NET-4.8-purple.svg)
![SQL Server](https://img.shields.io/badge/SQL%20Server-2014+-red.svg)
![Status](https://img.shields.io/badge/status-vigente-green.svg)

## 🏥 Sistema de Gestión Financiera para Instituciones de Salud

**GHIPS-ERP Financiero** es un sistema integral de gestión financiera, contable y presupuestal diseñado específicamente para instituciones de salud en Colombia.

---

## 📋 Tabla de Contenidos

- [Información General](#información-general)
- [Documentación Disponible](#documentación-disponible)
- [Inicio Rápido](#inicio-rápido)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Módulos Principales](#módulos-principales)
- [Preguntas de Auditoría](#preguntas-de-auditoría)
- [Características Destacadas](#características-destacadas)
- [Requisitos del Sistema](#requisitos-del-sistema)
- [Soporte y Contacto](#soporte-y-contacto)

---

## ℹ️ Información General

| Característica | Detalle |
|----------------|---------|
| **Nombre** | GHIPS-ERP Sistema Financiero |
| **Fabricante** | IPS Universitaria |
| **NIT** | 811016192-8 |
| **Versión** | 29.6.20220701 |
| **Plataforma** | ASP.NET MVC 5.3 |
| **Framework** | .NET Framework 4.8 |
| **Base de Datos** | SQL Server 2014+ |

---

## 📖 Documentación Disponible

Esta carpeta contiene la documentación técnica completa del sistema, organizada en los siguientes documentos:

### 📑 Índice y Navegación
- **[00_Indice_General.md](00_Indice_General.md)** - Índice maestro y resumen ejecutivo

### 🏗️ Arquitectura y Diseño
- **[01_Arquitectura_y_Componentes.md](01_Arquitectura_y_Componentes.md)**
  - Patrón arquitectónico MVC
  - Frameworks y tecnologías
  - Módulos funcionales
  - 280+ controladores, 300+ modelos

### 💾 Base de Datos
- **[02_Modelo_de_Datos.md](02_Modelo_de_Datos.md)**
  - Esquema completo de base de datos
  - Doble contabilidad (PCGA/NIIF)
  - Relaciones y cardinalidad
  - Estrategias de optimización

### 📊 Reportería y Analítica
- **[03_Reportes_y_Analitica.md](03_Reportes_y_Analitica.md)**
  - 150+ reportes SSRS
  - Business Intelligence
  - Indicadores de gestión (BSC)
  - Dashboards y métricas

### 🔐 Seguridad
- **[04_Seguridad_y_Privacidad.md](04_Seguridad_y_Privacidad.md)**
  - Autenticación y autorización
  - Roles y permisos (RBAC)
  - Clasificación de información
  - Auditoría completa
  - Cumplimiento normativo

### ⚡ Rendimiento
- **[05_Escalabilidad_y_Desempeno.md](05_Escalabilidad_y_Desempeno.md)**
  - Estrategias de escalamiento
  - Pruebas de carga y estrés
  - Balanceo de carga
  - Alta disponibilidad
  - Monitoreo y alertas

### 🔗 Integración
- **[06_Interoperabilidad_e_Integracion.md](06_Interoperabilidad_e_Integracion.md)**
  - Flujos de información
  - Web Services SOAP/REST
  - Facturación electrónica DIAN
  - Protocolos y estándares
  - APIs de integración

---

## 🚀 Inicio Rápido

### Para Auditores
1. Comience con **[00_Indice_General.md](00_Indice_General.md)** para una visión general
2. Revise las secciones específicas según sus necesidades de auditoría
3. Cada documento es autocontenido y puede ser revisado independientemente

### Para Desarrolladores
1. Lea **[01_Arquitectura_y_Componentes.md](01_Arquitectura_y_Componentes.md)** para entender la arquitectura
2. Revise **[02_Modelo_de_Datos.md](02_Modelo_de_Datos.md)** para el esquema de BD
3. Consulte **[06_Interoperabilidad_e_Integracion.md](06_Interoperabilidad_e_Integracion.md)** para integraciones

### Para Administradores de Sistema
1. Consulte **[05_Escalabilidad_y_Desempeno.md](05_Escalabilidad_y_Desempeno.md)** para infraestructura
2. Revise **[04_Seguridad_y_Privacidad.md](04_Seguridad_y_Privacidad.md)** para configuración de seguridad

---

## 🛠️ Tecnologías Utilizadas

### Backend
```
.NET Framework 4.8
ASP.NET MVC 5.3
Entity Framework 6.4.4
SQL Server 2014+
SSRS 2012+
```

### Frontend
```
jQuery 1.7.1
Knockout.js 2.0
jQuery UI 1.8.16
Bootstrap
DataTables
```

### Integración
```
Newtonsoft.Json 13.0.1
EPPlus 4.5.3.3 (Excel)
iTextSharp 5.5.13.4 (PDF)
BouncyCastle 2.4.0 (Cifrado)
Swashbuckle 5.6.0 (Swagger)
```

---

## 📦 Módulos Principales

### 💰 Módulo Financiero
- Compromisos Financieros
- Comprobantes de Pago
- Órdenes de Pago
- Certificados de Disponibilidad
- Programación de Pagos

### 📒 Módulo Contable
- Contabilidad PCGA y NIIF
- Movimientos Contables
- Notas Contables
- Cierre de Períodos
- Estados Financieros

### 💵 Módulo Presupuestal
- Presupuesto de Ingresos/Gastos
- CDP (Certificados de Disponibilidad)
- Ejecución Presupuestal
- Modificaciones Presupuestales

### 🏦 Módulo de Tesorería
- Gestión de Cuentas Bancarias
- Movimientos Bancarios
- Conciliación Bancaria
- Recaudos

### 👥 Módulo de Terceros
- Proveedores y Clientes
- Información Bancaria
- Retenciones
- Certificaciones

### 📊 Módulo de Cartera
- Glosas y Objeciones
- Facturación
- Gestión de Recobros
- Administración Documental

---

## ✅ Preguntas de Auditoría Cubiertas

Esta documentación responde completamente a las siguientes preguntas de auditoría:

### Arquitectura
- ✅ Arquitectura y componentes de aplicación
- ✅ Documentación técnica de la solución
- ✅ Especificación de frameworks, lenguajes y librerías
- ✅ Arquitectura y modelo de datos
- ✅ Arquitectura técnica y ambientes requeridos

### Analítica y Reportes
- ✅ Herramientas o módulos de analítica (Reportes, BI, Dashboards)
- ✅ Indicadores y métricas de monitoreo, capacidad, desempeño

### Escalabilidad
- ✅ Resultados de pruebas de carga, estrés o rendimiento
- ✅ Estrategias de escalamiento horizontal y vertical
- ✅ Configuraciones de balanceo de carga y redundancia
- ✅ Mecanismos de Failover y disponibilidad
- ✅ Procedimiento de monitoreo, capacidad y alertamiento

### Seguridad
- ✅ Definición de roles y perfiles de acceso
- ✅ Capacidades para clasificación de información
- ✅ Auditoría y trazabilidad completa

### Interoperabilidad
- ✅ Arquitectura y flujos de información
- ✅ Servicios o capacidades de integración disponibles
- ✅ Especificación de protocolos utilizados
- ✅ Indicadores y métricas de disponibilidad

### Tecnologías Emergentes
- ✅ Capacidades en desarrollo, automatización, analítica avanzada, IA e IoT
- ✅ Casos de uso implementados o planificados

### Extensibilidad
- ✅ Capacidades de extensibilidad y personalización

---

## ⭐ Características Destacadas

### 🎯 Funcionalidades Clave
- ✅ **Doble Contabilidad**: PCGA y NIIF en paralelo
- ✅ **Facturación Electrónica**: Integración con DIAN (UBL 2.1)
- ✅ **150+ Reportes**: SSRS con exportación a PDF/Excel
- ✅ **Auditoría Completa**: Trazabilidad de todas las transacciones
- ✅ **Multi-empresa**: Manejo de múltiples empresas y sedes
- ✅ **Alta Disponibilidad**: Balanceo de carga y failover automático

### 📈 Métricas de Rendimiento
- **Usuarios Concurrentes**: 500-1000
- **Tiempo de Respuesta**: < 3 segundos
- **Disponibilidad**: 99.5%
- **Throughput**: 100-300 transacciones/segundo

### 🔐 Seguridad
- **RBAC**: Control de acceso basado en roles
- **Cifrado**: TLS 1.2+, HTTPS obligatorio
- **Auditoría**: Registro completo de acciones
- **Cumplimiento**: Ley 1581/2012, ISO 27001

### 🔗 Integración
- **SOAP Services**: SevenERP (Recaudo)
- **REST APIs**: 50+ endpoints
- **Facturación E.**: DIAN, Contapyme
- **Medios Magnéticos**: Formatos DIAN
- **XBRL**: Taxonomía para Superintendencias

---

## 💻 Requisitos del Sistema

### Servidor de Aplicación
```
Sistema Operativo: Windows Server 2016+
IIS: 10.0+
.NET Framework: 4.8
CPU: 4-8 cores
RAM: 8-16 GB
Disco: 100-250 GB SSD
```

### Servidor de Base de Datos
```
Sistema Operativo: Windows Server 2016+
SQL Server: 2014+ (Standard/Enterprise)
CPU: 8-16 cores
RAM: 16-32 GB
Disco Sistema: 100-200 GB SSD
Disco Datos: 500 GB - 1 TB SSD
Disco Logs: 100-250 GB SSD
```

### Servidor de Reportes
```
SSRS: 2012+
CPU: 4-8 cores
RAM: 8-16 GB
Disco: 100-250 GB
```

---

## 🌐 Ambientes

El sistema requiere los siguientes ambientes:

1. **Desarrollo** - Desarrollo y pruebas unitarias
2. **Testing/QA** - Pruebas de integración
3. **Integración** - Integración con sistemas externos
4. **Pre-Producción** - Validación final (UAT)
5. **Producción** - Operación en vivo

---

## 📊 Estadísticas del Sistema

| Métrica | Cantidad |
|---------|----------|
| Controladores MVC | 280+ |
| Modelos de Datos | 300+ |
| Reportes SSRS | 150+ |
| Scripts JavaScript | 100+ |
| Views Razor | 400+ |
| APIs REST | 50+ |
| Stored Procedures | 200+ |

---

## 🔒 Cumplimiento Normativo

- ✅ **Ley 1581 de 2012** - Habeas Data (Protección de datos personales)
- ✅ **Decreto 1074 de 2015** - Facturación Electrónica
- ✅ **Estatuto Tributario** - Retenciones y medios magnéticos
- ✅ **ISO 27001** - Gestión de seguridad de la información
- ✅ **OWASP Top 10** - Mejores prácticas de seguridad

---

## ⚠️ Nota Importante sobre Interoperabilidad

**IMPORTANTE**: GHIPS-ERP Financiero es un **sistema ERP de gestión financiera, contable y presupuestal**, NO es un sistema clínico (EMR/EHR/HIS).

### ❌ Protocolos Clínicos NO Aplicables
Los siguientes protocolos y estándares de interoperabilidad clínica **NO APLICAN**:
- HL7 (Health Level Seven)
- FHIR (Fast Healthcare Interoperability Resources)
- DICOM (Imágenes médicas)
- CDA (Clinical Document Architecture)
- IHE (Integrating the Healthcare Enterprise)

### ✅ Protocolos Administrativos/Financieros Implementados
- **UBL 2.1** - Facturación electrónica (DIAN)
- **XBRL** - Reportes financieros
- **SOAP/REST** - Integración con sistemas
- **Formatos DIAN** - Medios magnéticos

---

## 📞 Soporte y Contacto

### Fabricante
- **Empresa**: IPS Universitaria
- **NIT**: 811016192-8
- **Software**: GHIPS-ERP

### Repositorio
- **Ubicación**: Azure DevOps
- **URL**: https://dev.azure.com/ghips

---

## 📅 Control de Versiones

| Versión | Fecha | Descripción |
|---------|-------|-------------|
| 1.0 | Noviembre 2025 | Documentación inicial completa |

---

## 📝 Licencia

Copyright © 2025 IPS Universitaria. Todos los derechos reservados.

Este software y su documentación son propiedad de IPS Universitaria. El uso, copia, modificación o distribución no autorizada está estrictamente prohibido.

---

## 🎓 Para Más Información

Para obtener información detallada sobre cualquier aspecto del sistema, consulte los documentos específicos en esta carpeta o contacte al equipo de desarrollo.

**¡Bienvenido a la documentación de GHIPS-ERP Financiero!** 🚀

---

*Última actualización: Noviembre 10, 2025*
