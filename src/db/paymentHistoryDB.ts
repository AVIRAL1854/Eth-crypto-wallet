const newPaymentAdd=()=>{

     const request = indexedDB.open("walletDatabase", 1); 


     request.onupgradeneeded=(event)=>{


        const db=event.target.result;
       

        
     }

     request.onsuccess=(event)=>{
        console.log("payment History database created S")
     }



}