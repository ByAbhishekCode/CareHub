import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import axios from "axios";

const Messages = () => {
  const [message, setMessage] = useState([]);
  const { isAuthenticated } = useContext(Context);
  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/message/getall",
          { withCredentials: true }
        );
        setMessage(data.message);
        console.log(data);
      } catch (error) {
        console.log("Error Occured While Fetching Messages", error);
      }
    };
    fetchMessage();
  }, []);

  return (
    <section className="page messages">
      <h1>MESSAGES</h1>
      <div className="banner">
        {message && message.length > 0 ? (
          message.map((element) => (
            <div className="card" key={element._id}>
              <div className="details">
                <p>
                  First Name : <span>{element.firstName}</span>
                </p>
                <p>
                  Last Name : <span>{element.lastName}</span>
                </p>
                <p>
                  Email : <span>{element.email}</span>
                </p>
                <p>
                  Phone Number : <span>{element.phone}</span>
                </p>
                <p>
                  Message : <span>{element.message}</span>
                </p>
              </div>
            </div>
          ))
        ) : (
          <h1>No Messages!</h1>
        )}
      </div>
    </section>
  );
};

export default Messages;
