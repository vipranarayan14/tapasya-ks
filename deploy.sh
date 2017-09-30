file_deploy() {
  
  WORKING_DIR="./node_modules";

  if [ "$TRAVIS_BRANCH" == "master" ]; then
    REMOTE_DIR="~/public_html";
  elif [ "$TRAVIS_BRANCH" == "develop" ]; then
    REMOTE_DIR="~/public_html_alpha";
  else 
    echo "This will not deploy!";
    exit 0;
  fi

  lftp -u $FTP_USER,$FTP_PASS -e "set ftp:ssl-allow no ; mirror -v -c -e -R $WORKING_DIR $REMOTE_DIR ; exit" -p 21 $FTP_HOST
}

os_deploy() {
  
  npm install
  gulp build
}