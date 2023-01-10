import React, { useEffect, useState } from "react";

const AllActivities = ({activities, setActivities}) => {
    const [searchTerm, setSearchTerm] = useState('');
    try {
        useEffect(() => {
            fetch('http://fitnesstrac-kr.herokuapp.com/api/activities', {
                headers: {
                'Content-Type': 'application/json',
                }, 
            })
                .then(result => result.json())
                .then(
                    (result) => {
                        setActivities(result);
                    },
                (error) => {
                    console.log(error);
                }
            )
        }, []);
    } catch (error) {
        console.error(error);
    };

    console.log(activities);

    const filteredActivities = activities.filter(activity => activity.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="portside">
            <h3>Placeholder</h3>
            <input
                className="search"
                placeholder="Search for Activities by Name..."
                value={searchTerm}
                type="text"
                onChange={(e) => setSearchTerm(e.target.value)}
            ></input>
            <div className="publicRountinesContainer">
                {filteredActivities.map((activity) => {
                    return (
                        <div className="singleactivity" key={activity.id}>
                            <h3>{activity.name}</h3>
                            <p>Description: {activity.description}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default AllActivities;