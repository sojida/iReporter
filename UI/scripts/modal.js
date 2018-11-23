const modal_view = document.getElementById('modal-view')
const modal_btn = document.querySelectorAll('.modal-btn')
const report_cards = document.querySelectorAll('.report-card')


report_cards.forEach((card)=>{
    card.onclick = (e) =>{

        for(i = 0; i < modal_btn.length; i++ ){
            if (e.target == modal_btn.item(i)){
                modal_view.style.display = 'block'
            }
        }
       
        
    }
})
    

window.onclick = (e) => {
    if(e.target == modal_view) {
        modal_view.style.display = 'none';
    } 
}

    


