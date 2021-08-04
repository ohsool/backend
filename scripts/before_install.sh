#!/bin/bash

# EC2 서버에 node와 nvm 설치하기
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install node

# 80, 443 포트로 들어오는 사용자들을 5209 포트로 우회하기
sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 5209
sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 443 -j REDIRECT --to-port 5209

# EC2 서버에 작업 폴더가 존재하는 지 확인 (없을 시 새로 생성함)
DIR="/home/ec2-user/ohsool"
if [ -d "$DIR" ]; then
  echo "${DIR} exists"
else
  echo "Creating ${DIR} directory"
  mkdir ${DIR}
fi

# Typescript에서 컴파일된 JS 파일을 저장하는 폴더를 삭제한다. (다시 run build를 통해 생성될 예정)
# DIST="/home/ec2-user/ohsool/dist"
# if [ -d "$DIST" ]; then
#   sudo rm -r /home/ec2-user/ohsool/dist
#   echo "${DIST} removed"
# fi