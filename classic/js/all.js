
document.addEventListener('keydown', function (event) {
    if (event.defaultPrevented) {
        return;
    }

    var key = event.key || event.keyCode;

	if (document.activeElement.tagName == "INPUT") {
		if (key == 'Enter' | key == 13) {
			getSLink();
		}
		return;
	}
})

function getSLink() {
	var q = document.getElementById("search").value;
	window.open("search/#" + encodeURIComponent(q), "_self")
}

function suggest(opt) {
	if (document.getElementById("search").value == "" | localStorage.getItem("suggest") == "n") {
		document.getElementById("suggest").innerHTML = "";
		return;
	}
	var q = document.getElementById("search").value;
	if (opt == "a" | !opt) {
		var url = "https://coorsproxyunlimited.herokuapp.com/http://normandotmp4.electrohaxz.tk:9019/?suggest=" + q;
	} else if (opt == "b"){
		var url = "https://vidpolaris.herokuapp.com/?suggest=" + q;
	} else if (opt == "c") {
		var url = "https://vidpolaris-europe.herokuapp.com/?suggest=" + q;
	}
	const http = new XMLHttpRequest();
	http.open("GET", url);
	http.send();
	http.onload=(e)=>{
		var jsond = JSON.parse(http.responseText);
		if (jsond.results[0]) {
			var opti = document.createElement("OPTION");
			opti.innerHTML = jsond.results[0];
			document.getElementById("suggest").innerHTML = "";
			document.getElementById("suggest").appendChild(opti);
			if (jsond.results[1]) {
				var opti = document.createElement("OPTION");
				opti.innerHTML = jsond.results[1];
				document.getElementById("suggest").appendChild(opti);
				if (jsond.results[2]) {
					var opti = document.createElement("OPTION");
					opti.innerHTML = jsond.results[2];
					document.getElementById("suggest").appendChild(opti);
					if (jsond.results[3]) {
						var opti = document.createElement("OPTION");
						opti.innerHTML = jsond.results[3];
						document.getElementById("suggest").appendChild(opti);
						if (jsond.results[4]) {
							var opti = document.createElement("OPTION");
							opti.innerHTML = jsond.results[4];
							document.getElementById("suggest").appendChild(opti);
						}
					}
				}
			}
		}
	}
}