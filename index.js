async function writeUsers(file)
{
	let raw = await fetch(file);
	let data = await raw.json();
	let html = "";
	
	for (let i = 0; i < data.length; i++)
	{
		let userID = i + 1;
		let userName = data[i].name;
		
		let button = document.createElement("button");
		button.innerText = userName;
		button.onclick = function() {writePosts(userID, userName)};
		button.setAttribute("class", "main--users--button");
		
		let usersContainer = document.getElementById("main--users");
		usersContainer.appendChild(button);
	}
}

async function writePosts(userID, userName)
{
	let raw = await fetch("https://jsonplaceholder.typicode.com/posts");
	let data = await raw.json();
	
	document.getElementById("main--posts").innerHTML = `<h2>Posts by ${userName}</h2>`;
	
	for (let i = 0; i < data.length; i++)
	{
		if (data[i].userId == userID)
		{
			let post = document.createElement("div");
			post.setAttribute("class", "main--posts--post");
			
			let title = document.createElement("h3");
			title.setAttribute("class", "main--posts--title");
			title.innerText = data[i].title;
			
			let para = document.createElement("p");
			let text = document.createTextNode(data[i].body);
			para.appendChild(text);
			
			let postsContainer = document.getElementById("main--posts");
			post.appendChild(title);
			post.appendChild(para);
			postsContainer.appendChild(post);
		}
	}
}

writeUsers("https://jsonplaceholder.typicode.com/users");