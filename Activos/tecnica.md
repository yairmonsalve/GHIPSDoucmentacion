# Documentación Técnica de la Solución

Aviso: se listan frameworks y paquetes sin exponer secretos. Versiones obtenidas de archivos de proyecto y packages.config.

## Lenguajes y Frameworks
- Plataforma: .NET Framework 4.8 (API), .NET Framework 4.5/4.0 (módulos legacy)
- ASP.NET MVC 5.3 (System.Web)
- ASP.NET Web API 5.3
- SignalR 2.4 (Web UI tiempo real)
- WCF (SOAP) para integraciones externas
- Entity Framework 5 (modelo legacy)
- SQL Server (T-SQL, SQL CLR)
- Frontend: jQuery 1.6.4/3.4.1, Bootstrap 5.2, Modernizr 2.8

## Paquetes NuGet (principales)
- Microsoft.AspNet.Mvc 5.3.0
- Microsoft.AspNet.WebApi 5.3.0 (Core, CORS, WebHost, HelpPage 5.3.0)
- Microsoft.AspNet.Web.Optimization 1.1.3
- Microsoft.AspNet.Cors 5.3.0
- ASP.NET Core Abstractions 2.2.x (Http, Routing, Authorization, CORS) utilizados como utilitarios
- Newtonsoft.Json 13.0.3 (+ BSON 1.0.2)
- System.Text.Json 4.7.2 (utilizado puntualmente)
- IdentityModel (Microsoft.IdentityModel.* 7.5.1) para JWT
- Unity 5.11 (Container, Abstractions, Unity.WebAPI 5.4.0)
- NLog 5.2.8 + NLog.Extensions.Logging 5.3.8
- Swashbuckle 5.6.0 (HelpPage/Swagger clásico)
- System.* (Buffers, Memory, Unsafe, ValueTuple, DiagnosticSource)
- Cliente web: jQuery 3.4.1/1.6.4, Bootstrap 5.2.3
- OWIN: Microsoft.Owin 2.1.0 (Web UI)
- SignalR 2.4.3 (Web UI)
- SpreadsheetLight 3.4.11 (generación Excel)
- ReportViewer WebForms v11

## Proyectos y Targets
- IPS.Activos.API: ASP.NET MVC/Web API (Target v4.8). Documentación XML en App_Data/XmlDocument.xml.
- IPS.Activos.Web: WebForms/MVC mixto (Target v4.5). SignalR, OWIN, exportaciones.
- IPS.Activos.Model: Librería de clases (Target v4.0). EF5, lógica de negocio.
- IPS.Activos.CLR: Ensamblado SQL CLR para SQL Server.
- IPS.Activos.Reportes: Proyecto SSRS (.rdl).
- DataCodePrint: WinForms utilitario para impresión DataMatrix.

## Configuración y Build
- Configuración via Web.config/App.config. Claves sensibles deben externalizarse (variables de entorno, Secret Manager/KeyVault).
- Compilación con Microsoft.CodeDom.Providers.DotNetCompilerPlatform 2.0.1.
- Compatibilidad con IIS/IIS Express.

## Logging y Trazas
- NLog: sinks a archivo. Recomendado añadir targets para EventLog y syslog/SIEM.

## Documentación API
- Swashbuckle HelpPage + comentarios XML.

## Estándares de Código
- Estilo C# 7.x compatible con .NET 4.8
- DI con Unity, servicios en `Servicies/Implementation` y contratos en `Servicies/Interfaz`.

## Supuestos Técnicos
- SQL Server ≥ 2016 recomendado por rendimiento y compatibilidad.
- SSRS dedicado para reportes operacionales.
