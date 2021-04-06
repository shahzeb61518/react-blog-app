/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Row } from 'reactstrap';
import Select from 'react-select';
import IntlMessages from '../../helpers/IntlMessages';
import CustomSelectInput from '../../components/common/CustomSelectInput';
import { Colxx } from '../../components/common/CustomBootstrap';

const selectData = [
  { label: 'Cake', value: 'cake', key: 0 },
  { label: 'Cupcake', value: 'cupcake', key: 1 },
  { label: 'Dessert', value: 'dessert', key: 2 },
];

const ReactSelectExample = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  return (
    <Row>
      <Colxx xxs="12" md="6" className="mb-2">
        <h6>
          <span className="text-muted">Profile created for </span>: My Self
        </h6>
      </Colxx>
      <Colxx xxs="12" md="6" className="mb-2">
        <h6>
          <span className="text-muted">Name </span>: Rajesh Kamat
        </h6>
      </Colxx>

      <Colxx xxs="12" md="6" className="mb-2">
        <h6>
          <span className="text-muted">Body Type </span>: Average
        </h6>
      </Colxx>
      <Colxx xxs="12" md="6" className="mb-2">
        <h6>
          <span className="text-muted">Age </span>: 39 Years
        </h6>
      </Colxx>

      <Colxx xxs="12" md="6" className="mb-2">
        <h6>
          <span className="text-muted">Physical Status </span>: Normal
        </h6>
      </Colxx>
      <Colxx xxs="12" md="6" className="mb-2">
        <h6>
          <span className="text-muted">Height </span>: 5 Ft 4 In / 163 Cms
        </h6>
      </Colxx>

      <Colxx xxs="12" md="6" className="mb-2">
        <h6>
          <span className="text-muted">Weight </span>: 69 Kgs / 152 lbs
        </h6>
      </Colxx>
      <Colxx xxs="12" md="6" className="mb-2">
        <h6>
          <span className="text-muted">Mother Tongue </span>: Marathi
        </h6>
      </Colxx>

      <Colxx xxs="12" md="6" className="mb-2">
        <h6>
          <span className="text-muted">Marital Status</span>: Widowed
        </h6>
      </Colxx>
      <Colxx xxs="12" md="6" className="mb-2">
        <h6>
          <span className="text-muted">No.of Children </span>: None
        </h6>
      </Colxx>

      <Colxx xxs="12" md="6" className="mb-2">
        <h6>
          <span className="text-muted">Child Living Status </span>: N/A
        </h6>
      </Colxx>
      <Colxx xxs="12" md="6" className="mb-2">
        <h6>
          <span className="text-muted">Eating Habits </span>: Non Vegetarian
        </h6>
      </Colxx>

      <Colxx xxs="12" md="6" className="mb-2">
        <h6>
          <span className="text-muted">Drinking Habits </span>: Never drinks
        </h6>
      </Colxx>
      <Colxx xxs="12" md="6" className="mb-2">
        <h6>
          <span className="text-muted">Smoking Habits </span>: Never smokes
        </h6>
      </Colxx>
    </Row>
  );
};
export default ReactSelectExample;
