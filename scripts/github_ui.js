class UI {
    constructor(){
        this.profile = document.getElementById('profile');
    }

    showProfile(user) {
        ui.clearAlert();
        this.profile.innerHTML = `
            <div class="card border-light mb-3">
                <div class="card-header text-center">${user.login} | ${user.name}</div>
                <div class="card-body">
                    <div class="row">
                      <div class="col-md-3 text-center">
                        <img class="img-fluid mb-2" src="${user.avatar_url}">
                        <a href="${user.html_url}" target="_blank" class="btn btn-primary mb-2">View Profile</a>
                      </div>
                      <div class="col-md-9">
                        <h4 class="card-title">
                            <span class="badge badge-pill badge-warning">
                                Repos: ${user.public_repos}
                            </span>
                            <span class="badge badge-pill badge-secondary">
                                Gists: ${user.public_gists}
                            </span>
                            <span class="badge badge-pill badge-success">
                                Followers: ${user.followers}
                            </span>
                            <span class="badge badge-pill badge-info">
                                Following: ${user.following}
                            </span>
                        </h4>
                        <h4>Repositories</h4>
                        <div id="repos"></div>
                      </div>
                    </div>
                </div>
            </div>
        `;
    }

    showRepos(repos) {
        const reposDiv = document.getElementById('repos');
        let output = `<div class="list-group">`;
        repos.forEach(function(repo) {
          output += `<a href="${repo.html_url}" class="list-group-item list-group-item-action" target="_blank">
                       <div  class="d-block d-md-flex justify-content-md-between">
                         <span class="d-block d-md-inline-block">${repo.name}</span>
                         <span class="d-block d-md-inline-block ">
                           <span class="badge badge-pill badge-warning ">
                               Stars: ${repo.stargazers_count}
                           </span>
                           <span class="badge badge-pill badge-secondary">
                               Watchers: ${repo.watchers_count}
                           </span>
                           <span class="badge badge-pill badge-success">
                               Forks: ${repo.forks_count}
                           </span>
                         </span>
                       </div>
                     </a>`
        });
        output += '</div>';
        reposDiv.innerHTML = output;
    }

    showAlert(msg, classNames) {
        ui.clearAlert();

        const div = document.createElement('div');
        div.className = classNames;
        div.appendChild(document.createTextNode(msg));
        const container = document.querySelector('.searchContainer .card-body');
        container.insertBefore(div, document.getElementById('profile'));
    }

    clearAlert(){
        const currentAlert = document.querySelector('.alert');
        if (currentAlert) {
            currentAlert.remove();
        }
    }

    clearProfile() {
        this.profile.innerHTML = '';
    }
}
