export const registerUser = async (username, password) => {
    try {
        const response = await fetch(
            `http://fitnesstrac-kr.herokuapp.com/api/users/register`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                        username,
                        password,
                }),
            }
        )
        const {token} = await response.json();
        return token;
    } catch (error) {
        console.error(error);
        return `There was a ${error} type error. Please make sure your passwords match and are 8+ characters in length.`
    }
};

export const login = async (username, password) => {
    try {
        const response = await fetch('http://fitnesstrac-kr.herokuapp.com/api/users/login', 
        {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
          });
        const {token} = await response.json();
        console.log(token)
        return token;
    } catch (error) {
        console.error(error);
    }
};

export const getUserId = async (token) => {
    try {
        const response = await fetch('http://fitnesstrac-kr.herokuapp.com/api/users/me', {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
          })
        const result = await response.json();
        return result.username;
    } catch (error) {
        console.error(error);
    }
};

// this calls the api, returns array of public routines
export const getPublicRoutines = async () => {
    try {
        const response = await fetch('http://fitnesstrac-kr.herokuapp.com/api/routines', {
            headers: {
            'Content-Type': 'application/json',
            },
        });
        const routines = await response.json();
        return routines;
    } catch (error) {
        console.error(error);
    }
};

export const submitActivity = async (name, description, token) => {
    try {
        const response = await fetch('http://fitnesstrac-kr.herokuapp.com/api/activities', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
            body: JSON.stringify({
              name: `${name}`,
              description: `${description}`
            })
          }).then(response => response.json())
        return response;
    } catch (error) {
        console.error(error);
    }
}

export const getMyRoutines = async (username, token) => {
    try {
        const response = await fetch(`http://fitnesstrac-kr.herokuapp.com/api/users/${username}/routines`, {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
            },
        });
        const routines = await response.json();
        return routines;
    } catch (error) {
        console.error(error);
    }
};

export const submitRoutine = async (name, goal, isPublic, token) => {
    try {
        const response = await fetch('http://fitnesstrac-kr.herokuapp.com/api/routines', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
            body: JSON.stringify({
              name: `${name}`,
              goal: `${goal}`,
              isPublic: `${isPublic}`
            })
          }).then(response => response.json())
        return response;
    } catch (error) {
        console.error(error);
    }
}

export const getAllActivities = async () => {
    try {
        const response = await fetch('http://fitnesstrac-kr.herokuapp.com/api/activities', {
            headers: {
            'Content-Type': 'application/json',
            },
        });
        const activities = await response.json();
        return activities;
    } catch (error) {
        console.error(error);
    }
}

export const addActivityToRoutine = async (routineId, activityId, count, duration, token) => {
    try {
        const response = await fetch(`http://fitnesstrac-kr.herokuapp.com/api/routines/${routineId}/activities`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
            body: JSON.stringify({
                activityId: `${activityId}`,
                count: `${count}`, 
                duration: `${duration}`
            })
        });
        const newActivity = await response.json();
        return newActivity;
    } catch (error) {
        console.error(error);
    }
}

export const editRoutine = async (routineId, name, goal, isPublic, token) => {
    try {
        const response = await fetch(`http://fitnesstrac-kr.herokuapp.com/api/routines/${routineId}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
            body: JSON.stringify({
              name: `${name}`,
              goal: `${goal}`,
              isPublic: `${isPublic}`
            })
          }).then(response => response.json())
        return response;
    } catch (error) {
        console.error(error);
    }
}

export const editActivity = async (routineActivityId, duration, count, token) => {
    try {
        const response = await fetch(`http://fitnesstrac-kr.herokuapp.com/api/routine_activities/${routineActivityId}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
            body: JSON.stringify({
              count: `${count}`,
              duration: `${duration}`
            })
          }).then(response => response.json())
        return response;
    } catch (error) {
        console.error(error);
    }
}

export const deleteRoutine = async (routineId, token) => {
    try {
        const response = await fetch(`http://fitnesstrac-kr.herokuapp.com/api/routines/${routineId}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
          }).then(response => response.json())
        return response;
    } catch (error) {
        console.error(error);
    }
}

export const deleteActivityFromRoutine = async (routineActivityId, token) => {
    try {
        const response = await fetch(`http://fitnesstrac-kr.herokuapp.com/api/routine_activities/${routineActivityId}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
          }).then(response => response.json())
        return response;
    } catch (error) {
        console.error(error);
    }
}

