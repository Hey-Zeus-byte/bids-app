import {useState, useEffect} from "react";
import moment from "moment";
import "../css/Home.css";
import {db} from "../utils/firebase-config";
import {
  deleteDoc,
  doc,
  getDocs,
  collection,
  updateDoc,
} from "firebase/firestore";
import ModalUpdate from "../components/ModalUpdate";
import ModalCreate from "../components/ModalCreate";
import img from "../logo/GSCFINC.jpg";
import {useNavigate} from "react-router-dom";
import BidSentSwitch from "../components/BidSentSwitch";
import BiddingSwitch from "../components/BiddingSwitch";
// import mockBids from "../mock-data.json";

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
  const [bids, setBids] = useState();
  const bidsCollectionRef = collection(db, "bids");
  // const [sent, setSent] = useState();
  // const [bidding, setBidding] = useState();

  const [selectedBid, setSelectedBid] = useState(); // for update modal
  const [showCreate, setShowCreate] = useState(false); // for create modal

  const deleteBid = async (id) => {
    console.log("Deleted Bid ID: " + id);
    const bidDoc = doc(db, "bids", id);
    await deleteDoc(bidDoc);
    console.log("Deleted post data from id: " + id);
  };

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
    //   const currBid = nextBids[i]; // currBid is the current bid in the array
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
  }, [bidsCollectionRef]);

  return (
    <div className="app-container">
      <img src={img} alt="logo" />
      <button
        onClick={() => {
          setShowCreate(true);
        }}
        id="create-modal"
      >
        Create Bid
      </button>
      <button
        onClick={() => {
          navigate("/change_order_log");
        }}
        className="change-order"
      >
        Change Order Logs
      </button>
      <button
        onClick={() => {
          navigate("/dashboard");
        }}
        className="change-order"
      >
        Dashboard
      </button>
      <table>
        <thead>
          <tr>
            <th>Options</th>
            <th>Job Name</th>
            <th>General Contractor</th>
            <th>City</th>
            <th>Date Posted</th>
            <th>Project Type</th>
            <th>Type of Wage</th>
            <th>Construction Type</th>
            <th>Floor System</th>
            <th>Roof System</th>
            <th>Due Date</th>
            <th>Days Left</th>
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
                      deleteBid(bid.id);
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
                <td>{bid.generalContractor}</td>
                <td>{bid.city}</td>
                <td>{moment(bid.date).calendar()}</td>
                <td>{bid.projectType}</td>
                <td>{bid.wageType}</td>
                <td>{bid.constructType}</td>
                <td>{bid.floorSystem}</td>
                <td>{bid.roofSystem}</td>
                <td>{moment(bid.dueDate).calendar()}</td>
                <td>{bid.daysLeft}</td>
                {/* this will be the difference between date posted and deadline */}
                <td>{moment(bid.dateSent).calendar()}</td>
              </tr>
            </tbody>
          );
        })}
      </table>
      <h4 id="bottom">Created By: Jesus Valdez</h4>
      <div>
        <ModalCreate
          onClose={() => setShowCreate(false)}
          showCreate={showCreate}
        />
        <ModalUpdate
          onClose={() => setSelectedBid(null)}
          selectedBid={selectedBid}
        />
      </div>
    </div>
  );
}

export default Bids;
