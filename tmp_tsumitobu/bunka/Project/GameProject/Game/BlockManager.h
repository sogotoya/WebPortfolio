#pragma once
#include "../Base/Base.h"

class BlockManager :public Base 
{
private:
	int m_cnt = 35;

public:
	BlockManager();
	void Update();
	bool stop;
};