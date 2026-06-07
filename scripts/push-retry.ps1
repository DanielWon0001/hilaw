$ErrorActionPreference = "Continue"
Set-Location "C:\Users\Administrator\.openclaw\workspace\hilaw"
for ($i = 1; $i -le 3; $i++) {
  Write-Host "=== Attempt $i ===" -ForegroundColor Cyan
  git push origin main 2>&1 | Out-String | Write-Host
  if ($LASTEXITCODE -eq 0) {
    Write-Host "=== PUSH OK ===" -ForegroundColor Green
    exit 0
  }
  if ($i -lt 3) {
    Write-Host "=== retry in 30s ===" -ForegroundColor Yellow
    Start-Sleep -Seconds 30
  }
}
Write-Host "=== ALL 3 ATTEMPTS FAILED ===" -ForegroundColor Red
exit 1
