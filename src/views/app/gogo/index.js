import React from 'react';
import { Row } from 'reactstrap';
import IntlMessages from '../../../helpers/IntlMessages';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';

const Start = ({ match }) => (
  <>
    <Row>
      <Colxx xxs="12" className="mb-4">
        <h1>Welcome ...</h1>
      </Colxx>
    </Row>
  </>
);
export default Start;
