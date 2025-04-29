document.addEventListener("DOMContentLoaded", function () {
  // Helper function to get elements by ID
  const $ = id => document.getElementById(id);

  // Form and notification elements
  const form = $("userForm");
  const notification = $("notification");

  // Show notification message
  const showNotification = (message, isSuccess) => {
    notification.textContent = message;
    notification.className = isSuccess ? "notification success" : "notification error";
    notification.style.display = "block";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Clear notification
  const clearNotification = () => {
    notification.style.display = "none";
  };

  // Validate email format
  const validateEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Validate email confirmation
  const validateEmailConfirmation = () => {
    const email = $("email").value.trim();
    const confirmEmail = $("confirmEmail").value.trim();
    const error = $("confirmEmailError");

    if (!confirmEmail) {
      error.textContent = "Confirm Email is required";
      $("confirmEmail").classList.add("invalid");
      return false;
    } else if (email !== confirmEmail) {
      error.textContent = "Emails must match";
      $("confirmEmail").classList.add("invalid");
      return false;
    } else {
      error.textContent = "";
      $("confirmEmail").classList.remove("invalid");
      return true;
    }
  };

  // Validate phone number format
  const validatePhone = () => {
    const areaCode = $("areaCode").value;
    const phoneNumber = $("phoneNumber").value;
    const areaCodeError = $("areaCodeError");
    const phoneNumberError = $("phoneNumberError");
    let isValid = true;

    if (areaCode.length !== 3) {
      areaCodeError.textContent = "Area code must be 3 digits";
      $("areaCode").classList.add("invalid");
      isValid = false;
    } else {
      areaCodeError.textContent = "";
      $("areaCode").classList.remove("invalid");
    }

    if (phoneNumber.length !== 7) {
      phoneNumberError.textContent = "Phone number must be 7 digits";
      $("phoneNumber").classList.add("invalid");
      isValid = false;
    } else {
      phoneNumberError.textContent = "";
      $("phoneNumber").classList.remove("invalid");
    }

    return isValid;
  };

  // Validate Date of Birth
  const validateDOB = () => {
    const dob = $("dob").value.trim();
    const dobError = $("dobError");

    if (!dob) {
      dobError.textContent = "Date of Birth is required";
      $("dob").classList.add("invalid");
      return false;
    }

    const userAge = new Date().getFullYear() - new Date(dob).getFullYear();
    if (userAge < 18) {
      dobError.textContent = "You must be at least 18 years old";
      $("dob").classList.add("invalid");
      return false;
    } else {
      dobError.textContent = "";
      $("dob").classList.remove("invalid");
      return true;
    }
  };

  // Validate Agreement Checkbox
  const validateAgreement = () => {
    const agreement = $("agreement").checked;
    const agreementError = $("agreementError");

    if (!agreement) {
      agreementError.textContent = "You must agree to the terms and conditions";
      return false;
    } else {
      agreementError.textContent = "";
      return true;
    }
  };

  // Track remaining characters in comments field
  const setupCharacterCount = () => {
    const commentsField = $("comments");
    const charCount = document.createElement("span");
    const maxLength = commentsField.getAttribute("maxlength");

    charCount.id = "charCount";
    charCount.textContent = `${maxLength} characters remaining`;
    charCount.style.color = "#999";
    charCount.style.fontSize = "14px";
    charCount.style.marginTop = "5px";
    commentsField.parentNode.appendChild(charCount);

    commentsField.addEventListener("input", function () {
      const remaining = maxLength - commentsField.value.length;
      charCount.textContent = `${remaining} characters remaining`;
      charCount.style.color = remaining <= 20 ? "#f44336" : "#999";
    });
  };

  // Input validation for fields
  const setupValidation = () => {
    const validateTextField = (fieldId, errorId, regex, errorMsg) => {
      const field = $(fieldId);
      const error = $(errorId);

      field.addEventListener("input", function () {
        this.value = this.value.replace(regex, "");

        if (regex.test(this.value)) {
          error.textContent = errorMsg;
          this.classList.add("invalid");
          setTimeout(() => {
            error.textContent = "";
            this.classList.remove("invalid");
          }, 1000);
        }
      });
    };

    validateTextField("firstName", "firstNameError", /[^A-Za-z]/g, "Only letters allowed");
    validateTextField("lastName", "lastNameError", /[^A-Za-z]/g, "Only letters allowed");
    validateTextField("city", "cityError", /[^A-Za-z\s]/g, "Only letters and spaces allowed");

    $("zip").addEventListener("input", function () {
      this.value = this.value.replace(/\D/g, "").slice(0, 5);

      if (/\D/.test(this.value)) {
        $("zipError").textContent = "Only numbers allowed";
        this.classList.add("invalid");
        setTimeout(() => {
          $("zipError").textContent = "";
          this.classList.remove("invalid");
        }, 1000);
      }
    });

    $("email").addEventListener("input", function () {
      $("emailError").textContent = validateEmail(this.value.trim()) ? "" : "Invalid email format";
      this.classList.toggle("invalid", !validateEmail(this.value.trim()));
    });

    $("confirmEmail").addEventListener("input", validateEmailConfirmation);
    $("email").addEventListener("input", validateEmailConfirmation);
  };

  // Validate Contact Method (at least two selections required)
  const validateContactMethods = () => {
    const selected = document.querySelectorAll('input[name="contactMethod"]:checked');
    const error = $("contactMethodError");

    if (selected.length < 2) {
      error.textContent = "Please select at least two contact methods";
      return false;
    } else {
      error.textContent = "";
      return true;
    }
  };

  // Form submission handler
  const setupFormSubmission = () => {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      clearNotification();

      let isValid = true;
      const requiredFields = ["firstName", "lastName", "email", "confirmEmail", "address", "city", "state", "zip"];

      requiredFields.forEach(id => {
        const field = $(id);
        if (!field.value.trim()) {
          $(`${id}Error`).textContent = `${field.labels[0].textContent} is required`;
          field.classList.add("invalid");
          isValid = false;
        }
      });

      if (!validatePhone()) isValid = false;
      if (!validateEmailConfirmation()) isValid = false;
      if (!validateContactMethods()) isValid = false;
      if (!validateDOB()) isValid = false;
      if (!validateAgreement()) isValid = false;

      if (!$("zip").value.match(/^\d{5}$/)) {
        $("zipError").textContent = "ZIP code must be 5 digits";
        $("zip").classList.add("invalid");
        isValid = false;
      }

      if (!document.querySelector('input[name="meal"]:checked')) {
        $("mealError").textContent = "Please select a meal preference";
        isValid = false;
      }

      if (isValid) {
        showNotification("Form submitted successfully!", true);
      } else {
        showNotification("Please correct the errors below.", false);
        document.querySelector(".invalid")?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  };

  // Form reset handler
  const setupFormReset = () => {
    form.addEventListener("reset", function () {
      clearNotification();
      document.querySelectorAll(".error").forEach(el => (el.textContent = ""));
      document.querySelectorAll("input, select").forEach(el => el.classList.remove("invalid", "valid"));
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  };

  // Initialize all functionality
  setupCharacterCount();
  setupValidation();
  setupFormSubmission();
  setupFormReset();
});
