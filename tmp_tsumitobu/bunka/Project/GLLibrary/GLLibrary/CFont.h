#pragma once
#include "GL.h"
#include <map>
#include <string>
#include <FTGL/ftgl.h>

#ifdef _DEBUG
#pragma comment(lib,"ftgl_static_D.lib")
#pragma comment(lib,"freetyped.lib")
#else
#pragma comment(lib,"ftgl_static.lib")
#pragma comment(lib,"freetype.lib")
#endif
class CFont {
private:
	FTPixmapFont* m_font;
	int m_size;
	static std::map<std::string, CFont*> m_instances;
public:
	/*!
	@brief	コンストラクタ
	@param	font			[in]	フォント
	@param	size			[in]	サイズ
	**/
	CFont(const char *font_path = "C:\\Windows\\Fonts\\msgothic.ttc", int size=24);
	/*!
	@brief	文字の表示
	@param	x				[in]	横位置
	@param	y				[in]	縦位置
	@param	r				[in]	色（赤）
	@param	g				[in]	色（緑）
	@param	b				[in]	色（青）
	@param	format			[in]	文字列、書式
	**/
	void Draw(int x,int y,float r,float g,float b, const char *format, ...);
	void Draw(int x, int y, float r, float g, float b, const wchar_t *format, ...);

	/*!
	@brief	解放
	**/
	void Release();

	static CFont* GetInstance(std::string name);
	static void CreateInstance(std::string name, const char* font = "ＭＳゴシック", int size = 24);
};

#define FONT_T()	CFont::GetInstance("default")
#define FONT(name)	CFont::GetInstance(name)
#define CREATE_FONT(name)	CFont::CreateInstance(name)
#define CREATE_FONT_F(name,font,size)	CFont::CreateInstance(name,font,size)