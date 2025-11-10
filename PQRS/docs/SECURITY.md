# Guía de Seguridad – Gestión PQR (Frontend)

Este documento resume controles actuales y backlog recomendado para cumplir requisitos no funcionales de seguridad.

## 1. Controles actuales (en repo)
- HTTPS redirect en IIS vía `src/web.config`.
- Validaciones de formularios (required, email, maxlength).
- Captcha visual con Canvas y opción “Escuchar” (SpeechSynthesis), validación en cliente.
- Aviso y enlace a política de protección de datos (`assets/RepositorioSede/Config.json`).

## 2. Controles recomendados (backlog)
- Captcha server-side o reCAPTCHA v2/enterprise (validación en backend).
- Interceptor HTTP con Authorization Bearer (JWT/OAuth2) cuando existan flujos autenticados.
- Manejo centralizado de errores: interceptor + servicio de notificaciones.
- Restricciones de adjuntos: validar tipo y tamaño en cliente y servidor; antivirus/antimalware en backend.
- Cabeceras de seguridad en hosting (IIS/Proxy):
  - Content-Security-Policy (CSP)
  - X-Content-Type-Options: nosniff
  - X-Frame-Options: DENY / frame-ancestors en CSP
  - Referrer-Policy: no-referrer / strict-origin-when-cross-origin
  - Permissions-Policy: limitar APIs (geolocation, mic, camera).
- Sanitización de HTML si se muestra contenido remoto (Bypass sólo si se confía plenamente en la fuente).
- Logs de cliente (error boundary) con scrubbing de PII.
- Política de retención/borrado y clasificación de datos personales/sensibles (en backend/documental).

## 3. Gestión de secretos y configuración
- No almacenar secretos en repositorio. Usar variables de entorno/Key Vault.
- `environment.*.ts` sólo con URLs y flags; no incluir llaves secretas.

## 4. Cumplimiento y privacidad
- Minimización de datos; recolectar sólo lo necesario.
- Consentimiento informado y trazabilidad.
- Encriptación en tránsito (TLS) y en reposo (en backend/almacenamiento).

## 5. Pruebas de seguridad
- SAST/ESLint y dependabot/OWASP Dependency-Check.
- DAST sobre ambientes (ZAP/ Burp) – validar CSP, XSS, CSRF, carga de archivos.
- Revisión de permisos CORS/allowed origins (en backend).

## 6. Plan de implementación
1. Interceptor de errores y límites de adjuntos.
2. Integrar reCAPTCHA y validar en backend.
3. Cabeceras de seguridad y CSP en IIS/Proxy.
4. Telemetría/alertas para errores altos y latencias.

---
Fin de la guía.
