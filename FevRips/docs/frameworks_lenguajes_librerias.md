# Frameworks, lenguajes y librerías utilizadas

## Lenguaje y runtime
- C# sobre .NET 8 (TargetFramework `net8.0`).

## Frameworks principales
- ASP.NET Core MVC / Web API.
- ASP.NET Core Identity (gestión de usuarios y roles).
- Entity Framework Core (SQL Server / SQLite en API, SQL Server en Web y Data, tablas temporales).
- Hosted Services / Background Queue (procesamiento asíncrono).
- NHibernate (referenciado en Data para compatibilidad / posible migración parcial).

## Librerías destacadas
- Swashbuckle.AspNetCore (Swagger/OpenAPI).
- Microsoft.EntityFrameworkCore.* (SqlServer, Sqlite, Tools).
- Microsoft.AspNetCore.Authentication.JwtBearer (tokens JWT para API externa).
- ClosedXML / EPPlus / DocumentFormat.OpenXml (generación y manipulación de Excel/OpenXML).
- QuestPDF / iText7 (generación de PDFs).
- IM.Xades / FirmaXadesNetCore / ABCPRO.NES.XAdES (firmado digital UBL/XAdES para facturación electrónica).
- Newtonsoft.Json (serialización avanzada, compatibilidad puntual).
- NLog / NLog.Extensions.Logging (logging y auditoría).
- StackExchange.Redis (cache distribuido / sesiones avanzadas opcionales).
- System.ServiceModel.* (integraciones WCF/DIAN).
- Nancy (legacy/posible migración, presente en Domain).
- Bootstrap, Font-Awesome, jQuery (UI web, estilos e interactividad).

## Patrones y prácticas
- Inyección de dependencias (AddScoped/AddTransient/AddSingleton) en `Program.cs` Web.
- Multitenancy via filtro global (DbContext) + interface `IEntidadTenant`.
- Retrys resilientes en EF Core (EnableRetryOnFailure + lógica propia en `SaveChangesAsync`).
- Indexación estratégica para rendimiento (varios `HasIndex`).

## Versionado y documentación
- Generación de archivo XML de comentarios en proyecto Web (`GenerateDocumentationFile`).
- Swagger disponible condicionando entorno y bandera `Security:EnabledSwagger`.

## Consideraciones de actualización
- Homogeneizar versiones EF Core (Data usa SqlServer 6.0.27 y otros proyectos 8.0.8).
- Evaluar necesidad real de NHibernate y Nancy (reducir superficie técnica).
- Centralizar configuración JWT y tiempos de sesión.
