#pragma once


#include "GL.h"
#include <map>
#include <string>

class CFragShaderCallback {
public:
	virtual void SendFragParam() = 0;
};
class CShader {
public:
	enum {
		eVertexLocation,
		eNormalLocation,
		eTexcoordlLocation,
		eWeightsLocation,
		eIndicesLocation,
		eVertexColorLocation,
	};

private:
	GLuint vertexShader;
	GLuint fragShader;

	GLuint program;
	GLint linked;
	static std::map<std::string, CShader*> m_instances;


	/*!
	@brief	コードからシェーダプログラムを作成
	@param program	[in]	シェーダープログラム
	@param shader	[in]	シェーダーオブジェクト　glCreateShader(GL_VERTEX_SHADER),glCreateShader(GL_FRAGMENT_SHADER)
	@param file		[in]	シェーダーファイル名
	@retval	成否
	**/
	bool Load(GLuint shader, const char* file);
	/*!
	@brief	コードからシェーダプログラムを作成
	@param program	[in]	シェーダープログラム
	@param shader	[in]	シェーダーオブジェクト　glCreateShader(GL_VERTEX_SHADER),glCreateShader(GL_FRAGMENT_SHADER)
	@param code		[in]	シェーダーソースコード
	@retval	成否
	**/
	bool ReadCode(GLuint shader, const char* code);

public:

	/*!
		@brief	組み込み済みシェーダーの取得
		@param type [in] 組み込みの種類
				"SkinMesh"…スキンメッシュ用(fbx,x,a3m)
				"StaticMesh"…スタティック用(obj,field)
				"Image"…画像用
				"Solid"…基本図形用
				"Trail"…軌跡用
		@retval	シェーダーインスタンス
	**/
	static CShader* GetInstance(std::string type);

	/*!
		@brief	組み込み済みシェーダーの生成
		@param type [in] 組み込みの種類
		@retval	シェーダーインスタンス
	**/
	static CShader* CreateInstance(std::string type);
	/*!
	@brief	コンストラクタ
			シェーダオブジェクトの生成のみ
	**/
	CShader();
	/*!
	@brief	コンストラクタ
			組み込みシェーダーで生成
	@param type [in] 組み込みの種類
	**/
	CShader(std::string type);
	/*!
	@brief	コンストラクタ
			シェーダーファイルから生成
	@param vertexPath	[in]	頂点シェーダのファイル名
	@param fragPath	[in]		フラグメントシェーダのファイル名
	**/
	CShader(const char* vertexPath,const char*  fragPath);
	/*!
	@brief	デストラクタ
	**/
	~CShader();

	/*!
	@brief	頂点シェーダーに組み込みシェーダーを読み込み
	@param type [in] 組み込みの種類
	**/
	void ReadVertexShader(std::string type);


	/*!
	@brief	ファイルからシェーダプログラムを作成
	@param vertexPath	[in]	頂点シェーダのファイル名
	@param fragPath	[in]		フラグメントシェーダのファイル名
	@retval	成否
	**/
	bool Load(const char* vertexPath,const char*  fragPath);
	/*!
	@brief	ファイルからシェーダプログラムを個々に作成
	@param	path	[in]	シェーダーのファイル名
	@param	type	[in]	シェーダーオブジェクトの種類(GL_VERTEX_SHADER,GL_FRAGMENT_SHADER)
	@retval	成否
	**/
	bool Load(const char* path, GLuint type);
	/*!
	@brief	ソースコードからシェーダプログラムを個々に作成
	@param	code	[in]	シェーダーのソースコード
	@param	type	[in]	シェーダーオブジェクトの種類(GL_VERTEX_SHADER,GL_FRAGMENT_SHADER)
	@retval	成否
	**/
	bool ReadCode(const char* path,GLuint type);

	/*!
	@brief	ソースコードからシェーダプログラムを作成
	@param vertexcode	[in]	頂点シェーダのソースコード
	@param fragcode		[in]	フラグメントシェーダのソースコード
	@retval	成否
	**/
	bool ReadCode(const char* vertexcode, const char* fragcode);

	/*!
	@brief	フラグメントシェーダーへのデータ転送
	@param	s	[in]	CFragShaderCallbackを継承したオブジェクト
	@retval	無し
	**/
	void SendFragParam(CFragShaderCallback* s) {
		s->SendFragParam();
	}
	/*!
	@brief	シェーダー有効化
	@retval	無し
	**/
	void Enable();
	/*!
	@brief	シェーダー無効化
	@retval	無し
	**/
	void Disable();
	/*!
	@brief	シェーダープログラムの取得
	@retval	シェーダープログラム
	**/
	GLuint GetProgram() const{
		return program;
	}


};