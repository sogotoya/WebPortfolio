#pragma once
#include "../Base/Base.h"

class Tutorial :public Base {
	int Step = 0;
	CImage dimg;
	CImage aimg;
	CImage simg;
	CImage Rimg;
	CImage Limg;
	CImage Uimg;
	CImage Downimg;
	CImage wimg;
	CImage Swimg;
private:
	CFont m_Tutorial_text;
public:
	Tutorial();
	void Update();
	void Draw();
	//チュートリアルの進行度
	int TutorialProgress=0;
	//ボタンが押されたかどうか
	bool Is_Holded = false;
};