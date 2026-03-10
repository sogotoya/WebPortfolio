#pragma once
#include "../Base/Base.h"

#define MAP_WIDTH 41
#define MAP_HEIGHT 26
#define MAP_TIP_SIZE 47

class Map :public Base 
{
private:
	CImage m_img;
	

	//書き換え可能データ
	int m_stage_data[MAP_HEIGHT][MAP_WIDTH];
	
public:
	Map(int area);
	void Draw();
	//指定座標チップ番号の取得
	int GetTip(const CVector2D& pos, int* tx=nullptr, int* ty=nullptr);
	//指定列、行のマップチップを取得
	int GetTip(int col, int row);

	//指定列、行のマップチップを設定
	void SetTip(int col, int row, int t);

	//マップとの判定
	int CollisionPoint(const CVector2D& pos);
	//当たり判定
	int CollisionRect(const CVector2D& pos, const CRect& rect,CVector2D*rev_pos);
	//落ちてくるブロックの座標
	CVector2D drop_pos;
};