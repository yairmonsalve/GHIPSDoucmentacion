# Arquitectura y Modelo de Datos

## EMR (Asistencial)
- Motor: SQL Server 2012+; collation SQL_Latin1_General_CP1_CI_AS.
- Organización: 42+ esquemas por dominios (clínicos, administrativos, soporte, especializados).
- Acceso: ADO.NET + Enterprise Library Data; transacciones; pooling (max 200).

## FevRips
- Multitenancy por TenantId; tablas temporales (SYSTEM_VERSIONED) para auditoría; índices por campos críticos.

## Financiero
- Dominio contable/presupuestal/tesorería/cartera; vistas y tablas precalculadas para reportería; seguridad en BD separada.

## Referencias
- Asistencial/Documentacion_Arquitectura_GHIPS_EMR.md §4
- FevRips/docs/modelo_datos.md
- Financiero/02_Modelo_de_Datos.md
- Activos/datos.md
