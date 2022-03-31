import {useState, useEffect} from "react";
import moment from "moment";
import "./App.css";
import {db} from "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function App() {
  const [newDate, setNewDate] = useState("");
  const [newGC, setNewGC] = useState("");
  const [newJobName, setNewJobName] = useState("");
  const [newDueDate, setNewDueDate] = useState("");
  // const [newDone, setNewDone] = useState(false);

  const [bids, setBids] = useState([]);
  const bidsCollectionRef = collection(db, "bids");

  const createBid = async () => {
    await addDoc(bidsCollectionRef, {
      date: newDate,
      generalContractor: newGC,
      jobName: newJobName,
      dueDate: newDueDate,
      // newDone: setNewDone,
    });
  };

  const updateBid = async () => {
    await updateDoc(bidsCollectionRef, {
      date: newDate,
      generalContractor: newGC,
      jobName: newJobName,
      dueDate: newDueDate,
      // newDone: setNewDone,
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
            <th>Date Posted</th>
            <th>General Contractor</th>
            <th>Job Name</th>
            <th>Due Date</th>
            <th>Done?</th>
          </tr>
        </thead>
      </table>
      {bids.map((bid) => {
        return (
          <tbody key={bid.id}>
            <tr>
              <td>{moment(bid.date).calendar()}</td>
              <td>{bid.generalContractor}</td>
              <td>{bid.jobName}</td>
              <td>{moment(bid.dueDate).calendar()}</td>
              {/* <td>{bid.newDone}</td> */}
            </tr>
            <button
              onClick={() => {
                updateBid(bid.id);
              }}
            >
              Update Bid
            </button>
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

      <form>
        <input
          type="date"
          required="required"
          placeholder="Post Date..."
          onChange={(event) => {
            setNewDate(event.target.value);
          }}
        />
        <input
          type="string"
          required="required"
          placeholder="General Contractor..."
          onChange={(event) => {
            setNewGC(event.target.value);
          }}
        />
        <input
          type="string"
          required="required"
          placeholder="Job Name..."
          onChange={(event) => {
            setNewJobName(event.target.value);
          }}
        />
        <input
          type="date"
          required="required"
          placeholder="Due Date..."
          onChange={(event) => {
            setNewDueDate(event.target.value);
          }}
        />
        <button onClick={createBid}> Create Bid</button>
      </form>
      <h4 id="bottom">Created By: Jesus Valdez</h4>
    </div>
  );
}

export default App;

// import {useState, useEffect} from "react";
// import moment from "moment";
// import "./App.css";
// import {db} from "./firebase-config";
// import {
//   collection,
//   getDocs,
//   addDoc,
//   updateDoc,
//   deleteDoc,
//   doc,
// } from "firebase/firestore";

// function App() {
//   const [newDate, setNewDate] = useState("");
//   const [newGC, setNewGC] = useState("");
//   const [newJobName, setNewJobName] = useState("");
//   const [newDueDate, setNewDueDate] = useState("");

//   const [bids, setBids] = useState([]);
//   const bidsCollectionRef = collection(db, "bids");

//   const createBid = async () => {
//     await addDoc(bidsCollectionRef, {
//       date: newDate,
//       generalContractor: newGC,
//       jobName: newJobName,
//       dueDate: newDueDate,
//     });
//   };

//   const updateBid = async () => {
//     await updateDoc(bidsCollectionRef, {
//       date: newDate,
//       generalContractor: newGC,
//       jobName: newJobName,
//       dueDate: newDueDate,
//     });
//   };

//   const deleteBid = async (id) => {
//     const bidDoc = doc(db, "bids", id);
//     await deleteDoc(bidDoc);
//   };

//   useEffect(() => {
//     const getBids = async () => {
//       const data = await getDocs(bidsCollectionRef);
//       const items = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
//       setBids(items);
//     };

//     getBids();
//   }, [bidsCollectionRef]);

//   return (
//     <div className="app-container">
//       <table>
//         <thead>
//           <tr>
//             <th>Date Posted</th>
//             <th>General Contractor</th>
//             <th>Job Name</th>
//             <th>Due Date</th>
//           </tr>
//         </thead>
//       </table>
//       {bids.map((bid) => {
//         return (
//           <div className="bid" key={bid.id}>
//             <h1>Date Posted: {moment(bid.date).calendar()}</h1>
//             <h1>General Contractor: {bid.generalContractor}</h1>
//             <h1>Job Name: {bid.jobName}</h1>
//             <h1>Due Date: {moment(bid.dueDate).calendar()}</h1>
//             <button
//               onClick={() => {
//                 updateBid(bid.id);
//               }}
//             >
//               Update Bid
//             </button>
//             <button
//               onClick={() => {
//                 deleteBid(bid.id);
//               }}
//             >
//               Delete Bid
//             </button>
//           </div>
//         );
//       })}

//       <form>
//         <input
//           type="date"
//           required="required"
//           placeholder="Post Date..."
//           onChange={(event) => {
//             setNewDate(event.target.value);
//           }}
//         />
//         <input
//           type="string"
//           required="required"
//           placeholder="General Contractor..."
//           onChange={(event) => {
//             setNewGC(event.target.value);
//           }}
//         />
//         <input
//           type="string"
//           required="required"
//           placeholder="Job Name"
//           onChange={(event) => {
//             setNewJobName(event.target.value);
//           }}
//         />
//         <input
//           type="date"
//           required="required"
//           placeholder="Due Date..."
//           onChange={(event) => {
//             setNewDueDate(event.target.value);
//           }}
//         />

//         <button onClick={createBid}> Create Bid</button>
//       </form>
//     </div>
//   );
// }

// export default App;
