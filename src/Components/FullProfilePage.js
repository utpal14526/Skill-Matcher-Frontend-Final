import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import Skills from './Skill'; // Assuming this is an array of skill objects with { _id, name }
import { useParams } from 'react-router-dom';

export default function FullProfilePage() {
    const [selectedSkills, setSelectedSkills] = useState([]);
    const host = "http://localhost:5000";
    const { USERID } = useParams();

    // Fetch skills from the backend
    const fetchSkills = async () => {
        try {
            const response = await fetch(`${host}/api/fetchskillsbyID/${USERID}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token"),
                },
            });
            const res = await response.json();
            setSelectedSkills(res);
        } catch (error) {
            console.error("Error fetching skills:", error);
        }
    };

    useEffect(() => {
        fetchSkills();
    }, [USERID]);

    return (
        <Layout>
            <div className='boostProfileContainer'>
                <div className='querycontainer'>
                    {selectedSkills.map((skill, index) => (
                        <div key={index} className='skill-query'>
                            <h5>{skill.name}</h5>
                            <label>
                                Years of Experience:
                                <input
                                    type='number'
                                    value={skill.yoe}
                                    readOnly // Making this field read-only
                                />
                            </label>
                            <label>
                                Rating:
                                <div className='circular-range'>
                                    <input
                                        type='range'
                                        value={skill.rate}
                                        min='0'
                                        max='10'
                                        readOnly // Making this field read-only
                                    />
                                    <span>{skill.rate}</span>
                                </div>
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}
