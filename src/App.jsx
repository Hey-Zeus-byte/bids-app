import {useState, useEffect} from "react";
import moment from "moment";
import "./App.css";
import {db} from "./firebase-config";
import {collection, getDocs, deleteDoc, addDoc, doc} from "firebase/firestore";
import ModalUpdate from "./ModalUpdate";
import Checkbox from "./CheckBox";

function App() {
  const [bids, setBids] = useState([]);
  const [newDate, setNewDate] = useState("");
  const [newGC, setNewGC] = useState("");
  const [newJobName, setNewJobName] = useState("");
  const [newDueDate, setNewDueDate] = useState("");
  const [newProjectType, setNewProjectType] = useState("");
  const [newConstructType, setNewConstructType] = useState("");
  const [newDateSent, setNewDateSent] = useState("");

  const bidsCollectionRef = collection(db, "bids");

  const [show, setShow] = useState(false);

  const state = {checked: false};

  const handleCheckboxChange = (event) => {
    this.setState({checked: event.target.checked});
  };

  const createBid = async () => {
    await addDoc(bidsCollectionRef, {
      date: newDate,
      generalContractor: newGC,
      jobName: newJobName,
      dueDate: newDueDate,
      projectType: newProjectType,
      constructType: newConstructType,
      dateSent: newDateSent,
    });
  };

  const deleteBid = async (id) => {
    const bidDoc = doc(db, "bids", id);
    await deleteDoc(bidDoc);
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
      <h1>GSCF Bids List</h1>
      <table>
        <thead>
          <tr>
            <th>Check</th>
            <th>Date Posted</th>
            <th>General Contractor</th>
            <th>Job Name</th>
            <th>Due Date</th>
            <th>Project Type</th>
            <th>Construction Type</th>
            <th>Date Sent</th>
          </tr>
        </thead>
        {bids.map((bid) => {
          return (
            <tbody key={bid.id}>
              <tr>
                <label>
                  <Checkbox
                    checked={state.checked}
                    onChange={handleCheckboxChange}
                  />
                  <span style={{marginLeft: 8}}>Sent</span>
                </label>
                {/* Check box can not render due to Quote being reached. check next time! */}
                <td>{moment(bid.date).calendar()}</td>
                <td>{bid.generalContractor}</td>
                <td>{bid.jobName}</td>
                <td>{moment(bid.dueDate).calendar()}</td>
                <td>{bid.projectType}</td>
                <td>{bid.constructType}</td>
                <td>{moment(bid.dateSent).calendar()}</td>
              </tr>
              <button
                onClick={() => {
                  setShow(true);
                }}
              >
                Update Bid
              </button>
              <ModalUpdate onClose={() => setShow(false)} show={show} />
              <button
                onClick={() => {
                  deleteBid(bid.id);
                }}
              >
                Delete Bid
              </button>
            </tbody>
          );
        })}
      </table>
      <form>
        <input
          type="date"
          placeholder="Post Date..."
          onChange={(event) => {
            setNewDate(event.target.value);
          }}
        />
        <input
          type="string"
          placeholder="General Contractor..."
          onChange={(event) => {
            setNewGC(event.target.value);
          }}
        />
        <input
          type="string"
          placeholder="Job Name..."
          onChange={(event) => {
            setNewJobName(event.target.value);
          }}
        />
        <input
          type="date"
          placeholder="Due Date..."
          onChange={(event) => {
            setNewDueDate(event.target.value);
          }}
        />
        <input
          type="string"
          placeholder="Project Type..."
          onChange={(event) => {
            setNewProjectType(event.target.value);
          }}
        />
        <input
          type="string"
          placeholder="Construction Type..."
          onChange={(event) => {
            setNewConstructType(event.target.value);
          }}
        />
        <input
          type="date"
          placeholder="Sent Date..."
          onChange={(event) => {
            setNewDateSent(event.target.value);
          }}
        />
        <button onClick={createBid}>Create Bid</button>
      </form>

      <h4 id="bottom">Created By: Jesus Valdez</h4>
    </div>
  );
}

export default App;
