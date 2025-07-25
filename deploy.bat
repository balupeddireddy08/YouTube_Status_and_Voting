@echo off
echo Building the project...
call npm run build

echo Deploying to GitHub...
git add .
git commit -m "Update site content"
git push origin master

echo Done!
pause 