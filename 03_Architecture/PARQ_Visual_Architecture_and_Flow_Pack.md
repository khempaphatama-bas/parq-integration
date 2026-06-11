# PARQ Visual Architecture and Flow Pack

Owner: Simon / Senior Solution Architect

Input files:
- `AGENTS.md`
- `MASTER_INDEX.md`
- `TASK_BOARD.md`
- `HANDOFF_LOG.md`
- `03_Architecture/PARQ_User_Flow_Integration_Architecture.md`
- `03_Architecture/PARQ_Data_API_Context_Boundary_Vendor_Matrix.md`
- `03_Architecture/PARQ_Technical_Dependency_Control_Pack.md`
- `02_Discovery/PARQ_Integration_Architecture_Review.md`
- `01_Source_of_Truth/Clarifications/PARQ_Clarification_Decision_Log.md`

Output path: `03_Architecture/PARQ_Visual_Architecture_and_Flow_Pack.md`

Status: Draft / Visual architecture baseline with open questions

Downstream consumer:
- Quinn / QA Lead for later SIT/UAT planning inputs
- PARQ / Orchestrator for dependency tracking
- Libra / Project Librarian for indexing and traceability
- Simon / Senior Solution Architect for architecture review and dependency follow-up

Rules applied:
- No user stories, QA scenarios, UAT cases, or acceptance criteria are created in this artifact.
- Missing API details, named owners, SLAs, environments, and decisions are shown as open questions.
- Repository files are the source of truth.

## Source Traceability Note

```mermaid
flowchart LR
    SOT["User Flow Index\nSource of truth"] --> ARCH1["PARQ User Flow\nIntegration Architecture"]
    ARCH1 --> VIS["Visual Architecture\nand Flow Pack"]
    DATA["Data/API/Boundary/\nVendor Matrix"] --> VIS
    CTRL["Technical Dependency\nControl Pack"] --> VIS
    REVIEW["Discovery Architecture\nReview"] --> VIS
    CLAR["Clarification Decision Log\nTraceability shell"] --> VIS
    BMS1["BMS member API\nSource reference"] --> VIS
    BMS2["Add Identity flow\nBMS checkMember"] --> VIS
    MISSING["Missing proposal PDF\nPARQ-MISSING-001"] -. open source gap .-> VIS
```

Owner: Simon  
Input files: all listed input files  
Output path: `03_Architecture/PARQ_Visual_Architecture_and_Flow_Pack.md`  
Status: Draft / traceability visible  
Downstream consumer: Quinn, PARQ, Libra, Simon  
Open questions:
- `MASTER_INDEX.md` records `[Proposal] The PARQ integration.pdf` as missing.
- `PARQ_Clarification_Decision_Log.md` is a traceability shell and records the BMS Option B non-blocking login decision; missing proposal/standalone clarification source remains open.
- Current app checks BMS member in Sign-up and Add / Remove identity flow; PARQ to-be login member check is now selected as Option B non-blocking refresh.

## 1. High-Level PARQ to One Bangkok Context Diagram

```mermaid
flowchart LR
    User["PARQ / OBK User"] --> App["One Bangkok Mobile App"]
    Admin["CMS Admin / Operations"] --> CMS["OBK CMS"]
    App --> IAM["IAM\nLocal profile + persona"]
    IAM <--> SSO["SSO\nAuthentication + orchestration"]
    IAM <--> BZB["BZB / Buzzee Bee\nRetail identity"]
    IAM <--> FS["FS / Iviva\nWorkplace + access authority"]
    IAM <--> BMSLookup["BMS\nMember lookup / identity flow"]

    App --> Backend["OBK Backend\nIntegration logic"]
    Backend <--> FS
    Backend <--> Argento["Argento\nPayment gateway"]
    Backend <--> CMS
    Backend --> Notify["Notification Infrastructure"]
    IAM --> Kafka["Kafka / Event Bus"]
    Kafka --> Notify
    Kafka --> BMSCleanup["BMS\nCleanup consumer"]

    FS <--> Elevator["Elevator"]
    FS <--> Turnstile["Turnstile"]
    Backend -.->|Phase 1.5| OCR["TCCT OCR"]
```

Owner: Simon  
Input files: `PARQ_Data_API_Context_Boundary_Vendor_Matrix.md`, `PARQ_Technical_Dependency_Control_Pack.md`  
Output path: `03_Architecture/PARQ_Visual_Architecture_and_Flow_Pack.md`  
Status: Draft / context baseline  
Downstream consumer: Quinn, PARQ, Libra  
Open questions:
- Named owners for SSO, IAM, FS/Iviva, BZB, Argento, CMS, Kafka/Event Bus, BMS, Notification, Elevator, Turnstile, and TCCT OCR are not confirmed.
- Exact SIT/UAT/PVT endpoints, credentials, and readiness dates are not available in repository files.
- BMS login refresh is non-blocking for app entry. Exact endpoint/payload, timeout/circuit-breaker, previous-permission cache/source, and rare conflict support path remain open.

## 2. System Boundary Diagram

```mermaid
flowchart TB
    subgraph Client["Client Boundary"]
        App["Mobile App"]
    end

    subgraph OBK["One Bangkok Controlled Boundary"]
        Backend["OBK Backend\nQR, payment, visitor, integration"]
        IAM["IAM\nAccount ID, profile, persona"]
        CMS["CMS\nAdmin visibility"]
        Notify["Notification"]
        Kafka["Kafka / Event Bus"]
        BMS["BMS"]
    end

    subgraph Identity["Identity Boundary"]
        SSO["SSO\nCredential validation"]
    end

    subgraph Vendor["External Vendor / Partner Boundary"]
        FS["FS / Iviva\nWorkplace, parking, visitor, access"]
        BZB["BZB\nRetail identity"]
        Argento["Argento\nPayment + refund"]
        OCR["TCCT OCR\nPhase 1.5"]
    end

    subgraph Hardware["Site Hardware Boundary"]
        Elevator["Elevator"]
        Turnstile["Turnstile"]
    end

    App --> IAM
    App --> Backend
    IAM <--> SSO
    IAM <--> BZB
    IAM <--> BMS
    IAM <--> FS
    Backend <--> FS
    Backend <--> Argento
    Backend <--> CMS
    Backend --> Notify
    IAM --> Kafka
    Kafka --> Notify
    Kafka --> BMS
    FS <--> Elevator
    FS <--> Turnstile
    Backend -.->|Phase 1.5| OCR
```

Owner: Simon  
Input files: `PARQ_Data_API_Context_Boundary_Vendor_Matrix.md`, `PARQ_Technical_Dependency_Control_Pack.md`, `AGENTS.md`  
Output path: `03_Architecture/PARQ_Visual_Architecture_and_Flow_Pack.md`  
Status: Draft / boundary baseline  
Downstream consumer: Quinn, PARQ, Libra  
Open questions:
- CMS Phase 1 seed account scope and compensating controls are not confirmed.
- FS outage behavior for online elevator and turnstile validation is not confirmed.
- TCCT OCR is deferred and lacks environment/API detail in repository files.

## 3. Integration Dependency Map

```mermaid
flowchart TB
    subgraph Identity["Identity"]
        ID1["Existing sign-in\nUF-001"] --> IAM
        ID2["New onboarding\nUF-003"] --> IAM
        ID3["Retail matching\nUF-002"] --> BZB
        IAM --> SSO
        IAM --> BMS["BMS\nNon-blocking login refresh"]
        IAM --> FS
    end

    subgraph Workplace["Workplace Access"]
        W1["Persona UI\nUF-005"] --> FS
        W2["Multi-tower\nUF-006"] --> FS
        W3["My QR\nUF-009"] --> Backend
        Backend --> FS
        FS --> Elevator
        FS --> Turnstile
    end

    subgraph Parking["Parking"]
        P1["Availability\nUF-010"] --> FS
        P2["Traffic\nUF-011"] --> FS
        P3["Payment + ticket\nUF-012"] --> Backend
        Backend --> Argento
        Backend --> FS
        P4["E-stamp OCR\nUF-1.5-001"] -. deferred .-> OCR
    end

    subgraph Visitor["Visitor"]
        V1["Visitor pass\nUF-013"] --> Backend
        Backend --> FS
        FS --> Turnstile
        FS --> Elevator
        CMS -. visibility .-> Backend
    end

    subgraph NotifyDomain["Notification"]
        N1["PARQ notification\nUF-014"] --> Notify
        IAM --> Notify
    end

    subgraph Compliance["Compliance"]
        C1["Security + compliance\nUF-017"] --> IAM
        C1 --> Kafka
        Kafka --> Notify
        Kafka --> BMS
    end

    subgraph Testing["Testing"]
        T1["Testing + deployment\nUF-018"] --> SSO
        T1 --> FS
        T1 --> BZB
        T1 --> Argento
        T1 --> CMS
        T1 --> Elevator
        T1 --> Turnstile
    end
```

Owner: Simon  
Input files: `PARQ_User_Flow_Integration_Architecture.md`, `PARQ_Technical_Dependency_Control_Pack.md`  
Output path: `03_Architecture/PARQ_Visual_Architecture_and_Flow_Pack.md`  
Status: Draft / dependency grouping baseline  
Downstream consumer: Quinn, PARQ  
Open questions:
- FS service ownership is not split by function in repository files.
- Traffic SLA, parking freshness threshold, and hardware validation readiness are open.
- Phase 1.5 OCR and rate configuration ownership remains open.

## 4. Data Ownership / Persona Flow View

```mermaid
flowchart LR
    Credential["Credential\nSSO owns"] --> PublicID["Public SSO ID"]
    PublicID --> Account["Account ID\nIAM owns"]
    Account --> Profile["Local profile\nIAM owns"]
    Account --> Persona["Persona entitlement\nIAM owns"]
    Account --> BMSMember["BMS member lookup\nBMS owns"]
    BMSMember --> Persona

    FSID["FS external identity\nFS owns"] --> Persona
    FSID --> Workplace["Workplace persona"]
    FSID --> Floors["Tower + floor authorization"]
    FSID --> Access["Access policy\nElevator + turnstile"]

    BZBID["BZB member ID\nBZB owns"] --> Retail["Retail persona"]
    Retail --> Persona

    Account --> BackendData["OBK Backend data\npayment + visitor + QR"]
    BackendData --> Payment["Payment records\nOBK owns"]
    Payment --> ArgentoData["Financial processing\nArgento owns"]
    Payment --> FSTicket["Ticket + exit status\nFS/Iviva owns"]

    BackendData --> Visitor["Visitor pass workflow\nOBK owns"]
    Visitor --> FSVisitor["Visitor access validity\nFS owns"]

    Account --> NotifyData["Notification segment + inbox\nNotification owns"]
    Account --> DeleteEvent["Permanent delete event\nKafka/Event Bus"]
    DeleteEvent --> NotifyData
    DeleteEvent --> BMSData["BMS cleanup"]
```

Owner: Simon  
Input files: `PARQ_Data_API_Context_Boundary_Vendor_Matrix.md`, `PARQ_Technical_Dependency_Control_Pack.md`  
Output path: `03_Architecture/PARQ_Visual_Architecture_and_Flow_Pack.md`  
Status: Draft / data ownership view  
Downstream consumer: Quinn, PARQ, Libra  
Open questions:
- Field-level PII and consent mapping is incomplete.
- Profile overwrite rules need approved field-level policy.
- QR single-use/replay behavior remains unconfirmed.

## 5. Priority Sequence Diagrams

### 5.1 Existing PARQ User Sign-In

```mermaid
sequenceDiagram
    autonumber
    participant U as User
    participant App as Mobile App
    participant IAM as IAM
    participant SSO as SSO
    participant BMS as BMS
    participant FS as FS/Iviva
    participant BZB as BZB

    U->>App: Start sign-in
    App->>IAM: GET /identity/validate
    IAM->>SSO: POST /user/exists
    SSO-->>IAM: Identity result
    App->>IAM: POST /auth/login
    IAM->>SSO: POST /oauth/token
    alt Credential invalid
        SSO-->>IAM: Auth error
        IAM-->>App: Login failed
    else Credential valid
        SSO-->>IAM: Token + Public SSO ID
        IAM->>IAM: Resolve Account ID + persona
        IAM->>BMS: Non-blocking member check / Workplace refresh
        alt BMS unavailable or timeout
            BMS-->>IAM: No refresh result
            IAM->>IAM: Continue login; use existing Workplace permission if detectable
        else Member found and eligible
            BMS-->>IAM: Member data / fs identity candidate
            IAM->>IAM: Create/update fs external identity and persona if allowed
        else No member or rare bound-to-other-account
            BMS-->>IAM: No member / conflict-like state
            IAM->>IAM: Continue login; mark support/audit path if conflict-like
        end
        IAM->>FS: Resolve fs external identity metadata
        alt FS metadata missing
            FS-->>IAM: No workplace entitlement
            IAM-->>App: Workplace unavailable / support path
        else FS metadata valid
            FS-->>IAM: Tower, floor, FS member UID
            IAM->>BZB: Lookup retail identity
            alt BZB conflict
                BZB-->>IAM: Different Account ID conflict
                IAM-->>App: Conflict resolution required
            else Match or no match
                BZB-->>IAM: Retail match result
                IAM-->>App: Account ID + persona entitlements
            end
        end
    end
```

Owner: Simon  
Input files: `PARQ_User_Flow_Integration_Architecture.md`, `PARQ_Technical_Dependency_Control_Pack.md`  
Output path: `03_Architecture/PARQ_Visual_Architecture_and_Flow_Pack.md`  
Status: Draft / priority sequence baseline  
Downstream consumer: Quinn for later SIT planning inputs  
Open questions:
- What are exact BMS timeout/circuit-breaker and previous-permission cache/source rules?
- What support/audit path applies if BMS returns rare member-bound-to-other-account during login?
- Is BZB failure blocking for workplace sign-in?
- What are exact FS/BZB timeout and retry rules?

### 5.2 New PARQ User Onboarding

```mermaid
sequenceDiagram
    autonumber
    participant U as User
    participant App as Mobile App
    participant IAM as IAM
    participant SSO as SSO
    participant FS as FS/Iviva
    participant BZB as BZB

    U->>App: Start registration
    App->>IAM: GET /identity/validate
    IAM->>SSO: POST /user/exists
    SSO-->>IAM: Existing/new identity result
    App->>IAM: Submit registration profile
    IAM->>SSO: Register / validate credential flow
    alt SSO fails
        SSO-->>IAM: Registration error
        IAM-->>App: Registration failed
    else SSO accepted
        SSO-->>IAM: Public SSO ID / token context
        IAM->>FS: Validate workplace eligibility
        alt FS rejects
            FS-->>IAM: No workplace authorization
            IAM-->>App: Onboarding blocked / cleanup required
        else FS authorizes
            FS-->>IAM: FS member UID + tower + floors
            IAM->>BZB: Match retail identity
            alt BZB conflict
                BZB-->>IAM: Conflict
                IAM-->>App: Merge/conflict resolution required
            else Match or no match
                BZB-->>IAM: Match result
                IAM->>IAM: Create/update Account ID + profile + persona
                IAM-->>App: Onboarding result
            end
        end
    end
```

Owner: Simon  
Input files: `PARQ_User_Flow_Integration_Architecture.md`, `PARQ_Technical_Dependency_Control_Pack.md`  
Output path: `03_Architecture/PARQ_Visual_Architecture_and_Flow_Pack.md`  
Status: Draft / priority sequence baseline  
Downstream consumer: Quinn, PARQ  
Open questions:
- Which profile fields are protected from overwrite?
- What cleanup is required for incomplete registration states?

### 5.3 Retail Account Matching / BZB Conflict

```mermaid
sequenceDiagram
    autonumber
    participant App as Mobile App
    participant IAM as IAM
    participant SSO as SSO
    participant BZB as BZB
    participant FS as FS/Iviva

    App->>IAM: Request account matching
    IAM->>SSO: POST /oauth/token with throwOnConflict: true
    SSO-->>IAM: Conflict state or token result
    IAM->>BZB: Match email/phone
    alt Different Account IDs found
        BZB-->>IAM: Conflict
        IAM-->>App: User must resolve conflict
    else Same Account ID
        BZB-->>IAM: Matching identity
        IAM-->>App: Merge prompt / information
        App->>IAM: Proceed with merge path
        IAM->>FS: Sync workplace permissions to surviving account
        IAM->>BZB: Sync surviving Account ID
        IAM->>IAM: Persist persona entitlements
        alt Merge persistence failed
            IAM-->>App: Support required
        else Merge complete
            IAM-->>App: Updated Account ID + personas
        end
    end
```

Owner: Simon  
Input files: `PARQ_User_Flow_Integration_Architecture.md`, `PARQ_Technical_Dependency_Control_Pack.md`  
Output path: `03_Architecture/PARQ_Visual_Architecture_and_Flow_Pack.md`  
Status: Draft / priority sequence baseline  
Downstream consumer: Quinn, PARQ  
Open questions:
- Who owns manual correction after incorrect completed merge?
- What audit proves merge decision and surviving Account ID?

### 5.4 Parking Payment and Ticket Sync

```mermaid
sequenceDiagram
    autonumber
    participant U as User
    participant App as Mobile App
    participant IAM as IAM
    participant BE as OBK Backend
    participant FS as FS/Iviva
    participant Pay as Argento

    U->>App: Open parking payment
    App->>IAM: Validate Account ID/session
    IAM-->>App: Valid identity
    App->>BE: Request ticket/payment context
    BE->>FS: Retrieve ticket + payable amount
    alt Ticket not payable
        FS-->>BE: Ticket error
        BE-->>App: Payment unavailable
    else Ticket payable
        FS-->>BE: Ticket ID + amount
        BE->>BE: Create payment record
        BE->>Pay: Initiate PromptPay
        alt Payment initiation failed
            Pay-->>BE: Error
            BE-->>App: Payment unavailable
        else Payment initiated
            Pay-->>BE: QR/payment reference
            BE-->>App: Payment QR
            Pay-->>BE: Payment callback
            BE->>BE: Validate callback + update payment record
            BE->>FS: Sync paid status
            alt FS sync failed
                FS-->>BE: Sync error
                BE->>BE: Queue reconciliation
                BE-->>App: Payment pending FS sync
            else FS sync successful
                FS-->>BE: Ticket/exit status updated
                BE-->>App: Payment completed
            end
        end
    end
```

Owner: Simon  
Input files: `PARQ_User_Flow_Integration_Architecture.md`, `PARQ_Data_API_Context_Boundary_Vendor_Matrix.md`, `PARQ_Technical_Dependency_Control_Pack.md`  
Output path: `03_Architecture/PARQ_Visual_Architecture_and_Flow_Pack.md`  
Status: Draft / priority sequence baseline  
Downstream consumer: Quinn, PARQ  
Open questions:
- What is the idempotency key for payment initiation and callback?
- What is the reconciliation schedule and refund support flow?

### 5.5 Visitor Pass Management

```mermaid
sequenceDiagram
    autonumber
    participant Host as Host User
    participant App as Mobile App
    participant IAM as IAM
    participant BE as OBK Backend
    participant FS as FS/Iviva
    participant HW as Turnstile/Elevator
    participant CMS as CMS

    Host->>App: Manage visitor pass
    App->>IAM: Validate host Account ID + persona
    IAM-->>App: Host context
    App->>BE: Create/delete/reactivate visitor pass
    BE->>BE: Persist visitor pass record
    BE->>FS: Register/update visitor
    alt FS registration failed
        FS-->>BE: Error
        BE-->>App: Visitor pass pending/failed
    else FS registration successful
        FS-->>BE: Access validity window
        BE->>BE: Generate visitor QR
        BE-->>App: Visitor pass + QR
        CMS-.->BE: Optional visibility
        HW->>FS: Validate QR online
        FS-->>HW: Permit or deny
    end
```

Owner: Simon  
Input files: `PARQ_User_Flow_Integration_Architecture.md`, `PARQ_Data_API_Context_Boundary_Vendor_Matrix.md`, `PARQ_Technical_Dependency_Control_Pack.md`  
Output path: `03_Architecture/PARQ_Visual_Architecture_and_Flow_Pack.md`  
Status: Draft / priority sequence baseline  
Downstream consumer: Quinn, PARQ  
Open questions:
- Which visitor PII fields are collected and retained?
- Is visitor QR single-use or reusable within the validity window?
- What CMS visitor pass operations are in Phase 1 support scope?

### 5.6 Elevator Call

```mermaid
sequenceDiagram
    autonumber
    participant U as User
    participant App as Mobile App
    participant IAM as IAM
    participant BE as OBK Backend
    participant FS as FS/Iviva
    participant Lift as Elevator

    U->>App: Request elevator
    App->>IAM: Validate session + persona + tower
    IAM-->>App: Identity context
    App->>BE: Submit elevator request
    BE->>FS: Validate floor/tower and call elevator
    alt Unauthorized
        FS-->>BE: Denied
        BE-->>App: Access denied
    else Authorized
        FS->>Lift: Execute elevator command
        alt Timeout or hardware error
            Lift--xFS: No response / error
            FS-->>BE: Command failed
            BE-->>App: Elevator unavailable
        else Command accepted
            Lift-->>FS: Assignment/status
            FS-->>BE: Success/status
            BE-->>App: Elevator status
        end
    end
```

Owner: Simon  
Input files: `PARQ_User_Flow_Integration_Architecture.md`, `PARQ_Technical_Dependency_Control_Pack.md`  
Output path: `03_Architecture/PARQ_Visual_Architecture_and_Flow_Pack.md`  
Status: Draft / priority sequence baseline  
Downstream consumer: Quinn, PARQ  
Open questions:
- What is the elevator timeout and retry policy?
- What is site fallback if FS/elevator is unavailable?
- Who owns tower/floor mapping for hardware validation?

### 5.7 Turnstile Access

```mermaid
sequenceDiagram
    autonumber
    participant U as User
    participant App as Mobile App
    participant IAM as IAM
    participant BE as OBK Backend
    participant FS as FS/Iviva
    participant Gate as Turnstile

    U->>App: Open My QR
    App->>IAM: Validate Account ID + persona
    IAM-->>App: Identity context
    App->>BE: Request QR
    BE->>FS: Confirm current access scope
    alt Not authorized
        FS-->>BE: Access not permitted
        BE-->>App: QR unavailable
    else Authorized
        FS-->>BE: Validity scope
        BE->>BE: Generate QR
        BE-->>App: QR
        U->>Gate: Present QR
        Gate->>FS: Validate QR online
        alt FS unavailable
            FS--xGate: Timeout
            Gate-->>U: Apply outage policy
        else Access denied
            FS-->>Gate: Deny
            Gate-->>U: Deny access
            FS->>FS: Record denied audit
        else Access approved
            FS-->>Gate: Approve
            Gate-->>U: Open gate
            FS->>FS: Record approved audit
        end
    end
```

Owner: Simon  
Input files: `PARQ_User_Flow_Integration_Architecture.md`, `PARQ_Technical_Dependency_Control_Pack.md`  
Output path: `03_Architecture/PARQ_Visual_Architecture_and_Flow_Pack.md`  
Status: Draft / priority sequence baseline  
Downstream consumer: Quinn, PARQ  
Open questions:
- What is turnstile outage policy when FS online validation is unavailable?
- What is audit retention owner for approve/deny events?
- Is QR token single-use or reusable within validity window?

### 5.8 Account Deletion and Cleanup

```mermaid
sequenceDiagram
    autonumber
    participant U as User
    participant App as Mobile App
    participant IAM as IAM
    participant SSO as SSO
    participant FS as FS/Iviva
    participant BZB as BZB
    participant Kafka as Kafka/Event Bus
    participant Notify as Notification
    participant BMS as BMS

    U->>App: Request account deletion
    App->>IAM: Submit delete request
    IAM->>SSO: Update authentication/account state
    IAM->>FS: Sync entitlement/account status
    IAM->>BZB: Sync retail linkage/status if applicable
    IAM->>IAM: Apply soft/hard delete state
    alt Permanent delete reached
        IAM->>Kafka: Publish ob-iam.account.permanent-deleted
        Kafka->>Notify: Cleanup tokens/inbox data
        Kafka->>BMS: Cleanup downstream data
        alt Consumer failure
            Notify--xKafka: Failure or no confirmation
            BMS--xKafka: Failure or no confirmation
            Kafka->>Kafka: Retry / dead-letter behavior open
        else Cleanup consumed
            Notify-->>Kafka: Cleanup result
            BMS-->>Kafka: Cleanup result
        end
    else Soft delete period
        IAM-->>App: Account deletion state
    end
```

Owner: Simon  
Input files: `PARQ_User_Flow_Integration_Architecture.md`, `PARQ_Data_API_Context_Boundary_Vendor_Matrix.md`, `PARQ_Technical_Dependency_Control_Pack.md`  
Output path: `03_Architecture/PARQ_Visual_Architecture_and_Flow_Pack.md`  
Status: Draft / priority sequence baseline  
Downstream consumer: Quinn, PARQ, Libra  
Open questions:
- Who owns the deletion orchestration order and retry policy?
- What is the Kafka topic schema, dead-letter behavior, and replay control?
- Which FS, BZB, Notification, and BMS records are deleted or retained?

## Visual Risk Summary

```mermaid
flowchart LR
    R1["Missing named owners"] --> Impact["Dependency tracking risk"]
    R2["Missing API error catalogs"] --> Impact2["Inconsistent fallback/support"]
    R3["Missing environments"] --> Impact3["SIT/UAT/PVT planning blocker"]
    R4["FS online dependency"] --> Impact4["Physical access outage risk"]
    R5["PII/consent gaps"] --> Impact5["Compliance risk"]
    R6["Payment reconciliation open"] --> Impact6["Paid-but-unsynced parking risk"]
    R7["CMS seed account risk"] --> Impact7["Data isolation risk"]
    R8["Missing proposal source"] --> Impact8["Traceability risk"]
```

Owner: Simon  
Input files: `PARQ_Technical_Dependency_Control_Pack.md`, `MASTER_INDEX.md`, `PARQ_Clarification_Decision_Log.md`  
Output path: `03_Architecture/PARQ_Visual_Architecture_and_Flow_Pack.md`  
Status: Draft / risk visualization baseline  
Downstream consumer: Quinn, PARQ, Libra  
Open questions:
- Confirm named owners, API contracts, SLAs, environments, test data, hardware readiness, PII/consent mapping, and operational runbooks.
