# Arquitectura y componentes de aplicación del EMR

## Diagrama y capas
- Presentación: Ips.Gestion.Ghips.Web (WebForms), WebLocal y libGHIPS.Presentacion.
- Servicios: REST (ServiciosApis), WCF (Services.Wcf), SOAP/ASMX (Services.Ws).
- Negocio: Ips.Gestion.Ghips.Core + libGHIPS.Logica; Domain y DTOs (Domain.To).
- Infraestructura: Infrastructure, Security (authz), Connect (integraciones), LibBD (datos).
- Datos: SQL Server con 42+ esquemas clínicos/administrativos/soporte.
- Automatización: 8+ servicios Windows (ServiceGhips, Trazabilidad, Envio*).

Ver el diagrama Mermaid y detalle en:
- Asistencial/Documentacion_Arquitectura_General_GHIPS_EMR.md (sección 1)
- Asistencial/Documentacion_Arquitectura_GHIPS_EMR.md (sección 1)

## Módulos funcionales (extracto)
- Clínicos: Consulta externa, Urgencias, Hospitalización, Cirugía, Laboratorios, Ayudas Diagnósticas, Vacunación, Triaje, IAAS, Farmacovigilancia.
- Administrativos: Admisiones, Autorizaciones, Facturación, GRDs, Turnos, Administración de Piso.
- Soporte: Medicamentos, Órdenes, Parametrización, Seguridad, Mensajes/Noticias.

Fuente: Asistencial/Documentacion_Arquitectura_GHIPS_EMR.md §1.2–1.3.
