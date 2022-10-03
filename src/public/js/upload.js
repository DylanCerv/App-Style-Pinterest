const view = (e)=>{
    const read_img = new FileReader();
    const id_img = document.getElementById('img_foto');
    const img_default = document.getElementById('img_default');

    read_img.onload = ()=>{
        if(read_img.readyState == 2){
            img_default.style.display = 'none';
            id_img.src = read_img.result;
        }
    }
    read_img.readAsDataURL(e.target.files[0]);
}