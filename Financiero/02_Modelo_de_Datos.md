# DOCUMENTACIÓN TÉCNICA - GHIPS ERP FINANCIERO
## 2. ARQUITECTURA Y MODELO DE DATOS

---

## 2.1 ARQUITECTURA DE BASE DE DATOS

### 2.1.1 Información General

#### Bases de Datos del Sistema
El sistema GHIPS-ERP Financiero utiliza una arquitectura de **base de datos separada** para seguridad y datos operacionales:

| Base de Datos | Propósito | Descripción |
|---------------|-----------|-------------|
| **Financiero** | Datos Operacionales | Contiene toda la información transaccional, maestros, configuraciones y datos del negocio |
| **FinancieroSeguridad** | Seguridad y Autenticación | Gestiona usuarios, roles, permisos y auditoría de accesos |

#### Motor de Base de Datos
- **Producto**: Microsoft SQL Server
- **Versión Mínima**: SQL Server 2014
- **Versiones Soportadas**: SQL Server 2014, 2016, 2017, 2019, 2022
- **Edición Recomendada**: Standard o Enterprise

#### Collation
- **Recomendado**: SQL_Latin1_General_CP1_CI_AS
- **Soporte**: Unicode (NVARCHAR)

---

## 2.2 ESQUEMA DE LA BASE DE DATOS PRINCIPAL (FINANCIERO)

### 2.2.1 Grupos de Entidades

#### A. MÓDULO DE EMPRESA Y ORGANIZACIÓN
```
Empresas
├── Sedes
├── CentroCostos
├── UbicacionGeografica
└── ParametroFinanciero
```

**Entidades principales:**
- `Empresa`: Información de la compañía
- `Sede`: Sedes o sucursales de la empresa
- `CentroCostos`: Centros de costo para distribución contable
- `Ciudad`, `Departamento`, `Pais`: Ubicación geográfica

#### B. MÓDULO DE TERCEROS
```
Terceros
├── ClaseTercero
├── GrupoTercero
├── TerceroActividad
├── TerceroEmpresa
├── TerceroPeriodo
├── TerceroResponsabilidadFiscal
├── CuentaContableTercero
├── EntidadBancariaTercero
├── TerceroCertificacionBancaria
├── TerceroObservacion
└── TerceroUsuario
```

**Entidades principales:**
- `Tercero`: Proveedores, clientes, empleados
- `ClaseTercero`: Clasificación (Proveedor, Cliente, Empleado, etc.)
- `TerceroActividad`: Actividades económicas
- `ResponsabilidadFiscal`: Responsabilidades tributarias
- `TerceroProyectado`: Terceros en proceso de creación

#### C. MÓDULO CONTABLE
```
CuentasContables
├── CuentaContableEmpresa
├── CuentaGrupoContable
├── GrupoContable
├── GrupoContableDistribucionCuentas
├── MovimientoContable
│   ├── MovimientoContableDetalle
│   ├── MovimientoContableLog
│   └── MovimientoContableDetalleLog
├── MovimientoContableNiif
│   ├── MovimientoContableDetalleNiif
│   ├── MovimientoContableNiifLog
│   └── MovimientoContableDetalleNiifLog
├── NotaContable
│   ├── NotaContableDetalle
│   ├── NotaContableTransaccion
│   └── NotaContableTransaccionNiif
├── PeriodoContable
├── CierrePeriodoContable
├── CierreAnual
├── CierreAnualPresupuesto
└── DocumentoContable
```

**Entidades principales:**
- `CuentaContable`: Plan de cuentas contable (PUC)
- `MovimientoContable`: Asientos contables PCGA
- `MovimientoContableNiif`: Asientos contables NIIF
- `NotaContable`: Notas contables
- `PeriodoContable`: Períodos contables (mensual)
- `CierrePeriodoContable`: Cierres de período

**Características especiales:**
- **Doble contabilidad**: PCGA y NIIF en paralelo
- **Trazabilidad completa**: Tablas Log para auditoría
- **Cierre de períodos**: Bloqueo de modificaciones
- **Replicación NIIF**: Proceso automatizado

#### D. MÓDULO FINANCIERO
```
CompromisoFinanciero
├── DetalleCompromisoFinanciero
├── DistribucionValoresConcepto
├── DistribucionCuentasPuente
├── DistribucionValoresConceptoNiif
├── DistribucionCuentasPuenteNiif
├── ClaseDocumento
├── EstadoDocumento
├── TransicionEstadosCF
└── LogErrorDianCompromisoFinanciero

ComprobanteFinanciero
├── ComprobanteFinancieroItem
└── OrdenDePago

ConceptoFinanciero
├── ConceptoFinancieroIva
├── CuentaConceptoFinanciero
└── CuentaReintegroConceptoFinanciero

Retencion
└── RetencionPorGrupo
```

**Entidades principales:**
- `CompromisoFinanciero`: Compromisos de pago (facturas, etc.)
- `ComprobanteFinanciero`: Comprobantes de egreso
- `OrdenDePago`: Órdenes de pago
- `ConceptoFinanciero`: Conceptos de ingresos/egresos
- `ClaseDocumento`: Tipos de documentos
- `Retencion`: Retenciones en la fuente

#### E. MÓDULO PRESUPUESTAL
```
TipoPresupuesto
├── TipoPresupuestoEstructura
├── ClasificadorPresupuesto
├── ClasificadorTipoPresupuesto
├── RubroPresupuestal
└── VariableEstructura

Presupuesto
├── CertificadoDisponibilidad
│   └── ModificacionCertificadoDisponibilidad
├── CompromisoPresupuestal
│   ├── CompromisoPresupuestalFinanciero
│   └── ModificacionCompromisoPresupuestal
├── ReconocimientoPresupuestal
│   └── ModificacionReconocimientoPresupuestal
├── ObligacionPresupuestal
│   └── ModificacionObligacionPresupuestal
└── ModificacionPresupuesto
```

**Entidades principales:**
- `Presupuesto`: Presupuesto de ingresos y gastos
- `CertificadoDisponibilidad`: CDP
- `CompromisoPresupuestal`: Compromisos del presupuesto
- `ReconocimientoPresupuestal`: Reconocimientos
- `ObligacionPresupuestal`: Obligaciones
- `RubroPresupuestal`: Rubros presupuestales

#### F. MÓDULO DE TESORERÍA
```
EntidadBancaria
├── SucursalBancaria
└── TipoCuentaBancaria

CuentaBancaria
├── MovimientoBancario
├── SaldoMovimientoBancario
├── TransaccionBancaria
└── TrasladoBancos

FormaPago
Moneda
└── TasaCambio

ProgramacionPago
└── ProgramacionPagoItem
    └── ProgramacionPagoItemCompromiso
```

**Entidades principales:**
- `CuentaBancaria`: Cuentas bancarias de la empresa
- `MovimientoBancario`: Movimientos de bancos
- `EntidadBancaria`: Bancos
- `TransaccionBancaria`: Transacciones (Débitos/Créditos)
- `ProgramacionPago`: Programación de pagos

#### G. MÓDULO DE CARTERA Y GLOSAS
```
ConceptoGlosa
├── GrupoConceptoGlosa
└── ConceptoGlosaTipoObjecion

Objecion
├── ObjecionItem
│   ├── ObjecionItemConceptoGlosa
│   └── ObjecionItemDistribucionRecobro
└── TipoObjecion

GlosaAdministracionDocumental
├── GlosaAdministracionDocumentalDetalle
└── ImportacionRespuestaAdmonDctal
    └── ImportacionRespuestaAdmonDctalDetalle

CuentaCobro
CorteCartera
DevolucionRecaudo
GraficosCartera
└── GraficosCarteraHistorico
```

**Entidades principales:**
- `Objecion`: Glosas y objeciones de cartera
- `ConceptoGlosa`: Conceptos de glosa
- `GlosaAdministracionDocumental`: Gestión documental de glosas
- `CuentaCobro`: Cuentas de cobro
- `CorteCartera`: Cortes de cartera

#### H. MÓDULO DE REPORTERÍA Y MEDIOS MAGNÉTICOS
```
MedioMagnetico
├── MedioMagneticoFormato
│   └── MedioMagneticoFormatoItem
│       ├── MedioMagneticoFormatoItemFiltro
│       └── MedioMagneticoFormatoItemFiltroDato
├── ConceptoMedioMagnetico
├── MedioMagneticoCuentaContable
├── FormatoMedioMagnetico
└── VariableMedioMagnetico

Taxonomia
├── TaxonomiaItem
├── InformeTaxonomia
└── InformeTaxonomiaItem

ModeloInformeContable
└── ModeloInformeContableDetalle

FormatoImpresion
TipoInforme
```

**Entidades principales:**
- `MedioMagnetico`: Medios magnéticos DIAN
- `Taxonomia`: Taxonomía XBRL
- `ModeloInformeContable`: Modelos de informes
- `FormatoImpresion`: Formatos de impresión

#### I. MÓDULO DE INDICADORES Y GESTIÓN
```
Perspectiva
├── ObjetivoCorporativo
│   └── ObjetivoCorporativoItem
└── MandoIntegral

IndicadorGestion
├── IndicadorGestionMeta
│   └── IndicadorGestionMetaAnalisis
├── IndicadorGestionResultado
├── IndicadorGestionObjetivo
├── IndicadorGestionRelacionado
├── IndicadorGestionUsuario
└── IndicadorGestionGrupo

Periodicidad
└── PeriodicidadItem
```

**Entidades principales:**
- `IndicadorGestion`: Indicadores de gestión
- `ObjetivoCorporativo`: Objetivos corporativos
- `MandoIntegral`: Cuadro de mando integral
- `Perspectiva`: Perspectivas BSC

#### J. MÓDULO DE CONTRATOS
```
Contrato
├── GrupoContrato
├── TipoContrato
├── Aval
├── InformacionAval
└── ContratoAutoRadicacion
```

**Entidades principales:**
- `Contrato`: Contratos
- `Aval`: Avales de contratos
- `TipoContrato`: Tipos de contrato

#### K. MÓDULO DE CERTIFICADOS Y RETENCIONES
```
CertificadoRetencion
├── GrupoContableCertificadoRetencion
└── GrupoRetencion

CertificadoDisponibilidad
└── ModificacionCertificadoDisponibilidad
```

**Entidades principales:**
- `CertificadoRetencion`: Certificados de retención
- `CertificadoDisponibilidad`: CDP presupuestal

#### L. MÓDULO DE INTEGRACIÓN
```
SevenErp:
├── HomologarSevenErp
├── TerceroSevenErp
├── TipoOperacionSevenErp
├── RecaudoGhips
├── IngresoGhips
├── srvSevenErp
└── ParametroSevenErp

DIAN:
├── ResolucionDian
├── LogErrorDianCompromisoFinanciero
├── LogErrorDianNotaContable
└── DatosJsonContapyme
    ├── DatosJsonContapymeItem
    └── TipoJsonContapyme

Recaudo:
├── IngresoGrabado
│   └── IngresoGrabadoDetalle
├── DevolucionRecaudo
└── PagoRecaudoTercero

Medicamentos:
├── Sismed
│   ├── SismedDetalle
│   └── SismedDetalleItem
└── MedicamentoSismed
```

**Entidades principales:**
- `HomologarSevenErp`: Homologación con SevenERP
- `RecaudoGhips`: Recaudos del sistema GHIPS
- `ResolucionDian`: Resoluciones DIAN
- `Sismed`: Sistema de información de medicamentos

#### M. MÓDULO DE IMPORTACIÓN MASIVA
```
ImportarCompromisoFinanciero
├── ImportarCompromisoFinancieroDetalle
└── ImportarCompromisoFinancieroRetencion

ImportarFactura
├── ImportarFacturaDetalle
│   ├── ImportarFacturaDetalleItem
│   ├── ImportarFacturaDetalleItemNiif
│   ├── ImportarFacturaDetalleItemPresupuestal
│   └── ImportarFacturaDetalleItemRetencion

ImportarComprobanteFinanciero
├── ImportarComprobanteFinancieroDetalle
│   └── ImportarComprobanteFinancieroDetalleItem
├── ImportarComprobanteFinancieroCruceCuenta
└── ImportarComprobanteFinancieroAnticipo
    ├── ImportarComprobanteFinancieroAnticipoDetalle
    └── ImportarComprobanteFinancieroAnticipoDetalleItem

ImportarRegistroContable
├── ImportarRegistroContableDetalle
└── ImportarRegistroContableDetalleItem

ImportacionNotasCredito
├── ImportacionNotasCreditoDetalle
├── ImportacionNotasCreditoTransaccion
└── ImportacionNotasCreditoTransaccionNiif

ImportarTercero
└── ImportarTerceroDetalle

ImportarPresupuesto
└── ImportarPresupuestoDetalle

ImportarMovimientoBancario
└── ImportarMovimientoBancarioDetalle

ImportarObjecion
└── ImportarObjecionDetalle

ImportarCertificadoDisponibilidad
├── ImportarCertificadoDisponibilidadDetalle
└── ImportarCertificadoDisponibilidadDetalleItem

ImportacionRadicacionMasivaCompromiso
└── ImportacionRadicacionMasivaCompromisoDetalle

GestionProcesoMasivo
EstructuraImportacion
```

**Características:**
- Importación masiva mediante Excel
- Validación en múltiples niveles
- Procesamiento asíncrono
- Trazabilidad de importaciones

#### N. MÓDULO DE AUDITORÍA Y TRAZABILIDAD
```
Auditoria
LogEstadoDocumento
LogTrazabilidadRadicado
LogTrazabilidadCerrado
LogEjecucion
LogServicioWindows
CategoriaLog
CierrePeriodoContableLog
CierrePeriodoContableNiifLog
LogErrorDianCompromisoFinanciero
LogErrorDianNotaContable
```

**Entidades principales:**
- `Auditoria`: Auditoría de todas las acciones
- `LogEstadoDocumento`: Cambios de estado
- `LogTrazabilidad`: Trazabilidad de documentos
- `LogEjecucion`: Ejecución de procesos

#### O. MÓDULO DE INFORMES
```
InformeAudita
├── InformeAuditaGeneral
└── InformeAuditaGeneralVariable

InformeComprobanteFinanciero
InformeComprobantesDescuadrados
InformeDiasVencimiento
├── InformeDiasVencimientoFiltro
│   └── InformeDiasVencimientoFiltroDetalle
└── InformeDiasVencimientoPeriodoEvaluacion

InformeEstadosFinancieros
InformeNotaContable
└── InformeNotaContableItem

LibroAuxiliar
LibroCajaDiario
LibroCuentaRazon
LibroInventarioBalance
LibroMayorBalance
BalanceComprobacion
```

**Entidades principales:**
- Informes precalculados para desempeño
- Libros oficiales de contabilidad
- Balance de comprobación

#### P. MÓDULO DE DIFERIDOS Y AMORTIZACIONES
```
Diferido
├── DistribucionDiferido
└── CuentaPuente
    ├── NotaContableCuentaPuente
    └── NotaContableCuentaPuenteNiif
```

**Entidades principales:**
- `Diferido`: Diferidos y amortizaciones
- `CuentaPuente`: Cuentas puente temporales

#### Q. MÓDULO DE SALDOS CONTABLES
```
SaldoContablePorEmpresa
├── SaldoContablePorEmpresaTercero
SaldoContablePorSede
├── SaldoContablePorSedeTercero
SaldoContablePorCentroCostos
├── SaldoContablePorCentroCostosTerceros
SaldoContableIVAPorSede
└── SaldoContableIVAPorSedeTercero
```

**Características:**
- Tablas de saldos desnormalizadas para rendimiento
- Actualización mediante triggers o procesos batch
- Consulta rápida de saldos

---

## 2.3 BASE DE DATOS DE SEGURIDAD (FINANCIEROSEGURIDAD)

### 2.3.1 Esquema de Seguridad

```
Usuario
├── UsuarioRol
├── UsuarioPorSede
├── UsuarioParametroServicioWindows
├── TerceroUsuario
└── InformacionUsuario
    └── InformacionUsuarioNotificacion

Rol
├── RolAccion
└── UsuarioRol

Modulo
├── ModuloAccion
├── ModulosMenu
└── Menu
    └── Proceso

PeriodoAutorizacion
NotaContableAutorizacion
ChangedPassword (Cambio de contraseñas)
```

**Entidades principales:**
- `Usuario`: Usuarios del sistema
- `Rol`: Roles de seguridad
- `Modulo`: Módulos del sistema
- `Menu`: Estructura del menú
- `RolAccion`: Permisos por rol y acción

### 2.3.2 Modelo de Permisos

El sistema implementa un modelo de seguridad basado en:
1. **RBAC (Role-Based Access Control)**: Control de acceso basado en roles
2. **Permisos granulares**: A nivel de acción (Crear, Leer, Actualizar, Eliminar)
3. **Restricción por Sede**: Los usuarios pueden estar limitados a sedes específicas
4. **Períodos de autorización**: Control de acceso temporal

---

## 2.4 RELACIONES Y CARDINALIDAD

### 2.4.1 Relaciones Principales

```
Empresa (1) ──< (N) Sede
Sede (1) ──< (N) CentroCostos
Sede (1) ──< (N) CuentaBancaria

Tercero (1) ──< (N) CompromisoFinanciero
Tercero (1) ──< (N) MovimientoContable
Tercero (1) ──< (N) CuentaContableTercero

CuentaContable (1) ──< (N) MovimientoContableDetalle
CuentaContable (1) ──< (N) SaldoContablePorEmpresa

CompromisoFinanciero (1) ──< (N) DetalleCompromisoFinanciero
CompromisoFinanciero (1) ──< (N) ComprobanteFinanciero

Presupuesto (1) ──< (N) CertificadoDisponibilidad
CertificadoDisponibilidad (1) ──< (N) CompromisoPresupuestal
CompromisoPresupuestal (1) ──< (N) ReconocimientoPresupuestal
ReconocimientoPresupuestal (1) ──< (N) ObligacionPresupuestal
```

---

## 2.5 ÍNDICES Y OPTIMIZACIÓN

### 2.5.1 Estrategia de Indexación

**Índices Clustered:**
- Todas las tablas tienen clave primaria clustered
- Usualmente en columnas de identidad (ID)

**Índices Non-Clustered:**
- Columnas de búsqueda frecuente (Número de documento, Fecha, Estado)
- Claves foráneas
- Columnas de filtro en reportes

**Índices Compuestos:**
- Combinaciones para consultas frecuentes
- Ejemplo: (SedeId, PeriodoContableId, CuentaContableId)

### 2.5.2 Particionamiento (Opcional)
Para bases de datos grandes:
- Particionamiento por año en tablas históricas
- Archivado de datos antiguos

---

## 2.6 STORED PROCEDURES Y FUNCIONES

### 2.6.1 Tipos de Procedimientos

**Procedimientos Transaccionales:**
- Creación de compromisos
- Generación de movimientos contables
- Cierre de períodos
- Cálculos de retenciones

**Procedimientos de Consulta:**
- Generación de reportes
- Consultas de saldos
- Balance de comprobación
- Ejecución presupuestal

**Procedimientos de Mantenimiento:**
- Recálculo de saldos
- Sincronización NIIF
- Limpieza de logs

### 2.6.2 Funciones
- Cálculos de retenciones
- Formateo de números
- Conversiones de moneda
- Validaciones de negocio

---

## 2.7 TRIGGERS

### 2.7.1 Triggers de Auditoría
- Registro de cambios en tablas críticas
- Captura de valores anteriores y nuevos

### 2.7.2 Triggers de Negocio
- Actualización automática de saldos
- Validaciones de integridad
- Cálculos derivados

---

## 2.8 VISTAS (VIEWS)

### 2.8.1 Vistas de Negocio
- Consultas complejas simplificadas
- Unión de múltiples tablas
- Cálculos precalculados

### 2.8.2 Vistas para Reportes
- Datos agregados
- Formato específico para reportes SSRS

---

## 2.9 SEGURIDAD DE DATOS

### 2.9.1 Encriptación
- Contraseñas: Hashing con salt
- Datos sensibles: Encriptación transparente (TDE - opcional)

### 2.9.2 Backups
- **Full Backup**: Diario
- **Differential Backup**: Cada 6 horas (recomendado)
- **Transaction Log Backup**: Cada hora (recomendado)
- **Retención**: Mínimo 30 días

### 2.9.3 Permisos de Base de Datos
- Usuario de aplicación con permisos limitados
- Separación de permisos entre lectura y escritura
- DBA con permisos administrativos completos

---

## 2.10 ESTRATEGIA DE MIGRACIÓN Y VERSIONAMIENTO

### 2.10.1 Scripts de Migración
- Scripts SQL organizados por versión
- Versionamiento semántico
- Rollback scripts para cada migración

### 2.10.2 Gestión de Cambios
- Change scripts documentados
- Pruebas en ambiente de desarrollo
- Validación en QA antes de producción

---

## 2.11 ESTADÍSTICAS ESTIMADAS

### 2.11.1 Volumen de Datos (Estimado)

| Tabla | Registros Estimados/Año | Crecimiento |
|-------|-------------------------|-------------|
| MovimientoContable | 100,000 - 500,000 | Alto |
| MovimientoContableDetalle | 500,000 - 2,000,000 | Muy Alto |
| CompromisoFinanciero | 50,000 - 200,000 | Alto |
| NotaContable | 10,000 - 50,000 | Medio |
| Auditoria | 1,000,000+ | Muy Alto |
| Tercero | 5,000 - 20,000 | Bajo |
| CuentaContable | 1,000 - 3,000 | Muy Bajo |

### 2.11.2 Tamaño de Base de Datos
- **Inicial**: 500 MB - 1 GB
- **Anual**: +2-5 GB por año (dependiendo del volumen)
- **5 años**: 10-25 GB

---

## 2.12 DIAGRAMA ENTIDAD-RELACIÓN SIMPLIFICADO

```
┌──────────────┐       ┌──────────────┐       ┌──────────────┐
│   Empresa    │──1:N──│     Sede     │──1:N──│ CentroCostos │
└──────────────┘       └──────────────┘       └──────────────┘
                              │
                            1:N
                              │
┌──────────────┐       ┌──────────────┐       ┌──────────────┐
│   Tercero    │──1:N──│  Compromiso  │──1:N──│   Detalle    │
└──────────────┘       │  Financiero  │       │  Compromiso  │
       │               └──────────────┘       └──────────────┘
       │                      │
     1:N                      │
       │                      │
       │               ┌──────────────┐
       └───────────────│  Movimiento  │
                       │   Contable   │
                       └──────────────┘
                              │
                            1:N
                              │
                       ┌──────────────┐
                       │  Movimiento  │
                       │   Detalle    │
                       └──────────────┘
                              │
                              │
                       ┌──────────────┐
                       │CuentaContable│
                       └──────────────┘
```

---

**Fecha de Elaboración**: Noviembre 2025  
**Versión del Documento**: 1.0  
**Estado**: Vigente
