#pragma once

#include <stdio.h>
#include <stdlib.h>


#ifndef _USE_MATH_DEFINES
	#define _USE_MATH_DEFINES
#endif

#include <math.h>
#include <windows.h>
#include <string.h>
#define GLEW_STATIC
#include <glew.h>
#define GLFW_INCLUDE_GLU
#include <GLFW/glfw3.h>
//#define FREEGLUT_STATIC
//#include <freeglut.h>
#define AL_LIBTYPE_STATIC
#include <AL/alut.h>
namespace GL {
	extern GLFWwindow* window;
	extern RECT window_rect;
	extern int window_x;
	extern int window_y;
	extern int window_width;
	extern int window_height;
	extern int focus;
	extern bool full_screen;
	extern HWND hWnd;
	void UpdateWindowRect(int x, int y, int w, int h);
	//‘Å‚¿ŠÔˆá‚¢
	inline void UpdateWindosRect(int x, int y, int w, int h) {
		UpdateWindowRect(x, y, w, h);
	}
	void PrintDeviceInformation();
	void ChangeFullScreen(bool full,int monitor_no=0);
}