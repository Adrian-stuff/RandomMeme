var bottom = document.querySelector(".bottom");
var button = document.createElement("button");

var body = document.querySelector(" .container");
var img = document.createElement("img");
var caption = document.querySelector(".caption");

var author = document.createElement("h2");
var authorLink = document.createElement("a");
var subreddit = document.createElement("h2");
var subredditLink = document.createElement("a");

var captionText = document.createElement("h2");
var loading = document.getElementById("text");

var link = localStorage.getItem("link");
var input = document.getElementById("input");

function setData(data) {
  img.src = data.url;
  img.className = "meme";
  img.setAttribute("onclick", `window.open('${data.postLink}', '_blank');`);
  loading.innerHTML = "";
  author.textContent = `u/${data.author}`;
  captionText.textContent = `${data.title}`;
  authorLink.setAttribute("href", `https://reddit.com/user/${data.author}`);
  authorLink.setAttribute("target", "_blank");
  authorLink.id = "Link";
  subreddit.textContent = `r/${data.subreddit}`;
  subredditLink.setAttribute("href", `https://reddit.com/r/${data.subreddit}`);
  subredditLink.setAttribute("target", "_blank");
  subredditLink.id = "Link";
  button.setAttribute("onclick", "window.location.reload();");
  button.textContent = "Reload";

  authorLink.append(author);
  subredditLink.append(subreddit);
  caption.appendChild(subredditLink);
  caption.appendChild(authorLink);
  caption.appendChild(captionText);
  body.appendChild(img);
  bottom.append(button);
}
function setUrl() {
  localStorage.setItem("link", input.value);
  window.location.reload();
}
function reset() {
  localStorage.clear();
}

async function getData() {
  await fetch(
    link
      ? `https://meme-api.herokuapp.com/gimme/${link}`
      : "https://meme-api.herokuapp.com/gimme"
  )
    .then((res) => res.json())
    .then((data) => {
      try {
        if (data.code === 404) {
          reset();
          window.location.reload();
        } else setData(data);
      } catch (error) {
        if (error) {
          loading.innerHTML = "Error occured pls try again xD";
          button.innerHTML = "Reload";
          bottom.append(button);
          return;
        }
      }
      console.log("btw: ", data);
      console.log("api link: https://meme-api.herokuapp.com/gimme");
    });
}
input.value = link;

console.log(
  "%cWarning!",
  "color:red;font-family:system-ui;font-size:2rem;-webkit-text-stroke: 1px black;font-weight:bold"
);
console.log(
  "%cthe source code is messy pls dont open xD",
  "font-family: system-ui;"
);
getData();
