#pragma once


#include "GL.h"
#include "CModel.h"
#include "Vertex.h"
#include "CTexture.h"
#include "CShader.h"
#include "fbxsdk.h"
#include <vector>
#include <list>


#ifdef _DEBUG
#pragma comment(lib,"libfbxsdk-mtd.lib")
#pragma comment(lib,"libxml2-mtd.lib")
#pragma comment(lib,"zlib-mtd.lib")
#else
#pragma comment(lib,"libfbxsdk-mt.lib")
#pragma comment(lib,"libxml2-mt.lib")
#pragma comment(lib,"zlib-mt.lib")
#endif
class CModelFBX;
class CFrameFBX{
public:

	char m_name[128];
	int	 m_no;			//フレーム番号
	FbxNode* m_pNode;

	CMatrix animMatrix;
	CMatrix boneMatrix;
	CMatrix matrix;
	CMatrix matrixOffset;
	CMatrix matrixRev;
	CMatrix localMatrix;
public:
	CFrameFBX() {
	}
	CFrameFBX(int no, FbxNode* pNode);
	CMatrix getWorldMatrix(const FbxTime& pTime);
	friend class CModelA3M;
	
};


//ボーン構造体
struct SBoneFBX
{
	CMatrix mBindPose;
	CMatrix mBindPoseInv;
	CMatrix mTransMatrix;
	CMatrix mAnimPose;
	CMatrix mOldPose;
	CMatrix mOffset;

	SBoneFBX()
	{
		ZeroMemory(this, sizeof(SBoneFBX));
	}
};
class CMeshFBX : public CFrameFBX{
public:
	GLuint* m_indexBuffers;
	GLuint m_vertexBuffer;
	int* m_numFace;
	int* m_material;
	int m_material_cnt;
	int		m_numBone;
	FbxCluster **m_ppCluster;
	SBoneFBX *m_BoneArray;

	FbxNode *m_pNode;
	MY_VERTEX* mp_Vertex;
	unsigned int m_vertexCnt;
	int** mp_Indexs;



	void CalcBoneMatrix(CMatrix* boneMatrix,float blend);
public:
	CMeshFBX(int no, FbxMesh* pMesh, FbxScene* pScene, CModelFBX* fbx);
	~CMeshFBX();
	void Render(const CMatrix& mv, const CMatrix& m, std::vector<CMaterial*>& materialList, CMatrix* boneMatrix, float blend);
	bool CollisionRay(CVector3D *c, CVector3D *n, const CVector3D &s, const CVector3D &e,float *lengh);

	int CollisionSphere(CCollTriangle *out, const CVector3D &center, float radius,int maxcnt);


	int CollisionCupsel(CCollTriangle *out, const CVector3D &top, const CVector3D &bottom, float radius, int maxcnt);


	void SaveBoneMatrix();
};
class CModelFBX : public CModel {
public:
	struct AnimationInfo {
		FbxManager* m_lSdkManager;
		FbxScene* m_lScene;
		FbxAnimStack* m_AnimationStack;
		FbxTakeInfo* m_TakeInfo;
		union {
			struct {
				float			m_start;
				float			m_end;
			};
			float time[2];
		};
		float			m_max;
		AnimationInfo(FbxManager* m, FbxScene* s, FbxAnimStack* a, FbxTakeInfo* t);
	};
private:

	int AddMaterial(FbxSurfaceMaterial* pMat);
	struct FBXInfo {
		FbxManager* m_lSdkManager;
		FbxScene* m_lScene;
		FbxArray<FbxString*>* m_AnimStackNameArray;
	};
	std::vector<AnimationInfo*> m_animation_list;

	std::vector<FBXInfo*> m_info_list;
	FbxManager* m_lSdkManager;
	FbxScene* m_lScene;
	FbxArray<FbxString*> *m_AnimStackNameArray;
	AnimationInfo* m_lCurrentAnimationStack;
	FbxTime::EMode m_timeMode;
	std::vector<CMaterial*> m_materialList;
	int m_bone_num;
	CMatrix* m_boneMatrix;
public:
	int m_animJam;
	float m_animSpeed;
	bool m_animLoop;
	float m_animEndFrame;
	float m_animTime;
	float m_animStartFrame;
	float m_blend;
	float m_blendvec;
	int m_anim_size;
	SAnimData*	m_pAnimData;

	void updateBoneMatrix(FbxNode* pNode, const FbxTime& pTime);
	void drawNode(FbxNode* pNode,CMatrix mv,CMatrix m);
	void createNode(FbxNode* pNode, int lv, int &no, bool preCreate);
	void destroyNode(FbxNode* pNode, int lv);
	CMatrix getFrameMatrix(FbxNode *pFrame, bool local);
	void setFrameRevMatrix(FbxNode *pFrame, CMatrix &m);


public:
	CModelFBX();
	CModelFBX(CModelFBX &m);
	bool AddAnimation(const char* filePath);
	AnimationInfo* GetAnimationInfo(int jam) {
		return m_animation_list[jam];
	}
	/*!
		@brief	モデル読み込み
		@param	filepath		[in] モデルファイル名
		@retval	true:成功　false:失敗
	**/
	bool Load(const char* filePath);
	/*!
		@brief	モデルの表示
		@param	m				[in] モデル行列
		@retval	無し
	**/
	void Render(CMatrix& m);


	void Render();

	void UpdateMatrix();

	/*!
		@brief	指定の行列で各ボーンを更新する
		@retval	無し
	**/
	void UpdateMatrix(CMatrix& m);
	
	/*!
		@brief	モデル開放
		@retval	無し
	**/
	void Release();
	/*!
		@brief	アニメーション更新
		@retval	無し
	**/
	void UpdateAnimation();
	/*!
		@brief　アニメーション終了判定
		@retval	true:終了
	**/
	bool isAnimationEnd();
	/*!
		@brief	アニメーションの番号を取得
		@retval	再生中番号（0～）
	**/
	int GetAnimationJam();
	/*!
		@brief	アニメーションの速度再生速度変更
		@retval	無し
	**/

	void SetAnimationSpeed(float s);
	/*!
		@brief	アニメーション切り替え
		@param	jam				[in] アニメーション番号
		@param	loop			[in] アニメーションループフラグ
		@param	check			[in] 既に再生中かチェック
		@param	frame			[in] 切り替え補間時間
		@retval	無し
	**/

	void ChangeAnimation(int jam, bool loop = true, bool check = true, float time = 0,float blendtime = 0.1);
	/*!
		@brief	アニメーションの現在フレームを取得
		@retval	フレーム
	**/

	float GetAnimationFrame();

	/*!
		@brief	アニメーションの数を取得
		@retval	アニメーションの数
	**/
	int GetAnimationSize() const;
	
	/*!
		@brief	アニメーションデータを設定
				一つのモーションデータを分割する場合に使用
		@param	p				[in] アニメーションデータ
		@param	loop			[in] アニメーションループフラグ
		@param	check			[in] 既に再生中かチェック
		@param	frame			[in] 切り替え補間時間
		@retval	無し
	**/
	void AttachAnimData(SAnimData *p);
	/*!
		@brief	ボーンの行列を取得
		@param	name			[in] ボーン名
		@param	local			[in] ローカル行列で取得フラグ
		@retval	無し
	**/
	CMatrix GetFrameMatrix(const char *name, bool local = false);


	/*!
		@brief	ボーンの行列を取得
		@param	name			[in] フレーム番号
		@param	local			[in] ローカル行列で取得フラグ
		@retval	無し
	**/
	CMatrix GetFrameMatrix(int no, bool local = false);


	/*!
	@brief	ボーンの補正行列を設定
	@param	name			[in] ボーン名
	@param	m				[in] 行列
	@retval	無し
	**/
	void SetFrameRevMatrix(const char *name, CMatrix &m);


	/*!
	@brief	ボーンの補正行列を設定
	@param	name			[in] フレーム番号
	@param	m				[in] 行列
	@retval	無し
	**/
	void SetFrameRevMatrix(int no, CMatrix &m);
	/*!
		@brief	マテリアルを取得
		@param	no				[in]マテリアル番号
		@param	mesh			[in] メッシュ番号
		@retval	無し
	**/
	CMaterial *GetMaterial(int no)const;
	/*!
	@brief	マテリアルを設定
	@param	no				[n]マテリアル番号
	@param	mesh			[in] メッシュ番号
	@retval	無し
	**/
	virtual void SetMaterial(int no, CMaterial* m);

	/*!
	@brief	線分とモデルの判定
	@param	c				[out] 接触地点
	@param	n				[out] 接触面の法線
	@param	s				[in] 線分の開始地点
	@param	e				[in] 線分の終了地点
	@retval	true:接触　false:非接触
	**/
	//bool CollisionRay(CVector3D* c, CVector3D* n, const CVector3D& s, const CVector3D& e)const;

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

	
	friend class CModelA3M;
	friend class CMeshFBX;

};

