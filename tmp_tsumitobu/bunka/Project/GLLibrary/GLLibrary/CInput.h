/*!
*	@brief	キー入力クラス
*
*
**/
#pragma once

//ヘッダーファイルのインクルード
#define DIRECTINPUT_VERSION 0x0800

#include <dinput.h>
//必要なライブラリファイルのロード
#pragma comment(lib,"winmm.lib")
#pragma comment(lib,"dxguid.lib")
#pragma comment(lib,"dinput8.lib")


#include "windows.h"
#include "CVector.h"




#define PAD_MAX 5

class CInput {
public:
	enum E_STATE{
		ePush,		//押した瞬間
		eHold,		//押している
		ePull,		//離した瞬間
		eFree,		//離している
		eStateMax,
	};

	enum E_BUTTON {
		eButton1 = 0,
		eButton2,
		eButton3,
		eButton4,
		eButton5,
		eButton6,
		eButton7,
		eButton8,
		eButton9,
		eButton10,
		eButton11,
		eButton12,
		eButton13,
		eMouseL,
		eMouseR,
		eMouseC,
		eUp,
		eDown,
		eLeft,
		eRight,
		eKeyMax = 31
	};
	static unsigned char	m_key_code[PAD_MAX][eKeyMax];
	static unsigned char	m_pad_code[PAD_MAX][16];
	static unsigned long m_key_old[PAD_MAX];
	static unsigned long m_key_state[PAD_MAX][eStateMax];
	static CVector2D m_mouse_vec;
	static int		m_mouse_wheel;
	static int		m_mouse_wheelOld;
	static bool		m_mouse_inside;

	static LPDIRECTINPUT8 m_pDinput;
	static LPDIRECTINPUTDEVICE8 m_pMouse;
	struct SPadDevice{
		LPDIRECTINPUTDEVICE8 m_pPadDevice;
		DIJOYSTATE2 js;
		int no;
	};

	static SPadDevice m_device[PAD_MAX];
	static bool CALLBACK _padCallback(const LPDIDEVICEINSTANCE lpddi, LPVOID pvRef);
public:
	static bool Init();

	/*!
		@brief	キーの状態を検査
		@param	no		[in] コントローラー番号
		@param	state	[in] 状態
		@param	button	[in] ボタン
		@retval	true:指定した状態　false:指定した状態ではない
	**/
	static bool GetState(int no,CInput::E_STATE state, CInput::E_BUTTON button){
		return (m_key_state[no][state] & (1<<button))>0;
	}
	/*!
		@brief	キーの状態を強制設定
		@param	no		[in] コントローラー番号
		@param	state	[in] 状態
		@param	button	[in] ボタン
		@retval	無し
	**/
	static void SetState(int no, CInput::E_STATE state, CInput::E_BUTTON button){
		m_key_state[no][state] |= (1<<button);
	}

	/*!
		@brief	各ボタンに対応するキーを設定
		@param	no		[in] コントローラー番号
		@param	button	[in] ボタン
		@param	code	[in] キーコード
		@retval	無し
	**/
	static void SetButton(int no, CInput::E_BUTTON button, unsigned char code){
		m_key_code[no][button] = code;
	}
	/*!
		@brief	各ボタンに対応するキーを設定
		@param	no		[in] コントローラー番号
		@param	button	[in] ボタン
		@param	num		[in] パッドボタン
		@retval	無し
	**/
	static void SetPadButton(int no, CInput::E_BUTTON button, unsigned char num){
		m_pad_code[no][button] = num;
	}

	
	/*!
		@brief	マウスカーソルの座標を取得
		@retval	マウスカーソルの座標
	**/
	static CVector2D GetMousePoint() {
		POINT pt;
		//マウスの現在の座標を取得する
		GetCursorPos(&pt);
		ScreenToClient(GL::hWnd,&pt);

		return CVector2D((float)pt.x, (float)pt.y);
	}
	
	/*!
		@brief	マウスの移動量を取得
		@retval	マウスの移動量
	**/
	static CVector2D GetMouseVec() {
		return m_mouse_vec;
	}
	
	/*!
		@brief	マウスカーソルをウインドウ内に収めるフラグの設定
		@param	f		[in] true:ウインドウ内に収める
		@param	f		[in] true:ウインドウ内でカーソルがループする
		@retval	無し
	**/
	static void SetMouseInside(bool f);

	/*!
		@brief	マウスカーソルの表示設定
		@param	f		[in] true:表示　false:非表示
		@retval	無し
	**/
	static void ShowCursor(bool f) {
		 ::ShowCursor(f);
		 ::ShowCursor(f);
	}
	
	/*!
		@brief	マウスホイールの変化量取得
		@retval	マウスホイールの変化量
	**/
	static int GetMouseWheel() {
		return m_mouse_wheelOld;
	}
	/*!
		@brief	マウスホイールの変化量を加える
		@param	a		[in] 変化量
		@retval	無し
	**/
	static void AddMouseWheel(int a) {
		m_mouse_wheel+=a;
	}
	/*!
		@brief	パッドデータの取得
		@param	no		[in] コントローラ番号
		@retval	無し
	**/
	static DIJOYSTATE2* GetPadData(int no) {
		return (m_device[no].m_pPadDevice) ? &m_device[no].js : NULL;
	}
	/*!
		@brief	右スティックを取得
		@param	no		[in] コントローラ番号
		@retval Vec -1.0～1.0
	**/
	static CVector2D GetRStick(int no);
	/*!
		@brief	左スティックを取得
		@param	no		[in] コントローラ番号
		@retval Vec -1.0～1.0
	**/
	static CVector2D GetLStick(int no);
	/*!
		@brief	キーの状態を更新する
		@retval	無し
	**/
	static void Update();
	
	static float toFloat(int i){
		return ((float)i - (0x7FFF)) / 0x8000;
	};
	static void UpdateClipCursor(int f);
};

#define PUSH(key) CInput::GetState(0,CInput::ePush,key)
#define HOLD(key) CInput::GetState(0,CInput::eHold,key)
#define PULL(key) CInput::GetState(0,CInput::ePull,key)
#define FREE(key) CInput::GetState(0,CInput::eFree,key)


#define PUSH_PAD(id,key) CInput::GetState(id,CInput::ePush,key)
#define HOLD_PAD(id,key) CInput::GetState(id,CInput::eHold,key)
#define PULL_PAD(id,key) CInput::GetState(id,CInput::ePull,key)
#define FREE_PAD(id,key) CInput::GetState(id,CInput::eFree,key)