import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../actions';
import { Avatar } from '../../components/Avatar';

class Updatepage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstname: this.props.user.firstname || '',
            lastname: this.props.user.lastname || '',
            avatar: null,
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        if(name === 'avatar')
          this.setState({
            avatar: e.target.files[0]
          })
        else
          this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { firstname,lastname, avatar } = this.state;
        const { dispatch } = this.props;
        if(firstname &&lastname)
          dispatch(userActions.update({ firstname,lastname,avatar }));
    }

    render() {
        const { loggingIn } = this.props;
        const { submitted,firstname,lastname, avatar } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Update</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                <div className={'form-group' + (submitted && !firstname ? ' has-error' : '')}>
                        <label htmlFor="avatar">Avatar</label>
                        <input type="file" className="form-control" name="avatar" onChange={this.handleChange} />
                        {/* {submitted && !avatar &&
                            <div className="help-block">Avatar is required</div>
                        } */}
                        <Avatar src={avatar} />
                    </div>
                <div className={'form-group' + (submitted && !firstname ? ' has-error' : '')}>
                        <label htmlFor="firstname">Firstname</label>
                        <input type="text" className="form-control" name="firstname" value={firstname} onChange={this.handleChange} />
                        {submitted && !firstname &&
                            <div className="help-block">Firstname is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !lastname ? ' has-error' : '')}>
                        <label htmlFor="lastname">Lastname</label>
                        <input type="text" className="form-control" name="lastname" value={lastname} onChange={this.handleChange} />
                        {submitted && !lastname &&
                            <div className="help-block">Lastname is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Update</button>
                        {loggingIn &&
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn,user } = state.authentication;
    return {
        loggingIn,
        user
    };
}

export default connect(mapStateToProps)(Updatepage);
