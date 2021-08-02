// 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
var infowindow = new kakao.maps.InfoWindow({zIndex:1});

var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = {
        center: new kakao.maps.LatLng(37.469221, 126.603234), // 지도의 중심좌표
        level: 9 // 지도의 확대 레벨
    };  

// 지도를 생성합니다    
var map = new kakao.maps.Map(mapContainer, mapOption); 

// 장소 검색 객체를 생성합니다
var ps = new kakao.maps.services.Places(); 

// 키워드로 장소를 검색합니다

//카페 매장검색
ps.keywordSearch('인천 스타벅스', placesSearchCB); 
ps.keywordSearch('인천 투썸플레이스', placesSearchCB); 
ps.keywordSearch('인천 이디야', placesSearchCB); 
ps.keywordSearch('인천 할리스', placesSearchCB); 


function insertHTML(list, place) {
    switch (place) {
        case "star": 
                // console.log("starList: " + JSON.stringify(list));
                var starPosition = [];
                var tag = "";
                for (var i=0; i < list.length; i++) {
                    starPosition.push(new kakao.maps.LatLng(list[i].y, list[i].x));
                    
                    var placeName = list[i].place_name;
                    var categoryName = list[i].category_name;
                    var addressName = list[i].address_name;
                    var phoneNum = list[i].phone;

                    tag += '<ul class="list">'
                    tag += '<li><h3>' + placeName + '</h3></li>'
                    tag += '<li><span>'  + categoryName + '</span></li>'
                    tag += '<li><span>' + addressName + '</span></li>'
                    tag += '<li><span class="tel">'+ phoneNum + '</span></li>'
                    tag += '</ul>'
                }
                // console.log(starPosition);
                // console.log(list);
                createStarMarkers(starPosition);
            
                $(".star_info").append(tag);

            break;
        case "twosome": 
                // console.log("twosomeList: " + JSON.stringify(list));
                var twosomePosition = [];
                var tag = "";

                for (var i=0; i < list.length; i++) {
                    twosomePosition.push(new kakao.maps.LatLng(list[i].y, list[i].x));
                
                    var placeName = list[i].place_name;
                    var categoryName = list[i].category_name;
                    var addressName = list[i].address_name;
                    var phoneNum = list[i].phone;

                    tag += '<ul class="list">'
                    tag += '<li><h3>' + placeName + '</h3></li>'
                    tag += '<li><span>'  + categoryName + '</span></li>'
                    tag += '<li><span>' + addressName + '</span></li>'
                    tag += '<li><span>'+ phoneNum + '</span></li>'
                    tag += '</ul>'
                }
                // console.log(twosomePosition);
                createTwosomeMarkers(twosomePosition);

                $(".twosome_info").append(tag);

            break;
        case "ediya": 
                // console.log("ediyaList: " + JSON.stringify(list));
                var eidyaPosition = [];
                var tag = "";

                for (var i=0; i < list.length; i++) {
                    eidyaPosition.push(new kakao.maps.LatLng(list[i].y, list[i].x));
                    
                    var placeName = list[i].place_name;
                    var categoryName = list[i].category_name;
                    var addressName = list[i].address_name;
                    var phoneNum = list[i].phone;

                    tag += '<ul class="list">'
                    tag += '<li><h3>' + placeName + '</h3></li>'
                    tag += '<li><span>'  + categoryName + '</span></li>'
                    tag += '<li><span>' + addressName + '</span></li>'
                    tag += '<li><span>'+ phoneNum + '</span></li>'
                    tag += '</ul>'
                }
                // console.log(eidyaPosition);
                createEdiyaMarkers(eidyaPosition);
                $(".ediya_info").append(tag);
            break;
        case "hollis": 
                // console.log("hollisList: " + JSON.stringify(list));
                var hollisPosition = [];
                var tag = "";

                for (var i=0; i < list.length; i++) {
                    hollisPosition.push(new kakao.maps.LatLng(list[i].y, list[i].x));
                    
                    var placeName = list[i].place_name;
                    var categoryName = list[i].category_name;
                    var addressName = list[i].address_name;
                    var phoneNum = list[i].phone;

                    tag += '<ul class="list">'
                    tag += '<li><h3>' + placeName + '</h3></li>'
                    tag += '<li><span>'  + categoryName + '</span></li>'
                    tag += '<li><span>' + addressName + '</span></li>'
                    tag += '<li><span>'+ phoneNum + '</span></li>'
                    tag += '</ul>'
                }
                // console.log(hollisPosition);
                createHollisMarkers(hollisPosition);
                $(".hollis_info").append(tag);

            break;

    }
}



// 키워드 검색 완료 시 호출되는 콜백함수 입니다
function placesSearchCB (data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {

            var placeNM = data[0].place_name;

            if (placeNM.indexOf('스타벅스') > -1) {
                insertHTML(data, "star");
            } else if (placeNM.indexOf('투썸') > -1) {
                insertHTML(data, "twosome");
            } else if (placeNM.indexOf('이디야') > -1) {
                insertHTML(data, "ediya");
            } else if (placeNM.indexOf('할리스') > -1) {
                insertHTML(data, "hollis");

            }

            changeMarker('star'); 

    } 
}


var markerImageSrc = '../images/marker/css_sprites.png';  // 마커이미지의 주소입니다. 스프라이트 이미지 입니다
    starMarkers = [], // 스타벅스 마커 객체를 가지고 있을 배열입니다
    twosomeMarkers = [], //투썸플레이스 마커 객체를 가지고 있을 배열입니다
    ediyaMarkers = []; // 이디야 마커 객체를 가지고 있을 배열입니다
    hollisMarkers = []; // 할리스 마커 객체를 가지고 있을 배열입니다    

// 마커이미지의 주소와, 크기, 옵션으로 마커 이미지를 생성하여 리턴하는 함수입니다
function createMarkerImage(src, size, options) {
    var markerImage = new kakao.maps.MarkerImage(src, size, options);
    return markerImage;            
}

// 좌표와 마커이미지를 받아 마커를 생성하여 리턴하는 함수입니다
function createMarker(position, image) {
    var marker = new kakao.maps.Marker({
        position: position,
        image: image
    });
    
    return marker;  
}   

/// 스타벅스 마커를 생성하고 스타벅스 마커 배열에 추가하는 함수입니다
function createStarMarkers(starPosition) {
    
    for (var i = 0; i < starPosition.length; i++) {  
        
        var imageSize = new kakao.maps.Size(36, 54),
            imageOptions = {  
                spriteOrigin: new kakao.maps.Point(0, 9),    
                spriteSize: new kakao.maps.Size(36, 276)  
            };     
        
        // 마커이미지와 마커를 생성합니다
        var markerImage = createMarkerImage(markerImageSrc, imageSize, imageOptions),    
            marker = createMarker(starPosition[i], markerImage);  
        
        // 생성된 마커를 스타벅스 마커 배열에 추가합니다
        starMarkers.push(marker);
    }     
}

// 스타벅스 마커들의 지도 표시 여부를 설정하는 함수입니다
function setStarMarkers(map) {        
    for (var i = 0; i < starMarkers.length; i++) {  
        starMarkers[i].setMap(map);
    }        
}



//투썸플레이스 마커를 생성하고투썸플레이스 마커 배열에 추가하는 함수입니다
function createTwosomeMarkers(twosomePosition) {
    for (var i = 0; i < twosomePosition.length; i++) {
        
        var imageSize = new kakao.maps.Size(36, 54),
            imageOptions = {   
                spriteOrigin: new kakao.maps.Point(0, 78),    
                spriteSize: new kakao.maps.Size(36, 276)  
            };       

        // 마커이미지와 마커를 생성합니다
        var markerImage = createMarkerImage(markerImageSrc, imageSize, imageOptions),    
            marker = createMarker(twosomePosition[i], markerImage);  

        // 생성된 마커를투썸플레이스 마커 배열에 추가합니다
        twosomeMarkers.push(marker);    
    }        
}

//투썸플레이스 마커들의 지도 표시 여부를 설정하는 함수입니다
function setTwosomeMarkers(map) {        
    for (var i = 0; i < twosomeMarkers.length; i++) {  
        twosomeMarkers[i].setMap(map);
    }        
}

// 이디야 마커를 생성하고 이디야 마커 배열에 추가하는 함수입니다
function createEdiyaMarkers(ediyaPosition) {
    for (var i = 0; i < ediyaPosition.length; i++) {
        
        var imageSize = new kakao.maps.Size(36, 54),
            imageOptions = {   
                spriteOrigin: new kakao.maps.Point(0, 147),    
                spriteSize: new kakao.maps.Size(36, 276)  
            };       

        // 마커이미지와 마커를 생성합니다
        var markerImage = createMarkerImage(markerImageSrc, imageSize, imageOptions),    
            marker = createMarker(ediyaPosition[i], markerImage);  

        // 생성된 마커를 이디야 마커 배열에 추가합니다
        ediyaMarkers.push(marker);        
    }                
}

// 이디야 마커들의 지도 표시 여부를 설정하는 함수입니다
function setEdiyaMarkers(map) {        
    for (var i = 0; i < ediyaMarkers.length; i++) {  
        ediyaMarkers[i].setMap(map);
    }        
}

// 할리스 마커를 생성하고 할리스 마커 배열에 추가하는 함수입니다
function createHollisMarkers(hollisPosition) {
    for (var i = 0; i < hollisPosition.length; i++) {
        
        var imageSize = new kakao.maps.Size(36, 54),
            imageOptions = {   
                spriteOrigin: new kakao.maps.Point(0, 216),    
                spriteSize: new kakao.maps.Size(36, 276)  
            };       

        // 마커이미지와 마커를 생성합니다
        var markerImage = createMarkerImage(markerImageSrc, imageSize, imageOptions),    
            marker = createMarker(hollisPosition[i], markerImage);  

        // 생성된 마커를 할리스 마커 배열에 추가합니다
        hollisMarkers.push(marker);        
    }                
}

// 할리스 마커들의 지도 표시 여부를 설정하는 함수입니다
function setHollisMarkers(map) {        
    for (var i = 0; i < hollisMarkers.length; i++) {  
        hollisMarkers[i].setMap(map);
    }        
}



// 카테고리를 클릭했을 때 type에 따라 카테고리의 스타일과 지도에 표시되는 마커를 변경합니다
function changeMarker(type){
    
    var starMenu = document.getElementById('starMenu');
    var twosomeMenu = document.getElementById('twosomeMenu');
    var ediyaMenu = document.getElementById('ediyaMenu');
    var hollisMenu = document.getElementById('hollisMenu');
    
    var starInfo = document.getElementById('starInfo');
    var twosomeInfo = document.getElementById('twosomeInfo');
    var ediyaInfo = document.getElementById('ediyaInfo');
    var hollisInfo = document.getElementById('hollisInfo');

    // 스타벅스 카테고리가 클릭됐을 때
    if (type === 'star') {
    
        // 스타벅스 카테고리를 선택된 스타일로 변경하고
        starMenu.className = 'menu_selected';
        
        
        //투썸플레이스과 주차장 카테고리는 선택되지 않은 스타일로 바꿉니다
        twosomeMenu.className = '';
        ediyaMenu.className = '';
        hollisMenu.className = '';
        
        // 스타벅스 마커들만 지도에 표시하도록 설정합니다
        setStarMarkers(map);
        setTwosomeMarkers(null);
        setEdiyaMarkers(null);
        setHollisMarkers(null);
        
        //목록 표출
        starInfo.style.display = "block";
        twosomeInfo.style.display = "none";
        ediyaInfo.style.display = "none";
        hollisInfo.style.display = "none";

    } else if (type === 'twosome') { //투썸플레이스 카테고리가 클릭됐을 때
    
        //투썸플레이스 카테고리를 선택된 스타일로 변경하고
        starMenu.className = '';
        twosomeMenu.className = 'menu_selected';
        ediyaMenu.className = '';
        hollisMenu.className = '';
        
        //투썸플레이스 마커들만 지도에 표시하도록 설정합니다
        setStarMarkers(null);
        setTwosomeMarkers(map);
        setEdiyaMarkers(null);
        setHollisMarkers(null);

        //목록 표출
        starInfo.style.display = "none";
        twosomeInfo.style.display = "block";
        ediyaInfo.style.display = "none";
        hollisInfo.style.display = "none";
        
    }  else if (type === 'ediya') { //이디야 카테고리가 클릭됐을 때
    
        //이디야 카테고리를 선택된 스타일로 변경하고
        starMenu.className = '';
        twosomeMenu.className = '';
        ediyaMenu.className = 'menu_selected';
        hollisMenu.className = '';
        
        //이디야 마커들만 지도에 표시하도록 설정합니다
        setStarMarkers(null);
        setTwosomeMarkers(null);
        setEdiyaMarkers(map);
        setHollisMarkers(null);
        
        //목록 표출
        starInfo.style.display = "none";
        twosomeInfo.style.display = "none";
        ediyaInfo.style.display = "block";
        hollisInfo.style.display = "none";
    }
    else if (type === 'hollis') { //할리스 카테고리가 클릭됐을 때
    
        //할리스 카테고리를 선택된 스타일로 변경하고
        starMenu.className = '';
        twosomeMenu.className = '';
        ediyaMenu.className = '';
        hollisMenu.className = 'menu_selected';
        
        //할리스 마커들만 지도에 표시하도록 설정합니다
        setStarMarkers(null);
        setTwosomeMarkers(null);
        setEdiyaMarkers(null);
        setHollisMarkers(map);
        
        //목록 표출
        starInfo.style.display = "none";
        twosomeInfo.style.display = "none";
        ediyaInfo.style.display = "none";
        hollisInfo.style.display = "block";
        
    }

    
};