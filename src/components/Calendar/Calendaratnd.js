import dayjs from "dayjs";
import React, { useState } from "react";
import { generateDate, months } from "./util/calendar";
import cn from "./util/cn";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import "./Calendar.css";
import Header from "../header/header";
import { useNavigate } from "react-router-dom";

export default function Calendaratnd() {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);
  const navigate = useNavigate();
  return (
    <div
      className="Event_dis"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "fit-content",
      }}
    >
      <div className="header">
        <Header />
      </div>

      <div className="threebt"></div>
      <div className="container-calendar">
        <div>
          {" "}
          <div className="header-2">
            <div style={{ width: "fit-content", height: "fit-content" }}>
              <h1 id="events-tag">Events</h1>
            </div>
            <div className="buttn" id="list">
              <button
                class="btn"
                onClick={() => {
                  navigate("/attendevents");
                }}
              >
                List{" "}
              </button>
            </div>

            <div className="buttn" id="calendarbtn">
              <button class="btn">Calendar</button>
            </div>
          </div>
          <div className="calendar-box">
            <div className="outerline">
              <div className="date">
                <p className="select-none font-semibold">
                  {months[today.month()]}, {today.year()}
                </p>
                <div className="flex gap-10 items-center ">
                  <GrFormPrevious
                    className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
                    onClick={() => {
                      setToday(today.month(today.month() - 1));
                    }}
                  />
                  <p
                    className=" cursor-pointer hover:scale-105 transition-all text-gray"
                    onClick={() => {
                      setToday(currentDate);
                    }}
                  >
                    Today
                  </p>
                  <GrFormNext
                    className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
                    onClick={() => {
                      setToday(today.month(today.month() + 1));
                    }}
                  />
                </div>
              </div>
              <div className="months ">
                {days.map((day, index) => {
                  return (
                    <p
                      key={index}
                      className=" text-center h-18 w-18 grid place-content-center text-grey-500 select-none"
                    >
                      {day}
                    </p>
                  );
                })}
              </div>

              <div className=" digits ">
                {generateDate(today.month(), today.year()).map(
                  ({ date, currentMonth, today }, index) => {
                    return (
                      <div key={index} className=" digits1">
                        <h2
                          className={cn(
                            currentMonth ? "" : "text-gray-400",
                            today ? "bg-red-600 text-white " : "",
                            selectDate.toDate().toDateString() ===
                              date.toDate().toDateString()
                              ? "bg-black text-gray-400"
                              : "",
                            "rounded-full grid place-content-center hover:bg-black hover:text-white transition-all cursor-pointer select-none"
                          )}
                          onClick={() => {
                            setSelectDate(date);
                          }}
                        >
                          {date.date()}
                        </h2>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="right-div">
          <div className="alleventsbtn">
            <button
              class="cssbuttons-io-button"
              onClick={() => {
                navigate("/headerevent");
              }}
            >
              All Events
              <div class="iconn">
                <svg
                  height="24"
                  width="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path
                    d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </button>
          </div>
          <div className="container-events">
            <div className="eventsheader">Events To Attend</div>
            <div className="eventslist"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
