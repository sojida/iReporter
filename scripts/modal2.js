const modal_view = document.getElementById('modal-view')
const modal_btn = document.getElementById('modal-btn')
const full_report = document.getElementById('full-report')


full_report.onclick = (e) => {
    if (e.target == modal_btn) {
        modal_view.style.display = 'block'
    }   
}
    

window.onclick = (e) => {
    if(e.target == modal_view) {
        modal_view.style.display = 'none';
    } 
}
