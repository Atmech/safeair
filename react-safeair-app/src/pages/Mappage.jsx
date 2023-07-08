import Map from "mapmyindia-react";

const Mappage = () => {
    return (
        <div>
        <h1>Map</h1>
        <Map
          markers={[
              {
                  position: [18.47242418848995, 73.91155514743757], //18.47242418848995, 73.91155514743757
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