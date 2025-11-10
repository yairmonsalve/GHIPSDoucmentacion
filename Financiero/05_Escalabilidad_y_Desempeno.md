# DOCUMENTACIÓN TÉCNICA - GHIPS ERP FINANCIERO
## 5. ESCALABILIDAD Y DESEMPEÑO

---

## 5.1 ARQUITECTURA TÉCNICA Y AMBIENTES

### 5.1.1 Ambientes Requeridos

El sistema GHIPS-ERP Financiero requiere los siguientes ambientes para su operación completa:

#### A. Ambiente de Desarrollo
**Propósito**: Desarrollo y pruebas unitarias

**Componentes:**
- Servidor de Aplicación (IIS)
- Servidor de Base de Datos (SQL Server)
- Servidor de Reportes (SSRS)
- Control de código fuente (Azure DevOps/TFS)

**Configuración:**
```xml
<configuration>
  <connectionStrings>
    <add name="DatabaseContext" connectionString="data source=DEV_SERVER;..." />
  </connectionStrings>
  <appSettings>
    <add key="Ambiente" value="2"/> <!-- Pruebas DIAN -->
  </appSettings>
</configuration>
```

#### B. Ambiente de Testing/QA
**Propósito**: Pruebas de integración y validación de calidad

**Componentes:**
- Servidor de Aplicación (IIS)
- Servidor de Base de Datos (SQL Server)
- Servidor de Reportes (SSRS)
- Datos de prueba simulados

**Características:**
- Datos anonimizados de producción
- Pruebas de carga y estrés
- Validación de integraciones

#### C. Ambiente de Integración
**Propósito**: Integración con sistemas externos

**Componentes:**
- Servidor de Aplicación (IIS)
- Servidor de Base de Datos (SQL Server)
- Conectividad con sistemas externos (SevenERP, DIAN)

#### D. Ambiente de Pre-Producción (Staging)
**Propósito**: Validación final antes de producción

**Componentes:**
- Configuración idéntica a producción
- Datos reales (opcional)
- Pruebas de aceptación de usuario (UAT)

#### E. Ambiente de Producción
**Propósito**: Operación en vivo

**Componentes:**
- Servidores redundantes
- Alta disponibilidad
- Backups automáticos
- Monitoreo 24/7

---

## 5.2 ESPECIFICACIONES DE INFRAESTRUCTURA

### 5.2.1 Servidor de Aplicación

#### Requerimientos Mínimos
| Componente | Mínimo | Recomendado |
|------------|--------|-------------|
| **CPU** | 4 cores | 8 cores |
| **RAM** | 8 GB | 16 GB |
| **Disco** | 100 GB SSD | 250 GB SSD |
| **Red** | 100 Mbps | 1 Gbps |
| **SO** | Windows Server 2016 | Windows Server 2019/2022 |
| **IIS** | 10.0 | 10.0 |
| **.NET Framework** | 4.8 | 4.8 |

#### Configuración IIS
```xml
<applicationPool>
  <name>GhipsERPAppPool</name>
  <managedRuntimeVersion>v4.0</managedRuntimeVersion>
  <managedPipelineMode>Integrated</managedPipelineMode>
  <processModel>
    <idleTimeout>00:20:00</idleTimeout>
    <maxProcesses>4</maxProcesses> <!-- Web Garden -->
  </processModel>
  <recycling>
    <periodicRestart>
      <time>02:00:00</time> <!-- Reciclar diariamente a las 2 AM -->
    </periodicRestart>
  </recycling>
</applicationPool>
```

### 5.2.2 Servidor de Base de Datos

#### Requerimientos Mínimos
| Componente | Mínimo | Recomendado | Enterprise |
|------------|--------|-------------|------------|
| **CPU** | 8 cores | 16 cores | 32+ cores |
| **RAM** | 16 GB | 32 GB | 64+ GB |
| **Disco Sistema** | 100 GB SSD | 200 GB SSD | 500 GB NVMe |
| **Disco Datos** | 500 GB SSD | 1 TB SSD | 2+ TB NVMe RAID 10 |
| **Disco Logs** | 100 GB SSD | 250 GB SSD | 500 GB SSD |
| **Disco Backups** | 1 TB | 2 TB | 4+ TB |
| **Red** | 1 Gbps | 10 Gbps | 10+ Gbps |
| **SO** | Windows Server 2016 | Windows Server 2019/2022 | Windows Server 2022 |
| **SQL Server** | Standard 2014 | Standard 2019 | Enterprise 2019/2022 |

#### Configuración SQL Server
```sql
-- Configuración de memoria
sp_configure 'show advanced options', 1;
RECONFIGURE;
sp_configure 'max server memory (MB)', 24576; -- 24 GB para servidor de 32 GB
RECONFIGURE;

-- Grado máximo de paralelismo
sp_configure 'max degree of parallelism', 4;
RECONFIGURE;

-- Cost threshold for parallelism
sp_configure 'cost threshold for parallelism', 50;
RECONFIGURE;
```

### 5.2.3 Servidor de Reportes (SSRS)

#### Requerimientos Mínimos
| Componente | Mínimo | Recomendado |
|------------|--------|-------------|
| **CPU** | 4 cores | 8 cores |
| **RAM** | 8 GB | 16 GB |
| **Disco** | 100 GB | 250 GB |
| **Red** | 100 Mbps | 1 Gbps |

---

## 5.3 ESTRATEGIAS DE ESCALABILIDAD

### 5.3.1 Escalamiento Vertical (Scale Up)

#### Servidor de Aplicación
**Estrategia:**
- Incrementar cores de CPU
- Incrementar RAM
- Mejorar disco a SSD/NVMe

**Cuándo escalar:**
- CPU > 70% de forma sostenida
- RAM > 80% de uso
- Tiempo de respuesta > 3 segundos

#### Servidor de Base de Datos
**Estrategia:**
- Incrementar cores de CPU
- Incrementar RAM (beneficio directo en buffer pool)
- Mejorar almacenamiento (SSD a NVMe)
- Separar discos (Sistema, Datos, Logs, TempDB)

**Cuándo escalar:**
- CPU > 80% de forma sostenida
- Buffer Cache Hit Ratio < 90%
- Disk Queue Length > 2
- Bloqueos frecuentes

### 5.3.2 Escalamiento Horizontal (Scale Out)

#### A. Balanceo de Carga de Aplicación

**Arquitectura:**
```
                    ┌─────────────────┐
                    │  Load Balancer  │
                    │   (IIS ARR)     │
                    └────────┬────────┘
                             │
            ┌────────────────┼────────────────┐
            │                │                │
    ┌───────▼──────┐  ┌──────▼──────┐  ┌─────▼───────┐
    │ Web Server 1 │  │ Web Server 2 │  │ Web Server 3│
    │  (IIS)       │  │  (IIS)       │  │  (IIS)      │
    └──────────────┘  └──────────────┘  └─────────────┘
            │                │                │
            └────────────────┼────────────────┘
                             │
                    ┌────────▼────────┐
                    │   SQL Server    │
                    │   (Shared DB)   │
                    └─────────────────┘
```

**Configuración Load Balancer:**
- **Algoritmo**: Round Robin o Least Connections
- **Health Check**: Ping cada 30 segundos
- **Session Affinity**: Si es necesario (cookies)
- **SSL Offloading**: En el balanceador

**Consideraciones:**
- Session State debe estar en SQL Server o Redis
- Archivos estáticos en storage compartido
- Sincronización de caché distribuida

#### B. Replicación de Base de Datos

**Estrategia de Solo Lectura:**
```
    ┌─────────────────┐
    │  SQL Primary    │ ────┐
    │  (Read/Write)   │     │ Replicación
    └─────────────────┘     │ Asíncrona
                            │
            ┌───────────────┴───────────────┐
            │                               │
    ┌───────▼──────┐              ┌────────▼──────┐
    │ SQL Replica 1│              │ SQL Replica 2 │
    │ (Read Only)  │              │ (Read Only)   │
    └──────────────┘              └───────────────┘
```

**Usos:**
- Reportes de solo lectura en réplicas
- Consultas de dashboards
- Exportaciones masivas

**Configuración:**
- Always On Availability Groups (Enterprise)
- Log Shipping (Standard)
- Transactional Replication

#### C. Particionamiento de Base de Datos

**Por Empresa:**
```
Base de Datos Financiero_Empresa1
Base de Datos Financiero_Empresa2
Base de Datos Financiero_Empresa3
```

**Beneficios:**
- Aislamiento de datos
- Escalabilidad por cliente
- Mantenimiento independiente

**Desafíos:**
- Reportes consolidados complejos
- Gestión de múltiples bases

---

## 5.4 PRUEBAS DE RENDIMIENTO

### 5.4.1 Pruebas de Carga

#### Herramientas
- **JMeter**: Pruebas de carga HTTP
- **LoadRunner**: Pruebas empresariales
- **Visual Studio Load Test**: Integrado con .NET

#### Escenarios de Prueba
| Escenario | Usuarios Concurrentes | Duración | Transacciones/seg |
|-----------|----------------------|----------|-------------------|
| Uso Ligero | 10-20 | 1 hora | 10-20 |
| Uso Normal | 50-100 | 2 horas | 50-100 |
| Uso Pesado | 200-500 | 4 horas | 200-300 |
| Pico | 500-1000 | 1 hora | 500-800 |

#### Métricas Objetivo
| Métrica | Objetivo | Aceptable | Inaceptable |
|---------|----------|-----------|-------------|
| Tiempo de respuesta promedio | < 1 seg | < 3 seg | > 5 seg |
| Tiempo de respuesta p95 | < 2 seg | < 5 seg | > 10 seg |
| Throughput | > 100 req/seg | > 50 req/seg | < 50 req/seg |
| CPU del servidor | < 70% | < 85% | > 90% |
| Memoria del servidor | < 80% | < 90% | > 95% |
| Errores | < 0.1% | < 1% | > 5% |

### 5.4.2 Pruebas de Estrés

#### Objetivo
Determinar el punto de quiebre del sistema

#### Metodología
1. Incremento gradual de usuarios concurrentes
2. Monitoreo de métricas de rendimiento
3. Identificación del punto de degradación
4. Análisis de cuellos de botella

#### Resultados Esperados
- **Capacidad máxima**: 800-1000 usuarios concurrentes
- **Punto de degradación**: > 1000 usuarios
- **Recuperación**: Sistema se recupera al reducir carga

### 5.4.3 Pruebas de Resistencia (Soak Testing)

#### Objetivo
Validar estabilidad a largo plazo

#### Configuración
- **Duración**: 24-72 horas
- **Carga**: 50-70% de capacidad máxima
- **Monitoreo**: Continuo

#### Métricas
- Memory leaks
- Connection pool exhaustion
- Degradación gradual de rendimiento
- Estabilidad de servicios externos

---

## 5.5 INDICADORES Y MÉTRICAS DE MONITOREO

### 5.5.1 Métricas de Aplicación

#### A. Métricas de Rendimiento
| Métrica | Herramienta | Frecuencia | Umbral Alerta |
|---------|-------------|------------|---------------|
| Tiempo de respuesta | Application Insights | Tiempo real | > 3 seg |
| Requests por segundo | IIS Logs | 1 minuto | < 10 req/s o > 500 req/s |
| Tasa de errores | Application Logs | 1 minuto | > 1% |
| Sesiones activas | IIS | 5 minutos | > 500 |
| Pool de conexiones | SQL DMVs | 1 minuto | > 80% |

#### B. Métricas de Disponibilidad
| Métrica | Objetivo | Medición |
|---------|----------|----------|
| Uptime mensual | 99.5% | Monitoreo continuo |
| MTBF (Mean Time Between Failures) | > 720 horas | Registro de incidentes |
| MTTR (Mean Time To Repair) | < 2 horas | Registro de incidentes |
| RTO (Recovery Time Objective) | < 4 horas | Plan de DR |
| RPO (Recovery Point Objective) | < 1 hora | Frecuencia de backups |

### 5.5.2 Métricas de Base de Datos

#### A. Métricas de Rendimiento SQL
| Métrica | Query | Umbral |
|---------|-------|--------|
| CPU Usage | `SELECT * FROM sys.dm_os_performance_counters` | < 80% |
| Buffer Cache Hit Ratio | `SELECT cntr_value FROM sys.dm_os_performance_counters WHERE counter_name = 'Buffer cache hit ratio'` | > 90% |
| Page Life Expectancy | `SELECT cntr_value FROM sys.dm_os_performance_counters WHERE counter_name = 'Page life expectancy'` | > 300 seg |
| Batch Requests/sec | Performance Monitor | Baseline |
| Compilations/sec | Performance Monitor | < 10% de Batch Requests |

#### B. Métricas de Bloqueos
```sql
-- Bloqueos activos
SELECT 
    blocking_session_id,
    wait_type,
    wait_time,
    wait_resource
FROM sys.dm_exec_requests
WHERE blocking_session_id <> 0;
```

#### C. Métricas de Índices
```sql
-- Índices faltantes
SELECT 
    d.database_id,
    d.object_id,
    s.avg_user_impact,
    s.avg_total_user_cost
FROM sys.dm_db_missing_index_details d
JOIN sys.dm_db_missing_index_groups g ON d.index_handle = g.index_handle
JOIN sys.dm_db_missing_index_group_stats s ON g.index_group_handle = s.group_handle;
```

### 5.5.3 Métricas de Infraestructura

#### Servidor de Aplicación
| Métrica | Herramienta | Umbral Alerta |
|---------|-------------|---------------|
| CPU | Performance Monitor | > 80% |
| RAM | Performance Monitor | > 90% |
| Disk I/O | Performance Monitor | > 80% |
| Network | Performance Monitor | > 70% |
| Application Pool Recycles | IIS Logs | > 5/día |

#### Servidor de Base de Datos
| Métrica | Herramienta | Umbral Alerta |
|---------|-------------|---------------|
| CPU | Performance Monitor | > 85% |
| RAM | Performance Monitor | > 90% |
| Disk Queue Length | Performance Monitor | > 2 |
| Network Latency | Ping | > 50 ms |
| Backup Success | SQL Agent Jobs | Fallos |

---

## 5.6 CONFIGURACIONES DE BALANCEO Y REDUNDANCIA

### 5.6.1 Balanceo de Carga (Load Balancing)

#### IIS Application Request Routing (ARR)
```xml
<webFarm name="GhipsERPFarm">
  <server address="192.168.1.10" enabled="true" />
  <server address="192.168.1.11" enabled="true" />
  <server address="192.168.1.12" enabled="true" />
  <applicationRequestRouting>
    <affinity cookieName="ARRAffinity" />
    <loadBalance algorithm="RoundRobin" />
  </applicationRequestRouting>
</webFarm>
```

#### Hardware Load Balancer
- **F5 BIG-IP**
- **Citrix NetScaler**
- **Azure Load Balancer**
- **AWS Elastic Load Balancer**

### 5.6.2 Redundancia de Base de Datos

#### A. Always On Availability Groups (SQL Server Enterprise)
```sql
CREATE AVAILABILITY GROUP GhipsERPAG
WITH (
    AUTOMATED_BACKUP_PREFERENCE = SECONDARY,
    DB_FAILOVER = ON,
    DTC_SUPPORT = PER_DB
)
FOR DATABASE Financiero, FinancieroSeguridad
REPLICA ON
    'SQL01' WITH (
        ENDPOINT_URL = 'TCP://SQL01.domain.com:5022',
        AVAILABILITY_MODE = SYNCHRONOUS_COMMIT,
        FAILOVER_MODE = AUTOMATIC,
        SECONDARY_ROLE (ALLOW_CONNECTIONS = READ_ONLY)
    ),
    'SQL02' WITH (
        ENDPOINT_URL = 'TCP://SQL02.domain.com:5022',
        AVAILABILITY_MODE = SYNCHRONOUS_COMMIT,
        FAILOVER_MODE = AUTOMATIC,
        SECONDARY_ROLE (ALLOW_CONNECTIONS = READ_ONLY)
    );
```

#### B. Database Mirroring (SQL Server Standard)
```sql
ALTER DATABASE Financiero
SET PARTNER = 'TCP://SQL02.domain.com:5022';
```

---

## 5.7 MECANISMOS DE FAILOVER Y DISPONIBILIDAD

### 5.7.1 Failover Automático

#### Nivel de Aplicación
- **Health Check**: Ping cada 30 segundos
- **Failover Time**: < 30 segundos
- **Automatic Redirect**: Load balancer redirige tráfico
- **Session Recovery**: Sesión en SQL Server o Redis

#### Nivel de Base de Datos
- **Automatic Failover**: < 30 segundos (Always On)
- **Connection String Failover**:
```xml
<connectionStrings>
  <add name="DatabaseContext" 
       connectionString="Data Source=SQL01,SQL02;Failover Partner=SQL02;Initial Catalog=Financiero;..." />
</connectionStrings>
```

### 5.7.2 Alta Disponibilidad

#### Configuración de Alta Disponibilidad
```
┌──────────────────────────────────────────────────┐
│              Load Balancer (Activo)              │
│         HA Pair con VRRP/Heartbeat              │
└────────────┬──────────────┬──────────────────────┘
             │              │
    ┌────────▼─────┐   ┌────▼──────────┐
    │ Web Server 1 │   │ Web Server 2  │
    │   (Activo)   │   │   (Activo)    │
    └──────────────┘   └───────────────┘
             │              │
    ┌────────▼──────────────▼─────────┐
    │   SQL Server Primary (Activo)   │
    │   Always On AG                   │
    └──────────┬──────────────────────┘
               │
    ┌──────────▼──────────────────────┐
    │   SQL Server Secondary          │
    │   (Standby - Sync Replica)      │
    └─────────────────────────────────┘
```

#### SLA Objetivo
- **Disponibilidad**: 99.5% mensual (≈ 3.6 horas de downtime al mes)
- **Disponibilidad Objetivo**: 99.9% (≈ 43 minutos al mes)

---

## 5.8 MONITOREO Y ALERTAMIENTO

### 5.8.1 Herramientas de Monitoreo

#### A. Microsoft Application Insights
```csharp
// Integración en Global.asax
protected void Application_Start()
{
    TelemetryConfiguration.Active.InstrumentationKey = "YOUR_KEY";
    TelemetryConfiguration.Active.TelemetryInitializers.Add(new MyTelemetryInitializer());
}
```

**Capacidades:**
- Seguimiento de requests
- Métricas de rendimiento
- Registro de excepciones
- Mapas de aplicación
- Análisis de uso

#### B. SQL Server Monitoring
- **SQL Server Management Studio**: Monitoreo manual
- **SQL Server Profiler**: Trazas de queries
- **Extended Events**: Eventos de rendimiento
- **Dynamic Management Views (DMVs)**: Queries de monitoreo

#### C. IIS Monitoring
- **IIS Manager**: Monitoreo básico
- **Failed Request Tracing**: Debugging
- **W3C Logs**: Análisis de requests
- **Performance Monitor**: Contadores de rendimiento

#### D. Herramientas Empresariales
- **Microsoft System Center Operations Manager (SCOM)**
- **Nagios**
- **Zabbix**
- **Datadog**
- **New Relic**

### 5.8.2 Configuración de Alertas

#### Alertas Críticas (Inmediatas)
- Aplicación no responde (> 5 min)
- Base de datos no disponible
- CPU > 95% por > 10 minutos
- Disco lleno > 95%
- Backup fallido
- Errores > 5% de requests

#### Alertas de Advertencia (30 minutos)
- CPU > 80% por > 30 minutos
- Memoria > 90%
- Disco > 85%
- Tiempo de respuesta > 5 segundos
- Bloqueos prolongados en BD

#### Alertas Informativas (Diarias)
- Resumen de rendimiento diario
- Crecimiento de base de datos
- Top queries lentas
- Uso de recursos

### 5.8.3 Dashboard de Monitoreo

#### Métricas en Tiempo Real
- Estado de servidores (verde/amarillo/rojo)
- Usuarios concurrentes
- Requests por segundo
- Tiempo de respuesta promedio
- Tasa de errores
- CPU y Memoria

#### Gráficos Históricos
- Tendencias de uso (últimos 7 días)
- Picos de carga
- Crecimiento de datos
- Disponibilidad histórica

---

## 5.9 PROCEDIMIENTOS DE CAPACIDAD Y ALERTAMIENTO

### 5.9.1 Gestión de Capacidad

#### Análisis Mensual
- Revisión de métricas de rendimiento
- Identificación de tendencias de crecimiento
- Proyección de necesidades futuras
- Planificación de escalamiento

#### Revisión Trimestral
- Evaluación de infraestructura
- Pruebas de carga
- Actualización de plan de capacidad
- Presupuesto para expansión

### 5.9.2 Procedimiento de Alertamiento

#### Niveles de Escalamiento
1. **Nivel 1 - Soporte Técnico**: Alertas informativas y de advertencia
2. **Nivel 2 - Administrador de Sistemas**: Alertas críticas, problemas no resueltos en 30 min
3. **Nivel 3 - Arquitecto/Desarrollo**: Problemas de arquitectura o código
4. **Nivel 4 - Gerencia TI**: Incidentes mayores, downtime > 2 horas

#### Tiempo de Respuesta
| Nivel de Alerta | Tiempo de Respuesta | Tiempo de Resolución |
|-----------------|---------------------|----------------------|
| Crítica | 15 minutos | 2 horas |
| Alta | 30 minutos | 4 horas |
| Media | 2 horas | 1 día |
| Baja | 1 día | 1 semana |

---

## 5.10 OPTIMIZACIONES IMPLEMENTADAS

### 5.10.1 Optimizaciones de Base de Datos

#### Índices
- Índices clustered en todas las tablas
- Índices non-clustered en columnas de búsqueda
- Índices compuestos para consultas frecuentes
- Mantenimiento semanal de índices (reorganización/reconstrucción)

#### Stored Procedures
- Lógica de negocio en procedimientos almacenados
- Reducción de tráfico de red
- Compilación y caché de planes de ejecución
- Timeout configurado a 2 horas para procesos largos

#### Particionamiento (Para bases grandes)
- Particionamiento por año en tablas históricas
- Mejora en mantenimiento y consultas

### 5.10.2 Optimizaciones de Aplicación

#### Caché
- OutputCache para páginas estáticas
- Caché de datos maestros (cuentas contables, terceros)
- Caché distribuido para escalamiento horizontal

#### Connection Pooling
```xml
<connectionStrings>
  <add name="DatabaseContext" 
       connectionString="...;Pooling=true;Min Pool Size=5;Max Pool Size=100;..." />
</connectionStrings>
```

#### Async/Await
- Operaciones asíncronas para I/O
- Mejor uso de threads del pool

#### Paginación
- Paginación de resultados grandes
- Lazy loading en grillas

---

## 5.11 RESUMEN DE CAPACIDADES

| Capacidad | Estado | Observaciones |
|-----------|--------|---------------|
| ✅ Escalamiento vertical | Implementado | Hasta 32 cores, 64 GB RAM |
| ✅ Escalamiento horizontal (App) | Implementado | Load balancer con ARR |
| ⚠️ Escalamiento horizontal (BD) | Parcial | Réplicas de lectura |
| ✅ Balanceo de carga | Implementado | IIS ARR o HW LB |
| ✅ Alta disponibilidad (App) | Implementado | Múltiples servidores web |
| ⚠️ Alta disponibilidad (BD) | Opcional | Always On (requiere Enterprise) |
| ✅ Failover automático | Implementado | Load balancer + Always On |
| ✅ Monitoreo de rendimiento | Implementado | Métricas en tiempo real |
| ✅ Alertas automáticas | Implementado | Configuración de umbrales |
| ✅ Pruebas de carga | Planificado | JMeter, LoadRunner |
| ✅ Dashboard de monitoreo | Implementado | Métricas clave visibles |
| ✅ Procedimientos de escalamiento | Documentado | Este documento |

---

**Fecha de Elaboración**: Noviembre 2025  
**Versión del Documento**: 1.0  
**Estado**: Vigente
