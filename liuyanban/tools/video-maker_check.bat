liuyanban/tools/video-maker_check.bat 全读完了，共 28 行，请查收：

@echo off
set "F=C:\Users\Administrator\Desktop\我的网站\社区\video-maker\推广视频-60秒.html"

rem 检查第一行是否为 <!DOCTYPE html>
set /p FIRST=<"%F%"
echo FIRST_LINE="%FIRST%"
if "%FIRST%"=="<!DOCTYPE html>" (echo START_OK) else (echo START_FAIL)

rem 检查是否以 </html> 结尾
findstr /E /C:"</html>" "%F%" >nul && echo END_OK || echo END_FAIL

rem 检查场景时长：8 / 10 / 53
findstr /R "data-dur=.8." "%F%" >nul && echo DUR8_OK || echo DUR8_FAIL
findstr /R "data-dur=.10." "%F%" >nul && echo DUR10_OK || echo DUR10_FAIL
findstr /C:"var total=53" "%F%" >nul && echo TOTAL53_OK || echo TOTAL53_FAIL

rem 检查声音和波形相关代码
findstr /C:"AudioEngine.startBgm()" "%F%" >nul && echo BGM_OK || echo BGM_FAIL
findstr /C:"AudioEngine.stone()" "%F%" >nul && echo STONE_OK || echo STONE_FAIL
findstr /C:"AudioEngine.scene()" "%F%" >nul && echo SCENE_SFX_OK || echo SCENE_SFX_FAIL
findstr /R "id=.chatWave." "%F%" >nul && echo CHATWAVE_OK || echo CHATWAVE_FAIL
findstr /R "className=.mic-wave." "%F%" >nul && echo MICWAVE_OK || echo MICWAVE_FAIL

rem 检查是否还有日志污染
findstr /C:"file 1:" "%F%" >nul && echo POLL_FILE_FOUND || echo POLL_FILE_CLEAN
findstr /C:"conclusion:" "%F%" >nul && echo POLL_CONCLUSION_FOUND || echo POLL_CONCLUSION_CLEAN
findstr /C:"hasS1_8" "%F%" >nul && echo POLL_CHECK_FOUND || echo POLL_CHECK_CLEAN
findstr /C:"166: 163" "%F%" >nul && echo POLL_NUM_FOUND || echo POLL_NUM_CLEAN
