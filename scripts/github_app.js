const github = new GitHub;
const ui = new UI;

// Search text input element
const searchUser = document.getElementById('searchUser');

searchUser.addEventListener('keyup', (e) => {
    const inputText = e.target.value;
    if (inputText !== ''){
        //http call to GitHub
        github.getUser(inputText)
            .then(data => {
                console.log(data);
                if(data.profile.message === 'Not Found'){

                } else {
                    ui.showProfile(data.profile);
                }
            });
    } else {
        //Clear out profile in UI
    }
});
