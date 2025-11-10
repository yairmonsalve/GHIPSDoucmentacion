# DOCUMENTACIÓN TÉCNICA - GHIPS ERP FINANCIERO
## 4. SEGURIDAD Y PRIVACIDAD

---

## 4.1 ARQUITECTURA DE SEGURIDAD

### 4.1.1 Modelo de Seguridad

El sistema GHIPS-ERP Financiero implementa un modelo de seguridad multicapa basado en:

1. **Autenticación**: Verificación de identidad del usuario
2. **Autorización**: Control de permisos basado en roles (RBAC)
3. **Auditoría**: Registro de todas las acciones
4. **Cifrado**: Protección de datos sensibles
5. **Segregación de datos**: Separación por empresa/sede

---

## 4.2 AUTENTICACIÓN

### 4.2.1 Métodos de Autenticación Soportados

#### A. Autenticación de Formularios (Forms Authentication)
```xml
<authentication mode="Forms">
  <forms loginUrl="~/Account/Login" timeout="2880"/>
</authentication>
```

**Características:**
- Sesión basada en cookies
- Timeout configurable (48 horas por defecto)
- Cifrado de cookies de autenticación
- Protección contra CSRF

#### B. Autenticación Windows (Opcional)
```xml
<authentication mode="Windows"/>
```

**Características:**
- Integración con Active Directory
- Single Sign-On (SSO)
- Autenticación transparente en red corporativa

### 4.2.2 Gestión de Contraseñas

#### Políticas de Contraseñas
- **Longitud mínima**: 8 caracteres (configurable)
- **Complejidad**: Mayúsculas, minúsculas, números, caracteres especiales
- **Expiración**: Configurable (90 días recomendado)
- **Historial**: No permitir últimas 5 contraseñas
- **Intentos fallidos**: Bloqueo después de 5 intentos

#### Almacenamiento Seguro
```csharp
// Hashing de contraseñas
- Algoritmo: PBKDF2 (Password-Based Key Derivation Function 2)
- Salt: Único por usuario
- Iteraciones: 10,000+
- Hash: SHA-256
```

#### Cambio de Contraseña
```
Usuario
└── ChangedPassword (Histórico de cambios)
```

**Proceso:**
1. Validación de contraseña actual
2. Verificación de políticas de complejidad
3. Comparación con historial
4. Hash y almacenamiento seguro
5. Auditoría del cambio

### 4.2.3 Recuperación de Contraseña

**Métodos:**
- Correo electrónico con token temporal
- Preguntas de seguridad (opcional)
- Restablecimiento por administrador

**Seguridad:**
- Token de un solo uso
- Expiración de 24 horas
- Auditoría de solicitudes

---

## 4.3 AUTORIZACIÓN Y CONTROL DE ACCESO

### 4.3.1 Modelo RBAC (Role-Based Access Control)

#### Estructura de Roles y Permisos
```
Rol
├── RolAccion (Permisos)
│   └── ModuloAccion
│       └── Modulo
└── UsuarioRol
    └── Usuario
```

#### Niveles de Acceso
| Nivel | Descripción | Acciones |
|-------|-------------|----------|
| **Administrador** | Acceso completo al sistema | Todas |
| **Gestor** | Gestión de módulos específicos | Crear, Editar, Eliminar, Consultar |
| **Operador** | Operación diaria | Crear, Editar, Consultar |
| **Consulta** | Solo lectura | Consultar |
| **Auditor** | Auditoría y reportes | Consultar, Reportes, Auditoría |

### 4.3.2 Roles del Sistema

#### A. Roles Administrativos
- **Administrador del Sistema**: Configuración completa
- **Administrador de Seguridad**: Gestión de usuarios y roles
- **Administrador de Base de Datos**: Mantenimiento de datos

#### B. Roles Clínicos (No Aplica)
Este es un sistema financiero, no tiene roles clínicos.

#### C. Roles Administrativos de Negocio

##### Módulo Contable
- **Contador General**: Acceso completo al módulo contable
- **Auxiliar Contable**: Creación de movimientos contables
- **Auditor Contable**: Solo consulta y reportes

##### Módulo Financiero
- **Gestor Financiero**: Gestión de compromisos financieros
- **Auxiliar de Cuentas por Pagar**: Creación y seguimiento
- **Revisor Financiero**: Aprobación de compromisos

##### Módulo Presupuestal
- **Gestor Presupuestal**: Administración del presupuesto
- **Analista Presupuestal**: Ejecución y seguimiento
- **Consultor Presupuestal**: Solo consulta

##### Módulo de Tesorería
- **Tesorero**: Gestión completa de tesorería
- **Auxiliar de Tesorería**: Operaciones diarias
- **Cajero**: Recaudos y pagos

##### Módulo de Cartera
- **Gestor de Cartera**: Administración de cartera
- **Analista de Glosas**: Gestión de glosas y objeciones
- **Facturador**: Creación de facturas y cuentas de cobro

#### D. Roles Técnicos
- **Desarrollador**: Acceso a logs y configuraciones
- **Soporte Técnico**: Asistencia a usuarios
- **Operador de Reportes**: Generación de reportes

### 4.3.3 Permisos Granulares

#### Acciones por Módulo
```
ModuloAccion
├── Crear
├── Leer/Consultar
├── Actualizar/Editar
├── Eliminar
├── Aprobar
├── Anular
├── Cerrar
├── Exportar
├── Imprimir
└── Reportes
```

#### Matriz de Permisos (Ejemplo)
| Rol | Crear | Leer | Editar | Eliminar | Aprobar |
|-----|-------|------|--------|----------|---------|
| Administrador | ✅ | ✅ | ✅ | ✅ | ✅ |
| Gestor | ✅ | ✅ | ✅ | ❌ | ✅ |
| Operador | ✅ | ✅ | ✅ | ❌ | ❌ |
| Consulta | ❌ | ✅ | ❌ | ❌ | ❌ |

### 4.3.4 Restricciones Adicionales

#### Restricción por Sede
```
UsuarioPorSede
├── Usuario
└── Sede
```

**Funcionalidad:**
- Los usuarios pueden estar limitados a sedes específicas
- Filtrado automático de datos según sede asignada
- Restricción en reportes y consultas

#### Restricción por Período
```
PeriodoAutorizacion
├── Usuario
├── PeriodoContable
└── Tipo (Autorización especial)
```

**Funcionalidad:**
- Autorización temporal para períodos cerrados
- Control de modificaciones en períodos bloqueados
- Auditoría de accesos excepcionales

#### Restricción por Empresa
```
TerceroEmpresa
├── Tercero
└── Empresa
```

**Funcionalidad:**
- Multiempresa en una sola base de datos
- Segregación de datos por empresa
- Reportes consolidados o separados

---

## 4.4 CLASIFICACIÓN DE INFORMACIÓN

### 4.4.1 Niveles de Clasificación

#### Información Pública
- **Descripción**: Información que puede ser divulgada sin restricciones
- **Ejemplos**: 
  - Listado de productos
  - Información corporativa pública
  - Reportes publicados

#### Información Interna
- **Descripción**: Información de uso interno de la organización
- **Ejemplos**:
  - Reportes financieros internos
  - Ejecución presupuestal
  - Indicadores de gestión

#### Información Confidencial
- **Descripción**: Información sensible de la organización
- **Ejemplos**:
  - Estados financieros
  - Contratos con proveedores
  - Saldos bancarios
  - Información de nómina

#### Información Restringida
- **Descripción**: Información de máxima seguridad
- **Ejemplos**:
  - Contraseñas de usuarios
  - Información de cuentas bancarias
  - Datos de autenticación
  - Llaves de cifrado

### 4.4.2 Clasificación por Módulo

| Módulo | Nivel de Clasificación | Justificación |
|--------|------------------------|---------------|
| Contabilidad | Confidencial | Estados financieros |
| Tesorería | Confidencial | Información bancaria |
| Presupuesto | Interna | Ejecución presupuestal |
| Terceros | Confidencial | Información de proveedores |
| Cartera | Confidencial | Información de facturación |
| Usuarios | Restringida | Credenciales de acceso |
| Auditoría | Restringida | Logs de acceso |

### 4.4.3 Protección de Datos Sensibles

#### Datos Personales (GDPR/Habeas Data)
```
Tercero
├── Identificación (NIT/Cédula)
├── Nombre
├── Dirección
├── Teléfono
├── Email
└── Información Bancaria
```

**Protección:**
- Acceso solo a usuarios autorizados
- Cifrado en tránsito y en reposo
- Auditoría de accesos
- Derecho al olvido (anonimización)
- Consentimiento informado

#### Datos Financieros
```
CuentaBancaria
├── Número de Cuenta (Cifrado)
├── Saldo (Restringido)
└── Movimientos (Confidencial)

CompromisoFinanciero
├── Valor (Confidencial)
├── Detalle (Confidencial)
└── Retenciones (Confidencial)
```

**Protección:**
- Cifrado de números de cuenta
- Enmascaramiento en logs
- Acceso solo para roles financieros
- Auditoría completa

---

## 4.5 AUDITORÍA Y TRAZABILIDAD

### 4.5.1 Sistema de Auditoría

#### Tabla Principal de Auditoría
```
Auditoria
├── UsuarioId (Quién)
├── Fecha (Cuándo)
├── Accion (Qué)
├── Tabla (Dónde)
├── RegistroId (Cuál registro)
├── ValoresAnteriores (Qué cambió)
├── ValoresNuevos (Nuevo valor)
└── IPAddress (Desde dónde)
```

#### Filtro de Auditoría
```csharp
[AuditFilter]
public class CompromisoFinancieroController : Controller
{
    // Todas las acciones serán auditadas automáticamente
}
```

#### Información Capturada
- **Usuario**: ID y nombre del usuario
- **Fecha y Hora**: Timestamp preciso
- **Acción**: Crear, Editar, Eliminar, Consultar
- **Entidad**: Tabla afectada
- **Registro**: ID del registro
- **Cambios**: Valores anteriores y nuevos (JSON)
- **IP**: Dirección IP del cliente
- **Sesión**: ID de sesión
- **Resultado**: Éxito o Error

### 4.5.2 Auditoría Especializada

#### A. Trazabilidad de Documentos
```
LogTrazabilidadRadicado (Radicación)
├── CompromisoFinancieroId
├── Usuario
├── Fecha
├── EstadoAnterior
└── EstadoNuevo

LogTrazabilidadCerrado (Cierre)
├── CompromisoFinancieroId
├── Usuario
├── FechaCierre
└── Motivo
```

#### B. Auditoría de Estados
```
LogEstadoDocumento
├── DocumentoId
├── TipoDocumento
├── EstadoAnterior
├── EstadoNuevo
├── Usuario
├── Fecha
└── Observaciones
```

#### C. Auditoría de Períodos Contables
```
CierrePeriodoContableLog
├── PeriodoContableId
├── Usuario
├── FechaCierre
├── TipoContabilidad (PCGA/NIIF)
└── Estado
```

#### D. Auditoría de Movimientos Contables
```
MovimientoContableLog
├── MovimientoContableId
├── Accion
├── Usuario
├── Fecha
└── DatosAnteriores

MovimientoContableDetalleLog
├── DetalleId
├── Accion
├── Usuario
├── Fecha
└── Valores
```

### 4.5.3 Logs del Sistema

#### Logs de Aplicación
```
LogEjecucion
├── Proceso
├── FechaInicio
├── FechaFin
├── Estado
├── Errores
└── Usuario
```

#### Logs de Servicios Windows
```
LogServicioWindows
├── ServicioId
├── Fecha
├── Accion
├── Estado
├── Mensaje
└── Error
```

#### Logs de Integración
```
LogErrorDianCompromisoFinanciero
├── CompromisoFinancieroId
├── FechaError
├── CodigoError
├── MensajeError
└── RespuestaCompleta

LogErrorDianNotaContable
├── NotaContableId
├── FechaError
├── CodigoError
├── MensajeError
└── RespuestaCompleta
```

### 4.5.4 Retención de Auditoría

| Tipo de Log | Retención | Almacenamiento |
|-------------|-----------|----------------|
| Auditoría general | 7 años | Base de datos |
| Logs de acceso | 1 año | Base de datos |
| Logs de errores | 2 años | Archivos + BD |
| Logs de integración | 3 años | Base de datos |
| Cambios en documentos | Permanente | Base de datos |

---

## 4.6 CIFRADO Y PROTECCIÓN DE DATOS

### 4.6.1 Cifrado en Tránsito

#### HTTPS/TLS
- **Protocolo**: TLS 1.2 o superior
- **Certificado**: SSL válido y actualizado
- **Configuración IIS**: 
  - Deshabilitar SSL 3.0
  - Deshabilitar TLS 1.0 y 1.1
  - Habilitar solo TLS 1.2 y 1.3

```xml
<system.webServer>
  <security>
    <access sslFlags="Ssl, SslNegotiateCert, SslRequireCert"/>
  </security>
</system.webServer>
```

#### Cifrado de Comunicaciones Externas
- **SOAP Services**: HTTPS obligatorio
- **APIs REST**: HTTPS obligatorio
- **Correo electrónico**: SSL/TLS (puerto 587)

### 4.6.2 Cifrado en Reposo

#### Base de Datos
- **TDE (Transparent Data Encryption)**: Opcional pero recomendado
- **Always Encrypted**: Para columnas específicas (números de cuenta)
- **Backup cifrado**: Obligatorio

#### Archivos
- **Documentos escaneados**: Cifrado mediante BouncyCastle
- **Archivos de configuración**: Cifrado de secciones sensibles
- **Archivos de logs**: Protección mediante permisos NTFS

### 4.6.3 Librerías de Cifrado

```xml
<package id="BouncyCastle" version="1.8.6.1"/>
<package id="BouncyCastle.Cryptography" version="2.4.0"/>
```

**Usos:**
- Cifrado simétrico (AES-256)
- Cifrado asimétrico (RSA)
- Firma digital
- Generación de certificados

---

## 4.7 SEGURIDAD EN INTEGRACIÓN

### 4.7.1 Web Services

#### Autenticación de Servicios
```csharp
public class ServiceAuth
{
    public string UserService { get; set; } // Usuario de servicio
    public string PassService { get; set; } // Contraseña de servicio
}
```

#### Configuración
```xml
<add key="UserService" value="admin"/>
<add key="PassService" value="********"/>
```

#### Tokens de Acceso
- Autenticación basada en tokens
- Expiración de tokens (2 horas)
- Refresh tokens para servicios de larga duración

### 4.7.2 APIs REST

#### Swagger/OpenAPI con Autenticación
```csharp
services.AddSwaggerGen(c =>
{
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT"
    });
});
```

#### Protección CSRF
- Tokens anti-CSRF en formularios
- Validación en servidor
- Headers personalizados para APIs

---

## 4.8 CUMPLIMIENTO NORMATIVO

### 4.8.1 Normativa Colombiana

#### Ley 1581 de 2012 - Habeas Data
- **Consentimiento**: Registro de aceptación de políticas
- **Acceso**: Usuarios pueden consultar sus datos
- **Rectificación**: Proceso de corrección de datos
- **Eliminación**: Anonimización cuando aplica

#### Decreto 1074 de 2015 - Facturación Electrónica
- **Integración DIAN**: Cumplimiento de formatos
- **Firma digital**: Certificados digitales válidos
- **Trazabilidad**: Auditoría completa de emisión

#### Estatuto Tributario
- **Retenciones**: Cálculo correcto según normativa
- **Medios magnéticos**: Formatos DIAN actualizados
- **Certificados**: Emisión conforme a ley

### 4.8.2 Mejores Prácticas Internacionales

#### ISO 27001 - Gestión de Seguridad
- **Control de acceso**: Implementado
- **Cifrado**: Implementado
- **Auditoría**: Implementado
- **Gestión de incidentes**: Proceso definido

#### OWASP Top 10
| Vulnerabilidad | Mitigación |
|----------------|------------|
| Injection | Parámetros SQL, validación de entrada |
| Broken Authentication | Políticas de contraseñas, MFA opcional |
| Sensitive Data Exposure | Cifrado, HTTPS |
| XML External Entities | Validación de XML |
| Broken Access Control | RBAC, validación en servidor |
| Security Misconfiguration | Hardening de servidores |
| XSS | Validación de entrada, encoding |
| Insecure Deserialization | Validación de objetos |
| Using Components with Known Vulnerabilities | Actualización de librerías |
| Insufficient Logging | Logging completo |

---

## 4.9 GESTIÓN DE INCIDENTES DE SEGURIDAD

### 4.9.1 Detección

#### Monitoreo
- Logs de acceso anómalos
- Intentos de acceso fallidos
- Modificaciones no autorizadas
- Accesos fuera de horario

#### Alertas Automáticas
- Múltiples intentos fallidos de login
- Acceso desde IPs no reconocidas
- Modificación masiva de datos
- Eliminaciones en lote

### 4.9.2 Respuesta

#### Procedimiento
1. **Detección**: Identificación del incidente
2. **Contención**: Bloqueo de acceso/usuario
3. **Análisis**: Revisión de logs y auditoría
4. **Erradicación**: Corrección de vulnerabilidad
5. **Recuperación**: Restauración de datos si aplica
6. **Lecciones aprendidas**: Documentación

#### Contactos
- Administrador de Seguridad
- DBA (Database Administrator)
- Equipo de Desarrollo
- Gerencia TI

---

## 4.10 CAPACITACIÓN Y CONCIENTIZACIÓN

### 4.10.1 Capacitación de Usuarios

#### Temas
- Políticas de seguridad
- Uso correcto de contraseñas
- Identificación de phishing
- Manejo de información confidencial
- Procedimientos de reporte de incidentes

#### Frecuencia
- Inducción: Al ingreso
- Actualización: Anual
- Recordatorios: Trimestral

### 4.10.2 Capacitación Técnica

#### Para Desarrolladores
- Desarrollo seguro (OWASP)
- Inyección SQL
- XSS y CSRF
- Gestión de secretos

#### Para Administradores
- Hardening de servidores
- Gestión de parches
- Configuración segura
- Gestión de backups

---

## 4.11 RESUMEN DE CONTROLES DE SEGURIDAD

| Control | Implementación | Estado |
|---------|----------------|--------|
| Autenticación de usuarios | Forms/Windows Auth | ✅ Implementado |
| Gestión de contraseñas | Hash PBKDF2, políticas | ✅ Implementado |
| Control de acceso (RBAC) | Roles y permisos granulares | ✅ Implementado |
| Auditoría completa | Todas las transacciones | ✅ Implementado |
| Cifrado en tránsito | HTTPS/TLS 1.2+ | ✅ Implementado |
| Cifrado en reposo | TDE opcional, archivos cifrados | ⚠️ Parcial |
| Segregación de datos | Por empresa y sede | ✅ Implementado |
| Clasificación de información | 4 niveles definidos | ✅ Implementado |
| Retención de logs | Según tipo de log | ✅ Implementado |
| Gestión de incidentes | Procedimiento definido | ✅ Implementado |
| Cumplimiento normativo | Ley 1581, DIAN | ✅ Implementado |
| MFA (Multi-Factor Auth) | No implementado | ❌ Futuro |

---

**Fecha de Elaboración**: Noviembre 2025  
**Versión del Documento**: 1.0  
**Estado**: Vigente
