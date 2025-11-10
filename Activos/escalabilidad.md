# Escalabilidad y Desempeño

## Objetivos
- Responder a picos de consulta y operaciones de compras sin degradación severa.
- Escalamiento horizontal para Web/API; vertical para SQL inicial, luego particionado.

## Estrategias de Escalamiento
| Tipo | Estrategia | Detalle |
|------|------------|---------|
| Horizontal Web/API | Múltiples instancias detrás de balanceador | Session stateless (tokens), sticky solo si necesario |
| Vertical DB | Más CPU/RAM, optimizar IO | Ajustar TempDB, índices, planes |
| Cache | In-memory / distribuido (Redis plan) | Cache catálogos y parámetros frecuentes |
| Particionamiento | Tablas históricas por periodo | Reduce tamaño índices activos |
| Offloading | ETL nocturno / reporte agregado | Disminuye carga OLTP en horario pico |

## Balanceo y Redundancia
- Web/API: Load Balancer (RR / least connections)
- Health checks: endpoints ping
- SSRS: instancias separadas (HA opcional)

## Failover y Disponibilidad
| Componente | Mecanismo |
|------------|----------|
| SQL Server | Cluster / AlwaysOn (futuro) |
| Web/API | Multi-instance + LB |
| ETL | Reintentos y replanificación |
| Archivos | DFS/NAS con redundancia |

## Pruebas de Carga / Estrés (Plan)
| Tipo | Objetivo | Herramienta |
|------|----------|-------------|
| Load sostenido | Validar throughput promedio | JMeter/K6 |
| Stress | Picos súbitos en endpoints críticos | K6 scripts |
| Soak | Estabilidad prolongada 8h | K6 + monitoreo |
| Spike | Respuesta ante ráfagas | K6 |

## Metas de Rendimiento
- p95 latencia endpoints críticos < 500 ms
- Throughput objetivo inicial: 50 req/s combinado (compras+inventario)
- Tiempos ETL: < 30 min ventana nocturna

## Optimización Aplicación
- Minimizar serializaciones redundantes (Newtonsoft vs System.Text.Json)
- Pool conexiones SQL (max pool ajustado, monitoreo real)
- Uso de async donde aplica en IO

## Métricas Escalabilidad
- CPU promedio vs número instancias
- Conexiones por instancia vs tiempo
- Latencia p95 vs carga concurrente
- GC collections (server GC) frecuencia

## Roadmap Desempeño
| Fase | Mejora | Beneficio |
|------|--------|----------|
| Corto | Cache catálogos | Latencia menor |
| Corto | Index tuning top queries | Query time bajo |
| Medio | Redis distribuido | Escala horizontal |
| Medio | APM completo | Detección rápida cuellos |
| Largo | Migrar a .NET Core 8 | Mejor throughput |
| Largo | Particionamiento movimientos | Menor I/O |

