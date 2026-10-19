@echo off
chcp 65001 > nul

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║                  Loja Mespín - E-commerce                     ║
echo ║                   Aromas e Velas Exclusivas                   ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.
echo Abrindo o site...
echo.

REM Obter o caminho do diretório
cd /d "%~dp0"

REM Construir URL local
set "URL=file:///%CD%\public\index.html"
set "URL=%URL:\=/%"

REM Abrir no navegador padrão
start "" "%URL%"

echo ✅ O site foi aberto no seu navegador!
echo.
echo 📍 URL: %URL%
echo.
echo Você pode usar o site offline. Pressione qualquer tecla para sair.
pause > nul
