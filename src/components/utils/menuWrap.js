import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { mapEvent, unMapEvent } from "./mapEvent";
import { db } from "../../config/firebase";
import {
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
  Timestamp,
  documentId,
  docs,
  deleteDoc,
} from "firebase/firestore";

const AttendMenu = (props) => {
  const [mapStatus, setMapStatus] = React.useState(false);

  React.useEffect(() => {
    mapCheck(props.eventId);
  });

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const mapCheck = async (id) => {
    const sessionId = sessionStorage.getItem("idValue");
    const collectionRef = collection(db, "user", sessionId, "AttendEvents");
    const eventQuery = query(collectionRef, where(documentId(), "==", id));
    const newdata = await getDocs(eventQuery);
    if (newdata?.docs[0]?.data()) {
      setMapStatus(true);
    } else {
      setMapStatus(false);
    }
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-three-dots"
          viewBox="0 0 16 16"
        >
          <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
        </svg>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {mapStatus ? (
          <MenuItem
            onClick={() => {
              unMapEvent(props.eventId);
              setAnchorEl(null);
            }}
          >
            Unmap Event
          </MenuItem>
        ) : (
          <MenuItem
            onClick={() => {
              mapEvent(props.eventId);
              setAnchorEl(null);
            }}
          >
            Map Event
          </MenuItem>
        )}
        <MenuItem onClick={handleClose}>Download</MenuItem>
        <MenuItem onClick={handleClose}>Share</MenuItem>
      </Menu>
    </div>
  );
};

const OrgMenu = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const sessionId = sessionStorage.getItem("idValue");
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const deleteData = async (id) => {
    deleteDoc(doc(db, "event", id));
    deleteDoc(doc(db,"user",sessionId,"OrgEvents",id));
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-three-dots"
          viewBox="0 0 16 16"
        >
          <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
        </svg>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>Download</MenuItem>
        <MenuItem onClick={handleClose}>Share</MenuItem>
        <MenuItem
          onClick={() => {
            try {
              deleteData(props.eventId);
            } catch {
              console.log("Cannot be Deleted");
            }
            setAnchorEl(null);
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
};

const setId = (id) => {
  sessionStorage.setItem("currentEventId", id);
};

export { OrgMenu, AttendMenu, setId };
