#pragma once
#include "GL.h"
class CVector3D;
class CVector4D;
class CMatrix;
//ベクトルの定義と各種計算
struct SVector2D{
	union {
		float v[2];
		struct {
			float x;
			float y;
		};
		struct {
			int ix;
			int iy;
		};
	};
};
class CVector2D : public SVector2D{
public:
	CVector2D(){}
	CVector2D(float x, float y);
	CVector2D(const CVector2D& v);
	
	//単項演算子-
	CVector2D operator - () const;

	//ベクトル引き算( this - v )
	CVector2D operator - (const CVector2D& v) const;
	//ベクトル引き算( this - v )
	void operator -= (const CVector2D& v);
	
	//ベクトル足し算( this + v )
	CVector2D operator + (const CVector2D& v) const;
	
	//ベクトル足し算( this + v )
	void operator += (const CVector2D& v);

	//ベクトル掛け算( this * f )
	CVector2D operator * (const float& f) const;
	//ベクトル掛け算( this * f )
	void operator *= (const float& f);
	//ベクトル割り算( this * f )
	CVector2D operator / (const float& f) const;
	
	bool operator == (const CVector2D& v) const;
	bool operator != (const CVector2D& v) const;

	//ベクトルの内積
	float Dot(const CVector2D& v)const;
	static float Dot(const CVector2D& v1, const CVector2D& v2);
	//ベクトルの外積
	float Cross(const CVector2D& v)const;
	static float Cross(const CVector2D& v1, const CVector2D& v2);


	//ベクトルの大きさ
	float Length() const;
	//ベクトルの大きさの２乗
	float LengthSq() const;
	//自身を単位ベクトルにする
	void Normalize();
	//単位ベクトルを返却
	CVector2D GetNormalize() const;

	const static CVector2D up;
	const static CVector2D down;
	const static CVector2D left;
	const static CVector2D right;
	const static CVector2D zero;
};

typedef struct SVector3D{
	union {
		float v[3];
		struct {
			float x;
			float y;
			float z;
		};
		struct {
			float r;
			float g;
			float b;
		};
		struct {
			long ix;
			long iy;
			long iz;
		};
	};
}SColorRGB;
class CVector3D : public SVector3D{
public:
	
	CVector3D(){}
	CVector3D(float x, float y, float z);
	CVector3D(const CVector3D& v);
	CVector3D(const SVector3D& v);
	CVector3D(const SVector2D& v);
	CVector3D(const CVector4D&);
	CVector3D operator = (const CVector4D&);

	//ベクトル引き算( this - v )
	CVector3D operator - () const;


	//ベクトル引き算( this - v )
	CVector3D operator - (const CVector3D& v) const;
	//ベクトル引き算( this - v )
	void operator -= (const CVector3D& v);
	
	//ベクトル足し算( this + v )
	CVector3D operator + (const CVector3D& v) const;
	
	//ベクトル足し算( this + v )
	void operator += (const CVector3D& v);

	//ベクトル掛け算( this * f )
	CVector3D operator * (const float& f) const;
	//ベクトル掛け算( this * f )
	void operator *= (const float& f);
	//ベクトル割り算( this * f )
	CVector3D operator / (const float& f) const;	
	//ベクトル外積( this × vr )
	CVector3D operator * (const CVector3D& vr) const;
	
	bool operator == (const CVector3D& v) const;
	bool operator != (const CVector3D& v) const;

	//ベクトルの内積
	float Dot(const CVector3D& v)const;
	static float Dot(const CVector3D& v1, const CVector3D& v2);
	//ベクトルの外積
	CVector3D Cross(CVector3D& v)const;
	static CVector3D Cross(const CVector3D& v1, const CVector3D& v2);
	//ベクトルの大きさ
	float Length() const;
	//ベクトルの大きさの２乗
	float LengthSq() const;
	static CVector3D Leap(const CVector3D& s, const CVector3D& e, float t);
	/*
	CVector3D GetEuler() {
		CVector3D ret(0, 0, 0);
		ret.x = -asin(y);
		ret.y = atan2(x,z);
		return ret;
	}
	void SetDir(CVector3D v) {
		x = sin(v.y) * cos(v.x);
		y = -sin(v.x);
		z = cos(v.y) * cos(v.x);

	}
	*/
	//自身を単位ベクトルにする。正規化
	void Normalize();
	//単位ベクトルを返却
	CVector3D GetNormalize() const;

	const static CVector3D up;
	const static CVector3D down;
	const static CVector3D left;
	const static CVector3D right;
	const static CVector3D front;
	const static CVector3D back;
	const static CVector3D zero;

};
typedef struct SVector4D{
	union {
		float v[4];
		struct {
			float x;
			float y;
			float z;
			float w;
		};
		struct {
			float r;
			float g;
			float b;
			float a;
		};
	};
}SColorRGBA;

class CVector4D : public SVector4D{
public:
	CVector4D(){}
	CVector4D(float x, float y, float z, float w);
	CVector4D(const CVector3D& v, float w);
	//ベクトル引き算( this - v )
	CVector4D operator - (const CVector4D& v) const;
	//ベクトル引き算( this - v )
	void operator -= (const CVector4D& v);

	//ベクトル足し算( this + v )
	CVector4D operator + (const CVector4D& v) const;

	//ベクトル足し算( this + v )
	void operator += (const CVector4D& v);

};
typedef CVector4D CColorRGBA; 


class CQuaternion : public SVector4D {
public:
	//コンストラクタ
	CQuaternion() {
		x = 0; y = 0; z = 0; w = 1;
	}
	//ベクトルとの積
	CVector3D operator* (const CVector3D &v) const;
	//クォータニオン同士の積
	CQuaternion operator *(const CQuaternion &a) const;
	//X軸回転
	void RotationX(float a);
	//Y軸回転
	void RotationY(float a);
	//Z軸回転
	void RotationZ(float a);
	//任意軸回転
	void RotationAxis(float ax, float ay, float az, float angle);
	//回転行列からクォータニオンを設定
	void SetRotateMatrix(const CMatrix &m);
	//方向ベクトルからクォータニオンを設定
	void SetVecter(CVector3D &v);
	//指定の場所へのクォータニオンを作成
	void LookAt(CVector3D &p, CVector3D &at);
	//大きさを取得
	float Length();
	//正規化
	void Normalize();
	//オイラー角からクォータニオン設定
	void SetEuler(float ax, float ay, float az);
	void SetEuler(const CVector3D& e);
	//オイラー角を取得
	CVector3D GetEuler(int type) const;
	//内積
	static float Dot(const CQuaternion &q0, const CQuaternion &q1);
	//球形補間
	static CQuaternion Slerp(const CQuaternion &q0, const CQuaternion &q1, float t);
};