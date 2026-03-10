#include "Menu.h"
#include "Game/Game.h"
#include "Game/GameData.h"
#include "Game/Map.h"
#include "Game/Player.h"
#include"Game/count.h"
#include "Game/Field.h"
#include "Game/BlockManager.h"
#include "Game/Block.h"
Menu::Menu() :Base(eType_Menu)
{
	//メニュー背景
	m_menu = COPY_RESOURCE("kumo", CImage);

	m_menu.SetSize(1920, 1080);
	//メニュー画像生成
	//char name[配列][文字数]
	char name[5][32] = { "stagewaku1", "map2", "map3", "map4", "map5", };
	char name2[5][32] = { "?","?", "?", "?", "?", };
	for (int i = 0; i < 5; i++)
	{

		Base::Add(m_waku[i] = new Waku(name[i], CVector2D(180 + 390 * (i % 5), 500 + 350 * (i / 5)), i + 1));

	}
	int y = 5;
	//ステージ５クリア後に表示
	if (GameData::end_score >= 6)
		for (int u = 0; u < 5; u++)
		{
			
			Base::Add(m_waku[u] = new Waku(name2[u], CVector2D(180 + 390 * (u % 5),700 + 350 * (u / 5)), y + 1));
			y+=1;
		}
}


void Menu::Update()
{
	
}

void Menu::Draw()
{
	m_menu.Draw();
	
}

Menu::Waku::Waku(char* imgname, CVector2D pos,int stagen):Base(eType_Waku)
{
	m_pos = pos;
	//何ステージ選択
	m_stagen = stagen;
	m_sute= COPY_RESOURCE(imgname, CImage);
	m_sute.SetSize(280, 180);
	m_sute.SetCenter(140, 180);
	m_rect = CRect(-140, -180, 140, 0);
}

void Menu::Waku::Update()
{
	//マウスがメニューをクリックしたときの判定
	if (PUSH(CInput::eMouseL))
	{
		//マウスの座標
		CVector2D p = CInput::GetMousePoint();
		//マウスとメニューの枠との判定
		CRect rect2 = CRect(
			m_pos.x + m_rect.m_left,
			m_pos.y + m_rect.m_top,
			m_pos.x + m_rect.m_right,
			m_pos.y + m_rect.m_bottom);
		SOUND("sentaku")->Play();

		//矩形同士の判定
		if (p.x <= rect2.m_right && p.x >= rect2.m_left &&
			p.y <= rect2.m_bottom && p.y >= rect2.m_top)
		{
			GameData::s_score = m_stagen;
			KillAll();
			Base::Add(new Game());
			
		};

	}
}

void Menu::Waku::Draw()
{
	m_sute.SetPos(m_pos);
	m_sute.Draw();
}
