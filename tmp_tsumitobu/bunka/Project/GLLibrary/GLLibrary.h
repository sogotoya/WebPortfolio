#pragma once

//#define USE_ATHOR_MODEL
//#define USE_VIDEO_LIB

#ifndef _USE_MATH_DEFINES
#define _USE_MATH_DEFINES
#endif

#include <assert.h>
#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <windows.h>

#include "GLLibrary/GL.h"


#include "GLLibrary/CMatrix.h"

#include "GLLibrary/CTexture.h"
#include "GLLibrary/CVector.h"
#include "GLLibrary/CLight.h"
#include "GLLibrary/CCamera.h"
#include "GLLibrary/CSound.h"
#include "GLLibrary/CInput.h"
#include "GLLibrary/CImage.h"
#include "GLLibrary/CCollision.h"
#include "GLLibrary/CFPS.h"
#include "GLLibrary/CFont.h"
#include "GLLibrary/Utility.h"
#include "GLLibrary/CModel.h"
#include "GLLibrary/CModelObj.h"
#include "GLLibrary/CModelField.h"
#ifdef USE_ATHOR_MODEL

#include "GLLibrary/CModelFBX.h"
#include "GLLibrary/CModelX.h"

#endif
#include "GLLibrary/CModelA3M.h"
#include "GLLibrary/CShadow.h"
#include "GLLibrary/CResource.h"
#include "GLLibrary/CNetWork.h"
#include "GLLibrary/CLoadThread.h"
#include "GLLibrary/CTextureFrame.h"
#ifdef USE_VIDEO_LIB
#include "GLLibrary/CVideo.h"
#endif
