<template>
  <div :class="rootClassName">
    <slot name="before">
    </slot>

    <input :type="type" :name="name" :value="value" :ref="refName" :placeholder="placeholder" @input="handleInput" @change="handleInput" @blur="$emit('blur');"
    :disabled="disabled" :class="[{ 'error': error }, inputClassName]" @keyup="keyup">
    <transition name="slide" mode="">
      <small v-if="error" class="dx-error-field">{{ error }}</small>
    </transition>

    <slot name="after"></slot>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  name: 'CustonInput',
  data () {
    return {
      refName: this.refInput || 'field_' + Math.random().toString().substr(2)
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
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text',
      validator: val => {
        return (
          ['url', 'text', 'password', 'email', 'search'].indexOf(val) !== -1
        )
      }
    },
    rootClassName: {
      type: String,
      default: 'form-group'
    },
    inputClassName: {
      type: String,
      default: 'form-control'
    },
    keyup: {
      type: Function,
      default: function () {}
    }
  },
  methods: {
    handleInput (e) {
      this.$emit('input', e.target.value.trim())
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
