#include "sikaku.h"
#include "Map.h"

sikaku::sikaku(const CVector2D& p, bool flip) :Base(eType_Sikaku)
{
	m_img = COPY_RESOURCE("sikaku", CImage);
	m_pos_old=m_pos = p;
	m_state = eState_Idle;
	m_is_ground = true;
}

void sikaku::StateIdle()
{
	const float move_speed = 5;
	bool move_flag = false;
	if (HOLD(CInput::eLeft)) 
	{
		m_pos.x += -move_speed;
		
	}
	if (HOLD(CInput::eRight))
	{
		m_pos.y += move_speed;

	}
}

void sikaku::StateDown()
{
	if (PUSH(CInput::eButton2)) 
	{
		/*if (m_is_ground && m_vec.y > GRAVITY * 4)
			m_is_ground = false;*/
		m_vec.y += GRAVITY;
		m_pos += m_vec;
	}
	
}

void sikaku::Update()
{
	switch (m_state) 
	{
	case eState_Idle:
		StateIdle();
		break;
	case eState_Down:
		StateDown();
		break;
	}
	

}

void sikaku::Draw()
{
	m_img.SetSize(MAP_TIP_SIZE*6, MAP_TIP_SIZE*3);
	m_img.Draw();
}

int sikaku::GetTip(const CVector2D& pos)
{
	return 0;
}

int sikaku::GetTip(int col, int row)
{
	return 0;
}

int sikaku::CollisionMap(Base* b)
{
	
	switch (b->m_type)
	{
	case eType_Map:
		if (Map* m = dynamic_cast<Map*>(b))
		{
			int t;
			t = m->CollisionRect(CVector2D(m_pos.x, m_pos_old.y), m_rect);
			if (t != 0)
			{
				m_pos.x = m_pos_old.x;
			}
			t = m->CollisionRect(CVector2D(m_pos_old.x, m_pos.y), m_rect);
			if (t != 0)
			{
				m_pos.y = m_pos_old.y;
				//落下速度のリエット
				m_vec.y = 0;
				//着地フラグon
				m_is_ground = true;
			}
		}
		break;
}
	return 0;
}

int sikaku::CollisionRect(const CVector2D& pos, const CRect& rect)
{
	return 0;
}
