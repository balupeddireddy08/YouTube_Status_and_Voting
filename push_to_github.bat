@echo off
echo Setting up Git repository...

git remote remove origin
git remote add origin https://github.com/balupeddireddy08/YouTube_Status_and_Voting.git

echo Adding all files...
git add .

echo Committing changes...
git commit -m "Initial commit for YouTube Status and Voting site"

echo Pushing to GitHub...
git push -u origin master

echo Done!
pause 