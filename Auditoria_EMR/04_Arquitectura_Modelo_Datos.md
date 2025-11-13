# Arquitectura y Modelo de Datos
[[ _TOC_ ]]

Fecha: 12/11/2025

## Estrategia
- Motor: SQL Server 2012+ (recomendado ≥ 2016) con collation SQL_Latin1_General_CP1_CI_AS.
- Database‑first con 42+ esquemas clínicos, administrativos, soporte y especializados.
- Acceso: ADO.NET + Enterprise Library Data; uso de procedimientos y pooling (≈200 conexiones máximas).
- Auditoría y caché con Enterprise Library.

## Vista de esquemas (conceptual)
```mermaid
graph TB
    subgraph "ESQUEMAS CLÍNICOS"
        dbo[(dbo)]
        ConsultaExt[(ConsultaExterna)]
        Cirugia[(Cirugia)]
        Lab[(Laboratorios)]
        AyudasDx[(AyudasDiagnosticas)]
        Transf[(Transfusiones)]
        Traspl[(Trasplantes)]
        Vac[(Vacunacion)]
        Triage[(Triaje)]
        AIEPI[(AIEPI)]
        Odonto[(Odontologia)]
        FV[(Farmacovigilancia)]
        CI[(ControlInfecciones)]
    end
    subgraph "ADMINISTRATIVOS"
        Fact[(Facturacion)]
        Aut[(Autorizaciones)]
        GRD[(GRDs)]
        Turn[(Turnos)]
        AdminP[(AdministrarPiso)]
    end
    subgraph "SOPORTE"
        Med[(Medicamentos)]
        Ord[(Ordenes)]
        Param[(Parametrizacion)]
        Sec[(Security)]
        Seg[(Seguridad)]
        Msg[(Mensajes)]
        Not[(Noticias)]
        Sop[(Soporte)]
        Store[(Storage)]
    end
    subgraph "ESPECIALIZADOS"
        Inter[(Interconsultas)]
        Avales[(Avales)]
        PyP[(PyP)]
        Epide[(Epide)]
        Dietas[(DietasEspeciales)]
        SolHosp[(SolicitudHospitalizacion)]
        Rotul[(Rotulaciones)]
        A9[(Anexo9)]
        A10[(Anexo10)]
    end
    dbo --> ConsultaExt
    dbo --> Cirugia
    ConsultaExt --> Ord
    Cirugia --> Ord
    Ord --> Med
    Ord --> Lab
    Ord --> AyudasDx
    Med --> FV
    dbo --> Fact
    dbo --> Aut
```

## Consideraciones adicionales
- Integridad referencial, índices por alta cardinalidad y optimización de consultas.
- Estrategias de retención/archivado definidas por DBA. 

Fuentes: `Asistencial/Documentacion_Arquitectura_General_GHIPS_EMR.md`, `Activos/datos.md`.