const APIURL = "https://www.jsonplaceholder.typicode.com"
const CONTAINER = document.getElementById('dataContainer')
    function getData(){
        const option = document.getElementById('dataType').value

        let fullApiLink = `${APIURL}/${option}`
        fetch(fullApiLink)
        .then(response => {
            if(!response){
                alert("Fail At fetching")
            }
            return response.json()
        })
        .then(data =>{
            showData(data)
        })
        .catch(err =>{
            alert(`Error message: ${err}`)
        })
    }

    function showData() {

        data.forEach(item => {
            const div = document.createElement('div')
            div.className = 'data-item'
            
            let content = `<stong>ID: ${item.id}</stong>`

            if(item.title){
                content += `<p>${item.title}</p>`
            } else if(item.name){
                content+= `<p>${item.name}</p>`
            }
        });
        div.innerHTML = content
        CONTAINER.appendChild(div)

    }

    function clearData(){
        CONTAINER.innerHTML = ''
    }