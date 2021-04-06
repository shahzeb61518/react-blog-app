import React from "react";
import { Card, CardBody } from "reactstrap";
import moment from "moment";

const MessageCard = ({ sender, item, img, currentUserid }) => {
  return (
    <>
      <Card
        className={`d-inline-block mb-3 float-${
          item.fromId !== currentUserid ? "left" : "right"
        }`}>
        <div className='position-absolute  pt-1 pr-2 r-0'>
          <span className='text-extra-small text-muted'>
            {item.created_at ? moment(item.created_at).format("LT") : undefined}
          </span>
        </div>
        <CardBody
          style={{
            minWidth: "200px",
            padding: "10px",
          }}>
          <div className='d-flex flex-row pb-1'>
            {/* <img
              alt={sender.fromName}
              src={img}
              className='img-thumbnail border-0 rounded-circle mr-3 list-thumbnail align-self-center xsmall'
            /> */}
            <div className=' d-flex flex-grow-1 min-width-zero'>
              <div className='m-2 pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero'>
                <div className='min-width-zero'>
                  <p className='mb-0 truncate list-item-heading'>
                    {sender.fromName}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div style={{ paddingLeft: "10px" }}>
            <p className='mb-0 text-semi-muted'>{item.message}</p>
          </div>
        </CardBody>
      </Card>
      <div className='clearfix' />
    </>
  );
};

export default React.memo(MessageCard);
