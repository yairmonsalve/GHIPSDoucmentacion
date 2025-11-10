# Arquitectura técnica y ambientes

## Ambientes
- Desarrollo: `ASPNETCORE_ENVIRONMENT=Development`, Swagger habilitado por defecto.
- Pruebas/QA: variables parametrizables, `Security:EnabledSwagger` según necesidad.
- Producción: HSTS, excepciones manejadas, Swagger opcional controlado por `Security:EnabledSwagger`.
- Docker Production (local): definido en `apilocal-dockercompose.Production.yml`.

## Contenedores
- fevrips-db: SQL Server 2022, collation `SQL_Latin1_General_CP1_CI_AS`, límites de CPU/memoria, puerto 11433->1433.
- fevrips-api: imagen `crmspsgovcoprd.azurecr.io/production-fevrips-apilocal`, HTTPS con certificado PFX montado desde `C:\Certificates`.
- Red: `fevrips-net` tipo bridge.

## Requisitos de infraestructura
- .NET 8, Windows/Linux x64.
- SQL Server 2019/2022 o Azure SQL (compatibilidad probada con 2022 Docker).
- Certificado TLS válido (PFX) para Kestrel en producción.
- Redis opcional para cache/sesión si se activa.

## Configuración relevante (Web `appsettings.json`)
- `ConnectionStrings:DefaultConnection` (SQL Server).
- `Security` (JWT, expiración, Swagger).
- `Configuraciones` (timeouts, lotes, endpoints externos y toggles de procesamiento).
- `DIAN` (endpoints por ambiente Habilitación/Producción).

## Monitoreo y logging
- NLog (targets a archivo/console/seq opcionales).
- Propuesta: Application Insights o Prometheus+Grafana.

## Backups y retención
- Copias de seguridad SQL Server según RPO/RTO definidos.
- Retención de históricos por tablas temporales y políticas de purga.
