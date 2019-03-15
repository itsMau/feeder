// Uncomment to enable Bootstrap tooltips
// https://getbootstrap.com/docs/4.0/components/tooltips/#example-enable-tooltips-everywhere
// $(function () { $('[data-toggle="tooltip"]').tooltip(); });

// Uncomment to enable Bootstrap popovers
// https://getbootstrap.com/docs/4.0/components/popovers/#example-enable-popovers-everywhere
// $(function () { $('[data-toggle="popover"]').popover(); });

if (!Array.from) {

  Array.from = (function () {

    var toStr = Object.prototype.toString;

    var isCallable = function (fn) {

      return typeof fn === 'function' || toStr.call(fn) === '[object Function]';

    };

    var toInteger = function (value) {

      var number = Number(value);

      if (isNaN(number)) { return 0; }

      if (number === 0 || !isFinite(number)) { return number; }

      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));

    };

    var maxSafeInteger = Math.pow(2, 53) - 1;

    var toLength = function (value) {

      var len = toInteger(value);

      return Math.min(Math.max(len, 0), maxSafeInteger);

    };



    // The length property of the from method is 1.

    return function from(arrayLike/*, mapFn, thisArg */) {

      // 1. Let C be the this value.

      var C = this;



      // 2. Let items be ToObject(arrayLike).

      var items = Object(arrayLike);



      // 3. ReturnIfAbrupt(items).

      if (arrayLike == null) {

        throw new TypeError("Array.from requires an array-like object - not null or undefined");

      }



      // 4. If mapfn is undefined, then let mapping be false.

      var mapFn = arguments.length > 1 ? arguments[1] : void undefined;

      var T;

      if (typeof mapFn !== 'undefined') {

        // 5. else

        // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.

        if (!isCallable(mapFn)) {

          throw new TypeError('Array.from: when provided, the second argument must be a function');

        }



        // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.

        if (arguments.length > 2) {

          T = arguments[2];

        }

      }



      // 10. Let lenValue be Get(items, "length").

      // 11. Let len be ToLength(lenValue).

      var len = toLength(items.length);



      // 13. If IsConstructor(C) is true, then

      // 13. a. Let A be the result of calling the [[Construct]] internal method of C with an argument list containing the single item len.

      // 14. a. Else, Let A be ArrayCreate(len).

      var A = isCallable(C) ? Object(new C(len)) : new Array(len);



      // 16. Let k be 0.

      var k = 0;

      // 17. Repeat, while k < len… (also steps a - h)

      var kValue;

      while (k < len) {

        kValue = items[k];

        if (mapFn) {

          A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);

        } else {

          A[k] = kValue;

        }

        k += 1;

      }

      // 18. Let putStatus be Put(A, "length", len, true).

      A.length = len;

      // 20. Return A.

      return A;

    };

  }());

}

function ToggleMenu(elem){
	let menu = elem.previousElementSibling;
	
	if(menu){
		if(menu.classList.contains("menu_closed")){
			menu.classList.add("menu_opened");
			menu.classList.remove("menu_closed");
		}else{
			menu.classList.add("menu_closed");
			menu.classList.remove("menu_opened");
		}
		elem.classList.toggle("menu_opened");
	}
}

function Masonry(parentSelector){
	let parent = document.querySelector(parentSelector);
	
	let coords = [];
	
	Array.from(parent.children).forEach(function(child){
		child.style.top = "";
		let boundingRect = child.getBoundingClientRect();
		coords.push({x:boundingRect.x,y:boundingRect.y,h:boundingRect.height,item:child});
		
	});
	
	coords.sort(function(a, b) {
		if (a.x < b.x) return -1;		
		if (a.x > b.x) return 1;
		if(a.y < b.y) return -1;
		if(a.y > b.y) return 1;
		
		return 0;
	});
	
	var maxHeight = 0;
	
	for(let i = 0; i < coords.length;i++){
		
		let sameX = [];
		
		for (let j = i + 1; j < coords.length;j++){
			
			if(coords[j].x == coords[i].x){
				sameX.push(coords[j]);
				coords.splice(j, 1);
				j--;
			}
		}
		
		var topOrig =  coords[i].y + coords[i].h;
		
		var height = coords[i].h;
		
		for(let j = 0; j < sameX.length;j++){

			let delta = sameX[j].y - topOrig;
			
			sameX[j].item.style.top = (-delta) + "px";
			
			topOrig += sameX[j].h;
			height += sameX[j].h;
		}
		
		if (maxHeight < height) maxHeight = height;
	}
	parent.style.height = maxHeight + "px";
	
}

function GoDown(){
	jQuery(document.documentElement).animate({scrollTop: jQuery(".welcomeBannerInner").height()}, 500);
}

function GetElementIndex(element){
	
	let i = 0;
	while( (element = element.previousElementSibling) != null ) i++;
	
	return i;
}

function SetArrowUnder(){
	let elem = document.querySelector(".portfolioGalleryMenu > li > .active");
	let rect = elem.getBoundingClientRect();
	
	let arrowUnder = document.getElementById("arrowUnder");
	
	arrowUnder.style.left = (rect.left - arrowUnder.parentElement.getBoundingClientRect().left + 1) + "px";
	arrowUnder.style.top = (rect.top - arrowUnder.parentElement.getBoundingClientRect().top + 16.5) + "px";
	arrowUnder.style.width = (rect.width - 7) + "px";
}

function OpenTab(elem){
	
	Array.from(document.querySelectorAll(".portfolioGalleryMenu > li > .active")).forEach(function(item){item.classList.remove("active");});
	
	elem.classList.add("active");
	
	SetArrowUnder();
	
	/*let rect = elem.getBoundingClientRect();
	
	let arrowUnder = document.getElementById("arrowUnder");
	
	arrowUnder.style.left = (rect.left - arrowUnder.parentElement.getBoundingClientRect().left + 1) + "px";
	arrowUnder.style.width = (rect.width - 7) + "px";*/
	
	let filter = elem.getAttribute("filter");
	
	let galleryItemActive = document.querySelector(".portfolioGalleryContainer " + " ." + filter);
	
	Array.from(document.querySelectorAll(".portfolioGalleryContainer > ul > li.active")).forEach(function(item){
		item.classList.remove("active");
	});
	
	galleryItemActive.classList.add("active");
	
	document.querySelector(".portfolioGalleryContainer > ul").style.marginLeft = ( - GetElementIndex(galleryItemActive) * 100) + "%";
}

function MoveToSlide(index){
	Array.from(document.querySelectorAll(".featuredProject > .active")).forEach(function(item){item.classList.remove("active");});
	document.querySelector(".featuredProject").children.item(index).classList.add("active");
	document.querySelector(".featuredProject").style.marginLeft = ( - (index) * 100) + "%";
	
}

function MoveSlideLeft(){
	let act = document.querySelector(".featuredProject > .active");
	
	let index = GetElementIndex(act);
	if(index == 1)
		document.querySelector(".featuredProjectArrowLeft").classList.add("disabled");
	if(document.querySelectorAll(".featuredProjectItem").length  > index)
		document.querySelector(".featuredProjectArrowRight").classList.remove("disabled");
	index--;
	MoveToSlide(index);
}

function MoveSlideRight(){
	let act = document.querySelector(".featuredProject > .active");
	
	let index = GetElementIndex(act);
	if(index == document.querySelectorAll(".featuredProjectItem").length - 2)
		document.querySelector(".featuredProjectArrowRight").classList.add("disabled");
	if(document.querySelectorAll(".featuredProjectItem").length  > 1)
		document.querySelector(".featuredProjectArrowLeft").classList.remove("disabled");
	index++;
	MoveToSlide(index);
}

window.addEventListener("DOMContentLoaded",function(){
	
	let portfolioFilterItemActive = document.querySelector(".portfolioGalleryMenu > li > .active");
	
	OpenTab(portfolioFilterItemActive);
	
	var map = L.map('contactmap',{zoomControl:false,attributionControl:false}).setView([44.77670,17.19740], 14);
	
	map.dragging.disable();
	map.touchZoom.disable();
	map.doubleClickZoom.disable();
	map.scrollWheelZoom.disable();
	map.boxZoom.disable();
	map.keyboard.disable();
	if (map.tap) map.tap.disable();
	
	var CartoDB_Positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
		subdomains: 'abcd',
		maxZoom: 19
	}).addTo(map);
	
	L.marker([44.77670,17.19740],{icon:L.icon({iconUrl: 'images/mapMarker_57x70.jpg',iconSize:[57,70],iconAnchor:[28.5,70]})}).addTo(map);
	
	Masonry(".masonry-grid");
	
	SetArrowUnder();
	
	window.addEventListener("resize",function(){
		
		Masonry(".masonry-grid");
		
		SetArrowUnder();
		
		if(window.innerWidth < 991){
			let menu = document.querySelector("ul.menu");
			if(!menu.style.height){
				
				menu.style.height = menu.getBoundingClientRect().height + "px";
				menu.classList.add("menu_closed");
			}
		}
	});
});