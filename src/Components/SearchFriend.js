import React, { useEffect, useState } from 'react';
import { Select, Radio } from 'antd';
import Layout from './Layout';
import Skills from './Skill'; // Assuming this is an array of skill objects with { _id, name }
import { toast } from 'react-toastify';
import SearchProfiles from './SearchProfiles'

export default function SearchFriend() {
  const host = "http://localhost:5000";

  const years = [
    { year: '2020', id: 0, value: 2020 },
    { year: '2021', id: 1, value: 2021 },
    { year: '2022', id: 2, value: 2022 },
    { year: '2023', id: 3, value: 2023 },
    { year: '2024', id: 4, value: 2024 },
    { year: '2025', id: 5, value: 2025 },
    { year: '2026', id: 6, value: 2026 },
    { year: '2027', id: 7, value: 2027 },
  ];

  const colleges = [
    { clg: 'DTU', id: 0 },
    { clg: 'NSUT', id: 1 },
    { clg: 'IITD', id: 2 },
    { clg: 'NIT', id: 3 },
    { clg: 'IITD', id: 4 },
    { clg: 'MAIT', id: 5 },
    { clg: 'Amity University', id: 6 }
  ];

  const [year, setYear] = useState(0);         // radio will store my year 
  const [college, setCollege] = useState('');    // store my colleg
  const [skills, setSkills] = useState([]);      // skills array 
  const [profiles, setProfiles] = useState([]);
  const [filterProfile, setFilterProfile] = useState([]);

  const handleskills = (value) => {
    if (skills.some(skill => skill === value)) {
      return;
    }
    setSkills([...skills, value]);
  };

  const removeSkill = (value) => {
    const updatedSkills = skills.filter(skill => skill !== value);
    setSkills(updatedSkills);
    fetchProfiles();
  };

  useEffect(() => {
    if (skills.length === 0) {
      fetchIntialProfiles();   // if any skill is not selected then simply fetch
    }
    else {
      fetchProfiles();      // on the basis of skills fteched
    }

  }, [skills, college, year]);

  useEffect(() => {
    fetchIntialProfiles();
  }, [])

  useEffect(() => {
    if (profiles.length > 0) {
      fetchfilteredProfiles();
    }
    else {
      setFilterProfile([]);
    }
  }, [profiles]);



  const fetchIntialProfiles = async () => {
    try {
      const response = await fetch(`${host}/api/fetchallprofiles`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      const { profile } = await response.json();
      console.log(profile);
      setProfiles(profile);

    } catch (error) {
      toast.error(error.message);
    }
  };


  const fetchProfiles = async () => {
    try {
      const response = await fetch(`${host}/api/fetchmatchSkill`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(skills),
      });

      const { users } = await response.json();
      console.log(users);
      setProfiles(users);
    } catch (error) {
      toast.error(error.message);
    }
  };


  const fetchfilteredProfiles = async () => {
    try {
      const fetchedProfiles = await Promise.all(profiles.map(async (ele) => {
        const res = await fetch(`${host}/api/fetchprofilebyuserid/${ele.USERID}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const user = await res.json();

        return {
          ...user,
          USERID: ele.USERID,
          selectedSkills: ele.selectedSkills
        };
      }));

      // Filter by year and college
      const filteredProfiles = fetchedProfiles.filter((ele) => {
        // Filter by Year
        const isYearMatch = year === 0 || ele.YEAROFGRADUATION === year;
        // Filter by College
        const isCollegeMatch = college === '' || ele.COLLEGENAME === college;

        // Return profiles that match both filters
        return isYearMatch && isCollegeMatch;
      });

      console.log({
        year,
      });

      // Set filtered profiles
      setFilterProfile(filteredProfiles);
      console.log(filteredProfiles);

    } catch (error) {
      toast.error(error.message);
    }
  };




  return (
    <Layout>
      <div className='searchFriendContainer'>
        <div className='filters p-3'>
          <h5 className='mt-3 '>Search By Year </h5>

          <div data-mdb-input-init className="form-outline mb-3">

            <Select
              variant={false}
              placeholder='Select By Year'
              size='large'
              showSearch
              className='form-select mb-3'
              onChange={(value) => { setYear(value) }}
            >
              {years.map((ele) => (
                <Select.Option key={ele.id} value={ele.value}>
                  {ele.year}
                </Select.Option>
              ))}
            </Select>

          </div>

          <h5 className='mt-3 '>Search By College </h5>
          <div data-mdb-input-init className="form-outline mb-3">
            <Select
              variant={false}
              placeholder='Select By College'
              size='large'
              showSearch
              className='form-select mb-3'
              onChange={(value) => { setCollege(value) }}
            >
              {colleges.map((ele) => (
                <Select.Option key={ele.id} value={ele.clg}>
                  {ele.clg}
                </Select.Option>
              ))}
            </Select>

          </div>

          <h5 className='mt-3 '>Search By Skills </h5>
          <div data-mdb-input-init className="form-outline mb-3">
            <Select
              variant={false}
              placeholder='Select By Skills'
              size='large'
              showSearch
              className='form-select mb-3'
              onChange={(value) => { handleskills(value) }}
            >
              {Skills.map((ele) => (
                <Select.Option key={ele.id} value={ele.name}>
                  {ele.name}
                </Select.Option>
              ))}
            </Select>

            <div className='d-flex flex-wrap'>

              {skills.map((e) => (
                <div className='tags' key={e}>
                  <h7 className='mr-2'>{e}</h7>
                  <i
                    className="fa fa-close"
                    onClick={() => { removeSkill(e) }}
                    style={{ 'fontSize': '16px', color: 'white', marginLeft: '5px' }}
                  ></i>
                </div>
              ))}

            </div>
          </div>
        </div>

        <div className='friends '>

          {
            filterProfile.map((ele) => {
              return <SearchProfiles ele={ele} />
            })
          }
        </div>
      </div>
    </Layout>
  );
}
