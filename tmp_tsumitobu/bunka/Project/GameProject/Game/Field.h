#pragma once
#include "../Base/Base.h"

class Field : public Base {
private:


	CImage m_haikei;
	CImage m_yuugata;
	CImage m_yuugatakumo;
	CImage m_murasaki;
	CImage m_murasakikumo;
	CImage m_stage6;
	CImage m_stage7;
	CImage m_stage8;
	CImage m_stage9;
	CImage m_stage10;


	static float m_ground_y;
public:
	Field();
	void Draw();
	static float GetGroundY() {
		return m_ground_y;
	}
};