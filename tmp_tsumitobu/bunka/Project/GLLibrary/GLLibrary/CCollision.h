#pragma once

#include "CMatrix.h"
#include "CRect.h"
/*!
 *	@brief		AABBクラス
 *
 *	OBBのパラメータクラス
 */
class CAABB {
public:
	CVector3D min;
	CVector3D max;
	CAABB() {
	}
	CAABB(const CVector3D& imin, const CVector3D &imax) {
		min = imin;
		max = imax;
	}
	void Draw(const CVector4D& color)const;
};
/*!
 *	@brief		OBBクラス
 *	
 *	OBBのパラメータクラス
 */
class COBB {
public:
	CVector3D m_center;		//中心座標
	CVector3D m_axis[3];	//各軸ベクトル
	CVector3D	 m_length;	//各軸の長さ
	COBB() {
	}
	/*!
		@brief	コンストラクタ
		@param	center		[in] 座標
		@param	axis_x		[in] 横方向ベクトル
		@param	axis_y		[in] 上方向ベクトル
		@param	axis_z		[in] 前方向ベクトル
		@param	length		[in] 各軸の長さ
	**/
	COBB(const CVector3D& center, const CVector3D& axis_x, const CVector3D& axis_y, const CVector3D& axis_z, const CVector3D& length);

	/*!
		@brief	コンストラクタ
		@param	center		[in] 中心位置
		@param	rot			[in] 回転値
		@param	length		[in] 大きさ
	**/
	COBB(const CVector3D& center, const CVector3D& rot, const CVector3D& length);

	//OBBを行列で姿勢変換
	void Transeform(const CMatrix &mat);
	//行列に変換
	CMatrix GetMatrix();
	/*
		@brief	判定テスト用OBBの表示
		@retval	無し
	*/
	void Draw(const CVector4D& color) const;
};

/*!
 *	@brief		衝突判定クラス
 *
 */
class CCollision {
private:
	/*!
		@brief	separate軸上に投影したOBB同士が接触しているか調べる
		@param	A			[in] 衝突対象OBB
		@param	B			[in] 衝突対象OBB
		@param	distVec		[in] Aの中心からBの中心までのベクトル
		@param	separate	[in] 分離軸、投影を行う軸
		@param	axis		[out] 押し戻し方向
		@param	length		[out] 距離
		@retval	結果:true接触 false非接触
	**/
	static bool CompareLength(const COBB &A,const COBB &B,const CVector3D &distVec,const CVector3D &separate, CVector3D* axis=NULL,float *length=NULL);
public:
	/*!
	@brief	矩形同士の衝突判定
	@param	rect1		[in] １つ目の矩形
	@param	rect2		[in] ２つ目の矩形
	@retval	結果:true接触 false非接触
	**/
	static bool CollisionRect(const CRect &rect1, const CRect &rect2);
	/*!
	@brief	矩形と点との衝突判定
	@param	rect		[in] 矩形
	@param	point		[in] 点
	@retval	結果:true接触 false非接触
	**/
	static bool CollisionRectPoint(const CRect &rect, const CVector2D point);
	/*!
		@brief	球同士の衝突判定
		@param	centerA		[in] １つ目の球の中心位置
		@param	radiusA		[in] １つ目の球の半径
		@param	centerB		[in] ２つ目の球の中心位置
		@param	radiusB		[in] ２つ目の球の半径
		@param	dist		[out] 2点の距離
		@param	dir			[out] 1つ目の球→2つ目の球への方向
		@retval	結果:true接触 false非接触
	**/
	static bool CollisionShpere(const CVector3D &centerA,float radiusA,const CVector3D &centerB,float radiusB,float *dist = NULL,CVector3D *dir = NULL);
	static bool CollisionShpere(const CVector2D& centerA, float radiusA, const CVector2D& centerB, float radiusB, float* dist = NULL, CVector2D* dir=NULL);
	/*!
		@brief	AABB同士の衝突判定
		@param	minA		[in] １つ目のAABBの最小位置
		@param	maxA		[in] １つ目のAABBの最大位置
		@param	minB		[in] ２つ目のAABBの最小位置
		@param	maxB		[in] ２つ目のAABBの最大位置
		@retval	結果:true接触 false非接触
	**/
	static bool CollisionAABB(const CVector3D &minA,const CVector3D &maxA,const CVector3D &minB,const CVector3D &maxB);
	static bool CollisionAABB(const CAABB &A, const CAABB& B) {
		return CollisionAABB(A.min,A.max,B.min,B.max);
	}
	/*!
	@brief	AABBと点の衝突判定
	@param	min		[in] AABBの最小位置
	@param	max		[in] AABBの最大位置
	@param	point		[in] 点の座標
	@retval	結果:true接触 false非接触
	**/
	static bool CollisionAABBPoint(const CVector3D &min, const CVector3D &max, const CVector3D &point);
	static bool CollisionAABBPoint(const CAABB &AABB, const CVector3D &point) {
		return CollisionAABBPoint(AABB.min, AABB.max, point);
	}

	/*!
	@brief	AABBと線の衝突判定
	@param	cross	[in] 接触点
	@param	length	[in] 距離
	@param	min		[in] AABBの最小位置
	@param	max		[in] AABBの最大位置
	@param	point	[in] 線上の点
	@param	dir		[in] 線の方向
	@retval	結果:true接触 false非接触
	**/
	static bool CollisionAABBRay(CVector3D *cross, float* length, const CVector3D& min, const CVector3D& max, const CVector3D& point, const CVector3D& dir);
	/*!
		@brief	OBB同士の衝突判定
		@param	A			[in] １つ目のOBB
		@param	B			[in] ２つ目のOBB
		@param	axis		[out] 押し戻し方向
		@param	length		[out] 距離
		@retval	結果:true接触 false非接触
	**/
	static bool CollisionOBB(const COBB &A,const COBB &B ,CVector3D* axis = NULL, float* length = NULL);
	/*!
	@brief	OBBと球の衝突判定
	@param	obb			[in] OBB
	@param	cneter		[in] 球の中心
	@param	radius		[in] 球の半径
	@param	axis		[in] OBB→球の接触方向
	@param	length		[in] OBBまでの距離
	@retval	結果:true接触 false非接触
	**/
	static bool CollisionOBBShpere(const COBB &obb, const CVector3D &cener, float radius, CVector3D *axis=nullptr,float *length=nullptr);
	/*!
	@brief	カプセルと球の衝突判定
	@param	obb			[in] OBB
	@param	lineS		[in] カプセル始点
	@param	lineE		[in] カプセル終点
	@param	radius		[in] カプセルの半径
	@param	axis		[in] OBB→カプセルの接触方向
	@param	length		[in] OBBまでの距離（負の数だとめり込んでいる長さ）
	@retval	結果:true接触 false非接触
	**/
	static bool CollisionOBBCapsule(const COBB& obb, const CVector3D& lineS,const CVector3D& lineE, float radius, CVector3D* axis = nullptr, float* length = nullptr);

	/*!
		@brief	AABBとポリゴンの衝突判定
		@param	aabb_max	[in] AABB最大地点
		@param	aabb_min	[in] AABB最小地点
		@param	v			[in] 頂点配列
		@param	n			[out] 面の法線
		@param	dist		[out] 面までの距離
		@param	push		[out] 押し戻し量
		@retval	結果:true接触 false非接触
	**/
	static bool CollisionAABBTriangle(const CVector3D& aabb_max, const CVector3D& aabb_min, const CVector3D* v, CVector3D* normal, float* dist = NULL, float* push = NULL);
	/*!
		@brief	AABBと平面の衝突判定
		@param	aabb_max	[in] AABB最大地点
		@param	aabb_min	[in] AABB最小地点
		@param	v			[in] 面上の1点
		@param	n			[out] 面の法線
		@param	dist		[out] 面までの距離
		@param	push		[out] 押し戻し量
		@retval	結果:true接触 false非接触
	**/
	static bool CollisionAABBTriangle(const CVector3D& aabb_max, const CVector3D& aabb_min, const CVector3D& v, const CVector3D& N, float* dist = NULL, float* push = NULL);
	/*!
		@brief	カプセルと球の衝突判定
		@param　c_top		[in] カプセル開始地点
		@param　c_bottom	[in] カプセル終了地点
		@param	c_radius	[in] カプセルの半径
		@param	s_cneter	[in] 球の中心
		@param	s_radius	[in] 球の半径
		@param	cross		[in] 最近点
		@param	dist		[in] 距離
		@retval	結果:true接触 false非接触
	**/
	static bool CollisionCapsuleShpere(const CVector3D &c_top,const CVector3D &c_bottom,float c_radius,const CVector3D &s_center , float s_radius, float* dist = NULL,CVector3D* cross = nullptr, CVector3D* dir=NULL);
	static bool CollisionCapsuleShpere(const CVector2D& c_top, const CVector2D& c_bottom, float c_radius, const CVector2D& s_center, float s_radius, float* dist = NULL, CVector2D* cross = nullptr, CVector2D* dir = NULL);

	/*!
		@brief	カプセル同士の衝突判定
		@param　top1		[in] カプセル開始地点
		@param　bottom1		[in] カプセル終了地点
		@param	radius1		[in] カプセルの半径
		@param　top2		[in] カプセル開始地点
		@param　bottom2		[in] カプセル終了地点
		@param	radius2		[in] カプセルの半径
		@param	dist		[out] カプセル同士の距離
		@param	c1			[out] カプセル上での最短地点
		@param	c2			[out] カプセル上での最短地点
		@param	dir1		[out] カプセル１→カプセル２の方向
		@param	dir2		[out] カプセル２→カプセル１の方向
		@retval	結果:true接触 false非接触
	**/
	static bool CollisionCapsule(const CVector3D &top1,const CVector3D &bottom1,float radius1,const CVector3D &top2,const CVector3D &bottom2,float radius2,float *dist = NULL,CVector3D* c1 = NULL, CVector3D* dir1 = NULL, CVector3D* c2 = NULL, CVector3D* dir2 = NULL);
	static bool CollisionCapsule(const CVector2D& top1, const CVector2D& bottom1, float radius1, const CVector2D& top2, const CVector2D& bottom2, float radius2, float* dist = NULL, CVector2D* c1 = NULL, CVector2D* dir1 = NULL, CVector2D* c2 = NULL, CVector2D* dir2 = NULL);

	/*!
		@brief	点Cが三角形ポリゴン上にあるか調べる
		@param	C			[in] 点の座標
		@param	V0			[in] 三角形ポリゴンの頂点1
		@param	V1			[in] 三角形ポリゴンの頂点2
		@param	V2			[in] 三角形ポリゴンの頂点3
		@param	N			[in] 三角形ポリゴンの法線
		@retval	結果:true接触 false非接触
	**/
	static bool TriangleIntersect(const CVector3D &c,const CVector3D &v0,const  CVector3D &v1, const CVector3D &v2,const CVector3D &n);
	/*!
		@brief	線分と三角形ポリゴンとの衝突判定
		@param	C			[out] 接触地点
		@param	S			[in] 線分の開始位置
		@param	E			[in] 線分の終了位置
		@param	V0			[in] 三角形ポリゴンの頂点1
		@param	V1			[in] 三角形ポリゴンの頂点2
		@param	V2			[in] 三角形ポリゴンの頂点3
		@retval	結果:true接触 false非接触
	**/
	static bool IntersectTriangleRay(CVector3D *corss,const CVector3D &p1,const  CVector3D &p2,const CVector3D& v0,const  CVector3D &v1,const  CVector3D &v2,float *dist);
	static bool IntersectTriangleRay(CVector3D *corss, const CVector3D &p1, const  CVector3D &p2, const CVector3D& v0, const  CVector3D &v1, const  CVector3D &v2, const  CVector3D &normal, float *dist);

	/*!
		@brief	pointから近いv0→v1線上の点を調べる
		@param	V0			[in] 線分の開始位置
		@param	V1			[in] 線分の終了位置
		@param	point		[in] 点
		@retval	結果:true接触 false非接触
	**/
	static CVector3D PointOnLineSegmentNearestPoint(const CVector3D &v0,const CVector3D &v1,const CVector3D &point);
	
	/*!
		@brief	pointから近いv0→v1線上の点を調べる（二次元用）
		@param	V0			[in] 線分の開始位置
		@param	V1			[in] 線分の終了位置
		@param	point		[in] 点
		@retval	結果:true接触 false非接触
	**/
	static CVector2D PointOnLineSegmentNearestPoint(const CVector2D &v0,const CVector2D &v1,const CVector2D &point);

	/*!
		@brief	三角ポリゴンと球の衝突判定
		@param	V0			[in] 三角形ポリゴンの頂点1
		@param	V1			[in] 三角形ポリゴンの頂点2
		@param	V2			[in] 三角形ポリゴンの頂点3
		@param	cneter		[in] 球の中心
		@param	rudius		[in] 球の半径
		@param	cross		[out] 最短接触点
		@param	length		[out] 最短距離
		@retval	結果:true接触 false非接触
	**/
	static bool CollisionTriangleSphere(const CVector3D &v0,const CVector3D &v1,const CVector3D &v2,const CVector3D &center,float radius,CVector3D *cross=0,float *length = 0);
	static bool CollisionTriangleSphere(const CVector3D &v0, const CVector3D &v1, const CVector3D &v2, const CVector3D &normal,const CVector3D &center, float radius, CVector3D *cross = 0, float *length = 0);

	/*!
		@brief	三角ポリゴンとカプセルの衝突判定
		@param	V0			[in] 三角形ポリゴンの頂点1
		@param	V1			[in] 三角形ポリゴンの頂点2
		@param	V2			[in] 三角形ポリゴンの頂点3
		@param	cneter		[in] 球の中心
		@param	rudius		[in] 球の半径
		@param	cross		[out] 最短接触点
		@param	length		[out] 最短距離
		@retval	結果:true接触 false非接触
	**/
	static bool CollisionTriangleCapsule(const CVector3D &v0,const CVector3D &v1,const CVector3D &v2,const CVector3D &top,const CVector3D &bottom,float radius,CVector3D *cross=0,float *length = 0);
	static bool CollisionTriangleCapsule(const CVector3D &v0, const CVector3D &v1, const CVector3D &v2, const CVector3D &normal,const CVector3D &top, const CVector3D &bottom, float radius, CVector3D *cross = 0, float *length = 0);


	/*!
		@brief	2線分間の距離
		@param	s1			[in] 線分１の開始地点
		@param	e1			[in] 線分１の終了地点
		@param	s2			[in] 線分２の開始地点
		@param	e2			[in] 線分２の終了地点
		@param	c1			[out] 線分１上での最短地点
		@param	c2			[out] 線分２上での最短地点
		@param	dir1		[out] 線分１→線分２の方向
		@param	dir2		[out] 線分２→線分１の方向
		@retval	距離
	**/
	static float DistanceLine(const CVector3D &s1,const CVector3D &e1,const CVector3D &s2,const CVector3D &e2,CVector3D *c1=NULL, CVector3D* dir = NULL,CVector3D *c2=NULL, CVector3D* dir2 = NULL);

	/*!
		@brief	2線分間の距離
		@param	s1			[in] 線分１の開始地点
		@param	e1			[in] 線分１の終了地点
		@param	s2			[in] 線分２の開始地点
		@param	e2			[in] 線分２の終了地点
		@param	c1			[out] 線分１上での最短地点（未実装）
		@param	c2			[out] 線分２上での最短地点（未実装）
		@retval	距離
	**/
	static float DistanceLine(const CVector2D& s1, const CVector2D& e1, const CVector2D& s2, const CVector2D& e2, CVector2D* c1 = NULL, CVector2D* dir = NULL,CVector2D* c2 = NULL, CVector2D* dir2 = NULL);


	/*!
	@brief	2線分間の交差
	@param	s1			[in] 線分１の開始地点
	@param	e1			[in] 線分１の終了地点
	@param	s2			[in] 線分２の開始地点
	@param	e2			[in] 線分２の終了地点
	@retval	距離
	**/
	static bool CollitionLine(const CVector2D &s1, const CVector2D &e1, const CVector2D &s2, const CVector2D &e2);


	/*!
		@brief	点と線の距離
		@param	v0			[in] 線分の開始地点
		@param	v1			[in] 線分の終了地点
		@param	p			[in] 点
		@retval　距離
	**/
	static float DistancePointToLine(const CVector3D &v0,const CVector3D &v1,const CVector3D &p,CVector3D *corss=nullptr, CVector3D* dir = nullptr);
	static float DistancePointToLine(const CVector2D &v0, const CVector2D &v1, const CVector2D &p, CVector2D* corss = nullptr, CVector2D* dir = nullptr);
	/*!
		@brief	点と線の距離の二乗
		@param	v0			[in] 線分の開始地点
		@param	v1			[in] 線分の終了地点
		@param	p			[in] 点
		@retval　距離の二乗
	**/
	static float DistancePointToLineSq(const CVector3D &v0,const CVector3D &v1,const CVector3D &p, CVector3D* cross = nullptr, CVector3D* dir = nullptr);
	static float DistancePointToLineSq(const CVector2D& v0, const CVector2D& v1, const CVector2D& p, CVector2D* cross = nullptr, CVector2D* dir = nullptr);

};