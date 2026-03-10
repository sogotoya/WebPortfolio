#pragma once
#include "../Base/Base.h"
class EndRoll :public Base {
private:

	//エンドロールが下降するスピード
	const float EndRoll_Speed = 1;

	//画像
	CImage endimg;

public:
	EndRoll(const CVector2D& p);
	void Update();
	void Draw();
};