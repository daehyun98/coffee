    //리스트 담을 배열
    var cafeList = [];
    // 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
    var infowindow = new kakao.maps.InfoWindow({zIndex:1});
    
    var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
        mapOption = {
            center: new kakao.maps.LatLng(37.469221, 126.603234), // 지도의 중심좌표
            level: 10 // 지도의 확대 레벨
        };  
    
    // 지도를 생성합니다    
    var map = new kakao.maps.Map(mapContainer, mapOption); 
    
    // 장소 검색 객체를 생성합니다
    var ps = new kakao.maps.services.Places(); 
    
    // 키워드로 장소를 검색합니다
    ps.keywordSearch('인천 카페', placesSearchCB); 
    ps.keywordSearch('부평 테마 카페', placesSearchCB);
    ps.keywordSearch('구월동 감성카페', placesSearchCB);

    // 키워드 검색 완료 시 호출되는 콜백함수 입니다
    function placesSearchCB (data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {
            // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
            // LatLngBounds 객체에 좌표를 추가합니다
            var bounds = new kakao.maps.LatLngBounds();
    
            cafeList = data; // 데이터 저장(배열)
    
            for (var i=0; i<data.length; i++) {
                displayMarker(data[i]);    
                bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
            }       
    
            // // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
            // map.setBounds(bounds);
    
            // 완료후 맛집 리스트 표출(json을 text개체로)
            // console.log(cafeList);
            tag = "";
            for (var i=0; i < cafeList.length; i++) {
                var placeName = cafeList[i].place_name;
                var categoryName = cafeList[i].category_name;
                var addressName = cafeList[i].address_name;
                var phoneNum = cafeList[i].phone;

                tag += '<ul class="list">'
                    tag += '<li><h3>' + placeName + '</h3></li>'
                    tag += '<li><span>'  + categoryName + '</span></li>'
                    tag += '<li><span>' + addressName + '</span></li>'
                    tag += '<li><span class="tel">'+ phoneNum + '</span></li>'
                    tag += '</ul>'
            }

            $(".location_info").append(tag);
        } 
    }
    
    // 지도에 마커를 표시하는 함수입니다
    function displayMarker(place) {
    
        var imageSrc = '../images/marker/coffee_pin.png', // 마커이미지의 주소입니다    
        imageSize = new kakao.maps.Size(36, 54), // 마커이미지의 크기입니다
        imageOption = {offset: new kakao.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

        // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
            markerPosition = new kakao.maps.LatLng(place.y, place.x); // 마커가 표시될 위치입니다

        // 마커를 생성하고 지도에 표시합니다
        var marker = new kakao.maps.Marker({
            map: map,
            position: markerPosition, 
            image: markerImage // 마커이미지 설정 
        });
    
        // 마커에 클릭이벤트를 등록합니다
        kakao.maps.event.addListener(marker, 'click', function() {
            // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
            infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
            infowindow.open(map, marker);
        });
    }
