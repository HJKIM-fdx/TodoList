@echo off
chcp 65001 >nul
echo ========================================
echo    폐쇄망 STS4 자동 설정 스크립트
echo ========================================
echo.

echo [1/8] 폴더 구조 생성 중...
if not exist "C:\Users\Public\FDX\STS" mkdir "C:\Users\Public\FDX\STS"
if not exist "C:\Users\Public\FDX\STS\java" mkdir "C:\Users\Public\FDX\STS\java"
if not exist "C:\Users\Public\FDX\STS\lombok" mkdir "C:\Users\Public\FDX\STS\lombok"
if not exist "C:\Users\Public\FDX\STS\gradle\cache" mkdir "C:\Users\Public\FDX\STS\gradle\cache"
if not exist "C:\Users\Public\FDX\STS\maven\repository" mkdir "C:\Users\Public\FDX\STS\maven\repository"
if not exist "C:\Users\Public\FDX\STS\workspace" mkdir "C:\Users\Public\FDX\STS\workspace"
echo ✓ 폴더 구조 생성 완료
echo.

echo [2/8] Java 경로 확인 중...
if exist "C:\Users\Public\FDX\STS\java\jdk1.8.0_181\jre\bin\javaw.exe" (
    echo ✓ Java 경로 확인 완료
) else (
    echo ✗ Java 경로를 찾을 수 없습니다: C:\Users\Public\FDX\STS\java\jdk1.8.0_181\jre\bin\javaw.exe
    echo   JDK 1.8을 해당 경로에 설치해주세요.
    pause
    exit /b 1
)
echo.

echo [3/8] Lombok 경로 확인 중...
if exist "C:\Users\Public\FDX\STS\lombok\lombok.jar" (
    echo ✓ Lombok 경로 확인 완료
) else (
    echo ✗ Lombok JAR 파일을 찾을 수 없습니다: C:\Users\Public\FDX\STS\lombok\lombok.jar
    echo   lombok.jar 파일을 해당 경로에 복사해주세요.
    pause
    exit /b 1
)
echo.

echo [4/8] STS4 실행 파일 확인 중...
if exist "C:\Users\Public\FDX\STS\sts-bundle\SpringToolSuite4.exe" (
    echo ✓ STS4 실행 파일 확인 완료
) else (
    echo ✗ STS4 실행 파일을 찾을 수 없습니다: C:\Users\Public\FDX\STS\sts-bundle\SpringToolSuite4.exe
    echo   STS4를 해당 경로에 설치해주세요.
    pause
    exit /b 1
)
echo.

echo [5/8] 기존 STS.ini 백업 중...
if exist "C:\Users\Public\FDX\STS\sts-bundle\SpringToolSuite4.ini" (
    copy "C:\Users\Public\FDX\STS\sts-bundle\SpringToolSuite4.ini" "C:\Users\Public\FDX\STS\sts-bundle\SpringToolSuite4.ini.backup" >nul
    echo ✓ 기존 설정 백업 완료
) else (
    echo ! 기존 STS.ini 파일이 없습니다.
)
echo.

echo [6/8] 새 STS.ini 설정 적용 중...
if exist "STS_FINAL.ini" (
    copy "STS_FINAL.ini" "C:\Users\Public\FDX\STS\sts-bundle\SpringToolSuite4.ini" >nul
    echo ✓ 새 설정 적용 완료
) else (
    echo ✗ STS_FINAL.ini 파일을 찾을 수 없습니다.
    echo   현재 디렉토리에 STS_FINAL.ini 파일이 있는지 확인해주세요.
    pause
    exit /b 1
)
echo.

echo [7/8] 워크스페이스 초기화 중...
if exist "C:\Users\Public\FDX\STS\workspace\.metadata" (
    rmdir /s /q "C:\Users\Public\FDX\STS\workspace\.metadata" >nul 2>&1
    echo ✓ 워크스페이스 초기화 완료
) else (
    echo ! 워크스페이스가 이미 초기화되어 있습니다.
)
echo.

echo [8/8] 설정 완료!
echo.
echo ========================================
echo    설정이 완료되었습니다!
echo ========================================
echo.
echo 📁 설치 경로: C:\Users\Public\FDX\STS
echo 🚀 실행 방법: C:\Users\Public\FDX\STS\sts-bundle\SpringToolSuite4.exe
echo 📋 워크스페이스: C:\Users\Public\FDX\STS\workspace
echo.
echo STS4를 실행하시겠습니까? (Y/N)
set /p choice=
if /i "%choice%"=="Y" (
    echo STS4를 시작합니다...
    cd /d "C:\Users\Public\FDX\STS\sts-bundle"
    start SpringToolSuite4.exe -data "C:\Users\Public\FDX\STS\workspace"
) else (
    echo 설정이 완료되었습니다. 수동으로 STS4를 실행해주세요.
)
echo.
pause