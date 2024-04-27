import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./signUp.scss";

const SignUp = () => {
  //const { firstName, lastName, birthday, address, postCode, city, phoneNumber, danceLevel, email, password, role } = req.body;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [address, setAddress] = useState("");
  const [postCode, setPostCode] = useState("");
  const [city, setCity] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [danceLevel, setDanceLevel] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const role = "user";

  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      firstName,
      lastName,
      birthday,
      address,
      postCode,
      city,
      phoneNumber,
      danceLevel,
      email,
      password,
      role,
    };
    data = JSON.stringify(data);
    console.log(data);
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/users/signUp",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          console.log("Response succeeded!");
          setFirstName("");
          setLastName("");
          setBirthday("");
          setAddress("");
          setPostCode("");
          setCity("");
          setPhoneNumber("");
          setDanceLevel("");
          setEmail("");
          setPassword("");
          toast.success("Inscription validée");
          setTimeout(() => {
            navigate("/signIn");
          }, 3000);
        }
      })
      .catch((error) => {
        const errorMessage =
          error.response?.data?.message || "An error occurred";
        toast.error(errorMessage);
      });
  };
  return (
    <div className="main">
      <h2>Formulaire d&apos;inscription</h2>
      <form className="formGroup" onSubmit={handleSubmit}>
        <div className="inputGroup">
          <label className="inputLabel" htmlFor="firstName">
            Nom
          </label>
          <input
            id="first_name"
            aria-label="Entrez votre nom"
            className="inputField"
            type="text"
            name="firstName"
            placeholder="Entrez votre nom"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            required="required"
          />
        </div>
        <div className="inputGroup">
          <label className="inputLabel" htmlFor="lastName">
            Prénom
          </label>
          <input
            id="last_name"
            aria-label="Entrez votre Prénom"
            className="inputField"
            type="text"
            name="lastName"
            placeholder="Entrez votre prénom"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            required="required"
          />
        </div>
        <div className="inputGroup">
          <label className="inputLabel" htmlFor="birthday">
            Date de naissance
          </label>
          <input
            id="birthday"
            aria-label="Entrez votre date de naissance"
            className="inputField"
            type="date"
            name="birthday"
            placeholder="Entrez votre date de naissance"
            onChange={(e) => {
              setBirthday(e.target.value);
            }}
            required="required"
          />
        </div>
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
            placeholder="Entrez votre adresse"
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            required="required"
          />
        </div>
        <div className="inputGroup">
          <label className="inputLabel" htmlFor="postcode">
            CP
          </label>
          <input
            id="postcode"
            aria-label="Entrez votre code postal"
            className="inputField"
            type="text"
            name="postcode"
            placeholder="Entrez votre code postal"
            onChange={(e) => {
              setPostCode(e.target.value);
            }}
            required="required"
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
            placeholder="Entrez votre ville"
            onChange={(e) => {
              setCity(e.target.value);
            }}
            required="required"
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
            placeholder="Entrez votre numéro de téléphone"
            pattern="^(\+\d{1,2}\s?)?(\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}$"
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
            required="required"
          />
        </div>
        <div className="inputGroup">
          <label className="inputLabel" htmlFor="danceLevel">
            Niveau de danse
          </label>
          <select
            id="dance_level"
            aria-label="Entrez votre niveau de danse"
            className="inputField"
            type="text"
            name="danceLevel"
            onChange={(e) => {
              setDanceLevel(e.target.value);
            }}
            required
          >
            <option value="defaultValue">Choisissez un niveau</option>
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
            placeholder="Entrez votre adresse email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required="required"
          />
        </div>
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
            placeholder="Entrez un mot de passe"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required="required"
          />
        </div>
        <div>
          <input
            className="submitButton"
            type="submit"
            aria-label="S'inscrire"
          />
        </div>
      </form>
    </div>
  );
};

export default SignUp;
