// runs every time page reloads
console.log("Script start");

(() => {
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

  const username = location.href.split("/")[3];

  const request = indexedDB.open("redux");

  request.onsuccess = (event) => {
    const db = event.target.result;

    const tx = db.transaction("paths", "readonly");
    const store = tx.objectStore("paths");

    const getKey = store.get("users.users");

    getKey.onsuccess = () => {
      console.log("indexedDB query success!");
      const banner = null;

      const result = getKey.result;

      const entries = Object.entries(result);

      fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      })
        .then((res) => res.text())
        .then((res) => {
          console.log(res);

          if (res === "") {
            let check = false;
            for (const entry of entries) {
              if (entry[1]["username"] === username) {
                e = entry[1];
                const user = {
                  followers: e["counts"]["followedBy"],
                  following: e["counts"]["follows"],
                  bioLength: e["bio"].length,
                  mediaCount: e["counts"]["media"],
                  hasProfilePic: 1,
                  isPrivate: e["isPrivate"] ? 1 : 0,
                  usernameDigitCount: 0,
                  usernameLength: e["username"].length,
                };

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
                          bannerElement(
                            "This account is probably not fake",
                            "green"
                          )
                        );
                      }
                    }
                  })
                  .catch((err) => console.log(err));
              }
            }

            if (!check) {
              document.body.prepend(
                bannerElement("This account is probably not fake", "green")
              );
            }
          } else {
            const result = JSON.parse(res);
            if (result.result) {
              document.body.prepend(
                bannerElement("This account is probably fake", "red")
              );
            } else {
              document.body.prepend(
                bannerElement("This account is probably not fake", "green")
              );
            }
          }
        });
    };

    tx.onerror = () => {
      console.error(tx.error);
    };

    tx.oncomplete = () => {
      db.close();
    };
  };
})();
// fetch('http://3.111.176.208:5000/predict', {
//     method: 'post',
//     body: JSON.stringify({
//     "cc_num" : 38580487454720.0,
//     "amt": 2.319999933242798,
//     "zip": 58765.0,
//     "lat": 48.88560104370117,
//     "long": -103.00980377197266,
//     "city_pop": 248.0,
//     "merch_lat": 48.949153900146484,
//     "merch_long": -102.4922866821289,
//     "txn_hour": 10.0,
//     "txn_minute": 45.0,
//     "txn_date": 8.0,
//     "txn_month": 12.0
// })
// }).then(res => console.log(res))
