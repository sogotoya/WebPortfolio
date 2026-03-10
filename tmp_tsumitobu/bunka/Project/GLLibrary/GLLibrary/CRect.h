#pragma once
#include "CVector.h"
class CRect {
public:
	float m_left;
	float m_top;
	float m_right;
	float m_bottom;
	union {
		struct {
			float m_x;
			float m_y;
			float m_width;
			float m_height;
		};
		struct {
			CVector2D m_pos;
			CVector2D m_size;
		};
	};
	CRect();

	/**
	* @fn
	* コンストラクタ（矩形設定）
	* @brief 矩形を設定する
	* @param l	[in]　左
	* @param t	[in]　上
	* @param r	[in]　右
	* @param b	[in]　下
	*/
	CRect(float l, float t, float r, float b);
	/**
	* @fn
	* コンストラクタ（矩形設定）
	* @brief 位置と大きさで矩形を設定する
	* @param pos	[in]　位置
	* @param size	[in]　大きさ
	*/
	CRect(const CVector2D& pos, const CVector2D& size);
	CRect(const CRect& rect);

	CRect operator=(const CRect& rect);
	/**
	* @fn
	* 矩形を設定する
	* @brief 矩形を設定する
	* @param l	[in]　左
	* @param t	[in]　上
	* @param r	[in]　右
	* @param b	[in]　下
	*/
	void Set(float l, float t, float r, float b);
	/**
	* @fn
	* 矩形を設定する
	* @brief 位置と大きさで矩形を設定する
	* @param pos	[in]　位置
	* @param size	[in]　大きさ
	**/
	void Set(const CVector2D& pos, const CVector2D& size);

	/**
	* @fn
	* 矩形の大きさを取得する
	* @brief 矩形の大きさを取得する
	* @return 矩形のサイズ
	**/
	CVector2D GetSize() { return m_size; }

	/**
	* @fn
	* 矩形の最小位置を取得する
	* @brief 矩形の最小位置を取得する
	* @return 左上の座標
	**/	
	CVector2D GetMin() { return CVector2D(m_left, m_top); }

	/**
	* @fn
	* 矩形の最大位置を取得する
	* @brief 矩形の最大位置を取得する	* @return 右下の座標
	**/
	CVector2D GetMax() { return CVector2D(m_top, m_bottom); }

};