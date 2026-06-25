Here's the full setup, end to end.

## One-time setup

**1. Pick a location for the script.** A spot like `C:\Users\<you>\Scripts\` works well. Create the folder if it doesn't exist.

**2. Create the script file.** Open Notepad (or VS Code) and paste this in:

```powershell
# caffeinate.ps1 - keeps display + system awake until Ctrl+C
$sig = '[DllImport("kernel32.dll")] public static extern uint SetThreadExecutionState(uint esFlags);'
$ste = Add-Type -MemberDefinition $sig -Name Power -Namespace Win32 -PassThru

# ES_CONTINUOUS (0x80000000) | ES_SYSTEM_REQUIRED (0x01) | ES_DISPLAY_REQUIRED (0x02)
$ste::SetThreadExecutionState(0x80000003) | Out-Null
Write-Host "Caffeinated. Press Ctrl+C to release." -ForegroundColor Green

try {
    while ($true) { Start-Sleep -Seconds 60 }
}
finally {
    # ES_CONTINUOUS only = release the lock
    $ste::SetThreadExecutionState(0x80000000) | Out-Null
    Write-Host "Released." -ForegroundColor Yellow
}
```

Save as `caffeinate.ps1` (in Notepad, set "Save as type" to **All Files** so it doesn't become `.ps1.txt`).

**3. Allow local scripts to run.** Windows blocks unsigned `.ps1` files by default. Open PowerShell **as your user** (not admin) and run once:

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

`RemoteSigned` lets local scripts run while still blocking unsigned ones downloaded from the internet. Type `Y` to confirm.

## Running it

Open PowerShell and run:

```powershell
C:\Users\<you>\Scripts\caffeinate.ps1
```

You'll see "Caffeinated." Leave the window open. Hit **Ctrl+C** to release, or just close the window (the `finally` block runs on close too).

## Nice-to-haves

**Run from anywhere by name.** Add the scripts folder to your PATH (Settings → System → About → Advanced system settings → Environment Variables → edit `Path` for your user), then you can just type `caffeinate.ps1` from any prompt.

**One-click shortcut.** Right-click the desktop → New → Shortcut, and use this as the target:
```
powershell.exe -ExecutionPolicy Bypass -File "C:\Users\<you>\Scripts\caffeinate.ps1"
```
`-ExecutionPolicy Bypass` on the command line means you don't even need step 3 above for this shortcut to work.

**Timed version (like `caffeinate -t 3600`).** Swap the `while` loop for:
```powershell
Start-Sleep -Seconds 3600
```
or accept a parameter at the top:
```powershell
param([int]$Seconds = 0)
# ...
if ($Seconds -gt 0) { Start-Sleep -Seconds $Seconds }
else { while ($true) { Start-Sleep -Seconds 60 } }
```
Then `caffeinate.ps1 -Seconds 3600`.

**Verify it's working.** In another PowerShell window, run `powercfg /requests` — you should see your PowerShell process listed under DISPLAY and SYSTEM.
