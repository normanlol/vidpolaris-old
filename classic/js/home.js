getTrending(localStorage.getItem("sLoc"));

function getTrending(opt) {
	function getTrending(opt,inst) {
	const http = new XMLHttpRequest();
	if (!inst | inst == "o") {
		if (opt == "a" | !opt) {
			var url = "https://coorsproxyunlimited.herokuapp.com/http://normandotmp4.electrohaxz.tk:9019/?trending=" + localStorage.getItem("trendingCont")
		} else if (opt == "b") {
			var url = "https://vidpolaris.herokuapp.com/?trending=" + localStorage.getItem("trendingCont");
		} else if (opt == "c") {
			var url = "https://vidpolaris-europe.herokuapp.com/?trending=" + localStorage.getItem("trendingCont");
		}
	} else {
		if (opt == "a" | !opt) {
			var url = "https://coorsproxyunlimited.herokuapp.com/http://normandotmp4.electrohaxz.tk:9019/?trending=" + localStorage.getItem("trendingCont") + "&inst=" + inst
		} else if (opt == "b") {
			var url = "https://vidpolaris.herokuapp.com/?trending=" + localStorage.getItem("trendingCont") + "&inst=" + inst;
		} else if (opt == "c") {
			var url = "https://vidpolaris-europe.herokuapp.com/?trending=" + localStorage.getItem("trendingCont") + "&inst=" + inst;
		}
	}
	http.open("GET", url);
	http.send();
	http.onload=(e)=>{
		var jsond = JSON.parse(http.responseText);
		if (!jsond[0]) {
			if (inst) {
				if (opt == "a" | !opt) {
					getTrending("b", inst);
					return;
				} else if (opt == "b") {
					getTrending("c", inst);
					return;
				} else if (opt == "c") {
					getTrending("a", inst);
					return;
				}
			} else {
				if (opt == "a" | !opt) {
					getTrending("b");
					return;
				} else if (opt == "b") {
					getTrending("c");
					return;
				} else if (opt == "c") {
					getTrending("a");
					return;
				}
			}
		}
		for (var c in jsond) {
			if (c > 17) {
				document.getElementById("trendingLoader").style.display = 'none';
				document.getElementById("trending").style.display = '';
				document.getElementById("mainTrending").style.display = '';
				if (!inst) {
					getTrendingMusic(opt);
				} else {
					getTrendingMusic(opt,inst);
				}
				return;
			}
			var link = document.createElement("A");
			link.href = "w#" + jsond[c].videoId;
			link.id = "l" + c;
			document.getElementById("mainTrending").appendChild(link);
			var div = document.createElement("DIV");
			div.classList.add("video");
			div.id = "div" + c;
			document.getElementById("l"+c).appendChild(div);
			var img = document.createElement("IMG");
			img.classList.add("largeThumb");
			img.src = "https://img.youtube.com/vi/" + jsond[c].videoId + "/default.jpg";
			document.getElementById("div"+c).appendChild(img);
			var div2 = document.createElement("DIV");
			div2.classList.add("td");
			div2.id = "tdDiv"+c;
			document.getElementById("div"+c).appendChild(div2);
			var h3 = document.createElement("H3");
			h3.classList.add("stat");
			h3.innerHTML = jsond[c].title;
			document.getElementById("tdDiv"+c).appendChild(h3);
			var stat1 = document.createElement("H4");
			stat1.innerHTML = 'by ' + jsond[c].author;
			stat1.classList.add("stat")
			document.getElementById("tdDiv"+c).appendChild(stat1);
			var stat2 = document.createElement("H4");
			stat2.innerHTML = 'posted ' + jsond[c].publishedText;
			stat2.classList.add("stat");
			document.getElementById("tdDiv"+c).appendChild(stat2);
		}
	}
}