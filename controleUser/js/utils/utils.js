class Utils{

    static formatDate(date){
        return date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear()+ " " + date.getHours() + ":" + date.getMinutes()
    }

}