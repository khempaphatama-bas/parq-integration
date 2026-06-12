# PARQ Drive IAM / SSO Source Impact Assessment

Owner: Simon / Senior Solution Architect

Input files:
- `AGENTS.md`
- `MASTER_INDEX.md`
- `TASK_BOARD.md`
- `HANDOFF_LOG.md`
- `01_Source_of_Truth/Clarifications/PARQ_Clarification_Decision_Log.md`
- `PARQ-SOT-006`: Bas Google Drive IAM / SSO technical markdown source folder
- `01_Source_of_Truth/API_and_System_References/00_2025_Document/api-members-by-account-id.md`
- `01_Source_of_Truth/API_and_System_References/00_2025_Document/add_identity_flow.md`
- `03_Architecture/PARQ_User_Flow_Integration_Architecture.md`
- `03_Architecture/PARQ_Data_API_Context_Boundary_Vendor_Matrix.md`
- `03_Architecture/PARQ_Technical_Dependency_Control_Pack.md`
- `03_Architecture/PARQ_Visual_Architecture_and_Flow_Pack.md`
- `03_Architecture/PARQ_BMS_Identity_Flow_Impact_Assessment.md`
- `03_Architecture/PARQ_Architecture_Readiness_Reassessment_After_Owner_Confirmation.md`
- `03_Architecture/PARQ_Architecture_Impact_Assessment_From_Molly_UX_Update.md`
- `03_Architecture/PARQ_Architecture_Dependency_Addendum_After_Bas_Confirmations.md`

Output file path: `03_Architecture/PARQ_Drive_IAM_SSO_Source_Impact_Assessment.md`

Status: Draft / SIM-008 complete with open confirmations

Dependencies:
- Bas approval is still required to confirm whether `PARQ-SOT-006` is an approved source of truth or technical reference only.
- Repository evidence remains the source of truth until Drive approval/source-precedence is confirmed.
- Existing approved architecture artifacts are not rewritten by this assessment.

Downstream consumer:
- Developer technical reviewers
- Quinn / QA Lead
- Molly / Assistant Product Owner
- Libra / Project Librarian
- PARQ Orchestrator

## Assessment Summary

The Drive IAM / SSO source set materially affects future Technical Design Document (TDD) alignment, IAM/SSO API inventory, account lifecycle sequences, Kafka/event ownership, persona/profile dependency mapping, and developer technical review readiness.

The Drive files add concrete source/reference detail for sign-in, identity validation, profile enrichment, add identity, default identity, social link/unlink, SSO sync, soft delete, reactivation, permanent delete, invitation-code registration, and Kafka events.

The new source does not finalize PARQ-specific implementation. It also reopens several decisions that must not be silently resolved:
- Drive `add_identity_flow.md` overlaps the repository `add_identity_flow.md`.
- BMS member lookup is inconsistent across sources: `GET /members/by-account-id` versus `GET /members` / `members.index` and `checkMember` / `getMember`.
- Lifecycle wording differs between Day 31 / over 30 days and implementation rule `now - 1 month`.
- Kafka retry, dead-letter, replay, and audit controls are not fully specified.

Developer review can continue for architecture and dependency alignment, but implementation finalization must wait for the open confirmations listed in this artifact.

## Confirmed Source Facts From Drive Intake

| Source group | Confirmed source/reference facts | Architecture impact |
|---|---|---|
| Sign-in / SSO | Email/phone sign-in uses `GET /identity/validate` and `POST /auth/login`; SSO middleware/interceptor may call SSO identity existence and OAuth token APIs; soft-deleted accounts can branch to reactivation. | UF-001 sign-in sequence needs a technical addendum for SSO middleware, app-version/SSO gating, token/cache handling, 2FA/OTP branch, and reactivation handoff. |
| Identity / Profile | Drive files cover `POST /identity`, `PUT /identity/{id}/default`, `GET /me/profile`, `GET /external_identity/me`, `GET /bzb/user/card`, social link, and social unlink. | Persona resolution is more dependent on IAM profile, SSO enrichment, external identities, BMS member lookup, and BZB card data than the current high-level architecture shows. |
| Account Lifecycle | Drive files cover `DELETE /me/account`, `PUT /auth/reactivate`, scheduled permanent delete, and SSO admin delete. | UF-004 lifecycle architecture must distinguish soft delete, SSO suspension, reactivation, permanent delete, and downstream cleanup consumers. |
| Invitation / Registration | Drive files cover invitation-code registration and invitation-code generation. | Invitation registration should be included in future TDD/API inventory if PARQ Phase 1 uses invitation/service-code onboarding. Scope confirmation remains open. |
| Kafka / Event Integration | Drive files confirm soft delete event `ob-iam.account.deleted`, permanent delete event `ob-iam.account.permanent-deleted`, default identity events, and related IAM event publication behavior. | Event ownership, payload, consumer responsibility, idempotency, retry, and audit controls need explicit architecture treatment before developer sign-off. |

## TDD Impact

The future Technical Design Document should include the following sections because they are materially affected by `PARQ-SOT-006`.

| TDD section | Impact from Drive source | Status |
|---|---|---|
| SSO-enabled sign-in | Include email/phone/password/OTP/social sign-in, identity validation, SSO middleware/interceptor, token creation, deleted-account handling, and app response handling. | Ready for technical review with Drive approval open. |
| SSO sync on app launch | Include `POST /me/account/sync/sso`, SSO profile sync, cache invalidation, service-error behavior, and whether app proceeds on `synced:false`. | Needs fallback confirmation. |
| Identity and profile | Include add identity, default identity, social link/unlink, SSO profile enrichment, external identity retrieval, BMS lookup, and BZB card dependency. | Ready for technical review with BMS path conflict open. |
| Persona resolution | Include Workplace persona dependency on `fs` external identity and metadata, Retail dependency on BZB external identity/card, and Resident dependency where applicable. | Ready for architecture review; fallback rules remain open. |
| Account lifecycle | Include soft delete, SSO suspension, reactivation, permanent delete, SSO admin delete, Notification/BMS cleanup, and lifecycle timing wording. | Needs Day 31 versus `now - 1 month` decision. |
| Kafka / event integration | Include producer, consumer, payload, idempotency, retry/DLQ/replay, audit, and reconciliation expectations for account and identity events. | Partially ready; event runtime controls remain open. |
| Cache registry | Include profile cache, token cache, external identity cache, BZB card/token cache, SSO profile cache, and OTP reference cache. | Ready for registry draft; TTL/source of value details remain open where not in source. |
| Environment variable registry | Include IAM/SSO/BMS/BZB/Kafka/Redis/device/token flags from Drive source files. | Ready for registry draft; environment-specific values remain open. |
| Invitation / registration | Include invitation-code registration and generation APIs only if PARQ Phase 1 scope confirms usage. | Scope confirmation needed. |

### APIs to Include in TDD/API Inventory

| API / endpoint | Provider / owner | Source impact | Status |
|---|---|---|---|
| `GET /identity/validate` | IAM / SSO integration | Used by sign-in, registration, add identity, and account management. | Confirmed source/reference. |
| `POST /auth/login` | IAM / SSO integration | Main email/phone/password/OTP/social login entrypoint. | Confirmed source/reference. |
| `POST /auth/register` | IAM / SSO integration | Invitation-code registration flow. | Confirmed source/reference; PARQ scope open. |
| `POST /identity` | IAM / SSO / BMS | Add identity; may trigger BMS member check and `fs` external identity creation. | Confirmed source/reference; source precedence open. |
| `PUT /identity/{id}/default` | IAM / SSO / BZB | Sets default identity; emits default identity events; may update BZB external identity metadata. | Confirmed source/reference. |
| `GET /me/profile` | IAM / SSO | Profile retrieval with possible SSO enrichment. | Confirmed source/reference. |
| `GET /external_identity/me` | IAM | Persona card dependency for external identities. | Confirmed source/reference. |
| `GET /bzb/user/card` | IAM / BZB | Retail persona card dependency. | Confirmed source/reference. |
| `POST /social/link` | IAM / SSO | Social external identity link. | Confirmed source/reference. |
| `POST /social/unlink` | IAM / SSO | Social external identity unlink. | Confirmed source/reference. |
| `POST /me/account/sync/sso` | IAM / SSO | App-open SSO reconciliation and profile synchronization. | Confirmed source/reference; fallback open. |
| `DELETE /me/account` | IAM | Soft delete/deactivation, cache clear, soft-delete event publication. | Confirmed source/reference. |
| `PUT /auth/reactivate` | IAM | Reactivation, token return, reactivation event publication. | Confirmed source/reference. |
| `POST /task/delete_deactivate_account` | IAM scheduled task | Permanent delete job for previously deleted accounts. | Confirmed source/reference; schedule/timing wording open. |
| `DELETE /accounts/admin/{id}/delete` | IAM admin | Admin-initiated delete path referenced by Drive permanent delete source. | Confirmed source/reference. |
| `DELETE /admin/accounts/delete-all` | SSO admin | SSO permanent account delete call from IAM permanent-delete flow. | Confirmed source/reference. |
| `POST /generate-code/invitation-codes` | IAM / admin | Invitation code generation. | Confirmed source/reference; PARQ scope open. |
| SSO `/user/exists` | SSO | Identity existence check in sign-in flow. | Confirmed source/reference; exact contract not finalized here. |
| SSO `/oauth/token` | SSO | Password/OTP/social token exchange. | Confirmed source/reference; exact contract not finalized here. |
| SSO `/user/sync` | SSO | SSO profile/account sync. | Confirmed source/reference. |
| SSO `/user/profile/{publicId}` | SSO | Profile enrichment. | Confirmed source/reference. |
| SSO `/user/{ssoId}/identity` | SSO | SSO identity creation during add identity. | Confirmed source/reference. |
| SSO `/user/{ssoId}/external-identity` | SSO | Social link/unlink external identity handling. | Confirmed source/reference. |
| BMS member lookup | ob-bms service | Sources conflict between `GET /members/by-account-id`, `GET /members` / `members.index`, and `checkMember` / `getMember`. | Open conflict; do not finalize. |

### Events to Include in TDD/Event Inventory

| Event | Producer | Consumer / downstream system | Payload confirmed from source | Architecture implication |
|---|---|---|---|---|
| `ob-iam.account.deleted` | IAM | SSO | `{ account_id }` | Soft delete should suspend the linked SSO account. Kafka send is non-blocking from IAM perspective; retry/audit behavior depends on event runtime and remains open. |
| `ob-iam.account.permanent-deleted` | IAM | Notification, BMS | `{ account_ids }` | Permanent cleanup consumers must be idempotent and tolerate already-deleted records. IAM does not wait for downstream consumers. |
| `ob-iam.account.reactivated` | IAM | Consumer not fully confirmed | `{ account_id }` | Reactivation event exists in source; consumer responsibility and audit expectation remain open. |
| `ob-iam.identity.email_default_set` | IAM | SSO, then BZB webhook impact | `account_id` and identity object | Default email updates must propagate to SSO and BZB-related metadata. Retry/manual intervention remains open. |
| `ob-iam.identity.phone_default_set` | IAM | SSO, then BZB webhook impact | `account_id` and identity object | Default phone updates must propagate to SSO and BZB-related metadata. Retry/manual intervention remains open. |
| `ob-iam.external_identity.created` | IAM | Consumer not fully confirmed | Not finalized in this assessment. | Add identity / BMS-created `fs` external identity can affect Workplace persona activation. Consumer ownership remains open. |
| `ob-iam.account.upsert_recipient` | IAM | Notification-related consumer not fully confirmed | Not finalized in this assessment. | May affect notification recipient synchronization during SSO sync; exact consumer/payload remains open. |
| `ob-iam.fcm_token.updated` | IAM | Notification infrastructure | Not finalized in this assessment. | Login device/push token update should be included in event dependency review. |
| `ob-iam.on-event.login_tcct` | IAM | TCCT / event consumer not fully confirmed | Not finalized in this assessment. | Source references optional login event behavior; scope/consumer remains open. |

### Cache Keys / Cache Families to Include

| Cache / key family | Source impact | Open item |
|---|---|---|
| `IAM_TOKEN_{accountId}_ACCESS` | IAM access token cache. | TTL per environment remains open unless source value is confirmed. |
| `IAM_TOKEN_{accountId}_ACCESS_JWT` | IAM JWT access cache. | TTL per environment remains open unless source value is confirmed. |
| `IAM_TOKEN_{accountId}_REFRESH` | IAM refresh token cache. | TTL per environment remains open unless source value is confirmed. |
| `CACHE_PROFILE_{accountId}` | Profile cache cleared by lifecycle/profile-sync operations. | Refresh/fallback rule for stale profile remains open. |
| External identity cache family | Add/default/social identity flows clear external identity caches. | Exact invalidation coverage should be reviewed by IAM. |
| `BZB_USER_CARD_{accountId}` | Retail persona card cache. | Stale-card fallback and TTL must be confirmed. |
| BZB token cache families | BZB card/API dependency. | Token TTL/error handling remains vendor/API detail. |
| `sso_profile_:{publicId}` | SSO profile sync comparison cache source/reference. | Source notes cache write may be inactive; confirm actual runtime behavior. |
| OTP reference cache | OTP sign-in and 2FA. | OTP expiry/user messaging should be validated against IAM source. |
| `CNX_ACCESS_TOKEN` | ConnectX integration dependency in identity-related flows. | PARQ relevance remains open unless this integration is in Phase 1 execution path. |

### Environment Variables to Include

The future TDD environment registry should include, at minimum, the following source-referenced groups. This assessment does not assign values by environment.

| Env group | Source-referenced examples | Open item |
|---|---|---|
| SSO enablement and version gating | `ENABLE_SSO`, `MIN_APP_VERSION` | Confirm environment values and release gating. |
| SSO client/API | `OB_SSO_URL`, `OB_SSO_CLIENT_ID`, `OB_SSO_CLIENT_SECRET` | Confirm owner and SIT/UAT/PVT endpoints. |
| IAM token/JWT | `JWT_SECRET_KEY`, `JWT_ISSUER`, SSO/IAM token TTL variables | Confirm values and rotation ownership. |
| Redis/cache | `CACHE_REDIS`, `CACHE_REDIS_URL` | Confirm environment readiness and cache isolation. |
| Device handling | `ENABLE_DEVICE_STORING`, device token expiry variables | Confirm Phase 1 usage and notification dependency. |
| Kafka/event bus | `KAFKA_URL`, `OB_EVENT_CONFIG_PATH` | Confirm topics, retry, DLQ, replay, and audit controls. |
| BMS | `OB_BMS_URL` | Confirm exact API path, timeout, retry, and fallback controls. |
| BZB | BZB API URL/auth/client/subscription/cache variables | Confirm vendor environment readiness and owner contacts. |
| ConnectX | ConnectX API/token variables | Confirm whether any PARQ Phase 1 flow requires this path. |

## Account Lifecycle Impact

| Lifecycle stage | Source behavior | Architecture implication | Open issue |
|---|---|---|---|
| Soft delete / account deactivation | `DELETE /me/account` sets `deleted_at`, clears profile cache, and publishes `ob-iam.account.deleted`. | User account is not physically removed at this stage; SSO should suspend linked SSO account through event consumption. | Exact user-facing status wording remains open: `Suspens`, `Suspended`, deactivated, or deleted. |
| Reactivation | `PUT /auth/reactivate` clears `deleted_at`, returns tokens, and publishes `ob-iam.account.reactivated`. | Reactivation must be modeled as a separate lifecycle path from normal login. | Consumer responsibility and reactivation support copy remain open. |
| Permanent delete | Scheduled task selects accounts by `deleted_at <= now - 1 month`, deletes IAM records, calls SSO delete when linked, then emits `ob-iam.account.permanent-deleted`. | Permanent delete is the point where BMS and Notification cleanup are expected to consume account cleanup events. | Product wording says Day 31 / over 30 days; implementation wording says `now - 1 month`. Decision required. |
| SSO cleanup | SSO soft suspend happens from `ob-iam.account.deleted`; SSO hard delete happens through admin delete API during permanent delete. | Soft delete and permanent delete must not be collapsed in sequence diagrams or QA readiness planning. | SSO rollback behavior and audit proof are not finalized. |
| Notification/BMS cleanup | Permanent-delete event lists IAM account IDs for downstream cleanup. | Consumers must treat `account_ids` as IAM account IDs and be idempotent. | Retry, DLQ, replay, and reconciliation reports are open. |

### Lifecycle Wording Conflict

Concern: Product and UX artifacts refer to "over 30 days" / Day 31 behavior, while the Drive technical source references `now - 1 month`.

Impact:
- Calendar-month behavior and 30-full-day behavior can differ.
- Reactivation eligibility, support copy, and account-not-found behavior may be inconsistent.
- Quinn can track this as readiness input, but cannot finalize expected lifecycle timing until resolved.

Recommendation:
- Product/IAM should decide one canonical wording and one implementation rule.
- Architecture should keep both references visible until the decision is recorded.

## BMS Path Conflict

Current repository evidence and recent Bas confirmations previously pointed to BMS `GET /members/by-account-id` as the login/member lookup path.

The Drive source intake reopens this because:
- Drive `add_identity_flow.md` references BMS `checkMember` / `getMember` behavior for identity-based member checks.
- Libra intake flagged `GET /members` / `members.index`.
- The repository BMS API reference documents `GET /members/by-account-id`.

Assessment:
- These may be different BMS use cases rather than one endpoint:
  - Login-time refresh may need account-based lookup.
  - Add identity/default identity may need identifier-based member lookup.
  - BMS service may expose both indexed lookup and account-based lookup.
- Simon must not collapse these into one final API without IAM/ob-bms confirmation.

Open decision:
- Which exact BMS endpoint, request fields, headers, response fields, timeout, retry, and non-blocking fallback apply to:
  - Login-time BMS refresh.
  - Add identity member check.
  - Default identity member check.
  - Account deletion cleanup or lookup, if any.

## Identity And Persona Impact

| Area | Impact | PARQ relevance | Open issue |
|---|---|---|---|
| PARQ login | Login is IAM/SSO led, with optional non-blocking BMS refresh still planned from previous Bas decision. | Existing PARQ Workplace users should be able to enter the app and retain detectable previous Workplace permission if BMS is unavailable. | Exact BMS path, timeout, cache/source for previous Workplace permission, and audit marker remain open. |
| Workplace persona | Source confirms persona depends on external identity type `fs` with metadata, and BMS check can create `fs` external identity in identity flows. | PARQ Workplace access depends on correct external identity creation/sync and FS authorization downstream. | Mapping from BMS/default floor/tower to FS-authorized workplace context remains open. |
| Default identity | Default identity update can emit Kafka events consumed by SSO and can update BZB-related metadata. | Retail/account matching and profile correctness may depend on default email/phone propagation. | BZB webhook payload/retry and conflict handling remain open. |
| Profile/persona card | `GET /me/profile`, `GET /external_identity/me`, and `GET /bzb/user/card` are key dependencies. | Persona card rendering and quick-access surfaces depend on IAM profile, external identities, and BZB card response. | Fallback behavior if SSO enrichment or external identity retrieval fails remains open. |
| SSO sync | `POST /me/account/sync/sso` can reconcile account/profile/external identity data. | App-open sync may affect migrated PARQ user profile and persona freshness. | Whether app proceeds on `synced:false` and what user-facing fallback applies remains open. |
| Social link/unlink | Social identities are linked/unlinked through SSO and then local external identity handling. | Not a primary Workplace entitlement path, but affects account identity completeness. | Support path and fallback if SSO succeeds/local update fails, or vice versa, need developer review. |

## Existing Sequence Diagram Sufficiency

| Existing diagram / flow area | Remains valid? | Needed addendum/update |
|---|---|---|
| UF-001 Existing PARQ User Sign-in | Conceptually valid. | Add SSO middleware/interceptor, app-version gating, identity validation, SSO OAuth, token/cache behavior, deleted-account reactivation handoff, and non-blocking BMS refresh conflict. |
| UF-002 Retail Account Matching / BZB conflict | Valid at high level. | Add default identity event path and BZB webhook impact where default email/phone affects BZB external identity metadata. |
| UF-003 Sign-up & User Onboarding | Valid at business level. | Add invitation-code registration if in scope, identity validation, SSO registration, BMS member check, and external identity creation path. |
| UF-004 Account Lifecycle | Needs stronger split. | Add soft delete, SSO suspend, reactivation, permanent delete job, SSO delete-all, Notification/BMS cleanup event, and Day 31 versus `now - 1 month` decision. |
| Persona card / profile rendering | Too high-level or missing as technical sequence. | Add `GET /me/profile`, SSO enrichment, `GET /external_identity/me`, BZB card lookup, and fallback behavior. |
| Add identity / default identity | Needs addendum. | Add `GET /identity/validate`, `POST /identity`, BMS check, external identity cache clear, `PUT /identity/{id}/default`, Kafka identity default events, and SSO/BZB propagation. |
| SSO sync on app launch | Needs addendum. | Add `POST /me/account/sync/sso`, SSO `/user/sync`, optional SSO profile read, cache clear, and `synced:false` behavior. |
| UF-012 Parking Payment & Ticket Sync | Still valid; no direct Drive change. | No IAM/SSO source-driven change, except account/profile/deletion state may affect payment access and support identity. |
| UF-013 Visitor Pass Management | Still valid; no direct Drive change. | No IAM/SSO source-driven change, except deleted/suspended/reactivated account state should be respected. |
| UF-015 Elevator Call | Still valid; no direct Drive change. | Persona/external identity prerequisite should be referenced, but FS remains final authorization owner. |
| UF-016 Turnstile Access | Still valid; no direct Drive change. | Persona/external identity prerequisite should be referenced, but FS remains final validation owner. |

## Developer Review Readiness

| Review area | Can review now | Cannot finalize implementation until |
|---|---|---|
| IAM/SSO sign-in | Review can proceed for `GET /identity/validate`, `POST /auth/login`, SSO middleware/interceptor, token/cache, 2FA, and reactivation handoff. | Drive source approval, SSO contract confirmation, environment values, and user-visible error mapping are confirmed. |
| Account lifecycle | Review can proceed for soft delete, reactivation, permanent delete, SSO suspend/delete, and event publication boundaries. | Day 31 versus `now - 1 month`, retry/DLQ/audit, rollback behavior, and exact status wording are confirmed. |
| BMS login and identity dependency | Review can proceed as a conflict analysis. | Exact endpoint/path, timeout, retry/circuit breaker, cache/source of previous Workplace permission, and support/audit path are confirmed. |
| Identity/persona/profile | Review can proceed for profile, external identity, BZB card, add/default identity, social link/unlink, and SSO sync impacts. | Fallback behavior for SSO/profile/external identity/BZB failure is confirmed. |
| Kafka/event integration | Review can proceed for confirmed event names and payload ownership boundaries. | Topic configuration, consumer ownership, retry, DLQ, replay, idempotency proof, and audit/reconciliation reporting are confirmed. |
| Parking, CMS, hardware | Existing review posture remains unchanged. | FS/Iviva values, The PARQ hardware contact/site test window, and CMS accepted-risk governance owner are confirmed. |

Go/no-go recommendation:
- Developer technical review: Go with blockers.
- Final implementation contract sign-off: No-go until the open conflicts and owner confirmations are resolved or formally accepted as implementation risks.
- Quinn readiness planning: Go for dependency register updates only; do not derive detailed QA/UAT scenarios from Drive source alone.

## Quinn Readiness Inputs

Quinn can use this assessment to update dependency-readiness registers for:
- IAM/SSO endpoints and environment variables.
- Soft delete, reactivation, and permanent delete dependencies.
- Kafka event names, producer/consumer expectations, and payload shape where confirmed.
- BMS endpoint conflict and timeout/fallback blockers.
- Cache invalidation dependencies for profile, token, external identity, and BZB card data.
- SSO sync `synced:false` / service-error fallback as an open item.
- Profile/persona fallback dependencies.
- Invitation-code registration/generation as scope-open dependencies.

This artifact intentionally does not create QA scenarios, UAT scenarios, or expected results.

## Molly Wording Inputs

Molly can use this assessment to review wording impacts only:
- Day 31 / over 30 days versus `now - 1 month`.
- `Suspens` versus suspended/deactivated/deleted wording.
- Reactivation eligibility wording before permanent delete.
- Support wording if BMS conflict or already-bound member condition appears.
- Persona-card fallback language when Retail/Workplace data is temporarily unavailable.

This artifact intentionally does not create requirements, user stories, or acceptance criteria.

## Conflicts And Open Questions

| ID | Open question / conflict | Owner needed | Impact |
|---|---|---|---|
| OQ-DRIVE-SOT-001 | Is `PARQ-SOT-006` approved source of truth, or technical reference only? | Bas / PARQ | Determines whether Drive details can become baseline TDD/API inventory. |
| OQ-DRIVE-SOT-002 | Which `add_identity_flow.md` is authoritative: repository copy or Drive copy? | Bas / PARQ / IAM owner | Prevents silent divergence in BMS/add identity behavior. |
| OQ-DRIVE-BMS-001 | Which BMS endpoint applies by use case: `GET /members/by-account-id`, `GET /members` / `members.index`, `checkMember`, or `getMember`? | IAM owner / ob-bms service | Blocks final API inventory and sequence contracts. |
| OQ-DRIVE-BMS-002 | What timeout, retry, circuit breaker, audit, and non-blocking fallback apply to BMS login refresh? | IAM owner / ob-bms service | Blocks final developer implementation and Quinn readiness detail. |
| OQ-DRIVE-LIFE-001 | Should lifecycle timing be described and implemented as Day 31 / over 30 days or `now - 1 month`? | Product / IAM owner | Blocks consistent UX wording, support wording, and lifecycle timing validation. |
| OQ-DRIVE-LIFE-002 | What is the exact technical status and user-facing wording for suspended/deactivated/deleted account states? | Product / IAM owner | Blocks final copy and support handling. |
| OQ-DRIVE-EVENT-001 | What Kafka topic names, partitions, retry, DLQ, replay, monitoring, and audit proof apply to each IAM event? | Kafka/Event Bus owner / IAM owner | Blocks event operational readiness. |
| OQ-DRIVE-EVENT-002 | Who consumes `ob-iam.account.reactivated`, `ob-iam.external_identity.created`, `ob-iam.account.upsert_recipient`, `ob-iam.fcm_token.updated`, and `ob-iam.on-event.login_tcct`? | IAM / Notification / TCCT / event owners | Blocks complete event dependency map. |
| OQ-DRIVE-ID-001 | What should the app/backend do if SSO enrichment, `GET /external_identity/me`, or BZB card lookup fails after login? | IAM / Mobile / BZB owner | Blocks persona fallback and support behavior. |
| OQ-DRIVE-INV-001 | Are invitation-code registration and invitation-code generation in PARQ Phase 1 execution scope? | Product / IAM owner | Determines whether these APIs enter PARQ TDD baseline. |
| OQ-DRIVE-ENV-001 | Which environment values are required in SIT/UAT/PVT for SSO, IAM, BMS, BZB, Redis, Kafka, and ConnectX references? | Environment owners TBD | Blocks environment readiness confirmation. |
| OQ-DRIVE-HW-001 | Who is the named The PARQ hardware/site contact and what is the site testing window? | PARQ / Site Operations / FS/Iviva | Existing hardware readiness blocker remains unchanged. |

## Technical Risks

| Risk | Impact | Recommended control |
|---|---|---|
| Drive source is used before approval/source precedence is confirmed. | Architecture and developer implementation may diverge from approved baseline. | Keep Drive as source/reference pending Bas approval; ask Libra/Bas to confirm source status and archival/versioning. |
| BMS endpoint conflict is treated as resolved by assumption. | Login refresh, add identity, and default identity may call the wrong BMS API or use wrong lookup key. | Split BMS use cases and obtain IAM/ob-bms confirmation for each path. |
| Lifecycle timing wording remains inconsistent. | Users/support/QA may expect Day 31 while implementation deletes by calendar-month arithmetic. | Product/IAM decision required before final lifecycle wording and implementation sign-off. |
| Kafka events lack operational controls. | Downstream SSO/BMS/Notification cleanup may fail silently or be hard to reconcile. | Define retry, DLQ, replay, idempotency, monitoring, and audit controls before final sign-off. |
| Profile/persona fallbacks are not explicit. | Workplace/Retail persona card may disappear or be stale during partial dependency failure. | Define fallback behavior for SSO profile, IAM external identity, BMS, and BZB failures. |
| Invitation-code APIs enter TDD without scope confirmation. | Extra implementation/testing scope may be implied. | Keep invitation code APIs marked source/reference pending PARQ Phase 1 scope confirmation. |

## Architecture Artifacts Needing Follow-up

| Artifact | Follow-up needed | Trigger |
|---|---|---|
| `PARQ_User_Flow_Integration_Architecture.md` | Addendum/update for IAM/SSO sign-in, account lifecycle, identity/default identity, profile/persona, and SSO sync sequences. | After Drive approval/source precedence and BMS path decision. |
| `PARQ_Data_API_Context_Boundary_Vendor_Matrix.md` | API inventory and data/event ownership update for IAM/SSO/SSO admin/BMS/BZB/Kafka. | After Drive approval and endpoint conflict confirmation. |
| `PARQ_Technical_Dependency_Control_Pack.md` | Add event controls, cache/env registry references, lifecycle cleanup dependencies, and BMS conflict controls. | After owner confirmations or as an explicit open-control addendum. |
| `PARQ_Visual_Architecture_and_Flow_Pack.md` | Add visual addendum for IAM/SSO login, lifecycle events, and persona/profile dependencies. | After diagram update approval. |
| `PARQ_BMS_Identity_Flow_Impact_Assessment.md` | Reconcile endpoint conflict and separate login/add identity/default identity BMS use cases. | After IAM/ob-bms confirmation. |
| `PARQ_Architecture_Dependency_Addendum_After_Bas_Confirmations.md` | Mark BMS path as reopened by Drive conflict if Bas confirms Drive source precedence. | After PARQ-SOT-006 approval/source-precedence decision. |

## Recommended Next Owner

| Next owner | Recommended action | Reason |
|---|---|---|
| PARQ / Bas | Confirm `PARQ-SOT-006` approval/source-of-truth status and whether Drive files should be copied/versioned into the repository. | Source precedence blocks final architecture and TDD baseline. |
| Libra | After Bas confirmation, index source status and versioning approach; link this assessment as `PARQ-ARCH-011`. | Keeps repository and portal traceability correct. |
| IAM / SSO owner | Confirm endpoint contracts, lifecycle timing implementation, status wording, SSO sync behavior, and event production behavior. | Needed for developer review closure. |
| ob-bms service owner | Confirm BMS endpoint by use case and timeout/fallback controls. | Blocks BMS login/add identity/default identity design. |
| Kafka/Event Bus owner | Confirm topic configuration, retry, DLQ, replay, monitoring, and audit controls. | Blocks event operational readiness. |
| Molly | Review lifecycle and support wording impacts only after source precedence and timing decision. | Prevents UX wording from diverging from technical behavior. |
| Quinn | Start dependency-register updates from this artifact, without creating QA/UAT scenarios yet. | Enables readiness planning while preserving unresolved blockers. |
| Developer technical reviewers | Continue review with blockers separated from implementable baseline. | Architecture review can proceed before final contract sign-off. |
