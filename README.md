## Git Commit Message Rule
<details>
<summary>[ 수정자 ] < type > commit message</summary>

feat : 새로운 기능에 대한 커밋

fix : 버그 수정에 대한 커밋

build : 빌드 관련 파일 수정에 대한 커밋

chore : 그 외 자잘한 수정에 대한 커밋

ci : CI관련 설정 수정에 대한 커밋

cd : CD관련 설정 수정에 대한 커밋

docs : 문서 수정에 대한 커밋

style : 코드 스타일 혹은 포맷 등에 관한 커밋

refactor :  코드 리팩토링에 대한 커밋

test : 테스트 코드 수정에 대한 커밋

</details>
 
<br>
<hr>


## 기술 스택
| 이름 | 구분 | version |
|:----------:|:----------:|:----------:|
| Node | 런타임 플랫폼 | v16.6.0|
| Npm | 패키지 매니저 |v7.19.1|
|Mongo DB | 데이터 베이스  | v4.0.26| 
| TypeScript | 개발 언어 | |
|Express | 웹 프레임워크  | | 
|jest | 테스트 코드  | |

<br>
 
## 패키지
<details>
<summary> jsonwebtoken </summary>
<br>
</details>

<details>
<summary> passport </summary>
<br>
</details>

<details>
<summary> mongoose </summary>
<br>
</details>
 
<details>
<summary> moment </summary>
<br>
</details>

<details>
<summary> swagger </summary>

* npm 설치 
    >\$ npm install swagger-ui-express -D<br>
    \$ npm install swagger-autogen -D<br>
    \$ npm install @types/swagger-ui-express -D

<br>

* app.ts 기본 설정 
    ```
    // importing swagger 
    import swaggerUi from 'swagger-ui-express';
    const swaggerFile =  require('../swagger/swagger-output.json')
    app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile))
    ```
<br>

* 폴더 구조 
    ```
    ├── swagger
    │   ├── swagger-output.json
    │   └── swagger.js
    ```
<br>

* 참고 <br>
    https://charming-kyu.tistory.com/11

</details>

<br>

<hr>

 ## EC2 Instance (Amazon Linux AMI) Settings

<details>

<summary> Codedeploy Agent </summary>

#### 기본 설치
Edit user data 에 삽입
인스턴스 생성 후 실행 시 작동되는 script.

```
#!/bin/bash
sudo yum -y update
sudo yum -y install ruby
sudo yum -y install wget
cd /home/ec2-user
wget https://aws-codedeploy-us-east-1.s3.amazonaws.com/latest/install
sudo chmod +x ./install
sudo ./install auto
```

#### Logo 확인

> \$ cd /opt/codedeploy-agent/deployment-root/deployxment-logs <br>
$ cat codedeploy-agent-deployments.log
<br>
</details>


<details>
<summary> Mongo DB </summary>

#### 기본설치 

> \$sudo su <br>
$ vi /etc/yum.repos.d/mongodb-org-4.0.repo 

```
[mongodb-org-4.0]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/amazon/2013.03/mongodb-org/4.0/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-4.0.asc
```

>\$ yum install -y mongodb-org <br>
$ service mongod start

<br>

#### 관리자 권한 설정

> \$ use admin <br>
$ db.createUser({user: "<userName>", pwd: "<password>", roles:["root"]});

<br>

#### 보안 설정
> \$ vi /etc/mongod.conf

```
# network interfaces
net:
  port: 27017
  bindIp: 0.0.0.0
  .
  .
  .
security:
  authorization: enabled 
```

<br>

#### EC2 Security Group 설정
| IP version | Type | Port range |
|:----------:|:----------:|:----------:|
| IPv6 | Custom TCP | 27017 |
| IPv4 | Custom TCP | 27017 |

</details>


<br>
<hr>

 ## Jenkins Setup

<details>

<summary> Step 1. Install JDK </summary>

```
### JDK 1.8.0 설치 및 버전 확인
sudo yum install -y java-1.8.0-openjdk-devel.x86_64
java -version 
```

</details>



<details>

<summary> Step 2. Setup Jenkins </summary>

```
### Jenkins 설치
# 1. jenkins repository를 설정파일을 생성
sudo wget -O /etc/yum.repos.d/jenkins.repo
https://pkg.jenkins.io/redhat-stable/jenkins.repo

# 2. 설정파일 생성 후 아래 실행
sudo rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io.key

# 3. 관리자 권한으로 변경
sudo -s

# 4. yum 을 이용한 젠킨스 설치
yum install jenkins

# 5. 젠킨스 실행
sudo systemctl start jenkins

# (Optional) 만약 부팅시 가능하게 설정하려면 다음도 추가
# sudo systemctl enable jenkins 

# 6. 젠킨스 상태 확인
sudo systemctl status jenkins
```

</details>

<details>

<summary> Step 3. Convert .crt, .key to .jks </summary>

>.jks란 java key store의 약자로서 자바 언어에서 사용되는 보안 인증서

```
# 1. .crt 및 .key 를 조합하여 jenkins.pfx 만들기
# export password 입력 필요!
openssl pkcs12 -export -in <crt인증서 경로>.crt -inkey <private키 경로>.key -out jenkins.pfx

# .pfx 에 포함된 인증서 확인 
openssl pkcs12 -info -in jenkins.pfx

# 2. 위에서 생성한 jenkin.pfx를  .jks 로 변환
keytool -importkeystore -srckeystore jenkins.pfx -srcstoretype pkcs12 -destkeystore jenkins.jks -deststoretype jks

# 3. jenkins 전용 폴더 생성 후 jks 파일 이동
mkdir -p /etc/jenkins
cp jenkins.jks /etc/jenkins/

# 4. key와 폴더 권한 변경
chown -R jenkins: /etc/jenkins
chmod 700 /etc/jenkins
chmod 600 /etc/jenkins/jenkins.jks

```

</details>

<details>

<summary> Step 4. 젠킨스 config 파일 설정 </summary>

```
# 1. config 파일 접속
sudo vi /etc/sysconfig/jenkins

아래와 같이 변경하기
JENKINS_PORT="-1"	# http 포트 비활성화
JENKINS_HTTPS_PORT="9090"	# 젠킨스 포트 설정 (다른 포트여도 ㄱㅊ)
JENKINS_HTTPS_KEYSTORE="/etc/jenkins/jenkins.jks" # 앞서 변환한 .jks 인증서 경로
JENKINS_HTTPS_KEYSTORE_PASSWORD="<인증서 비밀번호>"
JENKINS_HTTPS_LISTEN_ADDRESS="0.0.0.0"	# 모든 ip에서 접근할 수 있도록 변경
JENKINS_ENABLE_ACCESS_LOG="yes"	# 초기 admin 비밀번호를 확인할 수 있도록 로그 활성화

# 2. 젠킨스 재실행
sudo systemctl restart jenkins

```

</details>

<details>

<summary> Step 5. EC2 Security Group 수정 </summary>

AWS에 접속하여 젠킨스 포트번호 (9090) 열어주기

</details>

<details>

<summary> 참고 </summary>

https://www.sslcert.co.kr/guides/SSL-Certificate-Convert-Format
https://devopscube.com/configure-ssl-jenkins/

</details>

