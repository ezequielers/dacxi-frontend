<template>
  <div :class="rootClassName">
    <div class="custom-control mr-sm-2" :class="[{ 'custom-checkbox': type === 'checkbox', 'custom-radio': type === 'radio' }, inputClassName]">
      <input :type="type" :name="name" :id="idFor" class="custom-control-input" true-value="1" false-value="0" @input="handleInput" @blur="$emit('blur');" :disabled="disabled">
      <label class="custom-control-label" :class="{ 'error': error }" :for="idFor">{{ textField }}</label>
    </div>
    <transition name="slide" mode="out-in">
      <small v-if="error" class="dx-error-field">{{ error }}</small>
    </transition>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  name: 'CustomCheckRadio',
  data () {
    return {
      refName: this.refInput || 'field_' + Math.random().toString().substr(2),
      idFor: 'field_' + Math.random().toString().substr(2)
    }
  },
  $_veeValidate: {
    // value getter
    value () {
      return this.$el.value
    },
    // name getter
    name () {
      return this.name
    }
  },
  props: {
    refInput: String,
    name: String,
    value: {
      type: null,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: null,
      required: false
    },
    textField: {
      type: String,
      default: ''
    },
    valueField: {
      type: String,
      default: '1'
    },
    type: {
      type: String,
      default: 'checkbox',
      validator: val => {
        return (
          ['checkbox', 'radio'].indexOf(val) !== -1
        )
      }
    },
    rootClassName: {
      type: String,
      default: 'form-group'
    },
    inputClassName: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleInput (e) {
      this.$emit('input', e.target.checked)
    }
  }
}
</script>

<style scoped>
  .slide-enter-active,
  .slide-leave-active {
    transition: all 0.3s;
  }
  .slide-enter,
  .slide-leave-to {
    opacity: 0;
  }
</style>
