
---

data : 2022/1/7

---

# CRA 없이 React 프로젝트 생성하고 구동하기
---

## 프로젝트 생성


**프로젝트 디렉토리 생성**
```
mkdir react-without-cra
cd react-without-cra
```
프로젝트를 생성할 폴더를 하나 생성하자.
<br>

**package.json 생성**
```
npm init
```

Node.js 에서 사용하는 모듈을 패키지로 관리하기 위해 `package.json` 파일을 생성한다. 이 때 `npm init`명령어를 사용한다. 

**package.json**
```javascript
{
  "name": "project-name",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}

```
`create-react-app`을 통해 생성된 `package.json`과는 조금 다른 모습이지만, 기본 틀은 생성되었다. 이제 필요한 모듈을 다운로드받으면 자동으로 `dependency` 필드가 생기고, 의존 정보가 입력될 것이다.

**기본 파일 생성**
이제 기본 파일을 생성해보자 일반적으로 react는 다음과 같은 구조를 가진다. 이는 default 값으로 활용되니 지켜줘야 할 필요가 있다.

![image](https://user-images.githubusercontent.com/34260967/148720685-7ea5d9e1-075b-4a69-95fc-81809bfe5aea.png) <br>

`public`, `src` 디렉토리를 생성하고, 하위 파일도 똑같이 구성해주자.

**index.html**
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>React App Without CRA</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```
**index.js**
```javascript
//react 모듈 설치 후 작성할 것입니다.
```

**App.js**
```javascript
//react 모듈 설치 후 작성할 것입니다.

```



**필요한 모듈은 무엇인가?**
그렇다면 React App을 구동하기 위해서는 어떤 모듈이 필요할까? Node.js 프로젝트가 React 프로젝트가 되기 위해서는 아래와 같은 세가지 모듈이 필요하다.

1. `react`, `react-dom` 모듈

2. ES6와 JSX를 ES5로 변환해주는 Transpiler : babel

3. transpile 된 파일을 하나(또는 여러개)의 파일로 묶어주는 bundler : webpack, parcel 등

`create-react-app`에서는 babel, webpack을 사용한다.

---

## React

React App을 구현하는데 필수적인 모듈은 다음과 같다.
```
npm install react react-dom
```
- `react` : React 라이브러리의 진입점이다. 컴포넌트를 사용 할 수 있게 되며, hook을 사용 할 수 있다.<br>
https://ko.reactjs.org/docs/react-api.html
<br>
- `react-dom` : DOM에 특화된 메서드와 필요한 경우 React 모델 외부로 나갈 수 있는 해결책을 제공한다. `render()`메서드 등이 있다.<br>
https://ko.reactjs.org/docs/react-dom.html
<br>

모듈을 설치하고 `.js` 파일을 다시 작성해주자.
**index.js**
```javascript
import React from 'react';
import ReactDom from 'react-dom';
import App from './App';
ReactDom.render(<App />,document.getElementById("root"));
```

**App.js**
```javascript
import React from "react";

const App = () => {
  return <div className="app">React App Without CRA!-----!</div>;
};

export default App;
```
---

## webpack

### webpack 이란?

webpack 은 js파일, module, image, css 등 어플리케이션에 사용되는 모든 파일을 최소한의 파일로 묶는(bundling) 일을 한다.

그렇다면 왜 번들링 하는 것일까?

1. 모듈 호환성
`javascript`는 모듈 간 import와 export를 할 수 없다. 그렇기 때문에 script tag 를 사용하여 global 형식으로 모듈을 사용해야한다. 이러한 방식은 같은 이름의 변수를 사용하는 모듈 간 충돌을 일으키고, 모듈의 경계성이 모호해 지는 문제가 있다. <br>
React와 같이 복잡하고 다양한 구조로 모듈이 사용되는 경우에는 모듈의 의존성을 묶어 관리하여 모듈 간 충돌을 피해야할 필요가 있다. 
(의존성 관리는 webpack에서 자동으로 해준다)<br><br>

2. 로딩 시간
당연하게도 webpack을 사용하지 않는다면, 여러개의 `.js`파일을 로드하는데 시간이 낭비된다. 따라서 번들링을 통해 최소한의 파일로 재구성함으로써, 유지·보수·배포에 효율적이게 된다.


요약하자면 webpack과 같은 번들러는 코드를 모듈방식으로 작성할 수 있게 하고 이를 작은 package로 묶어서 로딩 시간을 최적화할 수 있다.

javascript 번들러의 역사와 특성, 목적에 맞는 번들러 선택에 관한 재미있는 글을 발견하여서 링크를 남긴다.
JavaScript 번들러로 본 조선시대 붕당의 이해: https://yozm.wishket.com/magazine/detail/1261/?fbclid=IwAR0WkCNyLEUiaEjrCZ-Uwbxdoj10_fijcqxDte8POIAJssehrRNJuAV2aKs<br>

**참고**
webpack을 사용하는 이유(모듈호환성) : 
- https://ljh86029926.gitbook.io/coding-apple-react/undefined/bundler
- https://ui.toast.com/fe-guide/ko_BUNDLER<br>

webpack 요약 :
- https://ko.reactjs.org/docs/create-a-new-react-app.html#creating-a-toolchain-from-scratch<br>


### webpack 설치

**webpack 기본 설치**
webpack을 사용하기 위해 가장 기본적으로 설치해야할 패키지는 다음과 같다.

```
npm install --save-dev webpack webpack-cli
```
- webpack-cli : 웹펙을 커맨드라인에서 명령어로 제어 할 수 있게 한다.

<br><br>

**참고**
- webpack 사용법 : 
https://webpack.kr/guides/getting-started/

<br>
<br>

**Lodaer 설치**
웹팩은 번들링을 하기위해 Loader라는 것을 사용한다. 서로 다른 확장자를 번들링 하기위해서는 각각의 Loader가 필요하다. 

- React의  `.js` 파일 : `babel-loader`이 필요하다.
- css 파일 : `styled-loader`, `css-loader` 이 필요하다.

```
npm install --save -dev babel-loader style-loader css-loader
```
- babel-loader : ES6와 JSX문법을 사용하는 react의 `.js`파일을 담당
- style-loader : DOM 에 style 태그를 사용하여 export 하는 역할
- css-loader : css파일을 담당

**참고**
- webpack loader: 
https://webpack.js.org/loaders/<br>
<br>
<br>


**dev-server**

`webpack-dev-server` 는 웹 애플리케이션을 개발하는 과정에서 유용하게 쓰이는 도구이다. 웹팩의 빌드 대상 파일이 변경 되었을 때 매번 웹팩 명령어를 실행하지 않아도 코드만 변경하고 저장하면 웹팩으로 빌드한 후 브라우저를 새로고침 해준다.
```
npm install --save dev webpack-dev-server
```

**참고**
- 웹팩 핸드북 :
https://joshua1988.github.io/webpack-guide/devtools/webpack-dev-server.html#webpack-dev-server<br>

- webpack configuration :
https://webpack.js.org/configuration/dev-server/<br>

--- 

## babel

---

## react


