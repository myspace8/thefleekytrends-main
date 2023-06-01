import React, { useState } from 'react';

function Form() {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    // Submit form data to backend or perform any necessary actions
    setFormSubmitted(true);
  }

  function renderForm() {
    return (
      <form onSubmit={handleSubmit} className="mb-4 ml-[-9px]">
        <div className="mb-4">
          <input
            className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <input
            className="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="phone-number"
            type="tel"
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <button
            className="bg-white text-black py-2 px-4 focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    );
  }

  function renderThankYouMessage() {
    return (
      <div className="bg-black text-white mb-4">
        <h2 className="text-xl font-bold mb-4">Thank you for submitting the form!</h2>
        <p>We'll be in touch with you shortly.</p>
      </div>
    );
  }

  return (
    <div className="text-white">
      {formSubmitted ? renderThankYouMessage() : renderForm()}
    </div>
  );
}

export default Form;