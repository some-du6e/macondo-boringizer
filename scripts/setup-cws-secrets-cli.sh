#!/usr/bin/env bash
set -euo pipefail

# CLI helper to generate CHROME_REFRESH_TOKEN and set all CWS secrets in GitHub.
# Prereqs: gh, curl, python3, and a Google OAuth client (Web app) configured with
# redirect URI: https://developers.google.com/oauthplayground

need() {
  command -v "$1" >/dev/null 2>&1 || { echo "Missing required command: $1"; exit 1; }
}

need gh
need curl
need python3

urlencode() {
  python3 - "$1" <<'PY'
import sys, urllib.parse
print(urllib.parse.quote(sys.argv[1], safe=''))
PY
}

echo "Chrome Web Store GitHub secrets setup"
echo ""
read -r -p "Extension ID (32 chars): " EXTENSION_ID || { echo "Input canceled while reading Extension ID."; exit 1; }
read -r -p "OAuth Client ID: " CLIENT_ID || { echo "Input canceled while reading OAuth Client ID."; exit 1; }
read -r -s -p "OAuth Client Secret: " CLIENT_SECRET || { echo "Input canceled while reading OAuth Client Secret."; exit 1; }
echo ""

if [[ -z "${EXTENSION_ID}" ]]; then
  echo "Extension ID cannot be empty."
  exit 1
fi

if [[ ${#EXTENSION_ID} -ne 32 ]]; then
  echo "Extension ID should be 32 characters (got ${#EXTENSION_ID})."
  exit 1
fi

if [[ -z "${CLIENT_ID}" ]]; then
  echo "OAuth Client ID cannot be empty."
  exit 1
fi

if [[ -z "${CLIENT_SECRET}" ]]; then
  echo "OAuth Client Secret cannot be empty."
  exit 1
fi

SCOPE="https://www.googleapis.com/auth/chromewebstore"
REDIRECT_URI="https://developers.google.com/oauthplayground"
AUTH_URL="https://accounts.google.com/o/oauth2/v2/auth?client_id=$(urlencode "$CLIENT_ID")&redirect_uri=$(urlencode "$REDIRECT_URI")&response_type=code&scope=$(urlencode "$SCOPE")&access_type=offline&prompt=consent"

echo ""
echo "Open this URL in your browser, allow access, and copy the 'code' value from the redirected URL:"
echo "$AUTH_URL"
echo ""
read -r -p "Paste authorization code (or full redirected URL): " AUTH_CODE || { echo "Input canceled while reading authorization code."; exit 1; }

# Accept either raw code or a full callback URL that contains ?code=...
if [[ "$AUTH_CODE" == *"code="* ]]; then
  AUTH_CODE="$(python3 - <<'PY' "$AUTH_CODE"
import sys
from urllib.parse import urlparse, parse_qs, unquote

value = sys.argv[1]
parsed = urlparse(value)
code = parse_qs(parsed.query).get("code", [""])[0]
print(unquote(code))
PY
)"
fi

if [[ -z "${AUTH_CODE}" ]]; then
  echo "Authorization code cannot be empty."
  exit 1
fi

TOKEN_JSON="$(curl -sS -X POST https://oauth2.googleapis.com/token \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  --data-urlencode "code=${AUTH_CODE}" \
  --data-urlencode "client_id=${CLIENT_ID}" \
  --data-urlencode "client_secret=${CLIENT_SECRET}" \
  --data-urlencode "redirect_uri=${REDIRECT_URI}" \
  --data-urlencode "grant_type=authorization_code")"

REFRESH_TOKEN="$(python3 - <<'PY' "$TOKEN_JSON"
import json, sys
obj = json.loads(sys.argv[1])
print(obj.get("refresh_token", ""))
PY
)"

if [[ -z "$REFRESH_TOKEN" ]]; then
  ERR_MSG="$(python3 - <<'PY' "$TOKEN_JSON"
import json, sys
try:
    obj = json.loads(sys.argv[1])
except Exception:
    print("")
    raise SystemExit(0)
parts = [obj.get("error", ""), obj.get("error_description", "")]
print(" | ".join([p for p in parts if p]))
PY
)"
  echo "Failed to get refresh token. Raw response:"
  echo "$TOKEN_JSON"
  if [[ -n "$ERR_MSG" ]]; then
    echo "Parsed error: $ERR_MSG"
  fi
  exit 1
fi

echo ""
echo "Setting GitHub repository secrets..."
gh secret set CHROME_EXTENSION_ID -b "$EXTENSION_ID"
gh secret set CHROME_CLIENT_ID -b "$CLIENT_ID"
gh secret set CHROME_CLIENT_SECRET -b "$CLIENT_SECRET"
gh secret set CHROME_REFRESH_TOKEN -b "$REFRESH_TOKEN"

echo ""
echo "Done. Current CHROME_* secrets:"
gh secret list | awk '{print $1}' | grep '^CHROME_' || true
