# Columnia Pure CSS Example

이 예제는 Columnia 테이블 컴포넌트를 순수 CSS로 스타일링하는 방법을 보여줍니다.

## 특징

- 순수 CSS로 스타일링된 테이블
- 커스텀 컨트롤러 UI
- 반응형 디자인
- 드래그 앤 드롭 컬럼 재정렬
- 컬럼 선택/해제 기능

## 실행 방법

1. 프로젝트 루트 디렉토리에서 다음 명령어를 실행하여 의존성을 설치합니다:

```bash
npm install
```

2. 개발 서버를 시작합니다:

```bash
npm run dev
```

3. 브라우저에서 `http://localhost:5173`으로 접속하여 예제를 확인할 수 있습니다.

## 스타일링

이 예제에서는 다음과 같은 CSS 기능들을 사용했습니다:

- Flexbox를 사용한 레이아웃
- CSS 변수를 사용한 색상 관리
- 반응형 디자인을 위한 미디어 쿼리
- CSS 전환 효과
- 호버 상태 스타일링

## 커스터마이징

`src/styles.css` 파일을 수정하여 테이블의 스타일을 변경할 수 있습니다. 주요 스타일 클래스는 다음과 같습니다:

- `.table-container`: 테이블 전체 컨테이너
- `.table-controller`: 컬럼 필터 컨트롤러
- `.column-filters`: 컬럼 필터 목록
- `.column-filter`: 개별 컬럼 필터
- `.table-wrapper`: 테이블 래퍼
- `table`, `th`, `td`: 테이블 기본 요소
