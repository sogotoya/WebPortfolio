#include "maru.h"

maru::maru() :Base(eType_maru)
{
	m_img = COPY_RESOURCE("maru", CImage);

}

void maru::Draw()
{
	m_img.SetSize(MAP_TIP_SIZE * 6, MAP_TIP_SIZE * 3);
	m_img.Draw();
}