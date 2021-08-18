#!/bin/bash

# EC2 서버에 node와 nvm 설치하기
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install node

# 80, 443 포트로 들어오는 사용자들을 5209 포트로 우회하기
sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 5209
sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 443 -j REDIRECT --to-port 5209


# EC2 서버 작업 폴더 확인
DIR="/home/ec2-user/ohsool"
if [ -d "$DIR" ]; then
  echo folder exists
else 
  mkdir ${DIR}
fi

# security 파일 가져오기
aws s3 sync s3://ohsool-security/ssl/ /home/ec2-user/ohsool/src/ssl
aws s3 sync s3://ohsool-security/config/ /home/ec2-user/ohsool/config

