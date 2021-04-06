import React from 'react';
import {
  Row,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardImg,
  CardText,
  Button,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';

import IntlMessages from '../../helpers/IntlMessages';
import { Colxx } from '../../components/common/CustomBootstrap';
import ThumbnailImage from '../../components/cards/ThumbnailImage';
import ThumbnailLetters from '../../components/cards/ThumbnailLetters';
import { adminRoot } from '../../constants/defaultValues';

const UserCardExamples = () => {
  return (
    <Card className="d-flex flex-row mb-12">
      <NavLink to={`${adminRoot}/cards`} className="d-flex">
        <ThumbnailLetters rounded small text="Sarah Kortney" className="m-4" />
      </NavLink>
      <div className=" d-flex flex-grow-1 min-width-zero">
        <CardBody className=" pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
          <div className="min-width-zero">
            <NavLink to={`${adminRoot}/cards`}>
              <CardSubtitle className="truncate mb-1">
                Sarah Kortney
              </CardSubtitle>
            </NavLink>
            <CardText className="text-muted text-small mb-2">
              Executive Director
            </CardText>
          </div>
        </CardBody>
      </div>
    </Card>
  );
};

export default UserCardExamples;
