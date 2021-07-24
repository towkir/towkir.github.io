#!/usr/bin/env sh
# abort on errors
set -e
# build
npm run build
# navigate into the build output directory
cd dist
# here is the workaround for 404 issue on direct route landing
cp index.html 404.html
# for deploying to a custom domain
# echo 'www.example.com' > CNAME
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:towkir/towkir.github.io.git master:gh-pages
cd -
