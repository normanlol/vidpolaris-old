resize();
getTrending();
keepProg();
refresh();

// settings checkers

if (sessionStorage.getItem("currentlyRunningT")) {
	sessionStorage.removeItem("currentlyRunningT");
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

if (!localStorage.getItem("theme")) {
	localStorage.setItem("theme" , "d");
	document.getElementById("wTheme").value = "d";
} else {
	document.getElementById("wTheme").value = localStorage.getItem("theme");
}

if (!localStorage.getItem("smart")) {
	localStorage.setItem("smart" , "y");
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

if (!localStorage.getItem("sLoc")) {
	localStorage.setItem("sLoc", "a");
	document.getElementById("server").value = "a";
} else {
	document.getElementById("server").value = localStorage.getItem("sLoc");
}

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
				document.getElementById("audioPlayer").currentTime = document.getElementById("audioPlayer").currentTime - 10
			}
		} else if (key == 'k' || key == 'K' || key == 75) {
			if (!document.getElementById("player").paused) {
				document.getElementById('player').pause();
			} else {
				document.getElementById('player').play();
			}
		} else if (key == 'l' || key == 'L' || key == 76) {
			document.getElementById("player").currentTime = document.getElementById("player").currentTime + 10;
			if (localStorage.getItem('smart') == 'y') {
				document.getElementById("audioPlayer").currentTime = document.getElementById("audioPlayer").currentTime + 10
			}
		} else if (key == 't' || key == 'T' || key == 84) {
			theatre();
		} else if (key == 'f' || key == 'F' || key == 70) {
			if (!sessionStorage.getItem("fullscreen") | sessionStorage.getItem("fullscreen") == 'n') {
				document.getElementById("player").requestFullscreen();
				sessionStorage.setItem('fullscreen', 'y')
			} else {
				document.exitFullscreen();
				sessionStorage.setItem('fullscreen', 'n')
			}
		}
	}
});

document.getElementById("player").onerror = function(e){
	document.getElementById("playerContainer").style.display = 'none';
	document.getElementById("loadErr").style.display = '';
};

document.getElementById("audioPlayer").onerror = function(e){
	document.getElementById("playerContainer").style.display = 'none';
	document.getElementById("loadErr").style.display = '';
};

console.log("autoplay: " + localStorage.getItem('autoplay'))
console.log("smartQual: " + localStorage.getItem('smart'))
console.log("server: " + localStorage.getItem('sLoc'))

// end onload functions

function resize() {
	var w = window.innerWidth;
	if (!localStorage.getItem("theme") | localStorage.getItem("theme") == "d") {
		if (!localStorage.getItem("theme")) {
			localStorage.setItem("theme" , "d");
		}
		if (w < 1200) {
			document.getElementById("theme").href = "css/mobile.css";
			if (localStorage.getItem("theater") == "n") {
				theatre();
			}
		} else if (w < 1430) {
			document.getElementById("theme").href = "css/smaller.css";
		} else {
			document.getElementById("theme").href = "css/style.css";
		}
	} else {
		if (w < 1200) {
			document.getElementById("theme").href = "css/white/mobile.css";
			if (localStorage.getItem("theater") == "n") {
				theatre();
			}
		} else if (w < 1430) {
			document.getElementById("theme").href = "css/white/smaller.css";
		} else {
			document.getElementById("theme").href = "css/white/style.css";
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
	http.onreadystatechange=(e)=>{
		var jsond = JSON.parse(http.responseText);
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
		if (jsond.searchResults.items[0]) {
			document.getElementById("re01").style.display = '';
			var r01L = "#w#" + jsond.searchResults.items[0].link.substring(32);
			var r01Th = jsond.searchResults.items[0].thumbnail;
			var r01Au = jsond.searchResults.items[0].author.name;
			var r01Ti = jsond.searchResults.items[0].title;
			var r01Da = jsond.searchResults.items[0].uploaded_at;
			var r01De = jsond.searchResults.items[0].description;
			var r01Du = jsond.searchResults.items[0].duration;
			document.getElementById("re01Du").innerHTML = r01Du;
			document.getElementById("re01Da").innerHTML = r01Da;
			document.getElementById("re01De").innerHTML = r01De;
			if (!jsond.searchResults.items[0].views | jsond.searchResults.items[0].views == null) {
				var r01Vi = "[Not available]"
			} else {
				var r01Vi = jsond.searchResults.items[0].views.toLocaleString();
			}
			document.getElementById("re01").href = r01L;
			document.getElementById("re01Ti").innerHTML = r01Ti;
			document.getElementById("re01Th").src = r01Th;
			document.getElementById("re01Au").innerHTML = r01Au;
			document.getElementById("re01Vi").innerHTML = r01Vi;
			if (jsond.searchResults.items[1]) {
				document.getElementById("re02").style.display = '';
				var r02L = "#w#" + jsond.searchResults.items[1].link.substring(32);
				var r02Th = jsond.searchResults.items[1].thumbnail;
				var r02Au = jsond.searchResults.items[1].author.name;
				var r02Ti = jsond.searchResults.items[1].title;
				var r02Da = jsond.searchResults.items[1].uploaded_at;
				var r02De = jsond.searchResults.items[1].description;
				var r02Du = jsond.searchResults.items[1].duration;
				document.getElementById("re02Du").innerHTML = r02Du;
				document.getElementById("re02Da").innerHTML = r02Da;
				document.getElementById("re02De").innerHTML = r02De;
				if (!jsond.searchResults.items[1].views | jsond.searchResults.items[1].views == null) {
					var r02Vi = "[Not available]"
				} else {
					var r02Vi = jsond.searchResults.items[1].views.toLocaleString();
				}
				document.getElementById("re02").href = r02L;
				document.getElementById("re02Ti").innerHTML = r02Ti;
				document.getElementById("re02Th").src = r02Th;
				document.getElementById("re02Au").innerHTML = r02Au;
				document.getElementById("re02Vi").innerHTML = r02Vi;
				if (jsond.searchResults.items[2]) {
					document.getElementById("re03").style.display = '';
					var r03L = "#w#" + jsond.searchResults.items[2].link.substring(32);
					var r03Th = jsond.searchResults.items[2].thumbnail;
					var r03Au = jsond.searchResults.items[2].author.name;
					var r03Ti = jsond.searchResults.items[2].title;
					var r03Da = jsond.searchResults.items[2].uploaded_at;
					var r03De = jsond.searchResults.items[2].description;
					var r03Du = jsond.searchResults.items[2].duration;
					document.getElementById("re03Du").innerHTML = r03Du;
					document.getElementById("re03Da").innerHTML = r03Da;
					document.getElementById("re03De").innerHTML = r03De;
					if (!jsond.searchResults.items[2].views | jsond.searchResults.items[2].views == null) {
						var r03Vi = "[Not available]"
					} else {
						var r03Vi = jsond.searchResults.items[2].views.toLocaleString();
					}
					document.getElementById("re03").href = r03L;
					document.getElementById("re03Ti").innerHTML = r03Ti;
					document.getElementById("re03Th").src = r03Th;
					document.getElementById("re03Au").innerHTML = r03Au;
					document.getElementById("re03Vi").innerHTML = r03Vi;
					if (jsond.searchResults.items[3]) {
						document.getElementById("re04").style.display = '';
						var r04L = "#w#" + jsond.searchResults.items[3].link.substring(32);
						var r04Th = jsond.searchResults.items[3].thumbnail;
						var r04Au = jsond.searchResults.items[3].author.name;
						var r04Ti = jsond.searchResults.items[3].title;
						var r04Da = jsond.searchResults.items[3].uploaded_at;
						var r04De = jsond.searchResults.items[3].description;
						var r04Du = jsond.searchResults.items[3].duration;
						document.getElementById("re04Du").innerHTML = r04Du;
						document.getElementById("re04Da").innerHTML = r04Da;
						document.getElementById("re04De").innerHTML = r04De;
						if (!jsond.searchResults.items[3].views | jsond.searchResults.items[3].views == null) {
							var r04Vi = "[Not available]"
						} else {
							var r04Vi = jsond.searchResults.items[3].views.toLocaleString();
						}
						document.getElementById("re04").href = r04L;
						document.getElementById("re04Ti").innerHTML = r04Ti;
						document.getElementById("re04Th").src = r04Th;
						document.getElementById("re04Au").innerHTML = r04Au;
						document.getElementById("re04Vi").innerHTML = r04Vi;
						if (jsond.searchResults.items[4]) {
							document.getElementById("re05").style.display = '';
							var r05L = "#w#" + jsond.searchResults.items[4].link.substring(32);
							var r05Th = jsond.searchResults.items[4].thumbnail;
							var r05Au = jsond.searchResults.items[4].author.name;
							var r05Ti = jsond.searchResults.items[4].title;
							var r05Da = jsond.searchResults.items[4].uploaded_at;
							var r05De = jsond.searchResults.items[4].description;
							var r05Du = jsond.searchResults.items[4].duration;
							document.getElementById("re05Du").innerHTML = r05Du;
							document.getElementById("re05Da").innerHTML = r05Da;
							document.getElementById("re05De").innerHTML = r05De;
							if (!jsond.searchResults.items[4].views | jsond.searchResults.items[4].views == null) {
								var r05Vi = "[Not available]"
							} else {
								var r05Vi = jsond.searchResults.items[4].views.toLocaleString();
							}
							document.getElementById("re05").href = r05L;
							document.getElementById("re05Ti").innerHTML = r05Ti;
							document.getElementById("re05Th").src = r05Th;
							document.getElementById("re05Au").innerHTML = r05Au;
							document.getElementById("re05Vi").innerHTML = r05Vi;
							if (jsond.searchResults.items[5]) {
								document.getElementById("re06").style.display = '';
								var r06L = "#w#" + jsond.searchResults.items[5].link.substring(32);
								var r06Th = jsond.searchResults.items[5].thumbnail;
								var r06Au = jsond.searchResults.items[5].author.name;
								var r06Ti = jsond.searchResults.items[5].title;
								var r06Da = jsond.searchResults.items[5].uploaded_at;
								var r06De = jsond.searchResults.items[5].description;
								var r06Du = jsond.searchResults.items[5].duration;
								document.getElementById("re06Du").innerHTML = r06Du;
								document.getElementById("re06Da").innerHTML = r06Da;
								document.getElementById("re06De").innerHTML = r06De;
								if (!jsond.searchResults.items[5].views | jsond.searchResults.items[5].views == null) {
									var r06Vi = "[Not available]"
								} else {
									var r06Vi = jsond.searchResults.items[5].views.toLocaleString();
								}
								document.getElementById("re06").href = r06L;
								document.getElementById("re06Ti").innerHTML = r06Ti;
								document.getElementById("re06Th").src = r06Th;
								document.getElementById("re06Au").innerHTML = r06Au;
								document.getElementById("re06Vi").innerHTML = r06Vi;
								if (jsond.searchResults.items[6]) {
									document.getElementById("re07").style.display = '';
									var r07L = "#w#" + jsond.searchResults.items[6].link.substring(32);
									var r07Th = jsond.searchResults.items[6].thumbnail;
									var r07Au = jsond.searchResults.items[6].author.name;
									var r07Ti = jsond.searchResults.items[6].title;
									var r07Da = jsond.searchResults.items[6].uploaded_at;
									var r07De = jsond.searchResults.items[6].description;
									var r07Du = jsond.searchResults.items[6].duration;
									document.getElementById("re07Du").innerHTML = r07Du;
									document.getElementById("re07Da").innerHTML = r07Da;
									document.getElementById("re07De").innerHTML = r07De;
									if (!jsond.searchResults.items[6].views | jsond.searchResults.items[6].views == null) {
										var r07Vi = "[Not available]"
									} else {
										var r07Vi = jsond.searchResults.items[6].views.toLocaleString();
									}
									document.getElementById("re07").href = r07L;
									document.getElementById("re07Vi").innerHTML = r07Vi;
									document.getElementById("re07Ti").innerHTML = r07Ti;
									document.getElementById("re07Th").src = r07Th;
									document.getElementById("re07Au").innerHTML = r07Au;
									document.getElementById("re07Vi").innerHTML = r07Vi;
									if (jsond.searchResults.items[7]) {
										var r08L = "#w#" + jsond.searchResults.items[7].link.substring(32);
										var r08Th = jsond.searchResults.items[7].thumbnail;
										var r08Au = jsond.searchResults.items[7].author.name;
										var r08Ti = jsond.searchResults.items[7].title;
										var r08Da = jsond.searchResults.items[7].uploaded_at;
										var r08De = jsond.searchResults.items[7].description;
										var r08Du = jsond.searchResults.items[7].duration;
										document.getElementById("re08Du").innerHTML = r08Du;
										document.getElementById("re08Da").innerHTML = r08Da;
										document.getElementById("re08De").innerHTML = r08De;
										if (!jsond.searchResults.items[7].views | jsond.searchResults.items[7].views == null) {
											var r08Vi = "[Not available]"
										} else {
											var r08Vi = jsond.searchResults.items[7].views.toLocaleString();
										}
										document.getElementById("re08").href = r08L;
										document.getElementById("re08Ti").innerHTML = r08Ti;
										document.getElementById("re08Th").src = r08Th;
										document.getElementById("re08Au").innerHTML = r08Au
										document.getElementById("re08Vi").innerHTML = r08Vi;
										if (jsond.searchResults[8]) {
											document.getElementById("re09").style.display = '';
											var r09L = "#w#" + jsond.searchResults.items[8].link.substring(32);
											var r09Th = jsond.searchResults.items[8].thumbnail;
											var r09Au = jsond.searchResults.items[8].author.name;
											var r09Ti = jsond.searchResults.items[8].title;
											var r09Da = jsond.searchResults.items[8].uploaded_at;
											var r09De = jsond.searchResults.items[8].description;
											var r09Du = jsond.searchResults.items[8].duration;
											document.getElementById("re09Du").innerHTML = r09Du;
											document.getElementById("re09Da").innerHTML = r09Da;
											document.getElementById("re09De").innerHTML = r09De;
											if (!jsond.searchResults.items[8].views | jsond.searchResults.items[8].views == null) {
												var r09Vi = "[Not available]"
											} else {
												var r09Vi = jsond.searchResults.items[8].views.toLocaleString();
											}
											document.getElementById("re09").href = r09L;
											document.getElementById("re09Ti").innerHTML = r09Ti;
											document.getElementById("re09Th").src = r09Th;
											document.getElementById("re09Au").innerHTML = r09Au;
											document.getElementById("re09Vi").innerHTML = r09Vi;
											if (jsond.searchResults.items[9]) {
												document.getElementById("re10").style.display = '';
												var r10L = "#w#" + jsond.searchResults.items[9].link.substring(32);
												var r10Th = jsond.searchResults.items[9].thumbnail;
												var r10Au = jsond.searchResults.items[9].author.name;
												var r10Ti = jsond.searchResults.items[9].title;
												var r10Da = jsond.searchResults.items[9].uploaded_at;
												var r10De = jsond.searchResults.items[9].description;
												var r10Du = jsond.searchResults.items[9].duration;
												document.getElementById("re10Du").innerHTML = r10Du;
												document.getElementById("re10Da").innerHTML = r10Da;
												document.getElementById("re10De").innerHTML = r10De;
												if (!jsond.searchResults.items[9].views | jsond.searchResults.items[9].views == null) {
													var r10Vi = "[Not available]"
												} else {
													var r10Vi = jsond.searchResults.items[9].views.toLocaleString();
												}
												document.getElementById("re10").href = r10L;
												document.getElementById("re10Ti").innerHTML = r10Ti;
												document.getElementById("re10Th").src = r10Th;
												document.getElementById("re10Au").innerHTML = r10Au;
												document.getElementById("re10Vi").innerHTML = r10Vi;
											} else {
												document.getElementById("re10").style.display = 'none';
											}
										} else {
											document.getElementById("re09").style.display = 'none';
											document.getElementById("re10").style.display = 'none';
										}
									} else {
										document.getElementById("re08").style.display = 'none';
										document.getElementById("re09").style.display = 'none';
										document.getElementById("re10").style.display = 'none';
									}
								} else {
									document.getElementById("re07").style.display = 'none';
									document.getElementById("re08").style.display = 'none';
									document.getElementById("re09").style.display = 'none';
									document.getElementById("re10").style.display = 'none';
								}
							} else {
								document.getElementById("re06").style.display = 'none';
								document.getElementById("re07").style.display = 'none';
								document.getElementById("re08").style.display = 'none';
								document.getElementById("re09").style.display = 'none';
								document.getElementById("re10").style.display = 'none';
							}
						} else {
							document.getElementById("re05").style.display = 'none';
							document.getElementById("re06").style.display = 'none';
							document.getElementById("re07").style.display = 'none';
							document.getElementById("re08").style.display = 'none';
							document.getElementById("re09").style.display = 'none';
							document.getElementById("re10").style.display = 'none';
						}
					} else {
						document.getElementById("re04").style.display = 'none';
						document.getElementById("re05").style.display = 'none';
						document.getElementById("re06").style.display = 'none';
						document.getElementById("re07").style.display = 'none';
						document.getElementById("re08").style.display = 'none';
						document.getElementById("re09").style.display = 'none';
						document.getElementById("re10").style.display = 'none';
					}
				} else {
					document.getElementById("re03").style.display = 'none';
					document.getElementById("re04").style.display = 'none';
					document.getElementById("re05").style.display = 'none';
					document.getElementById("re06").style.display = 'none';
					document.getElementById("re07").style.display = 'none';
					document.getElementById("re08").style.display = 'none';
					document.getElementById("re09").style.display = 'none';
					document.getElementById("re10").style.display = 'none';
				}
			} else {
				document.getElementById("re02").style.display = 'none';
				document.getElementById("re03").style.display = 'none';
				document.getElementById("re04").style.display = 'none';
				document.getElementById("re05").style.display = 'none';
				document.getElementById("re06").style.display = 'none';
				document.getElementById("re07").style.display = 'none';
				document.getElementById("re08").style.display = 'none';
				document.getElementById("re09").style.display = 'none';
				document.getElementById("re10").style.display = 'none';
			}
		} else {
			document.getElementById("errorPage").style.display = '';
			document.getElementById("errorTxt").innerHTML = "no results were found."
			document.getElementById("vidPage").style.display = 'none';
			document.getElementById("nsWarnPage").style.display = 'none';
			document.getElementById("settingsPage").style.display = 'none';
			document.getElementById("searchPage").style.display = 'none';
			document.getElementById("homePage").style.display = 'none';
			document.getElementById("bannerPfpContainer").style.display = 'none';
		}
		document.getElementById("seaLoader").style.display = 'none';
		document.getElementById("resultsContainer").style.display = '';
		document.getElementById("searchContainer").style.display = '';
	}
}

function feelingLucky() {
	document.getElementById("homePage").style.display = 'none';
	document.getElementById("searchContainer").style.display = 'none';
	document.getElementById("vidPage").style.display = '';
	document.getElementById("vidLoader").style.display = '';
	var q = document.getElementById("q").value;
	const http = new XMLHttpRequest();
	const sUrl = "https://coorsproxyunlimited.herokuapp.com/http://normandotmp4.electrohaxz.tk:9019/?search=" + encodeURIComponent(q);
	http.open("GET", sUrl);
	http.send();
	http.onreadystatechange=(e)=>{
		var jsond = JSON.parse(http.responseText);
		if (!jsond) {
			home();
			return;
		}
		var wLink = jsond.searchResults.items[0].link;
		var link2 = wLink.substring(32);
		window.open("#w#" + link2, "_self");
	}
}

function getTrending() {
	const http = new XMLHttpRequest();
	var url = "https://coorsproxyunlimited.herokuapp.com/https://invidio.us/api/v1/trending"
	http.open("GET", url);
	http.send();
	http.onreadystatechange=(e)=>{
		var jsond = JSON.parse(http.responseText);
		if (jsond[0].title.length >= 75) {
			document.getElementById("t1").innerHTML = jsond[0].title.substring(0,75) + "...";
		} else {
			document.getElementById("t1").innerHTML = jsond[0].title;
		}
		document.getElementById("l1").href = "#w#" + jsond[0].videoId;
		document.getElementById("r1").src = jsond[0].videoThumbnails[0].url;
		document.getElementById("a1").innerHTML = jsond[0].author;
		document.getElementById("d1").innerHTML = jsond[0].publishedText;
		if (jsond[1].title.length >= 75) {
			document.getElementById("t2").innerHTML = jsond[1].title.substring(0,75) + "...";
		} else {
			document.getElementById("t2").innerHTML = jsond[1].title;
		}
		document.getElementById("l2").href = "#w#" + jsond[1].videoId;
		document.getElementById("r2").src = jsond[1].videoThumbnails[0].url;
		document.getElementById("a2").innerHTML = jsond[1].author;
		document.getElementById("d2").innerHTML = jsond[1].publishedText;
		if (jsond[2].title.length >= 75) {
			document.getElementById("t3").innerHTML = jsond[2].title.substring(0,75) + "...";
		} else {
			document.getElementById("t3").innerHTML = jsond[2].title;
		}
		document.getElementById("l3").href = "#w#" + jsond[2].videoId;
		document.getElementById("r3").src = jsond[2].videoThumbnails[0].url;
		document.getElementById("a3").innerHTML = jsond[2].author;
		document.getElementById("d3").innerHTML = jsond[2].publishedText;
		if (jsond[3].title.length >= 75) {
			document.getElementById("t4").innerHTML = jsond[3].title.substring(0,75) + "...";
		} else {
			document.getElementById("t4").innerHTML = jsond[3].title;
		}
		document.getElementById("l4").href = "#w#" + jsond[3].videoId;
		document.getElementById("r4").src = jsond[3].videoThumbnails[0].url;
		document.getElementById("a4").innerHTML = jsond[3].author;
		document.getElementById("d4").innerHTML = jsond[3].publishedText;
		if (jsond[3].title.length >= 75) {
			document.getElementById("t5").innerHTML = jsond[4].title.substring(0,75) + "...";
		} else {
			document.getElementById("t5").innerHTML = jsond[4].title;
		}
		document.getElementById("l5").href = "#w#" + jsond[4].videoId;
		document.getElementById("r5").src = jsond[4].videoThumbnails[0].url;
		document.getElementById("a5").innerHTML = jsond[4].author;
		document.getElementById("d5").innerHTML = jsond[4].publishedText;
		if (jsond[5].title.length >= 75) {
			document.getElementById("t6").innerHTML = jsond[5].title.substring(0,75) + "...";
		} else {
			document.getElementById("t6").innerHTML = jsond[5].title;
		}
		document.getElementById("l6").href = "#w#" + jsond[5].videoId;
		document.getElementById("r6").src = jsond[5].videoThumbnails[0].url;
		document.getElementById("a6").innerHTML = jsond[5].author;
		document.getElementById("d6").innerHTML = jsond[5].publishedText;
		if (jsond[6].title.length >= 75) {
			document.getElementById("t7").innerHTML = jsond[6].title.substring(0,75) + "...";
		} else {
			document.getElementById("t7").innerHTML = jsond[6].title;
		}
		document.getElementById("l7").href = "#w#" + jsond[6].videoId;
		document.getElementById("r7").src = jsond[6].videoThumbnails[0].url;
		document.getElementById("a7").innerHTML = jsond[6].author;
		document.getElementById("d7").innerHTML = jsond[6].publishedText;
		if (jsond[7].title.length >= 75) {
			document.getElementById("t8").innerHTML = jsond[7].title.substring(0,75) + "...";
		} else {
			document.getElementById("t8").innerHTML = jsond[7].title;
		}
		document.getElementById("l8").href = "#w#" + jsond[7].videoId;
		document.getElementById("r8").src = jsond[7].videoThumbnails[0].url;
		document.getElementById("a8").innerHTML = jsond[7].author;
		document.getElementById("d8").innerHTML = jsond[7].publishedText;
		if (jsond[8].title.length >= 75) {
			document.getElementById("t9").innerHTML = jsond[8].title.substring(0,75) + "...";
		} else {
			document.getElementById("t9").innerHTML = jsond[8].title;
		}
		document.getElementById("l9").href = "#w#" + jsond[8].videoId;
		document.getElementById("r9").src = jsond[8].videoThumbnails[0].url;
		document.getElementById("a9").innerHTML = jsond[8].author;
		document.getElementById("d9").innerHTML = jsond[8].publishedText;
		if (jsond[9].title.length >= 75) {
			document.getElementById("t10").innerHTML = jsond[9].title.substring(0,75) + "...";
		} else {
			document.getElementById("t10").innerHTML = jsond[9].title;
		}
		document.getElementById("l10").href = "#w#" + jsond[9].videoId;
		document.getElementById("r10").src = jsond[9].videoThumbnails[0].url;
		document.getElementById("a10").innerHTML = jsond[9].author;
		document.getElementById("d10").innerHTML = jsond[9].publishedText;
		if (jsond[10].title.length >= 75) {
			document.getElementById("t11").innerHTML = jsond[10].title.substring(0,75) + "...";
		} else {
			document.getElementById("t11").innerHTML = jsond[10].title;
		}
		document.getElementById("l11").href = "#w#" + jsond[10].videoId;
		document.getElementById("r11").src = jsond[10].videoThumbnails[0].url;
		document.getElementById("a11").innerHTML = jsond[10].author;
		document.getElementById("d11").innerHTML = jsond[10].publishedText;
		if (jsond[11].title.length >= 75) {
			document.getElementById("t12").innerHTML = jsond[11].title.substring(0,75) + "...";
		} else {
			document.getElementById("t12").innerHTML = jsond[11].title;
		}
		document.getElementById("l12").href = "#w#" + jsond[11].videoId;
		document.getElementById("r12").src = jsond[11].videoThumbnails[0].url;
		document.getElementById("a12").innerHTML = jsond[11].author;
		document.getElementById("d12").innerHTML = jsond[11].publishedText;
		document.getElementById("l13").href = "#w#" + jsond[12].videoId;
		if (jsond[12].title.length >= 75) {
			document.getElementById("t13").innerHTML = jsond[12].title.substring(0,75) + "...";
		} else {
			document.getElementById("t13").innerHTML = jsond[12].title;
		}
		document.getElementById("r13").src = jsond[12].videoThumbnails[0].url;
		document.getElementById("a13").innerHTML = jsond[12].author;
		document.getElementById("d13").innerHTML = jsond[12].publishedText;
		document.getElementById("l14").href = "#w#" + jsond[13].videoId;
		if (jsond[13].title.length >= 75) {
			document.getElementById("t14").innerHTML = jsond[13].title.substring(0,75) + "...";
		} else {
			document.getElementById("t14").innerHTML = jsond[13].title;
		}
		document.getElementById("r14").src = jsond[13].videoThumbnails[0].url;
		document.getElementById("a14").innerHTML = jsond[13].author;
		document.getElementById("d14").innerHTML = jsond[13].publishedText;
		document.getElementById("l15").href = "#w#" + jsond[14].videoId;
		if (jsond[14].title.length >= 75) {
			document.getElementById("t15").innerHTML = jsond[14].title.substring(0,75) + "...";
		} else {
			document.getElementById("t15").innerHTML = jsond[14].title;
		}
		document.getElementById("r15").src = jsond[14].videoThumbnails[0].url;
		document.getElementById("a15").innerHTML = jsond[14].author;
		document.getElementById("d15").innerHTML = jsond[14].publishedText;
		document.getElementById("l16").href = "#w#" + jsond[15].videoId;
		if (jsond[15].title.length >= 75) {
			document.getElementById("t16").innerHTML = jsond[15].title.substring(0,75) + "...";
		} else {
			document.getElementById("t16").innerHTML = jsond[15].title;
		}
		document.getElementById("r16").src = jsond[15].videoThumbnails[0].url;
		document.getElementById("a16").innerHTML = jsond[15].author;
		document.getElementById("d16").innerHTML = jsond[15].publishedText;
		document.getElementById("l17").href = "#w#" + jsond[16].videoId;
		if (jsond[16].title.length >= 75) {
			document.getElementById("t17").innerHTML = jsond[16].title.substring(0,75) + "...";
		} else {
			document.getElementById("t17").innerHTML = jsond[16].title;
		}
		document.getElementById("r17").src = jsond[16].videoThumbnails[0].url;
		document.getElementById("a17").innerHTML = jsond[16].author;
		document.getElementById("d17").innerHTML = jsond[16].publishedText;
		document.getElementById("l18").href = "#w#" + jsond[17].videoId;
		if (jsond[17].title.length >= 75) {
			document.getElementById("t18").innerHTML = jsond[17].title.substring(0,75) + "...";
		} else {
			document.getElementById("t18").innerHTML = jsond[17].title;
		}
		document.getElementById("r18").src = jsond[17].videoThumbnails[0].url;
		document.getElementById("a18").innerHTML = jsond[17].author;
		document.getElementById("d18").innerHTML = jsond[17].publishedText;
		document.getElementById("l19").href = "#w#" + jsond[18].videoId;
		if (jsond[18].title.length >= 75) {
			document.getElementById("t19").innerHTML = jsond[18].title.substring(0,75) + "...";
		} else {
			document.getElementById("t19").innerHTML = jsond[18].title;
		}
		document.getElementById("r19").src = jsond[18].videoThumbnails[0].url;
		document.getElementById("a19").innerHTML = jsond[18].author;
		document.getElementById("d19").innerHTML = jsond[18].publishedText;
		document.getElementById("l20").href = "#w#" + jsond[19].videoId;
		if (jsond[19].title.length >= 75) {
			document.getElementById("t20").innerHTML = jsond[19].title.substring(0,75) + "...";
		} else {
			document.getElementById("t20").innerHTML = jsond[19].title;
		}
		document.getElementById("r20").src = jsond[19].videoThumbnails[0].url;
		document.getElementById("a20").innerHTML = jsond[19].author;
		document.getElementById("d20").innerHTML = jsond[19].publishedText;
		document.getElementById("l21").href = "#w#" + jsond[20].videoId;
		if (jsond[20].title.length >= 75) {
			document.getElementById("t21").innerHTML = jsond[20].title.substring(0,75) + "...";
		} else {
			document.getElementById("t21").innerHTML = jsond[20].title;
		}
		document.getElementById("r21").src = jsond[20].videoThumbnails[0].url;
		document.getElementById("a21").innerHTML = jsond[20].author;
		document.getElementById("d21").innerHTML = jsond[20].publishedText;
		document.getElementById("l22").href = "#w#" + jsond[21].videoId;
		if (jsond[21].title.length >= 75) {
			document.getElementById("t22").innerHTML = jsond[21].title.substring(0,75) + "...";
		} else {
			document.getElementById("t22").innerHTML = jsond[21].title;
		}
		document.getElementById("r22").src = jsond[21].videoThumbnails[0].url;
		document.getElementById("a22").innerHTML = jsond[21].author;
		document.getElementById("d22").innerHTML = jsond[21].publishedText;
		document.getElementById("l23").href = "#w#" + jsond[22].videoId;
		if (jsond[22].title.length >= 75) {
			document.getElementById("t23").innerHTML = jsond[22].title.substring(0,75) + "...";
		} else {
			document.getElementById("t23").innerHTML = jsond[22].title;
		}
		document.getElementById("r23").src = jsond[22].videoThumbnails[0].url;
		document.getElementById("a23").innerHTML = jsond[22].author;
		document.getElementById("d23").innerHTML = jsond[22].publishedText;
		document.getElementById("l24").href = "#w#" + jsond[23].videoId;
		document.getElementById("r24").src = jsond[23].videoThumbnails[0].url;
		document.getElementById("a24").innerHTML = jsond[23].author;
		document.getElementById("d24").innerHTML = jsond[23].publishedText;
		if (jsond[23].title.length >= 75) {
			document.getElementById("t24").innerHTML = jsond[23].title.substring(0,75) + "...";
		} else {
			document.getElementById("t24").innerHTML = jsond[23].title;
		}
		document.getElementById("trendingLoader").style.display = 'none';
		document.getElementById("trending").style.display = '';
	}
	http.onerror = function (error) {
		getTrending();
	}
}

function openVideo(opt) {
	setTimeout(function () {
		if (!window.location.href.includes("#w#")) {
			return;
		} else {
			document.title = "[loading...] vidpolaris";
			document.getElementById("homePage").style.display = 'none';
			document.getElementById("searchContainer").style.display = 'none';
			document.getElementById("searchPage").style.display = 'none';
			document.getElementById("settingsPage").style.display = 'none';
			document.getElementById("channelPage").style.display = 'none';
			document.getElementById("loadErr").style.display = 'none';
			document.getElementById("player").pause();
			document.getElementById("vidPage").style.display = '';
			document.getElementById("helpOut").style.display = '';
			document.getElementById("videoViewer").style.display = 'none';
			document.getElementById("vidLoader").style.display = '';
			document.getElementById("playerContainer").style.display = '';
			document.getElementById("sharBox").style.display = 'none';
			document.getElementById("qOptions").innerHTML = "";
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
			http.onreadystatechange=(e)=>{
				var jsond = JSON.parse(http.responseText);
				if (jsond.err) {
					notPlayable();
				} else {
					var wUrl = jsond.info.formats[0].url;
					var titl = jsond.info.player_response.videoDetails.title;
					var auth = jsond.info.player_response.videoDetails.author;
					var aLink = "#c#" + jsond.info.author.id;
					document.getElementById("authorL").href = aLink;
					var t = jsond.info.player_response.videoDetails.thumbnail.thumbnails;
					var thum = jsond.info.player_response.videoDetails.thumbnail.thumbnails[t.length - 1].url;
					var desc = jsond.info.player_response.videoDetails.shortDescription.replace(/\n/g, "<br>")
					var pDate = new Date(jsond.info.published);
					var month = pDate.getMonth() + 1;
					var day = pDate.getDate();
					var year = pDate.getFullYear();
					if (jsond.info.age_restricted == true) {
						showWarning();
					}
					if (!jsond.info.player_response.playabilityStatus.status == "OK") {
						notPlayable();
					}
					if (!jsond.info.player_response.cards) {
						document.getElementById("card1").style.display = 'none';
						document.getElementById("card2").style.display = 'none';
						document.getElementById("card3").style.display = 'none';
						document.getElementById("card4").style.display = 'none';
						document.getElementById("card5").style.display = 'none';
					} else {
						if (jsond.info.player_response.cards.cardCollectionRenderer.cards[0]) {
							if (jsond.info.player_response.cards.cardCollectionRenderer.cards[0].cardRenderer.content.videoInfoCardContentRenderer) {
								document.getElementById("card1").style.display = '';
								if (!jsond.info.player_response.cards.cardCollectionRenderer.cards[0].cardRenderer.content.videoInfoCardContentRenderer.customMessage) {
									document.getElementById("cardMessage1").innerHTML = jsond.info.player_response.cards.cardCollectionRenderer.cards[0].cardRenderer.content.videoInfoCardContentRenderer.videoTitle.simpleText || "[No message]";
									document.getElementById("cardLink1").href = "#w#" + jsond.info.player_response.cards.cardCollectionRenderer.cards[0].cardRenderer.content.videoInfoCardContentRenderer.action.watchEndpoint.videoId;
								} else {
									document.getElementById("cardMessage1").innerHTML = jsond.info.player_response.cards.cardCollectionRenderer.cards[0].cardRenderer.content.videoInfoCardContentRenderer.customMessage.simpleText;
									document.getElementById("cardLink1").href = "#w#" + jsond.info.player_response.cards.cardCollectionRenderer.cards[0].cardRenderer.content.videoInfoCardContentRenderer.action.watchEndpoint.videoId;
								}
							} else if (jsond.info.player_response.cards.cardCollectionRenderer.cards[0].cardRenderer.content.playlistInfoCardContentRenderer) {
								document.getElementById("card1").style.display = '';
								if (!jsond.info.player_response.cards.cardCollectionRenderer.cards[0].cardRenderer.content.playlistInfoCardContentRenderer.customMessage) {
									document.getElementById("cardMessage1").innerHTML = jsond.info.player_response.cards.cardCollectionRenderer.cards[0].cardRenderer.content.playlistInfoCardContentRenderer.playlistTitle.simpleText;
									document.getElementById("cardLink1").href = "https://youtube.com/playlist?list=" + jsond.info.player_response.cards.cardCollectionRenderer.cards[0].cardRenderer.content.playlistInfoCardContentRenderer.action.watchEndpoint.playlistId;
								} else {
									document.getElementById("cardMessage1").innerHTML = jsond.info.player_response.cards.cardCollectionRenderer.cards[0].cardRenderer.content.playlistInfoCardContentRenderer.customMessage.simpleText;
									document.getElementById("cardLink1").href = "https://youtube.com/playlist?list=" + jsond.info.player_response.cards.cardCollectionRenderer.cards[0].cardRenderer.content.playlistInfoCardContentRenderer.action.watchEndpoint.playlistId;
								}
							}
						} else {
							document.getElementById("card1").style.display = 'none';
							document.getElementById("card2").style.display = 'none';
							document.getElementById("card3").style.display = 'none';
							document.getElementById("card4").style.display = 'none';
							document.getElementById("card5").style.display = 'none';
						}
						if (jsond.info.player_response.cards.cardCollectionRenderer.cards[1]) {
							if (jsond.info.player_response.cards.cardCollectionRenderer.cards[1].cardRenderer.content.videoInfoCardContentRenderer) {
								document.getElementById("card2").style.display = '';
								if (!jsond.info.player_response.cards.cardCollectionRenderer.cards[1].cardRenderer.content.videoInfoCardContentRenderer.customMessage) {
									document.getElementById("cardMessage2").innerHTML = jsond.info.player_response.cards.cardCollectionRenderer.cards[1].cardRenderer.content.videoInfoCardContentRenderer.videoTitle.simpleText || "[No message]";
									document.getElementById("cardLink2").href = "#w#" + jsond.info.player_response.cards.cardCollectionRenderer.cards[1].cardRenderer.content.videoInfoCardContentRenderer.action.watchEndpoint.videoId;
								} else {
									document.getElementById("cardMessage2").innerHTML = jsond.info.player_response.cards.cardCollectionRenderer.cards[1].cardRenderer.content.videoInfoCardContentRenderer.customMessage.simpleText;
									document.getElementById("cardLink2").href = "#w#" + jsond.info.player_response.cards.cardCollectionRenderer.cards[1].cardRenderer.content.videoInfoCardContentRenderer.action.watchEndpoint.videoId;
								}
							} else if (jsond.info.player_response.cards.cardCollectionRenderer.cards[1].cardRenderer.content.playlistInfoCardContentRenderer) {
								document.getElementById("card2").style.display = '';
								if (!jsond.info.player_response.cards.cardCollectionRenderer.cards[1].cardRenderer.content.playlistInfoCardContentRenderer.customMessage) {
									document.getElementById("cardMessage2").innerHTML = jsond.info.player_response.cards.cardCollectionRenderer.cards[1].cardRenderer.content.playlistInfoCardContentRenderer.playlistTitle.simpleText;;
									document.getElementById("cardLink2").href = "https://youtube.com/playlist?list=" + jsond.info.player_response.cards.cardCollectionRenderer.cards[1].cardRenderer.content.playlistInfoCardContentRenderer.action.watchEndpoint.playlistId;
								} else {
									document.getElementById("cardMessage2").innerHTML = jsond.info.player_response.cards.cardCollectionRenderer.cards[1].cardRenderer.content.playlistInfoCardContentRenderer.customMessage.simpleText;
									document.getElementById("cardLink2").href = "https://youtube.com/playlist?list=" + jsond.info.player_response.cards.cardCollectionRenderer.cards[1].cardRenderer.content.playlistInfoCardContentRenderer.action.watchEndpoint.playlistId;
								}
							}
						} else {
							document.getElementById("card2").style.display = 'none';
							document.getElementById("card3").style.display = 'none';
							document.getElementById("card4").style.display = 'none';
							document.getElementById("card5").style.display = 'none';
						}
						if (jsond.info.player_response.cards.cardCollectionRenderer.cards[2]) {
							if (jsond.info.player_response.cards.cardCollectionRenderer.cards[2].cardRenderer.content.videoInfoCardContentRenderer) {
								document.getElementById("card3").style.display = '';
								if (!jsond.info.player_response.cards.cardCollectionRenderer.cards[2].cardRenderer.content.videoInfoCardContentRenderer.customMessage) {
									document.getElementById("cardMessage3").innerHTML = jsond.info.player_response.cards.cardCollectionRenderer.cards[2].cardRenderer.content.videoInfoCardContentRenderer.videoTitle.simpleText || "[No message]";
									document.getElementById("cardLink3").href = "#w#" + jsond.info.player_response.cards.cardCollectionRenderer.cards[2].cardRenderer.content.videoInfoCardContentRenderer.action.watchEndpoint.videoId;
								} else {
									document.getElementById("cardMessage3").innerHTML = jsond.info.player_response.cards.cardCollectionRenderer.cards[2].cardRenderer.content.videoInfoCardContentRenderer.customMessage.simpleText;
									document.getElementById("cardLink3").href = "#w#" + jsond.info.player_response.cards.cardCollectionRenderer.cards[2].cardRenderer.content.videoInfoCardContentRenderer.action.watchEndpoint.videoId;
								}
							} else if (jsond.info.player_response.cards.cardCollectionRenderer.cards[2].cardRenderer.content.playlistInfoCardContentRenderer) {
								document.getElementById("card3").style.display = '';
								if (!jsond.info.player_response.cards.cardCollectionRenderer.cards[2].cardRenderer.content.playlistInfoCardContentRenderer.customMessage) {
									document.getElementById("cardMessage3").innerHTML = jsond.info.player_response.cards.cardCollectionRenderer.cards[2].cardRenderer.content.playlistInfoCardContentRenderer.playlistTitle.simpleText;;
									document.getElementById("cardLink3").href = "https://youtube.com/playlist?list=" + jsond.info.player_response.cards.cardCollectionRenderer.cards[2].cardRenderer.content.playlistInfoCardContentRenderer.action.watchEndpoint.playlistId;
								} else {
									document.getElementById("cardMessage3").innerHTML = jsond.info.player_response.cards.cardCollectionRenderer.cards[2].cardRenderer.content.playlistInfoCardContentRenderer.customMessage.simpleText;
									document.getElementById("cardLink3").href = "https://youtube.com/playlist?list=" + jsond.info.player_response.cards.cardCollectionRenderer.cards[2].cardRenderer.content.playlistInfoCardContentRenderer.action.watchEndpoint.playlistId;
								}
							}
						} else {
							document.getElementById("card3").style.display = 'none';
							document.getElementById("card4").style.display = 'none';
							document.getElementById("card5").style.display = 'none';
						}
						if (jsond.info.player_response.cards.cardCollectionRenderer.cards[3]) {
							if (jsond.info.player_response.cards.cardCollectionRenderer.cards[3].cardRenderer.content.videoInfoCardContentRenderer) {
								document.getElementById("card4").style.display = '';
								if (!jsond.info.player_response.cards.cardCollectionRenderer.cards[3].cardRenderer.content.videoInfoCardContentRenderer.customMessage) {
									document.getElementById("cardMessage4").innerHTML = jsond.info.player_response.cards.cardCollectionRenderer.cards[3].cardRenderer.content.videoInfoCardContentRenderer.videoTitle.simpleText || "[No message]";
									document.getElementById("cardLink4").href = "#w#" + jsond.info.player_response.cards.cardCollectionRenderer.cards[3].cardRenderer.content.videoInfoCardContentRenderer.action.watchEndpoint.videoId;
								} else {
									document.getElementById("cardMessage4").innerHTML = jsond.info.player_response.cards.cardCollectionRenderer.cards[3].cardRenderer.content.videoInfoCardContentRenderer.customMessage.simpleText;
									document.getElementById("cardLink4").href = "#w#" + jsond.info.player_response.cards.cardCollectionRenderer.cards[3].cardRenderer.content.videoInfoCardContentRenderer.action.watchEndpoint.videoId;
								}
							} else if (jsond.info.player_response.cards.cardCollectionRenderer.cards[3].cardRenderer.content.playlistInfoCardContentRenderer) {
								document.getElementById("card4").style.display = '';
								if (!jsond.info.player_response.cards.cardCollectionRenderer.cards[3].cardRenderer.content.playlistInfoCardContentRenderer.customMessage) {
									document.getElementById("cardMessage4").innerHTML = jsond.info.player_response.cards.cardCollectionRenderer.cards[3].cardRenderer.content.playlistInfoCardContentRenderer.playlistTitle.simpleText;;
									document.getElementById("cardLink4").href = "https://youtube.com/playlist?list=" + jsond.info.player_response.cards.cardCollectionRenderer.cards[3].cardRenderer.content.playlistInfoCardContentRenderer.action.watchEndpoint.playlistId;
								} else {
									document.getElementById("cardMessage4").innerHTML = jsond.info.player_response.cards.cardCollectionRenderer.cards[3].cardRenderer.content.playlistInfoCardContentRenderer.customMessage.simpleText;
									document.getElementById("cardLink4").href = "https://youtube.com/playlist?list=" + jsond.info.player_response.cards.cardCollectionRenderer.cards[3].cardRenderer.content.playlistInfoCardContentRenderer.action.watchEndpoint.playlistId;
								}
							}
						} else {
							document.getElementById("card4").style.display = 'none';
							document.getElementById("card5").style.display = 'none';
						}
						if (jsond.info.player_response.cards.cardCollectionRenderer.cards[4]) {
							if (jsond.info.player_response.cards.cardCollectionRenderer.cards[4].cardRenderer.content.videoInfoCardContentRenderer) {
								document.getElementById("card5").style.display = '';
								if (!jsond.info.player_response.cards.cardCollectionRenderer.cards[4].cardRenderer.content.videoInfoCardContentRenderer.customMessage) {
									document.getElementById("cardMessage5").innerHTML = jsond.info.player_response.cards.cardCollectionRenderer.cards[4].cardRenderer.content.videoInfoCardContentRenderer.videoTitle.simpleText || "[No message]";
									document.getElementById("cardLink5").href = "#w#" + jsond.info.player_response.cards.cardCollectionRenderer.cards[4].cardRenderer.content.videoInfoCardContentRenderer.action.watchEndpoint.videoId;
								} else {
									document.getElementById("cardMessage5").innerHTML = jsond.info.player_response.cards.cardCollectionRenderer.cards[4].cardRenderer.content.videoInfoCardContentRenderer.customMessage.simpleText;
									document.getElementById("cardLink5").href = "#w#" + jsond.info.player_response.cards.cardCollectionRenderer.cards[4].cardRenderer.content.videoInfoCardContentRenderer.action.watchEndpoint.videoId;
								}
							} else if (jsond.info.player_response.cards.cardCollectionRenderer.cards[4].cardRenderer.content.playlistInfoCardContentRenderer) {
								document.getElementById("card5").style.display = '';
								if (!jsond.info.player_response.cards.cardCollectionRenderer.cards[4].cardRenderer.content.playlistInfoCardContentRenderer.customMessage) {
									document.getElementById("cardMessage5").innerHTML = jsond.info.player_response.cards.cardCollectionRenderer.cards[4].cardRenderer.content.playlistInfoCardContentRenderer.playlistTitle.simpleText;;
									document.getElementById("cardLink5").href = "https://youtube.com/playlist?list=" + jsond.info.player_response.cards.cardCollectionRenderer.cards[4].cardRenderer.content.playlistInfoCardContentRenderer.action.watchEndpoint.playlistId;
								} else {
									document.getElementById("cardMessage5").innerHTML = jsond.info.player_response.cards.cardCollectionRenderer.cards[4].cardRenderer.content.playlistInfoCardContentRenderer.customMessage.simpleText;
									document.getElementById("cardLink5").href = "https://youtube.com/playlist?list=" + jsond.info.player_response.cards.cardCollectionRenderer.cards[4].cardRenderer.content.playlistInfoCardContentRenderer.action.watchEndpoint.playlistId;
								}
							}
						} else {
							document.getElementById("card5").style.display = 'none';
						}
					}
					var cat = jsond.info.media.category;
					document.getElementById("cat").innerHTML = cat;
					if (!jsond.info.related_videos[0]) {
						document.getElementById("relatedVideos").style.display = 'none';
						document.getElementById("autoPlayBlock").style.display = 'none';
						document.getElementById("commentsContainer").style = "margin-top:0px";
					} else {
						document.getElementById("commentsContainer").style = "margin-top:75%";
						document.getElementById("commentsContainer").style = "margin-top:75%";
						document.getElementById("relatedVideos").style.display = '';
						document.getElementById("autoPlayBlock").style.display = '';
						var r1L = "#w#" + jsond.info.related_videos[0].id;
						var r1T = jsond.info.related_videos[0].title;
						var r1A = jsond.info.related_videos[0].video_thumbnail;
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
							var r2A = jsond.info.related_videos[1].video_thumbnail;
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
								var r3A = jsond.info.related_videos[2].video_thumbnail;
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
									var r4A = jsond.info.related_videos[3].video_thumbnail;
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
										var r5A = jsond.info.related_videos[4].video_thumbnail;
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
											var r6A = jsond.info.related_videos[5].video_thumbnail;
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
												var r7A = jsond.info.related_videos[6].video_thumbnail;
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
													var r8A = jsond.info.related_videos[7].video_thumbnail;
													var r8Au = jsond.info.related_videos[7].author;
													var r8V = jsond.info.related_videos[7].short_view_count_text;
													document.getElementById("rv8").href = r8L;
													document.getElementById("rTit8").innerHTML = r8T;
													document.getElementById("rTh8").src = r8A;
													document.getElementById("rAut8").innerHTML = r8Au;
													document.getElementById("rVie8").innerHTML = r8V;
													if (jsond.info.related_videos[8]) {
														var r9T = jsond.info.related_videos[8].title;
														var r9A = jsond.info.related_videos[8].video_thumbnail;
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
						http.onreadystatechange=(e)=>{
							document.getElementById("qSelector").style.display = '';
							var jsond = JSON.parse(http.responseText);
							var audioUrl = jsond.audio[0].url;
							document.getElementById("audioPlayer").src = audioUrl;
							if (jsond.video[0].isHls == true | jsond.video[0].isLive == true | jsond.video[0].isDashMPD == true) {
								var videoUrl =  jsond.video[1].url;
								document.getElementById("itag").innerHTML = jsond.video[1].itag;
							} else {
								var videoUrl = jsond.video[0].url;
								document.getElementById("itag").innerHTML = jsond.video[0].itag;
							}
							var length = jsond.video.length;
							if (length >= 5) {
								var opt1 = document.createElement("option")
								opt1.value = jsond.video[0].itag;
								opt1.innerHTML = jsond.video[0].qualityLabel;
								document.getElementById("qOptions").appendChild(opt1);
								var opt2 = document.createElement("option");
								if (!jsond.video[1].qualityLabel == jsond.video[0].qualityLabel) {
									opt2.value = jsond.video[1].itag;
									opt2.innerHTML = jsond.video[1].qualityLabel;
								} else {
									opt2.value = jsond.video[2].itag;
									opt2.innerHTML = jsond.video[2].qualityLabel;
								}
								document.getElementById("qOptions").appendChild(opt2);
								var opt3 = document.createElement("option");
								if (!jsond.video[2].qualityLabel == jsond.video[1].qualityLabel) {
									opt3.value = jsond.video[2].itag;
									opt3.innerHTML = jsond.video[2].qualityLabel;
								} else {
									opt3.value = jsond.video[3].itag;
									opt3.innerHTML = jsond.video[3].qualityLabel;
								}
								document.getElementById("qOptions").appendChild(opt3);
								var opt4 = document.createElement("option");
								if (!jsond.video[3].qualityLabel == jsond.video[2].qualityLabel) {
									opt4.value = jsond.video[3].itag;
									opt4.innerHTML = jsond.video[3].qualityLabel;
								} else {
									opt4.value = jsond.video[4].itag;
									opt4.innerHTML = jsond.video[4].qualityLabel;
								}
								document.getElementById("qOptions").appendChild(opt4);
								var opt5 = document.createElement("option");
								if (!jsond.video[4].qualityLabel == jsond.video[3].qualityLabel) {
									opt5.value = jsond.video[4].itag;
									opt5.innerHTML = jsond.video[4].qualityLabel;
									document.getElementById("qOptions").appendChild(opt5);
								} else {
									// do nothing
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
							document.getElementById("qOptions").value = document.getElementById("itag").innerHTML;
							document.getElementById("vidLoader").style.display = 'none';
							document.getElementById("player").poster = thum;
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
							document.getElementById("pubM").innerHTML = month;
							document.getElementById("pubY").innerHTML = year;
							document.getElementById("pubD").innerHTML = day;
							
							if (opt == "a" | !opt) {
								var url = "https://coorsproxyunlimited.herokuapp.com/http://normandotmp4.electrohaxz.tk:9019/?md=1&url=" + fullUrl;
							} else if (opt == "b"){
								var url = "https://vidpolaris.herokuapp.com/?md=1&url=" + fullUrl;
							} else if (opt == "c") {
								var url = "https://vidpolaris-europe.herokuapp.com/?md=1&url=" + fullUrl;
							}
							http.open("GET", url);
							http.send();
							http.timeout = 5000;
							http.ontimeout = () => {
								document.getElementById("viewNum").innerHTML = "[Error]";
								document.getElementById("likeNum").innerHTML = "[Error]";
								document.getElementById("dlikNum").innerHTML = "[Error]";
								document.getElementById("commNum").innerHTML = "[Error]";
							}
							http.onreadystatechange=(e)=>{
								var jsond = JSON.parse(http.responseText);
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
								if (!jsond.meta.commentCount) {
									var comm = 0;
								} else {
									var comm = jsond.meta.commentCount.toLocaleString();
								}
								var totl = jsond.meta.dislikeCount + jsond.meta.likeCount;
								if (!totl == 0){
									var untRatio = jsond.meta.likeCount / totl;
									var percent = 100 * untRatio;
									var ratio = percent.toPrecision(4);
								} else {
									var ratio = 0;
								}
								document.getElementById("viewNum").innerHTML = view;
								document.getElementById("likeNum").innerHTML = like;
								document.getElementById("dlikNum").innerHTML = dlik;
								document.getElementById("commNum").innerHTML = comm;
								document.getElementById("ldRatio").innerHTML = ratio;
								if (opt == "a" | !opt) {
									loadComments("none", "a");
								} else if (opt == "b"){
									loadComments("none", "b");
								} else if (opt == "c") {
									loadComments("none", "c");
								}
							}
							document.getElementById("videoViewer").style.display = '';
							sync();
							document.getElementById("player").load();
							document.getElementById("audioPlayer").load();
							if (opt == "a" | !opt) {
								loadComments("none", "a");
							} else if (opt == "b"){
								loadComments("none", "b");
							} else if (opt == "c") {
								loadComments("none", "c");
							}
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
					} else {
						document.getElementById("qSelector").style.display = 'none';
						document.getElementById("videoViewer").style.display = '';
						document.getElementById("vidLoader").style.display = 'none';
						document.getElementById("player").src = wUrl;
						document.getElementById("player").poster = thum;
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
						document.getElementById("pubM").innerHTML = month;
						document.getElementById("pubY").innerHTML = year;
						document.getElementById("pubD").innerHTML = day;
						if (!opt) {
							var url = "https://coorsproxyunlimited.herokuapp.com/http://normandotmp4.electrohaxz.tk:9019/?md=1&url=" + fullUrl;
						} else {
							var url = "https://vidpolaris.herokuapp.com/?md=1&url=" + fullUrl;
						}
						if (opt == "a" | !opt) {
							loadComments("none", "a");
						} else if (opt == "b"){
							loadComments("none", "b");
						} else if (opt == "c") {
							loadComments("none", "c");
						}
						http.open("GET", url);
						http.send();
						http.timeout = 5000;
						http.ontimeout = () => {
							document.getElementById("viewNum").innerHTML = "[Error]";
							document.getElementById("likeNum").innerHTML = "[Error]";
							document.getElementById("dlikNum").innerHTML = "[Error]";
							document.getElementById("commNum").innerHTML = "[Error]";
						}
						http.onreadystatechange=(e)=>{
							var jsond = JSON.parse(http.responseText);
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
							if (!jsond.meta.commentCount) {
								var comm = 0;
							} else {
								var comm = jsond.meta.commentCount.toLocaleString();
							}
							var totl = jsond.meta.dislikeCount + jsond.meta.likeCount;
							if (!totl == 0){
								var untRatio = jsond.meta.likeCount / totl;
								var percent = 100 * untRatio;
								var ratio = percent.toPrecision(4);
							} else {
								var ratio = 0;
							}
							document.getElementById("viewNum").innerHTML = view;
							document.getElementById("likeNum").innerHTML = like;
							document.getElementById("dlikNum").innerHTML = dlik;
							document.getElementById("ldRatio").innerHTML = ratio;
							loadComments("none", localStorage.getItem("sLoc"));
							if (!document.getElementById("videoViewer").style.display == 'none') {
								document.getElementById("player").play()
							}
							if (sessionStorage.getItem("id") == id) {
								document.getElementById("player").currentTime = sessionStorage.getItem("time");
								document.getElementById("audioPlayer").currentTime = sessionStorage.getItem("time");
							} else {
								sessionStorage.setItem("id", id);
								sessionStorage.setItem("time", document.getElementById("player").currentTime);
							}
						}
					}
				}
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
		}
	}, 10)
}

function getClickedId(parentString, substring) {
    return parentString.substring(parentString.indexOf(substring) + substring.length)
}

function home() {
	document.getElementById("player").pause();
	document.getElementById("videoViewer").style.display = 'none';
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
	document.title = "vidpolaris";
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
	document.getElementById("sharBox").style.display = '';
	const http = new XMLHttpRequest();
	var id = getClickedId(window.location.href, "#w#");
	var fullUrl = "https://n0rmancodes.github.io/vidpolaris/#w#" + id;
	document.getElementById("fUrlShar").value = fullUrl;
	document.getElementById("sUrlShar").value = "[Loading...]";
	http.open("POST", "https://rel.ink/api/links/");
	var params = JSON.stringify({
		"url": fullUrl
	})
	http.setRequestHeader('Content-Type', 'application/json')
	http.send(params);
	http.onreadystatechange=(e)=>{
		var jsond = JSON.parse(http.responseText);
		var shorter = "https://rel.ink/" + jsond.hashid;
		document.getElementById("sUrlShar").value = shorter
	}
}

function refresh() {
	sessionStorage.removeItem("currentlyRunningT");
	if (window.location.href.includes("#w#")) {
		var id = getClickedId(window.location.href, "#w#")
		if (!id) {
			home();
			return;
		}
		openVideo(localStorage.getItem("sLoc"));
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
	} else {
		home();
	}
}

function sync() {
	document.getElementById("player").addEventListener("playing", function() {
		if (localStorage.getItem("smart") == 'y') {
			document.getElementById("audioPlayer").play();
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
			document.getElementById("audioPlayer").currentTime = 0;
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
		document.getElementById("audioPlayer").pause();
	};
}

function saveSettings() {
	localStorage.setItem("smart", document.getElementById("sq").value)
	localStorage.setItem("theme", document.getElementById("wTheme").value)
	localStorage.setItem("sLoc", document.getElementById("server").value)
	resize();
	home();
	window.open("#", "_self")
}

function dismiss() {
	localStorage.setItem('dissmissed', 'y')
	document.getElementById("lasaga").style.display = 'none';
}

function loadComments(token, opt) {
	if (!token | token == "none") {
		document.getElementById("loadedComments").style.display = 'none';
		document.getElementById("loadedC").style.display = 'none';
		document.getElementById("errorC").style.display = 'none';
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
		http.timeout = 5000;
		http.ontimeout = () => {
			document.getElementById("errorC").style.display = '';
			document.getElementById("loadinC").style.display = 'none';
			document.getElementById("loadedC").style.display = 'none';
		}
		http.onreadystatechange=(e)=>{
			var jsond = JSON.parse(http.responseText);
			var commentsNum = jsond.comments.length;
			if (commentsNum > 20 | commentsNum == 20) {
				document.getElementById("c01").style.display = '';
				document.getElementById("c02").style.display = '';
				document.getElementById("c03").style.display = '';
				document.getElementById("c04").style.display = '';
				document.getElementById("c05").style.display = '';
				document.getElementById("c06").style.display = '';
				document.getElementById("c07").style.display = '';
				document.getElementById("c08").style.display = '';
				document.getElementById("c09").style.display = '';
				document.getElementById("c10").style.display = '';
				document.getElementById("c11").style.display = '';
				document.getElementById("c12").style.display = '';
				document.getElementById("c13").style.display = '';
				document.getElementById("c14").style.display = '';
				document.getElementById("c15").style.display = '';
				document.getElementById("c16").style.display = '';
				document.getElementById("c17").style.display = '';
				document.getElementById("c18").style.display = '';
				document.getElementById("c19").style.display = '';
				document.getElementById("c20").style.display = '';
			} else if (commentsNum == 19) {
				document.getElementById("c01").style.display = '';
				document.getElementById("c02").style.display = '';
				document.getElementById("c03").style.display = '';
				document.getElementById("c04").style.display = '';
				document.getElementById("c05").style.display = '';
				document.getElementById("c06").style.display = '';
				document.getElementById("c07").style.display = '';
				document.getElementById("c08").style.display = '';
				document.getElementById("c09").style.display = '';
				document.getElementById("c10").style.display = '';
				document.getElementById("c11").style.display = '';
				document.getElementById("c12").style.display = '';
				document.getElementById("c13").style.display = '';
				document.getElementById("c14").style.display = '';
				document.getElementById("c15").style.display = '';
				document.getElementById("c16").style.display = '';
				document.getElementById("c17").style.display = '';
				document.getElementById("c18").style.display = '';
				document.getElementById("c19").style.display = '';
				document.getElementById("c20").style.display = 'none';
				document.getElementById("moreComments").style.display = 'none';
			} else if (commentsNum == 18) {
				document.getElementById("c01").style.display = '';
				document.getElementById("c02").style.display = '';
				document.getElementById("c03").style.display = '';
				document.getElementById("c04").style.display = '';
				document.getElementById("c05").style.display = '';
				document.getElementById("c06").style.display = '';
				document.getElementById("c07").style.display = '';
				document.getElementById("c08").style.display = '';
				document.getElementById("c09").style.display = '';
				document.getElementById("c10").style.display = '';
				document.getElementById("c11").style.display = '';
				document.getElementById("c12").style.display = '';
				document.getElementById("c13").style.display = '';
				document.getElementById("c14").style.display = '';
				document.getElementById("c15").style.display = '';
				document.getElementById("c16").style.display = '';
				document.getElementById("c17").style.display = '';
				document.getElementById("c18").style.display = '';
				document.getElementById("c19").style.display = 'none';
				document.getElementById("c20").style.display = 'none';
				document.getElementById("moreComments").style.display = 'none';
			} else if (commentsNum == 17) {
				document.getElementById("c01").style.display = '';
				document.getElementById("c02").style.display = '';
				document.getElementById("c03").style.display = '';
				document.getElementById("c04").style.display = '';
				document.getElementById("c05").style.display = '';
				document.getElementById("c06").style.display = '';
				document.getElementById("c07").style.display = '';
				document.getElementById("c08").style.display = '';
				document.getElementById("c09").style.display = '';
				document.getElementById("c10").style.display = '';
				document.getElementById("c11").style.display = '';
				document.getElementById("c12").style.display = '';
				document.getElementById("c13").style.display = '';
				document.getElementById("c14").style.display = '';
				document.getElementById("c15").style.display = '';
				document.getElementById("c16").style.display = '';
				document.getElementById("c17").style.display = '';
				document.getElementById("c18").style.display = 'none';
				document.getElementById("c19").style.display = 'none';
				document.getElementById("c20").style.display = 'none';
				document.getElementById("moreComments").style.display = 'none';
			} else if (commentsNum == 16) {
				document.getElementById("c01").style.display = '';
				document.getElementById("c02").style.display = '';
				document.getElementById("c03").style.display = '';
				document.getElementById("c04").style.display = '';
				document.getElementById("c05").style.display = '';
				document.getElementById("c06").style.display = '';
				document.getElementById("c07").style.display = '';
				document.getElementById("c08").style.display = '';
				document.getElementById("c09").style.display = '';
				document.getElementById("c10").style.display = '';
				document.getElementById("c11").style.display = '';
				document.getElementById("c12").style.display = '';
				document.getElementById("c13").style.display = '';
				document.getElementById("c14").style.display = '';
				document.getElementById("c15").style.display = '';
				document.getElementById("c16").style.display = '';
				document.getElementById("c17").style.display = 'none';
				document.getElementById("c18").style.display = 'none';
				document.getElementById("c19").style.display = 'none';
				document.getElementById("c20").style.display = 'none';
				document.getElementById("moreComments").style.display = 'none';
			} else if (commentsNum == 15) {
				document.getElementById("c01").style.display = '';
				document.getElementById("c02").style.display = '';
				document.getElementById("c03").style.display = '';
				document.getElementById("c04").style.display = '';
				document.getElementById("c05").style.display = '';
				document.getElementById("c06").style.display = '';
				document.getElementById("c07").style.display = '';
				document.getElementById("c08").style.display = '';
				document.getElementById("c09").style.display = '';
				document.getElementById("c10").style.display = '';
				document.getElementById("c11").style.display = '';
				document.getElementById("c12").style.display = '';
				document.getElementById("c13").style.display = '';
				document.getElementById("c14").style.display = '';
				document.getElementById("c15").style.display = '';
				document.getElementById("c16").style.display = 'none';
				document.getElementById("c17").style.display = 'none';
				document.getElementById("c18").style.display = 'none';
				document.getElementById("c19").style.display = 'none';
				document.getElementById("c20").style.display = 'none';
				document.getElementById("moreComments").style.display = 'none';
			} else if (commentsNum == 14) {
				document.getElementById("c01").style.display = '';
				document.getElementById("c02").style.display = '';
				document.getElementById("c03").style.display = '';
				document.getElementById("c04").style.display = '';
				document.getElementById("c05").style.display = '';
				document.getElementById("c06").style.display = '';
				document.getElementById("c07").style.display = '';
				document.getElementById("c08").style.display = '';
				document.getElementById("c09").style.display = '';
				document.getElementById("c10").style.display = '';
				document.getElementById("c11").style.display = '';
				document.getElementById("c12").style.display = '';
				document.getElementById("c13").style.display = '';
				document.getElementById("c14").style.display = '';
				document.getElementById("c15").style.display = 'none';
				document.getElementById("c16").style.display = 'none';
				document.getElementById("c17").style.display = 'none';
				document.getElementById("c18").style.display = 'none';
				document.getElementById("c19").style.display = 'none';
				document.getElementById("c20").style.display = 'none';
				document.getElementById("moreComments").style.display = 'none';
			} else if (commentsNum == 13) {
				document.getElementById("c01").style.display = '';
				document.getElementById("c02").style.display = '';
				document.getElementById("c03").style.display = '';
				document.getElementById("c04").style.display = '';
				document.getElementById("c05").style.display = '';
				document.getElementById("c06").style.display = '';
				document.getElementById("c07").style.display = '';
				document.getElementById("c08").style.display = '';
				document.getElementById("c09").style.display = '';
				document.getElementById("c10").style.display = '';
				document.getElementById("c11").style.display = '';
				document.getElementById("c12").style.display = '';
				document.getElementById("c13").style.display = '';
				document.getElementById("c14").style.display = 'none';
				document.getElementById("c15").style.display = 'none';
				document.getElementById("c16").style.display = 'none';
				document.getElementById("c17").style.display = 'none';
				document.getElementById("c18").style.display = 'none';
				document.getElementById("c19").style.display = 'none';
				document.getElementById("c20").style.display = 'none';
				document.getElementById("moreComments").style.display = 'none';
			} else if (commentsNum == 12) {
				document.getElementById("c01").style.display = '';
				document.getElementById("c02").style.display = '';
				document.getElementById("c03").style.display = '';
				document.getElementById("c04").style.display = '';
				document.getElementById("c05").style.display = '';
				document.getElementById("c06").style.display = '';
				document.getElementById("c07").style.display = '';
				document.getElementById("c08").style.display = '';
				document.getElementById("c09").style.display = '';
				document.getElementById("c10").style.display = '';
				document.getElementById("c11").style.display = '';
				document.getElementById("c12").style.display = '';
				document.getElementById("c13").style.display = 'none';
				document.getElementById("c14").style.display = 'none';
				document.getElementById("c15").style.display = 'none';
				document.getElementById("c16").style.display = 'none';
				document.getElementById("c17").style.display = 'none';
				document.getElementById("c18").style.display = 'none';
				document.getElementById("c19").style.display = 'none';
				document.getElementById("c20").style.display = 'none';
				document.getElementById("moreComments").style.display = 'none';
			} else if (commentsNum == 10) {
				document.getElementById("c01").style.display = '';
				document.getElementById("c02").style.display = '';
				document.getElementById("c03").style.display = '';
				document.getElementById("c04").style.display = '';
				document.getElementById("c05").style.display = '';
				document.getElementById("c06").style.display = '';
				document.getElementById("c07").style.display = '';
				document.getElementById("c08").style.display = '';
				document.getElementById("c09").style.display = '';
				document.getElementById("c10").style.display = '';
				document.getElementById("c11").style.display = 'none';
				document.getElementById("c12").style.display = 'none';
				document.getElementById("c13").style.display = 'none';
				document.getElementById("c14").style.display = 'none';
				document.getElementById("c15").style.display = 'none';
				document.getElementById("c16").style.display = 'none';
				document.getElementById("c17").style.display = 'none';
				document.getElementById("c18").style.display = 'none';
				document.getElementById("c19").style.display = 'none';
				document.getElementById("c20").style.display = 'none';
				document.getElementById("moreComments").style.display = 'none';
			} else if (commentsNum == 9) {
				document.getElementById("c01").style.display = '';
				document.getElementById("c02").style.display = '';
				document.getElementById("c03").style.display = '';
				document.getElementById("c04").style.display = '';
				document.getElementById("c05").style.display = '';
				document.getElementById("c06").style.display = '';
				document.getElementById("c07").style.display = '';
				document.getElementById("c08").style.display = '';
				document.getElementById("c09").style.display = '';
				document.getElementById("c10").style.display = 'none';
				document.getElementById("c11").style.display = 'none';
				document.getElementById("c12").style.display = 'none';
				document.getElementById("c13").style.display = 'none';
				document.getElementById("c14").style.display = 'none';
				document.getElementById("c15").style.display = 'none';
				document.getElementById("c16").style.display = 'none';
				document.getElementById("c17").style.display = 'none';
				document.getElementById("c18").style.display = 'none';
				document.getElementById("c19").style.display = 'none';
				document.getElementById("c20").style.display = 'none';
				document.getElementById("moreComments").style.display = 'none';
			} else if (commentsNum == 8) {
				document.getElementById("c01").style.display = '';
				document.getElementById("c02").style.display = '';
				document.getElementById("c03").style.display = '';
				document.getElementById("c04").style.display = '';
				document.getElementById("c05").style.display = '';
				document.getElementById("c06").style.display = '';
				document.getElementById("c07").style.display = '';
				document.getElementById("c08").style.display = '';
				document.getElementById("c09").style.display = 'none';
				document.getElementById("c10").style.display = 'none';
				document.getElementById("c11").style.display = 'none';
				document.getElementById("c12").style.display = 'none';
				document.getElementById("c13").style.display = 'none';
				document.getElementById("c14").style.display = 'none';
				document.getElementById("c15").style.display = 'none';
				document.getElementById("c16").style.display = 'none';
				document.getElementById("c17").style.display = 'none';
				document.getElementById("c18").style.display = 'none';
				document.getElementById("c19").style.display = 'none';
				document.getElementById("c20").style.display = 'none';
				document.getElementById("moreComments").style.display = 'none';
			} else if (commentsNum == 7) {
				document.getElementById("c01").style.display = '';
				document.getElementById("c02").style.display = '';
				document.getElementById("c03").style.display = '';
				document.getElementById("c04").style.display = '';
				document.getElementById("c05").style.display = '';
				document.getElementById("c06").style.display = '';
				document.getElementById("c07").style.display = '';
				document.getElementById("c08").style.display = 'none';
				document.getElementById("c09").style.display = 'none';
				document.getElementById("c10").style.display = 'none';
				document.getElementById("c11").style.display = 'none';
				document.getElementById("c12").style.display = 'none';
				document.getElementById("c13").style.display = 'none';
				document.getElementById("c14").style.display = 'none';
				document.getElementById("c15").style.display = 'none';
				document.getElementById("c16").style.display = 'none';
				document.getElementById("c17").style.display = 'none';
				document.getElementById("c18").style.display = 'none';
				document.getElementById("c19").style.display = 'none';
				document.getElementById("c20").style.display = 'none';
				document.getElementById("moreComments").style.display = 'none';
			} else if (commentsNum == 6) {
				document.getElementById("c01").style.display = '';
				document.getElementById("c02").style.display = '';
				document.getElementById("c03").style.display = '';
				document.getElementById("c04").style.display = '';
				document.getElementById("c05").style.display = '';
				document.getElementById("c06").style.display = '';
				document.getElementById("c07").style.display = 'none';
				document.getElementById("c08").style.display = 'none';
				document.getElementById("c09").style.display = 'none';
				document.getElementById("c10").style.display = 'none';
				document.getElementById("c11").style.display = 'none';
				document.getElementById("c12").style.display = 'none';
				document.getElementById("c13").style.display = 'none';
				document.getElementById("c14").style.display = 'none';
				document.getElementById("c15").style.display = 'none';
				document.getElementById("c16").style.display = 'none';
				document.getElementById("c17").style.display = 'none';
				document.getElementById("c18").style.display = 'none';
				document.getElementById("c19").style.display = 'none';
				document.getElementById("c20").style.display = 'none';
				document.getElementById("moreComments").style.display = 'none';
			} else if (commentsNum == 5) {
				document.getElementById("c01").style.display = '';
				document.getElementById("c02").style.display = '';
				document.getElementById("c03").style.display = '';
				document.getElementById("c04").style.display = '';
				document.getElementById("c05").style.display = '';
				document.getElementById("c06").style.display = 'none';
				document.getElementById("c07").style.display = 'none';
				document.getElementById("c08").style.display = 'none';
				document.getElementById("c09").style.display = 'none';
				document.getElementById("c10").style.display = 'none';
				document.getElementById("c11").style.display = 'none';
				document.getElementById("c12").style.display = 'none';
				document.getElementById("c13").style.display = 'none';
				document.getElementById("c14").style.display = 'none';
				document.getElementById("c15").style.display = 'none';
				document.getElementById("c16").style.display = 'none';
				document.getElementById("c17").style.display = 'none';
				document.getElementById("c18").style.display = 'none';
				document.getElementById("c19").style.display = 'none';
				document.getElementById("c20").style.display = 'none';
				document.getElementById("moreComments").style.display = 'none';
			} else if (commentsNum == 4) {
				document.getElementById("c01").style.display = '';
				document.getElementById("c02").style.display = '';
				document.getElementById("c03").style.display = '';
				document.getElementById("c04").style.display = '';
				document.getElementById("c05").style.display = 'none';
				document.getElementById("c06").style.display = 'none';
				document.getElementById("c07").style.display = 'none';
				document.getElementById("c08").style.display = 'none';
				document.getElementById("c09").style.display = 'none';
				document.getElementById("c10").style.display = 'none';
				document.getElementById("c11").style.display = 'none';
				document.getElementById("c12").style.display = 'none';
				document.getElementById("c13").style.display = 'none';
				document.getElementById("c14").style.display = 'none';
				document.getElementById("c15").style.display = 'none';
				document.getElementById("c16").style.display = 'none';
				document.getElementById("c17").style.display = 'none';
				document.getElementById("c18").style.display = 'none';
				document.getElementById("c19").style.display = 'none';
				document.getElementById("c20").style.display = 'none';
				document.getElementById("moreComments").style.display = 'none';
			} else if (commentsNum == 3) {
				document.getElementById("c01").style.display = '';
				document.getElementById("c02").style.display = '';
				document.getElementById("c03").style.display = '';
				document.getElementById("c04").style.display = 'none';
				document.getElementById("c05").style.display = 'none';
				document.getElementById("c06").style.display = 'none';
				document.getElementById("c07").style.display = 'none';
				document.getElementById("c08").style.display = 'none';
				document.getElementById("c09").style.display = 'none';
				document.getElementById("c10").style.display = 'none';
				document.getElementById("c11").style.display = 'none';
				document.getElementById("c12").style.display = 'none';
				document.getElementById("c13").style.display = 'none';
				document.getElementById("c14").style.display = 'none';
				document.getElementById("c15").style.display = 'none';
				document.getElementById("c16").style.display = 'none';
				document.getElementById("c17").style.display = 'none';
				document.getElementById("c18").style.display = 'none';
				document.getElementById("c19").style.display = 'none';
				document.getElementById("c20").style.display = 'none';
				document.getElementById("moreComments").style.display = 'none';
			} else if (commentsNum == 2) {
				document.getElementById("c01").style.display = '';
				document.getElementById("c02").style.display = '';
				document.getElementById("c03").style.display = 'none';
				document.getElementById("c04").style.display = 'none';
				document.getElementById("c05").style.display = 'none';
				document.getElementById("c06").style.display = 'none';
				document.getElementById("c07").style.display = 'none';
				document.getElementById("c08").style.display = 'none';
				document.getElementById("c09").style.display = 'none';
				document.getElementById("c10").style.display = 'none';
				document.getElementById("c11").style.display = 'none';
				document.getElementById("c12").style.display = 'none';
				document.getElementById("c13").style.display = 'none';
				document.getElementById("c14").style.display = 'none';
				document.getElementById("c15").style.display = 'none';
				document.getElementById("c16").style.display = 'none';
				document.getElementById("c17").style.display = 'none';
				document.getElementById("c18").style.display = 'none';
				document.getElementById("c19").style.display = 'none';
				document.getElementById("c20").style.display = 'none';
				document.getElementById("moreComments").style.display = 'none';
			} else if (commentsNum == 1) {
				document.getElementById("c01").style.display = '';
				document.getElementById("c02").style.display = 'none';
				document.getElementById("c03").style.display = 'none';
				document.getElementById("c04").style.display = 'none';
				document.getElementById("c05").style.display = 'none';
				document.getElementById("c06").style.display = 'none';
				document.getElementById("c07").style.display = 'none';
				document.getElementById("c08").style.display = 'none';
				document.getElementById("c09").style.display = 'none';
				document.getElementById("c10").style.display = 'none';
				document.getElementById("c11").style.display = 'none';
				document.getElementById("c12").style.display = 'none';
				document.getElementById("c13").style.display = 'none';
				document.getElementById("c14").style.display = 'none';
				document.getElementById("c15").style.display = 'none';
				document.getElementById("c16").style.display = 'none';
				document.getElementById("c17").style.display = 'none';
				document.getElementById("c18").style.display = 'none';
				document.getElementById("c19").style.display = 'none';
				document.getElementById("c20").style.display = 'none';
				document.getElementById("moreComments").style.display = 'none';
			} else {
				document.getElementById("c01").style.display = 'none';
				document.getElementById("c02").style.display = 'none';
				document.getElementById("c03").style.display = 'none';
				document.getElementById("c04").style.display = 'none';
				document.getElementById("c05").style.display = 'none';
				document.getElementById("c06").style.display = 'none';
				document.getElementById("c07").style.display = 'none';
				document.getElementById("c08").style.display = 'none';
				document.getElementById("c09").style.display = 'none';
				document.getElementById("c10").style.display = 'none';
				document.getElementById("c11").style.display = 'none';
				document.getElementById("c12").style.display = 'none';
				document.getElementById("c13").style.display = 'none';
				document.getElementById("c14").style.display = 'none';
				document.getElementById("c15").style.display = 'none';
				document.getElementById("c16").style.display = 'none';
				document.getElementById("c17").style.display = 'none';
				document.getElementById("c18").style.display = 'none';
				document.getElementById("c19").style.display = 'none';
				document.getElementById("c20").style.display = 'none';
				document.getElementById("moreComments").style.display = 'none';
			}
			document.getElementById("loadedC").style.display = '';
			document.getElementById("loadedComments").style.display = '';
			document.getElementById("loadinC").style.display = 'none';
			document.getElementById("loadedComm").innerHTML = commentsNum;
			document.getElementById("c01p").src = jsond.comments[0].authorThumb;
			document.getElementById("c01c").innerHTML = jsond.comments[0].text.replace(/\n/g, "<br>");
			document.getElementById("c01a").innerHTML = jsond.comments[0].author;
			document.getElementById("c01l").innerHTML = jsond.comments[0].likes.toLocaleString();
			document.getElementById("c01t").innerHTML = jsond.comments[0].time;
			if (!jsond.comments[0].numReplies) {
				document.getElementById("c01r").innerHTML = "0";
			} else {
				document.getElementById("c01r").innerHTML = jsond.comments[0].numReplies;
			}
			document.getElementById("c02p").src = jsond.comments[1].authorThumb;
			document.getElementById("c02c").innerHTML = jsond.comments[1].text.replace(/\n/g, "<br>");
			document.getElementById("c02a").innerHTML = jsond.comments[1].author;
			document.getElementById("c02l").innerHTML = jsond.comments[1].likes.toLocaleString();
			document.getElementById("c02t").innerHTML = jsond.comments[1].time;
			if (!jsond.comments[1].numReplies) {
				document.getElementById("c02r").innerHTML = "0";
			} else {
				document.getElementById("c02r").innerHTML = jsond.comments[1].numReplies;
			}
			document.getElementById("c03p").src = jsond.comments[2].authorThumb;
			document.getElementById("c03c").innerHTML = jsond.comments[2].text.replace(/\n/g, "<br>");
			document.getElementById("c03a").innerHTML = jsond.comments[2].author;
			document.getElementById("c03l").innerHTML = jsond.comments[2].likes.toLocaleString();
			document.getElementById("c03t").innerHTML = jsond.comments[2].time;
			if (!jsond.comments[2].numReplies) {
				document.getElementById("c03r").innerHTML = "0";
			} else {
				document.getElementById("c03r").innerHTML = jsond.comments[2].numReplies;
			}
			document.getElementById("c04p").src = jsond.comments[3].authorThumb;
			document.getElementById("c04c").innerHTML = jsond.comments[3].text.replace(/\n/g, "<br>");
			document.getElementById("c04a").innerHTML = jsond.comments[3].author;
			document.getElementById("c04l").innerHTML = jsond.comments[3].likes.toLocaleString();
			document.getElementById("c04t").innerHTML = jsond.comments[3].time;
			if (!jsond.comments[3].numReplies) {
				document.getElementById("c04r").innerHTML = "0";
			} else {
				document.getElementById("c04r").innerHTML = jsond.comments[3].numReplies;
			}
			document.getElementById("c05p").src = jsond.comments[4].authorThumb;
			document.getElementById("c05c").innerHTML = jsond.comments[4].text.replace(/\n/g, "<br>");
			document.getElementById("c05a").innerHTML = jsond.comments[4].author;
			document.getElementById("c05l").innerHTML = jsond.comments[4].likes.toLocaleString();
			document.getElementById("c05t").innerHTML = jsond.comments[4].time;
			if (!jsond.comments[4].numReplies) {
				document.getElementById("c05r").innerHTML = "0";
			} else {
				document.getElementById("c05r").innerHTML = jsond.comments[4].numReplies;
			}
			document.getElementById("c06p").src = jsond.comments[5].authorThumb;
			document.getElementById("c06c").innerHTML = jsond.comments[5].text.replace(/\n/g, "<br>");
			document.getElementById("c06a").innerHTML = jsond.comments[5].author;
			document.getElementById("c06l").innerHTML = jsond.comments[5].likes.toLocaleString();
			document.getElementById("c06t").innerHTML = jsond.comments[5].time;
			if (!jsond.comments[5].numReplies) {
				document.getElementById("c06r").innerHTML = "0";
			} else {
				document.getElementById("c06r").innerHTML = jsond.comments[5].numReplies;
			}
			document.getElementById("c07p").src = jsond.comments[6].authorThumb;
			document.getElementById("c07c").innerHTML = jsond.comments[6].text.replace(/\n/g, "<br>");
			document.getElementById("c07a").innerHTML = jsond.comments[6].author;
			document.getElementById("c07l").innerHTML = jsond.comments[6].likes.toLocaleString();
			document.getElementById("c07t").innerHTML = jsond.comments[6].time;
			if (!jsond.comments[6].numReplies) {
				document.getElementById("c07r").innerHTML = "0";
			} else {
				document.getElementById("c07r").innerHTML = jsond.comments[6].numReplies;
			}
			document.getElementById("c08p").src = jsond.comments[7].authorThumb;
			document.getElementById("c08c").innerHTML = jsond.comments[7].text.replace(/\n/g, "<br>");
			document.getElementById("c08a").innerHTML = jsond.comments[7].author;
			document.getElementById("c08l").innerHTML = jsond.comments[7].likes.toLocaleString();
			document.getElementById("c08t").innerHTML = jsond.comments[7].time;
			if (!jsond.comments[7].numReplies) {
				document.getElementById("c08r").innerHTML = "0";
			} else {
				document.getElementById("c08r").innerHTML = jsond.comments[7].numReplies;
			}
			document.getElementById("c09p").src = jsond.comments[8].authorThumb;
			document.getElementById("c09c").innerHTML = jsond.comments[8].text.replace(/\n/g, "<br>");
			document.getElementById("c09a").innerHTML = jsond.comments[8].author;
			document.getElementById("c09l").innerHTML = jsond.comments[8].likes.toLocaleString();
			document.getElementById("c09t").innerHTML = jsond.comments[8].time;
			if (!jsond.comments[8].numReplies) {
				document.getElementById("c09r").innerHTML = "0";
			} else {
				document.getElementById("c09r").innerHTML = jsond.comments[8].numReplies;
			}
			document.getElementById("c10p").src = jsond.comments[9].authorThumb;
			document.getElementById("c10c").innerHTML = jsond.comments[9].text.replace(/\n/g, "<br>");
			document.getElementById("c10a").innerHTML = jsond.comments[9].author;
			document.getElementById("c10l").innerHTML = jsond.comments[9].likes.toLocaleString();
			document.getElementById("c10t").innerHTML = jsond.comments[9].time;
			if (!jsond.comments[9].numReplies) {
				document.getElementById("c10r").innerHTML = "0";
			} else {
				document.getElementById("c10r").innerHTML = jsond.comments[9].numReplies;
			}
			document.getElementById("c11p").src = jsond.comments[10].authorThumb;
			document.getElementById("c11c").innerHTML = jsond.comments[10].text.replace(/\n/g, "<br>");
			document.getElementById("c11a").innerHTML = jsond.comments[10].author;
			document.getElementById("c11l").innerHTML = jsond.comments[10].likes.toLocaleString();
			document.getElementById("c11t").innerHTML = jsond.comments[10].time;
			if (!jsond.comments[10].numReplies) {
				document.getElementById("c11r").innerHTML = "0";
			} else {
				document.getElementById("c11r").innerHTML = jsond.comments[10].numReplies;
			}
			document.getElementById("c12p").src = jsond.comments[11].authorThumb;
			document.getElementById("c12c").innerHTML = jsond.comments[11].text.replace(/\n/g, "<br>");
			document.getElementById("c12a").innerHTML = jsond.comments[11].author;
			document.getElementById("c12l").innerHTML = jsond.comments[11].likes.toLocaleString();
			document.getElementById("c12t").innerHTML = jsond.comments[11].time;
			if (!jsond.comments[11].numReplies) {
				document.getElementById("c12r").innerHTML = "0";
			} else {
				document.getElementById("c12r").innerHTML = jsond.comments[11].numReplies;
			}
			document.getElementById("c13p").src = jsond.comments[12].authorThumb;
			document.getElementById("c13c").innerHTML = jsond.comments[12].text.replace(/\n/g, "<br>");
			document.getElementById("c13a").innerHTML = jsond.comments[12].author;
			document.getElementById("c13l").innerHTML = jsond.comments[12].likes.toLocaleString();
			document.getElementById("c13t").innerHTML = jsond.comments[12].time;
			if (!jsond.comments[12].numReplies) {
				document.getElementById("c13r").innerHTML = "0";
			} else {
				document.getElementById("c13r").innerHTML = jsond.comments[12].numReplies;
			}
			document.getElementById("c14p").src = jsond.comments[13].authorThumb;
			document.getElementById("c14c").innerHTML = jsond.comments[13].text.replace(/\n/g, "<br>");
			document.getElementById("c14a").innerHTML = jsond.comments[13].author;
			document.getElementById("c14l").innerHTML = jsond.comments[13].likes.toLocaleString();
			document.getElementById("c14t").innerHTML = jsond.comments[13].time;
			if (!jsond.comments[13].numReplies) {
				document.getElementById("c14r").innerHTML = "0";
			} else {
				document.getElementById("c14r").innerHTML = jsond.comments[13].numReplies;
			}
			document.getElementById("c15p").src = jsond.comments[14].authorThumb;
			document.getElementById("c15c").innerHTML = jsond.comments[14].text.replace(/\n/g, "<br>");
			document.getElementById("c15a").innerHTML = jsond.comments[14].author;
			document.getElementById("c15l").innerHTML = jsond.comments[14].likes.toLocaleString();
			document.getElementById("c15t").innerHTML = jsond.comments[14].time;
			if (!jsond.comments[14].numReplies) {
				document.getElementById("c15r").innerHTML = "0";
			} else {
				document.getElementById("c15r").innerHTML = jsond.comments[14].numReplies;
			}
			document.getElementById("c16p").src = jsond.comments[15].authorThumb;
			document.getElementById("c16c").innerHTML = jsond.comments[15].text.replace(/\n/g, "<br>");
			document.getElementById("c16a").innerHTML = jsond.comments[15].author;
			document.getElementById("c16l").innerHTML = jsond.comments[15].likes.toLocaleString();
			document.getElementById("c16t").innerHTML = jsond.comments[15].time;
			if (!jsond.comments[15].numReplies) {
				document.getElementById("c16r").innerHTML = "0";
			} else {
				document.getElementById("c16r").innerHTML = jsond.comments[15].numReplies;
			}
			document.getElementById("c17p").src = jsond.comments[16].authorThumb;
			document.getElementById("c17c").innerHTML = jsond.comments[16].text.replace(/\n/g, "<br>");
			document.getElementById("c17a").innerHTML = jsond.comments[16].author;
			document.getElementById("c17l").innerHTML = jsond.comments[16].likes.toLocaleString();
			document.getElementById("c17t").innerHTML = jsond.comments[16].time;
			if (!jsond.comments[16].numReplies) {
				document.getElementById("c17r").innerHTML = "0";
			} else {
				document.getElementById("c17r").innerHTML = jsond.comments[16].numReplies;
			}
			document.getElementById("c18p").src = jsond.comments[17].authorThumb;
			document.getElementById("c18c").innerHTML = jsond.comments[17].text.replace(/\n/g, "<br>");
			document.getElementById("c18a").innerHTML = jsond.comments[17].author;
			document.getElementById("c18l").innerHTML = jsond.comments[17].likes.toLocaleString();
			document.getElementById("c18t").innerHTML = jsond.comments[17].time;
			if (!jsond.comments[17].numReplies) {
				document.getElementById("c18r").innerHTML = "0";
			} else {
				document.getElementById("c18r").innerHTML = jsond.comments[17].numReplies;
			}
			document.getElementById("c19p").src = jsond.comments[18].authorThumb;
			document.getElementById("c19c").innerHTML = jsond.comments[18].text.replace(/\n/g, "<br>");
			document.getElementById("c19a").innerHTML = jsond.comments[18].author;
			document.getElementById("c19l").innerHTML = jsond.comments[18].likes.toLocaleString();
			document.getElementById("c19t").innerHTML = jsond.comments[18].time;
			if (!jsond.comments[18].numReplies) {
				document.getElementById("c19r").innerHTML = "0";
			} else {
				document.getElementById("c19r").innerHTML = jsond.comments[18].numReplies;
			}
			document.getElementById("c20p").src = jsond.comments[19].authorThumb;
			document.getElementById("c20c").innerHTML = jsond.comments[19].text.replace(/\n/g, "<br>");
			document.getElementById("c20a").innerHTML = jsond.comments[19].author;
			document.getElementById("c20l").innerHTML = jsond.comments[19].likes.toLocaleString();
			document.getElementById("c20t").innerHTML = jsond.comments[19].time;
			if (!jsond.comments[19].numReplies) {
				document.getElementById("c20r").innerHTML = "0";
			} else {
				document.getElementById("c20r").innerHTML = jsond.comments[19].numReplies;
			}
			if (!commentsNum > 20 | !commentsNum == 20) {
				document.getElementById("moreComments").style.display = 'none';
			} else {
				document.getElementById("token").innerHTML = jsond.npToken;
				document.getElementById("moreComments").style.display = '';
			}
		}
	} else {
		document.getElementById("loadedComments").style.display = 'none';
		document.getElementById("loadedC").style.display = 'none';
		document.getElementById("loadinC").style.display = '';
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
		http.timeout = 5000;
		http.ontimeout = () => {
			document.getElementById("errorC").style.display = '';
			document.getElementById("loadinC").style.display = 'none';
			document.getElementById("loadedC").style.display = 'none';
		}
		http.onreadystatechange=(e)=>{
			var jsond = JSON.parse(http.responseText);
			var commentsNum = jsond.comments.length;
			if (commentsNum > 20 | commentsNum == 20) {
				document.getElementById("c01").style.display = '';
				document.getElementById("c02").style.display = '';
				document.getElementById("c03").style.display = '';
				document.getElementById("c04").style.display = '';
				document.getElementById("c05").style.display = '';
				document.getElementById("c06").style.display = '';
				document.getElementById("c07").style.display = '';
				document.getElementById("c08").style.display = '';
				document.getElementById("c09").style.display = '';
				document.getElementById("c10").style.display = '';
				document.getElementById("c11").style.display = '';
				document.getElementById("c12").style.display = '';
				document.getElementById("c13").style.display = '';
				document.getElementById("c14").style.display = '';
				document.getElementById("c15").style.display = '';
				document.getElementById("c16").style.display = '';
				document.getElementById("c17").style.display = '';
				document.getElementById("c18").style.display = '';
				document.getElementById("c19").style.display = '';
				document.getElementById("c20").style.display = '';
			} else if (commentsNum == 19) {
				document.getElementById("c01").style.display = '';
				document.getElementById("c02").style.display = '';
				document.getElementById("c03").style.display = '';
				document.getElementById("c04").style.display = '';
				document.getElementById("c05").style.display = '';
				document.getElementById("c06").style.display = '';
				document.getElementById("c07").style.display = '';
				document.getElementById("c08").style.display = '';
				document.getElementById("c09").style.display = '';
				document.getElementById("c10").style.display = '';
				document.getElementById("c11").style.display = '';
				document.getElementById("c12").style.display = '';
				document.getElementById("c13").style.display = '';
				document.getElementById("c14").style.display = '';
				document.getElementById("c15").style.display = '';
				document.getElementById("c16").style.display = '';
				document.getElementById("c17").style.display = '';
				document.getElementById("c18").style.display = '';
				document.getElementById("c19").style.display = '';
				document.getElementById("c20").style.display = 'none';
				document.getElementById("moreComments").style.display = 'none';
			} else if (commentsNum == 18) {
				document.getElementById("c01").style.display = '';
				document.getElementById("c02").style.display = '';
				document.getElementById("c03").style.display = '';
				document.getElementById("c04").style.display = '';
				document.getElementById("c05").style.display = '';
				document.getElementById("c06").style.display = '';
				document.getElementById("c07").style.display = '';
				document.getElementById("c08").style.display = '';
				document.getElementById("c09").style.display = '';
				document.getElementById("c10").style.display = '';
				document.getElementById("c11").style.display = '';
				document.getElementById("c12").style.display = '';
				document.getElementById("c13").style.display = '';
				document.getElementById("c14").style.display = '';
				document.getElementById("c15").style.display = '';
				document.getElementById("c16").style.display = '';
				document.getElementById("c17").style.display = '';
				document.getElementById("c18").style.display = '';
				document.getElementById("c19").style.display = 'none';
				document.getElementById("c20").style.display = 'none';
				document.getElementById("moreComments").style.display = 'none';
			} else if (commentsNum == 17) {
				document.getElementById("c01").style.display = '';
				document.getElementById("c02").style.display = '';
				document.getElementById("c03").style.display = '';
				document.getElementById("c04").style.display = '';
				document.getElementById("c05").style.display = '';
				document.getElementById("c06").style.display = '';
				document.getElementById("c07").style.display = '';
				document.getElementById("c08").style.display = '';
				document.getElementById("c09").style.display = '';
				document.getElementById("c10").style.display = '';
				document.getElementById("c11").style.display = '';
				document.getElementById("c12").style.display = '';
				document.getElementById("c13").style.display = '';
				document.getElementById("c14").style.display = '';
				document.getElementById("c15").style.display = '';
				document.getElementById("c16").style.display = '';
				document.getElementById("c17").style.display = '';
				document.getElementById("c18").style.display = 'none';
				document.getElementById("c19").style.display = 'none';
				document.getElementById("c20").style.display = 'none';
				document.getElementById("moreComments").style.display = 'none';
			} else if (commentsNum == 16) {
				document.getElementById("c01").style.display = '';
				document.getElementById("c02").style.display = '';
				document.getElementById("c03").style.display = '';
				document.getElementById("c04").style.display = '';
				document.getElementById("c05").style.display = '';
				document.getElementById("c06").style.display = '';
				document.getElementById("c07").style.display = '';
				document.getElementById("c08").style.display = '';
				document.getElementById("c09").style.display = '';
				document.getElementById("c10").style.display = '';
				document.getElementById("c11").style.display = '';
				document.getElementById("c12").style.display = '';
				document.getElementById("c13").style.display = '';
				document.getElementById("c14").style.display = '';
				document.getElementById("c15").style.display = '';
				document.getElementById("c16").style.display = '';
				document.getElementById("c17").style.display = 'none';
				document.getElementById("c18").style.display = 'none';
				document.getElementById("c19").style.display = 'none';
				document.getElementById("c20").style.display = 'none';
				document.getElementById("moreComments").style.display = 'none';
			} else if (commentsNum == 15) {
				document.getElementById("c01").style.display = '';
				document.getElementById("c02").style.display = '';
				document.getElementById("c03").style.display = '';
				document.getElementById("c04").style.display = '';
				document.getElementById("c05").style.display = '';
				document.getElementById("c06").style.display = '';
				document.getElementById("c07").style.display = '';
				document.getElementById("c08").style.display = '';
				document.getElementById("c09").style.display = '';
				document.getElementById("c10").style.display = '';
				document.getElementById("c11").style.display = '';
				document.getElementById("c12").style.display = '';
				document.getElementById("c13").style.display = '';
				document.getElementById("c14").style.display = '';
				document.getElementById("c15").style.display = '';
				document.getElementById("c16").style.display = 'none';
				document.getElementById("c17").style.display = 'none';
				document.getElementById("c18").style.display = 'none';
				document.getElementById("c19").style.display = 'none';
				document.getElementById("c20").style.display = 'none';
				document.getElementById("moreComments").style.display = 'none';
			} else if (commentsNum == 14) {
				document.getElementById("c01").style.display = '';
				document.getElementById("c02").style.display = '';
				document.getElementById("c03").style.display = '';
				document.getElementById("c04").style.display = '';
				document.getElementById("c05").style.display = '';
				document.getElementById("c06").style.display = '';
				document.getElementById("c07").style.display = '';
				document.getElementById("c08").style.display = '';
				document.getElementById("c09").style.display = '';
				document.getElementById("c10").style.display = '';
				document.getElementById("c11").style.display = '';
				document.getElementById("c12").style.display = '';
				document.getElementById("c13").style.display = '';
				document.getElementById("c14").style.display = '';
				document.getElementById("c15").style.display = 'none';
				document.getElementById("c16").style.display = 'none';
				document.getElementById("c17").style.display = 'none';
				document.getElementById("c18").style.display = 'none';
				document.getElementById("c19").style.display = 'none';
				document.getElementById("c20").style.display = 'none';
				document.getElementById("moreComments").style.display = 'none';
			} else if (commentsNum == 13) {
				document.getElementById("c01").style.display = '';
				document.getElementById("c02").style.display = '';
				document.getElementById("c03").style.display = '';
				document.getElementById("c04").style.display = '';
				document.getElementById("c05").style.display = '';
				document.getElementById("c06").style.display = '';
				document.getElementById("c07").style.display = '';
				document.getElementById("c08").style.display = '';
				document.getElementById("c09").style.display = '';
				document.getElementById("c10").style.display = '';
				document.getElementById("c11").style.display = '';
				document.getElementById("c12").style.display = '';
				document.getElementById("c13").style.display = '';
				document.getElementById("c14").style.display = 'none';
				document.getElementById("c15").style.display = 'none';
				document.getElementById("c16").style.display = 'none';
				document.getElementById("c17").style.display = 'none';
				document.getElementById("c18").style.display = 'none';
				document.getElementById("c19").style.display = 'none';
				document.getElementById("c20").style.display = 'none';
				document.getElementById("moreComments").style.display = 'none';
			} else if (commentsNum == 12) {
				document.getElementById("c01").style.display = '';
				document.getElementById("c02").style.display = '';
				document.getElementById("c03").style.display = '';
				document.getElementById("c04").style.display = '';
				document.getElementById("c05").style.display = '';
				document.getElementById("c06").style.display = '';
				document.getElementById("c07").style.display = '';
				document.getElementById("c08").style.display = '';
				document.getElementById("c09").style.display = '';
				document.getElementById("c10").style.display = '';
				document.getElementById("c11").style.display = '';
				document.getElementById("c12").style.display = '';
				document.getElementById("c13").style.display = 'none';
				document.getElementById("c14").style.display = 'none';
				document.getElementById("c15").style.display = 'none';
				document.getElementById("c16").style.display = 'none';
				document.getElementById("c17").style.display = 'none';
				document.getElementById("c18").style.display = 'none';
				document.getElementById("c19").style.display = 'none';
				document.getElementById("c20").style.display = 'none';
				document.getElementById("moreComments").style.display = 'none';
			} else if (commentsNum == 10) {
				document.getElementById("c01").style.display = '';
				document.getElementById("c02").style.display = '';
				document.getElementById("c03").style.display = '';
				document.getElementById("c04").style.display = '';
				document.getElementById("c05").style.display = '';
				document.getElementById("c06").style.display = '';
				document.getElementById("c07").style.display = '';
				document.getElementById("c08").style.display = '';
				document.getElementById("c09").style.display = '';
				document.getElementById("c10").style.display = '';
				document.getElementById("c11").style.display = 'none';
				document.getElementById("c12").style.display = 'none';
				document.getElementById("c13").style.display = 'none';
				document.getElementById("c14").style.display = 'none';
				document.getElementById("c15").style.display = 'none';
				document.getElementById("c16").style.display = 'none';
				document.getElementById("c17").style.display = 'none';
				document.getElementById("c18").style.display = 'none';
				document.getElementById("c19").style.display = 'none';
				document.getElementById("c20").style.display = 'none';
				document.getElementById("moreComments").style.display = 'none';
			} else if (commentsNum == 9) {
				document.getElementById("c01").style.display = '';
				document.getElementById("c02").style.display = '';
				document.getElementById("c03").style.display = '';
				document.getElementById("c04").style.display = '';
				document.getElementById("c05").style.display = '';
				document.getElementById("c06").style.display = '';
				document.getElementById("c07").style.display = '';
				document.getElementById("c08").style.display = '';
				document.getElementById("c09").style.display = '';
				document.getElementById("c10").style.display = 'none';
				document.getElementById("c11").style.display = 'none';
				document.getElementById("c12").style.display = 'none';
				document.getElementById("c13").style.display = 'none';
				document.getElementById("c14").style.display = 'none';
				document.getElementById("c15").style.display = 'none';
				document.getElementById("c16").style.display = 'none';
				document.getElementById("c17").style.display = 'none';
				document.getElementById("c18").style.display = 'none';
				document.getElementById("c19").style.display = 'none';
				document.getElementById("c20").style.display = 'none';
				document.getElementById("moreComments").style.display = 'none';
			} else if (commentsNum == 8) {
				document.getElementById("c01").style.display = '';
				document.getElementById("c02").style.display = '';
				document.getElementById("c03").style.display = '';
				document.getElementById("c04").style.display = '';
				document.getElementById("c05").style.display = '';
				document.getElementById("c06").style.display = '';
				document.getElementById("c07").style.display = '';
				document.getElementById("c08").style.display = '';
				document.getElementById("c09").style.display = 'none';
				document.getElementById("c10").style.display = 'none';
				document.getElementById("c11").style.display = 'none';
				document.getElementById("c12").style.display = 'none';
				document.getElementById("c13").style.display = 'none';
				document.getElementById("c14").style.display = 'none';
				document.getElementById("c15").style.display = 'none';
				document.getElementById("c16").style.display = 'none';
				document.getElementById("c17").style.display = 'none';
				document.getElementById("c18").style.display = 'none';
				document.getElementById("c19").style.display = 'none';
				document.getElementById("c20").style.display = 'none';
				document.getElementById("moreComments").style.display = 'none';
			} else if (commentsNum == 7) {
				document.getElementById("c01").style.display = '';
				document.getElementById("c02").style.display = '';
				document.getElementById("c03").style.display = '';
				document.getElementById("c04").style.display = '';
				document.getElementById("c05").style.display = '';
				document.getElementById("c06").style.display = '';
				document.getElementById("c07").style.display = '';
				document.getElementById("c08").style.display = 'none';
				document.getElementById("c09").style.display = 'none';
				document.getElementById("c10").style.display = 'none';
				document.getElementById("c11").style.display = 'none';
				document.getElementById("c12").style.display = 'none';
				document.getElementById("c13").style.display = 'none';
				document.getElementById("c14").style.display = 'none';
				document.getElementById("c15").style.display = 'none';
				document.getElementById("c16").style.display = 'none';
				document.getElementById("c17").style.display = 'none';
				document.getElementById("c18").style.display = 'none';
				document.getElementById("c19").style.display = 'none';
				document.getElementById("c20").style.display = 'none';
				document.getElementById("moreComments").style.display = 'none';
			} else if (commentsNum == 6) {
				document.getElementById("c01").style.display = '';
				document.getElementById("c02").style.display = '';
				document.getElementById("c03").style.display = '';
				document.getElementById("c04").style.display = '';
				document.getElementById("c05").style.display = '';
				document.getElementById("c06").style.display = '';
				document.getElementById("c07").style.display = 'none';
				document.getElementById("c08").style.display = 'none';
				document.getElementById("c09").style.display = 'none';
				document.getElementById("c10").style.display = 'none';
				document.getElementById("c11").style.display = 'none';
				document.getElementById("c12").style.display = 'none';
				document.getElementById("c13").style.display = 'none';
				document.getElementById("c14").style.display = 'none';
				document.getElementById("c15").style.display = 'none';
				document.getElementById("c16").style.display = 'none';
				document.getElementById("c17").style.display = 'none';
				document.getElementById("c18").style.display = 'none';
				document.getElementById("c19").style.display = 'none';
				document.getElementById("c20").style.display = 'none';
				document.getElementById("moreComments").style.display = 'none';
			} else if (commentsNum == 5) {
				document.getElementById("c01").style.display = '';
				document.getElementById("c02").style.display = '';
				document.getElementById("c03").style.display = '';
				document.getElementById("c04").style.display = '';
				document.getElementById("c05").style.display = '';
				document.getElementById("c06").style.display = 'none';
				document.getElementById("c07").style.display = 'none';
				document.getElementById("c08").style.display = 'none';
				document.getElementById("c09").style.display = 'none';
				document.getElementById("c10").style.display = 'none';
				document.getElementById("c11").style.display = 'none';
				document.getElementById("c12").style.display = 'none';
				document.getElementById("c13").style.display = 'none';
				document.getElementById("c14").style.display = 'none';
				document.getElementById("c15").style.display = 'none';
				document.getElementById("c16").style.display = 'none';
				document.getElementById("c17").style.display = 'none';
				document.getElementById("c18").style.display = 'none';
				document.getElementById("c19").style.display = 'none';
				document.getElementById("c20").style.display = 'none';
				document.getElementById("moreComments").style.display = 'none';
			} else if (commentsNum == 4) {
				document.getElementById("c01").style.display = '';
				document.getElementById("c02").style.display = '';
				document.getElementById("c03").style.display = '';
				document.getElementById("c04").style.display = '';
				document.getElementById("c05").style.display = 'none';
				document.getElementById("c06").style.display = 'none';
				document.getElementById("c07").style.display = 'none';
				document.getElementById("c08").style.display = 'none';
				document.getElementById("c09").style.display = 'none';
				document.getElementById("c10").style.display = 'none';
				document.getElementById("c11").style.display = 'none';
				document.getElementById("c12").style.display = 'none';
				document.getElementById("c13").style.display = 'none';
				document.getElementById("c14").style.display = 'none';
				document.getElementById("c15").style.display = 'none';
				document.getElementById("c16").style.display = 'none';
				document.getElementById("c17").style.display = 'none';
				document.getElementById("c18").style.display = 'none';
				document.getElementById("c19").style.display = 'none';
				document.getElementById("c20").style.display = 'none';
				document.getElementById("moreComments").style.display = 'none';
			} else if (commentsNum == 3) {
				document.getElementById("c01").style.display = '';
				document.getElementById("c02").style.display = '';
				document.getElementById("c03").style.display = '';
				document.getElementById("c04").style.display = 'none';
				document.getElementById("c05").style.display = 'none';
				document.getElementById("c06").style.display = 'none';
				document.getElementById("c07").style.display = 'none';
				document.getElementById("c08").style.display = 'none';
				document.getElementById("c09").style.display = 'none';
				document.getElementById("c10").style.display = 'none';
				document.getElementById("c11").style.display = 'none';
				document.getElementById("c12").style.display = 'none';
				document.getElementById("c13").style.display = 'none';
				document.getElementById("c14").style.display = 'none';
				document.getElementById("c15").style.display = 'none';
				document.getElementById("c16").style.display = 'none';
				document.getElementById("c17").style.display = 'none';
				document.getElementById("c18").style.display = 'none';
				document.getElementById("c19").style.display = 'none';
				document.getElementById("c20").style.display = 'none';
				document.getElementById("moreComments").style.display = 'none';
			} else if (commentsNum == 2) {
				document.getElementById("c01").style.display = '';
				document.getElementById("c02").style.display = '';
				document.getElementById("c03").style.display = 'none';
				document.getElementById("c04").style.display = 'none';
				document.getElementById("c05").style.display = 'none';
				document.getElementById("c06").style.display = 'none';
				document.getElementById("c07").style.display = 'none';
				document.getElementById("c08").style.display = 'none';
				document.getElementById("c09").style.display = 'none';
				document.getElementById("c10").style.display = 'none';
				document.getElementById("c11").style.display = 'none';
				document.getElementById("c12").style.display = 'none';
				document.getElementById("c13").style.display = 'none';
				document.getElementById("c14").style.display = 'none';
				document.getElementById("c15").style.display = 'none';
				document.getElementById("c16").style.display = 'none';
				document.getElementById("c17").style.display = 'none';
				document.getElementById("c18").style.display = 'none';
				document.getElementById("c19").style.display = 'none';
				document.getElementById("c20").style.display = 'none';
				document.getElementById("moreComments").style.display = 'none';
			} else if (commentsNum == 1) {
				document.getElementById("c01").style.display = '';
				document.getElementById("c02").style.display = 'none';
				document.getElementById("c03").style.display = 'none';
				document.getElementById("c04").style.display = 'none';
				document.getElementById("c05").style.display = 'none';
				document.getElementById("c06").style.display = 'none';
				document.getElementById("c07").style.display = 'none';
				document.getElementById("c08").style.display = 'none';
				document.getElementById("c09").style.display = 'none';
				document.getElementById("c10").style.display = 'none';
				document.getElementById("c11").style.display = 'none';
				document.getElementById("c12").style.display = 'none';
				document.getElementById("c13").style.display = 'none';
				document.getElementById("c14").style.display = 'none';
				document.getElementById("c15").style.display = 'none';
				document.getElementById("c16").style.display = 'none';
				document.getElementById("c17").style.display = 'none';
				document.getElementById("c18").style.display = 'none';
				document.getElementById("c19").style.display = 'none';
				document.getElementById("c20").style.display = 'none';
				document.getElementById("moreComments").style.display = 'none';
			} else {
				document.getElementById("c01").style.display = 'none';
				document.getElementById("c02").style.display = 'none';
				document.getElementById("c03").style.display = 'none';
				document.getElementById("c04").style.display = 'none';
				document.getElementById("c05").style.display = 'none';
				document.getElementById("c06").style.display = 'none';
				document.getElementById("c07").style.display = 'none';
				document.getElementById("c08").style.display = 'none';
				document.getElementById("c09").style.display = 'none';
				document.getElementById("c10").style.display = 'none';
				document.getElementById("c11").style.display = 'none';
				document.getElementById("c12").style.display = 'none';
				document.getElementById("c13").style.display = 'none';
				document.getElementById("c14").style.display = 'none';
				document.getElementById("c15").style.display = 'none';
				document.getElementById("c16").style.display = 'none';
				document.getElementById("c17").style.display = 'none';
				document.getElementById("c18").style.display = 'none';
				document.getElementById("c19").style.display = 'none';
				document.getElementById("c20").style.display = 'none';
				document.getElementById("moreComments").style.display = 'none';
			}
			document.getElementById("loadedC").style.display = '';
			document.getElementById("loadedComments").style.display = '';
			document.getElementById("loadinC").style.display = 'none';
			document.getElementById("loadedComm").innerHTML = commentsNum;
			document.getElementById("c01p").src = jsond.comments[0].authorThumb;
			document.getElementById("c01c").innerHTML = jsond.comments[0].text.replace(/\n/g, "<br>");
			document.getElementById("c01a").innerHTML = jsond.comments[0].author;
			document.getElementById("c01l").innerHTML = jsond.comments[0].likes.toLocaleString();
			document.getElementById("c01t").innerHTML = jsond.comments[0].time;
			if (!jsond.comments[0].numReplies) {
				document.getElementById("c01r").innerHTML = "0";
			} else {
				document.getElementById("c01r").innerHTML = jsond.comments[0].numReplies;
			}
			document.getElementById("c02p").src = jsond.comments[1].authorThumb;
			document.getElementById("c02c").innerHTML = jsond.comments[1].text.replace(/\n/g, "<br>");
			document.getElementById("c02a").innerHTML = jsond.comments[1].author;
			document.getElementById("c02l").innerHTML = jsond.comments[1].likes.toLocaleString();
			document.getElementById("c02t").innerHTML = jsond.comments[1].time;
			if (!jsond.comments[1].numReplies) {
				document.getElementById("c02r").innerHTML = "0";
			} else {
				document.getElementById("c02r").innerHTML = jsond.comments[1].numReplies;
			}
			document.getElementById("c03p").src = jsond.comments[2].authorThumb;
			document.getElementById("c03c").innerHTML = jsond.comments[2].text.replace(/\n/g, "<br>");
			document.getElementById("c03a").innerHTML = jsond.comments[2].author;
			document.getElementById("c03l").innerHTML = jsond.comments[2].likes.toLocaleString();
			document.getElementById("c03t").innerHTML = jsond.comments[2].time;
			if (!jsond.comments[2].numReplies) {
				document.getElementById("c03r").innerHTML = "0";
			} else {
				document.getElementById("c03r").innerHTML = jsond.comments[2].numReplies;
			}
			document.getElementById("c04p").src = jsond.comments[3].authorThumb;
			document.getElementById("c04c").innerHTML = jsond.comments[3].text.replace(/\n/g, "<br>");
			document.getElementById("c04a").innerHTML = jsond.comments[3].author;
			document.getElementById("c04l").innerHTML = jsond.comments[3].likes.toLocaleString();
			document.getElementById("c04t").innerHTML = jsond.comments[3].time;
			if (!jsond.comments[3].numReplies) {
				document.getElementById("c04r").innerHTML = "0";
			} else {
				document.getElementById("c04r").innerHTML = jsond.comments[3].numReplies;
			}
			document.getElementById("c05p").src = jsond.comments[4].authorThumb;
			document.getElementById("c05c").innerHTML = jsond.comments[4].text.replace(/\n/g, "<br>");
			document.getElementById("c05a").innerHTML = jsond.comments[4].author;
			document.getElementById("c05l").innerHTML = jsond.comments[4].likes.toLocaleString();
			document.getElementById("c05t").innerHTML = jsond.comments[4].time;
			if (!jsond.comments[4].numReplies) {
				document.getElementById("c05r").innerHTML = "0";
			} else {
				document.getElementById("c05r").innerHTML = jsond.comments[4].numReplies;
			}
			document.getElementById("c06p").src = jsond.comments[5].authorThumb;
			document.getElementById("c06c").innerHTML = jsond.comments[5].text.replace(/\n/g, "<br>");
			document.getElementById("c06a").innerHTML = jsond.comments[5].author;
			document.getElementById("c06l").innerHTML = jsond.comments[5].likes.toLocaleString();
			document.getElementById("c06t").innerHTML = jsond.comments[5].time;
			if (!jsond.comments[5].numReplies) {
				document.getElementById("c06r").innerHTML = "0";
			} else {
				document.getElementById("c06r").innerHTML = jsond.comments[5].numReplies;
			}
			document.getElementById("c07p").src = jsond.comments[6].authorThumb;
			document.getElementById("c07c").innerHTML = jsond.comments[6].text.replace(/\n/g, "<br>");
			document.getElementById("c07a").innerHTML = jsond.comments[6].author;
			document.getElementById("c07l").innerHTML = jsond.comments[6].likes.toLocaleString();
			document.getElementById("c07t").innerHTML = jsond.comments[6].time;
			if (!jsond.comments[6].numReplies) {
				document.getElementById("c07r").innerHTML = "0";
			} else {
				document.getElementById("c07r").innerHTML = jsond.comments[6].numReplies;
			}
			document.getElementById("c08p").src = jsond.comments[7].authorThumb;
			document.getElementById("c08c").innerHTML = jsond.comments[7].text.replace(/\n/g, "<br>");
			document.getElementById("c08a").innerHTML = jsond.comments[7].author;
			document.getElementById("c08l").innerHTML = jsond.comments[7].likes.toLocaleString();
			document.getElementById("c08t").innerHTML = jsond.comments[7].time;
			if (!jsond.comments[7].numReplies) {
				document.getElementById("c08r").innerHTML = "0";
			} else {
				document.getElementById("c08r").innerHTML = jsond.comments[7].numReplies;
			}
			document.getElementById("c09p").src = jsond.comments[8].authorThumb;
			document.getElementById("c09c").innerHTML = jsond.comments[8].text.replace(/\n/g, "<br>");
			document.getElementById("c09a").innerHTML = jsond.comments[8].author;
			document.getElementById("c09l").innerHTML = jsond.comments[8].likes.toLocaleString();
			document.getElementById("c09t").innerHTML = jsond.comments[8].time;
			if (!jsond.comments[8].numReplies) {
				document.getElementById("c09r").innerHTML = "0";
			} else {
				document.getElementById("c09r").innerHTML = jsond.comments[8].numReplies;
			}
			document.getElementById("c10p").src = jsond.comments[9].authorThumb;
			document.getElementById("c10c").innerHTML = jsond.comments[9].text.replace(/\n/g, "<br>");
			document.getElementById("c10a").innerHTML = jsond.comments[9].author;
			document.getElementById("c10l").innerHTML = jsond.comments[9].likes.toLocaleString();
			document.getElementById("c10t").innerHTML = jsond.comments[9].time;
			if (!jsond.comments[9].numReplies) {
				document.getElementById("c10r").innerHTML = "0";
			} else {
				document.getElementById("c10r").innerHTML = jsond.comments[9].numReplies;
			}
			document.getElementById("c11p").src = jsond.comments[10].authorThumb;
			document.getElementById("c11c").innerHTML = jsond.comments[10].text.replace(/\n/g, "<br>");
			document.getElementById("c11a").innerHTML = jsond.comments[10].author;
			document.getElementById("c11l").innerHTML = jsond.comments[10].likes.toLocaleString();
			document.getElementById("c11t").innerHTML = jsond.comments[10].time;
			if (!jsond.comments[10].numReplies) {
				document.getElementById("c11r").innerHTML = "0";
			} else {
				document.getElementById("c11r").innerHTML = jsond.comments[10].numReplies;
			}
			document.getElementById("c12p").src = jsond.comments[11].authorThumb;
			document.getElementById("c12c").innerHTML = jsond.comments[11].text.replace(/\n/g, "<br>");
			document.getElementById("c12a").innerHTML = jsond.comments[11].author;
			document.getElementById("c12l").innerHTML = jsond.comments[11].likes.toLocaleString();
			document.getElementById("c12t").innerHTML = jsond.comments[11].time;
			if (!jsond.comments[11].numReplies) {
				document.getElementById("c12r").innerHTML = "0";
			} else {
				document.getElementById("c12r").innerHTML = jsond.comments[11].numReplies;
			}
			document.getElementById("c13p").src = jsond.comments[12].authorThumb;
			document.getElementById("c13c").innerHTML = jsond.comments[12].text.replace(/\n/g, "<br>");
			document.getElementById("c13a").innerHTML = jsond.comments[12].author;
			document.getElementById("c13l").innerHTML = jsond.comments[12].likes.toLocaleString();
			document.getElementById("c13t").innerHTML = jsond.comments[12].time;
			if (!jsond.comments[12].numReplies) {
				document.getElementById("c13r").innerHTML = "0";
			} else {
				document.getElementById("c13r").innerHTML = jsond.comments[12].numReplies;
			}
			document.getElementById("c14p").src = jsond.comments[13].authorThumb;
			document.getElementById("c14c").innerHTML = jsond.comments[13].text.replace(/\n/g, "<br>");
			document.getElementById("c14a").innerHTML = jsond.comments[13].author;
			document.getElementById("c14l").innerHTML = jsond.comments[13].likes.toLocaleString();
			document.getElementById("c14t").innerHTML = jsond.comments[13].time;
			if (!jsond.comments[13].numReplies) {
				document.getElementById("c14r").innerHTML = "0";
			} else {
				document.getElementById("c14r").innerHTML = jsond.comments[13].numReplies;
			}
			document.getElementById("c15p").src = jsond.comments[14].authorThumb;
			document.getElementById("c15c").innerHTML = jsond.comments[14].text.replace(/\n/g, "<br>");
			document.getElementById("c15a").innerHTML = jsond.comments[14].author;
			document.getElementById("c15l").innerHTML = jsond.comments[14].likes.toLocaleString();
			document.getElementById("c15t").innerHTML = jsond.comments[14].time;
			if (!jsond.comments[14].numReplies) {
				document.getElementById("c15r").innerHTML = "0";
			} else {
				document.getElementById("c15r").innerHTML = jsond.comments[14].numReplies;
			}
			document.getElementById("c16p").src = jsond.comments[15].authorThumb;
			document.getElementById("c16c").innerHTML = jsond.comments[15].text.replace(/\n/g, "<br>");
			document.getElementById("c16a").innerHTML = jsond.comments[15].author;
			document.getElementById("c16l").innerHTML = jsond.comments[15].likes.toLocaleString();
			document.getElementById("c16t").innerHTML = jsond.comments[15].time;
			if (!jsond.comments[15].numReplies) {
				document.getElementById("c16r").innerHTML = "0";
			} else {
				document.getElementById("c16r").innerHTML = jsond.comments[15].numReplies;
			}
			document.getElementById("c17p").src = jsond.comments[16].authorThumb;
			document.getElementById("c17c").innerHTML = jsond.comments[16].text.replace(/\n/g, "<br>");
			document.getElementById("c17a").innerHTML = jsond.comments[16].author;
			document.getElementById("c17l").innerHTML = jsond.comments[16].likes.toLocaleString();
			document.getElementById("c17t").innerHTML = jsond.comments[16].time;
			if (!jsond.comments[16].numReplies) {
				document.getElementById("c17r").innerHTML = "0";
			} else {
				document.getElementById("c17r").innerHTML = jsond.comments[16].numReplies;
			}
			document.getElementById("c18p").src = jsond.comments[17].authorThumb;
			document.getElementById("c18c").innerHTML = jsond.comments[17].text.replace(/\n/g, "<br>");
			document.getElementById("c18a").innerHTML = jsond.comments[17].author;
			document.getElementById("c18l").innerHTML = jsond.comments[17].likes.toLocaleString();
			document.getElementById("c18t").innerHTML = jsond.comments[17].time;
			if (!jsond.comments[17].numReplies) {
				document.getElementById("c18r").innerHTML = "0";
			} else {
				document.getElementById("c18r").innerHTML = jsond.comments[17].numReplies;
			}
			document.getElementById("c19p").src = jsond.comments[18].authorThumb;
			document.getElementById("c19c").innerHTML = jsond.comments[18].text.replace(/\n/g, "<br>");
			document.getElementById("c19a").innerHTML = jsond.comments[18].author;
			document.getElementById("c19l").innerHTML = jsond.comments[18].likes.toLocaleString();
			document.getElementById("c19t").innerHTML = jsond.comments[18].time;
			if (!jsond.comments[18].numReplies) {
				document.getElementById("c19r").innerHTML = "0";
			} else {
				document.getElementById("c19r").innerHTML = jsond.comments[18].numReplies;
			}
			document.getElementById("c20p").src = jsond.comments[19].authorThumb;
			document.getElementById("c20c").innerHTML = jsond.comments[19].text.replace(/\n/g, "<br>");
			document.getElementById("c20a").innerHTML = jsond.comments[19].author;
			document.getElementById("c20l").innerHTML = jsond.comments[19].likes.toLocaleString();
			document.getElementById("c20t").innerHTML = jsond.comments[19].time;
			if (!jsond.comments[19].numReplies) {
				document.getElementById("c20r").innerHTML = "0";
			} else {
				document.getElementById("c20r").innerHTML = jsond.comments[19].numReplies;
			}
			if (!commentsNum > 20 | !commentsNum == 20) {
				document.getElementById("moreComments").style.display = 'none';
			} else {
				document.getElementById("token").innerHTML = jsond.npToken;
				document.getElementById("moreComments").style.display = '';
			}
		}
	}
}

function toggleAuto() {
	setTimeout( function () {
		if (document.getElementById("apSwitch").checked) {
			localStorage.setItem("autoplay", "y")
			console.log("autoplay: on");
		} else {
			localStorage.setItem("autoplay", "n")
			console.log("autoplay: off");
		}
	}, 100)
}


function changeQ() {
	if (document.getElementById("itag").innerHTML == document.getElementById("qOptions").value) {
		return;
	} else {
		document.getElementById("videoViewer").style.display = 'none';
		document.getElementById("vidLoader").style.display = '';
		document.getElementById("audioPlayer").pause();
		document.getElementById("player").pause();
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
		http.onreadystatechange=(e)=>{
			var jsond = JSON.parse(http.responseText);
			var currentTime = document.getElementById("audioPlayer").currentTime;
			document.getElementById("itag").innerHTML = jsond.datainfo.itag;
			document.getElementById("player").src = jsond.datainfo.url;
			document.getElementById("player").currentTime = currentTime;
			document.getElementById("videoViewer").style.display = '';
			document.getElementById("vidLoader").style.display = 'none';
		}
	}
}

function translate(elem, opt) {
	if (!elem) {
		return;
	} else {
		var tex = document.getElementById(elem).innerHTML;
		document.getElementById(elem).innerHTML = "(translating...)"
		if (!sessionStorage.getItem("currentlyRunningT") | sessionStorage.getItem("currentlyRunningT") == "n") {
			sessionStorage.setItem("currentlyRunningT", "y");
			const http = new XMLHttpRequest();
			if (opt == "a" | !opt) {
				var url = "https://coorsproxyunlimited.herokuapp.com/?to=en&translate=" + encodeURIComponent(tex);
			} else if (opt == "b"){
				var url = "https://vidpolaris.herokuapp.com/?to=en&translate=" + encodeURIComponent(tex);
			} else if (opt == "c") {
				var url = "https://vidpolaris-europe.herokuapp.com/?to=en&translate=" + encodeURIComponent(tex);
			}
			http.open("GET", url);
			http.send();
			http.onreadystatechange=(e)=>{
				var jsond = JSON.parse(http.responseText);
				var tTex = jsond.res.text;
				var fTex = jsond.res.from.language.iso;
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

function theatre() {
	if (document.getElementById("player").style.width == "60%" | !document.getElementById("player").style.width) {
		document.getElementById("player").style = "max-height:840px;";
		document.getElementById("player").style.width = "100%";
		document.getElementById("theat").innerHTML = "back to normal"
		localStorage.setItem("theatre" , "y")
	} else {
		document.getElementById("player").style = "max-height:645px;";
		document.getElementById("player").style.width = "60%";
		document.getElementById("theat").innerHTML = "theater mode"
		localStorage.setItem("theatre" , "n")
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
	document.getElementById("helpOut").style.display = 'none';
	document.getElementById("vidPage").style.display = 'none';
	document.getElementById("searchContainer").style.display = 'none';
	document.getElementById("homePage").style.display = 'none';
	document.getElementById("settingsPage").style.display = 'none';
	document.getElementById("channelPage").style.display = '';
	document.getElementById("chanLoader").style.display = '';
	document.getElementById("chanViewer").style.display = 'none';
	document.getElementById("bannerPfpContainer").style.display = 'none';
	const http = new XMLHttpRequest();
	var id = getClickedId(window.location.href, '#c#');
	if (opt == "a" | !opt) {
		var url = "https://coorsproxyunlimited.herokuapp.com/http://normandotmp4.electrohaxz.tk:9019/?channelId=" + id;
	} else if (opt == "b"){
		var url = "https://vidpolaris.herokuapp.com/?channelId=" + id;
	} else if (opt == "c") {
		var url = "https://vidpolaris-europe.herokuapp.com/?channelId=" + id;
	}
	http.open("GET", url);
	http.send();
	http.onreadystatechange=(e)=>{
		var jsond = JSON.parse(http.responseText);
		if (jsond.error) {
			document.getElementById("errorPage").style.display = '';
			document.getElementById("errorTxt").innerHTML = "for one reason or another, this channel could not be opened. try again or watch it on youtube itself."
			document.getElementById("vidPage").style.display = 'none';
			document.getElementById("channelPage").style.display = 'none';
			document.getElementById("nsWarnPage").style.display = 'none';
			document.getElementById("settingsPage").style.display = 'none';
			document.getElementById("searchPage").style.display = 'none';
			document.getElementById("homePage").style.display = 'none';
			document.getElementById("bannerPfpContainer").style.display = 'none';
			document.getElementById("searchContainer").style.display = '';
		} else {
			if (jsond.authorBanners[0]) {
				document.getElementById("banner").src = jsond.authorBanners[0].url;
			} else {
				document.getElementById("banner").src = "img/banner.jpg";
			}
			document.getElementById("profilePic").src = jsond.authorThumbnails[0].url;
			document.getElementById("subCount").innerHTML = jsond.subCount.toLocaleString();
			document.getElementById("viewCount").innerHTML = jsond.totalViews.toLocaleString();
			document.getElementById("chanName").innerHTML = jsond.author;
			document.getElementById("channelDesc").innerHTML = jsond.description;
			document.title = jsond.author + " | vidpolaris";
			if (jsond.latestVideos[0]) {
				document.getElementById("up1Th").src = jsond.latestVideos[0].videoThumbnails[0].url;
				document.getElementById("up1Ti").innerHTML = jsond.latestVideos[0].title;
				document.getElementById("up1Da").innerHTML = jsond.latestVideos[0].publishedText;
				document.getElementById("up1Vi").innerHTML = jsond.latestVideos[0].viewCount.toLocaleString();
				document.getElementById("up1").href = "#w#" + jsond.latestVideos[0].videoId;
				if (jsond.latestVideos[1]) {
					document.getElementById("up2Th").src = jsond.latestVideos[1].videoThumbnails[0].url;
					document.getElementById("up2Ti").innerHTML = jsond.latestVideos[1].title;
					document.getElementById("up2Da").innerHTML = jsond.latestVideos[1].publishedText;
					document.getElementById("up2Vi").innerHTML = jsond.latestVideos[1].viewCount.toLocaleString();
					document.getElementById("up2").href = "#w#" + jsond.latestVideos[1].videoId;
					if (jsond.latestVideos[2]) {
						document.getElementById("up3Th").src = jsond.latestVideos[2].videoThumbnails[0].url;
						document.getElementById("up3Ti").innerHTML = jsond.latestVideos[2].title;
						document.getElementById("up3Da").innerHTML = jsond.latestVideos[2].publishedText;
						document.getElementById("up3Vi").innerHTML = jsond.latestVideos[2].viewCount.toLocaleString();
						document.getElementById("up3").href = "#w#" + jsond.latestVideos[2].videoId;
						if (jsond.latestVideos[3]) {
							document.getElementById("up4Th").src = jsond.latestVideos[3].videoThumbnails[0].url;
							document.getElementById("up4Ti").innerHTML = jsond.latestVideos[3].title;
							document.getElementById("up4Da").innerHTML = jsond.latestVideos[3].publishedText;
							document.getElementById("up4Vi").innerHTML = jsond.latestVideos[3].viewCount.toLocaleString();
							document.getElementById("up4").href = "#w#" + jsond.latestVideos[3].videoId;
							if (jsond.latestVideos[4]) {
								document.getElementById("up5Th").src = jsond.latestVideos[4].videoThumbnails[0].url;
								document.getElementById("up5Ti").innerHTML = jsond.latestVideos[4].title;
								document.getElementById("up5Da").innerHTML = jsond.latestVideos[4].publishedText;
								document.getElementById("up5Vi").innerHTML = jsond.latestVideos[4].viewCount.toLocaleString();
								document.getElementById("up5").href = "#w#" + jsond.latestVideos[4].videoId;
								if (jsond.latestVideos[5]) {
									document.getElementById("up6Th").src = jsond.latestVideos[5].videoThumbnails[0].url;
									document.getElementById("up6Ti").innerHTML = jsond.latestVideos[5].title;
									document.getElementById("up6Da").innerHTML = jsond.latestVideos[5].publishedText;
									document.getElementById("up6Vi").innerHTML = jsond.latestVideos[5].viewCount.toLocaleString();
									document.getElementById("up6").href = "#w#" + jsond.latestVideos[5].videoId;
									if (jsond.latestVideos[6]) {
										document.getElementById("up7Th").src = jsond.latestVideos[6].videoThumbnails[0].url;
										document.getElementById("up7Ti").innerHTML = jsond.latestVideos[6].title;
										document.getElementById("up7Da").innerHTML = jsond.latestVideos[6].publishedText;
										document.getElementById("up7Vi").innerHTML = jsond.latestVideos[6].viewCount.toLocaleString();
										document.getElementById("up7").href = "#w#" + jsond.latestVideos[6].videoId;
										if (jsond.latestVideos[7]) {
											document.getElementById("up8Th").src = jsond.latestVideos[7].videoThumbnails[0].url;
											document.getElementById("up8Ti").innerHTML = jsond.latestVideos[7].title;
											document.getElementById("up8Da").innerHTML = jsond.latestVideos[7].publishedText;
											document.getElementById("up8Vi").innerHTML = jsond.latestVideos[7].viewCount.toLocaleString();
											document.getElementById("up8").href = "#w#" + jsond.latestVideos[7].videoId;
											document.getElementById("noUploads").style.display = 'none';
											document.getElementById("up1").style.display = '';
											document.getElementById("up2").style.display = '';
											document.getElementById("up3").style.display = '';
											document.getElementById("up4").style.display = '';
											document.getElementById("up5").style.display = '';
											document.getElementById("up6").style.display = '';
											document.getElementById("up7").style.display = '';
											document.getElementById("up8").style.display = '';
										} else {
											document.getElementById("noUploads").style.display = 'none';
											document.getElementById("up1").style.display = '';
											document.getElementById("up2").style.display = '';
											document.getElementById("up3").style.display = '';
											document.getElementById("up4").style.display = '';
											document.getElementById("up5").style.display = '';
											document.getElementById("up6").style.display = '';
											document.getElementById("up7").style.display = '';
											document.getElementById("up8").style.display = '';
										}
									} else {
										document.getElementById("noUploads").style.display = 'none';
										document.getElementById("up1").style.display = '';
										document.getElementById("up2").style.display = '';
										document.getElementById("up3").style.display = '';
										document.getElementById("up4").style.display = '';
										document.getElementById("up5").style.display = '';
										document.getElementById("up6").style.display = '';
										document.getElementById("up7").style.display = '';
										document.getElementById("up8").style.display = 'none';
									}
								} else {
									document.getElementById("noUploads").style.display = 'none';
									document.getElementById("up1").style.display = '';
									document.getElementById("up2").style.display = '';
									document.getElementById("up3").style.display = '';
									document.getElementById("up4").style.display = '';
									document.getElementById("up5").style.display = '';
									document.getElementById("up6").style.display = '';
									document.getElementById("up7").style.display = 'none';
									document.getElementById("up8").style.display = 'none';
								}
							} else {
								document.getElementById("noUploads").style.display = 'none';
								document.getElementById("up1").style.display = '';
								document.getElementById("up2").style.display = '';
								document.getElementById("up3").style.display = '';
								document.getElementById("up4").style.display = '';
								document.getElementById("up5").style.display = 'none';
								document.getElementById("up6").style.display = 'none';
								document.getElementById("up7").style.display = 'none';
								document.getElementById("up8").style.display = 'none';
							}
						} else {
							document.getElementById("noUploads").style.display = 'none';
							document.getElementById("up1").style.display = '';
							document.getElementById("up2").style.display = '';
							document.getElementById("up3").style.display = '';
							document.getElementById("up4").style.display = 'none';
							document.getElementById("up5").style.display = 'none';
							document.getElementById("up6").style.display = 'none';
							document.getElementById("up7").style.display = 'none';
							document.getElementById("up8").style.display = 'none';
						}
					} else {
						document.getElementById("noUploads").style.display = 'none';
						document.getElementById("up1").style.display = '';
						document.getElementById("up1").style.display = '';
						document.getElementById("up3").style.display = 'none';
						document.getElementById("up4").style.display = 'none';
						document.getElementById("up5").style.display = 'none';
						document.getElementById("up6").style.display = 'none';
						document.getElementById("up7").style.display = 'none';
						document.getElementById("up8").style.display = 'none';
					}
				} else {
					document.getElementById("noUploads").style.display = 'none';
					document.getElementById("up1").style.display = '';
					document.getElementById("up2").style.display = 'none';
					document.getElementById("up3").style.display = 'none';
					document.getElementById("up4").style.display = 'none';
					document.getElementById("up5").style.display = 'none';
					document.getElementById("up6").style.display = 'none';
					document.getElementById("up7").style.display = 'none';
					document.getElementById("up8").style.display = 'none';
				}
			} else {
				document.getElementById("noUploads").style.display = '';
				document.getElementById("up1").style.display = 'none';
				document.getElementById("up2").style.display = 'none';
				document.getElementById("up3").style.display = 'none';
				document.getElementById("up4").style.display = 'none';
				document.getElementById("up5").style.display = 'none';
				document.getElementById("up6").style.display = 'none';
				document.getElementById("up7").style.display = 'none';
				document.getElementById("up8").style.display = 'none';
			}
			document.getElementById("chanLoader").style.display = 'none';
			document.getElementById("chanViewer").style.display = '';
			document.getElementById("searchContainer").style.display = '';
			document.getElementById("bannerPfpContainer").style.display = '';
		}
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

function retry() {
	if (localStorage.getItem("smart") === "y") {
		localStorage.setItem("smart", "n");
		openVideo(localStorage.getItem("sLoc"));
		sessionStorage.setItem("cb", "y");
	} else {
		localStorage.setItem("smart", "y");
		openVideo(localStorage.getItem("sLoc"));
		sessionStorage.setItem("cb", "y");
	}
}