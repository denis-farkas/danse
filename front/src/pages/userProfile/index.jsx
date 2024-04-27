import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { userService } from "../../utils/userService";

const UserProfile = () => {
  const [user, setUser] = useState("");
  let actualUser = JSON.parse(localStorage.getItem("user"));
  const id = actualUser.userId;
  const navigate = useNavigate();
  useEffect(() => {
    let data;

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `http://localhost:3000/users/readOneUser?id=${id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response);
        setUser(response.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(user);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id !== undefined || user.role === "admin") {
      const token = actualUser.token;
      user.userId = id;
      let data = { user };

      data = JSON.stringify(data);

      let config = {
        method: "put",
        maxBodyLength: Infinity,
        url: "http://localhost:3000/users/updateUser",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          if (response.status === 200) {
            toast.success("Modification validée");
            userService.update();
            setTimeout(() => {
              navigate("/signIn");
            }, 3000);
          }
        })
        .catch((error) => {
          errorMessage = error.response?.data?.message || "An error occurred";
          toast.error(errorMessage);
        });
    } else {
      const errorMessage =
        "Vous ne disposez pas des droits pour cette modification";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="main">
      <h2>Mes informations personnelles</h2>

      <form onSubmit={handleSubmit}>
        <div className="inputGroup">
          <label className="inputLabel" htmlFor="address">
            Adresse
          </label>
          <input
            id="address"
            aria-label="Entrez votre adresse"
            className="inputField"
            type="text"
            name="address"
            value={user && user.address}
            onChange={handleInputChange}
          />
        </div>
        <div className="inputGroup">
          <label className="inputLabel" htmlFor="postCode">
            CP
          </label>
          <input
            id="postCode"
            aria-label="Entrez votre code postal"
            className="inputField"
            type="text"
            name="postCode"
            value={user && user.postCode}
            onChange={handleInputChange}
          />
        </div>
        <div className="inputGroup">
          <label className="inputLabel" htmlFor="city">
            Ville
          </label>
          <input
            id="city"
            aria-label="Entrez votre ville"
            className="inputField"
            type="text"
            name="city"
            value={user && user.city}
            onChange={handleInputChange}
          />
        </div>
        <div className="inputGroup">
          <label className="inputLabel" htmlFor="phoneNumber">
            Numéro de téléphone
          </label>
          <input
            id="phoneNumber"
            aria-label="Entrez votre numéro de téléphone"
            className="inputField"
            type="tel"
            name="phoneNumber"
            value={user && user.phoneNumber}
            onChange={handleInputChange}
          />
        </div>
        <div className="inputGroup">
          <label className="inputLabel" htmlFor="danceLevel">
            Niveau de danse
          </label>
          <select
            id="danceLevel"
            aria-label="Entrez votre niveau de danse"
            className="inputField"
            type="text"
            name="danceLevel"
            onChange={handleInputChange}
            required
          >
            <option value={user && user.danceLevel}>
              {user && user.danceLevel}
            </option>
            <option value="débutant">Débutant</option>
            <option value="intermédiaire">Intermédiaire</option>
            <option value="avancé">Avancé</option>
          </select>
        </div>
        <div className="inputGroup">
          <label className="inputLabel" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            aria-label="Entrez votre adresse email"
            className="inputField"
            type="email"
            name="email"
            value={user && user.email}
            onChange={handleInputChange}
            required
          />
          <div className="inputGroup">
            <label className="inputLabel" htmlFor="password">
              Mot de passe
            </label>
            <input
              id="password"
              aria-label="Entrez votre mot de passe"
              className="inputField"
              type="password"
              name="password"
              placeholder="Entrez votre mot de passe ou un nouveau"
              onChange={handleInputChange}
              required="required"
            />
          </div>
        </div>
        <button className="button" type="submit">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
