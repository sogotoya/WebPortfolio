#include "Field.h"
#include "Game/Game.h"
#include "GameData.h"

Field::Field() :Base(eType_Field)
{
	m_haikei = COPY_RESOURCE("aozora", CImage);
	m_yuugata = COPY_RESOURCE("yuugata", CImage);
	m_yuugatakumo = COPY_RESOURCE("yuugatakumo", CImage);
	m_murasaki = COPY_RESOURCE("murasaki", CImage);
	m_murasakikumo = COPY_RESOURCE("murasakikumo", CImage);
	m_stage6 = COPY_RESOURCE("map6", CImage);
	m_stage7 = COPY_RESOURCE("map7", CImage);
	m_stage8 = COPY_RESOURCE("map8", CImage);
	m_stage9 = COPY_RESOURCE("map9", CImage);
	m_stage10 = COPY_RESOURCE("map10", CImage);
	m_haikei. SetSize(1920, 1080);
	m_yuugata.SetSize(1920, 1080);
	m_yuugatakumo.SetSize(1920, 1080);
	m_murasaki.SetSize(1920, 1080);
	m_murasakikumo.SetSize(1920, 1080);
	m_stage6.SetSize(1920, 1080);
	m_stage7.SetSize(1920, 1080);
	m_stage8.SetSize(1920, 1080);
	m_stage9.SetSize(1920, 1080);
	m_stage10.SetSize(1920, 1080);
}
void Field::Draw()
{
	//äeÉXÉeÅ[ÉWÇÃîwåiÇÃï`âÊ
	switch (GameData::s_score)
	{
	case 1:
		m_haikei.Draw();
		break;
	case 2:
		m_yuugata.Draw();
		break;
	case 3:
		m_yuugatakumo.Draw();
		break;

	case 4:
		m_murasaki.Draw();
		break;
	case 5:
		m_murasakikumo.Draw();
		break;
	case 6:
		m_stage6.Draw();
		break;
	case 7:
		m_stage7.Draw();
		break;
	case 8:
		m_stage8.Draw();
		break;
	case 9:
		m_stage9.Draw();
		break;
	case 10:
		m_stage10.Draw();
		break;
	}
}