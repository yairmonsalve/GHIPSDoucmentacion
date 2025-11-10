# Arquitectura Técnica y Ambientes Requeridos

Aviso: valores concretos de IP/host y credenciales se gestionan fuera de este repo.

## 1. Ambientes
- Desarrollo (DEV)
- Pruebas/QA (TEST)
- Producción (PROD)

## 2. Componentes por Ambiente
| Componente | DEV | TEST | PROD |
|------------|-----|------|------|
| IIS (Web/UI) | 1 VM | 1-2 VM | 2+ VM detrás de balanceador |
| IIS (API) | 1 VM | 1-2 VM | 2+ VM detrás de balanceador |
| SQL Server | Instancia compartida | Instancia dedicada | Cluster/AlwaysOn |
| SSRS | Opcional | 1 VM | 1 VM dedicada |
| Agente ETL | Tareas locales | Scheduler | Scheduler HA |
| Almacenamiento | SMB local | Share | NAS/DFS |

## 3. Requisitos de Software
- Windows Server 2019+ (IIS 10)
- .NET Framework 4.8 Runtime
- SQL Server 2016+ (con soporte CLR)
- SSRS 2017+ (modo nativo)
- URL Rewrite (opcional), WebDeploy

## 4. Seguridad de Red
- TLS 1.2 habilitado
- CORS restringido por dominios permitidos
- Segmentación por VLAN (App, DB, Reporting)
- WAF/Firewall de aplicación recomendado

## 5. Configuración IIS (referencia)
- AppPools separados para Web y API (modo integrado, 64 bits)
- Recycling controlado (off-hours), overlapped recycle
- Idle Time-out deshabilitado en API
- Logging avanzado (incluye X-Forwarded-For)

## 6. Conexiones Externas
- Servicios SOAP (Parametrización, Farmacia, Financiero) sobre HTTP/HTTPS
- SMTP para notificaciones
- Repositorio de archivos (SMB) para adjuntos y exportaciones

## 7. Configuración de Aplicación
- Claves en KeyVault/Secret Manager; variables de entorno por slot
- Conexiones SQL mediante autenticación segura (preferir AD/Managed Identity donde aplique)
- Rutas de archivos parametrizadas por ambiente

## 8. Capacidad Inicial (Sizing guía)
- API: 2 vCPU, 4-8 GB RAM por instancia
- Web: 2 vCPU, 4-8 GB RAM por instancia
- SQL: 8-16 vCPU, 32-64 GB RAM, discos SSD, TempDB optimizada
- SSRS: 2-4 vCPU, 8 GB RAM

## 9. Despliegue
- Paquetes WebDeploy (msbuild) o pipelines CI/CD
- Ventanas de mantenimiento coordinadas con ETL
- Rollback plan y backups antes de despliegue

## 10. Observabilidad
- Integración APM (AI/Elastic), logs centralizados, métricas (Prometheus)

