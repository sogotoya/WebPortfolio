#pragma once
#include "GL.h"
#include <thread>
#include <functional>
class CLoadThread {
	static CLoadThread *m_instance;
	bool		m_loaded;
	std::thread *m_resourceLoader;
	void LoadThread(std::function<void()> loadProc);
public:
	static CLoadThread* GetInstance() {
		if (!m_instance) m_instance = new CLoadThread();
		return m_instance;
	}
	static void ClearInstance() {
		if (!m_instance) return;
		delete m_instance;
		m_instance = nullptr;
	}
	CLoadThread();
	~CLoadThread();
	void LoadStart(std::function<void()> loadProc);
	bool CheckEnd();
};