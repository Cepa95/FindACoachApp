<template>
  <div>
    <base-dialog :show="!!error" title="Error occurred" @close="handleError">
      {{ error }}</base-dialog
    >
    <base-dialog :show="isLoading" title="Authenticating..." fixed>
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card>
      <form @submit.prevent="submitForm">
        <div class="form-control" :class="{ invalid: !emailIsValid }">
          <label for="email">E-mail</label>
          <input
            type="email"
            id="email"
            v-model.trim="email"
            @blur="clearValidity('email')"
          />
        </div>
        <p v-if="!emailIsValid">E-mail is not valid!</p>
        <div class="form-control" :class="{ invalid: !passwordIsValid }">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model.trim="password"
            @blur="clearValidity('password')"
          />
        </div>
        <p v-if="!passwordIsValid">Password must be at least 6 characters</p>
        <p v-if="!formIsValid">Please fix the errors</p>
        <base-button>{{ submitButtonCaption }}</base-button>
        <base-button type="button" mode="flat" @click="switchAuthMode">
          {{ switchModeButtonCaption }}</base-button
        >
      </form>
    </base-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      formIsValid: true,
      emailIsValid: true,
      passwordIsValid: true,
      mode: "login",
      isLoading: false,
      error: null,
    };
  },
  computed: {
    submitButtonCaption() {
      if (this.mode === "login") {
        return "Login";
      } else {
        return "Signup";
      }
    },
    switchModeButtonCaption() {
      if (this.mode === "login") {
        return "Signup instead";
      } else {
        return "Login instead";
      }
    },
  },
  methods: {
    async submitForm() {
      console.log("provjera");
      console.log(this.password);
      console.log(this.email);

      this.formIsValid = true;
      this.emailIsValid = true;
      this.passwordIsValid = true;

      // Regular expression for basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(this.email)) {
        this.emailIsValid = false;
        this.formIsValid = false;
      }

      if (this.password.length < 6) {
        this.passwordIsValid = false;
        this.formIsValid = false;
      }
      if (!this.passwordIsValid) {
        return;
      }
      this.isLoading = true;
      try {
        if (this.mode === "login") {
          //..
        }
        if (this.mode !== "login" && this.formIsValid) {
          await this.$store.dispatch("signup", {
            email: this.email,
            password: this.password,
          });
        }
      } catch (error) {
        this.error = error.message || "Failed to authenticate";
      }
      this.isLoading = false;
    },
    switchAuthMode() {
      if (this.mode === "login") {
        this.mode = "signup";
      } else {
        this.mode = "login";
      }
    },
    clearValidity(input) {
      if (input === "email") {
        this.emailIsValid = true;
      } else {
        this.passwordIsValid = true;
      }
    },
    handleError(){
      this.error = null;
    }
  },
};
</script>


<style scoped>
form {
  margin: 1rem;
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

.invalid label {
  color: red;
}

.invalid input {
  border: 1px solid red;
}
</style>