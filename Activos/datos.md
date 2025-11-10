# Arquitectura y Modelo de Datos

Aviso: No se incluyen esquemas, nombres de tablas o consultas sensibles. Este documento ofrece una vista conceptual. Para el diccionario físico y metadata, consultar el repositorio de base de datos controlado por DBA.

## Motor de Base de Datos
- SQL Server (compatibilidad recomendada ≥ 2016)
- Componentes: Base transaccional (OLTP), objetos SQL CLR, reportes (SSRS), staging ETL

## Acceso a Datos
- Entity Framework 5 (modelo `IPSActivosModel`)
- Procedimientos almacenados para operaciones críticas de inventario/compras
- Conexión ADO.NET directa para operaciones de alta performance en API

## Dominios de Datos (Conceptual)
- Catálogos: Artículos, Unidades de Medida, Bodegas, Centros de Costo, Terceros (Proveedores)
- Seguridad: Usuarios, Roles/Permisos (perfil UI), Auditoría
- Compras: Requisiciones, Aprobaciones, Órdenes de Compra, Recepciones, Devoluciones
- Inventario: Movimientos (Entrada/Salida/Transferencia), Existencias, Valorización (Costo promedio, últimas compras)
- Medicamentos Intra: Solicitudes, Despachos, Consumos, Devoluciones
- Configuración: Parámetros (KeysValues), reglas de negocio, tiempos y umbrales

## Relaciones Clave (Lógico)
- Artículo 1..N Movimientos
- Requisición 1..N Ítems -> 0..N Órdenes de Compra
- Orden de Compra 1..N Recepciones -> 0..N Devoluciones
- Bodega 1..N Existencias por Artículo
- Usuario N..M Roles (perfiles: clínico/administrativo/técnico)

## Calidad e Integridad
- Integridad referencial (FK)
- Transacciones para movimientos de inventario y recepción de compras
- Auditoría (fecha/usuario/estación) en entidades operativas

## Retención y Archivado
- Retención operativa: 24-36 meses en tablas calientes
- Archivado histórico: particionado/tablas históricas (definido por DBA)

## Modelo Físico (referencia)
- Prefijos de esquema: `GCIPS` (ejemplo), `Config`, `Seguridad`
- Índices: claves compuestas en movimientos e ítems, índices por bodega/artículo/fecha
- Cargas ETL: staging dedicadas y ventanas fuera de horario pico

## Catálogo de Datos Sensibles
- Identificadores de paciente (si aplica en módulos de medicamentos): PII/PHI clasificada
- Credenciales y tokens: nunca en base, usar almacén seguro
- Precios/condiciones comerciales: datos sensibles de contratos

## Diccionario de Datos
- Documento separado gobernado por DBA. Enlace interno: <confluence/diccionario-ips-activos>

## Supuestos
- Nombres e IDs en este documento son placeholders.
- Cambios de esquema versionados mediante scripts supervisados.
