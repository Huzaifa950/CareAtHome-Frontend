import React, { useEffect, useState } from "react";
import "./chatbox.css"

import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardHeader,
    MDBCardBody,
    MDBCardFooter,
} from "mdb-react-ui-kit";
import { showErrorToast, showWarningToast } from "../Toast/ToastifyToast";
import { ApiPostCall } from "../ApiCall/ApiCalls";
import { faComment, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { capitalizeEachWord } from "../Common/Common";
import { Col, Container, Image, Row } from "react-bootstrap";

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function chatboxDividerFormatDate(dateString) {
    const inputDate = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const inputDateString = inputDate.toLocaleDateString();
    const todayString = today.toLocaleDateString();
    const yesterdayString = yesterday.toLocaleDateString();

    if (inputDateString === todayString) {
        return "Today";
    } else if (inputDateString === yesterdayString) {
        return "Yesterday";
    } else {
        return inputDateString;
    }
}

function formatTime(dateTime) {
    const dt = new Date(dateTime);
    const options = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    };

    return dt.toLocaleTimeString('en-US', options);
}

function convertMessagesFormat(messages, senderUsername) {
    let groupedMessages = {};

    messages.forEach(message => {
        const date = new Date(message.sentAt).toLocaleDateString();
        const sender = message.senderUsername === senderUsername;

        if (!groupedMessages[date]) {
            groupedMessages[date] = { date, messages: [] };
        }

        const lastGroup = groupedMessages[date].messages[groupedMessages[date].messages.length - 1];

        if (lastGroup && lastGroup[0].sender === sender) {
            lastGroup.push({ text: message.content, sender: sender, dateTime: message.sentAt });
        } else {
            groupedMessages[date].messages.push([{ text: message.content, sender: sender, dateTime: message.sentAt }]);
        }
    });

    return Object.values(groupedMessages);
}

const PatientChatboxContainer = ({ senderInfo, receiverInfo }) => {
    const [notifCount, setNotifCount] = useState(0)
    const [chatError, setChatError] = useState(false)
    const [showChatbox, setShowChatbox] = useState(false)
    const [chatId, setChatId] = useState("")

    const toggleChatbox = () => {
        setShowChatbox(!showChatbox)
    }

    const getChatId = async () => {
        try {
            const response = await ApiPostCall("/getChatId", { senderUsername: senderInfo.username, receiverUsername: receiverInfo.username })
            setChatId(response.data[0][0].chatId)
            setChatError(false)
        } catch (error) {
            setChatError(true)
        }
    }

    useEffect(() => {
        getChatId()
    }, [])

    const GetPatientChatboxNotifCount = async () => {
        try {
            const response = await ApiPostCall("/getPatientChatboxNotifCount", { chatId, receiverUsername: receiverInfo.username })
            console.log("chatbox notif count response is:", response.data[0][0].notifCount)
            setNotifCount(response.data[0][0].notifCount)
        } catch (error) {
            console.log("chatbox notif count error:", error)
        }
    }

    useEffect(() => {
        if (chatId !== "") GetPatientChatboxNotifCount()
    }, [chatId])

    return (
        <div className="chatbox-container">
            <ChatboxIcon notifCount={notifCount} toggleChatbox={toggleChatbox} />

            {showChatbox && <div className="original-chatbox">
                <Chatbox
                    chatError={chatError}
                    setChatError={setChatError}
                    chatId={chatId}
                    setNotifCount={setNotifCount}
                    senderInfo={senderInfo}
                    receiverInfo={receiverInfo}
                    toggleChatbox={toggleChatbox} />
            </div>}

        </div>
    )
}

const CareTakerChatboxContainer = ({ senderInfo }) => {
    const [patientsList, setPatientsList] = useState([])
    const [receiverInfo, setReceiverInfo] = useState({ username: "", fullName: "", image: "" })
    const [notifCount, setNotifCount] = useState(0)
    const [chatError, setChatError] = useState(false)
    const [showChatbox, setShowChatbox] = useState(false)
    const [showPatientsList, setShowPatientsList] = useState(false)
    const [chatId, setChatId] = useState("")

    const handleChatCloseClick = () => {
        setShowChatbox(false)
    }

    function markMessagesAsRead(username) {
        setPatientsList(prevPatientsList => 
            prevPatientsList.map(patient => 
                patient.username === username 
                    ? { ...patient, unreadCount: 0 }
                    : patient
            )
        );
    }    

    const handleChatIconClick = () => {
        if (showChatbox)
            setShowChatbox(false)
        else
            setShowPatientsList(!showPatientsList)
    }

    const handlePatientClick = (patient) => {
        setReceiverInfo(patient)
        setChatId(patient.chatId)
        markMessagesAsRead(patient.username)
        setShowPatientsList(false)
        setShowChatbox(true)
    }

    const getChatboxPatients = async () => {
        try {
            const response = await ApiPostCall("/getAllChatboxPatients", { ctUsername: senderInfo.username })
            setPatientsList(response.data[0])
            setChatError(false)
        } catch (error) {
            console.log(error)
            setChatError(true)
        }
    }

    useEffect(() => {
        getChatboxPatients()
    }, [])

    const GetCareTakerNotifCount = async () => {
        try {
            const response = await ApiPostCall("/getCareTakerChatboxNotifCount", { ctUsername: senderInfo.username })
            console.log("chatbox notif count response is:", response.data[0][0].count)
            setNotifCount(response.data[0][0].count)
        } catch (error) {
            console.log("chatbox notif count error:", error)
        }
    }

    useEffect(() => {
        GetCareTakerNotifCount()
    }, [])

    return (
        <div className="chatbox-container">
            <ChatboxIcon notifCount={notifCount} toggleChatbox={handleChatIconClick} />

            {showPatientsList && <PatientsGrid patients={patientsList} handlePatientClick={handlePatientClick} />}

            {showChatbox && <div className="original-chatbox">
                <Chatbox
                    chatError={chatError}
                    setChatError={setChatError}
                    chatId={chatId}
                    setNotifCount={setNotifCount}
                    senderInfo={senderInfo}
                    receiverInfo={receiverInfo}
                    toggleChatbox={handleChatCloseClick} />
            </div>}

        </div>
    )
}

const PatientsGrid = ({ patients, handlePatientClick }) => {
    console.log("Patients grid:", patients)
    return (
        <Container style={{ position: "absolute", bottom: "60px", right: "0", backgroundColor: 'white', minWidth: "300px", width: '100%', maxWidth: '400px', margin: '0 auto', padding: '10px', borderRadius: "10px" }}>
            <div style={{ maxHeight: '500px', overflowY: 'auto', overflowX: 'hidden' }}>
                <Row className="gy-4 gx-4">
                    {patients.map((patient, index) => (
                        <Col key={index} style={{position: "relative"}} className="text-center" onClick={() => handlePatientClick(patient)}>
                            <div
                                className="patient-card-box"
                                style={{
                                    border: '1px solid #aaa',
                                    width: "120px",
                                    borderRadius: '10px',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                    padding: '10px',
                                    transition: 'background-color 0.3s',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Image src={patient.image} roundedCircle height="70" width="70" style={{ objectFit: 'cover' }} />
                                <div style={{ marginTop: '10px' }}>{patient.fullName}</div>
                            </div>

                            {patient.unreadCount > 0 && <div style={{top: "0px", right: "20px"}} className="chatbox-container-notif-count">
                                <span>{patient.unreadCount}</span>
                            </div>}
                        </Col>
                    ))}
                </Row>
            </div>
        </Container>
    );
};



const ChatboxIcon = ({ notifCount, toggleChatbox }) => {
    return (
        <div className="chatbox-container-icon" onClick={toggleChatbox}>
            <FontAwesomeIcon icon={faComment} />

            {notifCount > 0 && <div className="chatbox-container-notif-count">
                <span>{notifCount}</span>
            </div>}
        </div>
    )
}

function Chatbox({ chatError, setNotifCount, setChatError, chatId, senderInfo, receiverInfo, toggleChatbox }) {
    const [allMessages, setAllMessages] = useState([])
    const [currentMessage, setCurrentMessage] = useState("")
    const [lastMessageInfo, setLastMessageInfo] = useState({ text: "", sender: false, dateTime: "" })

    useEffect(() => {
        if (chatId !== "") getAllChatMessages()
    }, [chatId])

    const getAllChatMessages = async () => {
        try {
            const response = await ApiPostCall("/getChatMessages", { chatId: chatId, receiverUsername: receiverInfo.username })
            console.log("Get chat all messages:", response.data[0])
            const formattedMsgs = convertMessagesFormat(response.data[0], senderInfo.username)
            setAllMessages(formattedMsgs)
            setNotifCount(0)
            setChatError(false)
        } catch (error) {
            setChatError(true)
        }
    }

    const sendMsg = async (e) => {
        e.stopPropagation()
        e.preventDefault()

        if (currentMessage.trim() === "") {
            showWarningToast("Message cannot be empty")
            return
        }

        try {
            const dateTime = new Date();
            const date = dateTime.toLocaleDateString();
            const newMessage = { text: currentMessage.trim(), sender: true, dateTime: dateTime };
            const response = await ApiPostCall("/sendChatboxMsg", {
                chatId,
                senderUsername: senderInfo.username,
                text: newMessage.text
            })
            console.log("chatbox send response is:", response)
            if (response.status === 200) {
                setAllMessages(prevMessages => {
                    let newAllMessages = [...prevMessages];
                    const lastDateGroup = newAllMessages[newAllMessages.length - 1];

                    if (!lastDateGroup || lastDateGroup.date !== date) {
                        newAllMessages.push({ date, messages: [[newMessage]] });
                    } else {
                        const lastGroup = lastDateGroup.messages[lastDateGroup.messages.length - 1];
                        if (lastGroup[0].sender === true) {
                            lastGroup.push(newMessage);
                        } else {
                            lastDateGroup.messages.push([newMessage]);
                        }
                    }

                    return newAllMessages;
                });

                setCurrentMessage("");
                setLastMessageInfo(newMessage);
            }
            else {
                showErrorToast("Failed to send message")
            }
        } catch (error) {
            showErrorToast("Failed to send message")
        }
    }



    console.log("All msgs:", allMessages)

    const SenderMsgBox = ({ messages }) => {
        return (
            <div className="d-flex flex-row justify-content-end mb-4 pt-1">
                <div>
                    {messages.map((msg, index) => {
                        return (
                            <div key={index}>
                                <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                                    {msg.text}
                                </p>
                                <p className="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">
                                    {formatTime(msg.dateTime)}
                                </p>
                            </div>
                        )
                    }
                    )}
                </div>
                <img
                    src={senderInfo.image ? senderInfo.image : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp"}
                    alt="avatar 1"
                    style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                />
            </div>
        )
    }

    const ReceiverMsgBox = ({ messages }) => {
        return (
            <div className="d-flex flex-row justify-content-start">
                <img
                    src={receiverInfo.image ? receiverInfo.image : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"}
                    alt="avatar 1"
                    style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                />
                <div>
                    {messages.map((msg, index) => {
                        return (
                            <div key={index}>
                                <p
                                    className="small p-2 ms-3 mb-1 rounded-3"
                                    style={{ backgroundColor: "#f5f6f7" }}
                                >
                                    {msg.text}
                                </p>
                                <p className="small ms-3 mb-3 rounded-3 text-muted">
                                    {formatTime(msg.dateTime)}
                                </p>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }

    const DividerDate = ({ date }) => {
        console.log("divider dates:", date)
        return (
            <div className="divider d-flex align-items-center mb-4">
                <p
                    className="text-center mx-3 mb-0"
                    style={{ color: "#a2aab7" }}
                >
                    {chatboxDividerFormatDate(date)}
                </p>
            </div>
        )
    }

    const OneDayAllMessages = ({ date, messages }) => {
        console.log("one day all msgs:", date, messages)
        return (
            <>
                <DividerDate date={date} />
                {messages.map((msg, index) => {
                    console.log("one day msg:", msg)
                    if (msg[0].sender) {
                        return <SenderMsgBox key={index} messages={msg} />
                    } else {
                        return <ReceiverMsgBox key={index} messages={msg} />
                    }
                })}
            </>
        )
    }

    return (
        <MDBContainer fluid style={{ backgroundColor: "#eee", padding: "0" }}>
            <MDBRow className="d-flex justify-content-center">
                <MDBCol md="10" lg="8" xl="6" style={{ width: "100%" }}>
                    <MDBCard id="chat2" style={{ borderRadius: "15px" }}>
                        <MDBCardHeader className="d-flex justify-content-between align-items-center p-3">
                            <h5 className="mb-0">{capitalizeEachWord(receiverInfo.fullName)}</h5>
                            <div style={{ cursor: "pointer" }} onClick={toggleChatbox}>
                                <FontAwesomeIcon icon={faTimes} size="lg" />
                            </div>
                        </MDBCardHeader>
                        {/* <MDBScrollbar
                            suppressScrollX
                            style={{ position: "relative", height: "400px" }}
                        > */}
                        <div style={{ position: "relative", minHeight: "400px", maxHeight: "400px", overflowX: "hidden", overflowY: "auto" }}>
                            <MDBCardBody>
                                {allMessages.length > 0 && !chatError ?
                                    allMessages.map((msg, index) => {
                                        return <OneDayAllMessages key={index} date={msg.date} messages={msg.messages} />
                                    })
                                    :
                                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "350px" }}>
                                        {chatError ? <p>Something went wrong.</p> : <p>No message to show</p>}
                                    </div>
                                }
                            </MDBCardBody>
                        </div>

                        <form onSubmit={e => sendMsg(e)}>
                            <MDBCardFooter className="text-muted d-flex justify-content-start align-items-center p-3">
                                <img
                                    src={senderInfo.image ? senderInfo.image : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"}
                                    alt="avatar 3"
                                    style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                                />
                                <input
                                    type="text"
                                    disabled={chatError}
                                    value={currentMessage}
                                    onChange={(e) => setCurrentMessage(e.target.value)}
                                    class="form-control form-control-lg"
                                    id="exampleFormControlInput1"
                                    placeholder="Type message"
                                ></input>
                                <button disabled={chatError} className="chatbox-btn-send" type="submit">Send</button>

                            </MDBCardFooter>
                        </form>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export { PatientChatboxContainer, CareTakerChatboxContainer };