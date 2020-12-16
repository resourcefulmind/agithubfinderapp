$(document).ready(function(){
    $('#searchUser').on('keyup', function(e){
        // we want to get whatever we are typing and we do that by passing event as a parameter above and then console logging e.target.value and assigning it to a variable
        let username = e.target.value;

        // to make ajax request to github
        $.ajax({
            url: 'https://api.github.com/users/'+ username, 
            data: {
                client_id: 'b7d80d6f34ecd88b692c', 
                client_secret: '9eaf407640cd909bf299958ca63d8822d8054511'
            }
        }).done(function(user){
            // this request might be appearing first but it is the second one and we are making it inside this done function
            $.ajax({
                url: 'https://api.github.com/users/'+ username+'/repos', 
                data: {
                    client_id: 'b7d80d6f34ecd88b692c', 
                    client_secret: '9eaf407640cd909bf299958ca63d8822d8054511', 
                    sort: 'created: asc',
                    per_page: 5 

                }
            }).done(function(repos){
                    $.each(repos, function(index, repo){
                        $('#repos').append(`
                        <div class="well">
                        <div class="row">
                        <div class="col-md-7">
                        <strong>${repo.name}</strong>: ${repo.description}
                        </div>
                        <div class="col-md-3>
                            <span class="label label-default">Forks: ${repo.forks_count}</span>
                            <span class="label label-primary">Watchers: ${repo.watchers_count}</span>
                            <span class="label label-success">Stars: ${user.stargazers_count}</span>
                        </div>
                        <div class="col-md-2">
                        <a target="_blank" class="btn btn-default" href="${repo.html_url}">Repo Page</a>
                        </div>
                        `);
                    }) 
            });
            // console.log(user);
            // if the tests work up until this point, all you have to do is take all that stuff and put it on your html
            // that id back in the html called profile is where you want to stick everything
            // the 3 column class is where our image is going to be
            $('#profile').html(`
            <div class="panel panel-default">
                <div class="panel-heading">
                   <h2 class="panel-title">${user.name}</h2>
                    </div> 
                        <div class="panel-body">  
                            <div class="row">
                                <div class="col-md-3">
                                    <img class="thumbnail avatar" src="${user.avatar_url}">
                                    <a target="_blank" class="btn btn-primary btn-block" href="${user.html_url}">View Profile</a>
                                </div>
                                <div class="col-md-9">
                                <span class="label label-default">Public Repos: ${user.public_repos}</span>
                                <span class="label label-primary">Public Gists: ${user.public_gists}</span>
                                <span class="label label-success">Followers: ${user.followers}</span>
                                <span class="label label-info">Following: ${user.following}</span>
                                <br><br>
                                <ul class="list-group">
                                    <li class="list-group-item">Company: ${user.company}</li>
                                    <li class="list-group-item">Website/Blog: ${user.blog}</li>
                                    <li class="list-group-item">Location: ${user.location}</li>
                                    <li class="list-group-item">Member Since: ${user.created_at}</li>
                                </ul>    
                                </div>
                            </div>
                        </div>
                    </div>
                    <h3 class="page-header">Latest Repositories</h3>
                    <div id="repos"></div>
            `);
        });
    });
});
// What we want to do is that when we type into that search bar, we want to make a request to the API 