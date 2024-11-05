import Alert from '@mui/material/Alert';
//import '../css/ModalMessage.css'


function ModalYesNo ({ message,show,  onYes, onNo }){
    if(!show){
      return;
    }
 
    onYes ||= ()=>{};
    onNo ||= ()=>{};


    return(
        <div className='modal'>
         
          <div>
            <Alert severity="error">  { message } </Alert>
          </div>


          <div>
            <button className='eleccion' onClick={onYes}>SI</button>
            <button className='eleccion' onClick={onNo}>NO</button>
          </div>


        </div>
    )
   
  }


  export default ModalYesNo


 
 
