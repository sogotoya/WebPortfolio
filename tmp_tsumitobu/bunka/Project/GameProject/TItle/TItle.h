#pragma once
#include "../Base/Base.h"

class TItle : public Base {
	CImage m_img;
	CFont m_title_text;
	int m_cnt;

public:
	TItle();
	~TItle();
	void Update();
	void Draw();
};