#pragma once
#include"../Base/Base.h"

#define MAP_TIP_SIZE 49
class sikaku :public Base 
{
private:
	enum
	{
		eState_Idle,
		eState_Down,//落ちる
	};
	CImage m_img;
	bool m_is_ground;
	int m_state;
	void StateIdle();
	void StateDown();
public:
	sikaku(const CVector2D& p, bool flip);
	void Update();
	void Draw();
	//指定座標チップ番号の取得
	int GetTip(const CVector2D& pos);
	//指定列、行のマップチップを取得
	int GetTip(int col, int row);
	//マップとの判定
	int CollisionMap(Base* b);
	//当たり判定
	int CollisionRect(const CVector2D& pos, const CRect& rect);
};