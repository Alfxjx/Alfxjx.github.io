cd docs

echo > .nojekyll

echo "starting push ..."

git add .

echo "git add ."

git commit -m "build: blog deploy"

echo "git push start"

git push origin master
git push gitee master