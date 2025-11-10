# FevRips

Solución .NET 8 para gestión multitenant de Facturación Electrónica (DIAN), RIPS y procesos asociados de auditoría, reportes y trazabilidad regulatoria en salud.

## Tabla de Contenido
1. [Arquitectura y componentes](docs/arquitectura.md)
2. [Frameworks, lenguajes y librerías](docs/frameworks_lenguajes_librerias.md)
3. [Arquitectura y modelo de datos](docs/modelo_datos.md)
4. [Analítica, reportes y KPIs](docs/analitica_reportes.md)
5. [Arquitectura técnica y ambientes](docs/arquitectura_tecnica_ambientes.md)
6. [Interoperabilidad e integración](docs/interoperabilidad_integracion.md)
7. [Seguridad y privacidad](docs/seguridad_privacidad.md)
8. [Escalabilidad y desempeño](docs/escalabilidad_desempeno.md)
9. [Monitoreo, capacidad y alertas](docs/monitorizacion_capacidad_alertas.md)

## Stack Tecnológico Resumido
- .NET 8 (ASP.NET Core MVC / Web API / Worker Services)
- Entity Framework Core (SQL Server, tablas temporales, multitenancy)
- Identity + Roles + JWT
- WCF (integraciones DIAN puntuales)
- Firmado XAdES / UBL 2.1 (facturación electrónica)
- ClosedXML / EPPlus / QuestPDF / iText7 (documentos, reportes)
- NLog (logging) / Redis (cache opcional)
- Bootstrap / jQuery / Font-Awesome (UI)

## Visión General
FevRips habilita la emisión, validación y almacenamiento de facturas electrónicas y RIPS para múltiples empresas (tenants), asegurando:
- Aislamiento lógico por TenantId.
- Auditoría y trazabilidad histórica (tablas temporales y logs).
- Seguridad mediante autenticación combinada (cookies/Identity y JWT para servicios externos).
- Extensibilidad para integración futura con protocolos clínicos (FHIR/HL7) y analítica avanzada.

## Objetivos Clave
1. Cumplimiento regulatorio DIAN y Ministerio de Salud (Resolución 1557/2023).
2. Trazabilidad completa de transacciones y documentos electrónicos (UBL, XML firmados).
3. Procesamiento asíncrono y escalable de cargas RIPS y generación de facturas.
4. Observabilidad y métricas para operación (KPIs de latencia, throughput, errores, reintentos BD).

## Próximos Pasos (Roadmap)
- Homogeneizar versiones EF Core (migrar SqlServer 6.x a 8.x en Data).
- Implementar métricas OpenTelemetry + Prometheus.
- Endurecer políticas de contraseña y rotación de claves JWT.
- Añadir pruebas de carga automáticas (k6) y monitoreo de rendimiento.
- Evaluar adopción HL7 FHIR para interoperabilidad clínica extendida.

## Referencias Regulatorias / Técnicas
- Resolución 1557 de 2023 (RIPS como soporte de factura electrónica en salud).
- Especificación UBL 2.1 para Factura/Nueva Nota.
- Documentación oficial DIAN para validación electrónica.

## Contribuciones
Crear issues y pull requests describiendo impacto en:
1. Seguridad
2. Rendimiento
3. Modelo de datos
4. Cumplimiento regulatorio

---
Para detalles específicos consulte los documentos en `docs/`.