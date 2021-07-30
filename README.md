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



[ 수정자 ] < type > commit message
 
 <hr>


 ## Swagger 
<details>

<summary> npm 설치 </summary>

>\$ npm install swagger-ui-express -D<br>
\$ npm install swagger-autogen -D<br>
\$ npm install @types/swagger-ui-express -D

</details>
<br>

<details>
<summary> app.ts 기본 설정 </summary>

```
// importing swagger 
import swaggerUi from 'swagger-ui-express';
const swaggerFile =  require('../swagger/swagger-output.json')
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile))
```

</details>
<br>

<details>
<summary> 폴더 구조 </summary>

```
├── swagger
│   ├── swagger-output.json
│   └── swagger.js
```

</details>

<br>
<details>
<summary> 참고 </summary>

https://charming-kyu.tistory.com/11

</details>