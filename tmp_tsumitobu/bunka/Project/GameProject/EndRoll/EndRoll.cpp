#include "EndRoll.h"
#include "Game/Gamedata.h"
#include "TItle/TItle.h"

EndRoll::EndRoll(const CVector2D& p):Base(eType_EndRoll)
{
	endimg = COPY_RESOURCE("end", CImage);
	endimg.SetSize(800, 1200);
	endimg.SetCenter(400, 600);
	m_pos = p;
	SOUND("Roll")->Play();
}

void EndRoll::Update()
{
	m_pos.y -= EndRoll_Speed;
	if (PUSH(CInput::eButton1))
	{
		KillAll();
		Base::Add(new TItle());
		GameData::s_score = 0;
		GameData::zanki = GameData::Zanki_set;
		GameData::Gameclear = false;
		GameData::Gameover = false;
		GameData::end_score += 1;
	}
}

void EndRoll::Draw()
{
	endimg.SetPos(m_pos);
	endimg.Draw();
}
