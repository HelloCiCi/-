$.LoginDialog=function(){var a=this;this.element=$("#dlgLogin");this.ws=null;this.isOpen=false;this.init=function(){$("#userName,#password").watermark({});addLogical("#userName,#password,#verif_code,#regUsername,#regEmail,#regPassword,#regConfirmPassword,#registerVerifCode,#account,#forget_verif_code","不能为空");
$("a[tag='loginTab']").click(function(c){var b=$(this);a.show(parseInt(b.attr("data-target")));});if(a.element.attr("action")=="login"){a.show(0);}$("#verif_code").watermark({onEnter:function(){dlgLogin.doLogin("#btnLogin");}});};this.initAuthSocket=function(){$("#imgScan").hide();$("#imgScanLoading").show();
if(a.ws!=null&&a.isOpen){a.loadScanImage();return;}console.log("connect WebSocket="+currentWebSocketUri);a.ws=new WebSocket(currentWebSocketUri);a.ws.onopen=function(){isOpen=true;var b={};b.action="scan";b.cookieId=$("#header").attr("cookieId");a.ws.send(JSON.stringify(b));console.log("WebSocket open,cookieId="+b.cookieId);
};a.ws.onmessage=function(c){var b=JSON.parse(c.data);if((b.action=="hi")){console.log("WebSocket hi,scan image");a.loadScanImage();}else{if(b.action=="auth"){$("#imgScan").attr("src",b.face);$("#scanTip").text(b.userName);window.location.reload(true);}else{if(b.action=="error"){$("#imgScan").hide();
$("#scanTip").text(b.message);window.location.reload(true);}}}};a.ws.onclose=function(b){a.isOpen=false;$("#scanTip").text("无法获得微信二维码，可能与您的网络有关");};a.ws.onerror=function(b){$("#scanTip").text("无法获得微信二维码，可能与您的网络有关，建议您刷新再试试");};};this.popup=function(){a.show(0);};this.loadScanImage=function(){var b={};
b.funcIndex=3;b.socketServer=currentUserServer;$.ajax({type:"POST",url:"/user",dataType:"json",data:JSON.stringify(b),success:function(d){if(d.xeach==true){var c=$(new Image());c.attr("src",d.url);c.load(function(){$("#imgScan").attr("src",d.url);$("#imgScan").show();$("#imgScanLoading").hide();});}else{$("#scanTip").text(d.message);
}}});};this.show=function(b){$("a[tag='loginTab']").removeClass("current");$("a[data-target='"+b+"']").addClass("current");$("#loginTab0").css("display",b==0?"block":"none");$("#loginTab1").css("display",b==1?"block":"none");$("#loginTab2").css("display",b==2?"block":"none");$("#loginTab3").css("display",b==3?"block":"none");
a.element.show();a.refreshCaptcha(b);window.scroll(0,0);if(b==0){a.initAuthSocket();}return false;};this.hide=function(){a.element.hide();return false;};this.doLogin=function(c){if(checkLogicals(["#userName","#password","#verif_code"])==false){return;}showLoading(c);var b={};b.funcIndex=0;b.userType=0;
b.email=$("#userName").val();b.password=$("#password").val();b.code=$("#verif_code").val();b.rememberMe=$("#rememberMe").val();$.ajax({type:"POST",url:"/user",dataType:"json",data:JSON.stringify(b),success:function(d){hideLoading(c);if(d.xeach==true){a.hide();if(d.lastUri){window.location=d.lastUri;}else{window.location="/";
}}else{showTip(d.element,d.message);a.refreshCaptcha(2);}}});};this.refreshCaptcha=function(b){var c="";if(b==1){c="#registerVerifCode";}else{if(b==2){c="#loginVerifCode";}else{if(b==3){c="#forgetVerifCode";}}}$(c).attr("src","/captcha.jpg?id="+(Math.random()*10000));};this.doRegister=function(c){if(checkLogicals(["#regUsername","#regEmail","#regPassword","#regConfirmPassword"])==false){return;
}if($("#regPassword").val()!=$("#regConfirmPassword").val()){showTip("#regPassword","两次输入的密码不一致.");return;}var b=$("#regCheck").is(":checked");if(b==false){showTip("#regCheck","您必须接受一起嗨免责服务条款.");return;}showLoading(c);var d={};d.funcIndex=1;d.email=$("#regEmail").val();d.userName=$("#regUsername").val();
d.password=$("#regPassword").val();d.code=$("#regVerifCode").val();$.ajax({type:"POST",url:"/user",dataType:"json",data:JSON.stringify(d),success:function(e){hideLoading(c);if(e.xeach==false){a.refreshCaptcha(1);showTip(e.element,e.message);}else{window.location="/";}}});};this.doForgetPassword=function(){var b={};
b.funcIndex=2;if(checkLogicals(["#account","#forget_verif_code"])==false){return;}b.email=$("#account").val();b.code=$("#forget_verif_code").val();$.ajax({type:"POST",url:"/user",dataType:"json",data:JSON.stringify(b),success:function(c){if(c.xeach==false){showTip(c.element,c.message);a.refreshCaptcha(3);
}else{if(c.xeach){$("#one").removeClass("done");$("#two").addClass("done");$("#three").removeClass("done");$("#forgerEmail").html(c.email);$("#openEmail").attr("href",c.mailUrl);$(".step_1").css("display","none");$(".step_2").css("display","block");$(".step_3").css("display","none");$(".step_4").css("display","none");
}}}});};};

