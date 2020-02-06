<template>
  <div :class="rootClassName">
    <slot name="before">
    </slot>

    <textarea :name="name" :ref="refName" :placeholder="placeholder" :rows="rows" @input="handleInput" @change="handleInput" @blur="$emit('blur');"
    :disabled="disabled" :readonly="readonly" :class="[{ 'error': error }, inputClassName]" :value="value"></textarea>
    <label v-bind:class="{active: value}"  v-if="label">{{ label }}</label>

    <transition name="slide" mode="">
      <small v-if="error" class="dx-error-field">{{ error }}</small>
    </transition>

    <slot name="after"></slot>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  name: 'CustomTextarea',
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
    readonly: {
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
    label: {
      type: String,
      default: ''
    },
    rows: {
      type: Number,
      default: 3
    },
    rootClassName: {
      type: String,
      default: 'form-group'
    },
    inputClassName: {
      type: String,
      default: 'form-control'
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
