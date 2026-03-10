#pragma once

#include "GL.h"
#include "CVector.h"
#include "AL/alc.h"
#include "AL/al.h"
#include <map>
#include <string>
class CCamera;
struct SSoundParam {
	float		vol;
	float		pan;
	float		pitch;
	bool		is3D;
	float		dist;
	float		rolloff_factor;
	float		reference_distance;
	SSoundParam() {
		vol = 1.0f;
		pan = 0.0f;
		pitch = 1.0f;
		is3D = false;
		dist = FLT_MAX;
		rolloff_factor = 1.0f;
		reference_distance = 1.0f;
	}
};
class CSoundBase {
public:
	ALuint *m_source;
	ALuint m_buffer;
	ALuint m_current;
	int m_layer_max;
	int m_channels;
	int m_sample_rate;
	SSoundParam m_param;
public:
	CSoundBase();
	~CSoundBase();
	/*!
	@brief	サウンド読み込み(wav)(3D対応の場合はモノラル音源)
	@param	path	[in]	ファイル名
	@param	layer	[in]	同時再生数（全音源で最大128まで）
	@param	is3D	[in]	3D対応(要：リスナー更新)
	**/
	bool Load(const char *path, int layer=1,bool is3D=false);

	bool Create(const void* data, ALsizei size, ALenum  format, ALsizei freq);
	/*!
	@brief	サウンド再生
	@param	boLoop	[in]	ループフラグ
	@return	ハンドルID
	**/
	int Play(bool boLoop=false);
	/*!
	@brief	サウンド再開
	@param	boLoop	[in]	ループフラグ
	@param	layer	[in]	ハンドルID
	**/
	void Resume(bool boLoop=false,int layer=0);

	/*!
	@brief	サウンド再開
	@param	pos			[in]	発生座標	
	@param	velocity	[in]	速度
	@param	boLoop		[in]	ループフラグ
	**/
	int Play3D(const CVector3D& pos,const CVector3D& velocity, bool boLoop = false);
	/*!
	@brief	サウンド座標再設定
	@param	pos			[in]	発生座標
	@param	layer		[in]	ハンドルID
	**/
	void SetPos(CVector3D pos, int layer = -1);
	/*!
	@brief	サウンド距離設定
	@param	dist			[in]	距離
	**/
	void SetMaxDistance(float dist) { m_param.dist = dist; }
	/*!
	@brief	サウンド停止
	@param	layer			[in]	ハンドルID(-1で全レイヤー停止)
	**/
	void Stop(int layer=-1);
	/*!
	@brief	サウンド一時停止
	@param	layer			[in]	ハンドルID(-1で全レイヤー停止)
	**/
	void Pause(int layer=-1);
	/*!
	@brief	サウンド破棄
	**/	void Release();

	/*!
	@brief	音量の設定
	@param	volumes			[in] 音量(【最小】0.0～1.0【デフォルト】) 
	**/
	void Volume(float volumes, int layer=-1);
	/*!
	@brief	再生速度の設定
	@param	rato			[in] 速度(【遅い】0.0～1.0【デフォルト】～【早い】)
	**/
	void Pitch(float ratio, int layer=-1);
	/*!
	@brief	パンの設定
	@param	pan			[in] パン(【左】-1.0～0.0【中心】～1.0【右】)
	**/
	void Pan(float pan, int layer = -1);
	/*!
	@brief	距離減衰の設定
	@param	max_distance		[in] 減衰値
	@param	reference_distance	[in] 減衰値
	@param	rolloff_factor		[in] 減衰値
	**/
	void SetDistance(float max_distance, float reference_distance, float rolloff_factor, int layer = -1);

	/*!
	@brief	再生終了判定
	@param	layer			[in]	ハンドルID
	@return	true再生終了
	**/
	bool CheckEnd(int layer = 0);

	/*!
	@brief	再生位置を取得
	@retval	再生位置（秒）
	**/
	float GetOffset(int layer = 0);
};
class CSound {
	std::map<std::string, CSoundBase*> m_list;
	static CSound *m_instance;
	friend class CSoundBase;
public:
	CSound();
	~CSound();
	/*!
	@brief	サウンドマネージャーの取得
	**/
	static CSound* GetInstance();
	/*!
	@brief	サウンドマネージャーの破棄
	**/
	static void ClearInstance();
	/*!
	@brief	サウンドオブジェクトの取得
	@param	name			[in]識別名
	**/
	CSoundBase* GetSound(const char* name);
	/*!
	@brief	サウンドオブジェクトの破棄
	@param	name			[in]識別名
	**/
	void ReleaseSound(const char *name);
	/*!
	@brief	リスナーの更新
	**/
	void UpdateListener();

	
	void StopAll();
	
};

#define SOUND(name)	CSound::GetInstance()->GetSound(name)
