var config = [
    
    {
        loopCount: 0,
        url: 'http://dev.fev1/',
        testFile: 'jsons/lang/azeri.json'
    },
    {
        loopCount: 0,
        url: 'http://dev.fev1/',
        testFile: 'jsons/subtitlesShownCheck.json'
    },
    {
        loopCount: 1,
        url: 'http://dev.fev1/',
        testFile: 'jsons/wrongAnswer_checkReds.json'
    },
    {
        loopCount: 0,
        url: 'http://dev.fev1/',
        testFile: 'jsons/wrongAnswer_checkGreens.json'
    },
    {
        loopCount: 0,
        url: 'http://dev.fev1/',
        testFile: 'jsons/checkTitleBarComponents.json'
    },

    {
        loopCount: 1,
        url: 'http://dev.fev1/',
        testFile: 'jsons/wrongAnswerCycle.json'
    },
    
    {
        loopCount: 1,
        url: 'http://dev.fev1/',
        testFile: 'jsons/correctAnswerCycle.json'
    },
    {
        loopCount: 0,
        url: 'http://dev.fev1/',
        testFile: 'jsons/network_timerCheck.json'
    },
    {
        loopCount: 0,
        url: 'http://dev.fev1/',
        testFile: 'jsons/leftCycle.json'
    },
    {
        loopCount: 0,
        url: 'http://dev.fev1/',
        testFile: 'jsons/network_answerCheck.json'
    },
    
    {
        loopCount: 0,
        url: 'http://dev.fev1/',
        testFile: 'jsons/infopanel.json'
    },
    
    {
        loopCount: 0,
        url: 'http://dev.fev1/',
        testFile: 'jsons/timeOutWait.json'
    },
    {
        loopCount: 0,
        url: 'http://dev.fev1/',
        testFile: 'jsons/leftCycle.json'
    },

    {
        loopCount: 0,
        url: 'http://dev.fev1/',
        testFile: 'jsons/leftCycle_2.json'
    },

    {
        loopCount: 0,
        url: 'http://dev.fev1/',
        testFile: 'jsons/rightCycle.json'
    },
];

var productsTestSet_Red =[
    {
        loopCount: 0,
        url: 'http://dev.fev1/',
        testFile: 'jsons/products/productsClick.json'
    },
    {
        loopCount: 0,
        url: 'http://dev.fev1/',
        testFile: 'jsons/products/redClick.json'
    },
     {
        loopCount: 0,
        url: 'http://dev.fev1/',
        testFile: 'jsons/urlCheck/urlCheck_Red.json'
    },
    
    {
	loopCount: 0,
        url: 'http://dev.fev1/',
        testFile: 'jsons/leftCycle.json'
    },

    {
	status:'testSetComplete'
    }
    

];

var productsTestSet_Yellow =[
    {
        loopCount: 0,
        url: 'http://dev.fev1/',
        testFile: 'jsons/products/productsClick.json'
    },
    {
        loopCount: 0,
        url: 'http://dev.fev1/',
        testFile: 'jsons/products/yellowClick.json'
    },
     {
        loopCount: 0,
        url: 'http://dev.fev1/',
        testFile: 'jsons/urlCheck/urlCheck_Yellow.json'
    },
    
    {
	loopCount: 0,
        url: 'http://dev.fev1/',
        testFile: 'jsons/leftCycle.json'
    },
     {
	status:'testSetComplete'
    }

];

var productsTestSet_Green =[
    {
        loopCount: 0,
        url: 'http://dev.fev1/',
        testFile: 'jsons/products/productsClick.json'
    },
    {
        loopCount: 0,
        url: 'http://dev.fev1/',
        testFile: 'jsons/products/greenClick.json'
    },
    {
        loopCount: 0,
        url: 'http://dev.fev1/',
        testFile: 'jsons/urlCheck/urlCheck_Green.json'
    },
    
    {
	loopCount: 0,
        url: 'http://dev.fev1/',
        testFile: 'jsons/leftCycle.json'
    },
     {
	status:'testSetComplete'
    }

];

var leftPlayCycle=[
    {
        loopCount: 0,
        url: 'http://dev.fev1/',
        testFile: 'jsons/playCycleActions/01_waitForSubtitleButtons.json'
    },
    {
        loopCount: 0,
        url: 'http://dev.fev1/',
        testFile: 'jsons/playCycleActions/02_leftOptionClick.json'
    },
    {
        loopCount: 0,
        url: 'http://dev.fev1/',
        testFile: 'jsons/playCycleActions/03_clickNext.json'
    },
    
     {
	status:'testSetComplete'
    }
];

var rightPlayCycle=[
    {
        loopCount: 0,
        url: 'http://dev.fev1/',
        testFile: 'jsons/playCycleActions/01_waitForSubtitleButtons.json'
    },
    {
        loopCount: 0,
        url: 'http://dev.fev1/',
        testFile: 'jsons/playCycleActions/02_rightOptionClick.json'
	
    },
    {
        loopCount: 0,
        url: 'http://dev.fev1/',
        testFile: 'jsons/playCycleActions/03_clickNext.json'
	
    },
    
     {
	status:'testSetComplete'
    }
];

var leftPlayAndVideoPlaybackCycle=[
    
    {
        loopCount: 0,
        url: 'http://dev.fev1/',
        testFile: 'jsons/playCycleActions/01_waitForSubtitleButtons.json'
    },
    {
        loopCount: 0,
        url: 'http://dev.fev1/',
        testFile: 'jsons/playCycleActions/02_leftOptionClick.json'
    },
    {
        loopCount: 0,
        url: 'http://dev.fev1/',
        testFile: 'jsons/playVideo.json'
    },
    
    {
        loopCount: 0,
        url: 'http://dev.fev1/',
        testFile: 'jsons/playCycleActions/03_clickNext.json'

    },
     {
	status:'testSetComplete'
    }
];

var rightPlayAndVideoPlaybackCycle=[
    
    {
        loopCount: 0,
        url: 'http://dev.fev1/',
        testFile: 'jsons/playCycleActions/01_waitForSubtitleButtons.json'
    },
    {
        loopCount: 0,
        url: 'http://dev.fev1/',
        testFile: 'jsons/playCycleActions/02_rightOptionClick.json'
    },
    {
        loopCount: 0,
        url: 'http://dev.fev1/',
        testFile: 'jsons/playVideo.json'
    },
    
    {
        loopCount: 0,
        url: 'http://dev.fev1/',
        testFile: 'jsons/playCycleActions/03_clickNext.json'
    },
     {
	status:'testSetComplete'
    }
];

var rightPlayClickOnInfoPanel=[
    
    {
        loopCount: 0,
        url: 'http://dev.fev1/',
        testFile: 'jsons/playCycleActions/01_waitForSubtitleButtons.json'
    },
    {
        loopCount: 0,
        url: 'http://dev.fev1/',
        testFile: 'jsons/playCycleActions/02_rightOptionClick.json'
    },
    {
        loopCount: 0,
        url: 'http://dev.fev1/',
        testFile: 'jsons/infopanelClick.json'
    },
    
    {
        loopCount: 0,
        url: 'http://dev.fev1/',
        testFile: 'jsons/playCycleActions/03_clickNext.json'
    },
];

var checkViewsIncrease=[
    
    {
        loopCount: 0,
        url: 'http://dev.fev1/',
        testFile: 'jsons/checkViewsIncrease.json'
    },
    {
	status:'testSetComplete'
    }
    
];

var login=[
    {
        loopCount: 0,
        url: 'http://',
        testFile: 'jsons/login.json'
    },
     {
	status:'testSetComplete'
    }
    
];

var urlHistory=[
    
    {
        loopCount: 0,
        url: 'http://',
        testFile: 'jsons/urlHistory/getUrlResponse.json'
    },
    
    {
	status:'testSetComplete'
    }
];

var compareTestTubes=[
    
    {
        loopCount: 0,
        url: 'http://',
        testFile: 'jsons/checkTestTubes.json'
    },
    
    {
	status:'testSetComplete'
    }
];

var compareTestTubesFalse=[
    
    {
        loopCount: 0,
        url: 'http://',
        testFile: 'jsons/checkTestTubesFalse.json'
    },
    
    {
	status:'testSetComplete'
    }
];

var goBack=[
    {
        loopCount: 0,
        url: 'http://',
        testFile: 'jsons/urlHistory/goBackOne.json'
    },
        
    {
	status:'testSetComplete'
    }

];

var goForward=[
    {
        loopCount: 0,
        url: 'http://',
        testFile: 'jsons/urlHistory/goForwardOne.json'
    },
        
    {
	status:'testSetComplete'
    }

];

var reload=[
    {
        loopCount: 0,
        url: 'http://',
        testFile: 'jsons/urlHistory/reload.json'
    },
        
    {
	status:'testSetComplete'
    }

];

var getUrlContent=[
    {
        loopCount: 0,
        url: 'http://',
        testFile: 'jsons/urlHistory/getUrlContent.json'
    },
        
    {
	status:'testSetComplete'
    }

];

var voscreenIconClickUrlCheck=[
    {
        loopCount: 0,
        url: 'http://',
        testFile: 'jsons/urlHistory/getUrlContent.json'
    },
    {
        loopCount: 0,
        url: 'http://',
        testFile: 'jsons/clickVoscreenIcon.json'
    },
    
    {
	loopCount: 0,
        url: 'http://',
        testFile: 'jsons/urlHistory/checkUrlFoString.json'
    },
    
    {
	status:'testSetComplete'
    }
];

var networkTimerCheck=[

    {  loopCount: 0,
        url: 'http://dev.fev1/',
        testFile: 'jsons/network_timerCheck.json'
    },
    
    {
	status:'testSetComplete'
    }
]

module.exports = {
    //Karisik
    config: config,
    rightPlayClickOnInfoPanel:rightPlayClickOnInfoPanel,
    checkViewsIncrease:checkViewsIncrease,
    voscreenIconClickUrlCheck:voscreenIconClickUrlCheck,
    //Cycles
    leftPlayCycle:leftPlayCycle,
    rightPlayCycle:rightPlayCycle,
    leftPlayAndVideoPlaybackCycle:leftPlayAndVideoPlaybackCycle,
    rightPlayAndVideoPlaybackCycle:rightPlayAndVideoPlaybackCycle,
    //Products tests
    productsTestSet_Yellow:productsTestSet_Yellow,
    productsTestSet_Red:productsTestSet_Red,
    productsTestSet_Green:productsTestSet_Green,
    //HISTORY::::
    
    urlHistory:urlHistory,
    goBack:goBack,
    goForward:goForward,
    reload:reload,
    getUrlContent:getUrlContent,
    //LOGIN
    login:login,
    //Compare TestTubes:
    compareTestTubes:compareTestTubes,
    compareTestTubesFalse:compareTestTubesFalse,

    //
    networkTimerCheck:networkTimerCheck
};
