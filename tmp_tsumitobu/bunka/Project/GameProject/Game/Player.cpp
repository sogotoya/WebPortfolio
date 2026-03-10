#include "Player.h"
#include "Map.h"
#include "AreaChange.h"
#include "Goal.h"
#include "Effect.h"
#include "GameData.h"
Player::Player(const CVector2D& p, bool flip)
	:Base(eType_Player)
{
	if (GameData::s_score < 6) 
	{
		m_img = COPY_RESOURCE("Player", CImage);
	}
	else 
	{
		m_img = COPY_RESOURCE("Player1", CImage);
	}
	m_img.ChangeAnimation(0);
	m_pos_old = m_pos = p;
	m_img.SetSize(90,90);
	m_img.SetCenter(45, 90);
	m_rect = CRect(-20, -87, 20, 0);
	//通常状態へ
	m_state = eState_Idle;
	m_is_ground = true;
	stop = false;
}

void Player::StateIdle()
{
	const float move_speed = 1;
	//移動フラグ
	bool move_flag = false;
	
	if (cooltime <= 0&&stop==false)
	{
		//左
		if (HOLD(CInput::eLeft))
		{
			m_vec.x += -move_speed;
			
			
			//反転フラグ
			m_flip = true;
			move_flag = true;
		}
		//右
		if (HOLD(CInput::eRight))
		{
			m_vec.x += move_speed;
			//反転フラグ
			m_flip = false;
			move_flag = true;
		}

		const float jump_pow = 12;
		if (m_is_ground && PUSH(CInput::eButton5))

		{
			m_vec.y = -jump_pow;
			m_is_ground = false;
			Base::Add(new Effect("Effect_Jump", m_pos + CVector2D(0, -30), m_flip));
			SOUND("jump")->Play();
		}
	}

	if (!m_is_ground) 
	{
		air_time_cnt++;

		if (m_vec.y < 0)
			m_img.ChangeAnimation(eAnimjump, false);
		
	}
	else 
	{
		if (air_time_cnt > air_time_set)
		{
			m_img.ChangeAnimation(eAnimDon);
			cooltime = cooltime_set;
		}

		air_time_cnt = 0;


		if (cooltime <= 0)
		{
			if (move_flag)
			{
				m_img.ChangeAnimation(eAnimWalk);
			}
			else
			{
				m_img.ChangeAnimation(eAnimIdle);
			}
		}

		cooltime--;
	}
}
void Player::Update()
{
	m_pos_old = m_pos;
	//滑り
	float friction = 0.7f;
	// 移動速度の最大値
	const float maxMoveSpeed = 10.0f;
	//ステージ５のみ指定した分、滑るように
	if(GameData::s_score==5)
	{ 
		friction = 0.9f;
	}
	//ステージ3のみ指定した分、遅くなる
	if (GameData::s_score == 3)
	{
		friction = 0.63f;;
	}
	//X軸の移動速度を　-maxMoveSpeed　～ +maxMoveSpeed の間でクランプ
	m_vec.x = min(max(m_vec.x, -maxMoveSpeed), maxMoveSpeed);
	//移動ベクトルに滑りを代入
	m_vec.x *= friction;

	if (GameData::Gameclear == false)
	{

		switch (m_state)
		{
		case eState_Idle:
			StateIdle();
			break;

		}

		if (m_is_ground && m_vec.y > GRAVITY * 4)
			m_is_ground = false;

		m_vec.y += GRAVITY;
		m_pos += m_vec;
		
		//残機について
		if (GameData::s_score == 7||GameData::s_score == 8 || GameData::s_score == 9 || GameData::s_score == 10)
			GameData::zanki = 1;
		//1160より下に行くとKillされる
		if (GameData::zanki != 0) 
		{
			if (m_pos.y > 1160)
			{
				if (!GameData::Gameclear)
				{
					GameData::zanki--;
					SetKill();
					if (GameData::zanki == 0)
					{
						GameData::Gameover = true;
					}
				}
			}
		}
		m_img.UpdateAnimation();
	}
}

void Player::Draw()
{
	m_img.SetPos(GetScreenPos(m_pos));
	m_img.SetFlipH(m_flip);
	m_img.Draw();
	
}

void Player::Collision(Base* b)
{
	switch (b->m_type) 
	{
	case eType_Map:
		if (Map* m = dynamic_cast<Map*>(b)) 
		{
			CVector2D rev_pos;
			int t;
			t = m->CollisionRect(CVector2D(m_pos.x,m_pos_old.y),m_rect,&rev_pos);
			if(t != 0)
			{
				m_pos.x = m_pos_old.x;
			}
			t = m->CollisionRect(CVector2D(m_pos_old.x, m_pos.y),m_rect,&rev_pos);
			if (t != 0) 
			{
				m_pos.y = rev_pos.y;
				//落下速度のリエット
				m_vec.y = 0;
				//着地フラグon
				m_is_ground = true;
				//1マス対策
				t = m->CollisionRect(CVector2D(m_pos_old.x, m_pos.y), m_rect, &rev_pos);
				if (t != 0)
					m_pos.y = rev_pos.y + MAP_TIP_SIZE;
			}
		}
		break;
	case eType_Goal:
			if (Base::CollisionRect(this, b)) 
			{
				if (Goal* g = dynamic_cast<Goal*>(b))
					g->SetGoal();
			}
		break;
	case eType_AreaChange:
		if (AreaChange* s = dynamic_cast<AreaChange*>(b))
		{
			if(Base::CollisionRect(this,s))
			{
				Base::Kill(1 << eType_Map
					| 1 << eType_AreaChange
					| 1 << eType_Goal);
				m_pos_old = m_pos = s->GetNextPos();
				Base::Add(new Map(s->GetNextArea()));
			}
		}
		break;
	}
}

static TexAnim playerIdle[] = {
	{0,20},
	{1,20},
};

static TexAnim playerWalk[] = {
	{4,10},
	{5,5},
	{6,10},
};

static TexAnim playerjump[] = {
	{8,50}
};

static TexAnim playerdon[] = {
	{12,2},
	{13,5},
	{14,10},
};
TexAnimData player_anim_data[] = {
	ANIMDATA(playerIdle),//0
	ANIMDATA(playerWalk),//1
	ANIMDATA(playerjump),//2
	ANIMDATA(playerdon),//3
};