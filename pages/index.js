import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import firebase from "../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import SignInScreen from '../components/Auth';

export default function Home() {


    // Firestore
    const db = firebase.firestore();

    const [user, loading, error] = useAuthState(firebase.auth());
    // check the user status
    console.log("Loading:", loading, "|", "Current user:", user);

    const [votes, votesLoading, votesError] = useCollection(
        firebase.firestore().collection("votes"),
        {}
    );

    if (!votesLoading && votes) {
        votes.docs.map((doc) => console.log(doc.data()));
    }

    // create vote document
    const addVoteDocument = async (vote) => {
        await db.collection("votes").doc(user.uid).set({
            vote,
        });
    };

    return (
        <div
            style={{
                display: "flex",
                height: "100vh",
                width: "100vw",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gridGap: 8,
            }}
        >

            {loading && <h4>Loading</h4>}
            {!user && <SignInScreen />}
            {user && (
                <>
                    <h1>Pineapple on Pizza?</h1>

                    <div style={{ flexDirection: "row", display: "flex" }}>
                        <button
                            style={{ fontSize: 32, marginRight: 8 }}
                            onClick={() => addVoteDocument("yes")}
                        >
                            I like pine
                        </button>
                        <h3>
                            Pineapple Lovers:{" "}
                            {votes?.docs?.filter((doc) => doc.data().vote === "yes").length}
                        </h3>
                    </div>

                    <div style={{ flexDirection: "row", display: "flex" }}>
                        <button
                            style={{ fontSize: 32 }}
                            onClick={() => addVoteDocument("no")}
                        >
                            I don't
                        </button>
                        <h3>
                            Pineapple Haters:{" "}
                            {votes?.docs?.filter((doc) => doc.data().vote === "no").length}
                        </h3>
                    </div>
                </>
            )}
        </div>
    );
}
