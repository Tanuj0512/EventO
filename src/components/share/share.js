import React, { useState, useEffect, useRef } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  FacebookShareButton,
  WhatsappShareButton,
  EmailShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  PinterestShareButton,
} from "react-share";
import {
  FacebookIcon,
  WhatsappIcon,
  EmailIcon,
  LinkedinIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  PinterestIcon,
} from "react-share";
import "./share.css";

export default function ShareBtn() {
  const [modal, setModal] = useState(false);
  const [eventURL, setEventURL] = useState("hello");
  const scrollContainer = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(true);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [copytxt, setcopytxt] = useState(false);

  useEffect(() => {
    if (scrollContainer.current) {
      const handleScroll = () => {
        if (scrollContainer.current.scrollLeft === 0) {
          setShowLeftArrow(false);
        } else {
          setShowLeftArrow(true);
        }

        if (
          scrollContainer.current.scrollLeft ===
          scrollContainer.current.scrollWidth -
            scrollContainer.current.clientWidth
        ) {
          setShowRightArrow(false);
        } else {
          setShowRightArrow(true);
        }
      };

      scrollContainer.current.addEventListener("scroll", handleScroll);
      return () => {
        scrollContainer.current.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  const toggleModal = () => {
    setModal(!modal);
  };

  const scrollLeft = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollLeft -= 100; // Adjust the scroll distance as needed
    }
  };

  const scrollRight = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollLeft += 100; // Adjust the scroll distance as needed
    }
  };

  const copyText = () => {
    setcopytxt(true);
    navigator.clipboard.writeText(eventURL);
    setTimeout(() => {
      {
        setcopytxt(false);
      }
    }, 1000);
  };

  return (
    <div className="sharebutton">
      <button class="Btn" onClick={toggleModal}>
        <svg
          height="19"
          width="19"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          viewBox="0 0 1024 1024"
          class="shere"
        >
          <path
            fill="#ffffff"
            d="M767.99994 585.142857q75.995429 0 129.462857 53.394286t53.394286 129.462857-53.394286 129.462857-129.462857 53.394286-129.462857-53.394286-53.394286-129.462857q0-6.875429 1.170286-19.456l-205.677714-102.838857q-52.589714 49.152-124.562286 49.152-75.995429 0-129.462857-53.394286t-53.394286-129.462857 53.394286-129.462857 129.462857-53.394286q71.972571 0 124.562286 49.152l205.677714-102.838857q-1.170286-12.580571-1.170286-19.456 0-75.995429 53.394286-129.462857t129.462857-53.394286 129.462857 53.394286 53.394286 129.462857-53.394286 129.462857-129.462857 53.394286q-71.972571 0-124.562286-49.152l-205.677714 102.838857q1.170286 12.580571 1.170286 19.456t-1.170286 19.456l205.677714 102.838857q52.589714-49.152 124.562286-49.152z"
          ></path>
        </svg>

        <span class="tooltip">Share</span>
      </button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlayyy"></div>
          <div className="modal-content">
            <div className="share-head">
              
              <h2>Share the link via</h2>
            </div>
            <div
              className="socials"
              id="socialsBtn-1"
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "2vh",
                overflow: "hidden",
                width: "30vw",
              }}
              ref={scrollContainer}
            >
              {showLeftArrow && (
                <button className="scroll-button left" onClick={scrollLeft}>
                  &lt;
                </button>
              )}

              {/* Your social media sharing buttons */}
              <FacebookShareButton
                className="item"
                url={eventURL}
                style={{ margin: "1vh 0.5vw 0vh 0vw" }}
              >
                <FacebookIcon logoFillColor="white" round={true}></FacebookIcon>
              </FacebookShareButton>

              <WhatsappShareButton
                className="item"
                url={eventURL}
                style={{ margin: "1vh 0.5vw 0vh 0vw" }}
              >
                <WhatsappIcon logoFillColor="white" round={true}></WhatsappIcon>
              </WhatsappShareButton>

              <EmailShareButton
                className="item"
                url={eventURL}
                style={{ margin: "1vh 0.5vw 0vh 0vw" }}
              >
                <EmailIcon logoFillColor="white" round={true}></EmailIcon>
              </EmailShareButton>

              <LinkedinShareButton
                className="item"
                url={eventURL}
                style={{ margin: "1vh 0.5vw 0vh 0vw" }}
              >
                <LinkedinIcon logoFillColor="white" round={true}></LinkedinIcon>
              </LinkedinShareButton>

              <RedditShareButton
                className="item"
                url={eventURL}
                style={{ margin: "1vh 0.5vw 0vh 0vw" }}
              >
                <RedditIcon logoFillColor="white" round={true}></RedditIcon>
              </RedditShareButton>

              <TelegramShareButton
                className="item"
                url={eventURL}
                style={{ margin: "1vh 0.5vw 0vh 0vw" }}
              >
                <TelegramIcon logoFillColor="white" round={true}></TelegramIcon>
              </TelegramShareButton>

              <TumblrShareButton
                className="item"
                url={eventURL}
                style={{ margin: "1vh 0.5vw 0vh 0vw" }}
              >
                <TumblrIcon logoFillColor="white" round={true}></TumblrIcon>
              </TumblrShareButton>

              <TwitterShareButton
                className="item"
                url={eventURL}
                style={{ margin: "1vh 0.5vw 0vh 0vw" }}
              >
                <TwitterIcon logoFillColor="white" round={true}></TwitterIcon>
              </TwitterShareButton>

              <PinterestShareButton
                className="item"
                url={eventURL}
                style={{ margin: "1vh 0.5vw 0vh 0vw" }}
              >
                <PinterestIcon
                  logoFillColor="white"
                  round={true}
                ></PinterestIcon>
              </PinterestShareButton>

              {showRightArrow && (
                <button className="scroll-button right" onClick={scrollRight}>
                  &gt;
                </button>
              )}
            </div>
            <button className="close-modal" onClick={toggleModal}>
              x
            </button>

            <input
              value={eventURL}
              className="link_box"
              placeholder="  URL...."
              readOnly={true}
              
            ></input>
            <button
              className="copyBtn"
              onClick={copyText}
              style={{
                position: "absolute",
                height: "4.5vh",
                minWidth: "5vw",
                padding: "auto 2vw",
                backgroundColor: "#3EA6FF",
                color: "black",
                borderRadius: "20px",
                margin: "2.7vh 2.3vw",
                right: "0px",
              }}
            >
              {copytxt ? "Copied!!" : "Copy"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
