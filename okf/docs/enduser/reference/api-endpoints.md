---
type: "Document"
title: "api-endpoints.mdx"
description: "description: \"Complete REST API reference for the Hoox gateway, webhooks, health checks, AI chat streams, and edge error models.\"."
resource: "docs/enduser/reference/api-endpoints.mdx"
tags: [doc, docs, enduser, reference]
status: stable
generated:
  by: process:axis-okf/1
  at: 2026-09-24T03:53:55Z
sources:
  - id: tree
    resource: "docs/enduser/reference/api-endpoints.mdx"
    title: "docs/enduser/reference/api-endpoints.mdx"
    author: process:git
okf_lock: generated
---

# Source

Repo path `docs/enduser/reference/api-endpoints.mdx`.

# Outline

* 🔒 Request Headers & Security Policy
  * CORS & Origin Policies
* 🎯 1. Ingest Trade Signal Webhook
  * Request Payload (JSON Schema)
  * Response Models
* 🟢 2. System Health Check
  * Success Response (200 OK)
* 🤖 3. Conversational AI Chat & Telemetry
  * A. Conversational Chat Stream
  * B. AI Gateway Telemetry
* 🚨 4. Standard Platform Error Models
  * A. 400 Bad Request (Payload Validation Failure)
  * B. 401 Unauthorized (Invalid API Key / IP Address)
  * C. 409 Conflict (Duplicate Request Intercepted)
  * D. 503 Service Unavailable (Kill Switch Engaged)
  * 🔗 Next Steps
