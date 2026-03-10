#include "L.h"

L::L() :Base(eType_L)
{
	m_img = COPY_RESOURCE("L", CImage);
}

void L::Draw()
{
	m_img.SetSize(MAP_TIP_SIZE * 5, MAP_TIP_SIZE * 3);
	m_img.Draw();
}

int L::GetTip(const CVector2D& pos)
{
	return 0;
}

int L::GetTip(int col, int row)
{
	return 0;
}

int L::CollisionPoint(const CVector2D& pos)
{
	return 0;
}

int L::CollisionRect(const CVector2D& pos, const CRect& rect)
{
	return 0;
}
