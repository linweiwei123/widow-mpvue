git checkout feature-widow

#!/usr/bin/env sh
set -e
echo "Enter release npm version: "
read VERSION

read -p "Releasing $VERSION - are you sure? (y/n)" -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
  # build components
  echo "build components index.js"
  npm run build:components

  # git commit
  git add .
  git commit -m "[release] $VERSION"
  git push -u origin master

  # npm publish
  npm version $VERSION
  npm config set registry http://registry.npmjs.org
  npm publish
  npm config set registry https://registry.npm.taobao.org

fi
