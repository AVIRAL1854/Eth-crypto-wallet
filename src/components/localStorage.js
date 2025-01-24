
const loginChecker=()=>{
    const wallet = window.localStorage.getItem("MyWallet");

    if (wallet == null) {
      alert("Create a new Account");
      window.location("/login");
    }
    else{
        
        if(wallet.login!=true){
            alert("not login");
            window.location("/login");

            
        }

    }

}