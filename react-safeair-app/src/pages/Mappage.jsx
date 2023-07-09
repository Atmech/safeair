import Map from "mapmyindia-react";
import { useEffect, useState } from "react";

import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");




const Mappage = () => {
    const [location, setLocation] = useState({});

    useEffect(() => {
        socket.on("receiveLocation", (receivedLocation) => {
            setLocation(receivedLocation);
            console.log("receivedLocation" + receivedLocation);
        });
    }, [socket])

    return (
        <div>
        <h1>Map</h1>
        <Map
          markers={[
              {
                  position: [18.47242418848995, 73.91155514743757], //18.47242418848995, 73.91155514743757
                    draggable: true,
                  title: "emp1",
                  onClick: e => {
                      console.log("clicked ");
                  },
              }
          ]}
          />
        </div>
    );
    }

export default Mappage;