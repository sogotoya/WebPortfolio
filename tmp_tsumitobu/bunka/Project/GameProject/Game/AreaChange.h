#pragma once
#include "../Base/Base.h"

class AreaChange :public Base {
private:
	CImage m_img;
	CVector2D m_next_pos;
	int m_next_area;

public:
	AreaChange(const CVector2D& pos, const CVector2D& next, int next_area);
	void Draw();
	CVector2D GetNextPos() 
	{
		return m_next_pos;
	}
	int GetNextArea() 
	{
		return m_next_area;
	}
};