
#!/bin/sh

setup_git() {
  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "Travis CI"
}

upload_files() {
  git remote add origin-pages https://${GH_TOKEN}@github.com/charjac/simple-doc.git
  git push --follow-tags origin master
}

setup_git
upload_files

