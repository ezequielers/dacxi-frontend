<template>
  <div class="container">
    <form method="post" @submit.prevent="nextStep()" data-vv-scope="vvStep1">
      <div class="row">
        <div class="col-12 mb-5 mt-3">
          <img src="/img/dacxi-logo.png" class="img-fluid d-block mx-auto" />
        </div>
        <div class="col-md-12 center">
          <custom-input
          v-model="name"
          name="name"
          placeholder="Your name"
          type="text"
          v-validate="{ required: true, min: 2 }"
          :error="errors.first('vvStep1.name')">
            <template slot="before">
              <label>Name</label>
            </template>
          </custom-input>
        </div>
        <div class="col-md-12 center">
          <custom-input
          v-model="email"
          name="email"
          placeholder="Your email"
          type="text"
          v-validate="{ required: true, email: true }"
          :error="errors.first('vvStep1.email')">
            <template slot="before">
              <label>Email</label>
            </template>
          </custom-input>
        </div>
        <div class="col-md-12 center">
          <custom-input
          v-model="password"
          name="password"
          placeholder="Your password"
          type="password"
          v-validate="{ required: true, min: 6 }"
          :error="errors.first('vvStep1.password')">
            <template slot="before">
              <label>Password</label>
            </template>
          </custom-input>
        </div>
        <div class="col-md-12 center mb-4">
          <custom-input
          v-model="passwordConfirm"
          name="passwordConfirm"
          placeholder="Your password"
          type="password"
          v-validate="{ required: true, min: 6, isIqualTo: [password, 'Password', 'Confirm Password'] }"
          :error="errors.first('vvStep1.passwordConfirm')">
            <template slot="before">
              <label>Confirm Password</label>
            </template>
          </custom-input>
        </div>

        <div class="col-md-12 center">
          <button type="submit" class="btn btn-custom-round btn-block btn-primary">Next</button>
        </div>
        <div class="col-md-12 center">
          <span class="custom-black">Already has a account? </span> <a href="javascript:void(0);">click here</a>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Vue from 'vue'
import CustomInput from '@/components/Form/CustomInput.vue'
import VeeValidate from 'vee-validate'
import { isIqualTo } from '@/utils/validator'

import 'jquery/dist/jquery.slim.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import '@fortawesome/fontawesome-free/css/all.min.css'

VeeValidate.Validator.extend('isIqualTo', isIqualTo)
Vue.use(VeeValidate, { locale: 'en_US' })

export default {
  name: 'Step1',
  data () {
    return {
      name: '',
      email: '',
      password: '',
      passwordConfirm: ''
    }
  },
  components: {
    CustomInput
  },
  methods: {
    nextStep () {
      this.$validator.validateAll('vvStep1').then((result) => {
        if (result) {
          let step1 = {
            name: this.name,
            email: this.email,
            password: this.password
          }
          global.instanceApp.$store.dispatch('setStep1', {
            step: step1
          }).then(() => {
            this.$router.push({ name: 'Step2' })
          })
        }
      })
    }
  }
}
</script>

<style src="@/assets/css/style.css"></style>
