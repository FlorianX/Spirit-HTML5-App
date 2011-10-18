/**
 *	will be called by if the document is ready or the user clicked the update button 
 *  
 *  @param boolean live decides the fetching method.
 *  
 */
function getNews(live){
	// shows the loading animation
	$.mobile.showPageLoadingMsg();
	// JS knows no default parameter values therefore this
	live = typeof(live) != 'undefined' ? live : false;
	
	// check if localStorage is available
	if(typeof localStorage !== 'undefined'){
		// get the saved data if it's available
		var localNewsJSON = localStorage.getItem('SpiritApp_News');
	}
	
	// check if there is data from the localStorage and
	// whether the data must be fetched live 
	if(localNewsJSON && !live){
		// call renderNews with the data from the localStorage
		renderNews(JSON.parse(localNewsJSON));
	}else{
		// fetch the news from the REST interface of the news plattform 
		$.ajax({
		  url: "http://spirit.fh-schmalkalden.de/rest/news",
		  dataType: 'json',
		  success: function (data){
				// save the data to the localStorage
				localStorage.setItem('SpiritApp_News', JSON.stringify(data));
				// call renderNews with the fetched data
				renderNews(data);
			},
		  error: function(jqXHR, textStatus, errorThrown){
		      // hide the loading animation
			  $.mobile.hidePageLoadingMsg();
			  alert("Konnte keine Verbindung zum Server herstellen!");
		    }
		});
	}
}

/**
 * This function creates the html for the news.
 * 
 *
 * @param JSON news 
 */
function renderNews(news){
	// needed for html creation
	var items = [];

	// jQery utility funtion
	$.each(news, function(key, value) {
		// create a JavaScript Date object
		var date = new Date(value.date);
		
		// create the html for each news
		// the data-* attributes are used by jQuery mobile 
		var html = '<li><a href="#news-item-' + value.nr + '" data-transition="none">' +
			'<h3>' + value.subject + '</h3>' +
			'<p><strong>' + value.semester + '</strong></p>' +
			'<p class="ui-li-aside"><strong>' + date.getDate() + '.' + date.getMonth() + '. ' + checkTime(date.getHours()) + ':' + checkTime(date.getMinutes())  + '</strong>Uhr</p>' +
			'<p>by ' + value.writer + '</p>' +
			'</a></li>';
		
		var newsItem = '<div id="news-item-'+ value.nr +'" data-role="page" data-add-back-btn="true" data-theme="b" class="singleNews">' +
			'<div data-role="header"><h1></h1></div>' +
			'<div data-role="content">' + 
				'<h4>' + value.subject + '</h4>' +
				'<span>' + convert(value.news) + '</span>' + 
			'</div></div>';
			
		items.push(html);
		$('#newsPage').after(newsItem);
	});
	// create a div in the content area
	// with the joined news
	$('#newsList').html($('<ul/>', {
		'data-role': 'listview',
		html: items.reverse().join('')
		// trigger create to rerender the page by jQuery Mobile
	})).trigger( 'create' );
	
	// hide the loading animation
	$.mobile.hidePageLoadingMsg();
}

/**
 *	will be called if the user changes to timetable view
 *  
 *  
 */
function getSchedule(){
	// shows the loading animation
	$.mobile.showPageLoadingMsg();
	// check if localStorage is available
	if(typeof localStorage !== 'undefined'){
		// get the saved data if it's available
		var localScheduleJSON = localStorage.getItem('SpiritApp_Schedule');
	}
	
	// check if there is data from the localStorage and
	// whether the data must be fetched live 
	if(localScheduleJSON){
		// call renderNews with the data from the localStorage
		renderSchedule(JSON.parse(localScheduleJSON));
	}else{
		// fetch the news from the REST interface of the news plattform 
		$.ajax({
		  url: "http://spirit.fh-schmalkalden.de/rest/schedule",
		  data: {classname:'mai1'},
		  dataType: 'json',
		  success: function (data){
				// save the data to the localStorage
				localStorage.setItem('SpiritApp_Schedule', JSON.stringify(data));
				// call renderNews with the fetched data
				renderSchedule(data);
			},
		  error: function(jqXHR, textStatus, errorThrown){
		      // hide the loading animation
			  $.mobile.hidePageLoadingMsg();
			  alert("Konnte keine Verbindung zum Server herstellen!");
		    }
		});
	}
}

/**
 * This function creates the html for the schedule.
 * 
 *
 * @param JSON schedule 
 */
function renderSchedule(schedule){
	// needed for html creation
	var items = [];
	// jQery utility funtion
	$.each(schedule, function(key, value) {
		/*switch (value.time){
			case '08.15-09.45':
				var strg = 'test';
		
		}*/
		$('#' + value.appointment.day + ' > .').append('haloo');
	});
	// hide the loading animation
	$.mobile.hidePageLoadingMsg();
}


function checkTime(i)
{
	if (i<10)
	  {
		  i="0" + i;
	  }
	return i;
}