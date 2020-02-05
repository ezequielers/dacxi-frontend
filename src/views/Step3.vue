<template>
  <div class="container">
    <div class="row">
      <div class="col-12 mb-5 mt-3">
        <img src="/img/dacxi-logo.png" class="img-fluid d-block mx-auto" />
      </div>

      <div class="col-md-12 center">
        <a href="javascript:;" class="text-white" @click="showImageSelect">
          <div class="circle-blue">
            <img v-bind:src="showUserImage" class="d-block mx-auto img-profile" />
          </div>
        </a>
        <span class="custom-black d-block text-center mt-1">Uploud a profile picture</span>
      </div>
      <div class="col-md-12 center">
        <div class="form-group">
          <label>Bio</label>
          <textarea class="form-control" rows="3" placeholder="Tell us a little about yourself."></textarea>
        </div>
      </div>
      <div class="col-md-12 center">
        <div class="form-group">
          <label>City</label>
          <input type="text" class="form-control" placeholder="Where do you live" />
        </div>
      </div>
      <div class="col-md-12 center">
        <div class="form-group">
          <label>Website</label>
          <input type="text" class="form-control" placeholder="Website" />
        </div>
      </div>
      <div class="col-md-12 center mb-4">
        <div class="custom-control custom-radio mr-sm-2">
          <input type="radio" class="custom-control-input" id="agree">
          <label class="custom-control-label" for="agree">I've read and agree with the <a href="javascript:void(0);">terms of use</a></label>
        </div>
      </div>

      <div class="col-md-12 center">
        <button type="button" class="btn btn-custom-round btn-block btn-primary">Sign Up</button>
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
  name: 'Step3',
  data () {
    return {
      userImageProfile: ''
    }
  },
  computed: {
    showUserImage () {
      return this.userImageProfile || '/img/user-solid.svg'
    }
  }
}
</script>

<style scoped src="@/assets/css/style.css"></style>
