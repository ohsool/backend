# 맥주계의 왓챠, 오늘의술 🍻

## 목차 | Contents
1. [오술 소개 | About Ohsool](#오술-소개--About-Ohsool)
2. [웹사이트 | Webstie](#웹사이트--Webstie)
3. [개발기간 | Project Period](#개발기간--Project-Period)
4. [팀원 | Team](#팀원---Team)
5. [개발환경 | Development Enviornment](#개발환경--Development-Enviornment)
6. [주요 API 기능 | Main API]
7. [주요 라이브러리 | Main Library](#주요-라이브러리--Main-Library)
8. [기타 | etc](#기타--etc)
<br>

<hr>

## 🍻오술 소개 | About Ohsool

* 국내에 존재하는 맥주들을 한곳에 모아 개인의 취향을 바탕으로 맥주를 추천해주는 서비스
* 맥주에 대한 평점 및 시음 노트가 포함된 도감을 작성할 수 있으며 다른 유저의 도감도 같이 확인할 수 있다.

<img src="https://user-images.githubusercontent.com/52440784/131280246-9b2e7aa9-e25c-4d42-9b94-b34fee3838d7.jpg" width=90% />
<img src="https://user-images.githubusercontent.com/52440784/131280256-2fce6eba-fe50-4b96-b418-c7647225dfe9.jpg" width=60% />

<br>

## 🌎웹사이트 | Webstie
https://ohsool.com/

<br>

## ⌚개발기간 | Project Period
2021년 07월 23일 ~ 2021년 08월 31일

<br>

## 🤸🏻‍♀️팀원 | Team
* **Backend (Node.js)** 
<br> 이정원, 문진영, 윤송
* **Frontend (React)** (https://github.com/ohsool/front-end)
<br> 원동환, 장정윤
* **Design (UI/UX)**
<br> 문지혜, 이근호 [(Figma WireFrame)](https://www.figma.com/file/c2M6Yjvm5IjSAnsrQ41XLv/%ED%95%AD%ED%95%B499_WireFrame?node-id=0%3A1)


< 팀원소개 노션페이지 링크 놓기 >

<br>

## ⛏개발환경 | Development Enviornment

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



* [**ERD (Entity Relationship Diagram)**](https://github.com/ohsool/backend.wiki.git)
* [**Web Architecture**](https://github.com/ohsool/backend.wiki.git)
* [**Backend Deploymenmt Enviornment**](https://github.com/ohsool/backend.wiki.git)

<br>

## ⚔주요 API 기능 (위키로 정리하기) | Main API
1. 테스트 기반으로 사용자의 맥주 취향 보여주기
2. 각자 다른 맥주 취향을 가진 사용자들이 남긴 평점을 맥주 종류 별로 평균을 내어 타 사용자의 취향에 맞는 맥주 추천하기 
3. 맥주 판매처 제보하기
4. 맥주 및 해시태그 검색하기
5. 비밀번호 변경?

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

Format: [ 수정자 ] < type > commit message
 
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
 
