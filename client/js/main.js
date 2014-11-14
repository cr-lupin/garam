/** @jsx React.DOM */

var SubHikeItem = React.createClass({
  render: function() {
    return (
      <div className="subHikeItem"> 
        <div className="subHikeHeader">
          <span className="subHikeName"> {this.props.subhike.subname} </span> 
          <span className="subHikeDate"> {this.props.subhike.date} </span> 
        </div>
        <div className="subHikeContent">
          <div className="subHikeStart"> <span className="label">rajt: </span> 
                                         <span className="content"> {this.props.subhike.start} </span></div> 
          <div className="subHikeEnd"> <span className="label">cél: </span> 
                                       <span className="content"> {this.props.subhike.end} </span> </div> 
          <div className="subHikeOtherData">                    
            <span className="image"><img src="assets/time.gif" /> </span>
            <span className="subHikeTime"> {this.props.subhike.time} </span> 
            <span className="placeholder" />
            <span className="image"><img src="assets/price.gif" /> </span>
            <span className="subHikePrice"> {this.props.subhike.price} </span> 
            <span className="placeholder" />
            <span className="image"><img src="assets/distance.gif" /> </span>
            <span className="subHikeDistance"> {this.props.subhike.distance} </span>             
            <span className="placeholder" />
            <span className="image"><img src="assets/elevation.gif" /> </span>
            <span className="subHikeElevation"> {this.props.subhike.elevation} </span>
            <span className="placeholder" />
            <span className="image"><img src="assets/limit.gif" /> </span>
            <span className="subHikeLimit"> {this.props.subhike.limit} </span> 
            <span className="placeholder" />
            <span className="subHikeCaffee"> {this.props.subhike.caffee == "yes" ? "van kávé :)" : "nincs kv" } </span> 
          </div>
        </div>
      </div>
      
    )
  }
});

var SubHikeGroup = React.createClass({
  render: function() {
    var subHikeList = [];
    this.props.subhikes.forEach( function(subhike) {
      subHikeList.push( <SubHikeItem subhike={subhike}/> );
    });
    return (      
      <ul className="subHikeList"> {subHikeList} </ul>
    );
  }
});

var HikeItemDetails = React.createClass({
  render: function() {      
    return (
      <div className="hikeItemDetails">
        <div className="hikeItemDetailName" id={this.props.hikeItemDetails.id}> {this.props.hikeItemDetails.name} </div>
        <SubHikeGroup className="subHikeGroup" subhikes={this.props.hikeItemDetails.subhikes}/> 
      </div>
    );
  }
});

var HikeItemOverall = React.createClass({
    render: function() {
      return (
        <div className="hikeItemOverall" id={this.props.hikeItemOverall.id}> {this.props.hikeItemOverall.name} </div>
      );
    }
});

var HikeItem = React.createClass({
  getInitialState: function() {
    return {detail: false};
  },
  handleClick: function(event){
    $.ajax({
      url: 'test/hikedata.json',
      dataType: 'json',
      success: function(data) {      
        this.setState({hikeData: data.all, detail: !this.state.detail});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    var result = this.state.detail ?
      <HikeItemDetails hikeItemDetails={this.state.hikeData}/>:
      <HikeItemOverall hikeItemOverall={this.props.hikeItem} />
    return (
      <li className="hikeItem" onClick={this.handleClick}> {result} </li>
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
