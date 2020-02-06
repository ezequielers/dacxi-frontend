<template>
  <div class="container">
    <form method="post" @submit.prevent="nextStep()" data-vv-scope="vvStep2">
      <div class="row">
        <div class="col-12 mb-5 mt-3">
          <img src="/img/dacxi-logo.png" class="img-fluid d-block mx-auto" />
        </div>
        <div class="col-md-12 center">
          <custom-input
          v-model="telephone"
          name="telephone"
          placeholder="Your telephone"
          type="text"
          v-validate="{ required: true, min: 2 }"
          :error="errors.first('vvStep2.telephone')">
            <template slot="before">
              <label>Telephone</label>
            </template>
          </custom-input>
        </div>
        <div class="col-md-12 center">
          <custom-input
          v-model="documentId"
          name="documentId"
          placeholder="Document id"
          type="text"
          v-validate="{ required: true, min: 2 }"
          :error="errors.first('vvStep2.documentId')">
            <template slot="before">
              <label>Document id</label>
            </template>
          </custom-input>
        </div>

        <div class="col-md-12 center">
          <div class="form-group">
            <label>Upload document</label>
            <div class="d-block">
              <button type="button" class="btn btn-outline-primary" @click="fileChange('flDocument')">Choose file</button>
              <label class="ml-2 cut-text align-bottom">{{ documentName }}</label>

              <input type="file" ref="flDocument" @change="documentChanged" name="flDocument" accept="image/*" class="d-none" v-validate="{ required: true, image: true, maxdimensions:[500,500], size:100 }" />
              <span :class="['d-block', {'dx-error-field': errors.has('vvStep2.flDocument')}]" v-show="errors.has('vvStep2.flDocument')">{{ errors.first('vvStep2.flDocument') }}</span>
            </div>
            <small class="grey">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</small>
          </div>
        </div>

        <div class="col-md-12 center">
          <div class="form-group">
            <label>Proof of address</label>
            <div class="d-block">
              <button type="button" class="btn btn-outline-primary" @click="fileChange('flAddress')">Choose file</button>
              <label class="ml-2 cut-text align-bottom">{{ addressName }}</label>
              <input type="file" ref="flAddress" @change="addressChanged" name="flAddress" accept="image/*" class="d-none" v-validate="{ required: true, image: true, maxdimensions:[500,500], size:100 }" />
              <span :class="['d-block', {'dx-error-field': errors.has('vvStep2.flAddress')}]" v-show="errors.has('vvStep2.flAddress')">{{ errors.first('vvStep2.flAddress') }}</span>
            </div>
            <small class="grey">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</small>
          </div>
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
import { maxDimensionsRule } from '@/utils/validator'

import 'jquery/dist/jquery.slim.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import '@fortawesome/fontawesome-free/css/all.min.css'

VeeValidate.Validator.extend('maxdimensions', maxDimensionsRule)
Vue.use(VeeValidate, { locale: 'en_US' })

export default {
  name: 'Step2',
  data () {
    return {
      telephone: '',
      documentId: '',
      flDocument: '',
      flAddress: '',
      documentName: 'No File Chosen',
      addressName: 'No File Chosen'
    }
  },
  components: {
    CustomInput
  },
  methods: {
    fileChange (targetName) {
      this.$refs[targetName].click()
    },
    documentChanged (e) {
      this.flDocument = e.target.files[0]
      this.documentName = this.flDocument.name
    },
    addressChanged (e) {
      this.flAddress = e.target.files[0]
      this.addressName = this.flAddress.name
    },
    nextStep () {
      this.$validator.validateAll('vvStep2').then((result) => {
        if (result) {
          let step2 = {
            telephone: this.telephone,
            documentId: this.documentId,
            flDocument: this.flDocument,
            flAddress: this.flAddress
          }
          global.instanceApp.$store.dispatch('setStep2', {
            step: step2
          }).then(() => {
            this.$router.push({ name: 'Step3' })
          })
        }
      })
    }
  }
}
</script>

<style src="@/assets/css/style.css"></style>
