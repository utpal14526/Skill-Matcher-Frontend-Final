import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CardComponent = (props) => {
    const { name, photo, YEAROFGRADUATION, COLLEGENAME, USERID, selectedSkills } = props.ele;
    const host = "http://localhost:5000";
    const navigate = useNavigate();

    const MakeFriend = async () => {
        const response = await fetch(`${host}/api/makefriend/${USERID}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token"),
            },
        });

        const res = await response.json();

        if (res?.sucess) {
            toast.success(res.message);
        } else {
            toast.error(res.message);
        }
    };

    const SeeFullProfile = (USERID) => {
        navigate(`/seeProfile/${USERID}`);
    }

    return (
        <div className="profile-card">
            {photo && (
                <div className="card-header">
                    <img src={`${host}/api/profilephoto/${USERID}`} alt={name} className="card-image" />
                </div>
            )}

            <div className="card-body">
                <h2 className="card-name">{name}</h2>
                <p className="card-details">{YEAROFGRADUATION} - {COLLEGENAME}</p>
                <div className="card-tags">
                    {selectedSkills.map((tag, index) => (
                        <span key={index} className="card-tag">{tag.name}</span>
                    ))}
                </div>

                <div className="card-actions mt-3">
                    <button className='btn make-friend-btn' onClick={MakeFriend}>Make Friend</button>
                    <button className='btn make-friend-btn ml-2' onClick={() => { SeeFullProfile(USERID) }}>See Profile</button>
                </div>
            </div>
        </div>
    );
};

export default CardComponent;
