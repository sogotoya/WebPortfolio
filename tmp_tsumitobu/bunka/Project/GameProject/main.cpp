#include "Base/Base.h"
#include "Game/Player.h"
#include "Game/Map.h"
#include "Game/sikaku.h"
#include "Game/L.h"
#include "Game/Block.h"
#include "Game/maru.h"
#include "Game/BlockManager.h"
#include "Game/Goal.h"
#include "Game/count.h"
#include "Game/Game.h"
#include "Game/GameData.h"	
#include "Game/Effect.h"
#include "TItle/TItle.h"
#include "Game/Field.h"
//--------------------------------------------
//グローバル変数領域
//--------------------------------------------






void MainLoop(void) {
	//--------------------------------------------------------------
	//ゲーム中の動きはここに書く
	//ゲーム中はこの関数_を1秒間に60回呼び出している
	//--------------------------------------------------------------
	Base::CheckKillAll();
	Base::UpdateAll();
	Base::CollisionAll();
	Base::DrawAll();

}
void Init(void)
{

	CFPS::SetFPS(60);
	//フレーム制御初期化
	CFPS::Init();
	//ボタンの設定
	CInput::Init();
	CInput::SetButton(0, CInput::eButton1, 'Z');
	CInput::SetButton(0, CInput::eButton2, 'X');
	CInput::SetButton(0, CInput::eButton3, 'C');
	CInput::SetButton(0, CInput::eButton4, 'V');
	CInput::SetButton(0, CInput::eButton5, VK_SPACE);
	CInput::SetButton(0, CInput::eButton10, VK_RETURN);
	CInput::SetButton(0, CInput::eUp,' ');
	CInput::SetButton(0, CInput::eDown, VK_DOWN);
	CInput::SetButton(0, CInput::eLeft, 'A');
	CInput::SetButton(0, CInput::eRight, 'D');
	CInput::SetButton(0, CInput::eMouseL, VK_LBUTTON);
	CInput::SetButton(0, CInput::eMouseR, VK_RBUTTON);
	CInput::SetButton(0, CInput::eMouseC, VK_MBUTTON);

	CInput::SetButton(1, CInput::eButton1, 'Z');
	CInput::SetButton(1, CInput::eButton2, 'X');
	CInput::SetButton(1, CInput::eButton3, 'S');
	CInput::SetButton(1, CInput::eButton4, 'V');
	CInput::SetButton(1, CInput::eButton5, 'E');
	CInput::SetButton(1, CInput::eButton10, VK_RETURN);
	CInput::SetButton(1, CInput::eUp, VK_UP);
	CInput::SetButton(1, CInput::eDown, VK_DOWN);
	CInput::SetButton(1, CInput::eLeft, VK_LEFT);
	CInput::SetButton(1, CInput::eRight, VK_RIGHT);
	CInput::SetButton(1, CInput::eMouseL, VK_LBUTTON);
	CInput::SetButton(1, CInput::eMouseR, VK_RBUTTON);
	CInput::SetButton(1, CInput::eMouseC, VK_MBUTTON);
	CInput::Update();
	CInput::Update();



	SetCurrentDirectory("data");
	CSound::GetInstance();

	//-----------------------------------------------------
	//初期化の命令を書く
	//ゲーム起動時に一度だけ呼ばれる
	//-----------------------------------------------------
	//乱数の種
	srand(time(NULL));
	ADD_RESOURCE("Player", CImage::CreateImage("Image/Player.png", player_anim_data, 16, 16));
	ADD_RESOURCE("Player1", CImage::CreateImage("Image/Player2.png", player_anim_data, 16, 16));
	ADD_RESOURCE("Map_Tip", CImage::CreateImage("Image/MapTip1.png"));
	ADD_RESOURCE("Goal", CImage::CreateImage("Image/Goal.png"));
	ADD_RESOURCE("Goal1", CImage::CreateImage("Image/Goal.png"));
	ADD_RESOURCE("Goal2", CImage::CreateImage("Image/Goal.png"));
	ADD_RESOURCE("Goal3", CImage::CreateImage("Image/Goal.png"));
	ADD_RESOURCE("Effect_Jump", CImage::CreateImage("Image/moku.png", effect_anim_data,32, 32));
	ADD_RESOURCE("TItle", CImage::CreateImage("Image/title.png"));
	ADD_RESOURCE("Retry", CImage::CreateImage("Image/Retry.png"));
	ADD_RESOURCE("GameClear", CImage::CreateImage("Image/GameClear.png"));
	ADD_RESOURCE("stage1goal", CImage::CreateImage("Image/1st clear.png"));
	ADD_RESOURCE("stage2goal", CImage::CreateImage("Image/2st clear.png"));
	ADD_RESOURCE("GameClear", CImage::CreateImage("Image/GameClear.png"));
	ADD_RESOURCE("GameOver", CImage::CreateImage("Image/GameOver.png"));
	ADD_RESOURCE("zanki", CImage::CreateImage("Image/corsa2.png"));
	ADD_RESOURCE("zanki2", CImage::CreateImage("Image/corsa1.png"));
	ADD_RESOURCE("zanki3", CImage::CreateImage("Image/jumptobu.png"));
    ADD_RESOURCE("kumo", CImage::CreateImage("Image/kumo.png"));
	ADD_RESOURCE("aozora", CImage::CreateImage("Image/aoisora.png"));
	ADD_RESOURCE("yuugata", CImage::CreateImage("Image/yuugata.png"));
	ADD_RESOURCE("yuugatakumo", CImage::CreateImage("Image/yuugatakumo.png"));
	ADD_RESOURCE("murasakikumo", CImage::CreateImage("Image/murasakikumo.png"));
	ADD_RESOURCE("stage6", CImage::CreateImage("Image/stage6.png"));
	ADD_RESOURCE("stage7", CImage::CreateImage("Image/stage7.png"));
	ADD_RESOURCE("stage8", CImage::CreateImage("Image/stage8.png"));
	ADD_RESOURCE("stage9", CImage::CreateImage("Image/stage9.png"));
	ADD_RESOURCE("stage10", CImage::CreateImage("Image/stage10.png"));
	ADD_RESOURCE("Waku", CImage::CreateImage("Image/waku.png"));
	ADD_RESOURCE("Maru", CImage::CreateImage("Image/maru.png"));
	ADD_RESOURCE("murasaki", CImage::CreateImage("Image/murasaki.png"));
	ADD_RESOURCE("D key", CImage::CreateImage("Image/D key.png")); 
	ADD_RESOURCE("A key", CImage::CreateImage("Image/A key.png"));
	ADD_RESOURCE("Space key", CImage::CreateImage("Image/Space key.png"));
	ADD_RESOURCE("R key", CImage::CreateImage("Image/R key.png"));
	ADD_RESOURCE("L key", CImage::CreateImage("Image/L key.png"));
	ADD_RESOURCE("U key", CImage::CreateImage("Image/U key.png"));
	ADD_RESOURCE("Down key", CImage::CreateImage("Image/Down key.png"));
	ADD_RESOURCE("Red window", CImage::CreateImage("Image/Red window .png"));
	ADD_RESOURCE("Red Side window", CImage::CreateImage("Image/Red Side window  .png"));
	ADD_RESOURCE("stop", CImage::CreateImage("Image/stop.png"));
	ADD_RESOURCE("skip", CImage::CreateImage("Image/skip.png"));
	SOUND("title")->Load("Sound/BGM/House_01.wav", 10);
	SOUND("Tutorial")->Load("Sound/BGM/Ska_03.wav", 10);
	SOUND("stage1")->Load("Sound/BGM/Short.wav", 10);
	SOUND("stage2")->Load("Sound/BGM/sute2.wav", 10);
	SOUND("stage3")->Load("Sound/BGM/Rock.wav", 10);
	SOUND("stage4")->Load("Sound/BGM/sute4.wav", 10);
	SOUND("stage5")->Load("Sound/BGM/Trance_01.wav", 10);
	ADD_RESOURCE("end", CImage::CreateImage("Image/nagakawa.png"));
	Base::Add(new TItle());
	ADD_RESOURCE("stagewaku1", CImage::CreateImage("Image/stage1.png"));
	ADD_RESOURCE("map2", CImage::CreateImage("Image/stage2.png"));
	ADD_RESOURCE("map3", CImage::CreateImage("Image/stage3.png"));
	ADD_RESOURCE("map4", CImage::CreateImage("Image/stage4.png"));
	ADD_RESOURCE("map5", CImage::CreateImage("Image/stage5.png"));
	ADD_RESOURCE("map6", CImage::CreateImage("Image/stage6.png"));
	ADD_RESOURCE("map7", CImage::CreateImage("Image/stage7.png"));
	ADD_RESOURCE("map8", CImage::CreateImage("Image/stage8.png"));
	ADD_RESOURCE("map9", CImage::CreateImage("Image/stage9.png"));
	ADD_RESOURCE("map10", CImage::CreateImage("Image/stage10.png"));
	SOUND("jump")->Load("Sound/SE/8bitjump.wav", 10);
	SOUND("sentaku")->Load("Sound/SE/sentaku7.wav", 10);
	SOUND("Roll")->Load("Sound/BGM/retrogamecenter.wav", 10);
	ADD_RESOURCE("?", CImage::CreateImage("Image/maphatena.png"));
	ADD_RESOURCE("kakusu", CImage::CreateImage("Image/kakusu.png"));
}


void Release()
{
	CLoadThread::ClearInstance();
	CSound::ClearInstance();
	CResourceManager::ClearInstance();
}

static void ResizeCallback(GLFWwindow* window, int w, int h)
{
	glViewport(0, 0, w, h);

	//画面解像度変動
	CCamera::GetCamera()->SetSize((float)w, (float)h);
	//画面解像度固定
	//CCamera::GetCamera()->SetSize(SCREEN_WIDTH, SCREEN_HEIGHT);

	CCamera::GetCamera()->Viewport(0, 0, w, h);
	CCamera::GetCurrent()->Perspective(DtoR(60.0), (float)w / (float)h, 1.0, 1000.0);

	glfwGetWindowPos(window, &GL::window_x, &GL::window_y);
	GL::UpdateWindowRect(GL::window_x, GL::window_y, w, h);
	CInput::UpdateClipCursor(true);

}
static void WheelCallback(GLFWwindow* _window, double _offsetx, double _offsety) {
	CInput::AddMouseWheel((int)_offsety);

}
static void PosCallback(GLFWwindow* _window, int x, int y) {
	GL::window_x = x;
	GL::window_y = y;
	GL::UpdateWindosRect(x, y, GL::window_width, GL::window_height);
	CInput::UpdateClipCursor(true);

}
static void FocusCallback(GLFWwindow* _window, int f) {
	CInput::UpdateClipCursor(f);
	GL::focus = f;
}

static void error_callback(int error, const char* description)
{
	printf("Error: %s\n", description);
}

//フルスクリーン?ウインドウモードの切り替え
//Alt+Enterで切り替える
void CheckFullScreen() {
	static int key_enter = 0;
	int key_enter_buf = key_enter;
	if (key_enter_buf ^ (key_enter = glfwGetKey(GL::window, GLFW_KEY_ENTER)) && key_enter && (glfwGetKey(GL::window, GLFW_KEY_LEFT_ALT) || glfwGetKey(GL::window, GLFW_KEY_RIGHT_ALT))) {
		GL::ChangeFullScreen(!GL::full_screen);
	}
}

int __main(int* argcp, char** argv) {
	// メモリリーク検出
	//	_CrtSetDbgFlag(_CRTDBG_ALLOC_MEM_DF | _CRTDBG_LEAK_CHECK_DF | _CRTDBG_CHECK_ALWAYS_DF);
	//_CrtSetDbgFlag(_CRTDBG_ALLOC_MEM_DF | _CRTDBG_LEAK_CHECK_DF);


	//OpenGL4.3
	glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 4);
	glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 3);
	glfwWindowHint(GLFW_OPENGL_PROFILE, GLFW_OPENGL_CORE_PROFILE);


	glfwSetErrorCallback(error_callback);
	if (!glfwInit()) return -1;
	//	glutInit(argcp, argv);

	GL::window = glfwCreateWindow(SCREEN_WIDTH, SCREEN_HEIGHT, "Simple", nullptr, nullptr);
	glfwGetWindowSize(GL::window, &GL::window_width, &GL::window_height);
	glfwGetWindowPos(GL::window, &GL::window_x, &GL::window_y);

	glfwSetFramebufferSizeCallback(GL::window, ResizeCallback);
	glfwSetScrollCallback(GL::window, WheelCallback);
	glfwSetWindowFocusCallback(GL::window, FocusCallback);
	glfwSetWindowPosCallback(GL::window, PosCallback);
	if (!GL::window) {
		glfwTerminate();
		return -1;
	}

	glfwMakeContextCurrent(GL::window);
	glfwSwapInterval(1);
	ResizeCallback(GL::window, SCREEN_WIDTH, SCREEN_HEIGHT);

	GLenum err = glewInit();
	if (err == GLEW_OK) {
		printf("%s\n", glewGetString(GLEW_VERSION));
	}
	else {
		printf("%s\n", glewGetErrorString(err));
		getchar();
		return -1;
	}
	HDC glDc = wglGetCurrentDC();
	GL::hWnd = WindowFromDC(glDc);
	glClearColor(0.0, 0.0, 0.0, 1.0);

	glEnable(GL_DEPTH_TEST);
	glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);
	glEnable(GL_BLEND);//ブレンドの有効化
	glEnable(GL_CULL_FACE);
	glCullFace(GL_BACK);

	//固定シェーダー用
	glEnable(GL_LIGHTING);
	glEnable(GL_LIGHT0);

	glEnable(GL_ALPHA_TEST);

	Init();
	while (!glfwWindowShouldClose(GL::window)) {
		CheckFullScreen();


		CInput::Update();
		//各バッファーをクリア
		glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);

		MainLoop();


		glfwSwapBuffers(GL::window);


		CFPS::Wait();

		char title[32];
		sprintf_s(title, "summer");
		glfwSetWindowTitle(GL::window, title);

		glfwPollEvents();
		if (glfwGetKey(GL::window, GLFW_KEY_ESCAPE)) {
			glfwSetWindowShouldClose(GL::window, GL_TRUE);
		}

	}

	glfwTerminate();




	Release();
	return 0;
}

INT WINAPI WinMain(HINSTANCE, HINSTANCE, LPSTR argv, INT argc)
{
	return __main(&__argc, __argv);
}

int main(int argc, char** argv)
{
	return __main(&argc, argv);
}