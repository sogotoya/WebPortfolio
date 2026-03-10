#pragma once
#pragma once
/**
* @file		AsSet.h
* @brief	リソース管理クラス
*
* @author	shinya nagakawa
*/


#include <map>
#include <vector>
#include <string>

class CResource {
	char m_name[128];
public:
	CResource():m_name(""){}
	/**
	* @fn
	* コンストラク
	* @brief コンストラクタ
	* @param name [in]　名前
	*/
	CResource(const char *name) { memcpy(m_name, name, sizeof(m_name)); }
	/**
	* @fn
	* デストラクタ
	* @brief デストラクタ
	*/
	virtual ~CResource() {};
	/**
	* @fn
	* 名前の取得
	* @brief 名前の取得
	* @return 名前
	*/
	std::string GetName() const {
		return m_name;
	}
	/**
	* @fn
	* リソースサイズ取得
	* @brief リソースサイズ取得
	*/
	virtual unsigned int GetDataSize() { return 0; };

	/**
	* @fn
	* リソース開放処理
	* @brief リソース開放処理
	*/
	virtual void Release() {};
	friend class CResourceManager;

};
class CResourceManager {
private:
	std::map<int,std::map<std::string, CResource*>> m_list;
	static CResourceManager*	m_instance;
public:
	static CResourceManager* GetInstance();
	/**
	* @fn　リソースを全て破棄する
	* @brief リソースを全て破棄する
	*/
	static void ClearInstance();
	CResourceManager();
	~CResourceManager();
	/**
	* @fn
	* リソースの追加
	* @brief リソースの追加
	* @param res [in]　追加するリソース
	* @param group [in]　グループ
	*/
	void Add(CResource* res,int group=0);
	/**
	* @fn
	* リソースの追加
	* @brief リソースの追加
	* @param name [in]　リソースの名前
	* @param res [in]　追加するリソース
	* @param group [in]　グループ
	*/
	void Add(std::string name, CResource* res,int group=0);
	/**
	* @fn
	* リソースの取得
	* @brief リソースのの取得
	* @param name [in]　リソースの名前
	* @param group [in]　グループ
	* @return リソース
	*/
	CResource* Get(std::string name, int group = 0);


	/**
	* @fn
	* リソースがあるかチェック
	* @brief リソースがあるかチェック
	* @param name [in]　リソースの名前
	* @param group [in]　グループ
	* @return true:存在する,false:無し
	*/
	bool IsSet(std::string name, int group = 0);
	/**
	* @fn
	* リソースの削除
	* @brief リソースのの削除
	* @param group [in]　グループ
	* @param name [in]　リソースの名前
	*/
	void Delete(std::string name, int group = 0);
	/**
	* @fn
	* リソースの削除
	* @brief リソースのの削除
	* @param name [in]　リソースグループ
	*/
	void Delete(int group = 0);

	unsigned int GetDataSize();
};
/**
* @fn
* リソースの追加
* @brief リソースの追加
* @param name [in]　リソースの名前
* @param res [in]　追加するリソース
*/
#define ADD_RESOURCE(name,obj) if(!CResourceManager::GetInstance()->IsSet(name)) CResourceManager::GetInstance()->Add(name,obj)
/**
* @fn
* モデルリソースの追加
* @brief リソースの追加
* @param name [in]　リソースの名前
* @param path [in]　ファイル名
*/
#define CREATE_MODEL(name,path) ADD_RESOURCE(name,CModel::CreateModel(path))
/**
* @fn
* モデルリソースの追加（コリジョン含む）
* @brief リソースの追加
* @param name	[in]　リソースの名前
* @param path	[in]　ファイル名
* @param x		[in]　分割数
* @param y		[in]　分割数
* @param z		[in]　分割数
*/
#define CREATE_MODEL_C(name,path,x,y,z) ADD_RESOURCE(name,CModel::CreateModel(path,x,y,z))
/**
* @fn
* 画像リソースの追加
* @brief リソースの追加
* @param name	[in]　リソースの名前
* @param path	[in]　ファイル名
*/
#define CREATE_IMAGE(name,path)  ADD_RESOURCE(name,CImage::CreateImage(path))
/**
* @fn
* 画像リソースの追加（アニメーション付き）
* @brief リソースの追加
* @param name	[in]　リソースの名前
* @param path	[in]　ファイル名
* @param d		[in]　アニメーションデータ
* @param w		[in]　一枚の幅
* @param h		[in]　一枚の高さ
*/
#define CREATE_ANIM_IMAGE(name,path,d,w,h) ADD_RESOURCE(name,CImage::CreateImage(path,d,w,h))

/**
* @fn
* リソースの取得
* @brief リソースの取得
* @param name	[in]　リソースの名前
* @param T		[in]　データ型
* @retrun		リソースのアドレス
*/
#define GET_RESOURCE(name,T) dynamic_cast<T*>(CResourceManager::GetInstance()->Get(name))

/**
* @fn
* リソースの取得（CModelField用）
* @brief リソースの取得
* @param name	[in]　リソースの名前
* @retrun		リソースのアドレス
*/
#define GET_FIELD(name) dynamic_cast<CModelField*>(CResourceManager::GetInstance()->Get(name))
/**
* @fn
* モデルの複製（CModelA3M用）
* @brief モデルの複製
* @param name	[in]　リソースの名前
* @retrun		リソースの実体
*/
#define COPY_MODEL(name) *dynamic_cast<CModelA3M*>(CResourceManager::GetInstance()->Get(name))
/**
* @fn
* 画像の複製（CImage用）
* @brief 画像の複製
* @param name	[in]　リソースの名前
* @retrun		リソースの実体
*/
#define COPY_IMAGE(name) *dynamic_cast<CImage*>(CResourceManager::GetInstance()->Get(name))
/**
* @fn
* リソースの複製
* @brief 画像の複製
* @param name	[in]　リソースの名前
* @param T		[in]　データ型
* @retrun		リソースの実体
*/
#define COPY_RESOURCE(name,T) *dynamic_cast<T*>(CResourceManager::GetInstance()->Get(name))

/**
* @fn
* リソースの複製(new)
* @brief 画像の複製
* @param name	[in]　リソースの名前
* @param T		[in]　データ型
* @retrun		リソースのアドレス
*/
#define DUPLICATE_RESOURCE(name,T) new T(*dynamic_cast<T*>(CResourceManager::GetInstance()->Get(name)))

