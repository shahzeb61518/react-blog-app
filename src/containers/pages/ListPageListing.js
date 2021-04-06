import React from "react";
import { Row } from "reactstrap";
import Pagination from "./Pagination";
import ContextMenuContainer from "./ContextMenuContainer";
import DataListView from "./DataListView";
import ImageListView from "./ImageListView";
import ThumbListView from "./ThumbListView";

function collect(props) {
  return { data: props.data };
}

const ListPageListing = ({
  items,
  displayMode,
  selectedItems,
  onCheckItem,
  currentPage,
  totalPage,
  onContextMenuClick,
  onContextMenu,
  onChangePage,
}) => {
  return (
    <Row>
      {items.length > 0
        ? items.map((item) => {
            {
              /* if (displayMode === "imagelist") {
          return (
            <ImageListView
              key={item._id}
              product={item}
              isSelect={selectedItems.includes(item._id)}
              collect={collect}
              onCheckItem={onCheckItem}
            />
          );
        } */
            }
            if (displayMode === "thumblist") {
              return (
                <ThumbListView
                  key={item._id}
                  product={item}
                  isSelect={selectedItems.includes(item._id)}
                  collect={collect}
                  onCheckItem={onCheckItem}
                />
              );
            }
            return (
              <DataListView
                key={item._id}
                product={item}
                isSelect={selectedItems.includes(item._id)}
                onCheckItem={onCheckItem}
                collect={collect}
              />
            );
          })
        : "No user avialable"}

      {/* <Pagination
        currentPage={currentPage}
        totalPage={totalPage}
        onChangePage={(i) => onChangePage(i)}
      />
      <ContextMenuContainer
        onContextMenuClick={onContextMenuClick}
        onContextMenu={onContextMenu}
      /> */}
    </Row>
  );
};

export default React.memo(ListPageListing);
