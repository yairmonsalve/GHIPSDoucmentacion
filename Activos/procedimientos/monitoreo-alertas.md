# Procedimiento de Monitoreo, Capacidad y Alertamiento

## 1. Objetivo
Establecer pasos claros para la supervisión continua, escalamiento y resolución de incidentes de disponibilidad, desempeño y capacidad.

## 2. Alcance
Aplica a Web UI, API, Base de Datos, ETL, Reportes y servicios de integración.

## 3. Fuentes de Datos
- Logs aplicación (NLog centralizado)
- Métricas APM / Prometheus
- Performance counters (IIS/SQL)
- Estado jobs ETL y reportes SSRS

## 4. Frecuencia
- Tiempo real: health checks y alertas críticas
- Cada 5 min: métricas principales
- Diario: revisión consolidada
- Semanal: tendencia capacidad

## 5. Roles Responsables
| Rol | Responsabilidad |
|-----|-----------------|
| Soporte Técnico | Primera respuesta, clasificación incidente |
| DBA | Incidentes base de datos, performance queries |
| Dev Team | Correcciones código, hotfix |
| BI | Problemas reportes/ETL |

## 6. Flujo de Alertamiento
1. Alerta generada (sistema monitoreo)
2. Notificación canal (Email/Teams)
3. Clasificación (Severidad: Critical/High/Medium/Low)
4. Asignación responsable
5. Mitigación / workaround
6. Resolución definitiva
7. Postmortem (si Critical/High)

## 7. Severidad (Guía)
| Severidad | Definición | Tiempo respuesta |
|----------|------------|------------------|
| Critical | Caída servicio principal, datos corruptos | < 15 min |
| High | Degradación p95 > 2x normal | < 30 min |
| Medium | Incidencia menor, sin impacto mayor | < 4 h |
| Low | Mejora / aviso informativo | Planificado |

## 8. Checklist Incidente
- Confirmar alcance (usuarios afectados)
- Revisar última versión desplegada
- Logs últimos 15 min
- Métricas recursos (CPU, memoria, conexiones)
- Dependencias externas (timeouts)

## 9. KPIs Operativos
- MTTR (Mean Time To Recovery)
- MTTD (Mean Time To Detect)
- Número incidentes Critical/High por mes
- % alertas falsas

## 10. Capacidad
- Revisión semanal de:
  - CPU promedio vs umbral
  - Crecimiento base de datos
  - Latencia p95 endpoints top 5
  - Duración jobs ETL

## 11. Acciones Preventivas
- Ajuste índices queries lentas
- Incrementar instancias detrás de LB si uso > 70%
- Optimizar plan ETL ante crecimiento duración

## 12. Documentación
Registrar cada incidente en sistema de tickets con:
- Impacto, causa raíz, acciones, seguimiento

## 13. Mejoras Futuras
- Automatizar escalamiento (autoscaling)
- Integrar machine learning para detección anomalías

