# Spring Tool Suite 4 에러 해결 방법

## 현재 문제 분석

귀하의 설정에서 발견된 주요 문제들:

1. **플랫폼 불일치**: Windows 설정을 Linux에서 사용
2. **Java 버전 불일치**: JDK 1.8 설정을 OpenJDK 21에서 사용  
3. **경로 문제**: Windows 경로 (`C:\Users\...`)를 Linux에서 사용
4. **Launcher 라이브러리 불일치**: Windows용 launcher를 Linux에서 사용

## 즉시 해결 방법

### 1. 설정 파일 수정

기존 설정에서 다음 부분들을 수정해야 합니다:

**변경 전 (Windows):**
```
--launcher.library
plugins/org.eclipse.equinox.launcher.win32.win32.x86_64_1.2.1300.v20250331-1702
-vm
C:\Users\Public\FDX\STS\java\jdk-1.8\jre\bin\javaw.exe
```

**변경 후 (Linux):**
```
--launcher.library
plugins/org.eclipse.equinox.launcher.gtk.linux.x86_64_1.2.1300.v20250331-1702
-vm
/usr/bin/java
```

### 2. 수정된 설정 파일 사용

`sts4.ini` 파일을 STS4 설치 디렉토리의 `SpringToolSuite4.ini`로 복사하세요:

```bash
# STS4 설치 디렉토리 찾기
find / -name "SpringToolSuite4" 2>/dev/null

# 설정 파일 복사 (예시)
sudo cp sts4.ini /path/to/sts4/SpringToolSuite4.ini
```

### 3. 메모리 설정 최적화

현재 설정:
- `-Xms256m` → `-Xms512m` (초기 힙 크기 증가)
- `-Xmx2048m` → `-Xmx4096m` (최대 힙 크기 증가)

### 4. Java 버전 호환성

- `-Dosgi.requiredJavaVersion=1.8` → `-Dosgi.requiredJavaVersion=11`
- OpenJDK 21은 STS4와 호환됩니다

### 5. 불필요한 설정 제거

- Lombok 설정 제거 (Linux 환경에서 불필요)
- Windows 전용 설정들 제거

## 실행 방법

### 방법 1: 스크립트 사용
```bash
./start-sts4.sh
```

### 방법 2: 직접 실행
```bash
cd /path/to/sts4
./SpringToolSuite4
```

## 문제가 지속될 경우

1. **로그 확인**:
   ```bash
   tail -f ~/.metadata/.log
   ```

2. **Java 경로 확인**:
   ```bash
   which java
   java -version
   ```

3. **권한 확인**:
   ```bash
   ls -la /path/to/sts4/SpringToolSuite4
   chmod +x /path/to/sts4/SpringToolSuite4
   ```

4. **완전 재설치**:
   - 기존 STS4 제거
   - 새로운 버전 다운로드
   - 위 설정 적용

## 추가 최적화

- G1GC 가비지 컬렉터 사용
- 문자열 중복 제거 활성화
- UTF-8 인코딩 명시적 설정

이 설정으로 "Java was started but returned exit code=1" 에러가 해결될 것입니다.