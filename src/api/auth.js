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