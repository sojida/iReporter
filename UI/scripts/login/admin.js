const loginBtn = document.getElementById('login');
const loginForm = document.getElementById('login-form')
const loginUrl = "https://sojida-ireporter.herokuapp.com/api/v1/auth/login";
const loginUrlLocal = "http://127.0.0.1:3000/api/v1/auth/login"
const getIncidentsLocal = "http://127.0.0.1:3000/api/v1/incidents"
const getIncidents = 'https://sojida-ireporter.herokuapp.com/api/v1/incidents'

const loginDetails = new FormData(loginForm)

const headers = new Headers();
headers.append("Content-Type", "application/json")
headers.append('Authorization', 'eyJhbGciOiJIUzI1NiJ9.Mw.MWTOWgZO1t7yoLOmN4cEOcH5L3_gDmqwrQ1xchh3-SU')

const admin = {email: "sojiman@gmail.com", password: "admi1234"}

loginBtn.addEventListener('click', function(e) {
    e.preventDefault()
    console.log('I have been clicked', loginDetails.get('email'))
   
    postData(loginUrlLocal, admin)
    .then(function(res){
        console.log(res)
    })
    .catch(function(err) {
        throw err
    })

})




function postData (url = '', data = {}) {
    return fetch(url, {
        method: "POST",
        mode: "cors",
        headers: headers,
        body: JSON.stringify(data),
    })
    .then(function(res){
        console.log(res)
        return res.json()
    })
    .then(function(res){
        console.log(res)
        if (res.ok){
            return res
        } else {
            return {err: 'res not good'}
        }

        
    })
    .catch(err => console.error(err))
}

// fetch(loginUrl, {
//     method: 'POST', // or 'PUT'
//     body: JSON.stringify(data), // data can be `string` or {object}!
//     mode: "no-cors",
//     headers:{
//       'Content-Type': 'application/json'
//     },
//   }).then(res => res)
//   .then(response => console.log('Success:', JSON.stringify(response)))
//   .catch(error => console.error('Error:', error));