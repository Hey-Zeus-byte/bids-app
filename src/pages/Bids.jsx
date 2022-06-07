import {useState, useEffect} from "react";
import moment from "moment";
import "../css/Bids.css";
import {db} from "../utils/firebase-config";
import {doc, getDocs, collection, updateDoc} from "firebase/firestore";
import ModalUpdate from "../components/ModalUpdate";
import ModalCreate from "../components/ModalCreate";
import MoreJobInfo from "../components/MoreJobInfo";
import img from "../logo/GSCFINC.jpg";
import {useNavigate} from "react-router-dom";
import BidSentSwitch from "../components/BidSentSwitch";
import BiddingSwitch from "../components/BiddingSwitch";
import mockBids from "../mock-data.json";
import DeleteBid from "../components/DeleteBid";
import {Table, Button, ButtonGroup} from "react-bootstrap";

// setState() enqueues changes to the component state and tells React
// that this component and its children need to be re-rendered with the
// updated state. This is the primary method you use to update the user
// interface in response to event handlers and server responses.

// Think of setState() as a request rather than an immediate command to update
// the component. For better perceived performance, React may delay it, and
// then update several components in a single pass. React does not guarantee
// that the state changes are applied immediately.

// setState() does not always immediately update the component. It may batch
// or defer the update until later. This makes reading this.state right after
// calling setState() a potential pitfall. Instead, use componentDidUpdate or
// a setState callback (setState(updater, callback)), either of which are guaranteed
// to fire after the update has been applied. If you need to set the state based
// on the previous state, read about the updater argument below.

// setState() will always lead to a re-render unless shouldComponentUpdate()
// returns false. If mutable objects are being used and conditional rendering
// logic cannot be implemented in shouldComponentUpdate(), calling setState()
// only when the new state differs from the previous state will avoid
// unnecessary re-renders.

function Bids() {
  const navigate = useNavigate();
  const [bids, setBids] = useState(mockBids);
  const bidsCollectionRef = collection(db, "bids");
  // const [sent, setSent] = useState();
  // const [bidding, setBidding] = useState();

  const [selectedBid, setSelectedBid] = useState(); // for update modal
  const [showCreate, setShowCreate] = useState(false); // for create modal
  const [moreInfoBid, setMoreInfoBid] = useState(); // for more info modal
  const [openDeleteBid, setOpenDeleteBid] = useState(); // for delete modal

  const updateSent = async (bid) => {
    console.log("Update Sent Succesful! Bid ID: " + bid.id);
    console.log(bid.sent);
    const bidDoc = doc(db, "bids", bid.id);
    await updateDoc(bidDoc, {
      sent: !bid.sent, // ! "bang" sets to opposite "negate"
    }).catch((err) => {
      alert(err);
      console.error(err);
    });
    // const nextBids = [...bids]; // clone of bids
    // for (let i = 0; i < nextBids.length; i++) {
    //   const currBid = nextBids[i];
    //   if (currBid.id === bid.id) {
    //     currBid.sent = !bid.sent;
    //   }
    // }
    // setBids(nextBids);
  };
  // we need the current value of bid.sent
  // update the stale value with new value in database
  // update the UI: trigger a rerender from setting state
  // have to figure out how to use updatedoc() using "for" loop

  const updateBidding = async (bid) => {
    // e.preventDefault();
    console.log("Update Bidding Succesful! Bid ID: " + bid.id);
    console.log(bid.bidding);
    const bidDoc = doc(db, "bids", bid.id);
    await updateDoc(bidDoc, {
      bidding: !bid.bidding,
    }).catch((err) => {
      alert(err);
      console.error(err);
    });
    // const nextBids = [...bids]; // clone of bids
    // for (let i = 0; i < nextBids.length; i++) {
    //   const currBid = nextBids[i]; // currBid is the current bid in the array
    //   if (currBid.id === bid.id) {
    //     currBid.bidding = !bid.bidding; // ! "bang" sets to opposite "negate"
    //   }
    // }
    // setBids(nextBids);
  };

  useEffect(() => {
    const getBids = async () => {
      const data = await getDocs(bidsCollectionRef);
      const items = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
      setBids(items);
    };

    getBids();
  }, [bidsCollectionRef, setBids]);

  return (
    <div className="app-container">
      <a rel="noreferrer" href="https://gscfinc.com/" target="_blank">
        <img src={img} alt="logo" />
      </a>
      <div
        style={{
          textAlign: "center",
          margin: "5px",
          display: "flex",
        }}
      >
        <ButtonGroup aria-label="Basic example">
          <Button
            onClick={() => {
              navigate("/change_order_log");
            }}
          >
            Change Order Logs
          </Button>
          <Button
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            Dashboard
          </Button>
          <Button
            onClick={() => {
              setShowCreate(true);
            }}
          >
            Create Bid
          </Button>
        </ButtonGroup>
      </div>
      <Table style={{resize: "both"}} striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Options</th>
            <th>Job Name</th>
            <th>More info</th>
            <th>General Contractor</th>
            <th>City</th>
            <th>Date Posted</th>
            <th>Due Date</th>
            <th>Date Sent</th>
          </tr>
        </thead>
        {bids?.map((bid) => {
          return (
            <tbody key={bid.id}>
              <tr>
                <div className="options-container">
                  <button
                    onClick={() => {
                      setOpenDeleteBid(bid.id);
                    }}
                    id="delete-button"
                  >
                    Delete Bid
                  </button>
                  <button
                    onClick={() => {
                      setSelectedBid(bid);
                    }}
                    id="update-button"
                  >
                    Update Bid
                  </button>
                  <div>
                    <BiddingSwitch
                      checked={bid.bidding}
                      onChange={() => {
                        updateBidding(bid);
                      }}
                    />
                    <BidSentSwitch
                      checked={bid.sent}
                      onChange={() => {
                        updateSent(bid);
                      }}
                    />
                  </div>
                </div>
                <td>{bid.jobName}</td>
                <button
                  id="moreInfo-button"
                  onClick={() => {
                    setMoreInfoBid(bid);
                  }}
                >
                  Click me!
                </button>
                <td>{bid.generalContractor}</td>
                <td>{bid.city}</td>
                <td>{moment(bid.date).calendar()}</td>
                <td>{moment(bid.dueDate).calendar()}</td>
                <td>{moment(bid.dateSent).calendar()}</td>
              </tr>
            </tbody>
          );
        })}
      </Table>
      <div>
        <ModalCreate
          onClose={() => setShowCreate(false)}
          showCreate={showCreate}
        />
        <ModalUpdate
          onClose={() => setSelectedBid(null)}
          selectedBid={selectedBid}
        />
        <MoreJobInfo
          onClose={() => setMoreInfoBid(null)}
          moreInfoBid={moreInfoBid}
        />
        <DeleteBid
          onClose={() => setOpenDeleteBid(null)}
          openDeleteBid={openDeleteBid}
        />
      </div>
    </div>
  );
}

export default Bids;
