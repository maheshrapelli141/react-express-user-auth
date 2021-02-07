import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../actions';

class HomePage extends React.Component {
    
    render() {
        const { user } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hi {user.firstname}!</h1>
                <p>You're logged in with React & JWT!!</p>
                <h3>Users from secure api end point:</h3>
                <Link to="/update">Update Profile</Link>
                <p>
                    <Link to="/login">Logout</Link>
                </p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

export default connect(mapStateToProps)(HomePage);
// export { connectedHomePage as HomePage };
