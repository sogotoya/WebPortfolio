#pragma once

#include "GL.h"
#include "CResource.h"

class CTexture : public CResource{
protected:
	unsigned char *m_data;
public:
	int m_wrap;
	int m_filter;
	int	m_width;
	int m_height;
	int m_internalFormat;
	int m_format;
	unsigned int m_imgSize;
	int m_type;

	unsigned int m_bufID;
	bool loadTiff(const char *path);
	bool loadBmp(const char *path);
	bool loadPng(const char *path);
public:
	CTexture();
	//空のテクスチャ生成
	CTexture(int width, int height, GLenum format);
	~CTexture();
	static CTexture* LoadTexture(const char *path);
	bool Load(const char *path);
	virtual void MapTexture();
	void UnmapTexture();
	void Release();

	void SetWrapST(int wrapst);
	void SetFilter(int filter);

	
	void Draw();
};