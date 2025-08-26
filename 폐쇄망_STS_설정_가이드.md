# 폐쇄망 환경 STS4 완전 설정 가이드
## C:\Users\Public\FDX\STS 기준

### 📁 폴더 구조 (권장)
```
C:\Users\Public\FDX\STS\
├── sts-bundle\                    # STS4 메인 설치 폴더
│   ├── SpringToolSuite4.exe
│   ├── SpringToolSuite4.ini      # ← 이 파일을 STS_FINAL.ini로 교체
│   └── plugins\
├── java\                         # JDK 1.8 설치
│   └── jdk1.8.0_181\
│       └── jre\bin\javaw.exe
├── lombok\                       # Lombok 설치
│   └── lombok.jar
├── gradle\                       # Gradle 캐시 (로컬)
│   └── cache\
├── maven\                        # Maven 저장소 (로컬)
│   └── repository\
└── workspace\                    # STS4 워크스페이스
    └── .metadata\
```

### 🔧 1단계: 폴더 구조 생성
```batch
mkdir "C:\Users\Public\FDX\STS"
mkdir "C:\Users\Public\FDX\STS\java"
mkdir "C:\Users\Public\FDX\STS\lombok"
mkdir "C:\Users\Public\FDX\STS\gradle\cache"
mkdir "C:\Users\Public\FDX\STS\maven\repository"
mkdir "C:\Users\Public\FDX\STS\workspace"
```

### 📦 2단계: 필수 파일 설치

#### A. JDK 1.8 설치
- `jdk1.8.0_181` 폴더를 `C:\Users\Public\FDX\STS\java\` 에 복사
- 경로 확인: `C:\Users\Public\FDX\STS\java\jdk1.8.0_181\jre\bin\javaw.exe`

#### B. Lombok 설치
- `lombok.jar` 파일을 `C:\Users\Public\FDX\STS\lombok\` 에 복사
- 경로 확인: `C:\Users\Public\FDX\STS\lombok\lombok.jar`

#### C. STS4 설치
- STS4 전체 폴더를 `C:\Users\Public\FDX\STS\sts-bundle\` 에 복사

### ⚙️ 3단계: STS.ini 설정

#### A. 기존 파일 백업
```batch
copy "C:\Users\Public\FDX\STS\sts-bundle\SpringToolSuite4.ini" "C:\Users\Public\FDX\STS\sts-bundle\SpringToolSuite4.ini.backup"
```

#### B. 새 설정 적용
`STS_FINAL.ini` 파일을 `C:\Users\Public\FDX\STS\sts-bundle\SpringToolSuite4.ini`로 복사

### 🔍 4단계: 경로 확인

#### A. Java 경로 확인
```batch
dir "C:\Users\Public\FDX\STS\java\jdk1.8.0_181\jre\bin\javaw.exe"
```

#### B. Lombok 경로 확인
```batch
dir "C:\Users\Public\FDX\STS\lombok\lombok.jar"
```

#### C. STS 실행 파일 확인
```batch
dir "C:\Users\Public\FDX\STS\sts-bundle\SpringToolSuite4.exe"
```

### 🚀 5단계: STS4 실행

#### A. 워크스페이스 초기화 (에러 발생 시)
```batch
rmdir /s /q "C:\Users\Public\FDX\STS\workspace\.metadata"
```

#### B. STS4 실행
```batch
cd "C:\Users\Public\FDX\STS\sts-bundle"
SpringToolSuite4.exe -data "C:\Users\Public\FDX\STS\workspace"
```

### 📋 6단계: 프로젝트 설정

#### A. Gradle 프로젝트 설정
STS4 실행 후:
1. `Window` → `Preferences` → `Gradle`
2. `Gradle User Home`: `C:\Users\Public\FDX\STS\gradle\cache`
3. `Offline Mode` 체크 (폐쇄망)

#### B. Maven 프로젝트 설정
1. `Window` → `Preferences` → `Maven` → `User Settings`
2. `Local Repository`: `C:\Users\Public\FDX\STS\maven\repository`

### 🔧 7단계: 문제 해결

#### A. exit code=1 에러 해결
1. **경로 확인**: 모든 경로가 정확한지 확인
2. **권한 확인**: 관리자 권한으로 실행
3. **워크스페이스 초기화**: `.metadata` 폴더 삭제
4. **Java 버전 확인**: JDK 1.8 정상 설치 확인

#### B. Lombok 에러 해결
1. **JAR 파일 확인**: lombok.jar 파일 존재 확인
2. **경로 확인**: 경로에 공백이나 특수문자 없음 확인
3. **STS 재시작**: 설정 변경 후 STS 재시작

#### C. Gradle 빌드 에러 해결
1. **캐시 초기화**: `C:\Users\Public\FDX\STS\gradle\cache` 삭제
2. **Offline Mode**: 폐쇄망에서는 반드시 체크
3. **로컬 의존성**: 필요한 JAR 파일들을 로컬에 미리 복사

### ✅ 8단계: 최종 확인

#### A. 정상 실행 확인
- STS4가 정상적으로 시작되는지 확인
- Java 버전이 1.8로 표시되는지 확인
- Lombok이 정상 로드되는지 확인

#### B. 프로젝트 빌드 확인
- Gradle 프로젝트 정상 빌드 확인
- Maven 프로젝트 정상 빌드 확인
- 의존성 다운로드 없이 빌드되는지 확인

### 📝 주의사항

1. **경로 구분자**: Windows에서는 `\` 사용 (STS.ini에서도)
2. **공백 경로**: 경로에 공백이 있으면 따옴표로 감싸기
3. **권한**: 관리자 권한으로 실행 권장
4. **방화벽**: 폐쇄망에서는 외부 접근 차단 확인
5. **캐시**: 로컬 캐시 사용으로 외부 의존성 제거

### 🎯 완료 체크리스트

- [ ] 폴더 구조 생성 완료
- [ ] JDK 1.8 설치 완료
- [ ] Lombok 설치 완료
- [ ] STS4 설치 완료
- [ ] STS.ini 설정 완료
- [ ] 경로 확인 완료
- [ ] STS4 정상 실행 확인
- [ ] 워크스페이스 설정 완료
- [ ] Gradle 설정 완료
- [ ] Maven 설정 완료
- [ ] 프로젝트 빌드 테스트 완료

이 설정으로 폐쇄망 환경에서도 STS4 + JDK 1.8 + Lombok + 로컬 Gradle/Maven 캐시로 안전하게 빌드 가능합니다! 🚀