# 크시 2022 개발자 과제: 미니 크시 만들기

- **작성**: 키뮤 (@키뮤, 크시 팀장, 크시 기획 및 콘텐츠 개발 담당)

## 1. 개요

크시가 사용하는 기술을 활용하여 제시한 기능을 수행하는 디스코드 봇을 만들어 주세요. 주어진 조건은 실제 크시가 주로 사용하는 기술들이며, 실제 크시 개발에 익숙해질 수 있도록 연습하는 느낌의 어렵지 않은 난이도로 구성되어 있습니다.

개발 과정은 **퍼블릭 git 레포지토리를 통하여 공개**되어야 하며, 커밋 메시지 등의 개발 과정이 온전히 기록되어야 합니다. 개발 언어는 타입스크립트로 하며 패키지 매니저는 npm 대신 크시가 사용하는 **yarn `v3 이상`의 사용을 권장**합니다.


## 2. 라이브러리 요구사항
- **필수 라이브러리**
    - [x]  **discord.js `v14.3 이상`** (참고: [웹사이트](https://discord.js.org/#/), [가이드](https://discordjs.guide/#before-you-begin), [문서](https://discord.js.org/#/docs/discord.js/main/general/welcome), [레포지토리](https://github.com/discordjs/discord.js/))
    - [x]  **@pikokr/command.ts** `v5.3 이상` (버전에 주의해 주세요) (참고: [가이드](https://cts.pikokr.dev/next/tutorial/intro), [레포지토리](https://github.com/pikokr/command.ts), [**템플릿**](https://github.com/pikokr/command.ts-v5-template) - 참고하시면 좋습니다)
    - [x]  **mongoose `v6.5.3 이상`** (참고: [문서](https://mongoosejs.com/docs/guide.html))
    - [x]  **prettier** (참고: [웹사이트](https://prettier.io/))


        | printWidth | 100 |
        | --- | --- |
        | semi | false |
        | tabWidth | 2 |

- **데이터베이스**
    - [x]  **mongoDB** (참고: **[웹사이트](https://www.mongodb.com/home)**)

## 3. 구현해야 하는 기능/구조
- [x]  다음 타입스크립트 인터페이스의 구조와 주석의 내용을 참고하여 **mongoose 스키마로 구현**하세요.

    ```ts
    interface IUser {
      id: string
      username: string
      likability: number  // 기본값은 0
      battery: number  // 기본값은 100
      badges: mongoose.Types.ObjectId[] | IBadge[]
      verifiedAt?: Date
      getLikeLevel(): number  // 호감도를 토대로 호감 레벨을 구하는 메서드
    }
    
    interface IBadge {
      badgeId: number  // 배지의 종류
      owner: mongoose.Types.ObjectId | IUser
    }
    ```

    - 인터페이스의 타입을 일부 수정해도 괜찮습니다.
    - 호감 레벨의 기준은 직접 찾으셔야 합니다.

- [x]  `/핑`
    - [x]  `퐁!`이라 대답하며 현재 봇의 ping을 표시합니다.

- [x]  `크시야 <할 말>`
    - [x]  같은 키워드에 대한 반응이 여러 개일 경우 그 중 하나가 랜덤으로 등장합니다.
    - [x]  원래 크시는 데이터베이스에서 반응을 관리합니다만, 여기서는 반응 개수가 적으므로 반응 정보를 담은 컬렉션을 따로 파지 않고 반응 데이터를 변수에 직접 담아 사용하여도 괜찮습니다.
    - [x]  이 과제에서는 네 개의 반응만 구현하는 것을 목적으로 하지만, 실제 크시에서는 이러한 반응의 개수가 매우 많다는 점을 염두해 두어 구현해 주셨으면 좋겠습니다.
    - [ ]  **(선택)** 키워드와 완벽히 동일하지 않아도 비슷한 키워드로 연결되도록 해주세요.
      - 크시야 안녕?! → `안녕` 키워드로 인식
      - 크시야 안녕하세요 → `안녕` 키워드로 인식
    - [x]  **(선택)** 크시야 <수식>을 입력할 경우 계산해주는 기능


| 키워드 | 반응              | 호감도 증가량 |
|-----|-----------------|---------|
| 안녕  | 안녕하세요 (닉네임)님!   | 1       |
| 안녕  | 안녕하세요!          | 1       |
| 좋아해 | 저도 (닉네임)님이 좋아요! | 3       |
| 저리가 | …그런 말 하시면 슬퍼요…  | -2      |

- [x]  `/배지 <user: User(optional)>`
    - [x]  명령어를 쓴 유저가 **가지고 있는 배지의 목록을 보여주는 빗금 명령어**입니다.
    - [x]  뒤의 유저 옵션을 사용자가 입력한 경우 명령어를 사용한 유저가 아닌, 입력한 유저의 배지 정보를 보여줍니다.
    - [x]  배지의 목록은 Discord의 Select 컴포넌트를 사용하여 보여줘야 합니다.
    - [ ]  **(선택)** 배지가 Select 메뉴의 표시 제한 개수를 넘는 경우 Button 컴포넌트를 통해 페이지네이션을 할 수 있도록 구성합니다.
    - 실제 크시의 UI를 참고하시면 좋습니다.

- [x]  `/배지랭킹`
    - [x]  **배지를 많이 가지고 있는 순으로 상위 20명까지의 랭킹**을 보여주는 빗금 명령어입니다.
    - [x]  랭킹은 Discord의 Select 컴포넌트를 사용하여 보여줘야 합니다.
    - [x]  같은 개수의 배지를 가진 경우 **더욱 먼저 해당 개수를 달성한 사람을 더 높은 순위로 취급**합니다.
    - 실제 크시의 기능 작동 방식을 참고하시면 좋습니다.

  
## 4. 제출 및 일정
- [x]  **면접을 보신 후 과제를 확인하는 대로 이 레포지토리를 포크하여 프로젝트를 생성하신 후 `팀 크레센도 CAST` 채널에 레포지토리를 생성하였다고 저희에게 알려주세요.**
  - [x]  **반드시 포크하신 후 작업을 진행해주세요.**
  - [x]  포크하신 후 이 README.md 파일은 삭제하거나 수정하셔도 좋습니다.
- [x]  2022년 11월 26일 이전에 면접을 보신 분들의 과제 제출일은 **2022년 12월 9일 23시 59분**까지이며, 이 시간을 기준으로 이후에 이루어진 커밋은 과제 평가에 포함되지 않습니다.
- [x]  마감일보다 일찍 완성하신 경우에는 팀 크레센도 팀원 모집 이메일 ([recruit@crsd.team](mailto:recruit@crsd.team))로 레포지토리 링크를 제출해주세요.
- [x]  과제 내용에 관하여 질문이 있으신 경우 `팀 크레센도 CAST` 채널에 남겨주세요.
