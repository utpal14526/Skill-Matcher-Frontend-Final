import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import Skills from './Skill'; // Assuming this is an array of skill objects with { _id, name }
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function BoostYourProfile() {
    const [selectedSkills, setSelectedSkills] = useState([]);
    const host = "http://localhost:5000";

    const handleSkill = (name) => {

        if (selectedSkills.some(skill => skill.name === name)) {
            return;
        }

        const newSkill = {
            name: name,
            yoe: '',
            rate: 0,
        };

        setSelectedSkills([newSkill, ...selectedSkills]);
    };

    const handleInputChange = (index, field, value) => {
        const updatedSkills = [...selectedSkills];
        updatedSkills[index][field] = value;
        setSelectedSkills(updatedSkills);
    };

    const handleClick = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${host}/api/skillsadd`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token"),
                },
                body: JSON.stringify(selectedSkills),
            });

            const res = await response.json();
            console.log(res);

            if (res?.success) {
                toast.success('Updated Successfully');
            }

        } catch (error) {
            console.error("Error submitting skills:", error);
        }
    };

    const fetchSkills = async () => {
        try {
            const response = await fetch(`${host}/api/fetchskills`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token"),
                },
            });

            const res = await response.json();
            console.log(res);

            // Assuming the response is an array of skills

            setSelectedSkills(res);

        } catch (error) {
            console.error("Error fetching skills:", error);
        }
    };

    useEffect(() => {
        fetchSkills();
    }, []);

    return (
        <Layout>
            <div className='boostProfileContainer'>
                <div className='categories-slider'>
                    {Skills && Skills.map((ele) => (
                        <Link key={ele._id} className='category-link' onClick={() => handleSkill(ele.name)}>
                            <p className='category-item'>{ele.name}</p>
                        </Link>
                    ))}
                </div>

                <div className='querycontainer'>
                    {selectedSkills.map((skill, index) => (
                        <div key={index} className='skill-query'>
                            <h5>{skill.name}</h5>
                            <label>
                                Years of Experience:
                                <input
                                    type='number'
                                    value={skill.yoe}
                                    onChange={(e) => handleInputChange(index, 'yoe', e.target.value)}
                                    min='0'
                                />
                            </label>
                            <label>
                                Rating:
                                <div className='circular-range'>
                                    <input
                                        type='range'
                                        value={skill.rate}
                                        onChange={(e) => handleInputChange(index, 'rate', e.target.value)}
                                        min='0'
                                        max='10'
                                    />
                                    <span>{skill.rate}</span>
                                </div>
                            </label>
                        </div>
                    ))}
                </div>

                <button className='btn btn-primary' onClick={handleClick}>Submit</button>
            </div>
        </Layout>
    );
}
