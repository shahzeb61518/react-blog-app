/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect, useRef } from "react";
import { reactLocalStorage } from "reactjs-localstorage";

import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Row } from "reactstrap";
import io from "socket.io-client";
import { Input, Button } from "reactstrap";
import { Colxx } from "../../../components/common/CustomBootstrap";
import ApiManager from "../../../helpers/ApiManger";

import {
  getContacts,
  getConversations,
  changeConversation,
  addMessageToConversation,
} from "../../../redux/actions";
import ChatApplicationMenu from "../../../containers/applications/ChatApplicationMenu";
import ChatHeading from "../../../components/applications/ChatHeading";
import MessageCard from "../../../components/applications/MessageCard";
import SaySomething from "../../../components/applications/SaySomething";

const socket = io("https://uvuew-node.herokuapp.com");

const ChatApp = ({
  location,
  intl,
  allContacts,
  conversations,
  loadingConversations,
  loadingContacts,
  currentUser,
  selectedUser,
  selectedUserId,
  getContactsAction,
  getConversationsAction,
  changeConversationAction,
  addMessageToConversationAction,
}) => {
  let chatArr = [];
  const [activeTab, setActiveTab] = useState("contacts");
  const [messageInput, setMessageInput] = useState("");
  const scrollBarRef = useRef(null);

  const [chats, setChats] = useState([]);
  const [chats2, setChats2] = useState([]);

  const [fromId, setFromId] = useState("");
  const [fromName, setFromName] = useState("");
  const [fromImage, setFromImage] = useState("");

  const [toObject, setToObject] = useState("");
  const [toId, setToId] = useState("");
  const [toName, setToName] = useState("");
  const [toImage, setToImage] = useState("");

  const [message, setMessage] = useState("");

  useEffect(() => {
    check();
    document.body.classList.add("no-footer");
    const currentUserId = 0;
    getContactsAction();
    getConversationsAction(currentUserId);

    return () => {
      document.body.classList.remove("no-footer");
    };
  }, [getContactsAction, getConversationsAction]);

  const check = () => {
    // console.log("toId", location.state);
    if (location.state) {
      if (location.state.toObject) {
        console.log("toObject", location.state.toObject);
        setToId(location.state.toObject.id);
        setToName(location.state.toObject.name);
        setToImage(location.state.toObject.image);
      }
      let user = reactLocalStorage.get("user_data");
      user = JSON.parse(user);
      // console.log("user>>>>", user);
      setFromId(user.userId);
      setFromName(user.namef);
      setFromImage(user.profileImage);

      getPreChat(user.userId, location.state.toObject.id);
    }

    socket.on("chat-message", (obj) => {
      // newFunc();
      console.log("received obj .....", obj.message);
      // console.log("before pushing an object2>", chats2);
      const message2 = obj.message;

      // if (
      //   (message2.fromId === fromId || message2.toId === fromId) &&
      //   (message2.fromId === toId || message2.toId === toId)
      // ) {
      let u = [...chatArr, message2];
      // console.log("before U>>", u);
      // u.push(message2);
      // console.log("U>>", u);
      chatArr = u;
      setChats(u);
      // console.log("after pushing an object>", chats);
      setMessage("");
      // console.log("UUUUuuuuu?", chats);
      focusScrollBottom();
      // }
    });
  };

  const newFunc = () => {
    // console.log("This is new chanttttttttt :: ", chats);
  };

  const focusScrollBottom = () => {
    setTimeout(() => {
      if (scrollBarRef.current) {
        scrollBarRef.current._ps.element.scrollTop =
          scrollBarRef.current._ps.contentHeight;
      }
    }, 100);
  };

  useEffect(() => {
    if (loadingConversations && loadingContacts && selectedUser == null) {
      changeConversationAction(selectedUserId);
      focusScrollBottom();
    }
  }, [
    changeConversationAction,
    loadingContacts,
    loadingConversations,
    selectedUser,
    selectedUserId,
  ]);

  useEffect(() => {
    focusScrollBottom();
  }, [selectedUserId]);

  const handleChatInputPress = (e) => {
    if (e.key === "Enter") {
      if (messageInput.length > 0) {
        addMessageToConversationAction(
          currentUser.id,
          selectedUser.id,
          messageInput,
          conversations
        );
        setMessageInput("");
        setActiveTab("messages");
      }
    }
  };

  const handleSendButtonClick = () => {
    if (messageInput.length > 0) {
      addMessageToConversationAction(
        currentUser.id,
        selectedUser.id,
        messageInput,
        conversations
      );
      setMessageInput("");
      setActiveTab("messages");
      focusScrollBottom();
    }
  };

  const sendMsg = () => {
    let readMsg = false;
    let date = new Date();
    if (message.length > 0) {
      socket.emit("chat-message", {
        message: message,
        fromId: fromId,
        fromName: fromName,
        fromImage: fromImage,
        toId: toId,
        toName: toName,
        toImage: toImage,
        read: readMsg,
        created_at: date,
      });
    }
    // console.log("inside sendmsg func??", chats);
    focusScrollBottom();
  };

  const getPreChat = (fromId, toId) => {
    new ApiManager().getPreChat(fromId, toId).then((result) => {
      if (result.no_result) {
        return;
      }
      if (result.data) {
        if (result.data.error) {
          alert(result.data.error);
          return;
        }
        if (result.data) {
          // let arr = result.data.list;
          setChats(result.data.list);
          chatArr = result.data.list;
          // setChats2(result.data.list);
          console.log("result prechat data>>>", result.data);
        }
        console.log("pre chat data>>>", result);
      }
    });
  };

  const { messages } = intl;

  const selectedConversation =
    loadingConversations && loadingContacts && selectedUser
      ? conversations.find(
          (x) =>
            x.users.includes(currentUser.id) &&
            x.users.includes(selectedUser.id)
        )
      : null;

  return loadingConversations && loadingContacts ? (
    <>
      <Row className='app-row'>
        <Colxx xxs='12' className='chat-app'>
          {loadingConversations && selectedUser && (
            <ChatHeading
              name={toName}
              thumb={toImage ? toImage : "/assets/img/profiles/profile.png"}
              // lastSeenDate={}
            />
          )}

          {selectedConversation && (
            <PerfectScrollbar
              ref={scrollBarRef}
              containerRef={(ref) => {}}
              options={{ suppressScrollX: true, wheelPropagation: false }}>
              {chats.map((item, index) => {
                {
                  /* const sender = allContacts.find((x) => x.id === item.sender); */
                }
                return (
                  <MessageCard
                    key={index}
                    sender={item}
                    item={item}
                    img={
                      fromImage ? fromImage : "/assets/img/profiles/profile.png"
                    }
                    currentUserid={fromId}
                  />
                );
              })}
            </PerfectScrollbar>
          )}
        </Colxx>
      </Row>

      <div className='chat-input-container d-flex justify-content-between align-items-center'>
        <Input
          className='form-control flex-grow-1'
          type='text'
          placeholder='Say Something...'
          value={message}
          // onKeyPress={(e) => handleChatInputPress(e)}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div>
          {/* <Button outline color='primary' className='icon-button large ml-1'>
            <i className='simple-icon-paper-clip' />
          </Button> */}

          <Button
            color='primary'
            className='icon-button large ml-1'
            onClick={() => {
              // console.log("chats arr on send btn?", chats);
              // setChats2(chats);
              sendMsg();
            }}>
            <i className='simple-icon-arrow-right' />
          </Button>
        </div>
      </div>

      {/* <SaySomething
        placeholder='Say something...'
        messageInput={message}
        // handleChatInputPress={handleChatInputPress}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        handleSendButtonClick={() => {
          sendMsg();
        }}
      /> */}
      <ChatApplicationMenu activeTab={activeTab} toggleAppMenu={setActiveTab} />
    </>
  ) : (
    <div className='loading' />
  );
};

const mapStateToProps = ({ chatApp }) => {
  const {
    allContacts,
    conversations,
    loadingConversations,
    loadingContacts,
    currentUser,
    selectedUser,
    selectedUserId,
  } = chatApp;

  return {
    allContacts,
    conversations,
    loadingConversations,
    loadingContacts,
    currentUser,
    selectedUser,
    selectedUserId,
  };
};
export default injectIntl(
  connect(mapStateToProps, {
    getContactsAction: getContacts,
    getConversationsAction: getConversations,
    changeConversationAction: changeConversation,
    addMessageToConversationAction: addMessageToConversation,
  })(ChatApp)
);
