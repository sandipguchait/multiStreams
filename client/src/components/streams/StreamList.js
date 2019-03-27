import React from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions/index';

import { Link } from 'react-router-dom';


class StreamList extends React.Component {

    componentDidMount(){
        this.props.fetchStreams();
    }

    renderButtons = stream => {
        //checking if the user Id on the stream is = userid that is logged in 
        if(stream.userId === this.props.currentUserId) {
            return (
                <div className="right floated content" >
                    <Link to={`/streams/edit/${stream.id}`} className="ui button primary">
                      Edit
                    </Link>
                    <Link to={`/streams/delete/${stream.id}`} className="ui button negative">
                      Delete
                    </Link>
                </div>
            )
        }
    }

    renderList() {
        return this.props.streams.map(stream => (
            <div className="item" key={stream.id}>
                {this.renderButtons(stream)}
                <i className="large middle aligned icon camera" />
                    <div className="content">
                    <Link to={`/streams/${stream.id}`} className="header">
                        {stream.title}
                    </Link>
                        <div className="description">{stream.description}</div>
                    </div>
            </div>
        ))
    }

    renderCreateStreamButton = () => {
        // checking if user is signed In or not 
        if (this.props.isSignedIn) {
            return (
                <div style={{ textAlign: 'right'}}>
                <Link to="/streams/new" className="ui button primary">
                    Create Stream
                </Link>
           </div>
            )
        }
    }


    render(){
    return (
        <div>
            <h2>Streams</h2>
            <div className="ui celled list">{this.renderList()}</div>
            {this.renderCreateStreamButton()}
        </div>
    );
   }
};

const mapStateToProps = (state) => {
    //using Object.values to convert List of streams from object to array
    return { 
        streams: Object.values(state.streams ),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    }
}

export default connect(mapStateToProps,{ fetchStreams })(StreamList);