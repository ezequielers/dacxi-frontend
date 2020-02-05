<template>
  <div class="container">
    <div class="row">
      <div class="col-12 mb-5 mt-3">
        <img src="/img/dacxi-logo.png" class="img-fluid d-block mx-auto" />
      </div>
      <div class="col-md-12 center">
        <div class="form-group">
          <label>Telephone</label>
          <input type="text" class="form-control" placeholder="Your telephone" />
        </div>
      </div>
      <div class="col-md-12 center">
        <div class="form-group">
          <label>Document id</label>
          <input type="text" class="form-control" placeholder="Document id" />
        </div>
      </div>

      <div class="col-md-12 center">
        <div class="form-group">
          <label>Upload document</label>
          <div class="d-block">
            <input type="file" ref="flDocument" @change="documentChanged" class="d-none" />
            <button type="button" class="btn btn-outline-primary" @click="fileChange('flDocument')">Choose file</button>
            <label class="ml-2 cut-text align-bottom">{{ documentName }}</label>
          </div>
          <small class="grey">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</small>
        </div>
      </div>

      <div class="col-md-12 center">
        <div class="form-group">
          <label>Proof of address</label>
          <div class="d-block">
            <input type="file" ref="flAddress" @change="addressChanged" class="d-none" />
            <button type="button" class="btn btn-outline-primary" @click="fileChange('flAddress')">Choose file</button>
            <label class="ml-2 cut-text align-bottom">{{ addressName }}</label>
          </div>
          <small class="grey">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</small>
        </div>
      </div>

      <div class="col-md-12 center">
        <button type="button" class="btn btn-custom-round btn-block btn-primary">Next</button>
      </div>
      <div class="col-md-12 center">
        <span class="custom-black">Already has a account? </span> <a href="javascript:void(0);">click here</a>
      </div>
    </div>
  </div>
</template>

<script>
import 'jquery/dist/jquery.slim.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import '@fortawesome/fontawesome-free/css/all.min.css'

export default {
  name: 'Step2',
  data () {
    return {
      documentName: 'No File Chosen',
      addressName: 'No File Chosen'
    }
  },
  methods: {
    fileChange (targetName) {
      this.$refs[targetName].click()
    },
    documentChanged (e) {
      var fileData = e.target.files[0]
      this.documentName = fileData.name
    },
    addressChanged (e) {
      var fileData = e.target.files[0]
      this.addressName = fileData.name
    }
  }
}
</script>

<style scoped src="@/assets/css/style.css"></style>
