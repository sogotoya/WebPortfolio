#pragma once
#include "Base/Base.h"

class Player : public Base {
	enum 
	{
		eState_Idle,
		eState_Walk,
		
	};
	enum 
	{
		eAnimIdle = 0,
		eAnimWalk,
		eAnimjump,
		eAnimDon

	};
private:
	const int air_time_set = 70;
	const int cooltime_set = 20;

	int m_state;
	CImage m_img;
	bool m_flip;

	void StateIdle();
	//着地
	bool m_is_ground;

	//空中にいる時間をカウント
	int air_time_cnt = 0;
	//クールタイム。これが０以上の場合はプレイヤーが動けません。
	int cooltime = 0;


public:
	Player(const CVector2D& p, bool flip);
	void Update();
	void Draw();
	void Collision(Base* b);
	bool stop;
};
extern TexAnimData player_anim_data[];