/*!
*	@brief	Xファイル（スキンメッシュモデル）用モデルクラス
*
*
**/
#pragma once

#include "GL.h"

#include "CXModelLoader.h"
#include "CTexture.h"
#include "CShader.h"


#include "Vertex.h"
#include "CModel.h"

class CXMesh;
/*
モデルの階層構造用クラス
CXFrameをスキンメッシュ用に派生
*/
class CFrameBone : public CXFrame {
private:
	CMatrix boneMatrix;
	CMatrix sMatrix;
	CMatrix lMatrix;
	CMatrix matrixOffset;
	CMatrix blendMatrix;
	CXMesh	*pMesh;
	CMatrix bindMatrix;
	int		m_anim_layer;
	bool	m_bind;
	CModel* root;
public:
	CFrameBone() :CXFrame(), pMesh(nullptr){
		m_anim_layer = 0;
	}
	CFrameBone(CXFrame &f):pMesh(nullptr) {
		SetNo(f.GetNo());
		SetMatrix(f.GetMatrix());
		SetType(f.GetType());
		copyToken(f.GetToken());
		copyName(f.GetName());
		m_anim_layer = 0;
	}
	CFrameBone(CFrameBone &f, CFrameBone *parent, CFrameBone *prev,CModel* root);
	CMatrix GetSMatrix() {
		return sMatrix;

	}
	CMatrix GetLMatrix() {
		return lMatrix;

	}
	void SetAnimLayer(int layer) {
		m_anim_layer = layer;
	}
	void saveBlendMatrix() {
		blendMatrix = matrix;
	}
	void calcBlendMatrix(float r) {
		matrix = matrix * r + blendMatrix * (1 - r);
	}
	void calcBoneMatrix(CMatrix *out);
	void calcMatrix();
	CMatrix GetMatrixOffset() {
		return matrixOffset;
	}
	void seMatrixOffset(CMatrix mat) {
		matrixOffset = mat;
	}

	friend class CModelX;
	friend class CXAnimation;
	friend class CModelA3M;
};
/*
アニメーション管理クラス
読み込んだアニメーション構造をそのまま使用
*/
class CXAnimation {

private:
	std::vector<CXAnimationSet*> *pAnimation;
	float time;
	int jam;
	float speed;
	bool loop;
	int endTime;
	CFrameBone *pBoneRoot;
	float blend;
	float blendS;
	float FPS;
	SAnimData *pAnimData;
private:
	CMatrix calcMatrix(CXAnimationKey &key, float t);
public:
	int m_anim_layer;
	CXAnimation();
	CXAnimation(std::vector<CXAnimationSet*> &a);
	~CXAnimation();
	void Release();
	int GetEndTime(int j);
	void changeAnimation(int j, bool l = true, bool check = true, float time = 0,int blendFrame = 0);
	void upDate();
	void updateMatrix();
	void saveBlendMatrix();
	bool isEnd() {
		if (time >= endTime - 1.0f) return true;
		return false;
	}
	int GetJam() {
		return jam;
	}
	int GetLoop() {
		return loop;
	}
	void SetSpeed(float s) {
		speed = s;
	}
	float GetAnimationFrame() {
		return time;
	}
	void attachFrame(CFrameBone *bone) {
		pBoneRoot = bone;
	}
	void attachAnimData(SAnimData* p) {
		pAnimData = p;
	}

	int GetAnimationSize() { return (int)pAnimation->size(); }

	char* GetAnimationName(int jam) { return (*pAnimation)[jam]->GetName(); }
	friend class CModelX;
	friend class CModelA3M;
};

struct SSkinWeight {
	SXVector4 bone;
	SXVector4 weight;
};


/*
各頂点に設定されたウェイト値を頂点毎にまとめるクラス
*/
class CSkinWeights {
public:
	SSkinWeight * weight;
public:
	CSkinWeights(CXModelLoader &loader, CXLMesh &mesh);
	~CSkinWeights();
};
/*
ポリゴンクラス
マテリアル毎にまとめる
*/
class CXPoly {
public:
	MY_VERTEX * m_pVertex;
	int			vertexCnt;
	int			faceCnt;
	bool		bNormal;
	bool		bTexCode;
	bool		bWeight;
	int			material;
	GLuint		buffer;
	GLuint		vao;
public:
	/*
	ローダーからポリゴンデータを構築
	*/
	CXPoly(CXModelLoader &loader, CXLMesh &mesh, CSkinWeights *bone, int matNo);
	~CXPoly();
	/*
	描画
	*/
	void draw(CShader *shader);

	bool CollisionRay(CVector3D *c, CVector3D *n, const CVector3D &s, const CVector3D &e, float *pLength);
	int CollisionSphere(CCollTriangle *out, const CVector3D &center, float radius);
	int CollisionCupsel(CCollTriangle *out, const CVector3D &top, const CVector3D &bottom, float radius);

};
/*
メッシュ毎のボーンオフセット行列を格納
*/
class CBoneOffset {
public:
	char transformNodeName[64];
	CMatrix matrixOffset;
	CBoneOffset() {
	}
	/*
	SkinWeightsからボーン名とマトリックスのみを格納
	*/
	CBoneOffset(CXSkinWeights &s) {
		strcpy_s(transformNodeName, sizeof(transformNodeName), s.transformNodeName);
		matrixOffset = s.matrixOffset;
	}

};
/*
メッシュクラス
*/
class CXMesh {
private:
	std::vector<CXPoly*> polyList;
	std::vector<CBoneOffset*> boneList;
	CMatrix matrix;
	bool visibility;
public:
	/*
	ローダーからメッシュデータを構築
	*/
	CXMesh(CXModelLoader &loader, CXLMesh &mesh, CSkinWeights *bone);
	CXMesh(const CXMesh& mesh);
	~CXMesh();
	CXMesh operator = (const CXMesh &m);
	void Release();
	/*
	描画
	*/
	void draw(std::vector<CMaterial*> &materialList, CShader *shader, CFrameBone *pFrameRoot, CMatrix *boneMatrix, int boneNum);

	void SetVisibility(bool f) { visibility = f; }
	bool CollisionRay(CVector3D *c, CVector3D *n, const CVector3D &s, const CVector3D &e, float *pLength);
	int CollisionSphere(CCollTriangle *out, const CVector3D &center, float radius);
	int CollisionCupsel(CCollTriangle *out, const CVector3D &top, const CVector3D &bottom, float radius);
	friend class CModelX;
	friend class CXMesh;
	friend class CModelA3M;

};

/*
ｘファイル用モデルクラス
*/
class CModelX : public CModel {
public:
	std::vector<CXMesh*> *pMeshList;
	std::vector<CMaterial*> *pMaterialList;
	CFrameBone *pFrameRoot;
	int			boneNum;
	CMatrix *boneMatrix;
	CXAnimation *animation;
	CShader* m_shader;
	void createFrame(CXFrame *xf, CFrameBone *f, int *num);
	void createMesh(CFrameBone *f, CXModelLoader &loader);
	void createMeshList(CFrameBone *f);
	void drawMesh(CFrameBone *f, const CMatrix& m, const CMatrix& view_matrix);
	void outputFrameInfo(FILE* fp, CXFrame *f, int depth);
public:
	CModelX();
	~CModelX();
	CModelX(const CModelX &m);
	void operator = (const CModelX &m);
	void Release();
	/*
	ローダーからモデルを構築
	*/
	bool Load(CXModelLoader &loader);
	/*
	ファイルからモデルを構築
	*/
	bool Load(const char* filePath);
	/*
	アニメーションを更新
	*/
	void UpdateAnimation();
	/*!
		@brief	座標、回転値、スケール値からワールド行列を作成する
		@retval	無し
	**/
	void UpdateMatrix();


	/*!
		@brief	指定の行列で各ボーンを更新する
		@retval	無し
	**/
	void UpdateMatrix(CMatrix& m);


	/*
	アニメーションの終了を判定
	*/
	bool isAnimationEnd(int layer);
	bool isAnimationEnd();
	/*
	アニメーションの種類を取得
	*/
	int GetAnimationJam(int layer = 0);
	/*
	アニメーションループフラグを取得
	*/
	int GetAnimatioLoop(int layer = 0);
	/*
	　アニメーション速度の変更
	 */
	void SetAnimationSpeed(int layer, float s);
	void SetAnimationSpeed(float s);
	/*!
	@brief	アニメーションの現在フレームを取得
	@retval	フレーム
	**/
	float GetAnimationFrame(int layer) {
		return 	animation[layer].GetAnimationFrame();
	}
	float GetAnimationFrame() {
		return 	animation[0].GetAnimationFrame();
	}
	/*
	@brief	アニメーション数取得
	@retval	アニメーション数
	**/
	int GetAnimationSize(int layer) const { return animation ? animation[layer].GetAnimationSize():0; }

	int GetAnimationSize() const { return animation ? animation[0].GetAnimationSize() : 0; }

	char* GetAnimationName(int layer, int jam) const { return animation ? animation[layer].GetAnimationName(jam):nullptr; }

	char* GetAnimationName(int jam) const { return animation ? animation[0].GetAnimationName(jam):nullptr; }

	/*
	アニメーションを切り替える
	*/
	void ChangeAnimation(int jam, bool loop = true, bool check = true, float time = 0, int blendFrame = 5);
	void ChangeAnimation(int layer, int jam, bool loop = true, bool check = true, float time = 0, int blendFrame = 0);
	void SetAnimation(int layer_dst, int layer_src);
	void attachAnimData(int layer, SAnimData* p);
	void attachAnimData(SAnimData* p);

	/*!
	@brief	ボーンを指定の方向へ向ける
	@param	no			[in] ボーン番号
	@param	mat			[in] 回転行列
	**/
	void BindFrameMatrix(int no, const CMatrix& mat);
	/*!
	@brief	ボーンを指定の方向へ向ける
	@param	no			[in] ボーン名前
	@param	mat			[in] 回転行列
	**/
	void BindFrameMatrix(const char* name, const CMatrix& mat);

	/*!
	@brief	ボーンの指定方向への固定を解除
	@param	no			[in] ボーン番号
	**/
	void UnbindFrameMatrix(int no);
	/*!
	@brief	ボーンの指定方向への固定を解除
	@param	no			[in] ボーン名前
	**/
	void UnbindFrameMatrix(const char* name);
	/*
	描画
	*/
	void Render(CMatrix &m);

	void Render();
	/*
	　ボーンの行列を取得
	 */
	CMatrix GetFrameMatrix(const char *name, bool local = false);
	/*
	　ボーンの行列を取得
	 */
	CMatrix GetFrameMatrix(int no, bool local = false);


	/*
	　メッシュを取得
	 */
	CXMesh *GetMesh(const char *name);
	CXMesh *GetMesh(int no);



	/*
	　ボーン取得
	 */
	CFrameBone* GetFrameBone(const char *name)const ;
	CFrameBone* GetFrameBone(int no)const;


	/*!
	@brief	マテリアルの取得
	@param	no				[in] マテリアル番号
	@retval	マテリアルのポインタ
	**/
	CMaterial *GetMaterial(int no);


	/*!
	@brief	マテリアルの設定
	@param	no				[n]マテリアル番号
	@param	m				[in] マテリアル
		@retval	マテリアルのポインタ
	**/
	void SetMaterial(int no, CMaterial* m);

	

	/*!
	@brief	マテリアル数の取得
	@param	no				[in] マテリアル番号
	@retval	マテリアルのポインタ
	**/
	int GetMaterialSize() const {
		return (int)pMaterialList->size();
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
	//std::vector<CCollTriangle> CollisionRay(const CVector3D& s, const CVector3D& e)const;


	/*!
	@brief	球とモデルの判定
	@param	center			[in] 球の中心
	@param	radius			[in] 球の半径
	@retval	CCollTriangle	衝突した面データ
	**/
	//std::vector<CCollTriangle> CollisionSphere(const CVector3D& center, float radius)const;



	/*!
	@brief	カプセルとモデルの判定
	@param	top				[in] カプセルの天井
	@param	bottom			[in] カプセルの底
	@param	radius			[in] 球の半径
	@retval	CCollTriangle	衝突した面データ
	**/
	//std::vector<CCollTriangle> CollisionCupsel(const CVector3D& top, const CVector3D& bottom, float radius)const;



	/*!
	@brief	ボーンの階層構造をファイルへ出力する
	@param	file_name		[in] 書き込み先
	@retval	接触ポリゴン数
	**/
	void OutputFrameInfo(const char *file_name);

	friend class CModelX;
	friend class CModelA3M;
};