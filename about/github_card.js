window.onload = (function() {
  var e = document.getElementById('github-usercard');
  var username = e.getAttribute("user");

  if (username) {
    var api_url = 'https://api.github.com/users/' + username;
  } else {
    return fail();
  }

  var request = new XMLHttpRequest();
  request.onreadystatechange = function() { 
    if (request.readyState === 4) {
      
      if (request.status === 200) {
      
        return success(request.responseText);
      } else {
        return fail();
      }
    } else {
     
    }
  }

  
  request.open('GET', api_url);
  request.send();

  function success(text) {
    var response_obj = JSON.parse(request.responseText)
    var s =
      '<div class="github-usercard">' +
      '<div class="github-hd">' +
      '<a class="github-avatar" href="' + response_obj.html_url + '" target="_top">' +
      '<img src="' + response_obj.avatar_url + '&amp;s=48"></a>' +
      '' +
      '<strong><a target="_blank" href="' + response_obj.html_url + '">' +
      response_obj.name + '</a></strong>' +
      '<span>@' + username + '</span>' +
      '</div>' +
      '<div class="github-bd">' +
      '<div class="github-desc">' +
      response_obj.bio +
      '<ul><li>' +
      '<a href="https://github.com/' + username + '?tab=repositories" target="_top"><strong>' + response_obj.public_repos + '</strong>Repos</a>' +
      '</li>' +
      '<li>' +
      '<a href="https://gist.github.com/' + username + '" target="_top"><strong>' + response_obj.public_gists + '</strong>Gists</a>' +
      '</li>' +
      '<li>' +
      '<a href="https://github.com/geemion/followers" target="_top"><strong>' + response_obj.followers + '</strong>Followers</a></li>' +
      '</ul>' +
      '</div>' +
      '</div>' +
      '<div class="github-ft">' +
      '<a class="github-via" href="' + (response_obj.blog || response_obj.html_url) + '">Available for hire.</a>' +
      '<a class="github-btn" href="' + response_obj.html_url + '">Follow</a>' +
      '</div>' +
      '</div>';
    e.innerHTML = s;
  }

  function fail() {
    e.innerHTML = "error";
  }
});
