document.getElementById("petForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let sno = document.getElementById("sno").value;
    let roll = document.getElementById("roll").value;
    let name = document.getElementById("name").value;
    let gender = document.getElementById("gender").value;
    let chest = document.getElementById("chest").value;
    let startTime = document.getElementById("startTime").value;
    let finishTime = document.getElementById("finishTime").value;
    let timeTaken = document.getElementById("timeTaken").value;
    let reason = document.getElementById("reason").value;
    let pass = document.getElementById("pass").checked;
    
    let candidate = {
        sno, roll, name, gender, chest, startTime, finishTime, timeTaken, reason, pass
    };
    
    let candidates = JSON.parse(localStorage.getItem("candidates")) || [];
    candidates.push(candidate);
    localStorage.setItem("candidates", JSON.stringify(candidates));
    
    alert("Candidate data saved!");
    this.reset();
});
