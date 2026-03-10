#include "count.h"
#include "Map.h"
#include "GameData.h"

count::count(const CVector2D& pos) : Base(eType_count),
m_count_text("C:\\Windows\\Fonts\\msgothic.ttc", 100)
{
	m_cnt = 100 * 60;
	//stage10の場合のみ50秒
	if (GameData::s_score == 10)
		m_cnt = 50 * 60;
}


void count::Update()
{
	//ゲームクリアがトゥルーの時にif文を通る
	if(m_cnt>=0)
	{
		if(!GameData::Gameclear)
		{
			m_cnt--;
			
		}
	}
	//時間切れになるとゲームオーバー
	if (m_cnt == 0)
	{
		GameData::Gameover = true;
	}
}

void count::Draw()
{
	if (!GameData::Gameclear)
	//文字表示
	m_count_text.Draw(830, 120, 1, 1, 1, "%d",m_cnt/60);
}

void count::Collision(Base* b)
{
}

void count::SetCount(int count)
{
	m_cnt = count;
}
