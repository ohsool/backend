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




