$H="http://localhost:3000/"
$L=New-Object System.Net.HttpListener
$L.Prefixes.Add($H)
$L.Start()
Write-Host "Server running on $H"
while ($L.IsListening) {
    try {
        $C=$L.GetContext()
        $R=$C.Response
        $P=$C.Request.Url.LocalPath
        if ($P -eq "/") { $P = "/index.html" }
        $F=Join-Path (Get-Location) $P.TrimStart('/')
        if (Test-Path $F -PathType Leaf) {
            $B=[System.IO.File]::ReadAllBytes($F)
            if ($F.EndsWith(".html")) { $R.ContentType="text/html; charset=utf-8" }
            elseif ($F.EndsWith(".js")) { $R.ContentType="application/javascript; charset=utf-8" }
            elseif ($F.EndsWith(".css")) { $R.ContentType="text/css; charset=utf-8" }
            $R.ContentLength64=$B.Length
            $R.OutputStream.Write($B,0,$B.Length)
        } else {
            $R.StatusCode=404
        }
        $R.Close()
    } catch {
        # ignore error and continue
    }
}
