import React, { ReactElement } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import firebase from "../firebase/clientApp";

interface Props {
	id: string;
	vote: string;
}

export default function VoterList({ id, vote }) {
	const [value, loading, error] = useDocument(
		firebase.firestore().doc(`users/${id}`)
	);

	if (loading) {
		return <h6>Loading</h6>;
	}

	if (error) {
		return null;
	}

	return (
		<div
			style={{
				maxWidth: "320px",
				display: "flex",
				flexDirection: "row",
				alignItems: "center",
			}}
		>
			<div>
				<h4 style={{ marginBottom: 0 }}>{value.data().email}</h4>
				<h4 style={{ marginTop: 0 }}>
					Voted: {vote === "yes" ? "yes" : "no"}
				</h4>
			</div>
		</div>
	);
}

export default VoterList;