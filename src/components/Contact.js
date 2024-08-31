import React from "react";

const Contact = () => {
    return (
        <div>
            <h2>Kontakt</h2>
            <form>
                <label>
                    Imię:
                    <input type="text" name="name" />
                </label>
                <label>
                    Email:
                    <input type="email" name="email" />
                </label>
                <label>
                    Wiadomość:
                    <textarea name="message"></textarea>
                </label>
                <button type="submit">Wyślij</button>
            </form>
        </div>
    );
};

export default Contact;