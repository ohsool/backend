# 맥주계의 왓챠, 오늘의술 🍻

## 목차 | Contents
1. [오술 소개 | About Ohsool](#오술-소개--About-Ohsool)
2. [웹사이트 | Webstie](#웹사이트--Webstie)
3. [개발기간 | Project Period](#개발기간--Project-Period)
4. [팀원 | Team](#팀원--Team)
5. [개발환경 | Development Enviornment](#개발환경--Development-Enviornment)
6. [주요 API 기능 | Main API](#주요-API-기능--Main-API)
7. [주요 라이브러리 | Main Library](#주요-라이브러리--Main-Library)
8. [기타 | etc](#기타--etc)
<br>

<hr>

## 🍻오술 소개 | About Ohsool

* 국내에 존재하는 맥주들을 한곳에 모아 개인의 취향을 바탕으로 맥주를 추천해주는 서비스
* 맥주에 대한 평점 및 시음 노트가 포함된 도감을 작성할 수 있으며 다른 유저의 도감도 같이 확인할 수 있다.

<br>

<img src="https://user-images.githubusercontent.com/52440784/131717465-c5d354b3-6531-41b7-82ea-b88c215437bc.png" width=100% />
<img src="https://user-images.githubusercontent.com/52440784/131280256-2fce6eba-fe50-4b96-b418-c7647225dfe9.jpg" width=60% />

<br>

## 🌎웹사이트 | Webstie
https://ohsool.com/

<br>

## ⌚개발기간 | Project Period
2021.07.23 ~ 2021.09.02

<br>

## 🤸🏻‍♀️팀원 | Team

### [✨About Team Ohsool✨](https://well-astronaut-b13.notion.site/team-OHSOOL-844e5fefc1d14df2b97f8b1cda4fb3ed)

#### Backend (Node.js)
* 이정원 
* 문진영
* 윤송
#### Frontend (React) - [Frontend Github](https://github.com/ohsool/front-end)
* 원동환
* 장정윤 
#### Design (UI/UX) - [Figma WireFrame](https://www.figma.com/file/c2M6Yjvm5IjSAnsrQ41XLv/%ED%95%AD%ED%95%B499_WireFrame?node-id=0%3A1)
* 문지혜 
* 이근호 


<br>

## ⛏개발환경 | Development Enviornment

<img src="https://img.shields.io/badge/Node.js-00599C?style=flat-square&logo=Node.js&logoColor=white"/> <img src="https://img.shields.io/badge/typescript-00599C?style=flat-square&logo=Typescript&logoColor=white"/> <img src="https://img.shields.io/badge/javascript-00599C?style=flat-square&logo=javascript&logoColor=white"/>  <img src="https://img.shields.io/badge/mongodb-00599C?style=flat-square&logo=mongodb&logoColor=white"/> <img src="https://img.shields.io/badge/AWS-00599C?style=flat-square&logo=AmazonAWS&logoColor=white"/>

| 이름 | 구분 | 
|:----------:|:----------:|
| **Server** | AWS EC2 (Amazon Linux 2 AMI (HVM), 64bit) |
| **Framework** | Express(Node.js) |
|**개발언어** | Typescript, Javascript  | 
| **Database** | Atlas (MongoDB) |
|**CI/CD** | AWS CodePipeline, CodeDeploy  |  
|**Load Balancer** | AWS ALB, Auto Scaling Group | 
|**TDD** | Jest  | 
|**Storage** | AWS S3  |
|**Tools** | VSCode, Git, Github, Slack, Notion  |

<br><br>

| 기술스택   | Appliance                   | Version |
|------------|-----------------------------|---------|
| Express    | Node.JS                     | 4.17.1  |
| Typescript | 전체 코드 타입스크립트 적용 | 5.0.1   |
| Mongoose   | 변동성 많은 DB. NoSQL 적용  | 5.13.3  |
| HTTPS      | 웹사이트 데이터 보안화	   | 
| CI/CD ||
CORS|	Request resource 제한|	2.8.5
Swagger	|API 문서화	|4.1.6
Prettier	|코드 포맷팅	|2.3.2|
Passport|	구글, 카카오 소셜 로그인|	0.4.1
slack/web-api|	맥주 추천, 불편 사항 → 슬랙|	6.3.0
env|	보안 토큰, 키 관련 보안화	
Jest|	테스트코드 작성	|27.0.6
supertest	|테스트코드 작성|	6.1.4
JWT(BEARER)|	사용자 인증, Bearer 토큰	|8.5.1
Joi|	회원 검증과정|	17.4.1
moment|	시간 일관화	|2.29.1
winston|	서버 log 저장	|3.3.3
helmet|	HTTPS 헤더 보안 세팅	|4.6.0
korean-regexp|	맥주 이름 검색시 한국어 정규식|	1.0.9
bcrypt|	비밀번호 암호화|	5.0.1
compression|	값 전달시 압축	|1.7.4
nodemailer|	사용자에게 메일 전달|	6.6.3
<br><br>

* [**ERD (Entity Relationship Diagram)**](https://github.com/ohsool/backend/wiki/ERD)
* [**Web Architecture**](https://github.com/ohsool/backend/wiki/Web-Architecture)
* [**Backend Deploymenmt Enviornment**](https://github.com/ohsool/backend/wiki/Deployment-Environment)

<br>

## ⚔주요 API 기능 | Main API 

* [View details](https://github.com/ohsool/backend/wiki/%EB%A9%94%EC%9D%B8-%EA%B8%B0%EB%8A%A5-API)

1. 테스트 기반으로 사용자의 맥주 취향 보여주기
2. 각자 다른 맥주 취향을 가진 사용자들이 남긴 평점을 맥주 종류 별로 평균을 내어 <br> 타 사용자의 취향에 맞는 맥주 추천하기
3. 맥주 판매처 제보하기
4. 맥주 및 해시태그 검색하기
5. 비밀번호 변경 시 임시 비밀번호 생성
6. 회원가입 및 건의사항 제출 시 이메일 발송

<br>

## 🏊🏻‍♂️기술적 챌린지 | Troubleshooting

* [View details](https://github.com/ohsool/backend/wiki/%EA%B8%B0%EC%88%A0%EC%A0%81%EC%B1%8C%EB%A6%B0%EC%A7%80-%7C-%ED%8A%B8%EB%9F%AC%EB%B8%94%EC%8A%88%ED%8C%85)

1. JWT Refreshtoken 적용
2. secretKey를 이용하여 프런트 도메인외 다른 유저가 api url에 접근하지 못하도록 설정 
3. 웹 서버 환경에서 Jest 테스트 코드 구동 시 발생하는 timeout 오류
4. 타입스크립트 자료형을 이용한 API 인터페이스

<br>

## 🎨주요 라이브러리 | Main Library
<details>
<summary> jsonwebtoken </summary>
<br>
</details>

<details>
<summary> passport </summary>
<br>
</details>

<details>
<summary> nodemailer </summary>

> npm i --save-dev @types/nodemailer<br>
npm i nodemailer
<br>
</details>

<details>
<summary> mongoose </summary>
<br>
</details>

<details>
<summary> dotenv </summary>
<br>
</details> 
<details>
<summary> moment </summary>
 
  ```
  npm install moment --save  
  ```
</details>

<details>
<summary> swagger </summary>

* npm 설치 
 
  ```
  npm install swagger-ui-express -D<br>
  npm install swagger-autogen -D<br>
  npm install @types/swagger-ui-express -D
  ```


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

## 🧾기타 | etc

<details>
<summary>Git Commit Message Rule</summary>

### Format: [ 수정자 ] < type > commit message

* **feat** : 새로운 기능에 대한 커밋 
* **fix** : 버그 수정에 대한 커밋 
* **build** : 빌드 관련 파일 수정에 대한 커밋 
* **chore** : 그 외 자잘한 수정에 대한 커밋 
* **ci** : CI관련 설정 수정에 대한 커밋 
* **cd** : CD관련 설정 수정에 대한 커밋 
* **docs** : 문서 수정에 대한 커밋 
* **style** : 코드 스타일 혹은 포맷 등에 관 한 커밋 
* **refactor** :  코드 리팩토링에 대한 커밋 
* **test** : 테스트 코드 수정에 대한 커밋 

</details>
 
