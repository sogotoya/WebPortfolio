#pragma once
#include "../Base/Base.h"
class Goal :public Base {
private:
    //画像オブジェクト
    CImage m_img;
    bool m_is_goal;

public:
    Goal(const CVector2D& pos);
    void Draw();
    void SetGoal() 
    {
        m_is_goal = true;
    }
    bool GetGoal()
    {
        return m_is_goal;
    }
};
