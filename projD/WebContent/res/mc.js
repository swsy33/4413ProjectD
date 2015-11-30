/*global vars*/
var result;
//var request;
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
	setState();

	//alert("in validate2");
	if(state.principle === "")
	{
		state.msg = "principle cannot be empty!";
		alert("message " + state.msg);
	}
	else if(isNaN(state.principle)|| state.principle <= 0)
	{
		state.msg = "principle must be a positive number!";
		alert("message" + state.msg);
	}
	else if(state.interest === "")
	{
		state.msg = "interest cannot be empty!";
		alert("message " + state.msg);

	}
	else if(isNaN(state.interest) || state.interest <= 0)
	{
		state.msg = "interest must be a positive number!";
		alert("message" + state.msg);
	}
	else{
		doSimpleAjax("http://localhost:4413/projD", state, handler);
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
	state.msg = msg;
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
	//alert("in loadD3");
	request.send(null);

}

function handler(request)
{
	alert("handle");
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
			showPage("Result");
			document.getElementById("payment").innerHTML = result + "%";
		}

	}
}

//----------------------------------------------------

window.onload = function () {
	reset();
	populateBankList();

};
