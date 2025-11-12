# SEGURIDAD Y PRIVACIDAD - EMR GHIPS
## Modelos de acceso, protección de datos y clasificación de información

**Fecha:** 10 de noviembre de 2025  
**Sistema:** GHIPS - Gestión Hospitalaria Integral de Procesos de Salud  
**Alcance:** Seguridad clínica, administrativa y técnica

---

> Desarrollado por el GRUPO DESARROLLO GHIPS. GHIPS es una marca registrada. © 2025 GRUPO DESARROLLO GHIPS. Todos los derechos reservados.

## 1. GOBIERNO DE SEGURIDAD Y PRIVACIDAD

- **Marco regulatorio:** Cumplimiento de Ley 1581 (protección de datos personales), Resolución 2003/2014 (HCE), estándares HIPAA/HITECH como referencia internacional.
- **Modelo de gestión:** Comité de Seguridad y Privacidad, políticas documentadas, revisiones periódicas de riesgos y controles.
- **Integración con Azure AD:** Single Sign-On, MFA opcional, gestión centralizada de identidades y grupos.

---

## 2. DEFINICIÓN DE ROLES Y PERFILES DE ACCESO

### 2.1 Categorías Principales

| Categoría | Subrol / Perfil | Alcance | Controles Adicionales |
|-----------|-----------------|---------|-----------------------|
| Clínico | Médico tratante | Historia clínica completa, órdenes, resultados | MFA cuando accede fuera de red, firma digital para órdenes críticas |
| Clínico | Enfermería | Evoluciones, administración de medicamentos, signos vitales | Registro de turno, validación doble para medicamentos de alto riesgo |
| Clínico | Profesional de apoyo (Laboratorio, Imagenología) | Captura y validación de resultados | Acceso restringido a módulos específicos, logging detallado |
| Administrativo | Facturación | Datos financieros, RIPS, contratos | Enmascaramiento parcial de datos sensibles clínicos |
| Administrativo | Autorizaciones | Visualización de diagnósticos relevantes y autorizaciones | Flujos de aprobación escalonados |
| Técnico | Soporte de TI | Acceso a configuración, logs y monitoreo | Principio de menor privilegio, cuentas técnicas separadas |
| Técnico | Seguridad | Gestión de roles, auditoría, cumplimiento | Acceso a tabla de auditoría y reportes de trazabilidad |

### 2.2 Modelo de Roles en `Ips.Gestion.Ghips.Security`

- Roles jerárquicos con herencia controlada (perfiles base + permisos granulares).
- Gestión de permisos por operación (lectura, escritura, exportación, administración).
- Asignación dinámica según contexto (cliente SaaS, institución on-premise).

### 2.3 Controles de Acceso Complementarios

- **Autenticación fuerte:** Windows Authentication + Azure AD (OAuth 2.0), soporte para MFA.
- **Autorización contextual:** Validación de pertenencia a institución, servicio clínico y turno activo.
- **Segregación de funciones:** Separación entre captura clínica y procesamiento administrativo para evitar conflictos de interés.

---

## 3. CAPACIDADES PARA CLASIFICACIÓN DE INFORMACIÓN CLÍNICA

### 3.1 Niveles de Clasificación

| Nivel | Descripción | Ejemplos | Controles |
|-------|-------------|----------|-----------|
| Pública | Información divulgable | Guías de uso, manuales generales | Acceso libre, monitoreo básico |
| Interna | Información operativa no sensible | Procedimientos internos, catálogos | Acceso a personal autorizado, logging estándar |
| Confidencial | Datos clínicos o administrativos sensibles | Historia clínica, datos de pacientes, facturación | Cifrado en tránsito y reposo, auditoría detallada |
| Restringida | Datos altamente sensibles | Psicología, VIH, menores de edad, información legal | Acceso explícito, doble factor, consentimiento, trazabilidad reforzada |

### 3.2 Implementación en GHIPS

- Clasificación aplicada a nivel de esquema y tabla en SQL (42+ esquemas identificados).  
- Módulos específicos (ej. `Security`, `Seguridad`, `SoportesPDF`) etiquetan documentos según nivel y aplican políticas de acceso.
- Cifrado de datos sensibles utilizando algoritmos AES/TDE para reposo y TLS 1.2 en tránsito.
- Enmascaramiento dinámico para datos financieros y demográficos cuando el rol no requiere detalle completo.

### 3.3 Trazabilidad y Auditoría

- `Ips.Gestion.Ghips.ServicioWinTrazabilidad` registra accesos, modificaciones y exportaciones por usuario, módulo y timestamp.
- Integración con Enterprise Library Logging para correlacionar eventos de seguridad y fallas.
- Reportes de auditoría clasificados por severidad (Fatal, Error, Warning, Info, Debug).

---

## 4. CONTROLES TÉCNICOS DE SEGURIDAD

- **Seguridad en el servidor:** Segmentación en DMZ y red interna, firewall perimetral, hardening de IIS y SQL Server.
- **Gestión de sesiones:** Timeouts configurables, invalidación al cerrar sesión, protección contra CSRF/XSS mediante frameworks.
- **Protección de endpoints:** Validación de entrada (anti-SQL injection), políticas de rate limiting para APIs, cabeceras de seguridad (HSTS, CSP).
- **Copia de seguridad y recuperación:** Backups full/diff/log, replica AlwaysOn, respaldo en Azure Storage con cifrado.

---

## 5. GESTIÓN DE PRIVACIDAD

- **Consentimiento informado:** Registro digital de consentimientos, asociado a expedientes y accesible según perfil.
- **Derechos ARCO:** Procesos para acceso, rectificación, cancelación y oposición implementados en módulos administrativos.
- **Notificación de incidentes:** Procedimientos documentados para reporte a entes reguladores y afectados dentro de plazos legales.

---

## 6. MONITOREO Y MEJORA CONTINUA

- Métricas de accesos por rol, intentos fallidos, anomalías detectadas.
- Revisiones periódicas de permisos y cuentas inactivas.
- Pruebas de penetración y análisis de vulnerabilidades programados.
- Planes de capacitación continua para personal clínico y administrativo sobre privacidad.

---

## Aviso Legal y Propiedad Intelectual

Este documento y el software descrito forman parte de la propiedad intelectual del **GRUPO DESARROLLO GHIPS**. GHIPS es una **marca registrada**. Queda prohibida su reproducción total o parcial, distribución, ingeniería inversa o divulgación sin autorización escrita. El acceso está restringido a instituciones y usuarios autorizados conforme contratos vigentes.

**Documento generado:** 10/11/2025  
**Versión:** 1.0  
**Responsable:** Oficina de Arquitectura y Operaciones GHIPS  
© 2025 GRUPO DESARROLLO GHIPS. Todos los derechos reservados.
