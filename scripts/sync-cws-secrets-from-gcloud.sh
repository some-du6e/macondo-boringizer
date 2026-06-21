#!/usr/bin/env bash
set -euo pipefail

# Sync Chrome Web Store OAuth secrets from gcloud ADC into GitHub repo secrets.
# Usage:
#   ./scripts/sync-cws-secrets-from-gcloud.sh <extension_id>
# Example:
#   ./scripts/sync-cws-secrets-from-gcloud.sh kdndfafcpodecbbjhoicneekmbdhhckm

if [[ $# -lt 1 ]]; then
  echo "Usage: $0 <extension_id>"
  exit 1
fi

EXTENSION_ID="$1"
ADC_FILE="${HOME}/.config/gcloud/application_default_credentials.json"

if ! command -v gcloud >/dev/null 2>&1; then
  echo "gcloud is not installed."
  exit 1
fi

if ! command -v gh >/dev/null 2>&1; then
  echo "gh is not installed."
  exit 1
fi

if [[ ! -f "${ADC_FILE}" ]]; then
  echo "ADC file not found at ${ADC_FILE}."
  echo "Run this first:"
  echo "  gcloud auth application-default login --scopes=https://www.googleapis.com/auth/chromewebstore"
  exit 1
fi

# Parse the standard ADC JSON produced by gcloud.
readarray -t CWS_CREDS < <(python3 - <<'PY'
import json
from pathlib import Path

p = Path.home() / ".config/gcloud/application_default_credentials.json"
obj = json.loads(p.read_text())
print(obj.get("client_id", ""))
print(obj.get("client_secret", ""))
print(obj.get("refresh_token", ""))
PY
)

CLIENT_ID="${CWS_CREDS[0]:-}"
CLIENT_SECRET="${CWS_CREDS[1]:-}"
REFRESH_TOKEN="${CWS_CREDS[2]:-}"

if [[ -z "${CLIENT_ID}" || -z "${CLIENT_SECRET}" || -z "${REFRESH_TOKEN}" ]]; then
  echo "Could not read client_id/client_secret/refresh_token from ${ADC_FILE}."
  echo "Re-run: gcloud auth application-default login --scopes=https://www.googleapis.com/auth/chromewebstore"
  exit 1
fi

echo "Setting GitHub Actions repository secrets..."
gh secret set CHROME_EXTENSION_ID -b "${EXTENSION_ID}"
gh secret set CHROME_CLIENT_ID -b "${CLIENT_ID}"
gh secret set CHROME_CLIENT_SECRET -b "${CLIENT_SECRET}"
gh secret set CHROME_REFRESH_TOKEN -b "${REFRESH_TOKEN}"

echo "Done. Current secret names:"
gh secret list | awk '{print $1}' | grep '^CHROME_' || true
