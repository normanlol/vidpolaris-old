console.log("script loaded.");
console.log("==================");

resize();
keepProg();
if (window.location.href.includes("#c") | window.location.href.includes("#w") | window.location.href.includes("#s")) {
	refresh();
} else {
	if (localStorage.getItem("sLoc")) {
		getTrending(localStorage.getItem("sLoc"));
	} else {
		getTrending();
	}
}

document.getElementById("trendingLoader").style.display = "";

// settings checkers
console.log("- removing unnecessary sessionStorage items...");

if (sessionStorage.getItem("currentlyRunningT")) {
	sessionStorage.removeItem("currentlyRunningT");
	console.log("-- removed 'currentlyRunningT' item");
}

if (sessionStorage.getItem("currentlyOpening")) {
	sessionStorage.removeItem("currentlyOpening");
	console.log("-- removed 'currentlyOpening' item");
}

if (sessionStorage.getItem("nxtpg")) {
	sessionStorage.removeItem("nxtpg");
	console.log("-- removed 'nxtpg' item");
}

if (sessionStorage.getItem("embed")) {
	sessionStorage.removeItem("embed");
	console.log("-- removed 'embed' item");
}

if (!localStorage.getItem("trendCont")) {
	if (localStorage.getItem("c")) {
		console.log("--- country imported from NewsPage")
		localStorage.setItem("trendCont", localStorage.getItem("c"))
	} else {
		localStorage.setItem("trendCont", "us");
	}
} else {
	document.getElementById("country").value = localStorage.getItem("trendingCont");
}

console.log("- checking and setting localStorage items")

if (!localStorage.getItem("disableCards")) {
	localStorage.setItem("disableCards", "n");
	document.getElementById("disableCards").value = "n";
} else {
	if (localStorage.getItem("disableCards") == "y") {
		document.getElementById("disableCards").value = "y";
		document.getElementById("cardsContainer").style.display = "none";
	} else {
		document.getElementById("disableCards").value = "n";
	}
}

if (!localStorage.getItem("sLoc")) {
	document.getElementById("server").value = "a";
	localStorage.setItem("sLoc", "a");
} else {
	document.getElementById("server").value = localStorage.getItem("sLoc");
}

if (!localStorage.getItem("loadComm")) {
	localStorage.setItem("loadComm", "y");
	document.getElementById("autoComm").value = "y";
} else {
	document.getElementById("autoComm").value = localStorage.getItem("loadComm");
}

if (!localStorage.getItem("autoplay")) {
	localStorage.setItem("autoplay" , "y");
	document.getElementById('apSwitch').checked = true;
} else {
	if (localStorage.getItem("autoplay") == "y") {
		document.getElementById("apSwitch").checked = true;
	} else {
		document.getElementById("apSwitch").checked = false;
	}
}

if (!localStorage.getItem("pbSpeed")) {
	localStorage.setItem("pbSpeed" , "1x");
	document.getElementById("speed").value = "1x";
} else {
	document.getElementById("speed").value = localStorage.getItem("pbSpeed");
	setSpeed();
}

if (!localStorage.getItem("suggest")) {
	localStorage.setItem("suggest" , "y");
	document.getElementById("suggest").value = "y"
} else {
	document.getElementById("suggest").value = localStorage.getItem("suggest");
}

if (!localStorage.getItem("theme")) {
	localStorage.setItem("theme" , "d_v1");
	document.getElementById("wTheme").value = "d_v1";
} else {
	if (localStorage.getItem("theme") == "w") {
		localStorage.setItem("theme" , "w_v1");
	} else if (localStorage.getItem("theme") == "d") {
		localStorage.setItem("theme" , "d_v1");
	}
	document.getElementById("wTheme").value = localStorage.getItem("theme");
}

if (!localStorage.getItem("smart")) {
	localStorage.setItem("smart" , "y");
	document.getElementById("sq").value = "y";
} else {
	document.getElementById("sq").value = localStorage.getItem("smart");
}

if (!localStorage.getItem("theatre")) {
	localStorage.setItem("theatre" , "n");
} else {
	if (localStorage.getItem("theatre") == 'n') {
		// do nothing
	} else {
		theatre();
	}
}

console.log("ended onclick functions");
console.log("==================");

// end setting checkers
// listeners

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
	} else {
		if (key == 'j' || key == 'J' || key == 74) {
			document.getElementById("player").currentTime = document.getElementById("player").currentTime - 10;
			if (localStorage.getItem('smart') == 'y') {
				document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
			}
		} else if (key == 'k' || key == 'K' || key == 75) {
			if (!document.getElementById("embedContainer").style.display == "") {
				if (!document.getElementById("player").paused) {
					document.getElementById('player').pause();
				} else {
					document.getElementById('player').play();
				}
			}
		} else if (key == 'l' || key == 'L' || key == 76) {
			document.getElementById("player").currentTime = document.getElementById("player").currentTime + 10;
			if (localStorage.getItem('smart') == 'y') {
				document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
			}
		} else if (key == 't' || key == 'T' || key == 84) {
			if (sessionStorage.getItem("embed") == "y") {
				theatre("embed");
			} else {
				theatre();
			}
		} else if (key == 'f' || key == 'F' || key == 70) {
			if (!document.getElementById("embedContainer").style.display == "") {
				// credit: https://stackoverflow.com/questions/36672561/how-to-exit-fullscreen-onclick-using-javascript
				var isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
					(document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
					(document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
					(document.msFullscreenElement && document.msFullscreenElement !== null);
				if (!isInFullScreen) {
					if (document.getElementById("player").requestFullscreen) {
						document.getElementById("player").requestFullscreen();
					} else if (document.getElementById("player").mozRequestFullScreen) {
						document.getElementById("player").mozRequestFullScreen();
					} else if (document.getElementById("player").webkitRequestFullScreen) {
						document.getElementById("player").webkitRequestFullScreen();
					} else if (document.getElementById("player").msRequestFullscreen) {
						document.getElementById("player").msRequestFullscreen();
					}
				} else {
					if (document.exitFullscreen) {
						document.exitFullscreen();
					} else if (document.webkitExitFullscreen) {
						document.webkitExitFullscreen();
					} else if (document.mozCancelFullScreen) {
						document.mozCancelFullScreen();
					} else if (document.msExitFullscreen) {
						document.msExitFullscreen();
					}
				}
			}
		} else if (key == "<" || key == 188) {
			var speed = document.getElementById("speed").value;
			if (speed == "25x") {
				document.getElementById("speed").value = "p1x";
				if (localStorage.getItem("smart") == "y") { 
					document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
				}
			} else if (speed == "5x") {
				document.getElementById("speed").value = "25x";
				if (localStorage.getItem("smart") == "y") { 
					document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
				}
				setSpeed();
			} else if (speed == "75x") {
				document.getElementById("speed").value = "5x";
				if (localStorage.getItem("smart") == "y") { 
					document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
				}
				setSpeed();
			} else if (speed == "1x") {
				document.getElementById("speed").value = "75x";
				if (localStorage.getItem("smart") == "y") { 
					document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
				}
				setSpeed();
			} else if (speed == "125x") {
				document.getElementById("speed").value = "1x";
				if (localStorage.getItem("smart") == "y") { 
					document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
				}
				setSpeed();
			} else if (speed == "15x") {
				document.getElementById("speed").value = "125x";
				if (localStorage.getItem("smart") == "y") { 
					document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
				}
				setSpeed();
			} else if (speed == "175x") {
				document.getElementById("speed").value = "15x";
				if (localStorage.getItem("smart") == "y") { 
					document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
				}
				setSpeed();
			} else if (speed == "2x") {
				document.getElementById("speed").value = "175x";
				if (localStorage.getItem("smart") == "y") { 
					document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
				}
				setSpeed();
			} else if (speed == "225x") {
				document.getElementById("speed").value = "2x";
				if (localStorage.getItem("smart") == "y") { 
					document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
				}
				setSpeed();
			} else if (speed == "2p5x") {
				document.getElementById("speed").value = "225x";
				if (localStorage.getItem("smart") == "y") { 
					document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
				}
				setSpeed();
			} else if (speed == "275x") {
				document.getElementById("speed").value = "2p5x";
				if (localStorage.getItem("smart") == "y") { 
					document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
				}
				setSpeed();
			} else if (speed == "3x") {
				document.getElementById("speed").value = "275x";
				if (localStorage.getItem("smart") == "y") { 
					document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
				}
				setSpeed();
			}
		} else if (key == ">" || key == 190) {
			var speed = document.getElementById("speed").value;
			if (speed == "3x") {
				if (localStorage.getItem("smart") == "y") { 
					document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
				}
			} else if (speed == "275x") {
				document.getElementById("speed").value = "3x";
				if (localStorage.getItem("smart") == "y") { 
					document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
				}
			} else if (speed == "2p5x") {
				document.getElementById("speed").value = "275x";
				if (localStorage.getItem("smart") == "y") { 
					document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
				}
			} else if (speed == "225x") {
				document.getElementById("speed").value = "2p5x";
				if (localStorage.getItem("smart") == "y") { 
					document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
				}
			} else if (speed == "2x") {
				document.getElementById("speed").value = "225x";
				if (localStorage.getItem("smart") == "y") { 
					document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
				}
			} else if (speed == "175x") {
				document.getElementById("speed").value = "2x";
				if (localStorage.getItem("smart") == "y") { 
					document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
				}
				setSpeed();
			} else if (speed == "15x") {
				document.getElementById("speed").value = "175x";
				if (localStorage.getItem("smart") == "y") { 
					document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
				}
				setSpeed();
			} else if (speed == "125x") {
				document.getElementById("speed").value = "15x";
				if (localStorage.getItem("smart") == "y") { 
					document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
				}
				setSpeed();
			} else if (speed == "1x") {
				document.getElementById("speed").value = "125x";
				if (localStorage.getItem("smart") == "y") { 
					document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
				}
				setSpeed();
			} else if (speed == "75x") {
				document.getElementById("speed").value = "1x";
				if (localStorage.getItem("smart") == "y") { 
					document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
				}
				setSpeed();
			} else if (speed == "5x") {
				document.getElementById("speed").value = "75x";
				if (localStorage.getItem("smart") == "y") { 
					document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
				}
				setSpeed();
			} else if (speed == "25x") {
				document.getElementById("speed").value = "5x";
				if (localStorage.getItem("smart") == "y") { 
					document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
				}
				setSpeed();
			} else if (speed == "p1x") {
				document.getElementById("speed").value = "25x";
				if (localStorage.getItem("smart") == "y") { 
					document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
				}
				setSpeed();
			}
		} else if (key == "m" || key == "M" || key == 77) {
			if (localStorage.getItem("smart") == "n") {
				if (document.getElementById("player").muted == true) {
					document.getElementById("player").muted = false;
				} else {
					document.getElementById("player").muted = true;
				}
			} else {
				if (document.getElementById("audioPlayer").muted == true) {
					document.getElementById("audioPlayer").muted = false;
				} else {
					document.getElementById("audioPlayer").muted = true;
				}
			}
		} else if (key == "0" | key == 48) {
			if (document.getElementById("playerContainer").style.display == "") {
				document.getElementById("player").currentTime = 0;
				if (localStorage.getItem("smart") == "y") { 
					document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
				}
			}
		} else if (key == "1" | key == 49) {
			if (document.getElementById("playerContainer").style.display == "") {
				var d = (document.getElementById("player").duration / 10);
				document.getElementById("player").currentTime = d;
				if (localStorage.getItem("smart") == "y") { 
					document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
				}
			}
		} else if (key == "2" | key == 50) {
			if (document.getElementById("playerContainer").style.display == "") {
				var d = (document.getElementById("player").duration / 10) * 2;
				document.getElementById("player").currentTime = d;
				if (localStorage.getItem("smart") == "y") { 
					document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
				}
			}
		} else if (key == "3" | key == 51) {
			if (document.getElementById("playerContainer").style.display == "") {
				var d = (document.getElementById("player").duration / 10) * 3;
				document.getElementById("player").currentTime = d;
				if (localStorage.getItem("smart") == "y") { 
					document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
				}
			}
		} else if (key == "4" | key == 52) {
			if (document.getElementById("playerContainer").style.display == "") {
				var d = (document.getElementById("player").duration / 10) * 4;
				document.getElementById("player").currentTime = d;
				if (localStorage.getItem("smart") == "y") { 
					document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
				}
			}
		} else if (key == "5" | key == 53) {
			if (document.getElementById("playerContainer").style.display == "") {
				var d = (document.getElementById("player").duration / 10) * 5;
				document.getElementById("player").currentTime = d;
				if (localStorage.getItem("smart") == "y") { 
					document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
				}
			}
		} else if (key == "6" | key == 54) {
			if (document.getElementById("playerContainer").style.display == "") {
				var d = (document.getElementById("player").duration / 10) * 6;
				document.getElementById("player").currentTime = d;
				if (localStorage.getItem("smart") == "y") { 
					document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
				}
			}
		} else if (key == "7" | key == 55) {
			if (document.getElementById("playerContainer").style.display == "") {
				var d = (document.getElementById("player").duration / 10) * 7;
				document.getElementById("player").currentTime = d;
				if (localStorage.getItem("smart") == "y") { 
					document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
				}
			}
		} else if (key == "8" | key == 56) {
			if (document.getElementById("playerContainer").style.display == "") {
				var d = (document.getElementById("player").duration / 10) * 8;
				document.getElementById("player").currentTime = d;
				if (localStorage.getItem("smart") == "y") { 
					document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
				}
			}
		} else if (key == "9" | key == 57) {
			var d = (document.getElementById("player").duration / 10) * 9;
			document.getElementById("player").currentTime = d;
			if (localStorage.getItem("smart") == "y") { 
				document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
			}
		}
	}
});

document.getElementById("player").onerror = function(e){
	sessionStorage.setItem("ewv", "y");
	if (!sessionStorage.getItem("ewa")) {
		openVideo(localStorage.getItem("sLoc"), "y");
	} else {
		document.getElementById("loadErr").style.display = "";
		return;
	}
};

document.getElementById("audioPlayer").onerror = function(e){
	sessionStorage.setItem("ewa", "y");
	if (!sessionStorage.getItem("ewv")) {
		openVideo(localStorage.getItem("sLoc"), "y");
	} else {
		document.getElementById("loadErr").style.display = "";
		return;
	}
};

console.log("autoplay: " + localStorage.getItem('autoplay'));
console.log("smartQual: " + localStorage.getItem('smart'));
console.log("server: " + localStorage.getItem('sLoc'));

// end onload functions

function resize() {
	var w = window.innerWidth;
	if (!localStorage.getItem("theme") | localStorage.getItem("theme") == "d_v1") {
		if (!localStorage.getItem("theme")) {
			localStorage.setItem("theme" , "d_v1");
		}
		if (w < 1200) {
			document.getElementById("theme").href = "css/v1/dark/mobile.css";
			if (localStorage.getItem("theater") == "n") {
				theatre();
			}
		} else if (w < 1430) {
			document.getElementById("theme").href = "css/v1/dark/smaller.css";
		} else {
			document.getElementById("theme").href = "css/v1/dark/style.css";
		}
	} else if (localStorage.getItem("theme") == "w_v1") {
		if (w < 1200) {
			document.getElementById("theme").href = "css/v1/white/mobile.css";
			if (localStorage.getItem("theater") == "n") {
				theatre();
			}
		} else if (w < 1430) {
			document.getElementById("theme").href = "css/v1/white/smaller.css";
		} else {
			document.getElementById("theme").href = "css/v1/white/style.css";
		}
	} else if (localStorage.getItem("theme") == "b_v1") {
		if (w < 1200) {
			document.getElementById("theme").href = "css/v1/black/mobile.css";
			if (localStorage.getItem("theater") == "n") {
				theatre();
			}
		} else if (w < 1430) {
			document.getElementById("theme").href = "css/v1/black/smaller.css";
		} else {
			document.getElementById("theme").href = "css/v1/black/style.css";
		}
	}
}

function getSLink() {
	window.open("#s#" + encodeURIComponent(document.getElementById("q").value), "_self")
}

function search(opt) {
	document.title = "vidpolaris";
	var q = getClickedId(window.location.href, "#s#");
	document.title = "search results for " + decodeURIComponent(q) + " | vidpolaris";
	document.getElementById("searchPage").style.display = '';
	document.getElementById("seaLoader").style.display = '';
	document.getElementById("helpOut").style.display = '';
	document.getElementById("resultsContainer").style.display = 'none';
	document.getElementById("vidPage").style.display = 'none';
	document.getElementById("channelPage").style.display = 'none';
	document.getElementById("searchContainer").style.display = 'none';
	document.getElementById("homePage").style.display = 'none';
	document.getElementById("settingsPage").style.display = 'none';
	document.getElementById("searchTerm").style.display = "none";
	document.getElementById("player").pause();
	document.getElementById("bannerPfpContainer").style.display = 'none';
	const http = new XMLHttpRequest();
	if (opt == "a" | !opt) {
		var url = "https://coorsproxyunlimited.herokuapp.com/http://normandotmp4.electrohaxz.tk:9019/?search=" + q;
	} else if (opt == "b"){
		var url = "https://vidpolaris.herokuapp.com/?search=" + q;
	} else if (opt == "c") {
		var url = "https://vidpolaris-europe.herokuapp.com/?search=" + q;
	}
	http.open("GET", url);
	http.send();
	http.onload=(e)=>{
		var jsond = JSON.parse(http.responseText);
		document.getElementById("searchQuery").innerHTML = decodeURIComponent(q);
		document.getElementById("searchTerm").style.display = "";
		if (!jsond.searchResults) {
			document.getElementById("errorPage").style.display = '';
			document.getElementById("errorTxt").innerHTML = "no results were found."
			document.getElementById("vidPage").style.display = 'none';
			document.getElementById("nsWarnPage").style.display = 'none';
			document.getElementById("settingsPage").style.display = 'none';
			document.getElementById("searchPage").style.display = 'none';
			document.getElementById("homePage").style.display = 'none';
			document.getElementById("bannerPfpContainer").style.display = 'none';
			return;
		}
		if (opt == "a" | !opt) {
			var baseUrl = "http://normandotmp4.electrohaxz.tk:9019/?thumb=";
		} else if (opt == "b") {
			var baseUrl = "https://vidpolaris.herokuapp.com/?thumb=";
		} else if (opt == "c") {
			var baseUrl = "https://vidpolaris-europe.herokuapp.com/?thumb=";
		}
		document.getElementById("resultsContainer").innerHTML = "";
		for (var c in jsond.searchResults.items) {
			if (jsond.searchResults.items[c].type == "video") {
				var link = document.createElement("A");
				link.href = "#w#" + jsond.searchResults.items[c].link.substring(32);
				link.id = "re" + c;
				document.getElementById("resultsContainer").appendChild(link); 
				var div = document.createElement("DIV");
				div.classList.add("resultVideo");
				div.id = "re" + c + "Div";
				document.getElementById("re"+c).appendChild(div);
				var thumb = document.createElement("IMG");
				thumb.src = baseUrl + jsond.searchResults.items[c].link.substring(32);
				thumb.classList.add("smallThumb");
				document.getElementById("re"+c+"Div").appendChild(thumb);
				var div2 = document.createElement("DIV");
				div2.classList.add("resultD");
				div2.id = "re" + c + "Info";
				document.getElementById("re"+c+"Div").appendChild(div2);
				var title = document.createElement("H2");
				title.innerHTML = jsond.searchResults.items[c].title;
				title.classList.add("stat");
				document.getElementById("re"+c+"Info").appendChild(title);
				var author = document.createElement("H3");
				author.innerHTML = '<span class="material-icons ico">person</span> ' + jsond.searchResults.items[c].author.name;
				author.classList.add("stat");
				document.getElementById("re"+c+"Info").appendChild(author);
				var stat1 = document.createElement("H3");
				if (jsond.searchResults.items[c].views == null | !jsond.searchResults.items[c].views) {
					stat1.innerHTML = '<span class="material-icons ico">remove_red_eye</span> [Unobtainable] views';
				} else {
					stat1.innerHTML = '<span class="material-icons ico">remove_red_eye</span> ' + jsond.searchResults.items[c].views.toLocaleString() + ' views';
				}
				stat1.classList.add("stat");
				document.getElementById("re"+c+"Info").appendChild(stat1);
				var stat2 = document.createElement("H3");
				stat2.innerHTML = '<span class="material-icons ico">calendar_today</span> posted ' + jsond.searchResults.items[c].uploaded_at;
				stat2.classList.add("stat");
				document.getElementById("re"+c+"Info").appendChild(stat2);
				var stat3 = document.createElement("H3");
				stat3.innerHTML = '<span class="material-icons ico">timer</span> ' + jsond.searchResults.items[c].duration;
				stat3.classList.add("stat");
				document.getElementById("re"+c+"Info").appendChild(stat3);
				var desc = document.createElement("P");
				desc.innerHTML = jsond.searchResults.items[c].description;
				desc.classList.add("stat");
				document.getElementById("re"+c+"Info").appendChild(desc);
			} else if (jsond.searchResults.items[c].type == "playlist") {
				var link = document.createElement("A");
				link.href = jsond.searchResults.items[c].link;
				link.id = "re" + c
				document.getElementById("resultsContainer").appendChild(link);
				var div = document.createElement("DIV");
				div.classList.add("resultVideo");
				div.id = "re" + c + "Div"
				document.getElementById("re"+c).appendChild(div);
				var thumb = document.createElement("IMG");
				thumb.src = jsond.searchResults.items[c].thumbnail;
				thumb.classList.add("smallThumb");
				document.getElementById("re"+c+"Div").appendChild(thumb);
				var div2 = document.createElement("DIV");
				div2.classList.add("resultD");
				div2.id = "re" + c + "Info";
				document.getElementById("re"+c+"Div").appendChild(div2);
				var title = document.createElement("H2");
				title.innerHTML = jsond.searchResults.items[c].title;
				title.classList.add("stat");
				document.getElementById("re"+c+"Info").appendChild(title);
				var author = document.createElement("H3")
				author.innerHTML = '<span class="material-icons ico">person</span> ' + jsond.searchResults.items[c].author.name;
				author.classList.add("stat");
				document.getElementById("re"+c+"Info").appendChild(author);
				var playLength = document.createElement("H3");
				playLength.innerHTML = '<span class="material-icons ico">playlist_play</span> ' + jsond.searchResults.items[c].length;
				playLength.classList.add("stat")
				document.getElementById("re"+c+"Info").appendChild(playLength);
			} else if (jsond.searchResults.items[c].type == "channel") {
				var link = document.createElement("A");
				link.href = "#c#" + jsond.searchResults.items[c].channel_id;
				link.id = "re" + c
				document.getElementById("resultsContainer").appendChild(link);
				var div = document.createElement("DIV");
				div.classList.add("resultVideo");
				div.id = "re" + c + "Div"
				document.getElementById("re"+c).appendChild(div);
				var thumb = document.createElement("IMG");
				thumb.src = jsond.searchResults.items[c].avatar;
				thumb.classList.add("smallIcon");
				document.getElementById("re"+c+"Div").appendChild(thumb);
				var div2 = document.createElement("DIV");
				div2.classList.add("resultD");
				div2.id = "re" + c + "Info";
				document.getElementById("re"+c+"Div").appendChild(div2);
				var author = document.createElement("H2");
				author.innerHTML = jsond.searchResults.items[c].name;
				author.classList.add("stat");
				document.getElementById("re"+c+"Info").appendChild(author);
				var stat1 = document.createElement("H3");
				stat1.innerHTML = '<span class="material-icons ico">playlist_play</span> ' + jsond.searchResults.items[c].videos.toLocaleString() + ' videos';
				stat1.classList.add("stat");
				document.getElementById("re"+c+"Info").appendChild(stat1);
				var desc = document.createElement("P");
				desc.innerHTML = jsond.searchResults.items[c].description_short;
				desc.classList.add("stat");
				document.getElementById("re"+c+"Info").appendChild(desc);
			} else if (jsond.searchResults.items[c].type == "shelf-vertical") {
				var mDiv = document.createElement("DIV");
				mDiv.classList.add("verticalShelf");
				mDiv.id = "re" + c;
				document.getElementById("resultsContainer").appendChild(mDiv);
				var shelfTitle = document.createElement("H3");
				shelfTitle.classList.add("stat");
				shelfTitle.innerHTML = jsond.searchResults.items[c].title;
				document.getElementById("re"+c).appendChild(shelfTitle);
				for (var cc in jsond.searchResults.items[c].items) {
					var link = document.createElement("A");
					link.href = "#w#" + jsond.searchResults.items[c].items[cc].link.substring(32);
					link.id = "sub" + cc;
					document.getElementById("re"+c).appendChild(link); 
					var div = document.createElement("DIV");
					div.classList.add("sResultVideo");
					div.id = "sub" + cc + "Div";
					document.getElementById("sub"+cc).appendChild(div);
					var thumb = document.createElement("IMG");
					thumb.src = baseUrl + jsond.searchResults.items[c].items[cc].link.substring(32);
					thumb.classList.add("smallThumb");
					document.getElementById("sub"+cc+"Div").appendChild(thumb);
					var div2 = document.createElement("DIV");
					div2.classList.add("resultD");
					div2.id = "sub" + cc + "Info";
					document.getElementById("sub"+cc+"Div").appendChild(div2);
					var title = document.createElement("H2");
					title.innerHTML = jsond.searchResults.items[c].items[cc].title;
					title.classList.add("stat");
					document.getElementById("sub"+cc+"Info").appendChild(title);
					var author = document.createElement("H3");
					author.innerHTML = '<span class="material-icons ico">person</span> ' + jsond.searchResults.items[c].items[cc].author.name;
					author.classList.add("stat");
					document.getElementById("sub"+cc+"Info").appendChild(author);
					var stat1 = document.createElement("H3");
					if (jsond.searchResults.items[c].items[cc].views == null | !jsond.searchResults.items[c].items[cc].views) {
						stat1.innerHTML = '<span class="material-icons ico">remove_red_eye</span> [Unobtainable] views';
					} else {
						stat1.innerHTML = '<span class="material-icons ico">remove_red_eye</span> ' + jsond.searchResults.items[c].items[cc].views.toLocaleString() + ' views';
					}
					stat1.classList.add("stat");
					document.getElementById("sub"+cc+"Info").appendChild(stat1);
					var stat2 = document.createElement("H3");
					stat2.innerHTML = '<span class="material-icons ico">calendar_today</span> posted ' + jsond.searchResults.items[c].items[cc].uploaded_at;
					stat2.classList.add("stat");
					document.getElementById("sub"+cc+"Info").appendChild(stat2);
					var stat3 = document.createElement("H3");
					stat3.innerHTML = '<span class="material-icons ico">timer</span> ' + jsond.searchResults.items[c].items[cc].duration;
					stat3.classList.add("stat");
					document.getElementById("sub"+cc+"Info").appendChild(stat3);
					var desc = document.createElement("P");
					desc.innerHTML = jsond.searchResults.items[c].items[cc].description;
					desc.classList.add("stat");
					document.getElementById("sub"+cc+"Info").appendChild(desc);
				}
			} else {
				
			}
		}
		document.getElementById("seaLoader").style.display = 'none';
		document.getElementById("resultsContainer").style.display = '';
		document.getElementById("searchContainer").style.display = '';
	}
}

function feelingLucky(opt) {
	document.getElementById("homePage").style.display = 'none';
	document.getElementById("searchContainer").style.display = 'none';
	document.getElementById("vidPage").style.display = '';
	document.getElementById("vidLoader").style.display = '';
	const http = new XMLHttpRequest();
	if (!document.getElementById("q").value == "") {
		var q = document.getElementById("q").value;
		if (opt == "a" | !opt) {
			var url = "https://coorsproxyunlimited.herokuapp.com/http://normandotmp4.electrohaxz.tk:9019/?search=" + encodeURIComponent(q);
		} else if (opt == "b") {
			var url = "https://vidpolaris.herokuapp.com/?search=" + encodeURIComponent(q);
		} else if (opt == "c") {
			var url = "https://vidpolaris-europe.herokuapp.com/?search=" + encodeURIComponent(q);
		}
		http.open("GET", url);
		http.send();
		http.onload=(e)=>{
			var jsond = JSON.parse(http.responseText);
			if (!jsond) {
				home();
				return;
			}
			var wLink = jsond.searchResults.items[0].link;
			var link2 = wLink.substring(32);
			window.open("#w#" + link2, "_self");
		}
	} else {
		var randomLetter = [
			"a",
			"b",
			"c",
			"d",
			"e",
			"f",
			"g",
			"h",
			"i",
			"j",
			"k",
			"l",
			"m",
			"n",
			"o",
			"p",
			"q",
			"r",
			"s",
			"t",
			"u",
			"v",
			"w",
			"x",
			"y",
			"z"
		]
		var qLetter = randomLetter[Math.floor(Math.random()*randomLetter.length)];
		console.log(qLetter)
		if (opt == "a" | !opt) {
			var surl = "https://coorsproxyunlimited.herokuapp.com/http://normandotmp4.electrohaxz.tk:9019/?suggest=" + qLetter;
		} else if (opt == "b") {
			var surl = "https://vidpolaris.herokuapp.com/?suggest=" + qLetter;
		} else if (opt == "c") {
			var surl = "https://vidpolaris-europe.herokuapp.com/?suggest=" + qLetter;
		}
		console.log(surl)
		http.open("GET",surl);
		http.send();
		http.onload=(e)=>{
			var json = JSON.parse(http.responseText);
			var res = json.results;
			var q = res[Math.floor(Math.random()*res.length)];
			if (opt == "a" | !opt) {
				var url = "https://coorsproxyunlimited.herokuapp.com/http://normandotmp4.electrohaxz.tk:9019/?search=" + encodeURIComponent(q);
			} else if (opt == "b") {
				var url = "https://vidpolaris.herokuapp.com/?search=" + encodeURIComponent(q);
			} else if (opt == "c") {
				var url = "https://vidpolaris-europe.herokuapp.com/?search=" + encodeURIComponent(q);
			}
			http.open("GET", url);
			http.send();
			http.onload=(e)=>{
				var jsond = JSON.parse(http.responseText);
				if (!jsond) {
					home();
					return;
				}
				var wLink = jsond.searchResults.items[0].link;
				var link2 = wLink.substring(32);
				if (jsond.searchResults.items[0].type == "video") {
					window.open("#w#" + link2, "_self");
				} else if (jsond.searchResults.items[0].type == "channel") {
					window.open("#c#" + link2, "_self");
				} else {
					notPlayable();
				}
			}
		}
	}
}

function getTrending(opt) {
	const http = new XMLHttpRequest();
	if (opt == "a" | !opt) {
		var url = "https://coorsproxyunlimited.herokuapp.com/http://normandotmp4.electrohaxz.tk:9019/?trending=" + localStorage.getItem("trendingCont")
	} else if (opt == "b") {
		var url = "https://vidpolaris.herokuapp.com/?trending=" + localStorage.getItem("trendingCont");
	} else if (opt == "c") {
		var url = "https://vidpolaris-europe.herokuapp.com/?trending=" + localStorage.getItem("trendingCont");
	}
	http.open("GET", url);
	http.send();
	http.onload=(e)=>{
		var jsond = JSON.parse(http.responseText);
		if (!jsond[0]) {
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
		if (opt == "a" | !opt) {
			var baseUrl = "http://normandotmp4.electrohaxz.tk:9019/?thumb=";
		} else if (opt == "b") {
			var baseUrl = "https://vidpolaris.herokuapp.com/?thumb=";
		} else if (opt == "c") {
			var baseUrl = "https://vidpolaris-europe.herokuapp.com/?thumb=";
		}	
		var jsond = JSON.parse(http.responseText);
		for (var c in jsond) {
			if (c > 17) {
				document.getElementById("trendingLoader").style.display = 'none';
				document.getElementById("trending").style.display = '';
				document.getElementById("mainTrending").style.display = '';
				getTrendingMusic(opt)
				return;
			}
			var link = document.createElement("A");
			link.href = "#w#" + jsond[c].videoId;
			link.id = "l" + c;
			document.getElementById("mainTrending").appendChild(link);
			var div = document.createElement("DIV");
			div.classList.add("video");
			div.id = "div" + c;
			document.getElementById("l"+c).appendChild(div);
			var img = document.createElement("IMG");
			img.classList.add("largeThumb");
			img.src = baseUrl + jsond[c].videoId;
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
	http.onerror = function (error) {
		getTrending(opt);
	}
}

function getTrendingMusic(opt) {
	const http = new XMLHttpRequest();
	if (opt == "a" | !opt) {
		var url = "https://coorsproxyunlimited.herokuapp.com/http://normandotmp4.electrohaxz.tk:9019/?trending=" + localStorage.getItem("trendingCont") + "&type=music";
	} else if (opt == "b") {
		var url = "https://vidpolaris.herokuapp.com/?trending=" + localStorage.getItem("trendingCont") + "&type=music";
	} else if (opt == "c") {
		var url = "https://vidpolaris-europe.herokuapp.com/?trending=" + localStorage.getItem("trendingCont") + "&type=music";
	}
	http.open("GET", url);
	http.send();
	http.onload=(e)=>{
		if (opt == "a" | !opt) {
			var baseUrl = "http://normandotmp4.electrohaxz.tk:9019/?thumb=";
		} else if (opt == "b") {
			var baseUrl = "https://vidpolaris.herokuapp.com/?thumb=";
		} else if (opt == "c") {
			var baseUrl = "https://vidpolaris-europe.herokuapp.com/?thumb=";
		}	
		var jsond = JSON.parse(http.responseText);
		for (var c in jsond) {
			if (c > 11) {
				document.getElementById("musicTrending").style.display = '';
				getTrendingGaming(opt)
				return;
			}
			var link = document.createElement("A");
			link.href = "#w#" + jsond[c].videoId;
			link.id = "ml" + c;
			document.getElementById("musicTrending").appendChild(link);
			var div = document.createElement("DIV");
			div.classList.add("video");
			div.id = "mDiv" + c;
			document.getElementById("ml"+c).appendChild(div);
			var img = document.createElement("IMG");
			img.classList.add("largeThumb");
			img.src = baseUrl + jsond[c].videoId;
			document.getElementById("mDiv"+c).appendChild(img);
			var div2 = document.createElement("DIV");
			div2.classList.add("td");
			div2.id = "mtdDiv"+c;
			document.getElementById("mDiv"+c).appendChild(div2);
			var h3 = document.createElement("H3");
			h3.classList.add("stat");
			h3.innerHTML = jsond[c].title;
			document.getElementById("mtdDiv"+c).appendChild(h3);
			var stat1 = document.createElement("H4");
			stat1.innerHTML = 'by ' + jsond[c].author;
			stat1.classList.add("stat")
			document.getElementById("mtdDiv"+c).appendChild(stat1);
			var stat2 = document.createElement("H4");
			stat2.innerHTML = 'posted ' + jsond[c].publishedText;
			stat2.classList.add("stat");
			document.getElementById("mtdDiv"+c).appendChild(stat2);
		}
	}
}

function getTrendingGaming(opt) {
	const http = new XMLHttpRequest();
	if (opt == "a" | !opt) {
		var url = "https://coorsproxyunlimited.herokuapp.com/http://normandotmp4.electrohaxz.tk:9019/?trending=" + localStorage.getItem("trendingCont") + "&type=gaming";
	} else if (opt == "b") {
		var url = "https://vidpolaris.herokuapp.com/?trending=" + localStorage.getItem("trendingCont") + "&type=gaming";
	} else if (opt == "c") {
		var url = "https://vidpolaris-europe.herokuapp.com/?trending=" + localStorage.getItem("trendingCont") + "&type=gaming";
	}
	http.open("GET", url);
	http.send();
	http.onload=(e)=>{
		if (opt == "a" | !opt) {
			var baseUrl = "http://normandotmp4.electrohaxz.tk:9019/?thumb=";
		} else if (opt == "b") {
			var baseUrl = "https://vidpolaris.herokuapp.com/?thumb=";
		} else if (opt == "c") {
			var baseUrl = "https://vidpolaris-europe.herokuapp.com/?thumb=";
		}	
		var jsond = JSON.parse(http.responseText);
		for (var c in jsond) {
			if (c > 11) {
				document.getElementById("gamingTrending").style.display = '';
				return;
			}
			var link = document.createElement("A");
			link.href = "#w#" + jsond[c].videoId;
			link.id = "gl" + c;
			document.getElementById("gamingTrending").appendChild(link);
			var div = document.createElement("DIV");
			div.classList.add("video");
			div.id = "gDiv" + c;
			document.getElementById("gl"+c).appendChild(div);
			var img = document.createElement("IMG");
			img.classList.add("largeThumb");
			img.src = baseUrl + jsond[c].videoId;
			document.getElementById("gDiv"+c).appendChild(img);
			var div2 = document.createElement("DIV");
			div2.classList.add("td");
			div2.id = "gtdDiv"+c;
			document.getElementById("gDiv"+c).appendChild(div2);
			var h3 = document.createElement("H3");
			h3.classList.add("stat");
			h3.innerHTML = jsond[c].title;
			document.getElementById("gtdDiv"+c).appendChild(h3);
			var stat1 = document.createElement("H4");
			stat1.innerHTML = 'by ' + jsond[c].author;
			stat1.classList.add("stat")
			document.getElementById("gtdDiv"+c).appendChild(stat1);
			var stat2 = document.createElement("H4");
			stat2.innerHTML = 'posted ' + jsond[c].publishedText;
			stat2.classList.add("stat");
			document.getElementById("gtdDiv"+c).appendChild(stat2);
		}
	}
}

function openVideo(opt,ret) {
	setTimeout(function () {
		if (!window.location.href.includes("#w#")) {
			return;
		} else {
			if (!ret) {
				if (!sessionStorage.getItem("currentlyOpening")) {
					document.title = "[loading...] vidpolaris";
					document.getElementById("homePage").style.display = 'none';
					document.getElementById("searchContainer").style.display = 'none';
					document.getElementById("searchPage").style.display = 'none';
					document.getElementById("settingsPage").style.display = 'none';
					document.getElementById("searchTerm").style.display = "none";
					document.getElementById("channelPage").style.display = 'none';
					document.getElementById("loadErr").style.display = 'none';
					document.getElementById("embedContainer").innerHTML = '';
					document.getElementById("embedContainer").style.display = "none";
					document.getElementById("vidAuthor").style.display = 'none';
					document.getElementById("vidViews").style.display = 'none';
					document.getElementById("refreshBtn").style.display = 'none';
					document.getElementById("vidRatings").style.display = 'none';
					document.getElementById("theat_embed").style.display = 'none';
					document.getElementById("player").pause();
					document.getElementById("vidPage").style.display = '';
					document.getElementById("helpOut").style.display = '';
					document.getElementById("qSelector").style.display = '';
					document.getElementById("speedSelector").style.display = '';
					document.getElementById("theat_native").style.display = '';
					document.getElementById("embedPlayer").style.display = '';
					document.getElementById("player").innerHTML = '';
					document.getElementById("vidViewer").style.display = 'none';
					document.getElementById("vidLoader").style.display = '';
					document.getElementById("playerContainer").style.display = '';
					document.getElementById("sharDiv").style.display = 'none';
					document.getElementById("lpSwitch").checked = false;
					document.getElementById("player").removeAttribute("loop");
					sessionStorage.removeItem("tried2");
					sessionStorage.removeItem("ewv");
					sessionStorage.removeItem("ewa");
					sessionStorage.removeItem("ratio");
					sessionStorage.removeItem("total");
					sessionStorage.removeItem("embed");
					sessionStorage.setItem("currentlyOpening", "y");
					document.getElementById("qOptions").innerHTML = "";
					document.getElementById("aqOptions").innerHTML = "";
					if (document.getElementById("ldBtn").innerHTML == "see less") {
						document.getElementById("ldBtn").click();
					}
					var id = getClickedId(window.location.href, '#w#');
					var fullUrl = "https://youtube.com/watch?v=" + id;
					const http = new XMLHttpRequest();
					if (opt == "a" | !opt) {
						var url = "https://coorsproxyunlimited.herokuapp.com/http://normandotmp4.electrohaxz.tk:9019/?info=1&url=" + fullUrl;
					} else if (opt == "b"){
						var url = "https://vidpolaris.herokuapp.com/?info=1&url=" + fullUrl;
					} else if (opt == "c") {
						var url = "https://vidpolaris-europe.herokuapp.com/?info=1&url=" + fullUrl;
					}
					http.open("GET", url);
					http.send();
					http.onload=(e)=>{
						var jsond = JSON.parse(http.responseText);
						if (jsond.err) {
							notPlayable();
							sessionStorage.removeItem("currentlyOpening");
						} else {
							var wUrl = jsond.info.formats[0].url;
							var titl = jsond.info.player_response.videoDetails.title;
							var auth = jsond.info.player_response.videoDetails.author;
							var aLink = "#c#" + jsond.info.author.id;
							document.getElementById("vidAuthor").style.display = "";
							if (!aLink && !aLink == null && !aLink == undefined) {
								// do nothing
							} else {
								document.getElementById("authorL").href = aLink;
							}
							var desc = jsond.info.player_response.videoDetails.shortDescription.replace(/\n/g, "<br>")
							if (jsond.info.published == null) {
								document.getElementById("vidDate").style.display = "none";
							} else {
								var pDate = new Date(jsond.info.published);
								var month = pDate.getMonth() + 1;
								if (month == 1) {
									var m = "January";
								} else if (month == 2) {
									var m = "February";
								} else if (month == 3) {
									var m = "March";
								} else if (month == 4) {
									var m = "April";
								} else if (month == 5) {
									var m = "May";
								} else if (month == 6) {
									var m = "June";
								} else if (month == 7) {
									var m = "July";
								} else if (month == 8) {
									var m = "August";
								} else if (month == 9) {
									var m = "September";
								} else if (month == 10) {
									var m = "October";
								} else if (month == 11) {
									var m = "November";
								} else if (month == 12) {
									var m = "December";
								}
								var day = pDate.getDate();
								var year = pDate.getFullYear();
								document.getElementById("vidDate").style.display = "";
							}
							if (jsond.info.age_restricted == true) {
								showWarning();
							}
							if (!jsond.info.player_response.playabilityStatus.status == "OK") {
								notPlayable();
								sessionStorage.removeItem("currentlyOpening");
							}
							if (!jsond.info.player_response.cards | localStorage.getItem("disableCards") == "y") {
								document.getElementById("cardContainer").innerHTML = "";
							} else {
								document.getElementById("cardContainer").innerHTML = "";
								for (var c in jsond.info.player_response.cards.cardCollectionRenderer.cards) {
									var card = document.createElement("H3");
									card.classList.add("stat");
									card.id = "card"+c;
									document.getElementById("cardContainer").appendChild(card);
									var ico = document.createElement("SPAN");
									ico.classList.add("ico");
									ico.classList.add("material-icons");
									ico.innerHTML = "info";
									document.getElementById("card"+c).appendChild(ico);
									if (jsond.info.player_response.cards.cardCollectionRenderer.cards[c].cardRenderer.content.videoInfoCardContentRenderer) {
										var link = document.createElement("A");
										link.href = "#w#" + jsond.info.player_response.cards.cardCollectionRenderer.cards[c].cardRenderer.content.videoInfoCardContentRenderer.action.watchEndpoint.videoId;
										link.id = "cardL" + c;
										link.classList.add("channelLink");
										document.getElementById("card"+c).appendChild(link);
										if (jsond.info.player_response.cards.cardCollectionRenderer.cards[c].cardRenderer.content.videoInfoCardContentRenderer.customMessage) {
											var txt = document.createElement("SPAN");
											txt.innerHTML = " " + jsond.info.player_response.cards.cardCollectionRenderer.cards[c].cardRenderer.content.videoInfoCardContentRenderer.customMessage.simpleText || "[No message]";
											document.getElementById("cardL"+c).appendChild(txt);
										} else {
											var txt = document.createElement("SPAN");
											txt.innerHTML = " " + jsond.info.player_response.cards.cardCollectionRenderer.cards[c].cardRenderer.content.videoInfoCardContentRenderer.videoTitle.simpleText || "[No message]";
											document.getElementById("cardL"+c).appendChild(txt);
										}
									} else if (jsond.info.player_response.cards.cardCollectionRenderer.cards[c].cardRenderer.content.playlistInfoCardContentRenderer) {
										var link = document.createElement("A");
										link.href = "https://youtube.com/playlist?list=" + jsond.info.player_response.cards.cardCollectionRenderer.cards[c].cardRenderer.content.playlistInfoCardContentRenderer.action.watchEndpoint.playlistId;
										link.id = "cardL" + c;
										link.classList.add("channelLink");
										document.getElementById("card"+c).appendChild(link);
										if (!jsond.info.player_response.cards.cardCollectionRenderer.cards[c].cardRenderer.content.playlistInfoCardContentRenderer.customMessage) {
											var txt = document.createElement("SPAN");
											txt.innerHTML = " " + jsond.info.player_response.cards.cardCollectionRenderer.cards[c].cardRenderer.content.playlistInfoCardContentRenderer.playlistTitle.simpleText || "[No message]";
											document.getElementById("cardL"+c).appendChild(txt);
										} else {
											var txt = document.createElement("SPAN");
											txt.innerHTML = " " + jsond.info.player_response.cards.cardCollectionRenderer.cards[c].cardRenderer.content.playlistInfoCardContentRenderer.customMessage.simpleText || "[No message]";
											document.getElementById("cardL"+c).appendChild(txt);
										}
									} else if (jsond.info.player_response.cards.cardCollectionRenderer.cards[c].cardRenderer.content.collaboratorInfoCardContentRenderer) {
										var link = document.createElement("A");
										link.href = "#c#" + jsond.info.player_response.cards.cardCollectionRenderer.cards[c].cardRenderer.content.collaboratorInfoCardContentRenderer.endpoint.browseEndpoint.browseId;
										link.id = "cardL" + c;
										link.classList.add("channelLink");
										document.getElementById("card"+c).appendChild(link);
										if (jsond.info.player_response.cards.cardCollectionRenderer.cards[c].cardRenderer.teaser.simpleCardTeaserRenderer.message) {
											var txt = document.createElement("SPAN");
											txt.innerHTML = " " + jsond.info.player_response.cards.cardCollectionRenderer.cards[c].cardRenderer.teaser.simpleCardTeaserRenderer.message.simpleText || "[No message]";
											document.getElementById("cardL"+c).appendChild(txt);
										} else {
											var txt = document.createElement("SPAN");
											txt.innerHTML = " [No message]";
											document.getElementById("cardL"+c).appendChild(txt);
										}
									} else if (jsond.info.player_response.cards.cardCollectionRenderer.cards[c].cardRenderer.content.pollRenderer) {
										var q = document.createElement("H4");
										q.classList.add("stat");
										q.innerHTML = jsond.info.player_response.cards.cardCollectionRenderer.cards[c].cardRenderer.content.pollRenderer.question.simpleText;
										q.style = "margin-left:25px;margin-top:-23px;";
										document.getElementById("card"+c).appendChild(q);
										var div = document.createElement("DIV");
										div.classList.add("sResultVideo");
										div.id = "cardPoll"+c;
										document.getElementById("card"+c).appendChild(div)
										for (var cc in jsond.info.player_response.cards.cardCollectionRenderer.cards[c].cardRenderer.content.pollRenderer.choices) {
											var choice = document.createElement("P");
											choice.classList.add("stat");
											choice.innerHTML = jsond.info.player_response.cards.cardCollectionRenderer.cards[c].cardRenderer.content.pollRenderer.choices[cc].text.simpleText + " [" + parseFloat(jsond.info.player_response.cards.cardCollectionRenderer.cards[c].cardRenderer.content.pollRenderer.choices[cc].numVotes).toLocaleString() + " votes]";
											document.getElementById("cardPoll"+c).appendChild(choice);
										}
									} else if (jsond.info.player_response.cards.cardCollectionRenderer.cards[c].cardRenderer.content.simpleCardContentRenderer) {
										var link = document.createElement("A");
										link.href = decodeURIComponent(getClickedId(jsond.info.player_response.cards.cardCollectionRenderer.cards[c].cardRenderer.content.simpleCardContentRenderer.command.urlEndpoint.url, "&q="))
										link.id = "cardL" + c;
										link.classList.add("channelLink");
										document.getElementById("card"+c).appendChild(link);
										var txt = document.createElement("SPAN");
									txt.innerHTML = jsond.info.player_response.cards.cardCollectionRenderer.cards[c].cardRenderer.content.simpleCardContentRenderer.title.simpleText + " [" + jsond.info.player_response.cards.cardCollectionRenderer.cards[c].cardRenderer.content.simpleCardContentRenderer.displayDomain.simpleText + "]";
										document.getElementById("cardL"+c).appendChild(txt);
									}
								}
							}
							var cat = jsond.info.media.category;
							if (cat == undefined) {
								document.getElementById("catCont").style.display = "none";
							} else {
								document.getElementById("catCont").style.display = "";
								document.getElementById("cat").innerHTML = cat;
							}
							if (!jsond.info.related_videos[0]) {
								document.getElementById("relatedVideos").style.display = 'none';
								document.getElementById("autoPlayBlock").style.display = 'none';
							} else {
								if (localStorage.getItem("sLoc") == "a") {
									var baseUrl = "http://normandotmp4.electrohaxz.tk:9019/?thumb=";
								} else if (localStorage.getItem("sLoc") == "b") {
									var baseUrl = "https://vidpolaris.herokuapp.com/?thumb=";
								} else if (localStorage.getItem("sLoc") == "c") {
									var baseUrl = "https://vidpolaris-europe.herokuapp.com/?thumb=";
								}
								document.getElementById("relatedVideos").style.display = '';
								document.getElementById("autoPlayBlock").style.display = '';
								var r1L = "#w#" + jsond.info.related_videos[0].id;
								var r1T = jsond.info.related_videos[0].title;
								var r1A = baseUrl + jsond.info.related_videos[0].id;
								var r1Au = jsond.info.related_videos[0].author;
								var r1V = jsond.info.related_videos[0].short_view_count_text;
								document.getElementById("rv1").href = r1L;
								document.getElementById("rTit1").innerHTML = r1T;
								document.getElementById("rTh1").src = r1A;
								document.getElementById("rAut1").innerHTML = r1Au;
								document.getElementById("rVie1").innerHTML = r1V;
								if (jsond.info.related_videos[1]) {
									var r2L = "#w#" + jsond.info.related_videos[1].id;
									var r2T = jsond.info.related_videos[1].title;
									var r2A = baseUrl + jsond.info.related_videos[1].id;
									var r2Au = jsond.info.related_videos[1].author;
									var r2V = jsond.info.related_videos[1].short_view_count_text;
									document.getElementById("rv2").href = r2L;
									document.getElementById("rTit2").innerHTML = r2T;
									document.getElementById("rTh2").src = r2A;
									document.getElementById("rAut2").innerHTML = r2Au;
									document.getElementById("rVie2").innerHTML = r2V;
									if (jsond.info.related_videos[2]) {
										var r3L = "#w#" + jsond.info.related_videos[2].id;
										var r3T = jsond.info.related_videos[2].title;
										var r3A = baseUrl + jsond.info.related_videos[2].id;
										var r3Au = jsond.info.related_videos[2].author;
										var r3V = jsond.info.related_videos[2].short_view_count_text;
										document.getElementById("rv3").href = r3L;
										document.getElementById("rTit3").innerHTML = r3T;
										document.getElementById("rTh3").src = r3A;
										document.getElementById("rAut3").innerHTML = r3Au;
										document.getElementById("rVie3").innerHTML = r3V;
										if (jsond.info.related_videos[3]) {
											var r4L = "#w#" + jsond.info.related_videos[3].id;
											var r4T = jsond.info.related_videos[3].title;
											var r4A = baseUrl + jsond.info.related_videos[3].id;
											var r4Au = jsond.info.related_videos[3].author;
											var r4V = jsond.info.related_videos[3].short_view_count_text;
											document.getElementById("rv4").href = r4L;
											document.getElementById("rTit4").innerHTML = r4T;
											document.getElementById("rTh4").src = r4A;
											document.getElementById("rAut4").innerHTML = r4Au;
											document.getElementById("rVie4").innerHTML = r4V;
											if (jsond.info.related_videos[4]) {
												var r5L = "#w#" + jsond.info.related_videos[4].id;
												var r5T = jsond.info.related_videos[4].title;
												var r5A = baseUrl + jsond.info.related_videos[4].id;
												var r5Au = jsond.info.related_videos[4].author;
												var r5V = jsond.info.related_videos[4].short_view_count_text;
												document.getElementById("rv5").href = r5L;
												document.getElementById("rTit5").innerHTML = r5T;
												document.getElementById("rTh5").src = r5A;
												document.getElementById("rAut5").innerHTML = r5Au;
												document.getElementById("rVie5").innerHTML = r5V;
												if (jsond.info.related_videos[5]) {
													var r6L = "#w#" + jsond.info.related_videos[5].id;
													var r6T = jsond.info.related_videos[5].title;
													var r6A = baseUrl + jsond.info.related_videos[5].id;
													var r6Au = jsond.info.related_videos[5].author;
													var r6V = jsond.info.related_videos[5].short_view_count_text;
													document.getElementById("rv6").href = r6L;
													document.getElementById("rTit6").innerHTML = r6T;
													document.getElementById("rTh6").src = r6A;
													document.getElementById("rAut6").innerHTML = r6Au;
													document.getElementById("rVie6").innerHTML = r6V;
													if  (jsond.info.related_videos[6]) {
														var r7L = "#w#" + jsond.info.related_videos[6].id;
														var r7T = jsond.info.related_videos[6].title;
														var r7A = baseUrl + jsond.info.related_videos[6].id;
														var r7Au = jsond.info.related_videos[6].author;
														var r7V = jsond.info.related_videos[6].short_view_count_text;
														document.getElementById("rv7").href = r7L;
														document.getElementById("rTit7").innerHTML = r7T;
														document.getElementById("rTh7").src = r7A;
														document.getElementById("rAut7").innerHTML = r7Au;
														document.getElementById("rVie7").innerHTML = r7V;
														if (jsond.info.related_videos[7]) {
															var r8L = "#w#" + jsond.info.related_videos[7].id;
															var r8T = jsond.info.related_videos[7].title;
															var r8A = baseUrl + jsond.info.related_videos[7].id;
															var r8Au = jsond.info.related_videos[7].author;
															var r8V = jsond.info.related_videos[7].short_view_count_text;
															document.getElementById("rv8").href = r8L;
															document.getElementById("rTit8").innerHTML = r8T;
															document.getElementById("rTh8").src = r8A;
															document.getElementById("rAut8").innerHTML = r8Au;
															document.getElementById("rVie8").innerHTML = r8V;
															if (jsond.info.related_videos[8]) {
																var r9T = jsond.info.related_videos[8].title;
																var r9A = baseUrl + jsond.info.related_videos[8].id;
																var r9Au = jsond.info.related_videos[8].author;
																var r9V = jsond.info.related_videos[8].short_view_count_text;
																var r9L = "#w#" + jsond.info.related_videos[8].id;
																document.getElementById("rTit9").innerHTML = r9T;
																document.getElementById("rTh9").src = r9A;
																document.getElementById("rAut9").innerHTML = r9Au;
																document.getElementById("rVie9").innerHTML = r9V;
																document.getElementById("rv9").href = r9L;
															} else {
																document.getElementById("rv9").style.display = 'none';
															}
														} else {
															document.getElementById("rv8").style.display = 'none';
															document.getElementById("rv9").style.display = 'none';
														}
													} else {
														document.getElementById("rv7").style.display = 'none';
														document.getElementById("rv8").style.display = 'none';
														document.getElementById("rv9").style.display = 'none';
													}
												} else {
													document.getElementById("rv6").style.display = 'none';
													document.getElementById("rv7").style.display = 'none';
													document.getElementById("rv8").style.display = 'none';
													document.getElementById("rv9").style.display = 'none';
												}
											} else {
												document.getElementById("rv5").style.display = 'none';
												document.getElementById("rv6").style.display = 'none';
												document.getElementById("rv7").style.display = 'none';
												document.getElementById("rv8").style.display = 'none';
												document.getElementById("rv9").style.display = 'none';
											}
										} else {
											document.getElementById("rv4").style.display = 'none'
											document.getElementById("rv5").style.display = 'none';
											document.getElementById("rv6").style.display = 'none';
											document.getElementById("rv7").style.display = 'none';
											document.getElementById("rv8").style.display = 'none';
											document.getElementById("rv9").style.display = 'none';
										}
									} else {
										document.getElementById("rv3").style.display = 'none';
										document.getElementById("rv4").style.display = 'none';
										document.getElementById("rv5").style.display = 'none';
										document.getElementById("rv6").style.display = 'none';
										document.getElementById("rv7").style.display = 'none';
										document.getElementById("rv8").style.display = 'none';
										document.getElementById("rv9").style.display = 'none';
									}
								} else {
									document.getElementById("rv2").style.display = 'none';
									document.getElementById("rv3").style.display = 'none';
									document.getElementById("rv4").style.display = 'none';
									document.getElementById("rv5").style.display = 'none';
									document.getElementById("rv6").style.display = 'none';
									document.getElementById("rv7").style.display = 'none';
									document.getElementById("rv8").style.display = 'none';
									document.getElementById("rv9").style.display = 'none';
								}
							}
							if (localStorage.getItem("smart") == "y") {
								if (opt == "a" | !opt) {
									var url = "https://coorsproxyunlimited.herokuapp.com/http://normandotmp4.electrohaxz.tk:9019/?smart=1&url=" + fullUrl;
								} else if (opt == "b"){
									var url = "https://vidpolaris.herokuapp.com/?smart=1&url=" + fullUrl;
								} else if (opt == "c") {
									var url = "https://vidpolaris-europe.herokuapp.com/?smart=1&url=" + fullUrl;
								}
								http.open("GET", url);
								http.send();
								http.onload=(e)=>{
									document.getElementById("qSelector").style.display = '';
									var jsond = JSON.parse(http.responseText);
									if (!jsond.audio) {
										openVideo(opt);
										return;
									}
									if (jsond.datainfo) {
										openVideo(opt);
										return;
									}
									var audioUrl = jsond.audio[0].url;
									document.getElementById("audioPlayer").src = audioUrl;
									if (jsond.video[0].isHls == true | jsond.video[0].isLive == true | jsond.video[0].isDashMPD == true) {
										var videoUrl = jsond.video[1].url;
										document.getElementById("itag").innerHTML = jsond.video[1].itag;
									} else {
										var videoUrl = jsond.video[0].url;
										document.getElementById("itag").innerHTML = jsond.video[0].itag;
									}
									for (var c in jsond.video) {
										if (c == 0) {
											var option = document.createElement("OPTION");
											option.value = jsond.video[c].itag;
											option.innerHTML = jsond.video[c].qualityLabel;
											document.getElementById("qOptions").appendChild(option);
										} else {
											if (jsond.video[c-1].qualityLabel == jsond.video[c].qualityLabel) {
												// do nothing
											} else {
												var option = document.createElement("OPTION");
												option.value = jsond.video[c].itag;
												option.innerHTML = jsond.video[c].qualityLabel;
												document.getElementById("qOptions").appendChild(option);
											}
										}
									}
									for (var c in jsond.audio) {
										if (c == 0) {
											var option = document.createElement("OPTION");
											option.value = jsond.audio[c].itag;
											option.innerHTML = jsond.audio[c].audioBitrate + "kbps";
											document.getElementById("aqOptions").appendChild(option);
										} else {
											if (jsond.audio[c-1].audioBitrate == jsond.audio[c].audioBitrate) {
												// do nothing
											} else {
												var option = document.createElement("OPTION");
												option.value = jsond.audio[c].itag;
												option.innerHTML = jsond.audio[c].audioBitrate + "kbps";
												document.getElementById("aqOptions").appendChild(option);
											}
										}
									}
									document.getElementById("aqOptions").style.display = "";
									document.getElementById("player").src = videoUrl;
									document.getElementById("qOptions").value = document.getElementById("itag").innerHTML;
									document.getElementById("vidLoader").style.display = 'none';
									if (opt == "a" | !opt) {
										var tUrl = "http://normandotmp4.electrohaxz.tk:9019/?thumb=" + getClickedId(window.location.href, "#w#");
									} else if (opt == "b"){
										var tUrl = "https://vidpolaris.herokuapp.com/?thumb=" + getClickedId(window.location.href, "#w#");
									} else if (opt == "c") {
										var tUrl = "https://vidpolaris-europe.herokuapp.com/?thumb=" + getClickedId(window.location.href, "#w#");
									}
									document.getElementById("player").poster = tUrl;
									document.getElementById("title").innerHTML = titl;
									document.title = titl +  " | vidpolaris";
									if (desc.length > 300) {
										var shortDesc = desc.substring(0,300) + "..."
										document.getElementById("desc").innerHTML = shortDesc;
										document.getElementById("longDesc").innerHTML = desc;
										document.getElementById("ldBtn").style.display = '';
										document.getElementById("ldDiv").style.display = 'none';
									} else {
										document.getElementById("desc").innerHTML = desc;
										document.getElementById("ldBtn").style.display = 'none';
										document.getElementById("ldDiv").style.display = 'none';
									}
									document.getElementById("author").innerHTML = auth;
									document.getElementById("searchContainer").style.display = '';
									document.getElementById("pubM").innerHTML = m;
									document.getElementById("pubY").innerHTML = year;
									document.getElementById("pubD").innerHTML = day;
									sessionStorage.removeItem("currentlyOpening");
									if (opt == "a" | !opt) {
										var url = "https://coorsproxyunlimited.herokuapp.com/http://normandotmp4.electrohaxz.tk:9019/?md=1&url=" + fullUrl;
									} else if (opt == "b"){
										var url = "https://vidpolaris.herokuapp.com/?md=1&url=" + fullUrl;
									} else if (opt == "c") {
										var url = "https://vidpolaris-europe.herokuapp.com/?md=1&url=" + fullUrl;
									}
									http.open("GET", url);
									http.send();
									http.timeout = 7000;
									http.ontimeout = () => {
										getMeta(opt);
									}
									http.onload=(e)=>{
										var jsond = JSON.parse(http.responseText);
										if (!jsond.meta.views) {
											getMeta(opt);
										}
										var view = jsond.meta.views.toLocaleString();
										if (!jsond.meta.dislikeCount) {
											var dlik = 0;
										} else {
											var dlik = jsond.meta.dislikeCount.toLocaleString();
										}
										if (!jsond.meta.likeCount) {
											var like = 0;
										} else {
											var like = jsond.meta.likeCount.toLocaleString();
										}
										var totl = jsond.meta.dislikeCount + jsond.meta.likeCount;
										sessionStorage.setItem("total", totl.toLocaleString());
										if (!totl == 0){
											var untRatio = jsond.meta.likeCount / totl;
											var percent = 100 * untRatio;
											var ratio = percent.toPrecision(4);
											sessionStorage.setItem("ratio", ratio);
										} else {
											var ratio = 0;
											sessionStorage.setItem("ratio", ratio);
										}
										if (jsond.meta.unlisted == false) {
											document.getElementById("ulIco").style.display = "none";
											document.getElementById("title").style = "margin:0;"
										} else {
											document.getElementById("ulIco").style.display = "";
											document.getElementById("title").style = "margin-top:-27px;"
										}
										if (jsond.meta.subText) {
											document.getElementById("subText").innerHTML = "[" + jsond.meta.subText + " subscribers]";
										} else {
											document.getElementById("subText").innerHTML = "";
										}
										document.getElementById("viewNum").innerHTML = view;
										document.getElementById("likeNum").innerHTML = like;
										document.getElementById("dlikNum").innerHTML = dlik;
										document.getElementById("ldRatio").innerHTML = ratio;
										document.getElementById("vidViews").style.display = "";
										document.getElementById("vidRatings").style.display = "";
										document.getElementById("subText").style.display = "";
									}
									document.getElementById("vidViewer").style.display = '';
									sync();
									document.getElementById("player").load();
									document.getElementById("audioPlayer").load();
									if (localStorage.getItem("loadComm") == "y") {
										getComments("none", opt);
										sessionStorage.removeItem("currentlyOpening");
									} else {
										document.getElementById("loadC").style.display = '';
										document.getElementById("loadedC").style.display = 'none';
										document.getElementById("loadedComments").style.display = 'none';
										document.getElementById("loadinC").style.display = 'none';
										document.getElementById("errorC").style.display = 'none';
										sessionStorage.removeItem("currentlyOpening");
									}
									setSpeed();
									getSubs(opt);
									document.getElementById("player").play();
									if (sessionStorage.getItem("id") == id) {
										document.getElementById("player").currentTime = sessionStorage.getItem("time");
										document.getElementById("audioPlayer").currentTime = sessionStorage.getItem("time");
									} else {
										sessionStorage.setItem("id", id);
										sessionStorage.setItem("time", document.getElementById("player").currentTime);
									}
									return;
								}
								return;
							} else {
								document.getElementById("vidViewer").style.display = '';
								document.getElementById("vidLoader").style.display = 'none';
								document.getElementById("player").src = wUrl;
								for (var c in jsond.info.formats) {
									if (c == 0) {
										var option = document.createElement("OPTION");
										option.value = jsond.info.formats[c].itag;
										option.innerHTML = jsond.info.formats[c].qualityLabel;
										document.getElementById("qOptions").appendChild(option);
									} else {
										//credit for *more* duplication: https://stackoverflow.com/questions/8069315/create-array-of-all-integers-between-two-numbers-inclusive-in-javascript-jquer
										var result = range(0, c);
										for (var cc in result) {
											if (!jsond.info.formats[c].qualityLabel == jsond.info.formats[cc].qualityLabel) {
												// do nothing
											} else {
												if (jsond.info.formats[c].audioBitrate && !jsond.info.formats[c].audioBitrate == null && jsond.info.formats[c].qualityLabel && !jsond.info.formats[c].qualityLabel == null) {
													var option = document.createElement("OPTION");
													option.value = jsond.info.formats[c].itag;
													option.innerHTML = jsond.info.formats[c].qualityLabel;
													document.getElementById("qOptions").appendChild(option);
												}
											}
										}
									}	
								}
								document.getElementById("aqOptions").style.display = "none";
								if (opt == "a" | !opt) {
									var tUrl = "http://normandotmp4.electrohaxz.tk:9019/?thumb=" + getClickedId(window.location.href, "#w#");
								} else if (opt == "b"){
									var tUrl = "https://vidpolaris.herokuapp.com/?thumb=" + getClickedId(window.location.href, "#w#");
								} else if (opt == "c") {
									var tUrl = "https://vidpolaris-europe.herokuapp.com/?thumb=" + getClickedId(window.location.href, "#w#");
								}
								document.getElementById("player").poster = tUrl;
								document.getElementById("title").innerHTML = titl;
								document.title = titl +  " | vidpolaris";
								if (desc.length > 300) {
									var shortDesc = desc.substring(0,300) + "..."
									document.getElementById("desc").innerHTML = shortDesc;
									document.getElementById("longDesc").innerHTML = desc;
									document.getElementById("ldBtn").style.display = '';
									document.getElementById("ldDiv").style.display = 'none';
								} else {
									document.getElementById("desc").innerHTML = desc;
									document.getElementById("ldBtn").style.display = 'none';
									document.getElementById("ldDiv").style.display = 'none';
								}
								document.getElementById("player").play();
								sessionStorage.removeItem("currentlyOpening");
								document.getElementById("author").innerHTML = auth;
								document.getElementById("searchContainer").style.display = '';
								document.getElementById("pubM").innerHTML = m;
								document.getElementById("pubY").innerHTML = year;
								document.getElementById("pubD").innerHTML = day;
								if (!opt) {
									var url = "https://coorsproxyunlimited.herokuapp.com/http://normandotmp4.electrohaxz.tk:9019/?md=1&url=" + fullUrl;
								} else {
									var url = "https://vidpolaris.herokuapp.com/?md=1&url=" + fullUrl;
								}
								if (localStorage.getItem("loadComm") == "y") {
									getComments("none", opt);
								} else {
									document.getElementById("loadC").style.display = '';
									document.getElementById("loadedC").style.display = 'none';
									document.getElementById("loadedComments").style.display = 'none';
									document.getElementById("loadinC").style.display = 'none';
									document.getElementById("errorC").style.display = 'none';
								}
								setSpeed();
								getSubs(opt);
								http.open("GET", url);
								http.send();
								http.timeout = 7000;
								http.ontimeout = () => {
									getMeta(opt);
								}
								http.onload=(e)=>{
									var jsond = JSON.parse(http.responseText);
									if (!jsond.meta) {
										getMeta(opt);
									}
									var view = jsond.meta.views.toLocaleString();
									if (!jsond.meta.dislikeCount) {
										var dlik = 0;
									} else {
										var dlik = jsond.meta.dislikeCount.toLocaleString();
									}
									if (!jsond.meta.likeCount) {
										var like = 0;
									} else {
										var like = jsond.meta.likeCount.toLocaleString();
									}
									var totl = jsond.meta.dislikeCount + jsond.meta.likeCount;
									sessionStorage.setItem("total", totl.toLocaleString());
									if (!totl == 0){
										var untRatio = jsond.meta.likeCount / totl;
										var percent = 100 * untRatio;
										var ratio = percent.toPrecision(4);
										sessionStorage.setItem("ratio", ratio);
									} else {
										var ratio = 0;
										sessionStorage.setItem("ratio", ratio);
									}
									if (jsond.meta.unlisted == false) {
										document.getElementById("ulIco").style.display = "none";
										document.getElementById("title").style = "margin:0;"
									} else {
										document.getElementById("ulIco").style.display = "";
										document.getElementById("title").style = "margin-top:-27px;margin-left:25px;"
									}
									if (jsond.meta.subText) {
										document.getElementById("subText").innerHTML = "[" + jsond.meta.subText + " subscribers]";
									} else {
										document.getElementById("subText").innerHTML = "";
									}
									document.getElementById("viewNum").innerHTML = view;
									document.getElementById("likeNum").innerHTML = like;
									document.getElementById("dlikNum").innerHTML = dlik;
									document.getElementById("ldRatio").innerHTML = ratio;
									document.getElementById("vidViews").style.display = "";
									document.getElementById("vidRatings").style.display = "";
									document.getElementById("subText").style.display = "";
									if (!document.getElementById("vidViewer").style.display == 'none') {
										document.getElementById("player").play()
									}
								}
							}
						}
					}
					http.timeout = 7000
					http.ontimeout = () => {
						if (opt == "a" | !opt) {
							openVideo("b");
						} else if (opt == "b"){
							openVideo("c");
						} else if (opt == "c") {
							openVideo("a");
						}
					}
					http.onerror = () => {
						if (opt == "a" | !opt) {
							openVideo("b");
						} else if (opt == "b"){
							openVideo("c");
						} else if (opt == "c") {
							openVideo("a");
						}
					}
				}
			} else {
				if (!sessionStorage.getItem("tried2")) {
					document.getElementById("loadErr").style.display = "";
					document.getElementById("playerContainer").style.display = "none";
				} else {
					return;
				}
				if (localStorage.getItem("smart") == "y") {
					const http = new XMLHttpRequest();
					var fullUrl = "https://www.youtube.com/watch?v=" + getClickedId(window.location.href, "#w#");
					if (!opt | opt == "a") {
						var url = "https://coorsproxyunlimited.herokuapp.com/http://normandotmp4.electrohaxz.tk:9019/?url=" + fullUrl;
					} else if (opt == "b") {
						var url = "https://vidpolaris.herokuapp.com/?url=" + fullUrl;
					} else  if (opt == "c") {
						var url = "https://vidpolaris-europe.herokuapp.com/?url=" + fullUrl;
					}
					http.open("GET", url);
					http.send();
					http.timeout = 7000;
					http.ontimeout = () => {
						if (opt == "a" | !opt) {
							openVideo("b");
						} else if (opt == "b"){
							openVideo("c");
						} else if (opt == "c") {
							openVideo("a");
						}
					}
					http.onload=(e)=>{
						var jsond = JSON.parse(http.responseText);
						document.getElementById("playerContainer").style.display = "";
						document.getElementById("player").src = jsond.datainfo[0].url;
						document.getElementById("player").play();
						document.getElementById("qSelector").style.display = "none";
						document.getElementById("loadErr").style.display = "none";
						sessionStorage.setItem("tried2", "y");
					}
					http.timeout = 7000;
					http.ontimeout = () => {
						if (opt == "a" | !opt) {
							openVideo("b");
						} else if (opt == "b"){
							openVideo("c");
						} else if (opt == "c") {
							openVideo("a");
						}
					}
					http.onerror = function (error) {
						if (opt == "a" | !opt) {
							openVideo("b");
						} else if (opt == "b"){
							openVideo("c");
						} else if (opt == "c") {
							openVideo("a");
						}
					}
				} else {
					const http = new XMLHttpRequest();
					var fullUrl = "https://www.youtube.com/watch?v=" + getClickedId(window.location.href, "#w#");
					if (!opt | opt == "a") {
						var url = "https://coorsproxyunlimited.herokuapp.com/http://normandotmp4.electrohaxz.tk:9019/?smart=1&url=" + fullUrl;
					} else if (opt == "b") {
						var url = "https://vidpolaris.herokuapp.com/?smart=1&url=" + fullUrl;
					} else  if (opt == "c") {
						var url = "https://vidpolaris-europe.herokuapp.com/?smart=1&url=" + fullUrl;
					}
					http.open("GET", url);
					http.send();
					http.timeout = 7000;
					http.ontimeout = () => {
						if (opt == "a" | !opt) {
							openVideo("b");
						} else if (opt == "b"){
							openVideo("c");
						} else if (opt == "c") {
							openVideo("a");
						}
					}
					http.onload=(e)=>{
						var jsond = JSON.parse(http.responseText);
						if (!jsond.audio) {
							openVideo(opt);
							return;
						}
						var audioUrl = jsond.audio[0].url;
						document.getElementById("audioPlayer").src = audioUrl;
						var videoUrl = jsond.video[0].url;
						document.getElementById("itag").innerHTML = jsond.video[0].itag;
						var length = jsond.video.length;
						if (length > 5) {
							var opt1 = document.createElement("option")
							opt1.value = jsond.video[0].itag;
							opt1.innerHTML = jsond.video[0].qualityLabel;
							document.getElementById("qOptions").appendChild(opt1);
							var opt2 = document.createElement("option");
							if (!jsond.video[1].qualityLabel == jsond.video[0].qualityLabel ) {
								opt2.value = jsond.video[1].itag;
								opt2.innerHTML = jsond.video[1].qualityLabel;
							} else {
								if (!jsond.video[2].qualityLabel == jsond.video[0].qualityLabel) {
									opt2.value = jsond.video[2].itag;
									opt2.innerHTML = jsond.video[2].qualityLabel;
								} else {
									opt2.value = jsond.video[3].itag;
									opt2.innerHTML = jsond.video[3].qualityLabel;
								}
							}
							document.getElementById("qOptions").appendChild(opt2);
							var opt3 = document.createElement("option");
							if (!jsond.video[2].qualityLabel == jsond.video[1].qualityLabel && !jsond.video[2].qualityLabel == jsond.video[0].qualityLabel) {
								opt3.value = jsond.video[2].itag;
								opt3.innerHTML = jsond.video[2].qualityLabel;
							} else {
								if (!jsond.video[3].qualityLabel == jsond.video[1].qualityLabel && !jsond.video[3].qualityLabel == jsond.video[0].qualityLabel) {
									opt3.value = jsond.video[3].itag;
									opt3.innerHTML = jsond.video[3].qualityLabel;
								} else {
									opt3.value = jsond.video[4].itag;
									opt3.innerHTML = jsond.video[4].qualityLabel;
								}
							}
							document.getElementById("qOptions").appendChild(opt3);
							var opt4 = document.createElement("option");
							if (!jsond.video[3].qualityLabel == jsond.video[2].qualityLabel && !jsond.video[3].qualityLabel == jsond.video[1].qualityLabel && !jsond.video[3].qualityLabel == jsond.video[0].qualityLabel) {
								opt4.value = jsond.video[3].itag;
								opt4.innerHTML = jsond.video[3].qualityLabel;
							} else {
								if (!jsond.video[4].qualityLabel == jsond.video[3].qualityLabel && !jsond.video[4].qualityLabel == jsond.video[2].qualityLabel && !jsond.video[4].qualityLabel == jsond.video[1].qualityLabel && !jsond.video[4].qualityLabel == jsond.video[0].qualityLabel) {
									opt4.value = jsond.video[4].itag;
									opt4.innerHTML = jsond.video[4].qualityLabel;
								} else {
									opt4.value = jsond.video[5].itag;
									opt4.innerHTML = jsond.video[5].qualityLabel;
								}
							}
							document.getElementById("qOptions").appendChild(opt4);
							var opt5 = document.createElement("option");
							if (!jsond.video[4].qualityLabel == jsond.video[3].qualityLabel && !jsond.video[4].qualityLabel == jsond.video[2].qualityLabel && !jsond.video[4].qualityLabel == jsond.video[1].qualityLabel && !jsond.video[4].qualityLabel == jsond.video[0].qualityLabel) {
								opt5.value = jsond.video[4].itag;
								opt5.innerHTML = jsond.video[4].qualityLabel;
								document.getElementById("qOptions").appendChild(opt5);
							} else {
								if (!jsond.video[5].qualityLabel == jsond.video[4].qualityLabel && !jsond.video[5].qualityLabel == jsond.video[3].qualityLabel && !jsond.video[5].qualityLabel == jsond.video[2].qualityLabel && !jsond.video[5].qualityLabel == jsond.video[1].qualityLabel && !jsond.video[5].qualityLabel == jsond.video[0].qualityLabel) {
									opt5.value = jsond.video[5].itag;
									opt5.innerHTML = jsond.video[5].qualityLabel;
								} else {
									if (!jsond.video[6] == undefined) {
										opt5.value = jsond.video[6].itag;
										opt5.innerHTML = jsond.video[6].qualityLabel;
									}
								}
							}
						} else if (length == 4) {
							var opt1 = document.createElement("option")
							opt1.value = jsond.video[0].itag;
							opt1.innerHTML = jsond.video[0].qualityLabel;
							document.getElementById("qOptions").appendChild(opt1);
							var opt2 = document.createElement("option");
							opt2.value = jsond.video[1].itag;
							opt2.innerHTML = jsond.video[1].qualityLabel;
							document.getElementById("qOptions").appendChild(opt2);
							var opt3 = document.createElement("option");
							opt3.value = jsond.video[2].itag;
							opt3.innerHTML = jsond.video[2].qualityLabel;
							document.getElementById("qOptions").appendChild(opt3);
							var opt4 = document.createElement("option");
							opt4.value = jsond.video[3].itag;
							opt4.innerHTML = jsond.video[3].qualityLabel;
							document.getElementById("qOptions").appendChild(opt4);
						} else if (length == 3) {
							var opt1 = document.createElement("option")
							opt1.value = jsond.video[0].itag;
							opt1.innerHTML = jsond.video[0].qualityLabel;
							document.getElementById("qOptions").appendChild(opt1);
							var opt2 = document.createElement("option");
							opt2.value = jsond.video[1].itag;
							opt2.innerHTML = jsond.video[1].qualityLabel;
							document.getElementById("qOptions").appendChild(opt2);
							var opt3 = document.createElement("option");
							opt3.value = jsond.video[2].itag;
							opt3.innerHTML = jsond.video[2].qualityLabel;
						} else if (length == 2) {
							var opt1 = document.createElement("option")
							opt1.value = jsond.video[0].itag;
							opt1.innerHTML = jsond.video[0].qualityLabel;
							document.getElementById("qOptions").appendChild(opt1);
							var opt2 = document.createElement("option");
							opt2.value = jsond.video[1].itag;
							opt2.innerHTML = jsond.video[1].qualityLabel;
							document.getElementById("qOptions").appendChild(opt2);
						} else {
							document.getElementById("qOptions").disabled = true;
							var opt1 = document.createElement("option")
							opt1.value = jsond.video[0].itag;
							opt1.innerHTML = jsond.video[0].qualityLabel;
							document.getElementById("qOptions").appendChild(opt1);
						}
						document.getElementById("player").src = videoUrl;
						document.getElementById("player").play();
						document.getElementById("playerContainer").style.display = "";
						document.getElementById("qOptions").value = document.getElementById("itag").innerHTML;
						document.getElementById("qOptions").style.display = "";
						document.getElementById("loadErr").style.display = "none";
						sessionStorage.setItem("tried2", "y");
					}
				}
			}
		}
	}, 10)
}

function getClickedId(parentString, substring) {
    return parentString.substring(parentString.indexOf(substring) + substring.length)
}

function home() {
	document.getElementById("player").pause();
	document.getElementById("vidViewer").style.display = 'none';
	document.getElementById("vidPage").style.display = 'none';
	document.getElementById("searchPage").style.display = 'none';
	document.getElementById("channelPage").style.display = 'none';
	document.getElementById("nsWarnPage").style.display = 'none';
	document.getElementById("errorPage").style.display = 'none';
	document.getElementById("homePage").style.display = '';
	document.getElementById("channelPage").style.display = 'none';
	document.getElementById("searchContainer").style.display = '';
	document.getElementById("settingsPage").style.display = 'none';
	document.getElementById("helpOut").style.display = 'none';
	document.getElementById("bannerPfpContainer").style.display = 'none';
	document.getElementById("mainTrending").innerHTML = "";
	document.getElementById("musicTrending").innerHTML = "";
	document.getElementById("gamingTrending").innerHTML = "";
	document.getElementById("embedContainer").innerHTML = "";
	document.getElementById("trendingLoader").style.display = "";
	document.getElementById("trending").style.display = "none";
	document.title = "vidpolaris";
	getTrending(localStorage.getItem("sLoc"));
}

function longDesc() {
	if (document.getElementById("ldDiv").style.display == 'none') {
		document.getElementById("ldDiv").style.display = 'block';
		document.getElementById("desc").style.display = 'none';
		document.getElementById("ldBtn").innerHTML = "see less";
	} else {
		document.getElementById("ldDiv").style.display = 'none';
		document.getElementById("desc").style.display = '';
		document.getElementById("ldBtn").innerHTML = "see more";
	}
}

function share() {
	if (!document.getElementById("sharDiv").style.display == "") {
		document.getElementById("sharDiv").style.display = '';
		const http = new XMLHttpRequest();
		var id = getClickedId(window.location.href, "#w#");
		var fullUrl = "https://n0rmancodes.github.io/vidpolaris/#w#" + id;
		document.getElementById("fUrlShar").value = fullUrl;
		document.getElementById("youtubeLink").value = "https://youtube.com/watch?v=" + id;
		document.getElementById("sUrlShar").value = "[Loading...]";
		http.open("POST", "https://rel.ink/api/links/");
		var params = JSON.stringify({
			"url": fullUrl
		})
		http.setRequestHeader('Content-Type', 'application/json')
		http.send(params);
		http.onload=(e)=>{
			var jsond = JSON.parse(http.responseText);
			var shorter = "https://rel.ink/" + jsond.hashid;
			document.getElementById("sUrlShar").value = shorter
		}
	} else {
		document.getElementById("sharDiv").style.display = 'none';
	}
}

function refresh() {
	sessionStorage.removeItem("currentlyRunningT");
	if (window.location.href.includes("#w#")) {
		var id = getClickedId(window.location.href, "#w#")
		if (!id) {
			home();
			return;
		} else {
			if (id.length == 11) {
				openVideo(localStorage.getItem("sLoc"));
			} else {
				notPlayable();
			}
		}
	} else if (window.location.href.includes("#s#")) {
		var q = getClickedId(window.location.href, "#s#");
		if (!document.getElementById("q").value == q) {
			document.getElementById("q").value = q;
			search(localStorage.getItem("sLoc"));
		} else {
			search(localStorage.getItem("sLoc"));
		}
	} else if (window.location.href.includes("#settings")) {
		document.getElementById("player").pause();
		document.getElementById("homePage").style.display = 'none';
		document.getElementById("vidPage").style.display = 'none';
		document.getElementById("channelPage").style.display = 'none';
		document.getElementById("searchPage").style.display = 'none';
		document.getElementById("settingsPage").style.display = '';
		document.getElementById("helpOut").style.display = '';
		document.title = "settings | vidpolaris";
	} else if (window.location.href.includes("#c#")){
		openChannel(localStorage.getItem("sLoc"));
	} else if (window.location.href.includes("#adapt#")){
		adaptBookmark();
	} else if (window.location.href.includes("#")) {
		if (window.location.href.includes("#c") | window.location.href.includes("#w") | window.location.href.includes("#s") | window.location.href.includes("#adapt")) {
			return;
		} else {
			home();
		}
	}
}

function adaptBookmark() {
	var url = getClickedId(window.location.href, "#adapt#");
	if (!url.includes("youtu")) {
		document.getElementById("errorPage").style.display = '';
		document.getElementById("errorTxt").innerHTML = "invalid url used with the bookmark!"
		document.getElementById("vidPage").style.display = 'none';
		document.getElementById("nsWarnPage").style.display = 'none';
		document.getElementById("settingsPage").style.display = 'none';
		document.getElementById("searchPage").style.display = 'none';
		document.getElementById("homePage").style.display = 'none';
		document.getElementById("bannerPfpContainer").style.display = 'none';
		console.log("failed to detect valid URL.");
	} else {
		if (url.includes("v=") | url.includes("youtu.be")) {
			console.log("detected watch URL...")
			if (url.includes("v=")) {
				var id = getClickedId(url, "v=");
				var fId = id.substring(0,11);
				window.open("#w#" + fId, "_self");
				console.log("redirecting...");
			} else if (url.includes("youtu.be")) {
				var id = getClickedId(url, "/");
				var fId = id.substring(0,11);
				window.open("#w#" + fId, "_self");
				console.log("redirecting...");
			}
		} else if (url.includes("?search_query=")) {
			var query = decodeURIComponent(getClickedId(url, "?search_query="));
			if (query.includes("&")) {
				var rQuery = "&" + getClickedId(query, "&");
				var fullQuery = query.replace(rQuery, "");
				window.open("#s#" + fullQuery.replace("+", " "), "_self");
			} else {
				window.open("#s#" + query.replace("+", " "), "_self");
			}
		} else if (url.includes("/c/") | url.includes("/channel/") | url.includes("/user/")){
			if (url.includes("/channel/")) {
				var cId = getClickedId(url, "/channel/");
				window.open("#c#" + cId, "_self")
			} else if (url.includes("/c/")) {
				var cId = getClickedId(url, "/c/");
				window.open("#c#" + cId, "_self")
			} else if (url.includes("/user/")) {
				var cId = getClickedId(url, "/user/");
				window.open("#c#" + cId, "_self")
			}
		} else {
			window.open("#", "_self")
		}
	}
}

function sync() {
	document.getElementById("player").addEventListener("playing", function() {
		if (localStorage.getItem("smart") == 'y') {
			document.getElementById("audioPlayer").play();
			document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
		}
	});
	document.getElementById("player").addEventListener("pause", function() { 
		if (localStorage.getItem("smart") == 'y') {
			document.getElementById("audioPlayer").pause();
			document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
		}
	});
	document.getElementById("player").addEventListener("timeUpdate", function() { 
		if (localStorage.getItem("smart") == 'y') {
			document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
		}
	});
	document.getElementById('player').addEventListener('ended', function() {
		if (localStorage.getItem("smart") == 'y') {
			document.getElementById("audioPlayer").pause();
		}
		if (localStorage.getItem("autoplay") == 'y') {
			if (!document.getElementById("relatedVideos").style.display == 'none') {
				console.log("autoplay is on / didn't found video");
			} else {
				console.log("autoplay is on / found video / now redirecting...")
				setTimeout( function () {
					document.getElementById("rv1").click()
				}, 1000)
			}
		}
	});
	document.getElementById("player").onwaiting = function(){
		if (localStorage.getItem("smart") == 'y') {
			document.getElementById("audioPlayer").pause();
		}
	};
	document.getElementById("audioPlayer").onwaiting = function(){
		if (localStorage.getItem("smart") == 'y') {
			document.getElementById("audioPlayer").currentTime = document.getElementById("player").currentTime;
		}
	};
	document.getElementById("audioPlayer").addEventListener("playing", function() {
		if (localStorage.getItem("smart") == 'y') {
			document.getElementById("player").play();
		}
	});
}

function saveSettings() {
	localStorage.setItem("smart", document.getElementById("sq").value);
	localStorage.setItem("theme", document.getElementById("wTheme").value);
	localStorage.setItem("sLoc", document.getElementById("server").value);
	localStorage.setItem("suggest", document.getElementById("suggest").value);
	localStorage.setItem("trendingCont", document.getElementById("country").value);
	localStorage.setItem("loadComm", document.getElementById("autoComm").value);
	localStorage.setItem("disableCards", document.getElementById("disableCards").value);
	resize();
	window.history.back();
}

function dismiss() {
	localStorage.setItem('dissmissed', 'y')
	document.getElementById("lasaga").style.display = 'none';
}

function getComments(token, opt) {
	if (!token | token == "none") {
		document.getElementById("loadedComments").style.display = 'none';
		document.getElementById("loadedComments").innerHTML = "";
		document.getElementById("loadedC").style.display = 'none';
		document.getElementById("errorC").style.display = 'none';
		document.getElementById("loadC").style.display = 'none';
		document.getElementById("loadinC").style.display = '';
		var id = getClickedId(window.location.href, '#w#');
		var fullUrl = "https://youtube.com/watch?v=" + id;
		const http = new XMLHttpRequest();
		if (opt == "a" | !opt) {
			var url = "https://coorsproxyunlimited.herokuapp.com/http://normandotmp4.electrohaxz.tk:9019/?comments=1&url=" + fullUrl;
		} else if (opt == "b"){
			var url = "https://vidpolaris.herokuapp.com/?comments=1&url=" + fullUrl
		} else if (opt == "c") {
			var url = "https://vidpolaris-europe.herokuapp.com/?comments=1&url=" + fullUrl
		}
		http.open("GET", url);
		http.send();
		http.timeout = 10000;
		http.ontimeout = () => {
			if (opt == "a" | !opt) {
				if (!localStorage.getItem("sLoc") == "b") {
					getComments("none", "b");
				} else {
					document.getElementById("errorC").style.display = '';
					document.getElementById("loadinC").style.display = 'none';
					document.getElementById("loadedC").style.display = 'none';
				}
			} else if (opt == "b"){
				if (!localStorage.getItem("sLoc") == "c") {
					getComments("none", "c");
				} else {
					document.getElementById("errorC").style.display = '';
					document.getElementById("loadinC").style.display = 'none';
					document.getElementById("loadedC").style.display = 'none';
				}
			} else if (opt == "c") {
				if (!localStorage.getItem("sLoc") == "a") {
					getComments("none", "a");
				} else {
					document.getElementById("errorC").style.display = '';
					document.getElementById("loadinC").style.display = 'none';
					document.getElementById("loadedC").style.display = 'none';
				}
			}
		}
		http.onload=()=>{
			var jsond = JSON.parse(http.responseText);
			for (var c in jsond.comments) {
				var div = document.createElement("DIV");
				div.classList.add("comment");
				div.id = "c" + c;
				document.getElementById("loadedComments").appendChild(div);
				if (c == 0 && jsond.comments[0].timestamp && jsond.comments[1].timestamp) {
					if (jsond.comments[0].timestamp < jsond.comments[1].timestamp) {
						var pinned = document.createElement("P");
						pinned.classList.add("stat");
						pinned.innerHTML = "<span class='ico material-icons'>announcement</span> Pinned comment";
						pinned.style = "margin-bottom:5px;";
						document.getElementById("c"+c).appendChild(pinned);
					}
				}
				var img = document.createElement("IMG");
				img.src = jsond.comments[c].authorThumb;
				img.classList.add("smallPfp");
				document.getElementById("c"+c).appendChild(img);
				if (jsond.comments[c].authorLink && jsond.comments[c].author) {
					var cLink = document.createElement("A");
					cLink.id = "c"+c+"aL";
					cLink.classList.add("channelLink");
					cLink.href = "#c#" + jsond.comments[c].authorLink.substring(9);
					document.getElementById("c"+c).appendChild(cLink);
					var h3 = document.createElement("H3");
					h3.classList.add("cAuthor");
					h3.innerHTML = jsond.comments[c].author;
					document.getElementById("c"+c+"aL").appendChild(h3);
				} else {
					var h3 = document.createElement("H3");
					h3.innerHTML = "[Channel unavailable]";
					document.getElementById("c"+c+"aL").appendChild(h3);
				}
				var cText = document.createElement("P");
				cText.innerHTML = jsond.comments[c].text.replace(/\n/g, "<br>");
				cText.classList.add("cText");
				cText.id = "c"+c+"T"
				document.getElementById("c"+c).appendChild(cText);
				var stats = document.createElement("P");
				stats.classList.add("stat");
				if (!jsond.comments[c].numReplies) {
					var rep = "0";
				} else {
					var rep = jsond.comments[c].numReplies;
				}
			var tFunction = `translate('c` + c + `T')`
				stats.innerHTML = "<span class='material-icons ico'>comment</span> " + rep + " replies • <span class='material-icons ico'>thumb_up</span> " + jsond.comments[c].likes.toLocaleString() + " likes • <span onclick=" + tFunction + " style='cursor:pointer'><span class='material-icons ico'>translate</span> translate this comment</span> • <span>posted " + jsond.comments[c].time + "</span>";
				document.getElementById("c"+c).appendChild(stats);
			}
			document.getElementById("loadinC").style.display = "none";
			document.getElementById("loadedC").style.display = "";
			document.getElementById("loadedComments").style.display = "";
			if (jsond.npToken) {
				var button = document.createElement("BUTTON");
				button.onclick = function() {
					getComments(jsond.npToken, localStorage.getItem("sLoc"));
				}
				button.innerHTML = "load more comments"
				document.getElementById("loadedComments").appendChild(button)
			}
		}
	} else {
		document.getElementById("loadedComments").style.display = 'none';
		document.getElementById("loadedC").style.display = 'none';
		document.getElementById("errorC").style.display = 'none';
		document.getElementById("loadC").style.display = 'none';
		document.getElementById("loadinC").style.display = '';
		document.getElementById("loadedComments").innerHTML = '';
		var id = getClickedId(window.location.href, '#w#');
		var fullUrl = "https://youtube.com/watch?v=" + id;
		const http = new XMLHttpRequest();
		if (opt == "a" | !opt) {
			var url = "https://coorsproxyunlimited.herokuapp.com/http://normandotmp4.electrohaxz.tk:9019/?comments=1&token=" + token + "&url=" + fullUrl;
		} else if (opt == "b"){
			var url = "https://vidpolaris.herokuapp.com/?comments=1&token=" + token + "&url=" + fullUrl;
		} else if (opt == "c") {
			var url = "https://vidpolaris-europe.herokuapp.com/?comments=1&token=" + token + "&url=" + fullUrl;
		}
		http.open("GET", url);
		http.send();
		http.timeout = 10000;
		http.ontimeout = () => {
			if (opt == "a" | !opt) {
				if (!localStorage.getItem("sLoc") == "b") {
					getComments("none", "b");
				} else {
					document.getElementById("errorC").style.display = '';
					document.getElementById("loadinC").style.display = 'none';
					document.getElementById("loadedC").style.display = 'none';
				}
			} else if (opt == "b"){
				if (!localStorage.getItem("sLoc") == "c") {
					getComments("none", "c");
				} else {
					document.getElementById("errorC").style.display = '';
					document.getElementById("loadinC").style.display = 'none';
					document.getElementById("loadedC").style.display = 'none';
				}
			} else if (opt == "c") {
				if (!localStorage.getItem("sLoc") == "a") {
					getComments("none", "a");
				} else {
					document.getElementById("errorC").style.display = '';
					document.getElementById("loadinC").style.display = 'none';
					document.getElementById("loadedC").style.display = 'none';
				}
			}
		}
		http.onload=(e)=>{
			var jsond = JSON.parse(http.responseText);
			for (var c in jsond.comments) {
				var div = document.createElement("DIV");
				div.classList.add("comment");
				div.id = "c" + c;
				document.getElementById("loadedComments").appendChild(div);
				var img = document.createElement("IMG");
				img.src = jsond.comments[c].authorThumb;
				img.classList.add("smallPfp");
				document.getElementById("c"+c).appendChild(img);
				if (jsond.comments[c].authorLink && jsond.comments[c].author) {
					var cLink = document.createElement("A");
					cLink.id = "c"+c+"aL";
					cLink.classList.add("channelLink");
					cLink.href = "#c#" + jsond.comments[c].authorLink.substring(9);
					document.getElementById("c"+c).appendChild(cLink);
					var h3 = document.createElement("H3");
					h3.classList.add("cAuthor");
					h3.innerHTML = jsond.comments[c].author;
					document.getElementById("c"+c+"aL").appendChild(h3);
				} else {
					var h3 = document.createElement("H3");
					h3.innerHTML = "[Channel unavailable]";
					document.getElementById("c"+c+"aL").appendChild(h3);
				}
				var cText = document.createElement("P");
				cText.innerHTML = jsond.comments[c].text.replace(/\n/g, "<br>");
				cText.classList.add("cText");
				cText.id = "c"+c+"T"
				document.getElementById("c"+c).appendChild(cText);
				var stats = document.createElement("P");
				stats.classList.add("stat");
				if (!jsond.comments[c].numReplies) {
					var rep = "0";
				} else {
					var rep = jsond.comments[c].numReplies;
				}
			var tFunction = `translate('c` + c + `T')`
				stats.innerHTML = "<span class='material-icons ico'>comment</span> " + rep + " replies • <span class='material-icons ico'>thumb_up</span> " + jsond.comments[c].likes.toLocaleString() + " likes • <span onclick=" + tFunction + " style='cursor:pointer'><span class='material-icons ico'>translate</span> translate this comment</span> • <span>posted " + jsond.comments[c].time + "</span>";
				document.getElementById("c"+c).appendChild(stats);
			}
			document.getElementById("loadinC").style.display = "none";
			document.getElementById("loadedC").style.display = "";
			document.getElementById("loadedComments").style.display = "";
			if (jsond.npToken) {
				var button = document.createElement("BUTTON");
				button.onclick = function() {
					getComments(jsond.npToken, localStorage.getItem("sLoc"));
				}
				button.innerHTML = "load more comments"
				document.getElementById("loadedComments").appendChild(button)
			}
		}
	}
}

function toggleAuto() {
	setTimeout( function () {
		if (document.getElementById("apSwitch").checked) {
			localStorage.setItem("autoplay", "y");
			document.getElementById("lpSwitch").checked = false;
			document.getElementById("player").removeAttribute("loop");
		} else {
			localStorage.setItem("autoplay", "n");
		}
	}, 100)
}

function toggleLoop() {
	setTimeout( function () {
		if (document.getElementById("lpSwitch").checked) {
			document.getElementById("player").loop = "true";
			document.getElementById("apSwitch").checked = false;
			if (document.getElementById("player").ended == true) {
				document.getElementById("player").currentTime = 0;
				document.getElementById("player").play();
			}
			localStorage.setItem("autoplay", "n");
		} else {
			document.getElementById("player").removeAttribute("loop");
		}
	}, 100)
}


function changeQ(opt) {
	if (document.getElementById("itag").innerHTML == document.getElementById("qOptions").value) {
		return;
	} else {
		document.getElementById("qOptions").disabled = true;
		document.getElementById("aqOptions").disabled = true;
		const http = new XMLHttpRequest();
		var id = getClickedId(window.location.href, '#w#');
		var fullUrl = "https://youtube.com/watch?v=" + id;
		if (opt == "a" | !opt) {
			var url = "https://coorsproxyunlimited.herokuapp.com/http://normandotmp4.electrohaxz.tk:9019/?itag=" + document.getElementById("qOptions").value + "&url=" + fullUrl
		} else if (opt == "b"){
			var url = "https://vidpolaris.herokuapp.com/?itag=" + document.getElementById("qOptions").value + "&url=" + fullUrl
		} else if (opt == "c") {
			var url = "https://vidpolaris-europe.herokuapp.com/?itag=" + document.getElementById("qOptions").value + "&url=" + fullUrl
		}
		http.open("GET", url);
		http.send();
		http.onload=(e)=>{
			var jsond = JSON.parse(http.responseText);
			var currentTime = document.getElementById("player").currentTime;
			document.getElementById("itag").innerHTML = jsond.datainfo.itag;
			document.getElementById("player").src = jsond.datainfo.url;
			document.getElementById("player").currentTime = currentTime;
			document.getElementById("player").onloadeddata = function () {
				document.getElementById("player").play();
				document.getElementById("playerContainer").style.display = "";
				document.getElementById("qOptions").disabled = false;
				document.getElementById("aqOptions").disabled = false;
			}
		}
		http.timeout = 3000;
		http.ontimeout = () => {
			if (opt == "a" | !opt) {
				changeQ("b");
			} else if (opt == "b"){
				changeQ("c");
			} else if (opt == "c") {
				changeQ("a");
			}
		}
	}
}

function changeAQ(opt) {
	document.getElementById("qOptions").disabled = true;
	document.getElementById("aqOptions").disabled = true;
	document.getElementById("player").pause();
	document.getElementById("playerContainer").style.display = "none";
	const http = new XMLHttpRequest();
	var id = getClickedId(window.location.href, '#w#');
	var fullUrl = "https://youtube.com/watch?v=" + id;
	if (opt == "a" | !opt) {
		var url = "https://coorsproxyunlimited.herokuapp.com/http://normandotmp4.electrohaxz.tk:9019/?itag=" + document.getElementById("aqOptions").value + "&url=" + fullUrl
	} else if (opt == "b"){
		var url = "https://vidpolaris.herokuapp.com/?itag=" + document.getElementById("aqOptions").value + "&url=" + fullUrl
	} else if (opt == "c") {
		var url = "https://vidpolaris-europe.herokuapp.com/?itag=" + document.getElementById("aqOptions").value + "&url=" + fullUrl
	}
	http.open("GET", url);
	http.send();
	http.onload=(e)=>{
		var jsond = JSON.parse(http.responseText);
		var currentTime = document.getElementById("player").currentTime;
		document.getElementById("itag").innerHTML = jsond.datainfo.itag;	
		document.getElementById("audioPlayer").src = jsond.datainfo.url;
		document.getElementById("audioPlayer").currentTime = currentTime;
		document.getElementById("audioPlayer").onloadeddata= function () {
			document.getElementById("player").play();
			document.getElementById("playerContainer").style.display = "";
			document.getElementById("qOptions").disabled = false;
			document.getElementById("aqOptions").disabled = false;
		}
	}
	http.timeout = 3000;
	http.ontimeout = () => {
		if (opt == "a" | !opt) {
			changeAQ("b");
		} else if (opt == "b"){
			changeAQ("c");
		} else if (opt == "c") {
			changeAQ("a");
		}
	}
}

function proxyAV() {
	openVideo(localStorage.getItem("sLoc"), "y");
	document.getElementById("loadErr").style.display = "none";
}

function translate(elem) {
	if (!elem) {
		return;
	} else {
		var tex = document.getElementById(elem).innerHTML;
		document.getElementById(elem).innerHTML = "(translating...)"
		if (!sessionStorage.getItem("currentlyRunningT") | sessionStorage.getItem("currentlyRunningT") == "n") {
			sessionStorage.setItem("currentlyRunningT", "y");
			const http = new XMLHttpRequest();
			if (localStorage.getItem("sLoc") == "a" | !localStorage.getItem("sLoc")) {
				var url = "https://coorsproxyunlimited.herokuapp.com/http://normandotmp4.electrohaxz.tk:9019/?to=en&translate=" + encodeURIComponent(tex);
			} else if (localStorage.getItem("sLoc") == "b"){
				var url = "https://vidpolaris.herokuapp.com/?to=en&translate=" + encodeURIComponent(tex);
			} else if (localStorage.getItem("sLoc") == "c") {
				var url = "https://vidpolaris-europe.herokuapp.com/?to=en&translate=" + encodeURIComponent(tex);
			}
			http.open("GET", url);
			http.send();
			http.onload=(e)=>{
				var jsond = JSON.parse(http.responseText);
				var tTex = jsond.res.text;
				var f = jsond.res.from.language.iso;
				if (f == "af") {
					var fTex = "afrikaans";
				} else if (f == "sq") {
					var fTex = "albanian";
				} else if (f == "am") {
					var fTex = "amharic";
				} else if (f == "ar") {
					var fTex = "arabic";
				} else if (f == "hy") {
					var fTex = "armenian";
				} else if (f == "az") {
					var fTex = "azerbaijani";
				} else if (f == "eu") {
					var fTex = "basque";
				} else if (f == "be") {
					var fTex = "belarusian";
				} else if (f == "bn") {
					var fTex = "bengali";
				} else if (f == "bs") {
					var fTex = "bosnian";
				} else if (f == "bg") {
					var fTex = "bulgarian";
				} else if (f == "ca") {
					var fTex = "catalan";
				} else if (f == "ceb") {
					var fTex = "cebuano";
				} else if (f == "ny") {
					var fTex = "chichewa";
				} else if (f == "zh-CN") {
					var fTex = "chinese (simplified)";
				} else if (f == "zh-TW") {
					var fTex = "chinese (traditional)";
				} else if (f == "co") {
					var fTex = "corsican";
				} else if (f == "hr") {
					var fTex = "croatian";
				} else if (f == "cz") {
					var fTex = "czech";
				} else if (f == "da") {
					var fTex = "danish";
				} else if (f == "nl") {
					var fTex = "dutch";
				} else if (f == "en") {
					var fTex = "english";
				} else if (f == "eo") {
					var fTex = "esperanto";
				} else if (f == "et") {
					var fTex = "estonian";
				} else if (f == "tl") {
					var fTex = "filipino";
				} else if (f == "fi") {
					var fTex = "finnish";
				} else if (f == "fr") {
					var fTex = "french";
				} else if (f == "fy") {
					var fTex = "frisian";
				} else if (f == "gl") {
					var fTex = "galician";
				} else if (f == "ka") {
					var fTex = "georgian";
				} else if (f == "de") {
					var fTex = "german";
				} else if (f == "el") {
					var fTex = "greek"
				} else if (f == "gu") {
					var fTex = "gujarati";
				} else if (f == "ht") {
					var fTex = "haitian creole";
				} else if (f == "ha") {
					var fTex = "hausa";
				} else if (f == "haw") {
					var fTex = "hawaiian";
				} else if (f == "iw") {
					var fTex = "hebrew";
				} else if (f == "hi") {
					var fTex = "hindi";
				} else if (f == "hmn") {
					var fTex = "hmong";
				} else if (f == "hu") {
					var fTex = "hungarian";
				} else if (f == "is") {
					var fTex = "icelandic";
				} else if (f == "ig") {
					var fTex = "igbo";
				} else if (f == "id") {
					var fTex = "indonesian";
				} else if (f == "ga") {
					var fTex = "irish";
				} else if (f == "it") {
					var fTex = "italian";
				} else if (f == "ja") {
					var fTex = "japanese";
				} else if (f == "jw") {
					var fTex = "javanese";
				} else if (f == "kn") {
					var fTex = "kannada";
				} else if (f == "kk") {
					var fTex = "kazakh";
				} else if (f == "km") {
					var fTex = "khmer";
				} else if (f == "ko") {
					var fTex = "korean";
				} else if (f == "ku") {
					var fTex = "kurdish (kurmanji)";
				} else if (f == "ky") {
					var fTex = "kyrgyz";
				} else if (f == "lo") {
					var fTex = "lao";
				} else if (f == "la") {
					var fTex = "latin";
				} else if (f == "lv") {
					var fTex = "latvian";
				} else if (f == "lt") {
					var fTex = "lithuanian";
				} else if (f == "lb") {
					var fTex = "luxembourgish";
				} else if (f == "mk") {
					var fTex = "macedonian";
				} else if (f == "mg") {
					var fTex = "malagasy";
				} else if (f == "ms") {
					var fTex = "malay";
				} else if (f == "ml") {
					var fTex = "malayalam";
				} else if (f == "mt") {
					var fTex = "maltese";
				} else if (f == "mi") {
					var fTex = "maori";
				} else if (f == "mr") {
					var fTex = "marathi";
				} else if (f == "mn") {
					var fTex = "mongolain";
				} else if (f == "my") {
					var fTex = "myanmar (burmese)";
				} else if (f == "ne") {
					var fTex = "nepali";
				} else if (f == "no") {
					var fTex = "norwegian";
				} else if (f == "ps") {
					var fTex = "pashto";
				} else if (f == "fa") {
					var fTex = "persian";
				} else if (f == "pl") {
					var fTex = "polish";
				} else if (f == "pt") {
					var fTex = "portuguese";
				} else if (f == "pa") {
					var fTex = "punjabi";
				} else if (f == "ro") {
					var fTex = "romanian";
				} else if (f == "ru") {
					var fTex = "russian";
				} else if (f == "sm") {
					var fTex = "samoan";
				} else if (f == "gd") {
					var fTex = "scots gaelic";
				} else if (f == "sr") {
					var fTex = "serbian";
				} else if (f == "st") {
					var fTex = "sesotho";
				} else if (f == "sn") {
					var fTex = "shona";
				} else if (f == "sd") {
					var fTex = "sindhi";
				} else if (f == "si") {
					var fTex = "sinhala";
				} else if (f == "sk") {
					var fTex = "slovak";
				} else if (f == "sl") {
					var fTex = "solvenian";
				} else if (f == "so") {
					var fTex = "somali";
				} else if (f == "es") {
					var fTex = "spanish";
				} else if (f == "su") {
					var fTex = "sundanese";
				} else if (f == "sw") {
					var fTex = "swahili";
				} else if (f == "sv") {
					var fTex = "swedish";
				} else if (f == "tg") {
					var fTex = "tajik";
				} else if (f == "ta") {
					var fTex = "tamil";
				} else if (f == "te") {
					var fTex = "telugu";
				} else if (f == "th") {
					var fTex = "thai";
				} else if (f == "tr") {
					var fTex = "turkish";
				} else if (f == "uk") {
					var fTex = "ukrainian";
				} else if (f == "ur") {
					var fTex = "urdu";
				} else if (f == "uz") {
					var fTex = "uzbek";
				} else if (f == "vi") {
					var fTex = "vietnamese";
				} else if (f == "cy") {
					var fTex = "welsh";
				} else if (f == "xh") {
					var fTex = "xhosa";
				} else if (f == "yi") {
					var fTex = "yiddish";
				} else if (f == "yo") {
					var fTex = "yoruba";
				} else if (f == "zu") {
					var fTex = "zulu";
				} else {
					var fTex = jsond.res.from.language.iso + " (if you see this, report it to <a href='https://twitter.com/normanisnotrad' class='channelLink'>my twitter</a>)";
				}
 				document.getElementById(elem).innerHTML = tTex + " (translated from " + fTex + ")";
				sessionStorage.setItem("currentlyRunningT", "n");
			}
			http.timeout = 5000;
			http.ontimeout = () => {
				sessionStorage.setItem("currentlyRunningT", "n");
				document.getElementById(elem).innerHTML = tex + " (error translating)"
			}
		} else {
			console.log("please wait for the other translation to finish loading...");
			return;
		}
	}
}


function keepProg() { 
	if (document.getElementById('player').playing == true) {
		sessionStorage.setItem('time', document.getElementById("player").currentTime);
		var id = getClickedId(window.location.href, '#w#');
		sessionStorage.setItem('id', id);
	} else {
		sessionStorage.removeItem('id');
		sessionStorage.removeItem('time');
	}
	setTimeout( function () {
		keepProg()
	}, 5000)
}

function theatre(mode) {
	if (!mode){
		if (document.getElementById("player").style.width == "60%" | !document.getElementById("player").style.width) {
			document.getElementById("player").style = "max-height:840px;";
			document.getElementById("player").style.width = "100%";
			document.getElementById("theat_native").innerHTML = "back to normal"
			localStorage.setItem("theatre" , "y")
		} else {
			document.getElementById("player").style = "max-height:645px;";
			document.getElementById("player").style.width = "60%";
			document.getElementById("theat_native").innerHTML = "theater mode"
			localStorage.setItem("theatre" , "n")
		}
	} else {
		if (document.getElementById("embedContainer").style.width == "60%" | !document.getElementById("embedContainer").style.width) {
			document.getElementById("embedContainer").style = "height:860px;";
			document.getElementById("frame").style = "height:840px;";
			document.getElementById("embedContainer").style.width = "100%";
			document.getElementById("theat_embed").innerHTML = "back to normal"
			localStorage.setItem("theatre" , "y")
		} else {
			document.getElementById("embedContainer").style = "height:670px;margin-left:20%;";
			document.getElementById("frame").style = "height:645px;";
			document.getElementById("embedContainer").style.width = "60%";
			document.getElementById("theat_embed").innerHTML = "theater mode"
			localStorage.setItem("theatre" , "n")
		}
	}
}

function showWarning() {
	if (localStorage.getItem("ageR") == "n" | !localStorage.getItem("ageR")) {
		document.getElementById("nsWarnPage").style.display = '';
		document.getElementById("vidPage").style.display = 'none';
		document.getElementById("player").pause();
	} else {
		return;
	}
}

function showContent(choice) {
	if (choice == 'y') {
		document.getElementById("vidPage").style.display = '';
		document.getElementById("nsWarnPage").style.display = 'none';
		localStorage.setItem('ageR', 'y');
	} else if (choice == 'y_ns') {
		document.getElementById("vidPage").style.display = '';
		document.getElementById("nsWarnPage").style.display = 'none';
		localStorage.setItem('ageR', 'n');
	} else {
		window.open("#", "_self");
		localStorage.setItem('ageR', 'n');
	}
}

function notPlayable() {
	document.getElementById("errorPage").style.display = '';
	document.getElementById("errorTxt").innerHTML = "for one reason or another, this video cannot be played. try again or watch it on youtube itself."
	document.getElementById("vidPage").style.display = 'none';
	document.getElementById("nsWarnPage").style.display = 'none';
	document.getElementById("settingsPage").style.display = 'none';
	document.getElementById("searchPage").style.display = 'none';
	document.getElementById("homePage").style.display = 'none';
	document.getElementById("bannerPfpContainer").style.display = 'none';
}

function openChannel(opt) {
	document.title = "[loading...] vidpolaris";
	document.getElementById("player").pause();
	document.getElementById("resultsContainer").style.display = 'none';
	document.getElementById("searchTerm").style.display = "none";
	document.getElementById("helpOut").style.display = 'none';
	document.getElementById("vidPage").style.display = 'none';
	document.getElementById("searchContainer").style.display = 'none';
	document.getElementById("homePage").style.display = 'none';
	document.getElementById("settingsPage").style.display = 'none';
	document.getElementById("channelPage").style.display = '';
	document.getElementById("chanLoader").style.display = '';
	document.getElementById("chanViewer").style.display = 'none';
	document.getElementById("bannerPfpContainer").style.display = 'none';
	document.getElementById("aboutPage").style.display = 'none';
	document.getElementById("allUploadsPage").style.display = "none";
	const http = new XMLHttpRequest();
	var id = getClickedId(window.location.href, '#c#');
	if (id.includes("/videos")) {
		window.open("#c#" + id.replace("/videos", ""), "_self")
	} else if (id.includes("/channels")) {
		window.open("#c#" + id.replace("/channels", ""), "_self")
	} else if (id.includes("/playlists")) {
		window.open("#c#" + id.replace("/playlists", ""), "_self")
	} else if (id.includes("/community")) {
		window.open("#c#" + id.replace("/community", ""), "_self")
	} else if (id.includes("/about")) {
		window.open("#c#" + id.replace("/about", ""), "_self")
	} else if (id.includes("/featured")) {
		window.open("#c#" + id.replace("/featured", ""), "_self")
	}
	if (opt == "a" | !opt) {
		var url = "https://coorsproxyunlimited.herokuapp.com/http://normandotmp4.electrohaxz.tk:9019/?channelId=" + id;
	} else if (opt == "b"){
		var url = "https://vidpolaris.herokuapp.com/?channelId=" + id;
	} else if (opt == "c") {
		var url = "https://vidpolaris-europe.herokuapp.com/?channelId=" + id;
	}
	http.open("GET", url);
	http.send();
	http.onload=(e)=>{
		var jsond = JSON.parse(http.responseText);
		if (jsond.error) {
			document.getElementById("errorPage").style.display = '';
			document.getElementById("errorTxt").innerHTML = "for one reason or another, this channel could not be opened. try again or see it on youtube itself."
			document.getElementById("vidPage").style.display = 'none';
			document.getElementById("channelPage").style.display = 'none';
			document.getElementById("nsWarnPage").style.display = 'none';
			document.getElementById("settingsPage").style.display = 'none';
			document.getElementById("searchPage").style.display = 'none';
			document.getElementById("homePage").style.display = 'none';
			document.getElementById("bannerPfpContainer").style.display = 'none';
			document.getElementById("allUploadsPage").style.display = 'none';
			document.getElementById("aboutPage").style.display = 'none';
			document.getElementById("searchContainer").style.display = '';
		} else {
			if (jsond.authorBanners[0]) {
				document.getElementById("banner").src = jsond.authorBanners[0].url.split('-fcrop')[0];
			} else {
				document.getElementById("banner").src = "img/banner.png";
			}
			if (opt == "a" | !opt) {
				var baseUrl = "http://normandotmp4.electrohaxz.tk:9019/?thumb=";
			} else if (opt == "b") {
				var baseUrl = "https://vidpolaris.herokuapp.com/?thumb=";
			} else if (opt == "c") {
				var baseUrl = "https://vidpolaris-europe.herokuapp.com/?thumb=";
			}
			document.getElementById("profilePic").src = jsond.authorThumbnails[0].url.split('=s100')[0];
			if (!jsond.subCount == 0) {
				document.getElementById("subCount").innerHTML = jsond.subCount.toLocaleString();
			} else {
				if (jsond.totalViews > 5000) {
					document.getElementById("subCount").innerHTML = "[disabled]";
				} else {
					document.getElementById("subCount").innerHTML = 0;
				}
			}
			document.getElementById("viewCount").innerHTML = jsond.totalViews.toLocaleString();
			document.getElementById("chanName").innerHTML = jsond.author;
			document.getElementById("channelDesc").innerHTML = jsond.description;
			document.getElementById("recentUploads").innerHTML = "";
			document.getElementById("newUps").style.display = "";
			document.title = jsond.author + " | vidpolaris";
			for (var c in jsond.latestVideos) {
				var link = document.createElement("A");
				link.href = "#w#" + jsond.latestVideos[c].videoId;
				link.id = "up" + c;
				document.getElementById("recentUploads").appendChild(link);
				var div = document.createElement("DIV");
				div.classList.add("altSmallVideo");
				div.id = "up" + c + "Div"
				document.getElementById("up"+c).appendChild(div);
				var img = document.createElement("IMG");
				img.classList.add("relatedThumb");
				img.src = baseUrl + jsond.latestVideos[c].videoId;
				document.getElementById("up"+c+"Div").appendChild(img);
				var h3 = document.createElement("H4");
				h3.classList.add("stat");
				h3.innerHTML = jsond.latestVideos[c].title;
				document.getElementById("up"+c+"Div").appendChild(h3);
				var stat1 = document.createElement("H5");
				stat1.innerHTML = '<span class="material-icons ico">calendar_today</span> posted ' + jsond.latestVideos[c].publishedText;
				stat1.classList.add("stat")
				document.getElementById("up"+c+"Div").appendChild(stat1);
				var stat2 = document.createElement("H5");
				stat2.innerHTML = '<span class="material-icons ico">remove_red_eye</span> ' + jsond.latestVideos[c].viewCount.toLocaleString() + ' views'
				stat2.classList.add("stat");
				document.getElementById("up"+c+"Div").appendChild(stat2);
				if (c == 11) {
					document.getElementById("chanLoader").style.display = 'none';
					document.getElementById("chanViewer").style.display = '';
					document.getElementById("recentUploads").style.display = '';
					document.getElementById("searchContainer").style.display = '';
					document.getElementById("bannerPfpContainer").style.display = '';
					document.getElementById("relatedChannels").innerHTML = "";
					for (c in jsond.relatedChannels) {
						var link = document.createElement("A");
						link.href = "#c#" + jsond.relatedChannels[c].authorId;
						link.id = "reCh" + c;
						document.getElementById("relatedChannels").appendChild(link);
						var div = document.createElement("DIV");
						div.classList.add("relatedChannel");
						div.id = "reChDiv" + c;
						document.getElementById("reCh"+c).appendChild(div);
						var img = document.createElement("IMG");
						var url = jsond.relatedChannels[c].authorThumbnails[0].url
						img.src = url.split('=s')[0];
						img.classList.add("profilePics");
						document.getElementById("reChDiv"+c).appendChild(img);
						var name = document.createElement("H2");
						name.innerHTML = jsond.relatedChannels[c].author;
						name.classList.add("stat");
						document.getElementById("reChDiv"+c).appendChild(name);
					}
					return;
				}
			}
		}
	}
	http.timeout = 7000;
	http.ontimeout = () => {
		if (opt == "a" | !opt) {
			openChannel("b");
		} else if (opt == "b"){
			openChannel("c");
		} else if (opt == "c") {
			openChannel("a");
		}
	}
}

function openChannelVideos(opt,pg) {
	document.getElementById("recentUploads").style.display = 'none';
	document.getElementById("allUploadsPage").style.display = '';
	document.getElementById("newUps").style.display = "none";
	document.getElementById("aboutPage").style.display = 'none';
	document.getElementById("pwChannel").style.display = '';
	const http = new XMLHttpRequest();
	if (!document.getElementById("pageNumChan").innerHTML | document.getElementById("pageNumChan").innerHTML == "i") {
		sessionStorage.setItem("nxtpg", "ii");
		document.getElementById("pageNumChan").innerHTML = "ii";
	} else {
		var curPage = document.getElementById("pageNumChan").innerHTML.length;
		var pageNum_b = document.getElementById("pageNumChan").innerHTML + "i";
		sessionStorage.setItem("nxtpg", pageNum_b);
		var pageNum = curPage;
		document.getElementById("pageNumChan").innerHTML = pageNum_b;
	}
	var id = getClickedId(window.location.href, '#c#');
	if (opt == "a" | !opt) {
		if (pg == "i" | !pg) {
			var url = "https://coorsproxyunlimited.herokuapp.com/http://normandotmp4.electrohaxz.tk:9019/?channelVideos=" + id + "&sortBy=" + document.getElementById("sortBy").value;
		} else {
			var url = "https://coorsproxyunlimited.herokuapp.com/http://normandotmp4.electrohaxz.tk:9019/?channelVideos=" + id + "&sortBy=" + document.getElementById("sortBy").value + "&page="+ pageNum;
		}
	} else if (opt == "b"){
		if (pg == "i" | !pg) {
			var url = "https://vidpolaris.herokuapp.com/?channelVideos=" + id + "&sortBy=" + document.getElementById("sortBy").value;
		} else {
			var url = "https://vidpolaris.herokuapp.com/?channelVideos=" + id + "&sortBy=" + document.getElementById("sortBy").value + "&page="+ pageNum;
		}
	} else if (opt == "c") {
		if (pg == "i" | !pg) {
			var url = "https://vidpolaris-europe.herokuapp.com/?channelVideos=" + id + "&sortBy=" + document.getElementById("sortBy").value;
		} else {
			var url = "https://vidpolaris-europe.herokuapp.com/?channelVideos=" + id + "&sortBy=" + document.getElementById("sortBy").value + "&page="+ pageNum;
		}
	}
	http.open("GET", url);
	http.send();
	http.onload=(e)=>{
		document.getElementById("allUploads").innerHTML = "";
		var jsond = JSON.parse(http.responseText);
		for (var c in jsond) {
			var link = document.createElement("A");
			link.href = "#w#" + jsond[c].videoId;
			link.id = "au" + c;
			document.getElementById("allUploads").appendChild(link);
			var div = document.createElement("DIV");
			div.classList.add("altSmallVideo");
			div.id = "au" + c + "Div"
			document.getElementById("au"+c).appendChild(div);
			var img = document.createElement("IMG");
			img.classList.add("relatedThumb");
			img.src = "https://vidpolaris.herokuapp.com/?thumb=" + jsond[c].videoId;
			document.getElementById("au"+c+"Div").appendChild(img);
			var h3 = document.createElement("H4");
			h3.classList.add("stat");
			h3.innerHTML = jsond[c].title;
			document.getElementById("au"+c+"Div").appendChild(h3);
			var stat1 = document.createElement("H5");
			stat1.innerHTML = '<span class="material-icons ico">calendar_today</span> posted ' + jsond[c].publishedText;
			stat1.classList.add("stat")
			document.getElementById("au"+c+"Div").appendChild(stat1);
			var stat2 = document.createElement("H5");
			stat2.innerHTML = '<span class="material-icons ico">remove_red_eye</span> ' + jsond[c].viewCount.toLocaleString() + ' views'
			stat2.classList.add("stat");
			document.getElementById("au"+c+"Div").appendChild(stat2);
		}
		document.getElementById("pwChannel").style.display = 'none';
		if (jsond.length == 60) {
			document.getElementById("controls").style = "width:20%;float:left;margin:0;";
			document.getElementById("nextUpload").removeAttribute("disabled");
			document.getElementById("nextUpload").style.display = "";
		} else {
			document.getElementById("nextUpload").setAttribute("disabled", "true");
			document.getElementById("nextUpload").style.display = "none";
		}
	}
}

function cHome() {
	document.getElementById("recentUploads").style.display = '';
	document.getElementById("newUps").style.display = "";
	document.getElementById("allUploadsPage").style.display = 'none';
	document.getElementById("aboutPage").style.display = 'none';
}

function watchOnYoutube() {
	var id = getClickedId(window.location.href, "#w#");
	window.open("https://youtube.com/watch?v=" + id, "_self")
}

function watchOnNCYoutube() {
	var id = getClickedId(window.location.href, "#w#");
	window.open("https://www.youtube-nocookie.com/embed/" + id + "?autoplay=true", "_self")
}

function watchOnInvidious() {
	var id = getClickedId(window.location.href, "#w#");
	window.open("https://invidio.us/watch?v=" + id, "_self")
}

function setSpeed() {
	var speed = document.getElementById("speed").value;
	if (localStorage.getItem("smart") == "y") {
		var smart = true;
	} else {
		var smart = false;
	}
	if (speed == "p1x") {
		document.getElementById("player").playbackRate = 0.1;
		if (smart == true) {
			document.getElementById("audioPlayer").playbackRate = 0.1;
		}
	} else if (speed == "25x") {
		document.getElementById("player").playbackRate = 0.25;
		if (smart == true) {
			document.getElementById("audioPlayer").playbackRate = 0.25;
		}
	} else if (speed == "5x") {
		document.getElementById("player").playbackRate = 0.5;
		if (smart == true) {
			document.getElementById("audioPlayer").playbackRate = 0.5;
		}
	} else if (speed == "75x") {
		document.getElementById("player").playbackRate = 0.75;
		if (smart == true) {
			document.getElementById("audioPlayer").playbackRate = 0.75;
		}
	} else if (speed == "1x") {
		document.getElementById("player").playbackRate = 1.0;
		if (smart == true) {
			document.getElementById("audioPlayer").playbackRate = 1.0;
		}
	} else if (speed == "125x") {
		document.getElementById("player").playbackRate = 1.25;
		if (smart == true) {
			document.getElementById("audioPlayer").playbackRate = 1.25;
		}
	} else if (speed == "15x") {
		document.getElementById("player").playbackRate = 1.5;
		if (smart == true) {
			document.getElementById("audioPlayer").playbackRate = 1.5;
		}
	} else if (speed == "175x") {
		document.getElementById("player").playbackRate = 1.75;
		if (smart == true) {
			document.getElementById("audioPlayer").playbackRate = 1.75;
		}
	} else if (speed == "2x") {
		document.getElementById("player").playbackRate = 2.0;
		if (smart == true) {
			document.getElementById("audioPlayer").playbackRate = 2.0;
		}
	} else if (speed == "225x") {
		document.getElementById("player").playbackRate = 2.25;
		if (smart == true) {
			document.getElementById("audioPlayer").playbackRate = 2.25;
		}
	} else if (speed == "2p5x") {
		document.getElementById("player").playbackRate = 2.5;
		if (smart == true) {
			document.getElementById("audioPlayer").playbackRate = 2.5;
		}
	} else if (speed == "275x") {
		document.getElementById("player").playbackRate = 2.75;
		if (smart == true) {
			document.getElementById("audioPlayer").playbackRate = 2.75;
		}
	} else if (speed == "3x") {
		document.getElementById("player").playbackRate = 3.0;
		if (smart == true) {
			document.getElementById("audioPlayer").playbackRate = 3.0;
		}
	}
	localStorage.setItem("pbSpeed", document.getElementById("speed").value);
}

function getSubs(opt) {
	var id = getClickedId(window.location.href, "#w#");
	if (opt == "a" | !opt) {
		var url = "https://coorsproxyunlimited.herokuapp.com/http://normandotmp4.electrohaxz.tk:9019/?subs=" + id;
	} else if (opt == "b"){
		var url = "https://vidpolaris.herokuapp.com/?subs=" + id;
	} else if (opt == "c") {
		var url = "https://vidpolaris-europe.herokuapp.com/?subs=" + id;
	}
	const http = new XMLHttpRequest();
	http.open("GET", url);
	http.send();
	http.onload=(e)=>{
		document.getElementById("player").innerHTML = "";
		var jsond = JSON.parse(http.responseText);
		var captNum = jsond.captions.length;
		if (captNum > 1) {
			// do nothing
		} else if (captNum == 1) {
			var capt = document.createElement("TRACK");
			capt.label = jsond.captions[0].label;
			capt.kind = 'captions';
			capt.srclang = jsond.captions[0].languageCode;
			capt.src = url + "&label=" + jsond.captions[0].label;
			document.getElementById("player").appendChild(capt);
		} else if (captNum == 2) {
			var capt = document.createElement("TRACK");
			capt.label = jsond.captions[0].label;
			capt.kind = 'captions';
			capt.srclang = jsond.captions[0].languageCode;
			capt.src = url + "&label=" + jsond.captions[0].label;
			document.getElementById("player").appendChild(capt);
			var capt = document.createElement("TRACK");
			capt.label = jsond.captions[1].label;
			capt.kind = 'captions';
			capt.srclang = jsond.captions[1].languageCode;
			capt.src = url + "&label=" + jsond.captions[1].label;
			document.getElementById("player").appendChild(capt);
		} else if (captNum == 3) {
			var capt = document.createElement("TRACK");
			capt.label = jsond.captions[0].label;
			capt.kind = 'captions';
			capt.srclang = jsond.captions[0].languageCode;
			capt.src = url + "&label=" + jsond.captions[0].label;
			document.getElementById("player").appendChild(capt);
			var capt = document.createElement("TRACK");
			capt.label = jsond.captions[1].label;
			capt.kind = 'captions';
			capt.srclang = jsond.captions[1].languageCode;
			capt.src = url + "&label=" + jsond.captions[1].label;
			document.getElementById("player").appendChild(capt);
			var capt = document.createElement("TRACK");
			capt.label = jsond.captions[2].label;
			capt.kind = 'captions';
			capt.srclang = jsond.captions[2].languageCode;
			capt.src = url + "&label=" + jsond.captions[1].label;
			document.getElementById("player").appendChild(capt);
		} else if (captNum == 4) {
			var capt = document.createElement("TRACK");
			capt.label = jsond.captions[0].label;
			capt.kind = 'captions';
			capt.srclang = jsond.captions[0].languageCode;
			capt.src = url + "&label=" + jsond.captions[0].label;
			document.getElementById("player").appendChild(capt);
			var capt = document.createElement("TRACK");
			capt.label = jsond.captions[1].label;
			capt.kind = 'captions';
			capt.srclang = jsond.captions[1].languageCode;
			capt.src = url + "&label=" + jsond.captions[1].label;
			document.getElementById("player").appendChild(capt);
			var capt = document.createElement("TRACK");
			capt.label = jsond.captions[2].label;
			capt.kind = 'captions';
			capt.srclang = jsond.captions[2].languageCode;
			capt.src = url + "&label=" + jsond.captions[2].label;
			document.getElementById("player").appendChild(capt);
			var capt = document.createElement("TRACK");
			capt.label = jsond.captions[3].label;
			capt.kind = 'captions';
			capt.srclang = jsond.captions[3].languageCode;
			capt.src = url + "&label=" + jsond.captions[3].label;
			document.getElementById("player").appendChild(capt);
		} else if (captNum == 5) {
			var capt = document.createElement("TRACK");
			capt.label = jsond.captions[0].label;
			capt.kind = 'captions';
			capt.srclang = jsond.captions[0].languageCode;
			capt.src = url + "&label=" + jsond.captions[0].label;
			document.getElementById("player").appendChild(capt);
			var capt = document.createElement("TRACK");
			capt.label = jsond.captions[1].label;
			capt.kind = 'captions';
			capt.srclang = jsond.captions[1].languageCode;
			capt.src = url + "&label=" + jsond.captions[1].label;
			document.getElementById("player").appendChild(capt);
			var capt = document.createElement("TRACK");
			capt.label = jsond.captions[2].label;
			capt.kind = 'captions';
			capt.srclang = jsond.captions[2].languageCode;
			capt.src = url + "&label=" + jsond.captions[2].label;
			document.getElementById("player").appendChild(capt);
			var capt = document.createElement("TRACK");
			capt.label = jsond.captions[3].label;
			capt.kind = 'captions';
			capt.srclang = jsond.captions[3].languageCode;
			capt.src = url + "&label=" + jsond.captions[3].label;
			document.getElementById("player").appendChild(capt);
			var capt = document.createElement("TRACK");
			capt.label = jsond.captions[4].label;
			capt.kind = 'captions';
			capt.srclang = jsond.captions[4].languageCode;
			capt.src = url + "&label=" + jsond.captions[4].label;
			document.getElementById("player").appendChild(capt);
		}
	}
	http.timeout = 10000;
	http.ontimeout = () => {
		if (opt == "a" | !opt) {
			getSubs("b");
		} else if (opt == "b"){
			getSubs("c");
		} else if (opt == "c") {
			getSubs("a");
		}
	}
}

function suggest(opt) {
	if (document.getElementById("q").value == "" | localStorage.getItem("suggest") == "n") {
		document.getElementById("suggest").innerHTML = "";
		return;
	}
	var q = document.getElementById("q").value
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

function getMeta(opt) {
	var id = getClickedId(window.location.href, "#w#");
	var fullUrl = "https://youtube.com/watch?v=" + id;
	if (opt == "a" | !opt) {
		var url = "https://coorsproxyunlimited.herokuapp.com/http://normandotmp4.electrohaxz.tk:9019/?md=1&url=" + fullUrl;
 	} else if (opt == "b"){
 		var url = "https://vidpolaris.herokuapp.com/?md=1&url=" + fullUrl;
 	} else if (opt == "c") {
 		var url = "https://vidpolaris-europe.herokuapp.com/?md=1&url=" + fullUrl;
 	}
	const http = new XMLHttpRequest();
 	http.open("GET", url);
 	http.send();
 	http.timeout = 7000;
 	http.ontimeout = () => {
 		getMeta(opt);
 	}
 	http.onload=(e)=>{
 		var jsond = JSON.parse(http.responseText);
 		if (!jsond.meta.views) {
 			getMeta(opt);
 			return;
 		}
 		var view = jsond.meta.views.toLocaleString();
 		if (!jsond.meta.dislikeCount) {
 			var dlik = 0;
 		} else {
 			var dlik = jsond.meta.dislikeCount.toLocaleString();
 		}
 		if (!jsond.meta.likeCount) {
 			var like = 0;
 		} else {
 			var like = jsond.meta.likeCount.toLocaleString();
 		}
		if (jsond.meta.subText) {
			document.getElementById("subText").innerHTML = "[" + jsond.meta.subText + " subscribers]";
		} else {
			document.getElementById("subText").innerHTML = "";
		}
 		var totl = jsond.meta.dislikeCount + jsond.meta.likeCount;
		sessionStorage.setItem("total", totl.toLocaleString());
 		if (!totl == 0){
 			var untRatio = jsond.meta.likeCount / totl;
 			var percent = 100 * untRatio;
 			var ratio = percent.toPrecision(4); 
			sessionStorage.setItem("ratio", ratio);
		} else {
			var ratio = 0;
			sessionStorage.setItem("ratio", ratio);
		}
		if (jsond.meta.unlisted == false) {
			document.getElementById("ulIco").style.display = "none";
			document.getElementById("title").style = "margin:0;"
		} else {
			document.getElementById("ulIco").style.display = "";
			document.getElementById("title").style = "margin-top:-27px;margin-left:25px;"
		}
		document.getElementById("viewNum").innerHTML = view;
		document.getElementById("likeNum").innerHTML = like;
		document.getElementById("dlikNum").innerHTML = dlik;
		document.getElementById("ldRatio").innerHTML = ratio;
		document.getElementById("vidViews").style.display = "";
		document.getElementById("vidRatings").style.display = "";
		document.getElementById("subText").style.display = "";
	}
}

function swap(intent) {
	if (intent == "over") {
		if (sessionStorage.getItem("total")) {
			document.getElementById("ldTail").innerHTML = " total";
			document.getElementById("ldRatio").innerHTML = sessionStorage.getItem("total");
		} else {
			return;
		}
	} else if (intent == "off") {
		if (sessionStorage.getItem("ratio")) {
			document.getElementById("ldTail").innerHTML = "% ratio";
			document.getElementById("ldRatio").innerHTML = sessionStorage.getItem("ratio");
		} else {
			return;
		}
	}
}

function openAbout() {
	document.getElementById("aboutPage").style.display = "";
	document.getElementById("newUps").style.display = "none";
	document.getElementById("allUploadsPage").style.display = "none";
	document.getElementById("recentUploads").style.display = "none";
}

function embedNoCookie() {
	document.getElementById("playerContainer").style.display = "none";
	document.getElementById("player").pause();
	document.getElementById("embedContainer").style.display = "";
	document.getElementById("loadErr").style.display = "none";
	document.getElementById("theat_native").style.display = "none";
	document.getElementById("theat_embed").style.display = "";
	var iframe = document.createElement("IFRAME");
	iframe.src = "https://www.youtube-nocookie.com/embed/" + getClickedId(window.location.href, "#w#") + "/?autoplay=true";
	iframe.allowfullscreen = "allowfullscreen";
	iframe.style = "height:645px;width:60%";
	iframe.id = "frame";
	document.getElementById("embedContainer").appendChild(iframe);
	var p = document.createElement("P");
	p.innerHTML = "<b>certain</b> keyboard shortcuts do not work with embeds currently.";
	p.classList.add("stat");
	document.getElementById("embedPlayer").style.display = "none";
	document.getElementById("refreshBtn").style.display = "";
	document.getElementById("qSelector").style.display = "none";
	document.getElementById("speedSelector").style.display = "none";
	document.getElementById("embedContainer").appendChild(p);
}

function range(start, end) {
	return Array(end - start + 1).fill().map((_, idx) => start + idx)
}

function preset(d) {
	if (!d) {
		return;
	} else {
		if (d == "preformance") {
			document.getElementById("sq").value = "n";
			document.getElementById("suggest").value = "n";
			document.getElementById("autoComm").value = "n";
			document.getElementById("disableCards").value = "y";
		} else if (d == "dataHeavy") {
			document.getElementById("sq").value = "y";
			document.getElementById("suggest").value = "y";
			document.getElementById("autoComm").value = "y";
			document.getElementById("disableCards").value = "n";
		} else if (d == "default") {
			document.getElementById("sq").value = "y";
			document.getElementById("theme").value = "d_v1";
			document.getElementById("server").value = "a";
			document.getElementById("suggest").value = "y";
			document.getElementById("country").value = "us";
			document.getElementById("autoComm").value = "y";
			document.getElementById("disableCards").value = "n";
		}
	}
}