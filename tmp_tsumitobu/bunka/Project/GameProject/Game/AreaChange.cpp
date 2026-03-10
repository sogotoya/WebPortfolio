#include "AreaChange.h"

AreaChange::AreaChange(const CVector2D& pos, const CVector2D& next, int next_area)
	:Base(eType_AreaChange)
{
	m_img = COPY_RESOURCE("Goal", CImage);
	m_img.SetCenter(31, 120);
	m_pos = pos;
	m_next_pos = next;
	m_next_area = next_area;
	m_rect = CRect(-30, -120, 70, -18);
	m_img.SetSize(100, 100);
}

void AreaChange::Draw()
{
	m_img.SetPos(GetScreenPos(m_pos));
	m_img.Draw();
	DrawRect();
}
