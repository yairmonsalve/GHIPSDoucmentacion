# Evidencia de mensajes HL7 v2 (GHIPS EMR)

Este anexo consolida evidencias tecnicas de interoperabilidad HL7 v2 en GHIPS EMR para fines de auditoria. Incluye configuraciones, referencias de codigo y muestras anonimizadas de mensajes.

## Alcance
- Version soportada: HL7 v2.5 (ver `VersionHl7`).
- Casos de uso: ADT (movimientos de paciente) y ORU (resultados). Otros flujos se atienden mediante conectores dedicados.

## Configuracion relevante
- Web: claves de integracion con Mirth/HIRUKO y version HL7
  - `Ips.Gestion.Ghips.Web/Web.config`: URL Mirth (HTTP) y `VersionHl7` 2.5.
- Paxera (RIS/PACS): escritura de archivos HL7 en FTP interno
  - `Ips.Gestion.Ghips.Web/Web.config`: `RutaGuardadoHL7Paxera` (red interna).

## Evidencia en codigo
- `Ips.Gestion.Ghips.Connect/Util/ConnectTransformador.cs`: formato de fecha HL7 v2 `yyyyMMddHHmmss` usado en transformaciones.
- `Ips.Gestion.Ghips.Connect/EnvioInterop.cs` + `Configuracion/Configuracion.cs`: mecanismo de habilitacion de envios a destinos de interoperabilidad.
- `Ips.Gestion.Ghips.Connect/Connect/Ips.Gestion.Ghips.Connect.xml`: ejemplo de nodo de envio a tercero.

## Mensajes de muestra (anonimizados)
- ADT^A01: `Evidencias/HL7v2/ADT_A01.txt`
- ORU^R01: `Evidencias/HL7v2/ORU_R01.txt`
- ACK^A01: `Evidencias/HL7v2/ACK_A01.txt`

Notas:
- Los mensajes provienen de ambiente de prueba y han sido anonimizados (sin datos personales reales).
- Las IPs observadas en configuracion corresponden a redes internas (no expuestas a internet). Los secretos (credenciales) se manejan como configuracion segura en despliegue.

## Procedimiento para obtencion de evidencia operacional
- Trazas de envio/reintentos y fallas: Enterprise Logging y Event Viewer en los servicios de interoperabilidad.
- Confirmacion de entrega: acuses `ACK`/`NAK` en canal HL7 o respuestas HTTP del gateway (Mirth/HIRUKO).
- Reproduccion controlada: generar altas/ingresos (ADT) y publicar resultados de laboratorio de prueba (ORU) en entorno de QA; adjuntar logs y payloads capturados.

## Referencias
- `Documentacion_Interoperabilidad_GHIPS_EMR.md`: flujos y protocolos (HL7 v2.x).
- `Documentacion_Respuesta_Auditoria_Preguntas.md` #10.
