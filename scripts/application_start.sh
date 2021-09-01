#!/bin/bash

# EC2 서버에 node와 nvm 설치하기
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install node

#give permission for everything in the ohsool directory
sudo chmod -R 777 /home/ec2-user/ohsool

# security 파일 가져오기
aws s3 sync s3://ohsool-security/ssl/ /home/ec2-user/ohsool/src/ssl
aws s3 sync s3://ohsool-security/ssl/ /home/ec2-user/ohsool/dist/ssl
aws s3 sync s3://ohsool-security/config/ /home/ec2-user/ohsool/config

# html 
aws s3 sync s3://ohsool-security/emailHtml/ /home/ec2-user/ohsool/dist/email

# EC2 작업 파일로 이동
cd /home/ec2-user/ohsool

# npm과 node 설치
export NVM_DIR="$HOME/.nvm"	
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # loads nvm	
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # loads nvm bash_completion (node is in path now)

# node_modules 설치
npm install --save --legacy-peer-deps
echo "npm installed"

#PM2 설치
npm install -g pm2
echo "pm2 installed"

# typescript를 javascript 로 complie 하기
npm run build

# production 상태로 전환
export NODE_ENV=production
echo "${NODE_ENV} mode is on"

# node 어플리케이션 background에서 실행시키기 (by doing so, the server won't be terminated due to inactivates)
# node app.js 만 입력시 foreground로 실행이 됌
# node dist/app.js > app.out.log 2> app.err.log < /dev/null & 
pm2 kill
pm2 start dist/app.js --log-date-format 'YYYY-MM-DD HH:mm:ss.SSS'
