/*!
*	@brief	モデルの基本クラス
*
*
**/
#pragma once

#include "CMatrix.h"
#include "CTexture.h"
#include "CShader.h"
#include "CResource.h"
#include "Vertex.h"
class COBB;
//アニメーションデータ構造体
struct SAnimData {
	int	start;	//開始フレーム
	int end;	//終了フレーム
};

#define NAME_STR_SIZE 256
/*!
@brief	マテリアルクラス
**/
class CMaterial : public CFragShaderCallback {
public:
	char m_name[NAME_STR_SIZE];
	CVector4D m_ambient;	//アンビエントカラー
	CVector4D m_diffuse;	//デフューズカラー
	CVector3D m_specular;	//スペキュラーカラー
	CVector3D m_emissive;	//自己発光
	float m_shininess;		//スペキュラー係数
	float m_alpha;
	char m_texture_name[NAME_STR_SIZE];
	CVector2D m_st;
	CTexture *mp_texture;		//テクスチャー
	CShader* mp_shader;
public:
	CMaterial();
	CMaterial(const CMaterial& mat);
	/*!
	@brief	マテリアル（のテクスチャー）解放

	@retval	無し
	**/

	void Release();
	/*!
	@brief	マテリアルを反映
	@param	shader		[in]	シェーダーオブジェクト
	@retval	無し
	**/
	void Map();
	/*!
	@brief	マテリアル（のテクスチャー）を無効化
	@retval	無し
	**/
	void Unmap();



	/*!
		@brief	フラグメントシェーダーへのデータ転送
				派生マテリアルクラスを定義しオーバーライドすると独自シェーダーで動く
		@retval	無し
	**/
	virtual void SendFragParam();

};
struct CCollTriangle {
	CVector3D	m_normal;		//接触面の法線
	CVector3D	m_vertex[3];	//接触面の３頂点
	CVector3D	m_cross;		//接触点
	float	m_dist;				//面までの距離(負の数の場合はめり込み量)
	int		m_material_id;		//マテリアル
	CCollTriangle(const CVector3D& normal, const CVector3D& v0, const CVector3D& v1, const CVector3D& v2, float dist, int material_id) {
		m_normal = normal;
		m_vertex[0] = v0; m_vertex[1] = v1; m_vertex[2] = v2;
		m_dist = dist;
		m_material_id = material_id;
	}
	CCollTriangle(const CVector3D& normal, const CVector3D& v0, const CVector3D& v1, const CVector3D& v2, const CVector3D& cross, float dist, int material_id) {
		m_normal = normal;
		m_vertex[0] = v0; m_vertex[1] = v1; m_vertex[2] = v2;
		m_cross = cross;
		m_dist = dist;
		m_material_id = material_id;
	}
	void Transform(const CMatrix &m) {
		m_normal = (m*m_normal).GetNormalize();
		m_vertex[0] = (m*CVector4D(m_vertex[0], 1.0f));
		m_vertex[1] = (m*CVector4D(m_vertex[1], 1.0f));
		m_vertex[2] = (m*CVector4D(m_vertex[2], 1.0f));
	}
};


class CModel : public  CResource {
public:
	CVector3D m_pos;	//座標		
	CVector3D m_rot;	//回転値
	CVector3D m_scale;	//スケール値
	
	CVector3D m_baserot;	//回転値

	CMatrix m_matrix;	//ワールド（モデル）行列
	CMatrix m_transMtx;	//平行移動行列
	CMatrix m_rotMtx;	//回転行列
	CMatrix m_scaleMtx;	//スケーリング行列
protected:
	static const int PATH_SIZE = NAME_STR_SIZE;
	char	m_filePath[PATH_SIZE];
	void	MakePath(const char* filenPath);
	//CShader		*m_shader;	//シェーダー

public:
	/*!
		@brief	コンストラクタ

	**/
	CModel();
	/*!
		@brief デストラクタ
	*/
	virtual ~CModel() {

	}
	/*!
		@brief	座標を設定する
		@param	pos				[in] 座標
		@retval	無し
	**/
	void SetPos(CVector3D pos){
		m_pos = pos;
	}
	/*!
		@brief	座標を設定する
		@param	x				[in] x座標
		@param	y				[in] y座標
		@param	z				[in] z座標
		@retval	無し
	**/
	void SetPos(float x,float y,float z){
		m_pos.x = x;
		m_pos.y = y;
		m_pos.z = z;
	}	

	/*!
		@brief	座標を取得する
		@retval 座標
	**/
	CVector3D GetPos()const {
		return m_pos;
	}
	/*!
		@brief	回転値を設定する
		@param	rot				[in] 回転値
		@retval	無し
	**/

	void SetRot(CVector3D rot){
		m_rot = rot;
	}

	/*!
		@brief	基礎回転値を設定する(モデルが前後逆になっている等用)
		@param	x				[in] x軸回転値
		@param	y				[in] y軸回転値
		@param	z				[in] z軸回転値
		@retval	無し
	**/
	void SetBasetRot(float x,float y,float z){
		m_baserot.x = x;
		m_baserot.y = y;
		m_baserot.z = z;
	}
	/*!
		@brief	回転値を設定する
		@param	x				[in] x軸回転値
		@param	y				[in] y軸回転値
		@param	z				[in] z軸回転値
		@retval	無し
	**/
	void SetRot(float x,float y,float z){
		m_rot.x = x;
		m_rot.y = y;
		m_rot.z = z;
	}

	/*!
		@brief	回転値を取得する
		@retval	回転値
	**/
	CVector3D GetRot()const {
		return m_rot;
	}

	/*!
		@brief	スケールを設定する
		@param	scale			[in] スケール値
		@retval	無し
	**/

	void SetScale(CVector3D scale){
		m_scale = scale;
	}
	
	/*!
		@brief	スケール値を設定する
		@param	x				[in] x軸スケール
		@param	y				[in] y軸スケール
		@param	z				[in] z軸スケール
		@retval	無し
	**/
	void SetScale(float x,float y,float z){
		m_scale.x = x;
		m_scale.y = y;
		m_scale.z = z;
	}

	/*!
		@brief	スケール値を取得す
		@retval	スケール値
	**/
	CVector3D GetScale()const {
		return m_scale;
	}

	/*!
		@brief	平行移動行列を取得する
		@retval	平行移動魚行列
	**/
	CMatrix GetTransMatrix()const {
		return m_transMtx;
	}

	/*!
		@brief	回転行列を取得する
		@retval	回転行列
	**/
	CMatrix GetRotMatrix()const {
		return m_rotMtx;
	}
	/*!
		@brief	スケーリング行列を取得する
		@retval	スケーリング行列
	**/
	CMatrix GetScaleMatrix() const {
		return m_scaleMtx;
	}

	/*!
		@brief	座標、回転値、スケール値からワールド行列を作成する
		@retval	無し
	**/
	virtual void UpdateMatrix();


	/*!
		@brief	指定の行列で各ボーンを更新する
		@retval	無し
	**/
	virtual void UpdateMatrix(CMatrix& m) {}


	/*!
		@brief	ワールド行列を設定する
		@param	m				[in] 行列
		@retval	無し
	**/
	void SetMatrix(CMatrix &m){
		m_matrix = m;
	}
	/*!
		@brief　ワールド行列を取得する
		@retval	ワールド行列
	**/
	CMatrix GetMatrix()const {
		return m_matrix;
	}

	/*!
		@brief	ファイルからモデルを読み込む
		@retval	結果　true成功 false失敗
	**/
	virtual bool Load(const char *path){ return false; }
	
	/*!
		@brief	行列を指定して描画する
		@param	m				[in] ワールド行列
		@retval	無し
	**/
	virtual void Render(CMatrix &m)=0;

	/*!
		@brief	描画する
		@retval	無し
	**/
	virtual void Render() = 0;

	/*!
		@brief	描画する
		@retval	無し
	**/
	virtual void RenderBuilbord(CMatrix& m);

	virtual void RenderBuilbord();


	/*!
		@brief	モデルを破棄する
		@retval	無し
	**/
	virtual void Release()=0;


	/*
		@brief	シェーダーへ基本情報（変換行列、ライト）を転送する
		@retval	無し
	*/
	static  void SendShaderParam(CShader * s,const CMatrix &m, const CMatrix &mv, const CMatrix &p);

	/*!
	@brief	アニメーション更新
	@retval	無し
	**/
	virtual void UpdateAnimation(){ printf("非搭載"); }
	
	/*!
	@brief　アニメーション終了判定
	@retval	true:終了
	**/
	virtual bool isAnimationEnd()const { printf("非搭載"); return false; };
	/*!
	@brief	アニメーションの番号を取得
	@retval	再生中番号（0～）
	**/
	virtual int GetAnimationJam()const { printf("非搭載"); return 0; }
	/*!
	@brief	アニメーションの速度再生速度変更
	@retval	無し
	**/
	virtual void SetAnimationSpeed(float s){ printf("非搭載"); }
	/*!
	@brief	アニメーションの現在フレームを取得
	@retval	フレーム
	**/
	virtual float GetAnimationFrame()const { printf("非搭載"); return 0; }
	/*
	@brief	アニメーション切り替え
	@param	jam				[in] アニメーション番号
	@param	loop			[in] アニメーションループフラグ
	@param	check			[in] 既に再生中かチェック
	@param	frame			[in] 切り替え補間時間
	@retval	無し
	**/
	virtual void ChangeAnimation(int jam, bool loop = true, bool check = true, float time = 0, float blendtime = 0.1){ printf("非搭載"); }
	/*
	@brief	アニメーション数取得
	@retval	アニメーション数
	**/
	virtual int GetAnimationSize() const { printf("非搭載"); return 0; }
	virtual char* GetAnimationName(int jam) const { return nullptr; }


	/*!
	@brief	ボーン、ノードの数を取得

	@retval	ボーン数
	**/
	virtual int GetBoneSize() const { printf("非搭載"); return 0; }

	/*!
	@brief	ボーンの行列を取得
	@param	name			[in] ボーン名
	@param	local			[in] ローカル行列で取得フラグ
	@retval	無し
	**/
	virtual CMatrix GetFrameMatrix(const char *name, bool local = false) const { printf("非搭載"); return CMatrix(); }
	/*!
	@brief	ボーンの行列を取得
	@param	name			[in] フレーム番号
	@param	local			[in] ローカル行列で取得フラグ
	@retval	無し
	**/
	virtual CMatrix GetFrameMatrix(int no, bool local = false) const { printf("非搭載"); return CMatrix(); }


	/*
	　ボーンの補正行列を設定
	 */
	virtual void SetFrameRevMatrix(const char *name, CMatrix &m) { printf("非搭載"); }
	/*
	　ボーンの補正行列を設定
	 */
	virtual void SetFrameRevMatrix(int no, CMatrix &m) { printf("非搭載"); }


	/*!
	@brief	ボーンを指定の方向へ向ける
	@param	no			[in] ボーン番号
	@param	mat			[in] 回転行列
	**/
	virtual void BindFrameMatrix(int no, const CMatrix& mat) { printf("非搭載"); }
	/*!
	@brief	ボーンを指定の方向へ向ける
	@param	no			[in] ボーン名前
	@param	mat			[in] 回転行列
	**/
	virtual void BindFrameMatrix(const char* name, const CMatrix& mat) { printf("非搭載"); }


	/*!
	@brief	ボーンの指定方向への固定を解除
	@param	no			[in] ボーン番号
	**/
	virtual void UnbindFrameMatrix(int no) { printf("非搭載"); }
	/*!
	@brief	ボーンの指定方向への固定を解除
	@param	no			[in] ボーン名前
	**/
	virtual void UnbindFrameMatrix(const char* name) { printf("非搭載"); }

	/*!
	@brief	マテリアルを取得
	@param	no				[in]マテリアル番号
	@param	mesh			[in] メッシュ番号
	@retval	無し
	**/
	virtual CMaterial *GetMaterial(int no)const { printf("非搭載"); return NULL; }

	/*!
	@brief	マテリアルを取得
	@param	no				[in]マテリアル番号
	@param	mesh			[in] メッシュ番号
	@retval	無し
	**/
	virtual CMaterial* GetMaterial(const char* name)const { printf("非搭載"); return NULL; }

	/*!
	@brief	マテリアルを設定
	@param	no				[n]マテリアル番号
	@param	mesh			[in] メッシュ番号
	@retval	無し
	**/
	virtual void SetMaterial(int no,CMaterial *m) { printf("非搭載"); }
	/*!
	@brief	マテリアル数の取得
	@param	no				[in] マテリアル番号
	@retval	マテリアルのポインタ
	**/
	virtual int GetMaterialSize() const { printf("非搭載"); return NULL; }
	/*!
		@brief	線分とモデルの判定
		@param	c				[out] 接触地点
		@param	n				[out] 接触面の法線
		@param	s				[in] 線分の開始地点
		@param	e				[in] 線分の終了地点
		@retval	true:接触　false:非接触
		**/
	virtual bool CollisionRay(CVector3D* c, CVector3D* n, const CVector3D& s, const CVector3D& e) const { return false; }

	/*!
	@brief	線分とモデルの判定
	@param	s				[in] 線分の開始地点
	@param	e				[in] 線分の終了地点
	@retval	CCollTriangle	衝突した面データ
	**/
	virtual std::vector<CCollTriangle> CollisionRay(const CVector3D& s, const CVector3D& e)const {
		return std::vector<CCollTriangle>();
	}


	/*!
	@brief	球とモデルの判定
	@param	center			[in] 球の中心
	@param	radius			[in] 球の半径
	@retval	CCollTriangle	衝突した面データ
	**/
	virtual std::vector<CCollTriangle> CollisionSphere(const CVector3D& center, float radius)const {
		return std::vector<CCollTriangle>();
	}



	/*!
	@brief	カプセルとモデルの判定
	@param	top				[in] カプセルの天井
	@param	bottom			[in] カプセルの底
	@param	radius			[in] 球の半径
	@retval	CCollTriangle	衝突した面データ
	**/
	virtual std::vector<CCollTriangle> CollisionCupsel(const CVector3D& top, const CVector3D& bottom, float radius)const{
		return std::vector<CCollTriangle>();
	}
	/*!
	@brief	OBBとモデルの判定
	@param	obb				[in] OBB
	@retval	CCollTriangle	衝突した面データ
	**/
	virtual std::vector<CCollTriangle> CollisionOBB(const COBB& obb)const {
		return std::vector<CCollTriangle>();
	}


	/*!
	@brief	モデルオブジェクトの生成[x,obj,fbx]
	@param	path			[in] モデルファイル名
	@param	cutX			[in] 当たり判定用分割数
	@param	cutZ			[in] 当たり判定用分割数
	@retval 成功:true 失敗:false
	**/
	static CModel* CreateModel(const char *path, int cut_x = 0, int cut_y = 0, int cut_z = 0);



};
