define(["paperdialoghelper","paper-input","paper-button","jqmcollapsible","paper-checkbox"],function(e){function t(e,t){var n="";n+='<div class="paperCheckboxList">',n+=t.Items.map(function(e){var t="",n=!0,a=n?' checked="checked"':"";return t+='<paper-checkbox class="chkShareFolder" data-folderid="'+e.Id+'" type="checkbox"'+a+">"+e.Name+"</paper-checkbox>"}).join(""),n+="</div>",e.querySelector(".librarySharingList").innerHTML=n}function n(t){Dashboard.showLoadingMsg(),ApiClient.getJSON(ApiClient.getUrl("Channels",{})).then(function(){var n=$(".chkShareFolder",t).get().filter(function(e){return e.checked}).map(function(e){return e.getAttribute("data-folderid")});ApiClient.ajax({type:"POST",url:ApiClient.getUrl("Connect/Invite"),dataType:"json",data:{ConnectUsername:$("#txtConnectUsername",t).val(),EnabledLibraries:n.join(","),SendingUserId:Dashboard.getCurrentUserId(),EnableLiveTv:!1}}).then(function(n){t.submitted=!0,e.close(t),Dashboard.hideLoadingMsg(),a(t,n)})})}function a(e,t){if(t.IsNewUserInvitation||t.IsPending){var n=t.IsNewUserInvitation?Globalize.translate("MessageInvitationSentToNewUser",t.GuestDisplayName):Globalize.translate("MessageInvitationSentToUser",t.GuestDisplayName);Dashboard.alert({message:n,title:Globalize.translate("HeaderInvitationSent")})}}return{show:function(){return new Promise(function(a,i){var r=new XMLHttpRequest;r.open("GET","components/guestinviter/guestinviter.template.html",!0),r.onload=function(){var r=this.response,o=e.createDialog({removeOnClose:!0,size:"small"});o.classList.add("ui-body-a"),o.classList.add("background-theme-a"),o.classList.add("formDialog");var s="";s+=Globalize.translateDocument(r),o.innerHTML=s,document.body.appendChild(o),$(o.querySelector("form")).trigger("create"),e.open(o),o.addEventListener("iron-overlay-closed",function(){o.submitted?a():i()}),o.querySelector(".btnCancel").addEventListener("click",function(){e.close(o)}),o.querySelector("form").addEventListener("submit",function(e){return n(o),e.preventDefault(),!1}),ApiClient.getJSON(ApiClient.getUrl("Library/MediaFolders",{IsHidden:!1})).then(function(e){t(o,e)})},r.send()})}}});