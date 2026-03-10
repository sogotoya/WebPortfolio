#include "TItle.h"
#include"../Game/Game.h"
#include "Game/Tutorial.h"
#include "Game/Player.h"
#include "Game/Map.h"
#include "Game/Field.h"
#include"Game/GameData.h"
#include"Game/AreaChange.h"
#include"Game/BlockManager.h"
#include "UI/Menu.h"

TItle::TItle():Base(eType_TItle),
m_title_text("C:\\Windows\\Fonts\\tItle.xct",64)
{
	m_img = COPY_RESOURCE("TItle", CImage);
	m_cnt = 0;
	SOUND("title")->Play();
}

TItle::~TItle()
{
	SOUND("title")->Stop();
}

void TItle::Update()
{
	
	if (m_cnt++ > 60 && PUSH(CInput::eButton1)) {
		Base::KillAll();
		Base::Add(new Game());
		Base::Add(new Tutorial());
	
		
	}
}

void TItle::Draw()
{
	m_img.Draw();
	
}
