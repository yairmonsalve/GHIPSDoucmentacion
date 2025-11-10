# Seguridad y Privacidad

## Roles y perfiles
- Identity + Roles (`IdentityRole`): perfiles típicos (Administrador, Operacional, Auditor, Técnico) — detalle a definir en base a `EmpresaUsuarioPermiso`.
- Permisos finos: `EmpresaUsuarioPermiso` registra permisos específicos por usuario y empresa.
- Autorización: `IAuthorizationPolicyProvider` y `IAuthorizationHandler` personalizados (`TienePermisoPolicyProvider`, `TienePermisoHandler`).

## Autenticación
- Identity (cookie) para Portal Web.
- JWT para servicios (clave `Security:KeyOauth`, expiración horas `ExpiredOauthHours`).
- Tokens por empresa (`TokenAPIEmpresas`) para llamadas asistenciales externas.

## Protección de datos
- HTTPS/Kestrel con certificado PFX.
- Posible cifrado en repositorio de archivos sensibles (XML firmados). Propuesta: agregar encriptación en repositorio con AES-256 + rotación de claves.
- Clasificación sugerida:
  - Pública: Catálogos (Paises, Estados).
  - Interna: ConfigKeys, Logs operativos.
  - Sensible: Transacciones, Facturas, Tokens.
  - Crítica: Firmas, Credenciales, XML UBL antes de firma.

## Auditoría y trazabilidad
- Tablas temporales para historización (Empresas, Transacciones, Repositorios...).
- Logs NLog (nivel Info/Warn/Error) y propuesta de agregar `Trace` y `Audit` target dedicado.

## Políticas y controles
- Reglas de contraseña: longitud >=6, sin requisitos estrictos (recomendación endurecer en producción).
- Sesiones: `IdleTimeout` 2 min (muy corto, ajustar) y cookie con SlidingExpiration.
- Cookie auth: expiración 45 min (recomendar refresco seguro).

## Endurecimiento recomendado
1. Aumentar complejidad de contraseña (digit, upper, special, length >=10).
2. Implementar bloqueo por intentos fallidos.
3. Revisar almacenamiento de secretos en `UserSecrets` o Vault (evitar claves en `appsettings.json`).
4. Integrar escaneo de dependencia (OWASP, Snyk) y análisis de vulnerabilidades.
5. Activar CSP, X-Content-Type-Options, X-Frame-Options en cabeceras.

## Cumplimiento y normativas
- DIAN (facturación electrónica). Registrar evidencia de validación.
- Protección de datos personales (Ley 1581 Colombia / GDPR equivalentes): anonimización en ambientes no productivos.

## Monitoreo de seguridad
- Métricas propuestas: intentos fallidos login, tokens expirados, cambios de permisos por día.
- Alertas: creación masiva de tokens, fallo repetido DIAN, incremento pico en errores 5xx.
