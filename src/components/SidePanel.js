

function SidePanel(){

    function toggleClose(){
        document.querySelector(".sidepanel-background").style.visibility = "hidden";


    }



    return (
        <div className="sidepanel-background">

            <div className="sidepanel">

                <div className="sidepanel-head">
                    <h1>Logo</h1>
                    <a id="sidepanel-head-clsbtn" onClick={toggleClose}>×</a>
                </div>
                <div className="sidepanel-body">
                    <div class="sidepanel-body-container">
                        <h3>Barbeque Nation</h3>
                        <div className="sidepanel-body-options">
                            <p>Home</p>
                            <p>Delivery/Takeaway</p>
                            <p>Happiness Card</p>
                            <p>Whats on BBQN</p>
                            <p>Today's Menu</p>
                            <p>Catering</p>
                        </div>
                    </div>

                    <div class="sidepanel-body-container">
                        <h3>About</h3>
                        <div className="sidepanel-body-options">
                            <p>About Us</p>
                            <p>Smiles</p>
                            <p>Nutrition Information</p>
                            <p>Blog</p>
                            <p>News</p>
                        </div>
                    </div>

                    <div class="sidepanel-body-container">
                        <h3>Others</h3>
                        <div className="sidepanel-body-options">
                            <p>Contact Us</p>
                            <p>Corporate Enquiry</p>
                            <p>Investor Relations</p>
                            <p>FAQ</p>
                            <p>Media Coverage</p>
                            <p>Barbeque Nation Partnership</p>
                        </div>
                    </div>
                </div>

            </div>

        </div>
   
  
    )
  }
  
  
   
  
  
  export default SidePanel;
  