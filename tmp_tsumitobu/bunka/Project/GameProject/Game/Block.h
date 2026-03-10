#pragma once
#include "../Base/Base.h"

class Block :public Base 
{
public:
	
	enum 
	{
		eL,
		eSikaku,
		eStick,
		eMax,
	};
private:
	
	//ブロックの種類
	int m_block_type;
	//ブロックの回転
	int m_block_dir;
	//落下カウント
	int m_cnt;
	//新しい位置が移動できるかのチェック
	bool CollisionCheck(const CVector2D& new_pos,int new_dir);
	//ブロックをマップへ書き込み
	void WriteBlock(const CVector2D& pos, int t);
	
public:
	Block(const CVector2D& pos, int type);
	void Update();
	bool stop;
};