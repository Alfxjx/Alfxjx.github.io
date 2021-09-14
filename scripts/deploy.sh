# build 
npm run export:osx
# push to gitee & github

git add .

echo "git add ."

git commit -m "build: blog deploy"

echo "git push start"

git push origin master
git push gitee master