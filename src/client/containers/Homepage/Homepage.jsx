import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Avatar } from '../../components/Avatar';
import { userActions } from '../../actions';

class HomePage extends React.Component {
    
    render() {
        const { user } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
              <Avatar src={user.avatar}/>
                <h1>Hi {user.firstname} {user.lastname}!</h1>
                <strong>({user.email})</strong>
                <p>You're logged in with React & JWT!!</p>
                <p>Now you can:</p>
                <ul>
                  <li><Link to="/update">Update Profile</Link></li>
                  <li><Link to="/login">Logout</Link></li>
                </ul>
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
