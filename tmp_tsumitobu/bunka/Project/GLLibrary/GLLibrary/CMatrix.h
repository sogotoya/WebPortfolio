#pragma once
#include "GL.h"
#include "CVector.h"
struct SMatrix
{
	union
	{
		float	f[16];
		float	m[4][4];
		struct
		{
			float	m00,m10,m20,m30,
					m01,m11,m21,m31,
					m02,m12,m22,m32,
					m03,m13,m23,m33;
		};
	};
};
class CMatrix : public SMatrix {
public:
	CMatrix() {
		SetIndentity();
	}
	CMatrix(float mat00,float mat01,float mat02,float mat03,
			float mat10,float mat11,float mat12,float mat13,
			float mat20,float mat21,float mat22,float mat23,
			float mat30,float mat31,float mat32,float mat33) {
				m00 = mat00; m01 = mat01; m02 = mat02; m03 = mat03;
				m10 = mat10; m11 = mat11; m12 = mat12; m13 = mat13;
				m20 = mat20; m21 = mat21; m22 = mat22; m23 = mat23;
				m30 = mat30; m31 = mat31; m32 = mat32; m33 = mat33;
	}
	enum {
		eZYX,
		eYXZ,
	};
	//単位行列を設定
	void SetIndentity();
	//平行移動行列を設定
	void Transelate(float x,float y, float z);
	void Transelate(const CVector3D& v);
	//スケール行列を設定
	void Scale(float x,float y, float z);
	void Scale(const CVector3D& v);
	//クオータニオン→行列
	void SetQuaternion(float x, float y, float z, float w);
	void SetQuaternion(const CQuaternion& q);
	static CMatrix MQuaternion(CQuaternion& q);
	CQuaternion GetQuaternion();
	//回転行列を設定
	void RotationX(float r);
	void RotationY(float r);
	void RotationZ(float r);
	void Rotation(CVector3D& r);
	void Rotation(float rx, float ry, float rz);
	//任意軸で回転行列を設定
	void RotationAxis(float vx,float vy,float vz,float r);
	//カメラ行列用
	void LookAtView(const CVector3D& eye,const CVector3D& at,const CVector3D& up);
	void LookAt(const CVector3D& pos, const CVector3D& at, const CVector3D& up);
	//透視投影行列用
	void Perspective(float fovy,float aspect,float zNear,float zFar);

	void Ortho(float left, float right, float bottom,float top, float zNear, float zFar);

	static CMatrix MTranselate(float x, float y, float z);
	static CMatrix MTranselate(const CVector3D& v);
	static CMatrix MScale(float x, float y, float z);
	static CMatrix MScale(const CVector3D& v);
	static CMatrix MRotationX(float r);
	static CMatrix MRotationY(float r);
	static CMatrix MRotationZ(float r);
	static CMatrix MRotation(const CVector3D& r);
	static CMatrix MRotation(float rx, float ry, float rz);
	static CMatrix MRotation(const CQuaternion& q);
	static CMatrix MRotationAxis(float vx, float vy, float vz, float r);
	static CMatrix MRotationAxis(const CVector3D& v, float r);

	//ビューポート行列用
	void Viewport(float x,float y,float w,float h);


	//逆行列を取得
	CMatrix GetInverse( void ) const;


	//転置行列を取得
	CMatrix GetTranspose(void) const;

	//各種演算
	CMatrix operator +(const CMatrix& num) const;
	CMatrix operator *(CMatrix num) const;
	CMatrix operator *(const float num) const;


	CVector4D operator *(const CVector4D num) const;
	CVector3D operator *(const CVector3D num) const;


	CMatrix& operator +=(const CMatrix& num);
	CMatrix& operator *=(CMatrix num);
	CMatrix& operator *=(const float num);



	CVector3D GetFront() const {return CVector3D(m02,m12,m22);}
	CVector3D GetUp() const {return CVector3D(m01,m11,m21);}
	CVector3D GetLeft() const {return CVector3D(m00,m10,m20);}
	CVector3D GetPosition() const {return CVector3D(m03,m13,m23);}

	CVector3D GetEuler(int type) const;

	CVector3D GetScale() const;

	const static CMatrix indentity;
};
CMatrix operator *(const float num,const CMatrix mtr);
CVector4D operator * (const CVector4D num,const CMatrix mtr);
CVector3D operator * (const CVector3D num,const CMatrix mtr);