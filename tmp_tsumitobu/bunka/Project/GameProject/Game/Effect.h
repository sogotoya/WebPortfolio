#pragma once
#include "../Base/Base.h"

class Effect :public Base 
{
private:
	enum {
		eState_moku,
	};
	CImage m_img;
public:
	Effect(const char* name, const CVector2D& pos, bool flip);
	void Update();
	void Draw();
};
extern TexAnimData effect_anim_data[];