# Extensibilidad y Personalización

## Mecanismos de Extensión
- Inyección de dependencias (Unity): reemplazo de implementaciones por contrato (interfaces en `Servicies/Interfaz`)
- Capa de servicios: puntos de extensión para reglas de negocio específicas por cliente
- Configuración por claves (KeysValues): habilitar/deshabilitar funcionalidades por entorno/cliente
- Reportes SSRS: nuevos .rdl y parámetros por rol
- UI: módulos WebForms/MVC adicionales y scripts específicos por módulo

## Personalización Segura
- No modificar núcleo; extender vía nuevas clases/estrategias registradas en Unity
- Configurar feature flags en base de datos (tabla de configuración) y Web.config (sin secretos)
- Estilos y branding: assets en `Content/` y plantillas de reportes

## Versionado y Compatibilidad
- Contratos de servicios estables; cambios mayores versionados V2 (rutas /api/v2)
- Migraciones de esquema coordinadas (backward compatible cuando sea posible)

## Ejemplos de Extensión
- Nuevo cálculo de sugerido de compra: estrategia registrada por IoC
- Integración con ERP externo: adaptador REST/SOAP encapsulado en servicio
- Validaciones adicionales en recepción: decoradores de servicio

## Pruebas y Despliegue
- Pruebas unitarias para nuevas implementaciones
- Feature toggles por ambiente

