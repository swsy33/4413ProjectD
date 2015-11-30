/*global vars*/
var result;
var p, i, a;
var request;
var mortgage = {principle:0, interest: 0, amortization : 0, message :"", monthlyPay: 0};

function show(shown, hidden) {
	document.getElementById(shown).style.display = "block";
	document.getElementById(hidden).style.display = "none";
}

function setDefaultAmort()
{
	//alert("this is amort");
	var a ="amort25";
	document.getElementById(a).checked = true;

}

function validate()
{
	loadDoc("", "");
	var msg = "";
	getParameter();
	if(isNaN(p)|| p <= 0)
		{
		msg = "principle must be a positive number!";
		alert(msg);
		}
	

	return false;
}

function populateBankList()
{
	var select = document.getElementById("banklist");
	//need to grab options from the database
	getBankList();
	var options = ["1", "2", "3", "4", "5"];
	for (var i = 0; i < options.length; i++) {
		var opt = options[i];
		var el = document.createElement("option");
		el.textContent = opt;
		el.value = opt;
		select.appendChild(el);
	}
}



//---------------------------------
function getParameter()
{
	p = document.getElementById("principle").value;
	i = document.getElementById("interest").value;
	a = document.querySelector('input[name="amortization"]:checked').value;

}

function setErrorMessage(msg)
{
	document.getElementById("message").innerHTML = msg;
}
//--------------------------------

function loadDoc(address, data) {
	request = new XMLHttpRequest();
	//alert("in loadD");
	getParameter();
	//alert("in loadD");
	request.open("POST", "http://localhost:4413/mcApp1/payment.do?principle="+p+"&interest="+i+"&amort="+ a, true);
	//alert("in loadD2");
	request.onreadystatechange =  handler;
	//alert("in loadD3");
	request.send(null);

}

function handler()
{
	//alert("handle");
	if (request.readyState == 4 && request.status == 200) 
	{
		//alert(request.responseText);
		result = request.responseText;
		if(isNaN(result))
		{
			setErrorMessage(result);
		}
		else
		{
			show("Result", "UI");
			document.getElementById("payment").innerHTML = result + "%";
		}

	}
}

//----------------------------------------------------

window.onload = function () {
	setDefaultAmort();
	populateBankList();
	
};
