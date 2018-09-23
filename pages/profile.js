import * as React from 'react';
import axios from 'axios';
import { Button, Icon } from 'semantic-ui-react';
import Layout from '@/client/layout/Layout.react';

class ProfilePage extends React.Component {
  static async getInitialProps(ctx) {
    console.log(ctx.req.params);
    return {
      path: ctx.asPath,
      profileName: ctx.req.params.profileName,
    };
  }

  state = {
    profileUser: null,
  };

  componentDidMount() {
    this.getProfileUser();
  }

  async getProfileUser() {
    const res = await axios.get(`/api/user/profile/${this.props.profileName}`);
    const profileUser = res.data;

    this.setState({ profileUser });
  }

  addFriend = async () => {
    if (!this.state.profileUser) return;

    try {
      await axios.post('/api/friends/request', {
        id: this.state.profileUser.id,
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  render() {
    return (
      <Layout path={this.props.path}>
        <div>
          {this.props.profileName}
          's profile
        </div>
        <div>
          <Button
            color="blue"
            icon
            labelPosition="left"
            onClick={this.addFriend}
          >
            <Icon name="user plus" />
            Add Friend
          </Button>
          <Button color="red" icon labelPosition="left">
            <Icon name="ban" />
            Block
          </Button>
        </div>
        <style jsx>{`
          .ui.masthead.segment {
            min-height: 700px;
          }
          .ui.text.container {
            margin: 200px auto;
          }
        `}</style>
      </Layout>
    );
  }
}

export default ProfilePage;
