@echo off
cd /d "%~dp0"
python make_links.py
start "" "guest-links.html"
pause
