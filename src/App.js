import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [username, setUsername] = useState("");
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUsername = async () => {
    if (username !== "") {
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "54d0c5e99bmshe5eadc6d0209274p13d1a1jsnc865441e4722",
          "X-RapidAPI-Host": "instagram-bulk-profile-scrapper.p.rapidapi.com",
        },
      };
      fetch(
        `https://instagram-bulk-profile-scrapper.p.rapidapi.com/clients/api/ig/ig_profile?ig=${username}&response_type=short&corsEnabled=false`,
        options
      )
        .then((response) => response.json())
        .then((response) => controlResponse(response))

        .catch((err) => setError(err));
    }
  };

  useEffect(() => {
    if (url !== "") {
      window.location.href = url;
    }
  }, [url]);

  const controlResponse = (res) => {
    if (res[0].name === "INVALID_USERNAME") {
      setError("Please enter valid username.");
      setTimeout(() => {
        setError("");
      }, 2000);
      setIsLoading(false);
    } else {
      setUrl(res[0].profile_pic_url_hd);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading((prev) => {
      return !prev;
    });
    handleUsername();
  };

  return (
    <>
      <header className="  p-3 d-flex justify-content-center text-center   align-items-center">
        <span>Created by Hasan Koman</span>
      </header>
      <main className=" d-flex flex-column justify-content-center align-items-center position-relative ">
        <form
          onSubmit={handleSubmit}
          className="d-flex flex-column p-4 justify-content-evenly"
        >
          <h2 className="fs-6 text-center form-header ">
            Enter the username of the person whose profile picture you want to
            see...
          </h2>
          <div class="input-group form-body ">
            <span class="input-group-text" id="basic-addon1">
              @
            </span>
            <input
              type="text"
              class="form-control"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <span className={`  error-text `}> {error} </span>
          <button type="submit" className="form-button  " disabled={isLoading}>
            {isLoading ? (
              <div class="spinner-border text-dark mt-1 " role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            ) : (
              "Go to Photo"
            )}
          </button>
        </form>
      </main>
    </>
  );
}

export default App;
