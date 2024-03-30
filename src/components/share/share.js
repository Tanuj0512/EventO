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
          class="w-6 h-6 text-grey-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M17.5 3a3.5 3.5 0 0 0-3.456 4.06L8.143 9.704a3.5 3.5 0 1 0-.01 4.6l5.91 2.65a3.5 3.5 0 1 0 .863-1.805l-5.94-2.662a3.53 3.53 0 0 0 .002-.961l5.948-2.667A3.5 3.5 0 1 0 17.5 3Z" />
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
