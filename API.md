# Macondo API Notes

Documented by an AI agent for Macondo Boringizer+.

These notes are based on Macondo's live frontend bundle and direct endpoint
probes against `https://macondo.hackclub.com` on 2026-06-21.


## human made tldr
get `https://macondo.hackclub.com/api/projects/` to see all ur projects
get `https://macondo.hackclub.com/api/projects/ID` to see a certain project



## Get Project Info By ID

Macondo has a public project-detail endpoint:

```http
GET https://macondo.hackclub.com/api/projects/{id}
```

Use this for the boringizer's core lookup:

```js
async function getProjectInfo(id) {
  if (id === undefined || id === null || String(id).trim() === "") {
    throw new Error("Project id is required")
  }

  const response = await fetch(`/api/projects/${encodeURIComponent(String(id).trim())}`, {
    credentials: "include",
    headers: {
      "Accept": "application/json"
    }
  })

  if (response.status === 404) {
    throw new Error("Project not found")
  }

  if (!response.ok) {
    throw new Error(`Project lookup failed: ${response.status}`)
  }

  const project = await response.json()

  return {
    id: String(project.id),
    name: project.name,
    level: project.level == null ? null : String(project.level),
    description: project.description
  }
}
```

## Response Shape

Example response from:

```http
GET /api/projects/1506
```

```json
{
  "id": 1506,
  "user_id": "1343744a-b794-4983-9570-758a7bd768e1",
  "name": "My Website",
  "type": "software",
  "description": "My personal website, built during the onboarding tutorial.",
  "fruit": "Mango",
  "level": "1",
  "stage": 1,
  "demo_url": null,
  "thumbnail_url": null,
  "repository_url": null,
  "owner": {
    "id": "1343744a-b794-4983-9570-758a7bd768e1",
    "image": null,
    "username": null,
    "slack_id": null
  },
  "viewer_is_owner": false,
  "viewer_can_edit": false
}
```

The endpoint returns more fields than the boringizer needs. For a stable project
info API, keep only:

| Field | Type | Notes |
| --- | --- | --- |
| `id` | `string` | Normalize Macondo's numeric `id` to a string in extension code. |
| `name` | `string` | Project name. |
| `level` | `string` or `null` | Macondo currently returns this as a string like `"1"`. |
| `description` | `string` | Project description. |

## Other Project Endpoints Found

The dashboard loads the signed-in user's projects with:

```http
GET /api/projects
```

That endpoint returned `401` without a logged-in session during probing, so use
it only when running inside a logged-in Macondo page.

The create-project modal posts to:

```http
POST /api/projects
Content-Type: application/json

{
  "name": "Project name",
  "description": "Project description",
  "type": "software",
  "level": 1
}
```

The project detail bundle also references:

```text
GET /api/projects/{id}/queue-position
GET /api/projects/{id}/og
GET /api/projects/{id}/hackatime-breakdown
GET /api/projects/{id}/readme-status
GET /api/projects/{id}/download
POST /api/projects/{id}/ship
GET /api/projects/{id}/journals
```

Those are out of scope for the basic `id -> project info` lookup.
