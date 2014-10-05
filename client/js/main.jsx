

var HikesInOneDay = React.createClass({
	render: function() {
		return (
			<li class="hikesInOneDayList">
				<div class="dateRow"> { this.props.date } </div>
				<HikeList hikes={this.props.hikes>
			</li> 
		);
	}
});

var HikesInOneDayList = React.createClass({
	render: function() {
		var hikesInOneDayList = [];
		this.props.all.forEach(function(hikesInOneDay) {
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
            <HikesInOneDayList hikes={this.props.all}
        	</div>
        );
    }
});



var ALL = [
	{ date: '2014.09.27',
		hikes: [ { name: 'tura1', id: '1'}, { name: 'tura2', id: '2'}, { name: 'tura3', id: '3'} ]
	},
	{ date: '2014.09.27',
		hikes: [ { name: 'tura4', id: '4'}, { name: 'tura5', id: '5'}, { name: 'tura6', id: '6'} ]
	} ];
	
React.renderComponent(<MainContent products={PRODUCTS} />, document.body);