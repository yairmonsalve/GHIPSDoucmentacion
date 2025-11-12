# Casos de Uso con Tecnologías Emergentes (Implementados y Planificados)

Fecha: 12/11/2025

## Implementados
- Power BI embebido: tableros ejecutivos y operacionales.
- SignalR: notificaciones en tiempo real (alertas clínicas, chat, estado de órdenes).
- Azure Storage: almacenamiento híbrido de documentos clínicos.
- Telemedicina: integración ITMS vía SOAP/REST.
- Reportes regulatorios automáticos: RIPS, Anexos 9/10.
- SSO con Azure AD (MFA opcional) y trazabilidad con QR.

## Planificados (Roadmap)
```mermaid
graph TD
    A[Fase 1: Fundamentos IA/ML<br/>(6-12 meses)] --> B[Fase 2: IA Avanzada<br/>(12-18 meses)]
    B --> C[Fase 3: IoT Médico<br/>(18-24 meses)]
    C --> D[Fase 4: Blockchain<br/>(24-30 meses)]

    A1[Modelos Predictivos<br/>ML.NET]
    A2[NLP Básico<br/>Text Analytics]
    B1[Computer Vision<br/>Azure Cognitive Services]
    B2[Chatbots IA<br/>Azure Bot Framework]
    C1[IoT Hub<br/>Monitoreo remoto]
    C2[Wearables<br/>Telemetría continua]
    D1[Blockchain HC<br/>Consent y auditoría inmutable]

    A --> A1
    A --> A2
    B --> B1
    B --> B2
    C --> C1
    C --> C2
    D --> D1
```

Fuentes: `Asistencial/Documentacion_Arquitectura_General_GHIPS_EMR.md`.