#pragma once
#include "../Base/Base.h"

#define MAP_TIP_SIZE 49
class maru :public Base
{
private:
	CImage m_img;

public:
	maru();
	void Draw();
	//指定座標チップ番号の取得
	int GetTip(const CVector2D& pos);
	//指定列、行のマップチップを取得
	int GetTip(int col, int row);
	//マップとの判定
	int CollisionPoint(const CVector2D& pos);
	//当たり判定
	int CollisionRect(const CVector2D& pos, const CRect& rect);
};