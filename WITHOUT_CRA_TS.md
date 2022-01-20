---
title: "CRA 없이 React App 만들기3 - TypeScript 적용"
date: "2022-01-15T17:22:00"
description: "TypeScript 적용 해보기"
---

# TypeScript 적용 해보기

## TypeScript 설치

다양한 사이트에서 일반적인 React App 에 TypeScript를 적용하는 방법을 소개하고 있다. 다음 링크를 참고하자.

CRA에 TS 추가하기 : https://create-react-app.dev/docs/adding-typescript/

위의 링크에서는 이미 진행된 CRA 프로젝트에서 TypeScript를 추가하는 방법을 소개한다. 하지만 우리는 CRA를 사용하지 않았으므로, `@types/jest`는 제외하고 설치한다.(이 프로젝트에서 jest는 사용하지 않기 때문이다.)

```
npm install --save-dev typescript @types/node @types/react @types/react-dom 
```

- typescript : typescript의 컴파일, 타입추론 기능 등 핵심 기능 담당
- @types/node : Node.js의 Type 정의를 포함한다.
- @types/react : React의 Type 정의를 포함한다. 
- @types/react-dom : React(react-dom)의 Type 정의를 포함한다. 

또한 이 프로젝트에서는 `styled-components` 라이브러리를 사용하기에, 이와 관련된 모듈도 다운해야한다.

```
npm install --save-dev @types/styled-components
```

일반적으로 어느정도 규모가 있고, 지원되는 라이브러리는 `@types/`로 지원된다. 필요할때마다 검색해보자.

---

## tsconfig.json 생성

TypeScript의 컴파일 옵션 등 설정을 하기위해선 `tsconfig.json`파일이 필요하다. 이 파일은 아래 명령어로 생성 가능하다.

```
tsc --init
```

단, 이 명령어는 typescript가 global로 설치 되어있어야 사용 가능하다. 하지만 번거롭게 다시 global로 설치하지 않고 npx를 이용하여 사용 할 수 있다. 

```
npx tsc --init
```

이게 어떻게 가능한가에 대해서는 아래의 글을 참고하였다.

npm과 npx의 차이 : https://webruden.tistory.com/275

명령어 실행후 root 디렉토리에 `tsconfig.json`파일이 생긴것을 확인 할 수 있다.


---

## tsconfig.json

`tsconfig.json` 파일에서 typescript의 컴파일 옵션을 정할 수 있다. 

그렇다면 우리는 `tsconfig.json`을 어떻게 구성해야 하는가?

// tsconfig.js 옵션 설정 방법 블로그 포스트 링크

무엇인지 잘 모르겠다면 우선 아래의 `tsconfig.json`을 그대로 쓰고, 나중에 옵션을 변경하면서 알아보자.

**tsconfig.json**
```json
//tsconfig.json
```

---

## TypeScript 적용

TypeScript 파일 확장자에는 `.ts`,`.tsx`가 있는데, 이 둘의 차이는 다음과 같다.

- `.ts` : 순수 타입스크립트 파일
- `.tsx` : jsx가 포함된 타입스크립트 파일

우선 React는 JSX라는 js 확장문법을 사용한다. 따라서 `.tsx` 확장자를 사용해서 javascript 파일을 typescript 파일로 변경해보자.

**App.tsx**
```javascript
import React from "react";
import "./App.css";
import styled from "styled-components";

//styled-components
const Square = styled.div`
  width: 200px;
  height: 200px;
  background-color: violet;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction : column;
`;

//components
const TestStyledComponent = () => {
  return (
    <Square>
      {sumTwoInt({ num1: 5, num2: 12 })}
      {printString("TEST")}
    </Square>
  );
};

//functions
const sumTwoInt = ({ num1, num2 }: sumTwoIntProps) => {
  return num1 + num2;
};

const printString = (str: string) => {
  return str;
};

//interface 
interface sumTwoIntProps {
  num1: number;
  num2: number;
}

const App = () => {
  return (
    <div className="app-wrapper">
      <div className="app">React App Without CRA!-----!</div>
      <TestStyledComponent />
    </div>
  );
};

export default App;
```

typescript의 기능을 확인하기 위해 위와 같이 작성했다. 하지만 아직 `.tsx`파일을 번들링하는 `rule`이 없기 때문에, 테스트하기 어렵다. 아래에서 `.tsx`파일을 처리해보자


---

## webpack  `. tsx` 파일 처리

`.tsx`파일은 `tsconfig.json`에서 정의된 컴파일옵션을 따르게 된다.이에서 알 수 있듯이 typescript도 컴파일을 한다. 즉, typescript로 작성된 파일이 javascript로 컴파일이 되는것이다. 그런데 우리는 이미 똑같이 javascript로 컴파일하는 babel 이라는 모듈을 설치하고 적용하였다. 무엇이 다르고 어떤것을 선택해야 할까?

webpack이 `.ts|.tsx`파일을 번들링 하기 위해서는 loader 라는것이 필요하다. `.ts|.tsx` 를 처리하는 loader는 2 종류가 있다(2022년 1월)

1. ts-loader
2. @babel/preset-typescript


babel vs typescript : https://blog.logrocket.com/babel-vs-typescript/

// babel 과 typescript 의 차이 : 블로그 링크

// 

## Test

<img src="https://user-images.githubusercontent.com/34260967/149287228-84bb0f10-85ae-49d5-938b-4b5f3d338a84.png" width="100%">

`styled-components`와 `function`이 잘 동작하는것을 볼 수 있다.


.tsx

ts-loader : .tsx -> .js(es6)
babel-loader  : .js(es6) -> .js(es5) (babel-plugin-styled-components 적용안됨.)
따라서 typescript-plugin-styled-components 사용
https://www.npmjs.com/package/typescript-plugin-styled-components