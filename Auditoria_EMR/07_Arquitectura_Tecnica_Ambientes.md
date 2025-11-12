# Arquitectura Técnica y Ambientes Requeridos

Fecha: 12/11/2025

## Diagrama de despliegue (referencial)
```mermaid
graph TB
    subgraph "USUARIOS"
        Users[Usuarios]
        Browser[Navegador]
        Apps[Apps cliente]
    end
    subgraph "DMZ - PRESENTACIÓN"
        LB[Load Balancer]
        IIS1[IIS Web 1]
        IIS2[IIS Web 2]
        IIS3[IIS Web 3]
    end
    subgraph "APP - RED INTERNA"
        AppSrv1[App Server 1\nServicios Windows]
        AppSrv2[App Server 2\nServicios Windows]
        APISrv[API Server\nREST/SOAP/WCF]
    end
    subgraph "DATOS - PROTEGIDA"
        SQLPrimary[(SQL Server Primary)]
        SQLSecondary[(SQL Server Secondary\nAlwaysOn)]
        FileSrv[File Server]
    end
    subgraph "CLOUD - AZURE"
        AzureStorage[Azure Storage]
        AzureAD[Azure AD]
        PowerBI[Power BI Service]
    end
    Users --> Browser
    Users --> Apps
    Browser --> LB
    Apps --> LB
    LB --> IIS1
    LB --> IIS2
    LB --> IIS3
    IIS1 --> APISrv
    IIS2 --> APISrv
    IIS3 --> APISrv
    IIS1 --> AppSrv1
    IIS2 --> AppSrv2
    APISrv --> SQLPrimary
    AppSrv1 --> SQLPrimary
    AppSrv2 --> SQLPrimary
    SQLPrimary -.Replicación.-> SQLSecondary
    APISrv --> FileSrv
    AppSrv1 --> FileSrv
    IIS1 --> AzureStorage
    IIS2 --> AzureStorage
    IIS1 --> AzureAD
    IIS1 --> PowerBI
```

## Ambientes
- Desarrollo, Integración/Testing, Release/Preprod, Producción.

## Requisitos técnicos
- Web/App: Windows Server 2012 R2+ / IIS 8.5+ / .NET 4.5.2–4.6.1, WebSockets, compresión.
- BD: SQL Server 2012+ (Standard/Enterprise), Agent, FTS, SSRS; RAM 16–32+ GB; SSD para logs/tempdb.
- Servicios Windows: recuperación automática y scheduler.
- Storage: File Server y/o Azure Storage para documentos y backups.

## Seguridad de red
- TLS 1.2; segmentación por VLAN; WAF recomendado; CORS restringido.

Fuentes: `Asistencial/Documentacion_Arquitectura_General_GHIPS_EMR.md`, `Activos/ambientes.md`.