﻿var CreatedOKLodop7766=null;

function needCLodop(){
    try{
	var ua=navigator.userAgent;
	if (ua.match(/Windows\sPhone/i) !=null) return true;
	if (ua.match(/iPhone|iPod/i) != null) return true;
	if (ua.match(/Android/i) != null) return true;
	if (ua.match(/Edge\D?\d+/i) != null) return true;
	
	var verTrident=ua.match(/Trident\D?\d+/i);
	var verIE=ua.match(/MSIE\D?\d+/i);
	var verOPR=ua.match(/OPR\D?\d+/i);
	var verFF=ua.match(/Firefox\D?\d+/i);
	var x64=ua.match(/x64/i);
	if ((verTrident==null)&&(verIE==null)&&(x64!==null)) 
		return true; else
	if ( verFF !== null) {
		verFF = verFF[0].match(/\d+/);
		if ((verFF[0]>= 42)||(x64!==null)) return true;
	} else 
	if ( verOPR !== null) {
		verOPR = verOPR[0].match(/\d+/);
		if ( verOPR[0] >= 32 ) return true;
	} else 
	if ((verTrident==null)&&(verIE==null)) {
		var verChrome=ua.match(/Chrome\D?\d+/i);		
		if ( verChrome !== null ) {
			verChrome = verChrome[0].match(/\d+/);
			if (verChrome[0]>=42) return true;
		};
	};
        return false;
    } catch(err) {return true;};
};

//====được LODOP đối tượng ：====
function getLodop(oOBJECT,oEMBED){
    var strHtmInstall="打印控件未安装!";
    var strHtmUpdate="打印控件需要升级!";
    var strHtm64_Install="打印控件未安装";
    var strHtm64_Update="打印控件需要升级!";
    var strHtmFireFox="注意：如曾安装过Lodop旧版附件npActiveXPLugin,请在【工具】->【附加组件】->【扩展】中先卸它）</font>";
    var strHtmChrome="如果此前正常，仅因浏览器升级或重安装而出问题，需重新执行以上安装</font>";
    var strCLodopInstall="CLodop云打印服务(localhost本地)未安装启动!";
    var strCLodopUpdate="CLodop云打印服务需升级!";
    var LODOP;
    try{
        var isIE = (navigator.userAgent.indexOf('MSIE')>=0) || (navigator.userAgent.indexOf('Trident')>=0);
        if (needCLodop()) {
            try{ LODOP = window.getCLodop();} catch(err) {};
	    if (!LODOP && document.readyState!=="complete") {
            alert("C-Lodop没准备好，请稍后再试！");
            return;
        };
        if (!LODOP) {
            if (isIE)
                ;//alert(strCLodopInstall+' 请到打印管理页面进行检测或者更新！');
            else
                // alert(strCLodopInstall+' 请到打印管理页面进行检测或者更新！');
                return;
            } else {
	            if (CLODOP.CVERSION<"2.1.0.2") { 
                    if (isIE)
                        ;//alert(strCLodopUpdate+' 请到打印管理页面进行检测或者更新！');
                    else
                        ;//alert(strCLodopUpdate+' 请到打印管理页面进行检测或者更新！');
			            return;
		        }
                if (oEMBED && oEMBED.parentNode)
                    oEMBED.parentNode.removeChild(oEMBED);
                if (oOBJECT && oOBJECT.parentNode)
                    oOBJECT.parentNode.removeChild(oOBJECT);	
	        };
        } else {
            var is64IE  = isIE && (navigator.userAgent.indexOf('x64')>=0);
            //=====如果页面有Lodop就直接使用，没有则新建:==========
            if (oOBJECT!=undefined || oEMBED!=undefined) {
                if (isIE)
                    LODOP=oOBJECT;
                else 
                    LODOP=oEMBED;
            } else if (CreatedOKLodop7766==null){
                LODOP=document.createElement("object");
                LODOP.setAttribute("width",0);
                LODOP.setAttribute("height",0);
                LODOP.setAttribute("style","position:absolute;left:0px;top:-100px;width:0px;height:0px;");
                if (isIE)
                    LODOP.setAttribute("classid","clsid:2105C259-1E0C-4534-8141-A753534CB4CA");
                else
                    LODOP.setAttribute("type","application/x-print-lodop");
                document.documentElement.appendChild(LODOP);
                CreatedOKLodop7766=LODOP;
             } else {
                 LODOP=CreatedOKLodop7766;
             }
            //=====Lodop插件未安装时提示下载地址:==========
            if ((LODOP==null)||(typeof(LODOP.VERSION)=="undefined")) {
                 if (navigator.userAgent.indexOf('Chrome')>=0)
                    ;//alert(strHtmChrome+' 请到打印管理页面进行检测或者更新！');
                 if (navigator.userAgent.indexOf('Firefox')>=0)
                    ;//alert(strHtmFireFox+' 请到打印管理页面进行检测或者更新！');
                 if (is64IE)
                    ;//alert(strHtm64_Install+' 请到打印管理页面进行检测或者更新！');
                 else if (isIE)
                    ;//alert(strHtmInstall+' 请到打印管理页面进行检测或者更新！');
                 else
                    ;//alert(strHtmInstall+' 请到打印管理页面进行检测或者更新！');
                 return LODOP;
            };
        };
        if (LODOP.VERSION<"6.2.1.7") {
            if (needCLodop())
                ;//alert(strCLodopUpdate+' 请到打印管理页面进行检测或者更新！');
            else if (is64IE)
                ;//alert(strHtm64_Update+' 请到打印管理页面进行检测或者更新！');
            else if (isIE)
               ;// alert(strHtmUpdate+' 请到打印管理页面进行检测或者更新！');
            else
                ;//alert(strHtmUpdate+' 请到打印管理页面进行检测或者更新！');
            return LODOP;
        };
        //===如下空白位置适合调用统一功能(如注册语句、语言选择等):===
        LODOP.SET_LICENSES("","0F5C1D2039BECACD5CA4909E737625D4","C94CEE276DB2187AE6B65D56B3FC2848","");
        //===========================================================
        return LODOP;
    } catch(err) {alert("getLodop出错:"+err);};
};

