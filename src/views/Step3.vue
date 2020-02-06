<template>
  <div class="container">
    <form method="post" @submit.prevent="finish()" data-vv-scope="vvStep3">
      <div class="row">
        <div class="col-12 mb-5 mt-3">
          <img src="/img/dacxi-logo.png" class="img-fluid d-block mx-auto" />
        </div>

        <div class="col-md-12 center">
          <a href="javascript:;" class="text-white" @click="showImageSelect('flUserImage')">
            <div class="circle-blue mx-auto">
              <img v-bind:src="showUserImage" class="d-block mx-auto img-profile" :class="{'personalClass' : userImageProfile}" />
            </div>
          </a>
          <input type="file" ref="flUserImage" @change="imageChanged" name="flUserImage" accept="image/*" class="d-none" v-validate="{ required: true, image: true, maxdimensions:[500,500], size:100 }" />
          <span :class="['d-block', 'text-center', {'dx-error-field': errors.has('vvStep3.flUserImage')}]" v-show="errors.has('vvStep3.flUserImage')">{{ errors.first('vvStep3.flUserImage') }}</span>
          <span class="custom-black d-block text-center mt-1">Uploud a profile picture</span>
        </div>
        <div class="col-md-12 center">
          <custom-textarea
          v-model="bio"
          name="bio"
          placeholder="Tell us a little about yourself."
          :rows="3"
          v-validate="{ required: true, min: 2 }"
          :error="errors.first('vvStep3.bio')">
            <template slot="before">
              <label>Bio</label>
            </template>
          </custom-textarea>
        </div>
        <div class="col-md-12 center">
          <custom-input
          v-model="city"
          name="city"
          placeholder="Where do you live"
          type="text"
          v-validate="{ required: true, min: 2 }"
          :error="errors.first('vvStep3.city')">
            <template slot="before">
              <label>City</label>
            </template>
          </custom-input>
        </div>
        <div class="col-md-12 center">
          <custom-input
          v-model="website"
          name="website"
          placeholder="Website"
          type="text"
          v-validate="{ required: true, min: 2 }"
          :error="errors.first('vvStep3.website')">
            <template slot="before">
              <label>Website</label>
            </template>
          </custom-input>
        </div>
        <div class="col-md-12 center mb-4">
          <custom-check-radio
            v-model="agree"
            name="agree"
            type="radio"
            v-validate="{ required: true, included:'1' }"
            text-field="I've read and agree with the terms of use"
            :error="errors.first('vvStep3.agree')">
            </custom-check-radio>
        </div>

        <div class="col-md-12 center">
          <button type="submit" class="btn btn-custom-round btn-block btn-primary">Sign Up</button>
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
import CustomTextarea from '@/components/Form/CustomTextarea.vue'
import CustomCheckRadio from '@/components/Form/CustomCheckRadio.vue'
import VeeValidate from 'vee-validate'
import { maxDimensionsRule } from '@/utils/validator'

import 'jquery/dist/jquery.slim.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import '@fortawesome/fontawesome-free/css/all.min.css'

VeeValidate.Validator.extend('maxdimensions', maxDimensionsRule)
Vue.use(VeeValidate, { locale: 'en_US' })

export default {
  name: 'Step3',
  data () {
    return {
      city: '',
      website: '',
      bio: '',
      flUserImage: '',
      userImageProfile: '',
      agree: false
    }
  },
  components: {
    CustomInput,
    CustomTextarea,
    CustomCheckRadio
  },
  computed: {
    showUserImage () {
      return this.userImageProfile || '/img/user-solid.svg'
    }
  },
  methods: {
    showImageSelect (targetName) {
      this.$refs[targetName].click()
    },
    imageChanged (e) {
      this.flUserImage = e.target.files[0]
      var reader = new FileReader()
      // var vm = this
      reader.onload = (e) => {
        this.userImageProfile = e.target.result
      }
      reader.readAsDataURL(this.flUserImage)
      // this.userImageProfile = this.flUserImage.name
    },
    finish () {
      this.$validator.validateAll('vvStep3').then((result) => {
        if (result) {
          let step3 = {
            city: this.city,
            website: this.website,
            bio: this.bio,
            flUserImage: this.flUserImage,
            agree: this.agree
          }
          global.instanceApp.$store.dispatch('setStep3', {
            step: step3
          }).then(() => {
            alert('final do cadastro')
          })
        }
      })
    }
  }
}
</script>

<style src="@/assets/css/style.css"></style>
<style scoped>
  .personalClass {
    margin-left: -35px !important;
    margin-top: -35px;
    border-radius: 80px;
  }
</style>
