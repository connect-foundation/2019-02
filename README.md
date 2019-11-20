# dropy
<p>
<!-- version -->
  <img alt="Version" src="https://img.shields.io/badge/version-0.1.1-blue.svg?cacheSeconds=2592000" />
<!-- release -->
  <a href="https://github.com/connect-foundation/2019-02/releases">
    <img src="https://img.shields.io/github/release-date/connect-foundation/2019-02?color=orange">
  </a>
<!-- doc -->
  <a href="https://github.com/connect-foundation/2019-02/wiki" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
<!-- issue -->
  <a href="https://github.com/connect-foundation/2019-02/issues">
    <img alt="issue tracking" src="https://img.shields.io/github/issues/connect-foundation/2019-02"/>
  </a>
<!-- pr -->
  <a href="https://github.com/connect-foundation/2019-02/pulls">
    <img alt="pr tracking" src="https://img.shields.io/github/issues-pr/connect-foundation/2019-02"/>
  </a>
<!-- license -->
  <a href="https://github.com/connect-foundation/2019-02/blob/master/LICENSE.md" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>
<p align="middle">
    <img width="600" alt="dropy logo" src="https://user-images.githubusercontent.com/40539104/69215727-cf192200-0bad-11ea-89e0-e02852e2790b.png">
</p>


> Dropy는 쉽고 직관적인 사용자 인터랙션으로 ‘프레젠테이션 채널’이라는 가상 공간을 생성하여 스피커와 리스너 간 원활한 소통을 도와주는 온라인 서비스입니다.
> Dropy는 새로운 스피치 문화를 만들어 갑니다.

<br>


## 🐤 Official Home page
http://www.dropy.org

<br>

## 📝 Document
> 
- [위키](https://github.com/connect-foundation/2019-02/wiki)
- [기술적으로 고민한 부분들]()
- [dropy-converter 모듈 API]()

<br>

## 🔨 Usage
### 프로젝트 구성도
```bash
📦 .github/workflows             # CI/CD
📦 web                           # 프론트 서버
📦 server-api                    # API 서버
📦 server-converter              # 이미지 컨버터 서버
```

### 프로젝트 시작하기
> 각 폴더 별로 실행 시켜야 합니다.
#### 1. web
```bash
cd web
yarn install                     # 모듈 설치
yarn dev                         # 개발모드 시작
```

#### 2. server-api
```bash
cd server-api
yarn install                     # 모듈 설치
yarn dev                         # 개발모드 시작
```

#### 3. server-converter
```bash
brew install graphicsmagick gs   # OS 패키지 설치

cd server-converter
yarn install                     # 모듈 설치
yarn dev                         # 개발모드 시작
```

<br>

##  👨‍👨‍👧‍👧 Members

- 🐶**김도현** [(happydhKim)](https://github.com/happydhKim)
- 🐵**김재원** [(load0ne)](https://github.com/load0ne)
- 🦊**이미림** [(always-awake)](https://github.com/always-awake)
- 🐰**조애리** [(aereeeee)](https://github.com/aereeeee)

<br>

## 🤝 Contributing
> Be dropy's contributor!!

Contributions, issues and feature requests are welcome!<br />Feel free to check [📌issues page]( https://github.com/connect-foundation/2019-02/issues).

<br>

## 📝 License

Copyright © 2019 [dropy](https://github.com/connect-foundation/2019-02).  
This project is [MIT](https://github.com/connect-foundation/2019-02/blob/master/LICENSE.md) licensed.
