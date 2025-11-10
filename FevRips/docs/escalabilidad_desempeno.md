# Escalabilidad y Desempeño

## Estrategias de escalamiento
- Horizontal: instancias adicionales de API/Web detrás de balanceador (NGINX, Azure App Gateway, ALB) compartiendo DB.
- Vertical: ajuste de CPU/memoria contenedores (`deploy.resources`), SQL Server con más cores/memoria.
- Cache distribuido (Redis) para reducir latencia en consultas frecuentes (habilitar en capa Core).
- Colas de trabajo: desacoplar procesos largos (generar UBL, validación masiva RIPS) vía HostedService.

## Configuraciones actuales
- Retries EF Core (EnableRetryOnFailure) y lógica custom en `SaveChangesAsync` (5 intentos, 2s espera).
- Índices específicos por campos críticos (NumeroFactura, TenantId, FechaRegistro).
- Timeouts BD configurables (`TimeoutBDMinutos`).

## Métricas propuestas
- Latencia promedio de API (p50/p95/p99).
- Throughput facturación (facturas/minuto).
- Uso CPU/Memoria por instancia.
- Errores por tipo (timeout, concurrencia, validación).
- Edad promedio de tareas en cola.

## Pruebas de carga (plan)
1. Escenario Facturación: 1000 facturas/hora con validación DIAN simulada.
2. Escenario RIPS: carga de lotes (10 registros configurados) escalando hasta 10k.
3. Stress: saturar DB con escrituras concurrentes (simular 50 tenants).
4. Endurance: 24h monitoreo de degradación (memory leak, crecimiento logs).

Herramientas sugeridas: k6, JMeter, Locust.

## Optimización
- Revisar configuración de serialización JSON (usar `System.Text.Json` con opciones).
- Activar compresión HTTP (ResponseCompression). 
- Paginación y streaming para exportaciones grandes.

## Cuellos de botella potenciales
- Encriptación/firma masiva sin cola dedicada.
- Uso mixto EF Core 8 + EF Core 6 (Data) — homogenizar reduce inconsistencias.
- Procesamiento síncrono de PDF/Excel en petición HTTP.

## Próximos pasos
- Implementar métricas con OpenTelemetry + Prometheus.
- Añadir pruebas automatizadas de performance al pipeline.
