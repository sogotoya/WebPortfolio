#include"GameData.h"

//Mapの呼び出し
int GameData::s_score = 0;
//残機のリセット
const int GameData::Zanki_set = 3;
//残機の初期値
int GameData::zanki = 3;
//クリア関連
bool GameData::Gameclear = false;
//ゲームオーバー関連
bool GameData::Gameover = false;
//リトライ関連
bool GameData::Gametry = false;
//プレイヤーの操作制御
bool GameData::playerstop = false;
//エンドロール関連
int GameData::end_score = 0;
bool GameData::stage1 = 1;
bool GameData::stage2 = 1;
bool GameData::stage3 = 1;
bool GameData::stage4 = 1;
bool GameData::stage5 = 1;
