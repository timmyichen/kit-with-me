import * as React from 'react';
import Layout from '@/client/layout/Layout.react';

class MyInfo extends React.Component {
  static async getInitialProps(ctx) {
    return { path: ctx.asPath };
  }

  render() {
    return (
      <Layout path={this.props.path}>
        <div>
          <div className="ui vertical masthead inverted blue center aligned segment">
            <div className="ui text container">
              <h1 className="ui header inverted">My Info</h1>
            </div>
          </div>
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