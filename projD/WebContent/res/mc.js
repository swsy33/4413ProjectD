/*global vars*/
var result;
var state = {principle : "",
		interest : "",
		amort : "",
		status:"",
		payment : ""};

function show(shown, hidden) {
	if(document.getElementById(hidden) === null)
		{
		alert("hidden" + hidden);
		}
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
	//alert("in validate1");
	setState();

	//alert("in validate2");
	if(state.principle === "")
	{
		state.status = "principle cannot be empty!";
		alert("message " + state.status);
	}
	else if(isNaN(state.principle)|| state.principle <= 0)
	{
		state.status = "principle must be a positive number!";
		alert("message" + state.status);
	}
	else if(state.interest === "")
	{
		state.status = "interest cannot be empty!";
		alert("message " + state.status);

	}
	else if(isNaN(state.interest) || state.interest <= 0)
	{
		state.status = "interest must be a positive number!";
		alert("message" + state.status);
	}
	else{
		var data = "args=" + JSON.stringify(state); 
		//alert("data is " + data);
		doSimpleAjax("payment.do", data, showPayment);
	}

	return false;
}

function populateBankList()
{
	var select = document.getElementById("banklist");
	//need to grab options from the database
	//getBankList();
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

function reset()
{
	//alert("in rest");
	state = {principle : "",
			interest : "",
			amort : "25",
			status:"",
			payment : ""};
	setDefaultAmort();
	showPage("UI");
}

function showPage(id)
{
	if(id === "UI")
	{
		show("UI", "Result");
	}
	if(id === "Result")
	{
		show("Result", "UI");
	}
}

function setErrorMessage(status)
{
	document.getElementById("message").innerHTML = status;
	state.status = status;
}
//--------------------------------

function setState()
{
	//alert("setStatus");
	var p = document.getElementById("principle").value;
	var i = document.getElementById("interest").value;
	var a = document.querySelector('input[name="amortization"]:checked').value;
	state.principle = p;
	//alert("printipe" + state.principle)
	state.interest = i;
	state.amort = a;
}

function doSimpleAjax(address, data, handler) {
	var request = new XMLHttpRequest();
	request.open("GET", (address + "?" + data), true);
	request.onreadystatechange =  function(){handler(request);};
	//alert("in ajax3");
	request.send(null);

}

function showPayment(request)
{
	//alert("showPayment");
	if (request.readyState == 4 && request.status == 200) 
	{
		//alert("response text: " + request.responseText);
		var payload = JSON.parse(request.responseText); 
		//alert("json text: " + payload.status);
		if(payload.status === "No")
		{
			//print error meesage
			alert("error message " + payload.payment);
		}
		else
		{//status ok
			showPage("Result");
			document.getElementById("payment").innerHTML = payload.payment + "%";
		}

	}
}

function recompute()
{
	alert("click recompute");
	//1. validate
	//var ni = document.getElementById("newinterest").innerHTML;
	//alert("new interest: " + ni);
	showPage("Result");
	return true;
//	if(isNaN(ni)|| ni <= 0)
//	{
//		state.status = "Interest must be a positive number!";
//		alert("message" + state.status);
//	}
//	else if(ni === "")
//	{
//		state.status = "interest cannot be empty!";
//		alert("message " + state.status);
//
//	}
//	else
//	{
//		status.interest = ni;
//		var data = "args=" + JSON.stringify(state); 
//		doSimpleAjax("payment.do", data, showPayment);
//	}
}
function cl()
{
	alert("clickckckkc");
	//return false;
	}

function test()
{
	return false;}
//----------------------------------------------------

window.onload = function () {
	reset();
	populateBankList();

};
