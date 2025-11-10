# Seguridad y Privacidad

Aviso: No se listan credenciales reales. Este documento cubre controles y lineamientos.

## Roles y Perfiles de Acceso (Ejemplo)
| Rol | Alcance | Tipo |
|-----|---------|------|
| Clinico | Consulta de stock, solicitud medicamentos | Clínico |
| Farmacia | Despacho, ajustes inventario, devoluciones | Clínico/Operativo |
| Compras | Requisiciones, órdenes, recepciones | Administrativo |
| Auditoría | Lectura reportes y trazabilidad | Administrativo |
| Administrador | Configuración, gestión usuarios, parámetros | Técnico |
| Soporte Técnico | Diagnóstico, logs (limitado) | Técnico |

## Clasificación de Información Clínica
| Clase | Ejemplos | Protección |
|-------|----------|-----------|
| PII/PHI | Identificadores de paciente (si presentes) | Encriptar en tránsito, controles estrictos |
| Confidencial Operativa | Precios, contratos, costos | Acceso por rol Compras/Admin |
| Interna | Catálogos, configuraciones no sensibles | Acceso roles operativos |
| Pública | Recursos estáticos generales | Sin restricción especial |

## Autenticación y Autorización
- Token basado (JWT potencial con IdentityModel libs)
- Reintentos limitados (config: ReintentosLogin=3)
- Política expiración de contraseñas (CambioClave=150 días)
- Complejidad (PasswordRegEx)

## Protección de Datos
- TLS 1.2 obligado en PROD
- Secrets fuera de Web.config (migración planificada)
- Cifrado en repositorio de archivos: pendiente (roadmap)

## Registro y Auditoría
- Logs de acceso y operaciones críticas (NLog)
- Auditoría DB en movimientos y cambios de estado
- Alerta sobre eventos de seguridad (intentos fallidos, escalamiento de privilegios)

## Hardening Aplicativo
- Eliminación de headers innecesarios (Server, X-Powered-By)
- CORS restringido (actual: wildcard → debe ajustarse)
- Validación de entrada (param sanitization)

## Protección contra Amenazas Comunes
| Amenaza | Mitigación |
|---------|------------|
| SQL Injection | Parámetros, procedimientos almacenados, EF |
| XSS | Encoding salida, CSP futura |
| CSRF | Tokens antifalsificación (para formularios autenticados) |
| Directory Traversal | Validación rutas y sandbox paths |
| DoS básico | Throttling, timeouts configurados |

## Privacidad
- Minimizar persistencia de datos clínicos directos
- Aislamiento de datos por cliente/entidad donde aplique

## Continuidad y Respaldo
- Backups diarios + diferenciales, retención ≥ 30 días
- Restauración probada al menos semestral

## Cumplimiento (Objetivo)
- Buenas prácticas alineadas a ISO 27001 / HIPAA (si aplica) / LGPD local
- Trazabilidad completa de transacciones sensibles

## Roadmap Seguridad
| Prioridad | Acción | Beneficio |
|----------|--------|-----------|
| Alta | Externalizar secretos | Reduce riesgo exposición |
| Alta | CORS restringido | Evita abuso orígenes | 
| Media | MFA administración | Fortalece control acceso |
| Media | APM + Correlación | Detección anomalías |
| Baja | CSP + SRI | Mitiga XSS avanzado |

