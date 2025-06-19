# Node.js + React를 통해 간단한 회원가입 로직 배우기

 </br></br>

## 강의 소개
참고강의: [따라하며 배우는 노드, 리액트 시리즈 - 기본 강의](https://www.inflearn.com/course/%EB%94%B0%EB%9D%BC%ED%95%98%EB%A9%B0-%EB%B0%B0%EC%9A%B0%EB%8A%94-%EB%85%B8%EB%93%9C-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EA%B8%B0%EB%B3%B8/dashboard)

수강기간: 24.09.26 ~ 24.10.11.

</br></br>


## 설치
    
node js 이미 다운되어 있는지 확인

터미널 키고 `node- v`  입력해서 버전 정보 나오면 깔려있는 것이다

vs code 터미널에서도 동일 적용 가능 ( 굳이, 운영체제 내 터미널 안써도 무방) (단축키: <kbd>Ctrl</kbd> + <kbd>&#96;</kbd>   )

설치링크:  https://nodejs.org/en
    
    
</br></br>

## 개념

 **JavaScript를 서버에서 실행**할 수 있도록 하는 **런타임 환경**

JavaScript는 원래 브라우저에서만 동작하는 언어이지만 Node.js 를 통해 서버 측에서도 실행할 수 있게함

**비동기 처리** 비동기적으로 작업을 처리하여 많은 요청을 동시에 처리하는 데 효율적

**NPM(Node Package Manager)** Node.js의 패키지 매니저인 NPM은 수많은 오픈소스 라이브러리와 모듈을 쉽게 설치하고 사용 가능

</br></br>

## NPM

Node Packager Manager

📄 [npm doc](https://docs.npmjs.com/)  → 명령어는 ‘ npm CLI ’ 참고

❔[패키지 매니저 비교(npm,yarn,pnpm)](https://velog.io/@sebinn/%ED%8C%A8%ED%82%A4%EC%A7%80-%EB%A7%A4%EB%8B%88%EC%A0%80-%EB%B9%84%EA%B5%90-npm-yarn-pnpm)


</br>

### Locally 와 Globally

</br>

**Locally** 

./node_modules/.bin 디렉토리에 설치

해당 프로젝트에서만 사용할 때 사용

</br>

 **Globally**

`npm install <패키지이름> - g` 명시

윈도우의 경우 AppData/npm 디렉토리에 설치

컴퓨터에 다운되어 해당 프로젝트에서만 사용하는게 아닌 다양한 프로젝트에서 사용

</br>

**프로젝트 초기화**

- `npm init`

   node.js 프로젝트를 초기화하는 명령어로 프로젝트를 처음 시작할 때 `npm init`을 사용하여 프로젝트 환경을 설정하는 것이 일반적
  
  이 명령어를 실행하면 프로젝트의 기본 설정을 담은 `package.json` 파일을 생성
  
  `package.json` 파일에는 프로젝트 이름, 버전, 의존성, 스크립트 등 프로젝트 설정과 관련된 다양한 정보가 담김

</br>

**패키지 설치 및 제거**

`npm install` package.json에 명시된 모든 의존성 패키지를 설치

`npm install <패키지 이름>`  특정 패키지를 설치하고 `package.json` 파일의 `dependencies`에 추가합니다.

`npm uninstall <패키지 이름>` 특정 패키지를 프로젝트에서 제거

</br>

**패키지 업데이트**

`npm update` 모든 패키지를 최신 버전으로 업데이트

`npm update <패키지 이름>` 특정 패키지를 최신 버전으로 업데이트

</br>

**패키지 검사 및 보안**

`npm audit` 현재 설치된 패키지의 보안 취약점을 검사

`npm audit fix` 가능한 보안 취약점을 자동으로 해결

</br>

**스크립트 실행**

`npm run start` package.json의 dependencies에서 `"start": "node index.js"`x` start가 시작점

</br>

### 터미널 명렁어

`Ctrl + C` 터미널에서 실행 중인 프로세스를 중단 → 서버 중단

`Ctrl + \` 프로세스 강제 종료 ( 더 강한 방식 )

</br></br>

## NPX

Node Package eXecute

패키지 실행기!

전역으로 설치하지 않고도 패키지를 **일시적으로 다운로드하고 실행**할 수 있음

디스크 공간 낭비하지 않을 수 있고 항상 최신 버전을 사용할 수 있다

패키지를 실행할 때 해당 패키지를 프로젝트의 레지스트리에 등록하지 않는다 

→ 로컬의 node_modules에는 이 패키지가 설치되지 않으며 프로젝트의 package.json에 종속성으로 추가되지 않음

</br></br>

## dotenv

dotenv는 Node.js 애플리케이션에서 **환경 변수를 관리**하기 위한 모듈

.env 파일에 환경 변수를 정의하고, 이를 코드에서 쉽게 사용할 수 있게 해준다

```
`.env.dev` 개발 환경을 위한 설정을 포함하는 파일

`.env.prod`프로덕션 환경을 위한 설정을 포함하는 파일

`.env.test` 테스트 환경을 위한 설정을 포함하는 파일

이런 식으로 환경에 따라 구분하여 env 파일을 활용할 수 있음
```


일반적으로 `.env` 파일은 루트 디렉토리에서 찾기 때문에 루트 디렉토리에 두는 게 관행

다른 디렉토리에 넣을 경우 path 기술해줘야함

 예) `dotenv.config({ path: './config/.env' });`

 </br>

### 환경변수 (Environment Variables)

운영 체제 또는 런타임 환경에서 설정되는 변수

애플리케이션의 설정 및 동작을 제어하는 데 사용

데이터베이스 URL, API 키, 비밀번호 등과 같은 민감한 정보를 저장


</br></br>


## 함수

`require()` 모듈을 로드하고 사용할 때 사용되는 함수 (CommonJS)

→ `import` 가 최신버전 (비동기 가능) 

```jsx
// const moduleName = require('module-name');
import moduleName from "moduleName ";
```

</br></br>

## 라이브러리

### Express JS

📄 [ExpressJS doc](https://expressjs.com/ko/) 

**Node.js** 환경에서 **웹 애플리케이션**과 **API**를 구축하기 위한 **웹 프레임워크 →** Node.js와 함께 사용하여 서버 개발을 더욱 쉽게 하고, RESTful API와 같은 웹 서비스를 구축하는 데 널리 사용

 **설치** (터미널이용)  `npm install express --save`

npm 5 버전 이상은 설치하는 패키지가 dependencies에 자동으로 추가되므로  `--save` 생략가능


### ~~BodyParser~~
* 업데이트 사항
  Express 4.16.0 버전 이상에서는 `body-parser` 모듈이 내장되어 있으므로, 별도로 설치할 필요 없이 `express.json()`과 `express.urlencoded()`를 사용
  <details>
  <summary> 살펴보기 </summary>
  <div markdown="1">
  
  **HTTP 요청의 본문(body)을 파싱**하기 위한 미들웨어 라이브러리
  
   **설치** (터미널이용)  ****`npm install body-parser`
  
  `app.use()` → app.use()는 미들웨어를 실행시켜주는 정말 유명한 함수임
  
  ```jsx
  // application/x-www-form-unlencoded
  app.use(bodyParser.urlencoded({ extended: true }));
  // application/json
  app.use(bodyParser.json());
  ```
  
  </div>
  </details>

<br/>

### Nodemon

 📄 [nodemon doc](https://www.npmjs.com/package/nodemon)

node monitor 의 약어라네용

실행 중에 코드가 변경되면 변경 사항을 감지하여 **자동으로 서버를 재시작**해주는 도구

`npm install nodemon -g` production mode (배포모드)에서도 사용

 `npm install nodemon --save-dev` development mode (개발 모드) 에서 사용 (로컬에서 할 때만 사용)

<br/>

### Bcrypt

📄  [bcrypt doc](https://www.npmjs.com/package/bcrypt)

*비-크립트* 비밀번호 암호화

**설치** `npm install bcrypt`

**개념 및 함수**

`salt` 비밀번호를 해시하기 위해 사용

`saltRounds` salt를 생성할 때 해싱을 몇 번 반복할지 설정하는 값 → 값이 클 수록 해싱이 더 강력해지지만, 속도는 느려짐

`bcrypt.hash(user.password, salt, callback)` 주어진 비밀번호를 솔트와 함께 해시 

`bcrypt.compare(myPlaintextPassword, hash, function(err, result) { // result == true });`  비밀번호 비교 ( 로그인 시 사용 )

<br/>

### JSON Token

📄 [jsonwebtoken doc](https://www.npmjs.com/package/jsonwebtoken)

**설치** `npm install jsonwebtoken` 

**토큰 검증** `var decoded = jwt.verify(token, 'secretKey');` 토큰을 복호화

<br/>

### CookieParser

**설치** `npm install cookieparser`

**사용** `app.use(cookieParser());`

요청에 포함된 쿠키를 파싱

클라이언트의 요청에서 쿠키를 읽고, req.cookies 객체에 쿠키 데이터를 저장

<br/>

### Concurrently

📄 [concurrently doc](https://www.npmjs.com/package/concurrently)

서버와 클라이언트를 한 개의 스크립트로 실행하게 해주는 모듈 (한 번에 다같이 실행)

**설치** `npm i concurrently`

```
concurrently "command1 arg" "command2 arg"
  
위 처럼 “ ”로 묶는거 잊지말기 그렇지않으면 concurrently는 command1, arg, command2, arg  이 4개로 인식해서 실행할거임
```

**적용** package.json 에 추가

`"start": "concurrently \"command1 arg\" \"command2 arg\""`

**예시코드**

```jsx
"dev" : "concurrently \"npm run backend\" \"npm run start --prefix client\""
// root 폴더에 있는거 하나(server) client 폴더에 있는거 하나 (client)
```
