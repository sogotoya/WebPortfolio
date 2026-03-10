#pragma once
#include "GL.h"
#include "CMatrix.h"
#include "CRect.h"
class CCamera;
class COBB;
namespace Utility {
	/*!
		@brief	Degree（度）をRadianに変換
		@param	d				[in] 角度
		@retval	Radianに変換された角度
	**/

	inline float DgreeToRadian(float d) {
		return (float)(d*M_PI / 180.0f);
	}
	inline float RadianToDgree(float d) {
		return (float)(d *180.0f/ M_PI);
	}
	/*!
		@brief	角度の正規化
		@param	a				[in] 角度
		@retval	-PI～PI
	**/

	inline float NormalizeAngle(float a) {
		if (a>M_PI) return (float)(a - M_PI * 2);
		else if (a<-M_PI) return (float)(a + M_PI * 2);
		return a;
	}
	/*!
		@brief	乱数取得
		@param	min				[in] 最低値
		@param	max				[in] 最大値
		@retval	最低値～最大値の乱数
	**/

	inline int Rand(int min,int max) {
		return min + rand()% ((max - min)+1);
	}
	inline float Rand(float min, float max) {
		return min + ((max - min) * rand() / RAND_MAX);
	}
	/*!
		@brief	スクリーン座標変換→ワールド座標
		@param	spos			[in] スクリーン座標
		@param	mProj			[in] 射影行列
		@param	mView			[in] ビュー行列
		@param	viewport		[in] ビューポート矩形
		@retval	ワールド座標
	**/
	CVector3D ScreenToWorld(const CVector3D& spos, const CMatrix& mProj, const CMatrix& mView, const CRect& viewport);

	/*!
	@brief	スクリーン座標変換→ワールド座標
	@param	spos			[in] スクリーン座標
	@param	camera			[in] 使用カメラ
	@retval	ワールド座標
	**/
	CVector3D ScreenToWorld(const CVector3D& spos, const CCamera* camera);
	CVector3D ScreenToWorld(const CVector3D& spos);
	/*!
		@brief	ワールド座標→スクリーン座標変換
		@param	wpos			[in] ワールド座標
		@param	mProj			[in] 射影行列
		@param	mView			[in] ビュー行列
		@param	viewport		[in] ビューポート矩形
		@retval	スクリーン座標
	**/
	CVector3D WorldToScreen(const CVector3D& wpos, const CMatrix& mProj, const CMatrix& mView, const CRect& viewport);
	/*!
	@brief	ワールド座標→スクリーン座標変換
	@param	out				[out] スクリーン座標
	@param	wpos			[in] ワールド座標
	@param	camera			[in] 使用カメラ
	**/
	CVector3D WorldToScreen(const CVector3D& wpos, const CCamera* camera);
	CVector3D WorldToScreen(const CVector3D& wpos);
	/*!
	@brief	線を引く
	@param	s				[in] 線分の始点
	@param	e				[in] 線分の終点
	@param	color			[in] 色
	@retval	無し
	**/
	void DrawLine(const CVector2D &s, const CVector2D &e, const CVector4D &color);

	void DrawQuad(const CVector2D &pos, const CVector2D &size, const CVector4D &color);


	void DrawLine(const CVector3D &s, const CVector3D &e, const CVector4D &color);
	void DrawCube(const CVector3D &pos, const float size, const CVector4D &color);
	void DrawCube(const CVector3D& pos, const CVector3D& size, const CVector4D& color);
	void DrawAABB(const CVector3D& min, const CVector3D& max, const CVector4D& color);
	void DrawCube(const CMatrix &mat, const CVector4D &color);
	void DrawSphere(const CVector3D &pos, const float size, const CVector4D &color);
	void DrawSphere(const CMatrix &mat, const float size, const CVector4D &color);
	void DrawCircle(const CVector2D &pos, const float size, const CVector4D &color);
	void DrawCapsule(const CVector3D &s, const CVector3D &e, const float rad, const CVector4D &color);
	void DrawCapsule(const CVector2D& s, const CVector2D& e, const float size, const CVector4D& color);
	void DrawArrow(const CVector3D& pos, const CVector3D& rot, const float size, const CVector4D& color);
	void DrawArrow(const CVector2D& pos, const float ang, const float size, const CVector4D& color);
	void DrawOBB(const COBB& obb, const CVector4D& color);
	void DrawTriangle(const CVector3D vertex[], int count, const CVector4D& color, const CMatrix& mat);
	void DrawQuad(const CVector3D vertex[], int count, const CVector4D& color, const CMatrix& mat);
	void DrawCircle(const CVector2D vertex[], const int count,const CVector2D& pos, const CVector4D& color);
}

#define RtoD(x) Utility::RadianToDgree(x)
#define DtoR(x) Utility::DgreeToRadian(x)