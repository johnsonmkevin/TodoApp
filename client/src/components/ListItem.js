import React from "react";
import ProgressBar from "./ProgressBar";
import { BsDatabaseCheck } from "react-icons/bs";
import { useState } from "react";
import Modal from "./Modal";

function ListItem({ task, getData }) {
	const [showModal, setShowModal] = useState(false);


	const deleteItem = async () => {
		try {
			const response = await fetch(`http://localhost:8000/todos/${task.id}`, {
				method:'DELETE'
			})
			if (response.status === 200) {
				getData()
			}
		} catch (err){
			console.error(err)
		}
	}

	return (
		<div className="list-item">
			<BsDatabaseCheck />
			<div className="information-container">
				<p className="task-title">{task.title}</p>
				<ProgressBar />
				<div className="btn-container">
					<button className="edit" onClick={() => setShowModal(true)}>
						EDIT
					</button>
					<button className="delete" onClick={deleteItem}>DELETE</button>
				</div>
			</div>
			{showModal && <Modal mode={"edit"} setShowModal={setShowModal} task={task} getData={getData}/>}
		</div>
	);
}

export default ListItem;
