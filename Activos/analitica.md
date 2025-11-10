# Herramientas y Módulos de Analítica

## Alcance Analítico Actual
- Reportes operacionales (SSRS .rdl): inventario valorizado, estado requisiciones, último precio compra, movimientos detallados, estado orden de compra, artículos recibidos.
- Exportaciones a Excel (SpreadsheetLight) para análisis ad-hoc.
- Indicadores básicos: stock disponible, rotación, tiempos de ciclo (requisición a orden, orden a recepción), devoluciones.

## Capas Analíticas
| Capa | Descripción |
|------|-------------|
| Operacional | Reportes SSRS directos sobre OLTP (select optimizados) |
| Semántica | ETL prepara tablas agregadas para métricas de rotación y valorización |
| Presentación | Web UI descarga/visualiza reportes; API puede exponer endpoints para dashboards externos |

## Reportes Principales (Resumen)
| Reporte | Objetivo | Frecuencia |
|---------|----------|-----------|
| Inventario Valorizado | Valor total por artículo/bodega/costo promedio | Diario / Bajo demanda |
| Estado Requisiciones | Ciclo y estado (pendiente/aprobada/procesada) | Diario |
| Último Precio Compra | Seguimiento a variaciones de precio | Bajo demanda |
| Artículos Recibidos | Trazabilidad de recepción y validación | Diario |
| Estado Orden Compra | Avance y cumplimiento OC | Diario |
| Movimiento Detallado Artículo | Auditoría y control | Bajo demanda |

## Métricas y KPIs Sugeridos
| Categoría | KPI | Definición | Meta Inicial |
|-----------|-----|-----------|--------------|
| Inventario | Rotación | (Consumo anual / Promedio inventario) | > 4 |
| Inventario | Costo promedio exactitud | Variación vs último costo (%) | < 2% |
| Compras | Lead time requisición->OC | Promedio días | < 5 días |
| Compras | Lead time OC->Recepción | Promedio días | < 7 días |
| Calidad | % Devoluciones | (Ítems devueltos / Ítems recibidos) | < 3% |
| Disponibilidad | Stock crítico | % ítems por debajo mínimo | < 5% |
| Performance | Tiempo generación reporte valorizado | p95 (segundos) | < 10s |

## Instrumentación Futura
- Integrar APM (AppInsights/Elastic) para tiempos de respuesta por endpoint
- Exportar métricas a Prometheus (custom exporter .NET) + Grafana dashboards
- Job ETL para snapshots diarios y tendencia semanal (rotación, costos)

## Analítica Avanzada (Roadmap)
| Fase | Caso de Uso | Modelo |
|------|-------------|--------|
| Piloto | Pronóstico compras | Series temporales (ARIMA/Prophet) |
| Piloto | Detección anomalías precios | Isolation Forest / Z-score |
| Medio | Optimización stock | Reorden (EOQ / Modelo demanda) |
| Medio | Clasificación ABC artículos | Algoritmo ABC + frecuencia uso |

## Calidad de Datos
- Validaciones en ETL (valores nulos, rangos) y auditoría de movimientos
- Recomendado: score de completitud de registros clave (> 95%)

## Acceso y Seguridad
- Reportes restringidos por rol (Administrador, Compras, Farmacia, Auditoría)
- Sensibles: costos, márgenes y proveedores → registro en auditoría

## Gobernanza
- Owner analítica: Equipo BI
- Fuente de verdad: Base transaccional + agregaciones ETL validadas

