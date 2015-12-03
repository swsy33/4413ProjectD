/*global vars*/
var result;
var btnID;
var state = {principle : "",
		interest : "",
		amort : "",
		status:"",
		payment : ""};

/*functions*/

/*view*/
function show(shown, hidden) {
	document.getElementById(shown).style.display = "block";
	document.getElementById(hidden).style.display = "none";
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

function setDefaultAmort()
{
	//alert("this is amort");
	var a ="amort25";
	document.getElementById(a).checked = true;

}

function reset()
{
	//alert("in reset");
	state = {principle : "",
			interest : "",
			amort : "25",
			status:"",
			payment : ""};
	setDefaultAmort();
	showPage("UI");
}

function updateResult()
{
	//if click startover
	if(btnID === "startover")
	{
		return true;
	}
	//if click recompute
	if(btnID === "recompute")
	{
		reCompute();
		return false;
	}
}

function btnClicked(source)
{
	//alert("click: " + source.id);
	btnID = source.id;
}
/*view*/
/**/
function validate()
{
	//alert("in validate1");
	setState();
	//alert("in validate2");
	if(state.principle === "")
	{
		state.status = "principle cannot be empty!";
		alert(state.status);
	}
	else if(isNaN(state.principle)|| state.principle <= 0)
	{
		state.status = "principle must be a positive number!";
		alert(state.status);
	}
	else if(state.interest === "")
	{
		state.status = "interest cannot be empty!";
		alert(state.status);

	}
	else if(isNaN(state.interest) || state.interest <= 0)
	{
		state.status = "interest must be a positive number!";
		alert(state.status);
	}
	else{
		var data = "args=" + JSON.stringify(state); 
		//D1
		//doSimpleAjax("payment.do", data, showPayment);
		//D2
		doSimpleAjax("paymentXML.do",data, showPayment);
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
	//alert("in ajax");
	request.send(null);

}

function showPayment(request)
{
	if (request.readyState == 4 && request.status == 200) 
	{
		/* D1
		 * var payload = JSON.parse(request.responseText); 
		//alert("json text: " + payload.status);
		if(payload.status === "No")
		{
			//alert("error message " + payload.payment);
			showPage("UI");
			document.getElementById("message").innerHTML = payload.payment;

		}
		else
		{//status ok
			showPage("Result");
			document.getElementById("payment").innerHTML = payload.payment + "%";
			document.getElementById("newinterest").value = "";
		}
		 * D1
		 */

		//D2
		alert("in showPayment");
		var parser = new DOMParser();
		alert("res " + request.responseText);
		var xmlDoc = parser.parseFromString(request.responseText,"text/xml"); 
		alert("xmlDoc " + xmlDoc);
		var root = xmlDoc.getElementsByTagName("payPod");
		//alert("root 0 " + root[0]);
		var sta = root[0].getAttribute("status");
		alert(sta);
		var pay = xmlDoc.getElementsByTagName("payment")[0].textContent;
		alert("179");
		var msg = xmlDoc.getElementByTagName("msg")[0].textContent;

		if(sta === false)
		{
			showPage("UI"); alert("in ui");
			document.getElementById("message").innerHTML = msg;
		}
		else
		{
			showPage("Result");
			document.getElementById("payment").innerHTML = pay + "%";
			document.getElementById("newinterest").value = "";
		}
	}
}

function reCompute()
{
	//alert("click recompute");
	//1. validate
	var ni = document.getElementById("newinterest").value;
	if(ni === "")
	{
		state.status = "Interest cannot be empty!";
		alert(state.status);
	}
	else if(isNaN(ni)|| ni <= 0)
	{
		state.status = "Interest must be a positive number!";
		alert(state.status);
	}
	else
	{
		//recompute
		state.interest = ni;
		var data = "args=" + JSON.stringify(state); 
		doSimpleAjax("payment.do", data, showPayment);
	}
}

//----------------------------------------------------

window.onload = function () {
	reset();
	populateBankList();

};
