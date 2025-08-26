# Spring Tool Suite 4 Troubleshooting Guide

## 문제 해결 방법

### 1. 주요 문제점들

**현재 상황:**
- Windows용 설정을 Linux에서 사용하려고 함
- JDK 1.8 설정을 OpenJDK 21에서 사용하려고 함
- Windows 경로를 Linux에서 사용하려고 함

### 2. 해결 방법

#### A. STS4 설치 확인
```bash
# STS4가 설치되어 있는지 확인
ls -la /opt/spring-tool-suite-4/
# 또는
find / -name "SpringToolSuite4" 2>/dev/null
```

#### B. Java 버전 확인
```bash
java -version
# OpenJDK 21이 설치되어 있음 (호환됨)
```

#### C. 올바른 설정 파일 사용
- `sts4.ini` 파일을 STS4 설치 디렉토리에 복사
- Windows용 설정 대신 Linux용 설정 사용

### 3. 수동 설치 방법

#### A. STS4 다운로드
```bash
# STS4 다운로드
wget https://download.springsource.com/release/STS4/4.31.0.RELEASE/dist/e4.35/spring-tool-suite-4-4.31.0.RELEASE-e4.35.0-linux.gtk.x86_64.tar.gz

# 압축 해제
tar -xzf spring-tool-suite-4-4.31.0.RELEASE-e4.35.0-linux.gtk.x86_64.tar.gz

# 설치 디렉토리로 이동
sudo mv sts-4.31.0.RELEASE /opt/spring-tool-suite-4
```

#### B. 설정 파일 적용
```bash
# sts4.ini 파일을 STS4 설치 디렉토리에 복사
sudo cp sts4.ini /opt/spring-tool-suite-4/SpringToolSuite4.ini
```

### 4. 실행 방법

#### A. 스크립트 사용
```bash
./start-sts4.sh
```

#### B. 직접 실행
```bash
cd /opt/spring-tool-suite-4
./SpringToolSuite4
```

### 5. 추가 문제 해결

#### A. 권한 문제
```bash
# 실행 권한 부여
sudo chmod +x /opt/spring-tool-suite-4/SpringToolSuite4
```

#### B. 메모리 문제
- `sts4.ini`에서 `-Xmx4096m` 값을 시스템 메모리에 맞게 조정

#### C. Java 경로 문제
```bash
# Java 경로 확인
which java
# 필요시 JAVA_HOME 설정
export JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64
```

### 6. 로그 확인
```bash
# STS4 로그 확인
tail -f ~/.metadata/.log
```

### 7. 완전한 재설치
문제가 지속되면:
1. 기존 STS4 제거
2. 새로운 버전 다운로드
3. 위의 설정 적용
4. 워크스페이스 초기화

## 주의사항
- Lombok 설정은 제거했습니다 (Linux 환경에서 불필요)
- 메모리 설정을 4GB로 증가했습니다
- Linux용 launcher 라이브러리를 사용합니다