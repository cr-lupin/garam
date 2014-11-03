/** @jsx React.DOM */

var HikeItemOverall = React.createClass({
	render: function() {
		return (
			<div className="hikeItemOverall" id={this.props.hikeItemOverall.id}> {this.props.hikeItemOverall.name} </div>
		);
	}
});

var HikeItem = React.createClass({
	render: function() {
		return (
			<li className="hikeItem"> <HikeItemOverall hikeItemOverall={this.props.hikeItem} /> </li>
		);
	}
});

var HikeList = React.createClass({
	render: function() {
		var hikeList = [];
		this.props.hikes.forEach( function(hike) {
			hikeList.push( <HikeItem key={hike.id} hikeItem={hike}/> );
		});
		return (
			<ul className="hikeList"> {hikeList} </ul>
		);
	}
});

var HikesInOneDay = React.createClass({
	render: function() {
		return (
			<li className="hikesInOneDayList">
				<div className="dateRow"> { this.props.hikesInOneDay.date } </div>
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
			<ul className="hikesInOneDayList">
				{hikesInOneDayList}    
			</ul>
		);
	}
});

var MainContent = React.createClass({
	getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
      	console.error(data);
        this.setState({data: data.all});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
	render: function() {
			return (
				<div className="mainContent">
					<HikesInOneDayList hikesPerDayListData={this.state.data} />
				</div>
			);
	}
});



var ALL = [
	{ date: '2014.09.27',
		hikes: [ { name: 'tura1', id: '1'}, { name: 'tura2', id: '2'}, { name: 'tura3', id: '3'} ]
	},
	{ date: '2014.09.29',
		hikes: [ { name: 'tura4', id: '4'}, { name: 'tura5', id: '5'}, { name: 'tura62', id: '62'} ]
	} ];



//React.renderComponent(<MainContent hikesPerDayListData={ALL} />, document.body);
React.renderComponent(<MainContent url="test/data.json" />, document.body);
