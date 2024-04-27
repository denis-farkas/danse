import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./backMessage.scss";

const BackMessage = () => {
    const [messages, setMessages] = useState(null);
    useEffect(() => {
        let data;

        let config = {
            method: "get",
            maxBodyLength: Infinity,
            url: "http://localhost:3000/message/read",
            headers: {
                "Content-Type": "application/json",
            },
            data: data,
        };

        axios
            .request(config)
            .then((response) => {
                console.log(response);
                setMessages(response.data.messages);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className="main">
            <table className="table">
                <thead>
                    <tr>
                        <th style={{ width: "10%" }} aria-label="Identifiant de l'utilisateur">Id</th>
                        <th style={{ width: "10%" }} aria-label="Expéditeur du message">Expéditeur</th>
                        <th style={{ width: "10%" }} aria-label="Destinataire du message">Destinataire</th>
                        <th style={{ width: "50%" }} aria-label="Contenu du message">Contenu</th>
                        <th style={{ width: "5%" }} aria-label="Date du message">Date</th>
                        <th style={{ width: "15%" }} aria-label="Actions">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {messages &&
                        messages.map((message) => (
                            <tr key={message.message_id}>
                                <td>{message.sender}</td>
                                <td>{message.receiver}</td>
                                <td>{message.content}</td>
                                <td>{message.date}</td>
                                <td>
                                    <Link to={`/editMessage/${message.message_id}`} className="submitButton" aria-label="Editer les messages">
                                        Editer
                                    </Link>
                                </td>
                            </tr>
                        ))}

                    {messages && !messages.length && (
                        <tr>
                            <td>
                                <p>Pas de message à afficher</p>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table >
        </div>
    );
};

export default BackMessage;