# DOCUMENTACIÓN TÉCNICA - GHIPS ERP FINANCIERO
## 3. HERRAMIENTAS DE ANALÍTICA, REPORTES Y BI

---

## 3.1 ARQUITECTURA DE REPORTERÍA

### 3.1.1 Información General

El sistema GHIPS-ERP Financiero cuenta con una robusta infraestructura de Business Intelligence y reportería basada en:

- **Tecnología Principal**: SQL Server Reporting Services (SSRS)
- **Cantidad de Reportes**: +150 reportes operacionales y estratégicos
- **Formatos de Salida**: PDF, Excel (XLS), Web/HTML
- **Proyecto**: Financiero.Reports (Report Server Project)

---

## 3.2 MÓDULOS DE REPORTERÍA

### 3.2.1 Reportes Financieros

#### A. Compromisos Financieros
| Reporte | Archivo RDL | Descripción |
|---------|-------------|-------------|
| Informe Compromiso Financiero | InformeComprobanteFinanciero.rdl | Detalle de compromisos financieros |
| Informe Compromiso Financiero XLS | InformeComprobanteFinancieroXls.rdl | Versión exportable a Excel |
| Consulta Compromiso Financiero | ConsultaCompromisoFinanciero.rdl | Consulta de compromisos |
| Consulta Compromiso Financiero XLS | ConsultaCompromisoFinancieroXls.rdl | Versión exportable |
| Informe Compromiso vs GHIPS | InformeCompromisoFinancieroVsGhips.rdl | Comparativo con sistema GHIPS |

#### B. Comprobantes y Pagos
| Reporte | Archivo RDL | Descripción |
|---------|-------------|-------------|
| Comprobante Contable | InformeComprobanteContable.rdl | Comprobantes contables |
| Comprobante Contable XLS | InformeComprobanteContableXls.rdl | Versión Excel |
| Comprobante de Pago | InformeComprobantePago.rdl | Comprobantes de egreso |
| Certificado de Retención | CertificadoRetencion.rdl | Certificados de retención |

#### C. Anticipos y Cruce de Cuentas
| Reporte | Archivo RDL | Descripción |
|---------|-------------|-------------|
| Información Anticipos | InfoAnticipos.rdl | Detalle de anticipos |
| Información Anticipos XLS | InfoAnticiposXls.rdl | Versión Excel |
| Informe Cruce Anticipos | InformeCruceAnticipos.rdl | Cruce de anticipos |

### 3.2.2 Reportes Contables

#### A. Libros Oficiales
| Reporte | Archivo RDL | Descripción |
|---------|-------------|-------------|
| Libro Auxiliar | LibroAuxiliar.rdl | Libro auxiliar de contabilidad |
| Libro Diario | LibroDiario.rdl | Libro diario |
| Libro Mayor y Balance | LibroMayorBalance.rdl | Libro mayor y balance |
| Libro Inventario y Balance | LibroInventarioBalance.rdl | Inventario y balance |

#### B. Balance de Comprobación
| Reporte | Archivo RDL | Descripción |
|---------|-------------|-------------|
| Balance Comprobación | BalanceComprobacionNew.rdl | Balance de comprobación |
| Balance Comprobación XLS | BalanceComprobacionNewXls.rdl | Versión Excel |
| Balance Comparativo | BalanceComprobacionNewComparativo.rdl | Comparativo entre períodos |
| Balance Comparativo XLS | BalanceComprobacionNewComparativoXls.rdl | Versión Excel |

#### C. Notas Contables
| Reporte | Archivo RDL | Descripción |
|---------|-------------|-------------|
| Informe Nota Contable | InformeNotaContable.rdl | Notas contables |
| Informe Nota Contable Item | InformeNotaContableItem.rdl | Detalle de items |

#### D. Estados Financieros
| Reporte | Archivo RDL | Descripción |
|---------|-------------|-------------|
| Estados Financieros | InformeEstadosFinancieros.rdl | Balance general, estado de resultados |
| Taxonomía XBRL | InformeTaxonomia.rdl | Reportes taxonomía |
| Taxonomía Item | InformeTaxonomiaItem.rdl | Items de taxonomía |

### 3.2.3 Reportes Presupuestales

#### A. Certificados de Disponibilidad
| Reporte | Archivo RDL | Descripción |
|---------|-------------|-------------|
| Certificado Disponibilidad | InformeCertificadoDisponibilidad.rdl | CDP |
| Certificado Disponibilidad XLS | InformeCertificadoDisponibilidadXls.rdl | Versión Excel |
| Certificado por Rubro | InformeCertificadoDisponibilidadPorRubro.rdl | Agrupado por rubro |
| Certificado por Rubro XLS | InformeCertificadoDisponibilidadPorRubroXls.rdl | Versión Excel |
| Consulta CDP | InformeCertificadoDisponibilidadConsulta.rdl | Consulta de certificados |
| Consulta CDP XLS | InformeCertificadoDisponibilidadConsultaXls.rdl | Versión Excel |

#### B. Ejecución Presupuestal
| Reporte | Archivo RDL | Descripción |
|---------|-------------|-------------|
| Informe Presupuesto | InformePresupuesto.rdl | Ejecución presupuestal |
| Estructura Presupuestal | InformeEstructuraPresupuestal.rdl | Estructura del presupuesto |
| Cierre Anual Presupuesto | InformeCierreAnualPresupuesto.rdl | Cierre anual |

### 3.2.4 Reportes de Tesorería

#### A. Movimientos Bancarios
| Reporte | Archivo RDL | Descripción |
|---------|-------------|-------------|
| Flujo Ingresos Egresos | FlujoIngresosEgresos.rdl | Flujo de caja |
| Informe Gerencial Caja | InformeGerencialCaja.rdl | Reporte gerencial de tesorería |

#### B. Descuadres
| Reporte | Archivo RDL | Descripción |
|---------|-------------|-------------|
| Comprobantes Descuadrados | InformeComprobantesDescuadrados.rdl | Comprobantes con descuadres |
| Comprobantes Descuadrados 2 | InformeComprobantesDescuadrados2.rdl | Versión alternativa |
| Comprobantes Descuadrados XLS | InformeComprobantesDescuadrados2Xls.rdl | Versión Excel |
| Movimientos Descuadrados | InformeMovimientosDescuadrados.rdl | Movimientos descuadrados |

### 3.2.5 Reportes de Cartera

#### A. Glosas y Objeciones
| Reporte | Archivo RDL | Descripción |
|---------|-------------|-------------|
| Glosa | Glosa.rdl | Detalle de glosas |
| Glosa XLS | GlosaXls.rdl | Versión Excel |
| Glosa Resumida | GlosaResumida.rdl | Resumen de glosas |
| Glosa Resumida XLS | GlosaResumidaXls.rdl | Versión Excel |
| Glosa Administración Documental | InformeGlosaAdministracionDocumentalDetalle.rdl | Gestión documental |

#### B. Auditoría
| Reporte | Archivo RDL | Descripción |
|---------|-------------|-------------|
| Informe Audita | InformeAudita.rdl | Auditoría general |
| Informe Audita XLS | InformeAuditaXls.rdl | Versión Excel |
| Informe Audita Resumen | InformeAuditaResumen.rdl | Resumen de auditoría |
| Informe Audita Resumen XLS | InformeAuditaResumenXls.rdl | Versión Excel |
| Audita Formato General | InformeAuditaFormatoGeneral.rdl | Formato general |
| Audita Formato General XLS | InformeAuditaFormatoGeneralXls.rdl | Versión Excel |
| Audita Formato Causal | InformeAuditaFormatoCausal.rdl | Por causal |
| Audita Formato Conciliación | InformeAuditaFormatoConciliacion.rdl | Conciliación |
| Audita Formato Pendiente | InformeAuditaFormatoPendiente.rdl | Pendientes |
| Audita Formato Respuesta | InformeAuditaFormatoRespuesta.rdl | Respuestas |
| Audita Formato Resumen | InformeAuditaFormatoResumen.rdl | Resumen |
| Audita Objeción | InformeAuditaObjecion.rdl | Objeciones |
| Audita Objeción XLS | InformeAuditaObjecionXls.rdl | Versión Excel |

#### C. Auditoría General
| Reporte | Archivo RDL | Descripción |
|---------|-------------|-------------|
| Informe Auditoría | InformeAuditoria.rdl | Auditoría del sistema |
| Informe Auditoría XLS | InformeAuditoriaXls.rdl | Versión Excel |

### 3.2.6 Reportes de Terceros

| Reporte | Archivo RDL | Descripción |
|---------|-------------|-------------|
| Informe Usuario | InformeUsuario.rdl | Información de usuarios |
| Informe Usuario XLS | InformeUsuarioXls.rdl | Versión Excel |

### 3.2.7 Reportes de Centros de Costo

| Reporte | Archivo RDL | Descripción |
|---------|-------------|-------------|
| Informe Centro Costos | InformeCentroCostos.rdl | Por centro de costos |
| Informe Centro Costos XLS | InformeCentroCostosXls.rdl | Versión Excel |

### 3.2.8 Reportes de Actividades

| Reporte | Archivo RDL | Descripción |
|---------|-------------|-------------|
| Informe Actividad | InformeActividad.rdl | Por actividad económica |
| Informe Actividad XLS | InformeActividadXls.rdl | Versión Excel |

### 3.2.9 Reportes de Documentos

| Reporte | Archivo RDL | Descripción |
|---------|-------------|-------------|
| Clase Documento | InformeClaseDocumento.rdl | Por clase de documento |
| Clase Documento XLS | InformeClaseDocumentoXls.rdl | Versión Excel |

### 3.2.10 Reportes Especiales

| Reporte | Archivo RDL | Descripción |
|---------|-------------|-------------|
| Ingresos Grabados | InformeIngresoGrabadoDetalle.rdl | Ingresos gravados |
| Errores Recaudo GHIPS | InformeErroresRecaudoGhips.rdl | Errores en recaudos |
| Detalle Retención | InformeDetalleRetencion.rdl | Detalle de retenciones |
| Días Vencimiento | InformeDiasVencimiento.rdl | Análisis de vencimientos |

---

## 3.3 CARACTERÍSTICAS DE LOS REPORTES

### 3.3.1 Capacidades Técnicas

#### Filtros Dinámicos
- **Rango de Fechas**: Todos los reportes soportan filtrado por fecha
- **Sede/Empresa**: Filtrado por organización
- **Centro de Costos**: Filtrado por centro
- **Tercero**: Filtrado por proveedor/cliente
- **Cuenta Contable**: Filtrado por cuenta
- **Estado**: Filtrado por estado de documento

#### Parámetros Configurables
- Parámetros en cascada
- Valores por defecto configurables
- Validación de parámetros
- Parámetros opcionales y requeridos

#### Agrupamiento y Subtotales
- Agrupamiento multinivel
- Subtotales por grupo
- Total general
- Cálculos agregados (Sum, Avg, Count)

#### Ordenamiento
- Ordenamiento por múltiples columnas
- Ascendente/Descendente
- Ordenamiento dinámico

### 3.3.2 Formatos de Exportación

| Formato | Características | Uso Recomendado |
|---------|----------------|-----------------|
| **PDF** | Alta calidad, formato fijo | Impresión, archivo oficial |
| **Excel (XLS)** | Editable, análisis de datos | Análisis, manipulación de datos |
| **HTML/Web** | Interactivo, navegable | Consulta en línea |
| **Word** | Editable, informe narrativo | Informes ejecutivos (opcional) |
| **CSV** | Datos crudos | Importación a otras herramientas |

### 3.3.3 Configuración del Servidor de Reportes

```xml
<!-- Configuración en Web.config -->
<add key="ReportServer" value="http://servidor/ReportServer"/>
<add key="ReportServerUser" value="Usuario"/>
<add key="ReportServerPassword" value="Password"/>
<add key="ReportServerDomain" value="Dominio"/>
<add key="ReportServerCarpet" value="Carpeta"/>
<add key="SedeUsaReportServer" value="S/N"/>
<add key="CantidadMaxExportPDF" value="5000"/>
```

---

## 3.4 DASHBOARD E INDICADORES

### 3.4.1 Indicadores de Gestión

El sistema incluye un módulo de **Indicadores de Gestión** con las siguientes capacidades:

#### Componentes
- **Perspectivas**: Basado en Balanced Scorecard (BSC)
- **Objetivos Corporativos**: Alineados con estrategia
- **Indicadores**: KPIs medibles
- **Metas**: Objetivos cuantificables
- **Resultados**: Seguimiento de cumplimiento
- **Mando Integral**: Cuadro de mando integral

#### Entidades del Modelo
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

#### Perspectivas BSC
1. **Financiera**: Indicadores financieros
2. **Clientes**: Satisfacción y retención
3. **Procesos Internos**: Eficiencia operacional
4. **Aprendizaje y Crecimiento**: Capacitación y desarrollo

### 3.4.2 Gráficos de Cartera

| Entidad | Descripción |
|---------|-------------|
| GraficosCartera | Gráficos de análisis de cartera |
| GraficosCarteraHistorico | Evolución histórica |

**Tipos de análisis:**
- Cartera por edades
- Cartera por pagador
- Evolución temporal
- Indicadores de recaudo

### 3.4.3 Informes Precalculados

Para optimizar el rendimiento, el sistema mantiene tablas de informes precalculados:

| Tabla | Propósito |
|-------|-----------|
| InformeComprobanteFinanciero | Compromisos precalculados |
| InformeComprobantesDescuadrados | Descuadres identificados |
| InformeCompromisoConsulta | Consultas rápidas |
| InformeDiasVencimiento | Análisis de vencimientos |
| InformeMovimientosDescuadrados | Movimientos con diferencias |
| InformeNotaContable | Notas contables procesadas |
| InformePresupuesto | Ejecución presupuestal |

---

## 3.5 ANALÍTICA AVANZADA

### 3.5.1 Medios Magnéticos DIAN

El sistema genera automáticamente los medios magnéticos requeridos por la DIAN:

**Componentes:**
- **Formatos configurables**: Múltiples formatos DIAN
- **Validación**: Validación de datos antes de exportar
- **Exportación**: Archivos en formato requerido
- **Trazabilidad**: Registro de exportaciones

**Entidades:**
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
```

**Formatos soportados:**
- Formato 1001: Pagos y abonos en cuenta
- Formato 1003: Retenciones en la fuente
- Formato 1005: Retención de IVA
- Formato 1006: Ingresos recibidos
- Otros formatos según normativa

### 3.5.2 Taxonomía XBRL

**Propósito**: Reportes financieros en formato XBRL para superintendencias

**Componentes:**
```
Taxonomia
├── TaxonomiaItem
├── InformeTaxonomia
└── InformeTaxonomiaItem
```

**Características:**
- Mapeo automático de cuentas contables
- Generación de archivos XBRL
- Validación de taxonomía
- Exportación según estándares

### 3.5.3 Modelos de Informes Contables

**Propósito**: Plantillas configurables para informes personalizados

**Entidades:**
```
ModeloInformeContable
└── ModeloInformeContableDetalle
```

**Características:**
- Creación de informes personalizados
- Fórmulas y cálculos configurables
- Múltiples formatos de salida
- Reutilización de plantillas

---

## 3.6 INTEGRACIÓN CON HERRAMIENTAS EXTERNAS

### 3.6.1 Microsoft Excel

**Reportes exportables:**
- 100+ reportes con versión XLS
- Formato preservado
- Fórmulas incluidas (opcional)
- Hojas múltiples para reportes complejos

**Librerías utilizadas:**
- **EPPlus 4.5.3.3**: Generación de archivos Excel moderna
- **DocumentFormat.OpenXml**: Manipulación de Office Open XML

### 3.6.2 Power BI (Integración Potencial)

El sistema puede integrarse con Power BI mediante:
- **Conexión directa a SQL Server**
- **Vistas optimizadas para BI**
- **Stored procedures para extracción**
- **API REST** para datos en tiempo real

### 3.6.3 Herramientas de Análisis Externo

**Exportación de datos:**
- CSV para herramientas de análisis
- JSON para APIs
- XML para integraciones
- Archivos planos delimitados

---

## 3.7 MÉTRICAS Y MONITOREO DE REPORTERÍA

### 3.7.1 Indicadores de Uso

| Métrica | Descripción | Tabla/Fuente |
|---------|-------------|--------------|
| Reportes generados/día | Cantidad de reportes ejecutados | LogEjecucion |
| Tiempo promedio de generación | Duración de generación de reportes | LogEjecucion |
| Reportes más solicitados | Top 10 reportes | Auditoria |
| Errores en generación | Fallos en reportes | LogEjecucion |
| Formatos más utilizados | PDF vs Excel vs Web | LogEjecucion |

### 3.7.2 Monitoreo de Desempeño

**Tiempos objetivo:**
- Reportes simples: < 5 segundos
- Reportes complejos: < 30 segundos
- Reportes de cierre: < 5 minutos
- Exportación a Excel: < 10 segundos

**Configuración de timeout:**
```xml
<add key="TiempoReportes" value="7200000"/>
<!-- 2 horas en milisegundos -->
```

### 3.7.3 Optimización

**Estrategias:**
- Índices en tablas de reportes
- Vistas materializadas
- Tablas de resumen precalculadas
- Paginación de resultados
- Caché de reportes frecuentes

---

## 3.8 CAPACIDADES DE ANÁLISIS

### 3.8.1 Análisis Temporal

**Comparativos:**
- Mes actual vs mes anterior
- Año actual vs año anterior
- Tendencias históricas
- Proyecciones

**Reportes con análisis temporal:**
- Balance Comprobación Comparativo
- Ejecución Presupuestal Comparativa
- Evolución de Cartera
- Flujo de Caja Histórico

### 3.8.2 Análisis Multidimensional

**Dimensiones de análisis:**
- Temporal (Año, Mes, Día)
- Organizacional (Empresa, Sede, Centro Costos)
- Financiera (Cuenta, Rubro, Concepto)
- Tercero (Proveedor, Cliente, Tipo)
- Documento (Clase, Estado, Tipo)

### 3.8.3 Drill-Down y Drill-Through

**Capacidades:**
- Navegación desde resumen a detalle
- Enlaces entre reportes relacionados
- Trazabilidad de transacciones
- Acceso a documentos fuente

---

## 3.9 AUTOMATIZACIÓN DE REPORTES

### 3.9.1 Suscripciones SSRS

**Configuración:**
- Reportes programados
- Envío por correo electrónico
- Exportación a carpetas compartidas
- Ejecución en horarios específicos

### 3.9.2 Servicios de Fondo

**WorkProcess para Reportería:**
- Generación nocturna de reportes
- Cierre automático con reportes
- Alertas basadas en indicadores
- Distribución automática

---

## 3.10 SEGURIDAD EN REPORTERÍA

### 3.10.1 Control de Acceso

**Niveles de seguridad:**
- Acceso por rol
- Restricción por sede
- Filtrado automático de datos según usuario
- Auditoría de consultas

### 3.10.2 Datos Sensibles

**Protección:**
- Enmascaramiento de datos sensibles
- Reportes con información resumida
- Acceso a detalle solo para roles autorizados

---

## 3.11 LISTA DE VERIFICACIÓN DE CAPACIDADES

| Capacidad | Estado | Observaciones |
|-----------|--------|---------------|
| ✅ Reportes operacionales | Implementado | 150+ reportes |
| ✅ Exportación Excel | Implementado | EPPlus 4.5.3 |
| ✅ Exportación PDF | Implementado | iTextSharp 5.5.13 |
| ✅ Indicadores de gestión | Implementado | BSC completo |
| ✅ Gráficos de cartera | Implementado | Análisis de edades |
| ✅ Medios magnéticos | Implementado | Formatos DIAN |
| ✅ Taxonomía XBRL | Implementado | Superintendencias |
| ⚠️ Dashboards en tiempo real | Parcial | Mediante reportes web |
| ⚠️ Power BI | Potencial | Requiere configuración |
| ❌ Machine Learning | No implementado | Tecnología futura |
| ❌ Predictive Analytics | No implementado | Tecnología futura |

---

**Fecha de Elaboración**: Noviembre 2025  
**Versión del Documento**: 1.0  
**Estado**: Vigente
