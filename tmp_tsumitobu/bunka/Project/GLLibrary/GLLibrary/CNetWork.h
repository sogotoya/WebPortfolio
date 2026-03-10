#pragma once

#include <stdio.h>
#include <stdlib.h>
#define _WINSOCK_DEPRECATED_NO_WARNINGS
#include <winsock.h>
#include <thread>
#include <mutex>
#include <functional>
#include <vector>
#include <map>

enum {
	eNone_Error,
	eRecv_Error,
};
struct SBufferHeader {
	char	id[2];
	unsigned short ver;
	unsigned long size;
};
class CSocket {
	int		m_errorState;
	char	*m_recvbuffer;
	unsigned long m_recvDataSize;
	char	*m_sendbuffer;
	unsigned long m_bufferSize;
	SOCKET m_sock;
	SBufferHeader m_recvHeader;
	SBufferHeader m_sendHeader;
	bool m_isDestroy;
	bool m_async;
	sockaddr_in m_sockaddr;
	sockaddr_in m_sendaddr;
	std::thread		*m_thread;
	std::function<void(CSocket*,char*, int)> m_recvCallback;
	std::function<void(CSocket*)> m_disconnectCallback;
	std::function<void(CSocket*)> m_connectCallback;
	bool m_udp;
public:
	CSocket(SOCKET &s, sockaddr_in &client, unsigned long bufferSize, std::function<void(CSocket*, char*, int)> recvCallback, std::function<void(CSocket*)> connectCallback, std::function<void(CSocket*)> disconnectCallback,bool async,bool udp);
	~CSocket();
	bool Send(const char *buf, int len);
	void RecvProc();

	const sockaddr_in* GetSocketAddress() const {
		return &m_sockaddr;
	}
	const SOCKET* GetSocket() const {
		return &m_sock;
	}
	bool isDestroy() {
		return 	m_isDestroy;
	}
	friend class CNetWork;
};
enum {
	eNetState_None,
	eNetState_Server,
	eNetState_Cilent,
};
class CNetWork {
private:
	WSADATA m_wsaData;
	sockaddr_in m_server;
	SOCKET m_sock;
	timeval m_tv;
	fd_set m_fds;
	fd_set m_readfds;
	unsigned long m_bufferSize;
	char	*m_buffer;
	bool m_isDestroy;
	int	m_state;
	bool m_async;
	bool m_udp;
	std::vector<CSocket*> m_sockets;
	std::thread		*m_thread;
	std::function<void(CSocket*,char*,int)> m_recvCallback;
	std::function<void(CSocket*)> m_disconnectCallback;
	std::function<void(CSocket*)> m_connectCallback;
	static std::map<std::string, CNetWork*> m_instances;
	void AcceptProc();
public:
	static CNetWork* GetInstance(std::string name);
	static void ClearInstance(std::string name);
	static void CreateInstance(std::string name, unsigned long bufferSize, std::function<void(CSocket*, char*, int)> recvCallback = nullptr, std::function<void(CSocket*)> connectCallback = nullptr, std::function<void(CSocket*)> disconnectCallback = nullptr, bool async = true);
	CNetWork(unsigned long bufferSize, std::function<void(CSocket*,char*, int)> recvCallback, std::function<void(CSocket*)> connectCallback, std::function<void(CSocket*)> disconnectCallback,bool async);
	~CNetWork();
	void StartServer(unsigned short port,bool udp=false);
	bool StartClient(unsigned short port, const char *ipAddr, bool udp=false);
	void SelectProc();
	void DestroyCheck();
	void End();
	int GetState() { return m_state; }
	CSocket* GetClient(unsigned int idx=0);
};
