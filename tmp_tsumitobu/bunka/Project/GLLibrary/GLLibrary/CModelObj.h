/*!
*	@brief	OBJ用モデルクラス
*
*
**/
#pragma once
#include "GL.h"
#include "CTexture.h"
#include "CModel.h"
#include "vector"

class COBB;
struct SObjModelHeader {
	char fileType[2];
	unsigned short verversion;
	int		m_materialCnt;
	SVector3D m_cut;
};


class CMeshObj {
public:
	struct SVertex {
		CVector3D v;
		CVector3D n;
		CVector2D t;
	};
	SVertex* mp_vertex_array;
	std::vector<int>* m_colIdex;
	CVector3D* m_colmin;
	CVector3D* m_colmax;
	int			m_vertexNum;		//頂点数
	CVector3D* m_normal;
	CVector3D	m_max;
	CVector3D	m_min;
	CVector3D	m_cut;
	unsigned long *m_colmask;
	CVector3D	m_length;
	GLuint		m_buffer;
	GLuint		m_vao;
	
	CMeshObj();
	void Render(CMaterial* m);
	void Release();
	void CreatCollsionIndex(CVector3D cut);
	bool CollisionRay(CVector3D *c, CVector3D *n, const CVector3D &s, const CVector3D &e,const CVector3D& dir,float *pLength);
	int CollisionRay(std::vector<CCollTriangle>& out, const CVector3D& s, const CVector3D& e, const CVector3D& dir, int matNo);
	int CollisionSphere(std::vector<CCollTriangle>& out, const CVector3D &center, float radius,int matNo);
	int CollisionCupsel(std::vector<CCollTriangle>&out, const CVector3D &top, const CVector3D &bottom, float radius,int matNo);
	int CollisionAABB(std::vector<CCollTriangle>& out, const CVector3D& aabb_max, const CVector3D& aabb_min, const CVector3D& check_max, const CVector3D& check_min,const CMatrix &trans,int matNo);
	int GetIndex(int x, int y, int z) {
		return x + (z*m_cut.ix) + (y*m_cut.iz*m_cut.ix);
	}
};
/*!
		@brief	OBJファイル用モデルクラス
**/
class CModelObj : public CModel {
private:
	
	CMeshObj *m_mesh;
	int		m_materialCnt;
	CVector3D	m_cut;
	CMaterial**	m_material;		//マテリアルデータ
	/*!
		@brief	マテリアルデータの読み込み
		@param	path		[in]	ファイル名
		@retval	無し
	**/
	bool	LoadMaterial(char *path);
public:

	/*!
		@brief	コンストラクタ
	**/
	CModelObj();

	CModelObj(const CModelObj& m);
	CModelObj& operator=(const CModelObj& m);
	/*!
		@brief	デストラクタ
	**/
	~CModelObj();

	
	/*!
	@brief	OBJファイルからモデルデータを読み込む
	@param	path				[in] ファイル名
	@param	cut_x				[in] X分割数
	@param	cut_y				[in] Y分割数
	@param	cut_z				[in] Z分割数
	@retval	無し
	**/
	bool	Load(const char *path,int cut_x=1,int cut_y=1, int cut_z=1);

	/*!
		@brief	描画を行う
		@param	m				[in] ワールド行列
		@retval	無し
	**/
	void	Render(CMatrix &m);

	/*!
		@brief	描画する
		@retval	無し
	**/
	void Render();

	/*!
		@brief	モデルデータを破棄する
		@retval	無し
	**/
	void	Release();


	/*!
	@brief	マテリアルの取得
	@param	no				[in] マテリアル番号
	@retval	マテリアルのポインタ
	**/
	CMaterial* GetMaterial(int no) const;
	/*!
	@brief	マテリアルの取得
	@param	name				[in] マテリアル名前
	@retval	マテリアルのポインタ
	**/
	CMaterial* GetMaterial(const char* name) const;

	/*!
	@brief	マテリアルを設定
	@param	no				[n]マテリアル番号
	@param	m				[in] マテリアル
	@retval	無し
	**/
	virtual void SetMaterial(int no, CMaterial* m)const {
		m_material[no] = m;
	}
	/*!
	@brief	マテリアル数の取得
	@param	no				[in] マテリアル番号
	@retval	マテリアルのポインタ
	**/
	int GetMaterialSize() const {
		return m_materialCnt;
	}

	/*!
	@brief	線分とモデルの判定
	@param	c				[out] 接触地点
	@param	n				[out] 接触面の法線
	@param	s				[in] 線分の開始地点
	@param	e				[in] 線分の終了地点
	@retval	true:接触　false:非接触
	**/
	bool CollisionRay(CVector3D* c, CVector3D* n, const CVector3D& s, const CVector3D& e)const;

	/*!
	@brief	線分とモデルの判定
	@param	s				[in] 線分の開始地点
	@param	e				[in] 線分の終了地点
	@retval	CCollTriangle	衝突した面データ
	**/
	std::vector<CCollTriangle> CollisionRay(const CVector3D& s, const CVector3D& e)const;


	/*!
	@brief	球とモデルの判定
	@param	center			[in] 球の中心
	@param	radius			[in] 球の半径
	@retval	CCollTriangle	衝突した面データ
	**/
	std::vector<CCollTriangle> CollisionSphere(const CVector3D& center, float radius)const;



	/*!
	@brief	カプセルとモデルの判定
	@param	top				[in] カプセルの天井
	@param	bottom			[in] カプセルの底
	@param	radius			[in] 球の半径
	@retval	CCollTriangle	衝突した面データ
	**/
	std::vector<CCollTriangle> CollisionCupsel(const CVector3D& top, const CVector3D& bottom, float radius)const;

	/*!
	@brief	OBBとモデルの判定
	@param	obb				[in] OBB
	@retval	CCollTriangle	衝突した面データ
	**/
	std::vector<CCollTriangle> CollisionOBB(const COBB& obb)const;

	/*!
	@brief	モデルオブジェクトの生成[obj]
	@param	path			[in] モデルファイル名
	@param	raw					[in] X分割数
	@param	col					[in] Z分割数
	@retval 成功:モデルオブジェクト 失敗:null
	**/
	static CModelObj* CreateModel(char *path, int cut_x=1, int cut_y=1, int cut_z=1);


	friend class CModelA3M;
};