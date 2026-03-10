/*!
 *	@brief		画像管理クラス
 *	
 */

#pragma once

#include "CRect.h"
#include "CMatrix.h"
#include "CTexture.h"

struct TexAnim {
	int pat;		//使用画像No（画像の左上０～）
	int cnt;		//次の画像までの待機フレーム
};

#define ANIMDATA(data) { data,sizeof(data) / sizeof(data[0])}

struct TexAnimData {
	TexAnim* pData;
	int		size;
};


class CImage : public CResource {
public:
	CTexture* mp_texture;
	CVector2D	m_pos;		//位置(pixel)
	CVector2D	m_center;	//中心位置(pixel)
	CVector2D	m_size;	//サイズ(pixel)
	CRect		m_src_rect;	//表示元矩形
	float		m_ang;		//回転値
	bool		m_flipH;	//左右反転
	bool		m_flipV;	//上下反転
	CColorRGBA	m_color;	//色
	int			m_width;	//テクスチャー幅
	int			m_height;	//テクスチャー高さ	
	TexAnimData* m_animData;	//アニメーションデータ
	int			m_animJam;	//アニメーション：種類
	int			m_animIndex;	//アニメーション：位置
	float		m_animCount;	//アニメーション：時間
	bool		m_animLoop;		//アニメーション：ループ
	float		m_animSpeed;	//アニメーション：速度
	int			m_pat_width;	//アニメーション：一枚の幅
	int			m_pat_height;	//アニメーション：一枚の高さ
	int			m_cut_width;	//アニメーション：列数


public:
	CImage();

	virtual ~CImage();
	/*!
	@brief	代入演算オーバーロード
	@param	img			[in] 読み込み済みの画像オブジェクト
	**/
	CImage& operator = (const CImage& img);
	/*!
		@brief	ファイルから画像を読み込む（24bitbmp,png対応）
		@param	d			[in] TexAnimData配列の先頭アドレス
		@param	width		[in] 一枚当たりの幅
		@param	height		[in] 一枚当たりの高さ
		@retval	結果
	**/

	bool Load(const char* filename, TexAnimData* d = nullptr, int width = 0, int height = 0);
	/*!
	@brief	読み込み
	@param	filename	[in] 画像ファイル
	@param	d			[in] TexAnimData配列の先頭アドレス
	@param	width		[in] 一枚当たりの幅
	@param	height		[in] 一枚当たりの高さ
	**/
	static CImage* CreateImage(const char* filename, TexAnimData* d = nullptr, int width = 0, int height = 0);


	/*!
		@brief	表示位置を設定する
		@param	x		[in] 横位置
		@param	y		[in] 縦位置
		@retval	無し
	**/
	void SetPos(float x,float y) {
		m_pos.x = x; m_pos.y = y;
	}
	/*!
		@brief	表示位置を設定する
		@param	p		[in] 座標
		@retval	無し
	**/
	void SetPos(const CVector2D& p) {
		m_pos = p;
	}

	CVector2D* GetPosPointer()
	{
		return &m_pos;
	}

	/*!
		@brief	回転の中心位置を設定する
		@param	x		[in] 横位置
		@param	y		[in] 縦位置
		@retval	無し
	**/
	void SetCenter(float x,float y) {
		m_center.x = x; m_center.y = y;
	}/*!
		@brief	回転の中心位置を設定する
		@param	p		[in] 位置
		@retval	無し
	**/
	void SetCenter(const CVector2D& p) {
		m_center = p;
	}

	/*!
		@brief	表示サイズを設定する
		@param	w		[in] 幅
		@param	h		[in] 高さ
		@retval	無し
	**/
	void SetSize(float w,float h) {
		m_size.x = w; m_size.y = h;
	}
	/*!
	@brief	表示サイズを設定する
	@param	p		[in] 幅,高さ
	@retval	無し
**/
	void SetSize(const CVector2D& s) {
		m_size = s;
	}
	CVector2D GetSize() {
		return m_size;
	}
	/*!
		@brief	表示元矩形を設定
		@param	left	[in] 左位置
		@param	top		[in] 上位置
		@param	right	[in] 右位置
		@param	bottom	[in] 下位置
		@retval	無し
	**/
	void SetRect(float left, float top, float right, float bottom);

	/*!
		@brief	回転値を設定
		@param	ang		[in] 回転値
		@retval	無し
	**/
	void SetAng(float ang){
		m_ang = ang;
	}

	/*!
		@brief	左右反転フラグを設定
		@param	f		[in] true:水平反転 false:通常
		@retval	無し
	**/
	void SetFlipH(bool f) {
		m_flipH = f;
	}
	/*!
		@brief	上下反転フラグを設定
		@param	f		[in] true:上下反転　false:通常 
		@retval	無し
	**/
	void SetFlipV(bool f) {
		m_flipV = f;
	}

	/*!
		@brief	色を設定
		@param	r		[in] 赤成分
		@param	g		[in] 緑成分
		@param	b		[in] 青成分
		@param	a		[in] 不透明度
		@retval	無し
	**/
	void SetColor(float r, float g, float b, float a);

	/*!
	@brief	アニメーションの更新
	**/
	void UpdateAnimation();
	/*!
	@brief	アニメーションデータのセット
	@param	d			[in] TexAnimData配列の先頭アドレス
	@param	width		[in] 一枚当たりの幅
	@param	height		[in] 一枚当たりの高さ
	**/
	void AttachAnimationData(TexAnimData* d, int width, int height);
	/*!
	@brief	アニメーション切り替え
	@param	num			[in] アニメーション番号
	@param	loop		[in] アニメーションループフラグ
	@param	index		[in] 開始位置
	@param	check		[in] 既に再生中なら切り替えない（再スタートしない）
	**/
	void ChangeAnimation(int num, bool loop = true, int index = 0, bool check = true);
	/*!
	@brief	アニメーション速度変更
	@param	speed		[in] 再生速度（デフォルト1）
	**/
	void SetAnimationSpeed(float speed);
	/*!
	@brief	アニメーション終了チェック
	@retval	終了ならtrue
	**/
	bool CheckAnimationEnd();
	/*!
	@brief	再生中のアニメーションデータの取得プフラグ
	@retval	現在のアニメーションデータ
	**/
	const TexAnim* GetAnimationParam() const {
		return &m_animData[m_animJam].pData[m_animIndex];
	}
	/*!
	@brief	現在の再生位置を取得
	@retval	再生位置
	**/
	int GetIndex() {
		return m_animIndex;
	}
	/*!
	@brief	現在のカウントを取得
	@retval	カウント
	**/
	int GetCount() {
		return (int)m_animCount;
	}
	/*!
	@brief	描画
	@retval	無し
	**/
	void Draw();



	/*!
		@brief	同じ画像の連続描画開始（スコアやマップチップで使用）
		@retval	無し
	**/
	void DrawBegin();

	/*!
		@brief	同じ画像の連続描画
		@retval	無し
	**/
	void DrawS();
	/*!
		@brief	同じ画像の連続描画終了
		@retval	無し
	**/
	void DrawEnd();

	/*!
	@brief	画像同士の衝突判定
	@param	img		[in] 衝突対象物
	@retval	接触：true　,非接触:false
	**/
	bool CollisionImage(const CImage &img);


	/*!
	@brief	画像と矩形の衝突判定
	@param	rect		[in] 衝突矩形
	@retval	接触：true　,非接触:false
	**/
	bool CollisionRect(const CRect &rect);


	/*!
	@brief	画像と点の衝突判定
	@param	img		[in] 衝突対象物
	@retval	接触：true　,非接触:false
	**/
	bool CollisionPoint(const CVector2D &pos);

	void Release();

	virtual unsigned int GetDataSize() {
		return m_width * m_height * 4;
	};

};