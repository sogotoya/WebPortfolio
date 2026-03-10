/*!
 *	@brief		FPS制御クラス
 *	
 */
#pragma once

#include <time.h>
#include <windows.h>

class CFPS {
	//時間計測用
	static LARGE_INTEGER freq;
	static LARGE_INTEGER time_buf;
	static int fps;
	static int m_Setfps;
	static float deltaTime;
public:
	/*!
		@brief	初期化を行う
		@retval	無し
	**/
	static void Init();

	/*!
		@brief	６０FPSになるよう待機する
		@retval	無し
	**/
	static void Wait();

	/*!
		@brief	現在のFPSを取得
		@retval	FPS
	**/
	static int GetFPS(){ return fps;}

	/*!
	@brief	現在のdeltaTimeを取得
	@retval	deltaTime
	**/
	static float GetDeltaTime() { return deltaTime; }
	static LONGLONG GetTimeCnt();
	///<summary>
	///<para>FPSを設定します</para>
	///<para>1～60まで設定できます</para>
	///</summary>
	static void SetFPS(int fps);

};

class Time {
public:
	static LARGE_INTEGER freq;
	static LARGE_INTEGER time_buf;
	static void Start();
	static float End();
};