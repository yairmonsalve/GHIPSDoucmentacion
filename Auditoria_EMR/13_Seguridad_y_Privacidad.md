# Seguridad y Privacidad
[[ _TOC_ ]]

Fecha: 12/11/2025

## Definición de roles y perfiles de acceso
- Clínico: médico tratante, enfermería, apoyo diagnóstico (accesos acotados por servicio/módulo).
- Administrativo: facturación, autorizaciones, cartera (enmascaramiento selectivo de datos clínicos).
- Técnico: soporte TI, seguridad (principio de menor privilegio, auditoría completa).

## Procedimientos de autenticación, autorización y ciclo de vida de usuarios
- Autenticación: Windows Auth / Forms y Azure AD (OAuth 2.0/OpenID Connect), MFA opcional.
- Autorización: roles/permisos granulares en `Ips.Gestion.Ghips.Security`.
- Aprovisionamiento/asignaciones/cambios/retiro: procesos documentados; trazabilidad por usuario, módulo y timestamp (ServicioWinTrazabilidad).

## Mecanismos de cifrado de datos en uso, tránsito y reposo
- En tránsito: TLS 1.2+ para Web/APIs/Servicios.
- En reposo: cifrado a nivel de BD (TDE/AES), cifrado de archivos sensibles.
- En uso: enmascaramiento dinámico y controles por rol en UI/servicios.

## Clasificación de información clínica
- Niveles: Pública, Interna, Confidencial, Restringida.
- Etiquetado en módulos de almacenamiento (Security/Seguridad/SoportesPDF) y políticas de acceso.

## Controles para prevención de fuga o pérdida de datos (DLP)
- Auditoría centralizada (Enterprise Library Logging) y alertas por eventos.
- Restricción de exportaciones por rol y registro de descargas.
- Backups cifrados, retención controlada y pruebas de restauración.

Cumplimiento: Ley 1581/2012, Resolución 2003/2014; referencia HIPAA/HITECH; ISO 27001 en proceso.

Fuentes: `Asistencial/Documentacion_Seguridad_Privacidad_GHIPS_EMR.md`, `Activos/seguridad.md`.