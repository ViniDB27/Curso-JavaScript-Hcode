class UserController {
    
    constructor(formId, tableId ){
        this.formEl = document.getElementById(formId)
        this.tableEl = document.getElementById(tableId)

        this.onSubmite()
    }


    onSubmite(){
        let btnSalvar = this.formEl.querySelector("[type=submite]")

        this.formEl.addEventListener('submit', e=>{
            e.preventDefault()
            
           // btnSalvar.disabled = true

            let values = this.getValues()

            if(!values){return false}

            this.getPhoto()
            .then(content=>{
                values.photo = content
                this.addLine(values)
                this.formEl.reset()
                //btnSalvar.disabled = false
            })  
            .catch(error=>{
                console.log(error)
            })

        })

    }

    getPhoto(){

        return new Promise((resolve, reject)=>{

            let fileReader = new FileReader()

            let formChield = [...this.formEl.elements]
    
            let element = formChield.filter(item=>{
                if(item.name === "photo"){
                    return item   
                }
            })
    
            let file = element[0].files[0]
    
            fileReader.onload = ()=>{
                resolve(fileReader.result)
            }

            fileReader.onerror = e=>{
                reject(e)
            }
    
            if(file){
                fileReader.readAsDataURL(file)
            }else{
                resolve("dist/img/avatar.png")
            }

        })

    }

    getValues (){

        let user = {}
        let formChield = [...this.formEl.elements]
        let isValit = true

        formChield.forEach((field, index)=>{

            if(["name","email","password"].indexOf(field.name) > -1 && !field.value){
                field.parentElement.classList.add("has-error")
                isValit = false
                return false
            }

            
            if(field.name === "gender"){
        
                if(field.checked){
                    user.gender = field.value
                }
        
            }else if(field.name === "admin"){
                
                user[field.name] = field.checked

            } else{
        
                user[field.name] = field.value
        
            }

        
        })

        if(isValit){

            return new User(user.name, 
                user.gender, 
                user.birth, 
                user.country, 
                user.email, 
                user.password, 
                user.photo, 
                user.admin
            )
        }

        
    }

    addLine(dataUser){

        let tr = document.createElement("tr")

        tr.innerHTML = `   
                <td><img src=${dataUser.photo} alt="User Image" class="img-circle img-sm"></td>
                <td>${dataUser.name}</td>
                <td>${dataUser.email}</td>
                <td>${(dataUser.admin)?"SIM":"NÃO"}</td>
                <td>${Utils.formatDate(dataUser.register)}</td>
                <td>
                    <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
                    <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
                </td>
        `
        this.tableEl.appendChild(tr)

        this.updateCount()
    }

    updateCount(){

        

    }
}