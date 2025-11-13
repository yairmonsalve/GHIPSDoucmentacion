# Arquitectura y Componentes de Aplicación del EMR GHIPS
[[ _TOC_ ]]

Fecha: 12/11/2025

## Visión general
El EMR GHIPS es una plataforma N‑capa con servicios REST/WCF/SOAP, núcleo de negocio central y base de datos SQL Server con más de 42 esquemas clínicos y administrativos. Incluye servicios Windows para procesos batch y trazabilidad, además de integraciones con Azure AD, Azure Storage, Power BI y plataformas externas (telemedicina, MIPRES, EPS).

## Diagrama lógico (alto nivel)
```mermaid
graph TB
    subgraph "CAPA DE PRESENTACIÓN"
        Web[Ips.Gestion.Ghips.Web\nASP.NET WebForms]
        WebLocal[Ips.Gestion.Ghips.WebLocal]
        Presentacion[libGHIPS.Presentacion]
    end

    subgraph "CAPA DE SERVICIOS"
        ServiciosApi[Ips.Gestion.Ghips.ServiciosApis\nREST APIs]
        ServiciosWcf[Ips.Gestion.Ghips.Services.Wcf]
        ServiciosWs[Ips.Gestion.Ghips.Services.Ws]
    end

    subgraph "CAPA DE NEGOCIO"
        Core[Ips.Gestion.Ghips.Core]
        Logica[libGHIPS.Logica]
        Domain[Ips.Gestion.Ghips.Domain]
        DomainTO[Ips.Gestion.Ghips.Domain.To]
    end

    subgraph "CAPA DE INFRAESTRUCTURA"
        Infrastructure[Ips.Gestion.Ghips.Infrastructure]
        Security[Ips.Gestion.Ghips.Security]
        Connect[Ips.Gestion.Ghips.Connect]
        LibBD[LibBD]
    end

    subgraph "CAPA DE DATOS"
        BD[(Ips.Gestion.Ghips.BaseDatos\nSQL Server\n42+ esquemas)]
    end

    subgraph "SERVICIOS WINDOWS"
        SvcGhips[ServiceGhips]
        SvcTraz[Trazabilidad]
        SvcMail[SendMail]
        SvcMed[EnvioMedicamentos]
        SvcOrd[EnvioOrdenes]
        SvcHC[EnvioHistoriaClinica]
        SvcFin[EnvioInfoFinanciero]
        SvcGer[EnvioInfoGerencial]
    end

    subgraph "INTEGRACIONES"
        Azure[Azure Storage / Azure AD]
        PowerBI[Power BI Embedded]
        Telemed[Telemedicina]
        MIPRES[MIPRES / EPS]
    end

    Web --> ServiciosApi
    Web --> ServiciosWcf
    WebLocal --> ServiciosWs
    ServiciosApi --> Core
    ServiciosWcf --> Core
    ServiciosWs --> Core
    Core --> Domain
    Core --> Infrastructure
    Logica --> Infrastructure
    Infrastructure --> Security
    Infrastructure --> Connect
    Infrastructure --> LibBD
    LibBD --> BD
    SvcGhips --> Core
    SvcTraz --> Core
    SvcMail --> Core
    SvcMed --> Core
    SvcOrd --> Core
    SvcHC --> Core
    SvcFin --> Core
    SvcGer --> Core
    Web --> PowerBI
    Connect --> Azure
    Connect --> Telemed
    Connect --> MIPRES
    Security --> Azure
```

## Componentes y responsabilidades
- Presentación: WebForms y librería de UI compartida.
- Servicios: REST (Web API), WCF y ASMX/SOAP para compatibilidad.
- Negocio: Core y lógica legacy con DTOs de dominio.
- Infraestructura: seguridad, conectores e infraestructura técnica.
- Datos: SQL Server con esquemas clínicos/administrativos/soporte.
- Automatización: servicios Windows para procesos y reportes.

Fuente base: `Asistencial/Documentacion_Arquitectura_General_GHIPS_EMR.md`.