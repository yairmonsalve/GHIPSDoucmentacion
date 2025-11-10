# Interoperabilidad Clínica y Administrativa

## Estado Actual
- Integración principal mediante servicios SOAP (WCF) con sistemas:
  - Parametrización (catálogos maestros)
  - Farmacia (interfaz medicamentos)
  - Financiero (validaciones/compromisos)
- API REST para consumo interno/externo (JSON)

## Arquitectura y Flujos de Información
```
Sistemas Externos (SOAP) <-> API (Adaptadores SOAP) <-> Servicios Dominio <-> DB
Usuarios/Apps -> Web/UI -> API (REST) -> Servicios -> DB/SSRS
```

## Servicios/Capacidades de Integración Disponibles
- REST JSON: endpoints en `IPS.Activos.API` (Compras, Despacho, Medicamentos, Configuración)
- SOAP Clients: configurados en Web.config (bindings BasicHttpBinding)
- ETL: importación/exportación de documentos y datos vía rutas de archivos parametrizadas

## Protocolos y Estándares
- REST/JSON: HTTPS con CORS controlado
- SOAP (WCF): BasicHttpBinding (sin autenticación a nivel de transporte en DEV/TEST; en PROD usar HTTPS y autenticación)
- Autenticación: tokens propios/JWT (IdentityModel libs presentes)
- HL7/FHIR: no implementado actualmente; ver plan de adopción

## Plan FHIR/HL7 (Roadmap)
- Gateway FHIR (R4) para interoperar con EMR clínico
- Recursos clave: Patient, Medication, MedicationRequest, InventoryItem (extensión)
- Transporte: HTTPS + OAuth2 (SMART-on-FHIR)
- Mapeos: tablas de medicamentos e inventario a recursos FHIR

## Seguridad de Integración
- TLS 1.2+, whitelists por IP/origen, throttling de llamadas, validación de payloads
- Rotación de secretos y caducidad de tokens

## Monitoreo de Integraciones
- Disponibilidad de endpoints externos (sondeos)
- Latencia y errores por contrato (SOAP/REST)
- Retries con backoff y circuit breaker (a implementar en adaptadores)

