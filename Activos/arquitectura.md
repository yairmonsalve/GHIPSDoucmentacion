# Arquitectura del Sistema (Visión EMR / Gestión de Activos y Compras)

## 1. Contexto y Alcance
El sistema IPS.Activos soporta procesos de: compras, inventarios, despacho, medicamentos intra-hospitalarios y gestión de activos. Integra servicios auxiliares (parametrización, financiero, farmacia) y expone un API para consumo interno/externo. Aunque se menciona EMR (Historia Clínica Electrónica), este módulo se centra en inventarios y logística sanitaria, interactuando con sistemas clínicos a través de servicios.

## 2. Estilos Arquitectónicos
- Multicapa (Presentación / API / Dominio / Persistencia / Integración)
- Cliente-Servidor (Web ASP.NET MVC + WebForms legado, API REST / JSON, WCF/Servicios SOAP externos)
- Orientado a servicios (Servicios internos y externos para parametrización, farmacia, financiero)
- Integración híbrida (REST + SOAP + ETL + SQL CLR + SSRS)
- Configuración por archivos (Web.config + KeysValues BD)

## 3. Componentes Principales
| Capa | Proyecto | Responsabilidad |
|------|----------|-----------------|
| Presentación Web | IPS.Activos.Web | UI legado (WebForms), señalización en tiempo real (SignalR), generación de documentos, operaciones manuales |
| API REST | IPS.Activos.API | Endpoints JSON, autenticación token, servicios de compras, medicamentos, despacho, configuración |
| Dominio / Modelo | IPS.Activos.Model | Entidades, lógica de negocio compartida, contexto EF, servicios de acceso a recursos |
| Procesos ETL | IPS.Activos.ETL | Cargas y transformaciones de datos periódicas (scripts y definiciones) |
| SQL CLR | IPS.Activos.CLR | Funciones y procedimientos extendidos en base de datos |
| Reportes | IPS.Activos.Reportes | Definiciones SSRS (.rdl) e informes de negocio |
| Utilidades | DataCodePrint | Generación/impresión de códigos (DataMatrix) |
| Prototipos | IPS.Activos.Prototypes | Experimentación / pruebas de concepto |
| Modelado | IPS.Activos.Modeling | Modelo funcional / documentación de dominio |

## 4. Flujo de Datos Simplificado
```
[Usuario/Operador] -> (Web UI / SPA parcial) -> API REST -> Servicios Dominio -> EF / SP -> Base de Datos
                                       |-> Reportes SSRS (lectura)
                                       |-> ETL (prepara datos agregados)
                                       |-> Integración externa (Parametrización / Farmacia / Financiero SOAP)
```

## 5. Integraciones Externas
- Servicios SOAP Parametrización (configuración centralizada)
- Servicios SOAP Farmacia (movimientos medicamentos / existencias)
- Servicios SOAP Financiero (validaciones presupuestales)
- API OAuth externo (autenticación centralizada si se activa)

## 6. Mecanismos Transversales
- Inyección de dependencias (Unity)
- Logging (NLog) → destinos: archivo / potencial integración SIEM
- Serialización JSON (Newtonsoft.Json y System.Text.Json para casos puntuales)
- Documentación API (Swashbuckle HelpPage + XML docs)
- Autenticación y tokens (propios + potencial JWT, IdentityModel libs presentes)
- CORS (Microsoft.AspNet.Cors / ASP.NET Core abstractions)

## 7. Diagramas Lógicos (Texto)
Dominio principal:
```
Compras: Requisición -> Aprobación -> Orden Compra -> Recepción -> Devoluciones
Inventario: Entradas (Compra/Devolución) -> Movimientos -> Stock -> Bajas
Medicamentos Intra: Solicitud -> Despacho -> Consumo -> Devolución
Configuración: Parámetros globales (KeysValues) / Catálogos
Seguridad: Login -> Token -> Roles/Permisos UI
```

## 8. Patrones Aplicados
- Repository / Active Record (a través de EF DbContext + SP y acceso directo en DataAccess)
- Service Layer (Servicies\Implementation / Interfaz)
- DTO / ViewModel (Models\*ViewModel)
- Dependency Injection (Unity)
- Facade (Interfaz simplificada hacia servicios externos)
- CQS parcial (al separar comandos de consultas en algunos servicios)

## 9. Consideraciones EMR / Datos Clínicos
El sistema maneja insumos y medicamentos; la información clínica sensible (p.e. datos de pacientes) se espera provenga o se mantenga en sistemas EMR dedicados. Interoperabilidad futura: FHIR / HL7 para interoperar con EMR principal. Actualmente: consumo por servicios SOAP internos.

## 10. Escenarios Críticos
- Alta concurrencia en generación de sugeridos de compra y validación de stock
- Consultas masivas para inventario valorizado y estado de requisiciones
- Lotes de ETL y reportes (picos nocturnos)

## 11. Supuestos y Limitaciones
- Target Framework: .NET Framework 4.8 (API) / 4.5 / 4.0 en módulos legacy
- Base de datos SQL Server (versión ≥ 2012) con objetos CLR
- Sin microservicios aún; monolito modularizado por proyectos

## 12. Roadmap Arquitectónico (Resumen)
| Fase | Mejora | Beneficio |
|------|--------|----------|
| Corto | Estandarizar configuración (secrets externos) | Seguridad / DevOps |
| Corto | Instrumentación (APM + métricas) | Observabilidad |
| Medio | Refactor WebForms -> MVC/SPA | Mantenibilidad |
| Medio | FHIR Gateway | Interoperabilidad clínica |
| Medio | Contenedorización / CI/CD | Escalabilidad / despliegue |
| Largo | Migración .NET 8 (Core) | Performance / soporte futuro |
| Largo | ML para predicción de compras | Analítica avanzada |

## 13. Diagrama de Despliegue (Abstracto)
```
[Usuarios] -> [Front Web IIS] -> [API IIS] -> [SQL Server Cluster]
                              -> [SSRS Server]
                              -> [Servicios Externos SOAP]
                              -> [ETL Agent / Scheduler]
```

## 14. Calidad Arquitectónica Objetivos
- Disponibilidad: >= 99.5% (prod) inicial, escalable a 99.9%
- Tiempo respuesta crítico (consultas stock): < 2s p95 en horario laboral
- Latencia autenticación: < 500ms p95
- Integridad: validaciones transaccionales en movimientos inventario

## 15. Gestión de Configuración
- Claves sensibles migrarán a secret manager (Azure Key Vault / Vault / config segura) → NO almacenar en Web.config
- Versionamiento de esquema DB: scripts controlados (ETL / CLR / Model)

## 16. Riesgos Técnicos
| Riesgo | Impacto | Mitigación |
|--------|---------|-----------|
| Legacy .NET 4.x | Soporte futuro | Plan migración progresiva a .NET Core |
| Dependencias mixtas MVC + ASP.NET Core packages | Complejidad | Auditoría de paquetes / limpieza |
| Web.config con secretos | Exposición | Externalizar secretos + scanning CI |
| Falta métricas APM | Difícil diagnosticar | Integrar AppInsights / Prometheus exporters |
| Cargas nocturnas ETL | Contención | Ventanas y throttling, particionamiento |

## 17. Checklist Auditoría (Arquitectura)
- [ ] Diagrama actualizado
- [ ] Inventario componentes
- [ ] Flujos datos críticos
- [ ] Protocolos integración listados
- [ ] Roadmap aprobado

---
Última actualización: {{fecha}} (Actualizar manualmente)
