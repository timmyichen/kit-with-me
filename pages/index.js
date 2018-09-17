import * as React from 'react';
import Layout from '@/client/layout/Layout.react';

class Index extends React.Component {
  render() {
    return (
      <Layout>
        <div className="pusher">
          <div className="ui vertical masthead inverted blue center aligned segment">
            <div className="ui text container">
              <h1 className="ui header inverted">Keep in Touch</h1>
              <h2>Never lose track of a friend again</h2>
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

export default Index;
