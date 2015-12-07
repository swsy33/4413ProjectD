/**
 * 
 */

function loadXml(address, handler)
{

	var request = new XMLHttpRequest();
	//alert("in loadxml");
	request.open("POST", address, true);
	request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	request.onreadystatechange =  function(){showBank(request);};
	request.send("getbank"); 
	
	
}

function showBank(request)
{
	if (request.readyState == 4 && request.status == 200) 
	{
		//alert("in showbank");
		var parser = new DOMParser();
		alert("res " + request.responseText);
		var xmlDoc = parser.parseFromString(request.responseText,"text/xml"); 
		//alert("xmlDoc " + xmlDoc);
		var root = xmlDoc.getElementsByTagName("banklist");
		//var bank = xmlDoc.getElementsByTagName("bankName")[0].textContent;
		//alert("or   " + xmlDoc.getElementsByTagName("bankName").length)
		var list = xmlDoc.getElementsByTagName("bankName");
		var select = document.getElementById("banklist");
		for (var i = 0; i < list.length; i++)
		{
			var opt = list[i].textContent;
			var el = document.createElement("option");
			el.textContent = opt;
			el.value = opt;
			select.appendChild(el);
		}
	}
}

window.onload=function()
{
	loadXml("testBank",showBank);
}