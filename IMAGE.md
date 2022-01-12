# 이미지 처리하기
---

바로 직전에 CRA 없이 기본적인 React App을 만들고 서버를 구동해봤다. 하지만 아직까지 일반적인 프로젝트조차 진행하기 힘들다. 이번 시간에는 `.js`파일에서 import 하여 사용할 수 있는 file 처리를 적용해보자.

## 이미지 삽입하기

랜더링 하고싶은 이미지를 `./src` 디렉토리에 저장하자. 나는 `.png` 파일과 `.jpg`파일 두개를 준비했다.

**png**
<img src="https://user-images.githubusercontent.com/34260967/149070047-bb7a36d0-15eb-4fba-bfde-a660684f8271.png" width="200px" height="200px">

**jpg**
<img src="https://user-images.githubusercontent.com/34260967/149077300-99b9660b-ce51-41ff-b9c1-b86c4c6d28b8.jpg" width="200px" height="200px">


저장된 이미지는 `App.js`에서 import 하여 사용할 수 있어야한다. `App.js`에 이미지 컴포넌트를 적용해보자.

**App.js**
```javascript
import React from "react";
import "./App.css";
import testimage from "./testimage2.png";
import testimage2 from "./194_bartsimpson1.jpg"

const TestPNGImage = () => {
  return (
    <img
      src={testimage}
      alt=""
    />
  );
};

const TestJPGImage2 = () => {
  return (
    <img
      src={testimage2}
      alt=""
    />
  )
}

const App = () => {
  return (
    <div className="app-wrapper">
      <div className="app">React App Without CRA!-----!</div>{" "}
      <TestPNGImage />
      <TestJPGImage2 />
    </div>
  );
};

export default App;

```

아직 이미지파일을 처리하는 작업은 하지 않았다. 이대로 서버를 실행해보자.

```
Compiled with problems:X

ERROR in ./src/testimage2.png 1:0

Module parse failed: Unexpected character '�' (1:0)
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
(Source code omitted for this binary file)
```

실행을 하니 다음과 같은 에러를 `webpack-dev-server`에서 알려준다. 파일처리에 필요한 loader를 설치 및 사용하지 않아서 이미지파일이 번들링 되지않아 컴파일에서도 오류를 던지는거 같다. 그렇다면 파일처리를 하는 loader를 설치하여 문제를 해결하자.

## file-loader ?

**webpack version4에서 사용하는 방법입니다**
**이 프로젝트는 version 5를 사용하므로 설명만 하고 적용하진 않습니다**

webpack version 4에서는 외부파일을 import하기 위해선 `file-loader`가 필요했다.

file-loader : https://v4.webpack.js.org/loaders/file-loader/

```
npm install --save-dev file-loader
```

내가 저장한 이미지의 파일확장자는 `.png`이다. 이 외에도 일반적인 이미지 파일을 `.jpg`,`.jpeg`,`.gif`가 있다. 이와같은 이미지파일을 처리하기 위해서는 `webpack.config.js`에 `rule`을 정의해주어야한다.

```javascript
{
    test: /\.(png|jpe?g|gif)$/i,
    use: [
        {
            loader: 'file-loader',
        },
    ],
},
```

이는 옵션없이 가장 기본적인 `file-loader`의 모습이다. `rules`에 추가해서 loader를 적용하면 처리할 수 있다.


## asset/resource

webpack version 5로 넘어오면서 loader를 추가로 구성하지 않아도 asset(폰트, 이미지, 아이콘 등)을 처리할 수 있게되었다. 

webpack5 asset : https://webpack.kr/guides/asset-modules/

webpack에서 모듈을 이미 지원하고 있기 때문에, 따로 설치할 필요가 없다. `webpack.config.js`의 `rules`에 추가해서 적용해주자.

```javascript
{
    test: /\.(png|jpe?g)$/,
    type: "asset/resource",
},
```

build를 해서 확인해보자

![image](https://user-images.githubusercontent.com/34260967/149076795-1f02517e-df84-416e-ac92-ec5512df3787.png)

위와 같은 파일이 생성되었다. `.png`, `.jpg`파일이 잘 처리되어 번들링 된 모습이다. 파일이름이 해쉬값으로 지정되어있지만, 사용자가 직접 정의해줄 수도 있다. 이는 공식문서에 잘 소개되어있으니, 위의 링크에서 확인해보자.


## 결과

이제 서버를 구동시켜 잘 랜더링 되는지 확인해보자.

<img src="https://user-images.githubusercontent.com/34260967/149077635-531fa060-5472-4ba9-97c3-d87defb7accb.png" width="100%">

잘된다..!! 다음엔 타입스크립트를 적용해보자.


