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
                if(data.profile.message === 'Not Found'){
                    ui.clearProfile();
                    ui.showAlert(`User "${inputText}" not found`, 'alert alert-danger');
                } else {
                    ui.showProfile(data.profile);
                    ui.showRepos(data.repos);
                }
            });
    } else {
        //Clear out profile in UI
        ui.clearProfile();
    }
});
