# PowerShell script to replace dark theme classes

$webDir = "C:\Users\019182\projects\sifycopilot-0.6.11\web"

Get-ChildItem -Path $webDir -Recurse -Filter *.tsx | ForEach-Object {
    $filePath = $_.FullName
    $content = Get-Content $filePath -Raw

    # Add import statement if not already present
    if ($content -notmatch 'import\s+\{\s*getDarkThemeClasses\s*\}\s+from\s+[''"]@/app/theme[''"]') {
        $content = $content -replace '(import\s+React\s+from\s+[''"]react[''"];)', '$1
import { getDarkThemeClasses } from ''@/app/theme'';'
    }

    # Replace dark background classes
    $content = $content -replace 'dark:bg-\[#202020\]', '${getDarkThemeClasses(''background'')}'

    # Write back to file
    $content | Set-Content $filePath
}

Write-Host "Dark theme replacements completed."
