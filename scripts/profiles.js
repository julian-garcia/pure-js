document.addEventListener('DOMContentLoaded', getProfiles())
document.getElementById('next').addEventListener('click', function(){
  nextProfile(profiles);
});

async function getProfileData() {
  const response = await fetch('https://randomuser.me/api?results=10');
  const responseData = await response.json();
  return responseData['results'];
}
let profiles;

function getProfiles() {
  getProfileData()
    .then ((data) => {
      profiles = profileIterator(data);
      nextProfile(profiles);
    });
}

function profileIterator(profiles) {
  let nextIndex = 0;

  return {
    next: function(){
      return nextIndex < profiles.length ?
        {value: profiles[nextIndex++], done: false} :
        {done: true}
    }
  };
}

function nextProfile(profiles) {
  const currProfile = profiles.next().value;
  console.log(currProfile);
  if (currProfile !== undefined) {
    document.getElementById('profile-image').setAttribute('src',currProfile.picture.large);
    document.getElementById('profile-name').textContent = `${currProfile.name.first} ${currProfile.name.last}`;
    document.getElementById('profile-email').textContent = currProfile.email;
  } else {
    window.location.reload();
  }
}
