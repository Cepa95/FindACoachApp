<template>
  <form @submit.prevent="submitForm">
    <div :class="{ invalid: !email.isValid }">
      <label for="email">Your E-mail </label>
      <input
        type="email"
        id="email"
        v-model.trim="email.val"
        @blur="clearValidity('email')"
      />
    </div>
    <p v-if="!email.isValid">Please enter a valid email</p>
    <div :class="{ invalid: !message.isValid }">
      <label for="message">Message</label>
      <textarea
        rows="5"
        id="message"
        v-model.trim="message.val"
        @blur="clearValidity('message')"
      ></textarea>
    </div>
    <p v-if="!message.isValid">Message must not be empty.</p>
    <p class="errors" v-if="!formIsValid">
      Please fix the errors and submit again!
    </p>
    <div class="actions">
      <base-button>Send message</base-button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: {
        val: "",
        isValid: true,
      },
      message: {
        val: "",
        isValid: true,
      },
      formIsValid: true,
    };
  },
  methods: {
    submitForm() {
      this.formIsValid = true;
      if (this.email.val === "" || !this.email.val.includes("@")) {
        this.formIsValid = false;
        this.email.isValid = false;
      }
      if (this.message.val === "") {
        this.formIsValid = false;
        this.message.isValid = false;
      }
      this.$store.dispatch("requests/contactCoach", {
        email: this.email.val,
        message: this.message.val,
        coachId: this.$route.params.id,
      });
      this.$router.replace("/coaches");
    },
    clearValidity(input) {
      this[input].isValid = true;
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
p {
  font-weight: bold;
  color: #800000;
}
</style>