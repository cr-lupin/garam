/** @jsx React.DOM */

var HikeList = React.createClass({
	render: function() {
		var hikeList = [];
		this.props.hikes.forEach( function(hike) {
			hikeList.push( <span> {hike.name} </span> );
		});
		return (
			<li> {hikeList} </li>
		);
	}
});

var HikesInOneDay = React.createClass({
	render: function() {
		return (
			<li class="hikesInOneDayList">
				<div class="dateRow"> { this.props.hikesInOneDay.date } </div>
				<HikeList hikes={this.props.hikesInOneDay.hikes} />
			</li> 
		);
	}
});

var HikesInOneDayList = React.createClass({
	render: function() {
		var hikesInOneDayList = [];
		this.props.hikesPerDayListData.forEach( function(hikesInOneDay) {
				hikesInOneDayList.push(<HikesInOneDay hikesInOneDay={hikesInOneDay} />);
		});
		return (
			<ul class="hikesInOneDayList">
				{hikesInOneDayList}    
			</ul>
		);
	}
});

var MainContent = React.createClass({
    render: function() {
        return (
					<div class="mainContent">
            <HikesInOneDayList hikesPerDayListData={this.props.hikesPerDayListData} />
        	</div>
        );
    }
});



var ALL = [
	{ date: '2014.09.27',
		hikes: [ { name: 'tura1', id: '1'}, { name: 'tura2', id: '2'}, { name: 'tura3', id: '3'} ]
	},
	{ date: '2014.09.28',
		hikes: [ { name: 'tura4', id: '4'}, { name: 'tura5', id: '5'}, { name: 'tura6', id: '6'} ]
	} ];

React.renderComponent(<MainContent hikesPerDayListData={ALL} />, document.body);
//React.renderComponent(<span>almafa2</span>, document.body);
