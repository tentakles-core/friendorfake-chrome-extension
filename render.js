// runs every time page reloads
console.log("Script start");

(() => {
  if (document && document.getElementById("fad-banner")) {
    document.getElementById("fad-banner").remove();
  }
  const endpoint =
    "https://cors-everywhere-me.herokuapp.com/http://13.232.85.186:3000/api/v1/is-fake";

  /**
   * Function returns a banner element which can be inserted to the instagram profile
   *
   * @param {string} text Text contained in the banner
   * @param {['red', 'green', 'blue']} color
   * @returns banner element (DIV element)
   */
  const bannerElement = (text, color) => {
    if (document.querySelector("#fad-banner") !== null) {
      return;
    }
    const container = document.createElement("div");
    container.id = "fad-banner";

    container.style.backgroundColor =
      color === "red"
        ? "#F44336"
        : color === "green"
        ? "#4CAF50"
        : color === "blue"
        ? "#03A9F4"
        : "#2196F3";
    container.style.zIndex = "1000";
    container.style.position = "relative";
    container.style.top = "50px";

    const textContainer = document.createElement("p");
    textContainer.innerText = text;
    textContainer.style.textAlign = "center";
    textContainer.style.fontFamily =
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif';
    textContainer.style.fontSize = "16px";
    textContainer.style.fontWeight = 600;
    textContainer.style.color = "white";
    textContainer.style.marginTop = "10px";
    textContainer.style.marginBottom = "10px";
    textContainer.style.padding = "10px";

    container.prepend(textContainer);

    return container;
  };

  const getUserFromDocument = (username) => {
    let bioLength = 0;
    if (
      document.querySelector("header section") &&
      document.querySelector("header section").children[2] &&
      document.querySelector("header section").children[2].children[3]
    ) {
      bioLength =
        document.querySelector("header section").children[2].children[3]
          .innerText.length;
    } else {
      bioLength = 0;
    }

    const user = {
      followers: parseInt(
        /([0-9]+(<\/span> followers))/
          .exec(document.body.innerHTML)[0]
          .split("<")[0]
      ),
      following: parseInt(
        /([0-9]+(<\/span> following))/
          .exec(document.body.innerHTML)[0]
          .split("<")[0]
      ),
      bioLength: bioLength,
      mediaCount: parseInt(
        /([0-9]+(<\/span> posts))/
          .exec(document.body.innerHTML)[0]
          .split("<")[0]
      ),
      hasProfilePic: /(cdninstagram.com)/.test(
        /(<img ([\w\W]+?)>)/.exec(document.body.innerHTML)[0].split(" ").at(-1)
      )
        ? 1
        : 0,
      isPrivate: /(This Account is Private)/.test(document.body.innerHTML)
        ? 1
        : 0,
      usernameDigitCount: username.replace(/[^0-9]/g, "").length,
      usernameLength: username.length,
    };
    return user;
  };

  setTimeout(() => {
    const username = location.href.split("/")[3];
    const user = getUserFromDocument(username);
    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, user: user }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.result);
        console.log(document.body);
        if (document.body.children[0]["id"] != "fad-banner") {
          check = true;

          if (res.result) {
            document.body.prepend(
              bannerElement("This account is probably fake", "red")
            );
          } else {
            document.body.prepend(
              bannerElement("This account is probably not fake", "green")
            );
          }
        }
      })
      .catch((err) => console.log(err));
  }, 2000);
})();
