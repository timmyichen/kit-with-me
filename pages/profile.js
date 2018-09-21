import * as React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import Layout from '@/client/layout/Layout.react';

class MyInfo extends React.Component {
  static async getInitialProps(ctx) {
    console.log(ctx.req.params);
    return {
      path: ctx.asPath,
      profileName: ctx.req.params.profileName,
    };
  }

  render() {
    return (
      <Layout path={this.props.path}>
        <div>
          {this.props.profileName}
          's profile
        </div>
        <div>
          <Button color="blue" icon labelPosition="left">
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

export default MyInfo;
