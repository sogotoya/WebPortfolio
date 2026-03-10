#pragma once
/// <summary>
/// オブジェクトの種類
/// </summary>
enum {
   
    eType_Field,
    eType_Map,
    eType_Menu,
    eType_AreaChange,
    eType_Tutorial,
    eType_Player,
    eType_Goal,
    eType_Effect,
    eType_UI,
    eType_Scene,
    eType_Waku,
    eType_Sikaku,
    eType_L,
    eType_maru,
    eType_count,
    eType_TItle,
    eType_Block,
    eType_BlockManager,
    eType_EndRoll,
};
//重力加速度
#define GRAVITY (9.8f/20)
/// <summary>
/// ゲームオブジェクトの基底クラス
/// </summary>
class Base {
public:
    //オブジェクトの種類
    int m_type;
    //座標データ
    CVector2D m_pos;
    //過去の位置
    CVector2D m_pos_old;
    //半径
    float m_rad;
    //移動ベクトル
    CVector2D m_vec;

    //矩形
    CRect   m_rect;

    bool m_kill;
    static std::list<Base*> m_list;
    //スクロール値
    static CVector2D m_scroll;
    //ポーズフラグ
    static bool m_pose;
public:
    /// <summary>
    /// コンストラクタ
    /// </summary>
    Base(int type);
    /// <summary>
    /// デストラクタ
    /// </summary>
    virtual ~Base();
    /// <summary>
    /// 更新処理
    /// </summary>
    virtual void Update();
    /// <summary>
    /// 描画処理
    /// </summary>
    virtual void Draw();
    /// <summary>
    /// オブジェクト削除
    /// </summary>
    void SetKill() { m_kill = true; }

    virtual void Collision(Base* b);
    /// <summary>
    /// 円同士の当たり判定
    /// </summary>
    /// <param name="b1">対象1</param>
    /// <param name="b2">対象2</param>
    /// <returns></returns>
    static bool CollisionCircle(Base* b1, Base* b2);


    /// <summary>
    /// 全てのオブジェクトの更新
    /// </summary>
    static void UpdateAll();
    /// <summary>
    /// 全てのオブジェクトの描画
    /// </summary>
    static void DrawAll();
    /// <summary>
    /// 全てのオブジェクト同士の組み合わせで当たり判定検証
    /// </summary>
    static void CollisionAll();
    /// <summary>
    /// 全てのオブジェクトの削除チェック
    /// </summary>
    static void CheckKillAll();

    /// <summary>
    /// オブジェクトをリストへ追加
    /// </summary>
    /// <param name="b">追加オブジェクト</param>
    static void Add(Base* b);

    /// <summary>
    /// 全オブジェクトの削除
    /// </summary>
    static void KillAll();
    /// <summary>
    /// 指定オブジェクトの削除
    /// </summary>
    /// <param name="mask">削除対象オブジェクトのマスク</param>
    static void Kill(int mask);
    /// <summary>
    /// eType選択削除
    /// </summary>
    /// <param name="Type"></param>
    static void SelectKill(int Type);
    /// <summary>
    /// リスト内からオブジェクトを探索
    /// </summary>
    /// <param name="type">種類</param>
    /// <returns>最初に見つけたオブジェクト</returns>
    static Base* FindObject(int type);
    /// <summary>
    /// リスト内からオブジェクトを探索
    /// </summary>
    /// <param name="type">種類</param>
    /// <returns>該当種類のオブジェクトのリスト</returns>
    static std::list<Base*> FindObjects(int type);
    
    /// <summary>
    /// 画面内での位置を取得
    /// </summary>
    /// <param name="pos">キャラクターなどの座標</param>
    /// <returns>画面上での位置</returns>
    static CVector2D GetScreenPos(const CVector2D& pos);

    /// <summary>
    /// 矩形同士の判定
    /// </summary>
    /// <param name="b1">対象</param>
    /// <param name="b2">対象</param>
    /// <returns></returns>
    static bool CollisionRect(Base* b1, Base* b2);
    /// <summary>
    /// 矩形の表示
    /// </summary>
    void DrawRect();


};
