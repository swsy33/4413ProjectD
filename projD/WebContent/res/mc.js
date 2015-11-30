/*global vars*/
var result;
var request;
var state = {principle : "",
		interest : "",
		amort : "",
		msg:"",
		payment : ""};

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
	//alert("in validate1");
	setStatus();
	loadDoc();
	//alert("in validate2");
	if(isNaN(status.principle)|| status.principle <= 0)
	{
		status.msg = "principle must be a positive number!";
		alert("message" + status.msg);
	}
	//alert("in validate3");


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

function reset()
{
	//alert("in rest");
	state = {principle : "",
			interest : "",
			amort : "25",
			msg:"",
			payment : ""};
	setDefaultAmort();
	show("UI");
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

function setErrorMessage(msg)
{
	document.getElementById("message").innerHTML = msg;
	status.msg = msg;
}
//--------------------------------

function setStatus()
{
	var p = document.getElementById("principle").value;
	var i = document.getElementById("interest").value;
	var a = document.querySelector('input[name="amortization"]:checked').value;
	status.principle = p;
	status.interest = i;
	status.amort = a;
}

function loadDoc() {
	request = new XMLHttpRequest();
	//alert("in loadD");
	//alert("in loadD");
	request.open("POST", "http://localhost:4413/mcApp1/payment.do?principle="+status.principle+"&interest="+status.interest+"&amort="+ status.amort, true);
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
	reset();
	populateBankList();

};
