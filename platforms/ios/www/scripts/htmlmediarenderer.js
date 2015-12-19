!function(){function e(e){function r(){"video"==e.type&&window.StatusBar&&StatusBar.hide()}function i(){"video"==e.type&&window.StatusBar&&StatusBar.show()}function a(){i(),$(P).trigger("ended")}function u(){$(P).trigger("timeupdate")}function s(){$(P).trigger("volumechange")}function l(){$(".mediaPlayerAudioContainer").hide()}function d(){$(P).trigger("playing")}function c(){$(P).trigger("play")}function f(){$(P).trigger("pause")}function p(){$(P).trigger("click")}function v(){$(P).trigger("dblclick")}function m(){var e=this.error?this.error.code:"";Logger.log("Media element error code: "+e),i(),$(P).trigger("error")}function g(){o||this.play()}function y(e){require(["thirdparty/hls.min.js"],function(n){window.Hls=n,e()})}function w(e){var n=e,o=n.split("#");return o.length>1&&(o=o[o.length-1].split("="),2==o.length)?parseFloat(o[1]):0}function h(){r();var e=!P.enableCustomVideoControls();if(e&&$(this).attr("controls","controls"),t){var n=(P.currentSrc()||"").toLowerCase(),o=w(n);if(o&&-1!=n.indexOf(".m3u8")){var i=browserInfo.safari?2500:0,a=this;i?setTimeout(function(){a.currentTime=o},i):a.currentTime=o}}}function E(){var e=$(".mediaPlayerAudio");if(!e.length){var n="",o=!MediaPlayer.canAutoPlayAudio();n+=o?'<div class="mediaPlayerAudioContainer" style="position: fixed;top: 40%;text-align: center;left: 0;right: 0;"><div class="mediaPlayerAudioContainerInner">':'<div class="mediaPlayerAudioContainer" style="display:none;padding: 1em;background: #222;"><div class="mediaPlayerAudioContainerInner">',n+='<audio class="mediaPlayerAudio" crossorigin="anonymous" controls>',n+="</audio></div></div>",$(document.body).append(n),e=$(".mediaPlayerAudio")}return $(e).on("timeupdate",u).on("ended",a).on("volumechange",s).one("playing",l).on("play",c).on("pause",f).on("playing",d).on("error",m)[0]}function k(e){return e&&-1==e.indexOf(".m3u8")?!1:MediaPlayer.canPlayHls()&&!MediaPlayer.canPlayNativeHls()}function A(){var n="",o=!P.enableCustomVideoControls(),t=!browserInfo.safari&&e.poster?' poster="'+e.poster+'"':"";n+=o&&AppInfo.isNativeApp&&browserInfo.android?'<video class="itemVideo" id="itemVideo" preload="metadata" autoplay="autoplay" crossorigin="anonymous"'+t+" webkit-playsinline>":o?'<video class="itemVideo" id="itemVideo" preload="metadata" autoplay="autoplay" crossorigin="anonymous"'+t+' controls="controls" webkit-playsinline>':'<video class="itemVideo" id="itemVideo" preload="metadata" autoplay="autoplay" crossorigin="anonymous"'+t+" webkit-playsinline>",n+="</video>";var r=$("#videoElement","#videoPlayer").prepend(n);return $(".itemVideo",r).one(".loadedmetadata",g).one("playing",h).on("timeupdate",u).on("ended",a).on("volumechange",s).on("play",c).on("pause",f).on("playing",d).on("click",p).on("dblclick",v).on("error",m)[0]}function b(e,n){var o=n.map(function(e){var n=e.isDefault?" default":"";return'<track kind="subtitles" src="'+e.url+'" srclang="'+e.language+'"'+n+"></track>"}).join("");o&&(e.innerHTML=o)}var T,C,P=this;P.currentTime=function(e){return T?null!=e?void(T.currentTime=e/1e3):C?1e3*C:1e3*(T.currentTime||0):void 0},P.duration=function(){return T?T.duration:null},P.stop=function(){if(T&&(T.pause(),o)){C=T.currentTime;try{o.destroy()}catch(e){Logger.log(e)}o=null}},P.pause=function(){T&&T.pause()},P.unpause=function(){T&&T.play()},P.volume=function(e){return T?null!=e?void(T.volume=e):T.volume:void 0};var I;P.setCurrentSrc=function(e,n,r,i){var a=T;if(!a)return void(I=null);if(!e)return I=null,a.src=null,a.src="",void(browserInfo.safari&&(a.src="files/dummy.mp4",a.play()));var u=e.url;AppInfo.isNativeApp&&browserInfo.safari&&(u=u.replace("file://","")),t=!1;var s=w(u),l=!1;if("audio"==a.tagName.toLowerCase())a.src=u,l=!0;else{if(o&&(o.destroy(),o=null),s&&(t=!0),i=i||[],k(u)){b(a,i);var d=new Hls;d.loadSource(u),d.attachMedia(a),d.on(Hls.Events.MANIFEST_PARSED,function(){a.play()}),o=d}else a.src=u,a.autoplay=!0,b(a,i),$(a).one("loadedmetadata",g),l=!0;for(var c=-1,f=0,p=i.length;p>f;f++)if(i[f].isDefault){c=f;break}P.setCurrentTrackElement(c)}I=u,l&&a.play()},P.currentSrc=function(){return T?I:void 0},P.paused=function(){return T?T.paused:!1},P.cleanup=function(){P.setCurrentSrc(null),C=null;var e=T;e&&("AUDIO"==e.tagName?(Events.off(e,"timeupdate",u),Events.off(e,"ended",a),Events.off(e,"volumechange",s),Events.off(e,"playing",l),Events.off(e,"play",c),Events.off(e,"pause",f),Events.off(e,"playing",d),Events.off(e,"error",m)):(Events.off(e,"loadedmetadata",g),Events.off(e,"playing",h),Events.off(e,"timeupdate",u),Events.off(e,"ended",a),Events.off(e,"volumechange",s),Events.off(e,"play",c),Events.off(e,"pause",f),Events.off(e,"playing",d),Events.off(e,"click",p),Events.off(e,"dblclick",v),Events.off(e,"error",m)),"audio"!=e.tagName.toLowerCase()&&$(e).remove()),i()},P.supportsTextTracks=function(){return null==n&&(n=null!=document.createElement("video").textTracks),n},P.setCurrentTrackElement=function(e){Logger.log("Setting new text track index to: "+e);for(var n=T.textTracks,o=["disabled","showing","hidden"],t=0;t<n.length;t++){var r;r=e==t?1:0,Logger.log("Setting track "+t+" mode to: "+r);var i=!1;isNaN(n[t].mode)||(i=!0),n[t].mode=i?r:o[r]}},P.updateTextStreamUrls=function(e){if(P.supportsTextTracks()){for(var n=T.textTracks,o=0;o<n.length;o++){var t=n[o];try{for(;t.cues.length;)t.removeCue(t.cues[0])}catch(r){Logger.log("Error removing cue from textTrack")}}$("track",T).each(function(){this.src=replaceQueryString(this.src,"startPositionTicks",e)})}},P.enableCustomVideoControls=function(){return AppInfo.isNativeApp&&browserInfo.safari?-1!=navigator.userAgent.toLowerCase().indexOf("iphone")?!0:!1:P.canAutoPlayVideo()&&!browserInfo.mobile},P.canAutoPlayVideo=function(){return AppInfo.isNativeApp?!0:browserInfo.mobile?!1:!0},P.init=function(){return new Promise(function(n){"video"==e.type&&k()?y(n):n()})},T="audio"==e.type?E():A()}var n,o,t;window.AudioRenderer||(window.AudioRenderer=function(n){return n=n||{},n.type="audio",new e(n)}),window.VideoRenderer||(window.VideoRenderer=function(n){return n=n||{},n.type="video",new e(n)})}();