class UI {
    constructor(){
        this.profile = document.getElementById('profile');
    }

    showProfile(user) {
        this.profile.innerHTML = `
            <div class="card border-light mb-3">
                <div class="card-header text-center">${user.name}</div>
                <div class="card-body">
                    <div class="row">
                      <div class="col-md-3">
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
                      </div>
                    </div>
                </div>
            </div>
            <h4>Repositories</h4>
            <div id="repos"></div>
        `;
    }
}
